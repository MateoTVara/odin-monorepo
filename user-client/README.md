# User Client

React 19 public blog reader. No login required to browse published posts.

## Tech Stack

- **Framework:** React 19 + Vite (rolldown-vite)
- **Language:** TypeScript
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 + `@tailwindcss/typography`
- **Markdown rendering:** react-markdown + react-syntax-highlighter

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
| `pnpm dev` | Start dev server (network-accessible via `--host`) |
| `pnpm build` | Type-check and build to `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — lists all published posts |
| `/posts/:id` | Single post view with rendered Markdown and comments |
| `/auth` | Login page (required to post comments) |
| `*` | 404 Not Found |

## Features

- Browse and read published blog posts without an account
- Syntax-highlighted code blocks in post content
- Authenticated users can post comments on articles
