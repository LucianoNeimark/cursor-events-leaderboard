# ADR 0002: Design-first mocked MVP

**Status:** Accepted  
**Date:** 2026-05-19

## Context

[ADR 0001](./0001-mvp-architecture.md) defines the full MVP: Next.js on Vercel, Supabase Postgres with RLS, magic-link auth, admin CSV upload, and a name-only leaderboard. Before wiring infrastructure, we want to validate:

- Cursor Community Brand Guidelines (colors, typography, voice, sentence case).
- Page layout and navigation for `/leaderboard`, `/upload`, and `/login`.
- Leaderboard ranking UX (accent highlight for rank #1, card rows, secondary metadata).

Shipping a design-first slice with **mocked data** lets us iterate on UI quickly without Supabase credentials, migrations, or auth plumbing.

## Decision

Build a **Next.js App Router** application with **Tailwind CSS** and Cursor brand tokens. All leaderboard data lives in `src/lib/mock/`. Upload and login flows are **simulated** in the browser — no server writes, no auth provider.

### Scope (in)

| Item | Notes |
| ---- | ----- |
| `/` → `/leaderboard` redirect | Server Component |
| `/leaderboard` | Server Component; reads `getLeaderboard()` from mock module |
| `/upload` | Client Component; form UI + simulated submit with ADR 0001 JSON summary shape |
| `/login` | Client Component; email form + simulated “check your email” message |
| Brand tokens | CSS custom properties on `:root` (light) and `html.dark` (dark) |
| Theme toggle | Sliding switch in header; persists choice in `localStorage` (`cursor-events-theme`) |
| Typography | Inter via `next/font/google`; Cursor Gothic when licensed |
| Header | Official horizontal 2D lockup (`public/brand/`) swaps variant with active theme |

### Scope (out — deferred to ADR 0001)

- Supabase Postgres, schema migrations, RLS policies
- Supabase Auth (magic link) and `/auth/callback`
- `/api/upload` Route Handler, `papaparse`, service-role writes
- `ADMIN_EMAILS` enforcement
- Environment variables (`NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`)
- Real CSV parsing and idempotent attendance upserts

### Mock data contract

`LeaderboardRow` in `src/lib/types.ts` mirrors the `leaderboard` view from ADR 0001 Appendix A:

- `participant_id`, `name`, `points`, `events_attended`, `last_seen_at`

Upload simulation returns:

```json
{
  "event_id": "uuid",
  "new_participants": 12,
  "new_attendances": 45,
  "skipped_duplicates": 3
}
```

### Theme switching

- **Default:** on first visit, `ThemeScript` (inline in `layout.tsx`) applies `localStorage` if set; otherwise follows `prefers-color-scheme`.
- **Runtime:** `src/lib/theme-store.ts` is the source of truth — it reads/writes `html.dark` and notifies subscribers via `useSyncExternalStore` (avoids React hydration mismatch between server HTML and client theme).
- **UI:** `ThemeToggle` is a sliding switch (light thumb left, dark thumb right) with “Light” / “Dark” labels.
- **Logo:** `CursorLogo` subscribes to the same store so the lockup SVG always matches the active theme.

## Migration path to ADR 0001

When backend work begins:

1. Replace `getLeaderboard()` implementation with a Supabase `select` from the `leaderboard` view (anon key + authenticated session).
2. Add middleware or layout guard requiring auth; wire `/login` to Supabase magic link.
3. Replace simulated `/upload` submit with `POST /api/upload` (admin check + service-role transaction).
4. Remove or gate `src/lib/mock/` behind a `MOCK_DATA=true` flag for local dev only.

No route renames are required — URLs stay the same.

## Consequences

### Positive

- Fast UI iteration without external services.
- Brand and copy validated before infra cost.
- Clear seam: mock module → Supabase query is a single swap point.

### Negative / trade-offs

- No real auth — all pages are publicly reachable in this iteration (acceptable for design review only).
- Upload success does not change leaderboard data until backend exists.
- Brand SVGs must be kept in sync if the official asset package is updated.
- Theme preference is client-only until auth/session work in ADR 0001 (acceptable for design review).

### Local development

- Run a **single** `npm run dev` instance. Do not run `npm run build` while dev is active — both write to `.next` and can corrupt the dev cache.
- If webpack reports a missing chunk (e.g. `Cannot find module './NNN.js'`), stop dev and run `npm run dev:clean` (deletes `.next` then starts dev).

## Open items

| Item | Status | Notes |
| ---- | ------ | ----- |
| Cursor Gothic web font licensing | Pending | Inter is the interim fallback |
| Official logo lockup assets | Done | `public/brand/lockup-horizontal-2d-{light,dark}.svg` |
| Exact Luma CSV column names | Pending | Not needed for mocked upload UI |
| Auth gate on all routes | Deferred | ADR 0001 requires authenticated leaderboard |

## References

- [ADR 0001: MVP architecture](./0001-mvp-architecture.md)
- [Cursor Community Brand Guidelines](https://cursorai.notion.site/Cursor-Community-Brand-Guidelines-2a2da74ef04580e2aa05e8c85972d742)
