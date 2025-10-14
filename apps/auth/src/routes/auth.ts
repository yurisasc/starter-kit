import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { auth } from "../lib/auth";

/**
 * Utilities to forward to Better Auth's handler while keeping typed routes.
 */
const forward = async (c: Context, options?: { method?: string; body?: unknown }) => {
	const url = new URL(c.req.url);
	const headers = new Headers(c.req.raw.headers);
	if (options?.body !== undefined) {
		headers.set("content-type", "application/json");
	}

	const req = new Request(url.toString(), {
		method: options?.method ?? c.req.method,
		headers,
		body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
		// credentials are handled via Cookie header
	});

	return auth.handler(req);
};

export const authApi = new OpenAPIHono();

// Schemas
const SignUpBodySchema = z
	.object({
		email: z.email().openapi({ example: "user@example.com" }),
		password: z.string().min(8).openapi({ example: "StrongPassword123!" }),
		name: z.string().min(1).optional().openapi({ example: "Alice" }),
	})
	.openapi("SignUpBody");

const SignInBodySchema = z
	.object({
		email: z.email().openapi({ example: "user@example.com" }),
		password: z.string().min(8).openapi({ example: "StrongPassword123!" }),
	})
	.openapi("SignInBody");

// GET /api/auth/get-session
authApi.openapi(
	createRoute({
		method: "get",
		path: "/get-session",
		tags: ["auth"],
		responses: {
			200: {
				description: "Current session (or null if unauthenticated)",
				content: {
					"application/json": {
						schema: z
							.object({ user: z.any().nullable(), session: z.any().nullable() })
							.openapi("GetSessionResponse"),
					},
				},
			},
			401: { description: "Not authenticated" },
		},
	}),
	async (c) => {
		// Forward to Better Auth and normalize unauthenticated -> 401
		const resp = await forward(c);
		try {
			const cloned = resp.clone();
			const type = cloned.headers.get("content-type") || "";
			if (type.includes("application/json")) {
				const data = (await cloned.json()) as {
					user: unknown;
					session: unknown;
				};
				if (data && data.user == null && data.session == null) {
					return c.json({ user: null, session: null }, 401);
				}
			}
		} catch {
			// fall through to original response
		}
		return resp;
	},
);

// POST /api/auth/sign-up/email
authApi.openapi(
	createRoute({
		method: "post",
		path: "/sign-up/email",
		tags: ["auth"],
		request: {
			body: {
				content: {
					"application/json": { schema: SignUpBodySchema },
				},
				required: true,
			},
		},
		responses: {
			200: { description: "User registered and signed in" },
			400: { description: "Validation error" },
			409: { description: "Email already in use" },
		},
	}),
	async (c) => {
		const body = c.req.valid("json");
		return forward(c, { method: "POST", body });
	},
);

// POST /api/auth/sign-in/email
authApi.openapi(
	createRoute({
		method: "post",
		path: "/sign-in/email",
		tags: ["auth"],
		request: {
			body: {
				content: {
					"application/json": { schema: SignInBodySchema },
				},
				required: true,
			},
		},
		responses: {
			200: { description: "User signed in, session cookie set" },
			401: { description: "Invalid credentials" },
		},
	}),
	async (c) => {
		const body = c.req.valid("json");
		return forward(c, { method: "POST", body });
	},
);

// POST /api/auth/sign-out
authApi.openapi(
	createRoute({
		method: "post",
		path: "/sign-out",
		tags: ["auth"],
		responses: {
			200: { description: "Signed out" },
		},
	}),
	async (c) => {
		return forward(c, { method: "POST" });
	},
);
