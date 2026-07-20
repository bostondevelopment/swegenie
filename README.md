# SWE Genie

A 6-minute assessment that ranks 17 engineering role archetypes against how you actually work — sales engineer, solutions architect, forward-deployed engineer, DevRel, platform/infra, SRE, ML engineer, and more — with an explainable, sourced fit score for each.

Live at **[www.swe-genie.com](https://www.swe-genie.com)**.

## Layout

```
/docs          — research, taxonomy spec, branding, UX specs, ADRs
/taxonomy      — versioned taxonomy data (JSON) + scoring rubric (note: app/data/ is the live source — see app/README.md)
/app           — the web application (Next.js + TypeScript + Tailwind)
/PLAN.md       — master plan and current project status
```

## Development

```bash
cd app
npm install
npm run dev     # http://localhost:3000
npm run test    # scoring engine unit tests (vitest)
npm run build   # production build (static export)
npm run lint
```

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy.yml` — push to `main` triggers a build, test, and publish. See [docs/deploy.md](docs/deploy.md) for details.

## Key decisions

Recorded as ADRs in [docs/adr/](docs/adr/). Highlights: no login in v1; scoring is a transparent rubric (not a black box); taxonomy lives in versioned JSON; static GitHub Pages hosting (no server-side code).
