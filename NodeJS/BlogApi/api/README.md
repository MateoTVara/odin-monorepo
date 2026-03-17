# API

Express 5 REST API for the BlogApi platform, built with TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript (ESM, compiled with tsdown)
- **ORM:** Prisma 7 with `@prisma/adapter-pg`
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh tokens), Passport.js, bcryptjs
- **Validation:** express-validator
- **Rate limiting:** express-rate-limit

## Prerequisites

- Node.js v20+
- pnpm v10+
- A running PostgreSQL instance

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |---|---|
   | `DATABASE_URL` | PostgreSQL connection string |
   | `ACCESS_JWT_SECRET` | Secret for signing access tokens |
   | `REFRESH_JWT_SECRET` | Secret for signing refresh tokens |
   | `LISTEN_PORT` | Port the server listens on (default `3000`) |
   | `NODE_ENV` | `development` or `production` |

3. Run database migrations:

   ```bash
   pnpm prisma:migrate
   ```

4. (Optional) Seed the database:

   ```bash
   pnpm prisma:generate
   ```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server with hot-reload (`tsx watch`) |
| `pnpm build` | Compile to `dist/` via tsdown |
| `pnpm start` | Run the compiled build |
| `pnpm prisma:generate` | Regenerate the Prisma client |
| `pnpm prisma:migrate` | Create and apply database migrations |
| `pnpm prisma:studio` | Open Prisma Studio in the browser |

## API Routes

All routes are prefixed by default at the root. CORS is configured to allow `http://localhost:5173` (user client) and `http://localhost:5174` (admin client).

### Auth — `/auth`

| Method | Path | Access | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Login (any role) |
| `POST` | `/auth/admin/login` | Public | Login (ADMIN role required) |
| `POST` | `/auth/refresh` | Cookie | Rotate refresh token, get new access token |
| `POST` | `/auth/logout` | Cookie | Revoke current refresh token |

### Posts — `/posts`

| Method | Path | Access | Description |
|---|---|---|---|
| `GET` | `/posts/published` | Public | List all published posts |
| `GET` | `/posts/published/:id` | Public | Get a published post with comments |
| `GET` | `/posts` | ADMIN | List all posts (including drafts) |
| `GET` | `/posts/:id` | ADMIN | Get any post by ID |
| `POST` | `/posts` | ADMIN | Create a post |
| `PATCH` | `/posts/:id` | ADMIN | Update a post |
| `DELETE` | `/posts/:id` | ADMIN | Delete a post |

### Comments — `/comments`

| Method | Path | Access | Description |
|---|---|---|---|
| `POST` | `/comments/:postId` | Auth | Add a comment to a published post |
| `DELETE` | `/comments/:id` | ADMIN | Delete a comment |

## Data Models

- **User** — `id`, `username`, `email?`, `name?`, `password` (bcrypt), `role` (`USER` \| `ADMIN`)
- **Post** — `id`, `title`, `content`, `summary`, `published`, `authorId`
- **Comment** — `id`, `content`, `postId`, `authorId`
- **RefreshToken** — `id`, `tokenHash`, `userId`, `expiresAt` (7 days)

## Auth Flow

Access tokens expire after **1 hour**. When they expire, the client sends a `POST /auth/refresh` request with its `httpOnly` refresh token cookie. The server validates the hash, issues a new rotating refresh token (old one revoked), and returns a new access token along with the user's profile.
