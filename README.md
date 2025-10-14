# Starter Kit

Full-stack monorepo with authentication, database, and API documentation.

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and set DATABASE_URL
   ```

3. **Start PostgreSQL:**
   ```bash
   docker run -d \
     --name auth-postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=auth_db \
     -p 5432:5432 \
     postgres:18
   ```

4. **Run database setup:**
   ```bash
   pnpm db:setup
   ```

5. **Start development servers:**
   ```bash
   pnpm dev
   ```
   This starts:
   - Auth server at `http://localhost:3001`
   - Swagger UI at `http://localhost:3001/api/v1/auth/reference`
   - Drizzle Studio at `https://local.drizzle.studio`

## Common Commands

### Development
```bash
pnpm dev          # Start all dev servers + Drizzle Studio
pnpm dev:app      # Start only app servers (without Drizzle Studio)
```

### Code Quality
```bash
pnpm lint         # Run linting across all packages
pnpm lint:fix     # Auto-fix linting issues
pnpm typecheck    # Run TypeScript type checking
```

### Database
```bash
pnpm db:schema    # Generate auth schema from Better Auth config
pnpm db:generate  # Generate migration from schema changes
pnpm db:migrate   # Apply migrations to database
pnpm db:studio    # Open Drizzle Studio (database GUI)
pnpm db:setup     # Complete setup: schema → generate → migrate
```

### Build
```bash
pnpm build        # Build all apps and packages
```

## Project Structure

```
starter-kit/
├── apps/
│   ├── auth/                  # Authentication server (Hono + Better Auth)
│   │   ├── src/
│   │   │   ├── index.ts      # Server entry point
│   │   │   ├── env.ts        # Environment validation
│   │   │   ├── config/       # API configuration
│   │   │   ├── lib/          # Auth & DB clients
│   │   │   └── routes/       # API routes with OpenAPI
│   │   ├── .env              # Local environment (not in git)
│   │   └── .env.example      # Environment template
│   └── docs/                  # Documentation site (Next.js + Fumadocs)
│
├── packages/
│   ├── database/              # Shared database package
│   │   ├── src/
│   │   │   ├── client.ts     # Database client factory
│   │   │   └── schema/       # Drizzle ORM schemas
│   │   │       ├── auth.ts   # Better Auth tables (generated)
│   │   │       ├── resources.ts # Resource tables
│   │   │       └── index.ts  # Schema exports
│   │   └── drizzle/
│   │       └── migrations/   # SQL migration files
│   ├── biome-config/          # Shared linting/formatting config
│   └── typescript-config/     # Shared TypeScript configs
│
├── .env                       # Root environment (DATABASE_URL)
├── .env.example               # Environment template
└── turbo.json                 # Turborepo configuration
```

### Apps

**`apps/auth`** - Authentication Server
- **Stack**: Hono, Better Auth, Drizzle ORM, PostgreSQL
- **Features**:
  - Email/password authentication
  - Session management
  - OpenAPI documentation
  - Scalar UI at `/api/v1/auth/reference`
  - Type-safe database queries
- **Port**: 3001

**`apps/docs`** - Documentation Site
- **Stack**: Next.js, Fumadocs
- **Port**: 3000

### Packages

**`@repo/database`** - Database Package
- Drizzle ORM client and schemas
- Better Auth tables (auto-generated)
- Custom resource tables
- Migration management
- Type-safe queries

**`@repo/biome-config`** - Code Quality
- Shared Biome configuration
- Linting and formatting rules
- Used across all TypeScript packages

**`@repo/typescript-config`** - TypeScript Configs
- Shared TypeScript configurations
- Server, library, and Next.js configs

### Tech Stack

- **Language**: TypeScript
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Auth**: Better Auth
- **Database**: PostgreSQL + Drizzle ORM
- **API Framework**: Hono
- **Code Quality**: Biome
- **API Docs**: OpenAPI + Swagger UI

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Troubleshooting

### Environment Variables

**Problem**: `Invalid environment variables` error on startup

**Solution**:
1. Ensure `.env` file exists in the correct location
2. For auth server: `apps/auth/.env`
3. For root database tools: `.env` in repository root
4. Copy from `.env.example` and fill in all required values

**Required Variables**:
```env
# apps/auth/.env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/auth_db
BETTER_AUTH_URL=http://localhost:3001
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long
```

### Database Connection

**Problem**: `Cannot connect to database` or `ECONNREFUSED`

**Solution**:
1. Verify PostgreSQL is running:
   ```bash
   docker ps  # Should show postgres container
   ```
2. If not running, start it:
   ```bash
   docker start auth-postgres
   # Or create new:
   docker run -d --name auth-postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=auth_db \
     -p 5432:5432 postgres:18
   ```
3. Verify `DATABASE_URL` matches your PostgreSQL configuration

### Port Conflicts

**Problem**: `Port 3001 already in use`

**Solution**:
1. Find process using the port:
   ```bash
   lsof -i :3001
   ```
2. Kill the process:
   ```bash
   kill -9 <PID>
   ```
3. Or use a different port in `apps/auth/.env`:
   ```env
   PORT=3010
   BETTER_AUTH_URL=http://localhost:3010
   ```

### Migration Errors

**Problem**: `Migration failed` or `relation already exists`

**Solution**:
1. Check migration status:
   ```bash
   # Connect to database
   psql $DATABASE_URL
   # List migrations
   SELECT * FROM drizzle.__drizzle_migrations;
   ```
2. For development, you can reset the database:
   ```bash
   # Drop and recreate database
   docker exec -it auth-postgres psql -U postgres -c "DROP DATABASE auth_db;"
   docker exec -it auth-postgres psql -U postgres -c "CREATE DATABASE auth_db;"
   # Re-run migrations
   pnpm db:migrate
   ```
3. For production, always use forward migrations and test on staging first

### Linting Errors

**Problem**: `Biome check failed` or formatting errors

**Solution**:
1. Auto-fix most issues:
   ```bash
   pnpm lint:fix
   ```
2. If errors persist, check `biome.json` configuration
3. Ensure all packages extend `@repo/biome-config`

### Type Errors

**Problem**: TypeScript errors after schema changes

**Solution**:
1. Regenerate schema from Better Auth:
   ```bash
   pnpm db:schema
   ```
2. Ensure migrations are up to date:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```
3. Restart TypeScript server in your IDE

### Drizzle Studio Not Loading

**Problem**: `Drizzle Studio fails to start` or shows empty database

**Solution**:
1. Ensure `DATABASE_URL` environment variable is set
2. Check PostgreSQL connection
3. Verify migrations have been applied:
   ```bash
   pnpm db:migrate
   ```
4. Try running studio directly:
   ```bash
   cd packages/database
   pnpm db:studio
   ```

## Useful Links

### Documentation
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Hono Docs](https://hono.dev/)
- [Turborepo Docs](https://turborepo.com/docs)

### Turborepo
- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
