# Execution plan: multi-agent breakdown

Companion to [README.md](README.md) (read that first — it has the full problem statement and
the phase-by-phase technical plan this doc operationalizes). This doc exists because the
initiative is large enough (~170 new data cells, a taxonomy decision with no existing precedent,
touch points across 8+ files) that it should run as separate, sequenced agent sessions rather
than one long session — each stage below is scoped to fit in one context window, has an explicit
input/output contract, and states its dependency on the stage before it.

**Why split it up:** two reasons, matching this repo's own pattern in `docs/ADD_ARCHETYPE.md`.
First, Phase 0 is a genuine human sign-off gate — per that runbook's own philosophy, taxonomy is
"the one stage that is not mechanical," so it must stop and wait for you, not flow straight into
code changes. Second, the data-backfill stage (gapfill research) is a token-heavy Workflow run
that needs your explicit go-ahead each time it's triggered, separately from the mechanical
engineering stages around it.

**How to use this doc:** run the stages in order. Each one is a self-contained prompt — paste it
into a new session (or hand it to a fresh Agent call) exactly as written. Do not skip a human
gate. Stage 3 may need to run more than once (see its notes).

---

## Stage 0 — Taxonomy research & draft proposal

**Depends on:** nothing. **Modifies:** nothing (research + one new markdown file only).

```
You are drafting a taxonomy proposal for adding entry-level (L1/L2) compensation tiers to the
careerguru app. Read /Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/README.md
first, in full — it has the complete problem statement and constraints.

Today the app's Level type is L3/L4/L5/Staff only (app/components/comp/comp.types.ts:15);
entry-level candidates (0-2 YOE) are all folded into L3. Your job is Phase 0 of that README:
produce a written taxonomy proposal, NOT a code change.

Deliverable: write /Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/TAXONOMY-PROPOSAL.md
covering:
1. Whether the split should be one new level or two (L1 = new grad, L2 = associate/early-career)
   — your recommendation and reasoning.
2. Proposed YOE bands and representative title patterns for each new level (e.g. what would
   distinguish "new grad / entry-level / SWE I" from "junior / associate / SWE II"), grounded in
   how real companies actually title these roles — use WebSearch/WebFetch on Google, Meta,
   Amazon, Anthropic, OpenAI, plus one or two high-growth/growth-stage examples, and cite sources.
3. Whether the split should apply uniformly across all 5 company tiers (ai-labs, faang-mag7,
   high-growth-public, growth-stage-private, early-stage) in app/data/comp-by-tier.json, or stay
   sparse/absent at smaller-company tiers — with reasoning.
4. An explicit call-out: this app's internal "L3" label is an ordinal, not the same as any one
   company's actual L3 title (Google's L3 IS new grad). Recommend how the product should avoid
   confusing a user who maps their own employer's level onto this app's scale.
5. A proposed YOE-to-level table for ALL levels (L1 through Staff) — app/app/results/ResultsClient.tsx's
   inferLevel() will need one, and none currently exists in the repo for any level.

Do not edit any code, scripts, or data files. Do not touch app/data/comp-by-tier.json, any
Python script, or any .tsx file — this is a proposal for human sign-off only. If you write any
example user-facing copy in the proposal, follow /Users/michael/Documents/Code/careerguru/app/COPY_RULES.md.
```

**➜ HUMAN GATE 1.** Review `TAXONOMY-PROPOSAL.md`, edit or push back as needed, and explicitly
approve it before Stage 1. Everything downstream encodes this file's decisions.

---

## Stage 1 — Extraction & schema engineering

**Depends on:** Stage 0 approved. **Modifies:** 2 Python scripts, `comp-by-tier.json`'s
`levels` array, `comp-by-tier-tier-gapfill.js`'s schema/prompt text. No `.tsx`, no pipeline run.

