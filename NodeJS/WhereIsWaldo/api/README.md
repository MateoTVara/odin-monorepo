# Where Is Waldo API

Express + TypeScript API for the Where Is Waldo game.

## Tech Stack

- Express 5
- Prisma 7
- PostgreSQL (`pg`)
- TypeScript

## Scripts

From the `api` directory:

- `pnpm dev`: Run API in watch mode (`tsx watch src`)
- `pnpm build`: Build with `tsdown`
- `pnpm start`: Start built server (`dist/index.mjs`)

## Environment Variables

Create `api/.env` with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
NODE_ENV="development"
PORT="3000"
CORS_ORIGIN="http://localhost:5173"
```

Notes:

- In development, CORS defaults to `http://localhost:5173`.
- In production, `CORS_ORIGIN` must be set.

## Database Setup

Run from `api`:

```bash
pnpm prisma migrate dev --name init
```

Seed data:

```bash
pnpm tsx lib/seed/index.ts
```

Generate Prisma client (if needed):

```bash
pnpm prisma generate
```

## Run Locally

```bash
cd api
pnpm install
pnpm dev
```

API runs on `http://localhost:3000` by default.

## Main Endpoints

- `GET /levels`
- `POST /runs`
- `PATCH /runs/:id`
