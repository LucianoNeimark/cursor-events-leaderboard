# Cursor events leaderboard

A lightweight webpage that tracks Cursor community event attendance and surfaces a leaderboard ranked by events attended. This repository is being built in stages — see the architecture decision records below.

## Current stage (mocked data)

The app runs as a **design-first preview** with all data mocked in `src/lib/mock/`. Upload and sign-in flows are simulated in the browser. No Supabase, auth, or database is wired yet.

- [ADR 0001 — MVP architecture (target)](docs/adr/0001-mvp-architecture.md)
- [ADR 0002 — Design-first mocked MVP (current)](docs/adr/0002-design-first-mocked-mvp.md)

## Getting started

Requires [Node.js](https://nodejs.org/) (includes npm). If you use Homebrew: `brew install node`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to `/leaderboard`.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |
