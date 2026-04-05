# Where Is Waldo Client

React + TypeScript frontend for the Where Is Waldo game.

## Tech Stack

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4
- TypeScript

## Scripts

From the `client` directory:

- `pnpm dev`: Start Vite dev server
- `pnpm build`: Type-check and build production bundle
- `pnpm preview`: Preview production build locally
- `pnpm lint`: Run ESLint

## Environment Variables

Create `client/.env`:

```env
VITE_API_BASE_URL="http://localhost:3000"
```

The app uses this value for all API requests.

## Run Locally

```bash
cd client
pnpm install
pnpm dev
```

Client runs on `http://localhost:5173` by default.

## API Integration

Requests are sent with credentials enabled (`credentials: include`) to support cookie-based session behavior from the API.

