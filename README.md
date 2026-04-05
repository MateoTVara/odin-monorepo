# Where Is Waldo

Full-stack TypeScript implementation of a "Where Is Waldo" game.

This repository is split into two standalone projects:

- `api`: Express + Prisma backend
- `client`: React + Vite frontend

## Project Structure

```text
WhereIsWaldo/
  api/      # Backend API, Prisma schema/migrations, seed scripts
  client/   # Frontend app (React + Vite)
  scripts/  # Utility scripts
```

## Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL (for the API)

## Quick Start

1. Install API dependencies:

```bash
cd api
pnpm install
```

2. Install client dependencies:

```bash
cd ../client
pnpm install
```

3. Configure environment variables:

- API vars in `api/.env`
- Client vars in `client/.env`

4. Start both apps (in separate terminals):

```bash
# terminal 1
cd api
pnpm dev
```

```bash
# terminal 2
cd client
pnpm dev
```

## Service URLs

- Client: `http://localhost:5173`
- API: `http://localhost:3000`

## API Routes

The backend currently exposes:

- `/levels`
- `/runs`

See each project README for details:

- `api/README.md`
- `client/README.md`
