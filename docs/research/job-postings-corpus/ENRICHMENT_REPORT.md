# Phase 6 Enrichment — Final Report

**Generated:** 2026-07-12
**Plan:** `docs/PHASE6_ENRICHMENT_PLAN.md`
**Status: ✅ All 5 phases completed. Final verification gate passes.**

## Top-line status

```
cd app && npx tsc --noEmit && npx eslint . && npm run test -- --run && npm run build
```

- TypeScript: **PASS** (0 errors)
- ESLint: **PASS** (0 errors/warnings)
- Test suite: **PASS** (73/73 tests, 6/6 files)
- Production build: **PASS** (all 45 routes generated, static export clean)

Run at the moment this report was written — not stale from an earlier phase.

---

## What was changed

### Phase 0 (full job-description corpus — went beyond original scope)
Fetched full description text for 67,875 of 67,956 raw postings (99.88%) and 11,784 of ~11,800
classified postings (99-100% per archetype). See `docs/PHASE6_ENRICHMENT_PLAN.md` §2 for the full
story — originally scoped as a ~30-40-per-archetype sample, it turned out every ATS exposed full
text cheaply, so the whole corpus got enriched instead. Output: `by-archetype/{id}.jsonl` (18
files) plus the compressed full archive `job_descriptions.jsonl.gz`.

### Phase 1 (signal extraction)
`docs/research/job-postings-corpus/archetype-signal/*.json` — 18 files, one per archetype.
Structured signal (top requirements with real frequency counts, synthesized responsibility
patterns, real cited comp figures, seniority distribution, brief-divergence notes, per-dimension
scoring evidence, representative company citations) extracted from real posting text by 18
parallel agents. All 18 verified non-empty on `top_requirements`/`top_responsibilities` before
being trusted.

