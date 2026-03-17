# Admin Client

React 19 admin dashboard for managing blog posts. Requires an account with the `ADMIN` role.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Language:** TypeScript
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Editor:** Toast UI Editor (Markdown)

## Prerequisites

- Node.js v20+
- pnpm v10+
- The [`api`](../api) server running on port `3000`

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/
   ```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server on port `5174` |
| `pnpm build` | Type-check and build to `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |

## Features

- **Login** — Admin-only authentication via `/auth/admin/login`
- **Dashboard** — Searchable, filterable, sortable posts table
- **Create / Edit posts** — Markdown editor with title, summary, content, and publish toggle
- **Delete posts** — Confirmation-gated delete
- **Session restore** — On page load, attempt a silent token refresh before redirecting to login

## Auth

On login, an access token and user profile are stored in `localStorage` under `authUser`. The `httpOnly` refresh token cookie is managed by the browser. When the access token expires, `apiFetch` automatically calls `POST /auth/refresh` to obtain a new one. If no valid session can be restored, the user is redirected to `/auth/login`.