**Status: complete (2026-07-18), review found and fixed 2 issues before Stage 2:** a stale
hardcoded label list in `extract-comp-signals.py`'s `summarize()` (would have silently dropped
existing entry-level/junior data from `comp-structure.json` on the next pipeline run — see
README Phase 1 item 7), and `EXTRACTION_LEVEL_TO_TIER_LEVEL`'s `Mid`/`Senior-Staff` mappings
left pointed at their pre-`L1`/`L2` targets, which mismapped both given the ladder shifted (see
README Phase 1 item 5 for the full rationale, backed by levels.fyi YOE data). Both fixed
directly in the files; no re-run of Stage 1 needed.

```
Implement Phase 1 (extraction & schema layer only — NOT the frontend/UI) of
/Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/README.md,
using the approved decisions in
/Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/TAXONOMY-PROPOSAL.md
(read both in full first).

Scope — mechanical schema/extraction changes only, do not touch any .tsx file or run any
pipeline script yet:

1. Split the "Entry/Associate" bucket in LEVEL_RULES in BOTH
   app/scripts/extract-comp-signals.py (~lines 55-62) and
   app/scripts/extract-comp-signals-by-tier.py (~lines 77-84) into two regex buckets per the
   approved taxonomy proposal's title patterns. Keep the two files' LEVEL_RULES consistent with
   each other (diff them — they've drifted before, e.g. one has a `principal(?! engineer)`
   negative lookahead the other lacks).
2. Update EXTRACTION_LEVEL_TO_TIER_LEVEL in app/scripts/synthesize-comp-data.py (~lines 60-71)
   to map the new buckets to L1/L2.
3. Update the "levels" array in app/data/comp-by-tier.json from ["L3","L4","L5","Staff"] to
   include L1/L2 per the approved proposal, in the correct ordinal position. Do NOT populate any
   actual L1/L2 cell numbers yet — that's the gapfill stage's job.
4. Update app/scripts/workflows/comp-by-tier-tier-gapfill.js:
   - CELL_SCHEMA's level enum (line ~20) needs L1/L2 added.
   - The hardcoded prompt text describing "4 levels" / "20 cells" (lines ~65, 75, 79, 82, 89,
     102) needs updating — compute the cell count as (tier count) x (level count) rather than
     hardcoding it in multiple places, since it'll drift again otherwise.
5. Do NOT modify comp.types.ts, any .tsx component, or ResultsClient.tsx's inferLevel() — later
   stage.

When done: run a syntax check (python3 -m py_compile on both .py files; confirm the .js file
parses) but do NOT execute the actual classify/extract/synthesize pipeline — that's the next
stage. Report exactly what you changed, file by file, with line numbers.
```

---

## Stage 2 — Corpus regeneration

**Depends on:** Stage 1 merged. **Modifies:** `classified_postings.jsonl`, by-archetype corpus
files, `comp-extraction*/`, `comp-structure.json`, `comp-by-tier.json` (confidence downgrades /
new placeholder cells only — no invented numbers). Mostly running existing scripts, not writing
new code.

```
Run the corpus regeneration pipeline for the entry-level L1/L2 schema change described in
/Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/README.md,
Phase 2 steps 8-9 (read the README first). The extraction/schema code changes from the prior
stage are already merged.

Run, in this exact order (path conventions per docs/ADD_ARCHETYPE.md Stage 4 — don't assume a
single cwd for all of them):

1. `python3 docs/research/job-postings-corpus/classify.py --reclassify-all`   (from repo root)
2. `python3 app/scripts/build-by-archetype.py`                                (from repo root)
3. `cd app && python3 scripts/extract-comp-signals.py`
4. `python3 scripts/extract-comp-signals-by-tier.py`                          (still in app/)
5. `python3 scripts/synthesize-comp-data.py --changed-archetypes <all 17 ids, read from app/data/archetypes.json>`

After each step, report:
- Step 1's blast-radius report: confirm ZERO archetype/title-routing changes (only
  level-routing should differ — classify.py's rubric wasn't touched, only the level regex which
  runs later in steps 3-4). If any archetype's total posting count changed, STOP and flag it,
  don't proceed to step 2.
- Steps 3-4: for each of the 17 archetypes, how many postings landed in the new L1 and L2
  buckets per tier. Expect low/zero counts for many archetype x tier combinations — that's
  expected per the README (entry-level postings are under-represented in ATS corpora), not a bug.
- Step 5: the script's own output — which archetypes got cells downgraded to low-confidence /
  seeded fresh.

Do not run the gapfill Workflow — that's a separate, explicitly-approved step. Do not touch any
.tsx file.
```

