# Movie Tracker

Frontend for tracking movies: plan, watching, watched.

## Development

```bash
npm ci
```

Copy `.env.example` to `.env`. Use `VITE_BASE_URL=/api`. The Vite development server proxies `/api`
requests to the backend.

```bash
npm run dev
```

## Checks

```bash
npm run lint
npm run format:check
npm run build
```

## Production preview

```bash
npm run preview
```

## Authentication

Guests can browse and search movies. Registered users can create, edit and delete movies.

Sessions use HTTP-only cookies. Expired access sessions are refreshed automatically. If the session
cannot be restored, the app signs the user out and displays a message.

## Deployment

Set `VITE_BASE_URL=/api` in Vercel. `vercel.json` proxies API requests to the backend and supports
SPA routes.
