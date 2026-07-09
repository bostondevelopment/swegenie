# CareerGuru (working name)

A website that helps software engineers discover which engineering role archetypes best fit
their skills, temperament, and incentives — sales engineer, solutions architect,
forward-deployed engineer, customer engineer, DevRel, and the classic IC tracks — via an
assessment that produces a ranked, explainable list of role matches.

**Status:** Phase 0 (foundation). See [PLAN.md](PLAN.md) for the full roadmap and current status.

## Layout

```
/docs          — research, taxonomy spec, branding, UX specs, ADRs
/taxonomy      — versioned taxonomy data (JSON) + scoring rubric
/app           — the web application (Next.js + TypeScript + Tailwind)
/PLAN.md       — master plan, single source of truth for project status
```

## Development

```bash
cd app
npm install
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```

## Key decisions

Recorded as ADRs in [docs/adr/](docs/adr/). Highlights: taxonomy lives in versioned JSON and is
the contract between research and app (schema changes require a version bump + ADR); v1 requires
no login; scoring is a transparent rubric, not a black box.
