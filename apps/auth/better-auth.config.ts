import { defineConfig } from "@better-auth/cli";

/**
 * Better Auth CLI Configuration
 *
 * This configures where the better-auth CLI generates the Drizzle schema.
 *
 * Flow:
 * 1. Run `npx @better-auth/cli generate` from this directory (apps/auth/)
 * 2. CLI reads better-auth configuration from src/lib/auth.ts
 * 3. Generates Drizzle schema to the database package
 * 4. Database package can then create SQL migrations
 *
 * Schema Location:
 * - Output: ../../packages/database/drizzle/schema.ts
 * - This allows the database package to be the single source of truth
 * - Apps import schema via: import * as schema from "@repo/database/schema"
 */
export default defineConfig({
	/**
	 * Path to the better-auth instance
	 * CLI will analyze this to generate the schema
	 */
	auth: "./src/lib/auth.ts",

	/**
	 * Output directory for generated schema
	 * Points to the database package's drizzle directory
	 */
	output: {
		path: "../../packages/database/src/schema/auth.ts",
		adapter: "drizzle",
	},
});