**Status: complete (2026-07-18).** Verified directly: all 510 cells present and structurally
valid (percentile bands monotonic, `L1`/`L2` included), step 1's blast-radius flag was
pre-existing stale-cache drift unrelated to this work (confirmed against `COUNTS.md`), real
numbers preserved on all pre-existing `L3`–`Staff` cells (only confidence touched). One scope
correction from what this doc originally estimated: **all 510 cells are now `confidence: "low"`,
not just the ~170 new ones** — see the revised scale estimate in Stage 3 below and README Phase
2 item 11 for why, and why it's less costly than it sounds.

**➜ Optional checkpoint.** Before Stage 3 (which spends real tokens), skim the diff and the
per-archetype L1/L2 posting counts Stage 2 reported. If most archetype x tier combinations show
zero corpus support, that's expected — Stage 3 leans on external research for those, not corpus
extraction.

---

## Stage 3 — Gapfill research (Workflow, not a fresh chat session)

**Depends on:** Stage 2 done — `comp-by-tier.json` now has new L1/L2 cells seeded
`confidence: "low"`.

This stage is different from the others: it's the existing `comp-by-tier-tier-gapfill.js`
Workflow script (already fixed up by Stage 1) run via the `Workflow` tool, not a prompt pasted
into a new session. It already computes its own archetype list dynamically from whatever's
low-confidence right now, so once Stage 1/2 land, no further script edits should be needed to
target L1/L2 specifically.

**When you're ready, just say "run the gapfill workflow"** — this triggers real token spend
(a WebSearch/WebFetch-heavy multi-agent research pass), so it needs your explicit go-ahead each
time, same as any other Workflow invocation.

