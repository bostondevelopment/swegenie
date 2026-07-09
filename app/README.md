# Roleprint (working name — see `docs/adr/004-name.md`)

The Next.js app for CareerGuru/Roleprint's assessment product. See the repo root `PLAN.md` and
`docs/HANDOFF.md` for full project context.

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
  methodology, privacy, API routes for OG image + funnel events).
- `lib/` — the scoring engine (`scoring.ts`, implements `/taxonomy/scoring.md` exactly),
  taxonomy typed loaders, URL encode/decode for shareable results, assessment flow ordering,
  results-copy markdown parsing.
- `data/` — copies of `/taxonomy/*.json` (dimensions, archetypes, questions). Source of truth is
  the repo-root `/taxonomy` directory; re-sync this copy if those files change.
- `content/results-copy/` — copies of `/docs/assessment/results-copy/*.md`. Same sync note as
  above.
- `lib/scoring.test.ts` — unit tests using the exact synthetic personas from
  `/docs/research/validation-v1.md` as fixtures.

## Known v1 gaps (honest, not hidden)

- **Analytics** (`lib/analytics.ts`, `app/api/events/route.ts`) is a stub: funnel events are
  correctly instrumented at every call site but only logged server-side, since no analytics
  service credentials were available to this build. Wiring a real provider is a one-line change
  inside `track()`.
- **Email capture** is a `mailto:` link, not a stored email — no backend/ESP integration exists in
  v1 (see ADR-002/003: no database, no login).
- **No formal Lighthouse audit** has been run against a deployed instance; manual QA (build, lint,
  unit tests, browser walkthrough across desktop/mobile/dark-mode) is documented in the Phase 5
  commit, but performance/accessibility scores are unverified numbers, not confirmed ≥90.