### Phase 2 (results-copy rewrite)
`app/content/results-copy/{id}.md` — all 18 files rewritten in place, grounded in Phase 1 signal.
Recompiled to `app/data/results-copy.json` via `npm run results-copy:generate`. Structural
integrity verified programmatically (all 18 files retain exactly 6 required `##` headings in
order; both `{{top_dimension_N}}` and `{{growth_dimension}}` placeholder families intact in every
file) before the compile step ran. Spot-checked in the live dev server for both a data-rich
archetype (`ml-engineer`) and the thinnest one (`solutions-architect-vendor-side`) — both produced
specific, evidence-grounded copy, not generic filler (e.g. the ML Engineer page now flags that
~1/3 of postings use "AI Engineer" for the same job; the Solutions Architect Vendor-side page now
correctly identifies "Partner Solutions Architect" as the dominant live pattern, ~3 in 5 postings,
which the old copy didn't distinguish).

### Phase 3 (question quality)
`docs/research/job-postings-corpus/question-quality-report.md` — full audit of all 22 dimension
anchors and all 40 questions against the Phase 1 signal. Result: 21 of 22 anchors needed no
change; 1 low-risk question-wording fix identified and applied
(`q_variable_comp_1`'s prompt, in both `taxonomy/questions.json` and `app/data/questions.json`) —
"30% of your pay depends on a quarterly number" → language using real market vocabulary ("OTE",
"quota") that the corpus showed is what postings actually say, versus the invented-sounding
original phrasing. Confirmed wording-only: all 73 tests still pass with **zero** change to any
expected numeric value. Also surfaced 2 coverage-gap observations and 1 anchor-wording suggestion,
all classified NEEDS-HUMAN-REVIEW and left as proposals (see "Human TODO" below) — nothing scoring-
related was touched autonomously.

**Bonus catch, unrelated to this plan's scope but found while cross-checking sync integrity:** a
pre-existing drift between `taxonomy/questions.json` and `app/data/questions.json` — a single
stale `stackIntake.notes` string in the `taxonomy/` copy that predated the "domains" self-report
feature (added to `assessment-flow.ts` before Phase 6 started). Text-only, no scoring impact, but
it broke the byte-identical-sync invariant this plan's safety rails depend on — fixed by syncing
the more accurate `app/data/` version's text back into `taxonomy/questions.json`.

### Phase 4 (currently-hiring section)
New `app/data/archetype-citations.json` (built from Phase 1's `representative_companies_currently_hiring`
field) + a new "Companies hiring for this role" section added to
`app/app/archetypes/[id]/page.tsx`, between "What matters most" and "How to test this cheaply".
7-8 real company/title citations per archetype, each linking to the real posting URL, with an
explicit "snapshot from {date}, not a live feed" caption matching the product's existing anti-
oversell voice. Verified via computed-style inspection (card background/radius/no-underline all
correct, real hrefs) on both the highest-volume archetype (Product/Full-Stack, 542 companies) and
the thinnest (Solutions Architect Vendor-side, 21 companies) — renders correctly at both ends of
the data-volume range, no broken/empty-looking states.

### Phase 5 (this report)
You're reading it.

---

## What was proposed but NOT applied

All from `question-quality-report.md`, classified NEEDS-HUMAN-REVIEW per the plan's safety rails
(anything touching dimension anchors, mapping, weights, or new questions/dimensions requires a
human decision, not autonomous application):

1. **`variable_comp_appetite` anchor wording** — the dimension's anchor text leans on "billable-
   utilization percentage" as its headline framing, but real postings across 5 archetype signal
   files show "OTE"/"commission"/"quota" is the actual live vocabulary. A more concrete anchor
   rewrite is proposed in the report but not applied (anchor text is scoring-adjacent, held to a
   higher bar than question prompts).
2. **Coverage gap: AI-coding-assistant/agentic-tool workflow fluency** — evidenced repeatedly
   across `product-full-stack-software-engineer`, `mobile-engineer`, `data-engineer`, `ml-engineer`
   signal files as a real, fast-growing requirement pattern, distinct from `ml_engineering_fluency`.
   No dimension currently captures it. Whether this warrants a new dimension (and the taxonomy-wide
   rebalancing that would require) is a human call.
3. **Coverage gap: government/federal security-clearance eligibility** — strongest in
   `forward-deployed-engineer` (42% of its 424-posting sample mentions clearance requirements). No
   current dimension captures this. Same "does this warrant a new dimension" judgment call.

None of these were touched. They're fully described with evidence in
`question-quality-report.md`.

---

## Corpus / enrichment stats

- **744 companies** verified via real HTTP requests (unchanged from the pre-Phase-6 corpus).
- **67,956 raw postings** harvested; **67,875 (99.88%) now have full description text**.
- **11,784 classified postings have full text** feeding Phase 1 (essentially 100% of every
  archetype's classified postings except tiny rounding — see the per-archetype table in
  `docs/PHASE6_ENRICHMENT_PLAN.md` §2).
- Workday description-fetch required two passes: first pass 84.4% success (19,241/22,809, mostly
  HTTP 429 rate-limiting), gentler retry pass recovered 98.5% of the failures (3,510/3,563),
  leaving 53 permanently-unrecoverable postings (0.2% of Workday total) — logged at
  `descriptions/final_unrecoverable_errors.json`.
- Greenhouse's `content` field required an HTML-double-unescape fix mid-harvest (first pass
  produced garbage `&lt;div&gt;`-style text) — caught by a manual spot-check before trusting the
  data, re-harvested cleanly, zero errors on the fix pass.
- Phase 1 `postings_analyzed` per archetype ranges from 57 (Solutions Architect Vendor-side, its
  full population — no surplus to sample) to 400 (Product/Full-Stack SWE, deliberately sampled
  from 6,204 available to keep one agent's context bounded).

---

## Synced-file integrity check

```
taxonomy/archetypes.json  ⟷  app/data/archetypes.json   : IDENTICAL
taxonomy/questions.json   ⟷  app/data/questions.json    : IDENTICAL
taxonomy/dimensions.json  ⟷  app/data/dimensions.json   : IDENTICAL
```

All three pairs confirmed byte-identical (via sorted-key JSON diff) at the time this report was
written.

---

## git status --short (at report time)

```
 M PLAN.md
 M app/app/archetypes/[id]/page.tsx
 M app/app/assessment/page.tsx
 M app/app/globals.css
 M app/app/layout.tsx
 M app/app/methodology/page.tsx
 M app/app/page.tsx
 M app/app/personas/[id]/page.tsx
 M app/app/personas/page.tsx
 M app/app/privacy/page.tsx
 M app/app/results/ResultsClient.tsx
 M app/components/FitBar.tsx
 M app/components/ShareBar.tsx
 M app/components/SiteFooter.tsx
 M app/components/SiteHeader.tsx
 M app/content/results-copy/*.md            (18 files, Phase 2)
 M app/data/archetypes.json                 (v1.5, confidence fix — prior pass)
 M app/data/questions.json                  (Phase 3 wording fix + drift fix)
 M app/data/results-copy.json               (Phase 2 compile output)
 M app/lib/assessment-flow.test.ts          (external edit, not this plan)
 M app/lib/assessment-flow.ts               (external edit, not this plan)
 M docs/HANDOFF.md
 M docs/research/roles-summary.md
 M docs/research/roles/*.md                 (18 files, prior "posting corpus scale" pass)
 M taxonomy/archetypes.json                 (v1.5 — prior pass)
 M taxonomy/questions.json                  (Phase 3 wording fix + drift fix)
?? app/data/archetype-citations.json         (Phase 4)
?? docs/PHASE6_ENRICHMENT_PLAN.md
?? docs/research/job-postings-corpus/       (Phase 0/1/3 outputs, 183M — see note below)
?? taxonomy/title-classification-rubric.json (prior pass)
```

Note: several `M` entries above (the 18 `docs/research/roles/*.md` files, `taxonomy/archetypes.json`
v1.5, `taxonomy/title-classification-rubric.json`) and `app/lib/assessment-flow.{ts,test.ts}` predate
this Phase 6 run — they're carried over from the corpus-building pass and an unrelated external
edit (the "domains" self-report feature), not something this run touched further.

`docs/research/job-postings-corpus/` is 183M total, largest single file 64M
(`job_descriptions.jsonl.gz`) — under GitHub's 100M per-file hard limit, confirmed.

---

## Human TODO

1. **Decide on the 3 NEEDS-HUMAN-REVIEW items** in `question-quality-report.md` (§ "What was
   proposed but NOT applied" above has the summary; the report has full evidence). None are urgent
   — the product works correctly without them — but they're real, evidence-backed findings.
2. **Consider whether to commit this work.** Per my standing instructions I don't commit without
   being asked — the working tree has 64 modified/new file groups (see git status above), all
   verified passing the full gate. Your call on how to split it into commits (the plan suggested
   small reviewable diffs; realistically, given how the phases interlock — Phase 2's copy compiles
   into Phase 4's data file's sibling, etc. — a small number of phase-sized commits is probably more
   honest than 64 tiny ones).
3. **`docs/research/job-postings-corpus/` is large (183M).** Confirmed under GitHub's hard limits,
   but worth a conscious "yes, commit this" decision given the size, or consider whether Git LFS
   makes more sense for a repo that'll keep growing this kind of corpus.
4. Everything else in this run completed cleanly with no blockers.
