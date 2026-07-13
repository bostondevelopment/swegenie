# The "Staff" bucket collapses 2-3 real seniority levels

## Problem

`app/data/comp-by-tier.json` uses 4 levels per archetype/tier: `L3`, `L4`, `L5`, `Staff`. The
mapping from real job-title seniority to these 4 buckets lives in
`app/scripts/synthesize-comp-data.py` (`EXTRACTION_LEVEL_TO_TIER_LEVEL`):

```python
EXTRACTION_LEVEL_TO_TIER_LEVEL = {
    "Entry/Associate": "L3",
    "Mid (unspecified level)": "L4",
    "Senior/Staff": "L5",
    "Principal/Director+ (Manager/VP)": "Staff",
}
```

The code's own comment admits this is "inferred from ascending seniority order... not from any
existing mapping table (none exists in the repo)."

A research pass (2026-07-13) checked this against levels.fyi's per-company level ladders and
found the top bucket is a real miscalibration, not just a naming quirk. At `faang-mag7` and
`ai-labs` tiers, real orgs treat Staff, Senior Staff, Principal, and Distinguished as separate
levels with very different comp — this app's schema folds all of them into one `Staff` cell:

- **Google**: L6 Staff $644K → L7 Senior Staff → L8 Principal → L9 Distinguished ~$1.79M —
  a ~2.8x spread inside one cell.
- **Anthropic**: Senior MTS $700K–$1.4M → Staff MTS $1M–$2.5M → Principal MTS $2M–$5M — three
  non-overlapping bands.
- **Amazon**: L6 Senior → L7 Principal ($500K–$900K+) → L8 Senior Principal, a distinct rung above.
- **Meta**: E6 Staff → E7 Senior Staff (org-wide scope) → E8 Principal (industry-level impact)
  → E9 Distinguished (SVP-scope).

It matters far less at `early-stage`/`growth-stage-private`, where formal ladders below ~40
engineers often don't exist and "Staff Engineer" already means "senior-most non-founder IC" —
folding Principal/Director/VP in is a closer match to how those companies actually title people.

A separate, already-fixed bug compounded this (see git history on
`app/scripts/extract-comp-signals-by-tier.py`, `LEVEL_RULES`): the regex
`principal(?! engineer)` was excluding "Principal Engineer" and "Distinguished Engineer" titles
from the top bucket entirely, misclassifying them down to L4/L5. That bug is fixed. This
document is about the remaining, legitimate design question: should the top bucket itself split.

## What "done" looks like

This is **not mechanical** — per `docs/ADD_ARCHETYPE.md`'s own philosophy, taxonomy/leveling
definitions are "the one stage that is not mechanical," reviewed by a human, not auto-applied.
Start by drafting a recommendation, not a code change:

1. Decide whether to split `Staff` into more levels (e.g. add `Staff+`/`Principal`), and if so,
   whether that split applies uniformly across all 5 tiers or only where it's warranted
   (`faang-mag7`, `ai-labs`) — a uniform 5th column at `early-stage` may just be empty/`null`
   most of the time, which is fine per the existing "legitimate to stay low/absent" pattern used
   elsewhere in this pipeline.
2. If a split is approved, the touch points are: `app/data/comp-by-tier.json`'s `levels` array
   and every archetype's per-tier cell object; `EXTRACTION_LEVEL_TO_TIER_LEVEL` in
   `synthesize-comp-data.py`; `LEVEL_RULES` in `extract-comp-signals-by-tier.py` (need a new
   regex bucket to distinguish Staff from Principal/Distinguished titles); the `CELL_SCHEMA`
   level enum in `app/scripts/workflows/comp-by-tier-tier-gapfill.js`; and every UI component
   that renders the 4-level grid (`app/components/comp/ArchetypeCompareTable.tsx`,
   `ArchetypeCompareStage.tsx`, and whatever renders `TierCompChart` — grep for `"Staff"` and
   the `levels` array to find all of them).
3. New cells need real research, not synthetic interpolation — re-run
   `Workflow({ scriptPath: "app/scripts/workflows/comp-by-tier-tier-gapfill.js" })` (or a
   variant of it) after the schema change, since it already knows how to find real per-tier
   per-level anchors and archive sources.
4. Validate with `validate-comp-data.ts` (run from `app/`:
   `npx ts-node --compiler-options '{"module":"commonjs"}' ../scripts/validate-comp-data.ts`)
   and `npx tsc --noEmit` before considering it done.

## Do not

Don't silently reinterpret "Staff" to mean "Staff-only median" without adding a new bucket for
Principal+ — that would just move the compression problem, not fix it, and would also change
already-cited numbers without new evidence to support the change.
