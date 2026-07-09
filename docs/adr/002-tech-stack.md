# ADR-002: Tech stack

**Status:** Accepted
**Date:** 2026-07-08

## Context

v1 is a content-heavy static-ish site (landing, methodology, archetype pages) plus a
client-interactive assessment and shareable result pages. The taxonomy and questions are
versioned JSON; the scoring algorithm is a deterministic pure function. No server-side state is
required to take the assessment.

## Decision

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Scoring engine:** pure TypeScript module in the app, unit-tested (Vitest), consuming
  `/taxonomy/*.json` as its only input. No network calls to score.
- **Assessment state:** client-side only, persisted to localStorage (autosave/resume).
- **Shareable results:** encode the result payload in the share URL (compressed query param or
  short hash); OG images generated at request time via Next.js OG image generation. No database
  required for sharing.
- **Database:** none in v1. Add Postgres (Supabase or Neon) only when a feature requires it
  (email-saved results, Phase 8 contributions). Revisit via ADR when triggered.
- **Hosting:** Vercel (free tier is sufficient for v1; OG image generation and preview deploys
  come free).
- **Analytics:** privacy-respecting, cookieless (Plausible or Vercel Analytics) — funnel events:
  land → start → complete → share.

## Rationale

- One deployable, no backend to operate; the whole product is taxonomy JSON + pure scoring +
  presentation. This keeps agents' build surface small and testable.
- URL-encoded results avoid a database, an account system, and a privacy surface in v1 —
  answers never leave the browser except as the user's explicit share action.
- Next.js gives static generation for the content pages (SEO for archetype pages matters — they
  are the long-tail acquisition surface) plus API routes/OG generation when needed.

## Consequences

- Taxonomy JSON is the research↔app contract. Schema changes require a taxonomy version bump
  and an ADR (per PLAN.md agent notes).
- If result payloads outgrow URL limits, introduce a KV store for short links (small,
  contained change).
- Phase 8 (accounts, LinkedIn OAuth, contributions) will add a database and auth — deferred
  deliberately; nothing in v1 architecture blocks it.
