# Adding L1/L2 (entry-level / junior) tiers

## Problem

`app/data/comp-by-tier.json` and every UI surface that renders it (`ArchetypeCompareTable.tsx`,
`ArchetypeCompareStage.tsx`, `TierCompChart.tsx`, `CompSection.tsx`, `ResultsClient.tsx`) are
built around a 4-level scale: `Level = 'L3' | 'L4' | 'L5' | 'Staff'`
(`app/components/comp/comp.types.ts:15`). There is no `L1`/`L2`. This isn't a rendering filter —
the type union itself has no room for them, so it's not something a UI tweak can fix.

Worse: the raw signal layer already can't tell new-grad from junior-with-a-year-of-experience.
`LEVEL_RULES` in both `app/scripts/extract-comp-signals.py` and
`app/scripts/extract-comp-signals-by-tier.py` matches `junior|jr|associate|entry[- ]level|new
grad|I\b` as a single bucket, `"Entry/Associate"`, which `EXTRACTION_LEVEL_TO_TIER_LEVEL`
(`synthesize-comp-data.py:66-71`) then maps straight onto `L3` — the *bottom* of today's scale.
So entry-level users (explicitly named as target audience in `docs/marketing/launch-plan.md:31`,
"New grad / early career (0-2 YOE)") are quietly folded into the same number as a 2-6 year
mid-level engineer.

This is the mirror image of [staff-bucket-leveling-split](../staff-bucket-leveling-split/README.md):
that doc found the *top* bucket (`Staff`) compresses Staff/Senior Staff/Principal/Distinguished
into one cell; this is the same compression problem at the *bottom*, folding New Grad and
1-3-year Associate into one `L3` cell. Same root cause too — per that doc's own finding, the
4-level scale was "inferred from ascending seniority order... not from any existing mapping
table (none exists in the repo)." There has never been a real leveling/YOE-banding methodology
in this repo, at either end.

Unlike the Staff split, there's no existing per-company ladder data already sitting in
`comp-extraction-by-tier/` to lean on — the extraction regex today doesn't even distinguish new
grad from associate, so this needs new extraction logic before it needs new numbers.

## What "done" looks like

Per [`docs/ADD_ARCHETYPE.md`](../../ADD_ARCHETYPE.md)'s own philosophy: taxonomy/leveling
definitions are "the one stage that is not mechanical" — draft a recommendation and get it
human-reviewed before touching any pipeline script. Everything below follows the existing
pipeline's stages (same scripts, same order, same rigor) — this is not a new methodology, it's
the existing one run against a new part of the ladder.

### Phase 0 — Taxonomy decision (human-reviewed, blocks everything else)

1. Decide the actual split: is it two levels (`L1` = new grad / 0-1 YOE, `L2` = associate /
   1-3 YOE), or does the market only really support one clean entry rung below today's `L3`?
   Check what real ladders use — Google L3 *is* new grad, Meta E3 is new grad, Amazon L4 is
   entry — i.e. some companies' own "L3" already means what this app currently calls the entry
   tier. That naming collision needs to be resolved explicitly (this app's `L3` is an internal
   ordinal, not the same as any one company's `L3` — worth stating on the page if it isn't
   already, since a user matching this app's `L3` to their own employer's L3 title could
   misread the number).
2. Decide whether the split applies uniformly across all 5 company tiers. Precedent from the
   Staff doc: `early-stage`/`growth-stage-private` often don't have a formal ladder below ~40
   engineers, so an `L1`/`L2` split may just be sparse or absent there — same "legitimate to
   stay low/absent" pattern already used for thin cells (see
   [thin-comp-cells-early-stage](../thin-comp-cells-early-stage/README.md)), not a defect to
   force-fill.
3. Write the operational definition (title patterns + YOE bands) that Phase 1's regex work will
   encode — this doesn't exist anywhere in the repo today for *any* level, so this phase also
   produces the first such table, not just an extension of one.

### Phase 1 — Extraction layer (mechanical, once Phase 0 is signed off)

4. Split the `"Entry/Associate"` bucket in `LEVEL_RULES` (both `extract-comp-signals.py:55-62`
   and `extract-comp-signals-by-tier.py:77-84`) into two regex buckets matching Phase 0's
   definition — e.g. new-grad/entry-level/`\bI\b` vs. junior/associate/`\bII\b`. Keep both
   scripts' `LEVEL_RULES` in sync (they already drifted from each other once — the `by-tier`
   version's `principal` pattern fix wasn't ported to the flat version, per the Staff doc's
   own note — verify they match before editing).
