# SWE Genie — app

The Next.js app for [www.swe-genie.com](https://www.swe-genie.com). See the repo root `PLAN.md` for full project context.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # scoring engine unit tests (vitest)
npm run lint
npm run build
```

## Structure

- `app/` — Next.js App Router routes (landing, assessment, results, archetype detail,
  methodology, privacy). **No API routes** — the app is a fully static export deployed to GitHub
  Pages (see `docs/deploy.md`); the OG-image and funnel-events API routes that used to exist here
  were removed for that migration and are not currently live.
- `lib/` — the scoring engine (`scoring.ts`, implements `/taxonomy/scoring.md`'s algorithm),
  taxonomy typed loaders, URL encode/decode for shareable results, assessment flow ordering,
  results-copy markdown parsing.
- `data/` — **this is the live source of truth**, not a copy. `data/` started as a synced copy of
  the repo-root `/taxonomy/*.json` (dimensions, archetypes, questions) but that direction inverted
  over Phase 5 and afterward — `data/` gets edited directly and `/taxonomy` has drifted out of
  sync (it still reflects an 18-archetype taxonomy that predates the 2026-07-16 Engineering
  Management removal). Don't "re-sync from `/taxonomy`" — that would overwrite real changes with
  stale ones. If `/taxonomy` is ever revived, it needs to be re-synced *from* `data/`, not the
  other way around.
- `content/results-copy/` — originated as copies of `/docs/assessment/results-copy/*.md`; same
  live-vs-frozen-snapshot relationship as `data/` above — `content/results-copy/` is what's
  actually live (17 files), `/docs/assessment/results-copy/` is the original Phase 3 snapshot (18
  files, includes the removed Engineering Management entry) and hasn't been kept in sync.
- `lib/scoring.test.ts` — unit tests using the exact synthetic personas from
  `/docs/research/validation-v1.md` as fixtures.

## Known v1 gaps (honest, not hidden)

- **Analytics** (`lib/analytics.ts`, `app/api/events/route.ts`) is a stub: funnel events are
  correctly instrumented at every call site but only logged server-side, since no analytics
  service credentials were available to this build. Wiring a real provider is a one-line change
  inside `track()`.
- **Email capture / feedback** uses Formspree (`@formspree/react`) on the "Rate this role" widget
  — no backend or stored email (see ADR-002/003: no database, no login).
- **No formal Lighthouse audit** has been run against a deployed instance; manual QA (build, lint,
  unit tests, browser walkthrough across desktop/mobile/dark-mode) is documented in the Phase 5
  commit, but performance/accessibility scores are unverified numbers, not confirmed ≥90.
