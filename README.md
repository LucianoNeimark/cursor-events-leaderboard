# Cursor events leaderboard

A lightweight webpage that tracks door check-ins across your Luma calendar and surfaces a leaderboard ranked by events attended. Data is loaded from the [Luma](https://lu.ma/) public API — no database required. Only guests with a Luma `checked_in_at` timestamp count toward points.

## Architecture

- [ADR 0001 — MVP architecture (original target)](docs/adr/0001-mvp-architecture.md)
- [ADR 0002 — Design-first mocked MVP](docs/adr/0002-design-first-mocked-mvp.md)
- [ADR 0003 — Luma API-only MVP (current)](docs/adr/0003-luma-api-only-mvp.md)

## Getting started

Requires [Node.js](https://nodejs.org/) (includes npm).

```bash
npm install
cp .env.example .env.local
```

### Option A — mock data (no Luma key)

```bash
# .env.local
MOCK_DATA=true
```

```bash
npm run dev
```

### Option B — live Luma data

1. Create a Luma API key for your community calendar ([Luma API docs](https://docs.luma.com/reference/getting-started-with-your-api)).
2. Add to `.env.local`:

```bash
LUMA_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to `/leaderboard`.

## Environment variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `LUMA_API_KEY` | Yes (unless `MOCK_DATA=true`) | Server-only Luma API key |
| `MOCK_DATA` | No | Use mock leaderboard when `true` |

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run dev:clean` | Clear `.next` cache and start dev |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Deploying (Vercel)

Set `LUMA_API_KEY` in the Vercel project environment variables. Do not prefix with `NEXT_PUBLIC_`.
