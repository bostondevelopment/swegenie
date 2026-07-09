# ADR-003: v1 account model

**Status:** Accepted
**Date:** 2026-07-08

## Decision

**No login required for anything in v1.** The full flow — assessment, results, sharing — works
anonymously.

- Assessment answers live in localStorage; results are shareable via URL-encoded payloads
  (ADR-002). Nothing is stored server-side.
- **Optional email capture** on the results page ("email me my results / notify me when the
  taxonomy updates") — stored in the newsletter/ESP tool, not an account system. This is the
  only PII collected in v1.
- **LinkedIn OAuth is deferred to Phase 8**, where it serves role *verification* for taxonomy
  contributors — a different job than authentication, and only valuable once traffic can supply
  contributors (see PLAN.md Phase 8 gate).

## Rationale

- Login walls kill completion on a ~6-minute assessment with an audience (engineers) that is
  privacy-sensitive and signup-averse. The share loop is the growth mechanism; friction before
  results starves it.
- Assessment answers are sensitive-ish data (career doubts, preferences). Not persisting them
  server-side is both the cheapest and the most trustworthy posture — and it's a marketable
  property ("your answers never leave your browser").
- v1 has no feature that needs identity. Building auth now is pure carrying cost.

## Consequences

- "Save your result" = bookmark the share URL or use email capture. Acceptable for v1.
- Beta metrics (Phase 6) rely on anonymous funnel analytics + a post-result survey link, not
  per-user tracking.
- Phase 8 introduces real accounts for contributors only; assessment-takers stay anonymous
  even then.