**Expect multiple rounds, and expect all 510 cells to show as low-confidence, not just 170.**
Phase 2 correctly downgraded every existing `L3`–`Staff` cell's confidence too (a mapping change
altered which corpus signal feeds those levels — see README Phase 2 item 11), so the full
low-confidence count is 510, not the ~170 `L1`/`L2` cells this doc originally estimated. It's a
bigger Stage 3 than first planned, but not proportionally more expensive: the workflow's prompt
(updated after Phase 2) tells research agents to treat the 170 `L1`/`L2` cells as needing full
research (their current numbers are a flat placeholder, not a real estimate) and the 340
`L3`–`Staff` cells as needing re-verification only (real numbers already there, just confirm
they still hold rather than re-deriving them). The one documented gapfill pass to date only
cleared 18 of 50 low-confidence cells in a single run. Budget for several rounds; after each
one, re-check how many cells remain `"low"` and decide whether another round is worth it or
whether some archetype/tier combinations are legitimately thin (new-grad postings genuinely
don't exist for that combination) and should stay `"low"` by design, same as the existing
[thin-comp-cells-early-stage](../thin-comp-cells-early-stage/README.md) precedent.

---

## Stage 4 — Validation

**Depends on:** Stage 3, at least one round complete. **Modifies:** possibly
`scripts/validate-comp-data.ts` if it hardcodes the level count.

```
Validate the L1/L2 comp-data schema change after gapfill research has completed (or after each
round). Read
/Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/README.md
Phase 3 first.

1. Check whether scripts/validate-comp-data.ts hardcodes the level count/list rather than
   reading app/data/comp-by-tier.json's own "levels" array — fix it to read dynamically if so.
2. Run `cd /Users/michael/Documents/Code/careerguru && npx ts-node --compiler-options '{"module":"commonjs"}' scripts/validate-comp-data.ts`
   — confirm comp-by-tier.json is structurally valid: monotonic percentile bands
   (p10<p25<p50<p75<p90) and all tier x level cells present, or explicitly/legitimately absent
   per the taxonomy proposal's tier-applicability decision.
3. Run `cd app && npm run lint:copy-rules -- data/comp-by-tier.json data/comp-structure.json`
   and fix any violations per app/COPY_RULES.md.
4. Report pass/fail for both steps, with specifics on any failures.
```

---

## Stage 5 — UI rollout

**Depends on:** Stage 1 schema stable, and ideally Stage 3 has produced real numbers for most
archetypes (a UI that only ever shows `"low"` placeholders is hard to review meaningfully — but
this stage can start once Stage 4 passes structurally, even before every gapfill round finishes).

```
Implement Phase 4 (UI rollout) of
/Users/michael/Documents/Code/careerguru/docs/future-work/entry-level-l1-l2-tiers/README.md —
read it first, along with the approved TAXONOMY-PROPOSAL.md for the final YOE-band table. Schema
and data work are already merged and validated; comp-by-tier.json now has L1/L2 cells.

1. Update the Level type union in app/components/comp/comp.types.ts:15 to include L1/L2.
2. Update app/components/comp/comp.utils.ts:23's LEVELS constant (currently hardcoded
   ['L3', 'L4', 'L5', 'Staff']) — this is the actual source of truth the level-selector
   components iterate over, not just the type union. It's imported by TierCompChart.tsx,
   ArchetypeCompareTable.tsx, and CompSection.tsx, and re-exported via
   app/components/comp/index.ts. Updating comp.types.ts alone will NOT make new tabs render
   anywhere — this is the step that actually does.
3. Update every level-selector component: app/components/comp/ArchetypeCompareTable.tsx,
   app/components/comp/ArchetypeCompareStage.tsx (decide if defaultLevel='Staff' should change
   now the range is wider), app/components/comp/TierCompChart.tsx (defaultLevel='L4'),
   app/components/comp/CompSection.tsx.
4. Update inferLevel() in app/app/results/ResultsClient.tsx (~lines 35-53) with the new
   YOE-to-level bands from the taxonomy proposal, replacing the current
   "L3 0–2yr, L4 3–6yr, L5 7–12yr, Staff 12+yr" comment and logic.
5. Follow app/COPY_RULES.md for any new user-facing label/description text in the selector UI.
6. Run `npx tsc --noEmit` in app/ and fix type errors from the widened Level union — grep for
   places that assume exactly 4 levels (switch statements, lookup objects, array-length checks).
7. Start the dev server and manually verify the compare page and results page render L1/L2
   correctly, including for archetype/tier combinations where L1/L2 data is still
   low-confidence or sparse.

Report what you changed and include verification output (screenshot or described behavior).
```

---

## Stage 6 — Full validation gate

**Depends on:** Stage 5 complete.

```
Run the full validation gate from docs/ADD_ARCHETYPE.md Stage 8, adapted for the L1/L2 schema
change (not a new archetype, but the same blast radius — every archetype's comp data and
level-rendering UI changed):

cd app
npm test
npm run lint
npm run personas:report   # confirm zero drops out of top 3 — level changes shouldn't affect
                           #   scoring/personas, but verify rather than assume
npm run corpus:report     # confirm drift matches Stage 2's blast-radius report, nothing unexpected
npm run lint:copy-rules -- data/comp-by-tier.json data/comp-structure.json app

Report full pass/fail. If personas:report or corpus:report show unexpected drift, STOP and
report it rather than accepting the new baseline — do not run npm run personas:snapshot or
corpus:snapshot without flagging what changed first.
```

---

## Summary

| Stage | Type | Human gate before? | Spends real tokens on research? |
|---|---|---|---|
| 0 — Taxonomy draft | Agent session | No | Some (WebSearch for title/level research) |
| — | **Your review & approval** | **Yes — required** | — |
| 1 — Extraction/schema engineering | Agent session | No | No |
| 2 — Corpus regeneration | Agent session | No | No (deterministic scripts) |
| 3 — Gapfill research | Workflow tool | Yes — each invocation | Yes, heavily — may take 2-3 rounds |
| 4 — Validation | Agent session | No | No |
| 5 — UI rollout | Agent session | No | No |
| 6 — Full test gate | Agent session | No | No |
