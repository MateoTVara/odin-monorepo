# BlogApi Monorepo

A full-stack blogging platform composed of three packages: a REST API, an admin dashboard, and a public reader client.

## Packages

| Package | Description | Default Port |
|---|---|---|
| [`api`](./api) | Express REST API with JWT auth and PostgreSQL | `3000` |
| [`admin-client`](./admin-client) | React admin dashboard for managing posts | `5174` |
| [`user-client`](./user-client) | React public blog reader | `5173` |

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v10+
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

Install dependencies from each package directory:

```bash
cd api && pnpm install
cd ../admin-client && pnpm install
cd ../user-client && pnpm install
```

Then follow the setup steps in each package's own README.

## Architecture Overview

```
BlogApi/
├── api/            # Express 5 REST API — auth, posts, comments
├── admin-client/   # React 19 + Vite — CRUD dashboard (ADMIN role required)
└── user-client/    # React 19 + Vite — public post reader
```

- The API issues short-lived **access tokens** (1 h) and rotating **refresh tokens** (7 d stored hashed in the database).
- Both clients communicate with the API over HTTP. The refresh token is stored in an `httpOnly` cookie scoped to `/auth`.
- Only users with the `ADMIN` role can access the admin client.