5. Add `L1`, `L2` to `EXTRACTION_LEVEL_TO_TIER_LEVEL` (`synthesize-comp-data.py:66-71`) and to
   the `levels` array in `app/data/comp-by-tier.json`. **Also re-point the existing 3 mappings,
   don't just add the 2 new ones**: with `L1`/`L2` now claiming the bottom of the ladder, the 5
   title-regex buckets can't cover all 6 tier levels 1:1 (`"Senior/Staff"` alone already
   conflates two levels' worth of titles), so leaving `Mid (unspecified level)` → `L4` and
   `Senior/Staff` → `L5` unchanged silently mismaps both — an unqualified title reads as L3
   (3-6yr, not-yet-senior), not L4 (6-10yr, senior), and `Senior/Staff` is dominated by volume
   by "Senior" (~5-10yr per levels.fyi's leveling guide) not "Staff" (rarer, wider band), so it
   fits L4 better than L5. Correct assignment: `Mid (unspecified level)` → `L3`,
   `Senior/Staff` → `L4`, `Principal/Director+ (Manager/VP)` → `Staff` (unchanged — Principal is
   15+yr per the same leveling guide, consistent with Staff's 14+ band). This leaves `L5`
   (10-14yr, "staff-track") as the one tier level with no direct extraction bucket — deliberately,
   since it's also the level `TAXONOMY-PROPOSAL.md` §5 flagged as an unresearched placeholder,
   so the gap costs less there than it would on `L3`, which the proposal actually anchored with
   evidence. Full rationale lives in the code comment above `EXTRACTION_LEVEL_TO_TIER_LEVEL`.
6. Update the `CELL_SCHEMA` level enum in `app/scripts/workflows/comp-by-tier-tier-gapfill.js`.
7. Check `extract-comp-signals.py`'s `summarize()` function for any other hardcoded level-label
   list beyond `LEVEL_RULES` itself — it had one (`by_level`'s loop, now a `LEVELS` constant)
   that still referenced the pre-split `"Entry/Associate"` name and was missing
   `"Junior/Associate"` entirely; left as-is it would have silently dropped the entry-level/
   junior rows from every archetype's `comp-structure.json` `levels` breakdown, not just failed
   to add new ones.

### Phase 2 — Data backfill (the actual research/collection effort)

8. Re-run the full Stage 4 pipeline from `ADD_ARCHETYPE.md`, in order, for *every* archetype
   (a levels-array change is structural, not per-archetype, so treat it like Stage 4b's
   blast-radius report names all 17):
   ```
   python3 docs/research/job-postings-corpus/classify.py --reclassify-all   # from repo root — confirm zero title-routing changes, only level-routing
   python3 app/scripts/build-by-archetype.py                                # from repo root
   cd app
   python3 scripts/extract-comp-signals.py
   python3 scripts/extract-comp-signals-by-tier.py
   python3 scripts/synthesize-comp-data.py --changed-archetypes <all 17 ids>
   ```
9. **Expect thin initial coverage.** New-grad and associate postings are structurally
   under-represented in the existing 744-company/67,956-posting ATS corpus — many companies
   route campus/new-grad hiring outside their standard ATS req flow, or post it seasonally
   outside this corpus's harvest window(s). Don't force volume by loosening classification
   patterns; a genuinely thin `L1` bucket for a given archetype/tier is an expected finding
   (same posture as the existing thin-cells doc), not a pipeline bug.
10. Run the gapfill Workflow for the new `L1`/`L2` columns specifically:
   `Workflow({ scriptPath: "app/scripts/workflows/comp-by-tier-tier-gapfill.js" })`. This
   consumes real tokens (WebSearch/WebFetch-heavy multi-agent research) — confirm before
   triggering, same as any other Workflow run, and expect to need it across most/all of the
   17 archetypes × 5 tiers, since these are all brand-new cells, not a handful of low-confidence
   ones.
11. **Scale estimate — revised after Phase 2 actually ran (2026-07-18), larger than first
    estimated.** All 510 cells (17 archetypes × 5 tiers × 6 levels) are `confidence: "low"`
    right now, not just the ~170 new `L1`/`L2` ones — `synthesize-comp-data.py` correctly
    downgrades an entire archetype's cells when it's in `--changed-archetypes`, and every
    archetype had to be passed (the levels-array change is global). The burden is asymmetric,
    though, and Stage 3's prompt now says so explicitly:
    - **170 `L1`/`L2` cells** need full research from scratch — they're currently a flat
      placeholder (the archetype's whole-career low/median/high band copy-pasted onto every
      tier and both new levels identically, e.g. the same number for a new-grad cell as for
      Staff), not a real per-level estimate.
    - **340 `L3`–`Staff` cells** kept their real, previously-researched dollar figures — only
      confidence was reset (the `Mid`/`Senior-Staff` remapping in Phase 1 item 5 changed which
      corpus signal feeds `L3`/`L4`/`L5`, so the old confidence no longer describes what these
      cells currently mean). These need re-verification, not from-scratch research — check the
      existing number still holds, don't replace it without clear contrary evidence.
    Even accounting for the cheaper 340, this is a bigger Stage 3 than the original ~170-cell
    estimate. The one documented gapfill pass to date (2026-07-13) moved 18 of 50 low-confidence
    cells in a single Workflow run across 8-9 archetypes; thin archetypes have taken "three
    gap-fill rounds (~640 companies searched, 15 sourcing agents)" per
    `docs/research/roles-summary.md:41`. Budget this as several gapfill rounds, not one pass —
    plan it as its own phased project, the same way `docs/PHASE6_ENRICHMENT_PLAN.md` phased the
    original corpus build.

### Phase 3 — Validation

12. Update `scripts/validate-comp-data.ts` to expect 6 levels (not 4) per tier per archetype,
    unless Phase 0 decided some tiers legitimately stay sparse — in which case validate that
    absence is explicit (`confidence: "low"` or a documented null), not silently missing.
13. Run:
    ```
    cd .. && npx ts-node --compiler-options '{"module":"commonjs"}' scripts/validate-comp-data.ts
    ```
14. Run `npm run lint:copy-rules -- data/comp-by-tier.json data/comp-structure.json app` if any
    new prose (`sourcesNote`, cell captions, UI copy) is touched.

### Phase 4 — UI rollout

15. Update `app/components/comp/comp.types.ts`'s `Level` union to include `L1`/`L2`.
16. Update `app/components/comp/comp.utils.ts:23`'s `LEVELS` constant (currently hardcoded
    `['L3', 'L4', 'L5', 'Staff']`) — this is the actual source of truth the level-selector
    components below iterate over, not just the type union. It's imported by
    `TierCompChart.tsx`, `ArchetypeCompareTable.tsx`, and `CompSection.tsx`, and re-exported via
    `app/components/comp/index.ts`. Miss this and the type union change alone won't render new
    tabs anywhere.
17. Update every level-selector component: `ArchetypeCompareTable.tsx`,
    `ArchetypeCompareStage.tsx` (`defaultLevel = 'Staff'` — decide if the default should change
    now that the range is wider), `TierCompChart.tsx` (`defaultLevel = 'L4'`), `CompSection.tsx`.
18. Update `inferLevel()` in `app/app/results/ResultsClient.tsx:35-53` — its current comment
    ("Bands: L3 0–2yr, L4 3–6yr, L5 7–12yr, Staff 12+yr") needs new YOE cutoffs consistent with
    Phase 0's definition, splitting today's `L3 0–2yr` band across the new `L1`/`L2`/`L3` range.

## Do not

- Don't synthetically derive `L1`/`L2` numbers from `L3` (e.g. `L3 * 0.75`) without new
  evidence — this repo has an explicit no-fabricated-precision policy for thin cells
  (`thin-comp-cells-early-stage/README.md`), and interpolating a brand-new level from an
  adjacent one is a bigger version of the same violation.
- Don't skip Phase 0 and jump to a code change — the Staff-split doc hit the same temptation
  and explicitly rejected it; leveling taxonomy is a human sign-off gate in this repo, not a
  script decision.
- Don't ship a partial split (e.g. add `L1` but leave `L2` folded into `L3`) without labeling it
  as such — that just moves today's compression problem down one rung instead of resolving it.
