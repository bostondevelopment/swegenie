# 32 comp-by-tier cells are still low-confidence, on purpose

## Problem

`app/data/comp-by-tier.json` has 360 total cells (18 archetypes × 5 tiers × 4 levels). A gapfill
research pass (2026-07-13) closed 18 of the 50 cells that were low-confidence before it ran (9
moved to `medium`, 9 to `high`) using `Workflow({ scriptPath:
"app/scripts/workflows/comp-by-tier-tier-gapfill.js" })`. **32 cells remain `confidence: "low"`**,
concentrated in `ai-labs`/`early-stage` at the `L3`/`Staff` ends, across 8 archetypes:

```
embedded-iot-engineer:                ai-labs L3/L4/L5, growth-stage-private L3, early-stage L3/L4/L5/Staff
solutions-architect-consulting:       ai-labs L3
customer-support-engineer:            ai-labs L3/L5/Staff, faang-mag7 Staff, growth-stage-private L3,
                                       early-stage L3/L4/L5/Staff
customer-support-solutions-engineer:  ai-labs L3, growth-stage-private Staff, early-stage L3/L5/Staff
consulting-engineer-professional-services: early-stage L3/L4/L5/Staff
developer-relations-advocacy:         ai-labs L3, growth-stage-private L3, early-stage L3/L5
engineering-management:               ai-labs L3
```

This is **not a bug or a gap in effort** — the gapfill workflow's own research agents checked
these cells and reported, cell by cell, that no real per-tier-per-level anchor exists (e.g. AI
labs don't publicly disclose comp for embedded/IoT roles because they don't hire for that
function at meaningful volume; early-stage startups below ~40 people rarely have 4 distinct
formal levels to report against). Forcing a `medium`/`high` confidence here would mean
fabricating precision the underlying market doesn't have. `low` is the honest label.

## What "done" looks like

There is no fixed finish line — this shrinks opportunistically as the market changes and as new
job postings enter the corpus, not on a schedule (the user has explicitly said: no cron job for
this; it's part of the same manual pipeline described in `docs/ADD_ARCHETYPE.md` Stage 4f,
run "at various points" alongside harvest/classify/extract).

When picking this up:

1. Re-run `python3 scripts/extract-comp-signals-by-tier.py` (from `app/`) first, to refresh the
   corpus-extraction context with whatever new postings have landed since the last run — cheap,
   deterministic, always safe to run.
2. Re-run the gapfill Workflow: `Workflow({ scriptPath:
   "app/scripts/workflows/comp-by-tier-tier-gapfill.js" })`. It re-computes the current
   low-confidence set dynamically each run (no stale hardcoded list to maintain) and only spends
   real research effort on what's still low.
3. Expect most of these 32 to stay low most rounds. That's a legitimate outcome, not a failed
   run — re-read the per-cell `rationale` the workflow reports before assuming something needs
   to change.
4. Confirm `npx tsc --noEmit` and `validate-comp-data.ts` still pass after any write (the
   workflow's synthesis phase already runs both, but re-check).

## Do not

Don't lower the bar for what counts as "real evidence" just to close the count — a `low` cell
that's actually low because the market segment doesn't exist is more useful to a reader than a
`medium` cell built on a shaky proxy.
