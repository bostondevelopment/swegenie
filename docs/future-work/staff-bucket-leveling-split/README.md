# The "Staff" bucket collapses 2-3 real seniority levels

**Before starting this, read
[`../archive/entry-level-l1-l2-tiers/LESSONS-LEARNED.md`](../archive/entry-level-l1-l2-tiers/LESSONS-LEARNED.md).**
That project (shipped 2026-07-19) split a title-regex bucket at the *bottom* of the ladder —
the exact same class of problem this doc describes at the *top* — and hit a specific, avoidable
set of mistakes (confidence mislabeling, an underestimated gapfill scope, a missed UI consumer)
that this doc's own plan should account for from the start rather than rediscovering.

## Problem

**Updated 2026-07-19** — `app/data/comp-by-tier.json` now uses 6 levels per archetype/tier:
`L1`, `L2`, `L3`, `L4`, `L5`, `Staff` (the bottom two were added by the entry-level-l1-l2-tiers
project referenced above; this doc originally described a 4-level `L3`-`Staff` scheme). The
mapping from real job-title seniority to these 6 buckets lives in
`app/scripts/synthesize-comp-data.py` (`EXTRACTION_LEVEL_TO_TIER_LEVEL`), currently:

```python
EXTRACTION_LEVEL_TO_TIER_LEVEL = {
    "Entry (New Grad)": "L1",
    "Junior/Associate": "L2",
    "Mid (unspecified level)": "L3",
    "Senior/Staff": "L4",
    "Principal/Director+ (Manager/VP)": "Staff",
}
```

Same structural problem as before, worth naming explicitly this time: there are 5 title-regex
buckets and 6 tier levels, so one level always goes without direct extraction signal — currently
`L5` (10-14yr, "staff-track"), a deliberate choice made when `L1`/`L2` were added (see the
lessons-learned doc, item 1). **Splitting `Staff` adds a 7th level without adding a 6th
extraction bucket**, so this same "which level goes blind" decision has to be made again — decide
it explicitly as part of Stage 0 below, don't let it fall out of the code by accident.

The code's own comment (updated alongside the `L1`/`L2` mapping) now explains this bucket/level
mismatch directly, not just "inferred from ascending seniority order" — read it in full in
`synthesize-comp-data.py` before starting.

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
   `synthesize-comp-data.py`; `LEVEL_RULES` in *both* `extract-comp-signals-by-tier.py` and
   `extract-comp-signals.py` (need a new regex bucket to distinguish Staff from
   Principal/Distinguished titles — keep the two files in sync, they've drifted from each other
   before); the `CELL_SCHEMA` level enum in `app/scripts/workflows/comp-by-tier-tier-gapfill.js`;
   `EXPECTED_LEVELS` in `scripts/validate-comp-data.ts` (already reads `comp.levels` dynamically
   as of the L1/L2 project, so this one should self-heal — verify it still does); and every UI
   component that renders the level grid — critically **`app/components/comp/comp.utils.ts`'s
   `LEVELS` constant**, not just the `Level` type union in `comp.types.ts` (the L1/L2 project
   shipped a type-only update once and nothing rendered until `comp.utils.ts` was found and
   fixed too — grep for `LEVELS` and `LEVEL_YOE_LABELS` across `app/components/comp/` to find
   every consumer, then also `grep -rln` the whole `app/` tree for anything reading
   `comp-structure.json`'s `levels[].label` field directly — `CompProgressionChart.tsx` renders
   that field with zero relation to the `comp/` component set and was missed once already).
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
