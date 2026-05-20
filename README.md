# Cursor events leaderboard

A lightweight webpage that tracks door check-ins across your Luma calendar and surfaces a leaderboard ranked by events attended. Data is loaded from the [Luma](https://lu.ma/) public API — no database required. Only guests with a Luma `checked_in_at` timestamp count toward points.

## Architecture

- [ADR 0001 — MVP architecture (original target)](docs/adr/0001-mvp-architecture.md)
- [ADR 0002 — Design-first mocked MVP](docs/adr/0002-design-first-mocked-mvp.md)
- [ADR 0003 — Luma API-only MVP](docs/adr/0003-luma-api-only-mvp.md)
- [ADR 0004 — Vercel free-tier hosting](docs/adr/0004-vercel-free-tier-hosting.md)

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

## Refreshing the cache on demand

The leaderboard page uses Next.js ISR with stale-while-revalidate
(`revalidate = 7200` seconds). Visitors always get cached HTML instantly; when
the cache is past its window, the request that "discovers" it serves stale and
triggers a background regeneration — so users never see a loading screen.

To keep that background regeneration firing on schedule even when the site has
no live traffic, point a scheduler like [cron-job.org](https://cron-job.org)
at:

```bash
curl https://<your-app>.vercel.app/api/revalidate
# → {"ok":true,"pinged":true,"target":"/leaderboard","now":...}
```

The endpoint is an unauthenticated "fake visitor" that internally fetches
`/leaderboard` so SWR fires, and returns a few bytes of JSON so cron-job.org
doesn't trip its "output too large" limit. It deliberately does **not** call
`revalidateTag` / `revalidatePath` — those evict the cache and would force the
next real visitor to block on a full Luma rebuild. Cache freshness is bounded
by `revalidate`, not by cron frequency; lower the `revalidate` constants in
`src/app/leaderboard/page.tsx` and `src/lib/luma/leaderboard.ts` if you want
faster updates.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run dev:clean` | Clear `.next` cache and start dev |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Deploying on Vercel (free tier)

See [ADR 0004](docs/adr/0004-vercel-free-tier-hosting.md) for rationale and limits.

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), **Import** the repo.
3. Confirm **Framework Preset:** Next.js (auto-detected). Leave build command as `npm run build`.
4. Under **Environment Variables**, add:
   - `LUMA_API_KEY` = your Luma calendar API key  
   - Scope: **Production** (and **Preview** if you want live data on PR previews).
5. Set **Production Branch** to `dev` (or your chosen default branch).
6. Deploy.

After deploy, open the `*.vercel.app` URL — `/` redirects to `/leaderboard`.

**Do not** prefix secrets with `NEXT_PUBLIC_`. Do not commit `.env` or `.env.local`.
