# Lessons learned: adding L1/L2 tiers

Written 2026-07-19 after the full initiative shipped, specifically to be read before starting
[staff-bucket-leveling-split](../../staff-bucket-leveling-split/README.md) — that effort is the
same class of problem (a title-regex bucket that conflates two real levels) at the opposite end
of the ladder, and several of the mistakes below are avoidable the second time if this doc is
read first. Written to be picked up cold — no prior context on the L1/L2 project assumed.

## What actually took the time

Not the taxonomy research (Stage 0) or the mechanical engineering (Stage 1, Stage 4, Stage 5) —
those each landed close to right on the first pass, once independently verified. What took
multiple rounds was **Stage 3 (gapfill) confidence integrity**: getting from "an agent reports
the work is done" to "the data is actually honest" took three separate correction passes on top
of the original gapfill run. That's the part worth planning for explicitly next time, not
treating as an unlucky exception.

## 1. A remapping decision's blast radius is bigger than "the new cells"

Splitting the old `"Entry/Associate"` extraction bucket into two (`L1`/`L2`) forced re-pointing
`EXTRACTION_LEVEL_TO_TIER_LEVEL`'s other 3 mappings too, since 5 title-regex buckets can't cover
6 tier levels 1:1 anymore. That remapping was correct and evidence-based (levels.fyi YOE data),
but it meant `synthesize-comp-data.py --changed-archetypes <all 17>` downgraded **every existing
cell's confidence**, not just the new ones — the script's documented behavior is "downgrade the
whole archetype," and the levels-array change necessarily touched all 17. Real scope went from
an estimated ~170 new cells to all 510 cells needing a confidence pass.

**For staff-split:** the exact same shape of problem is guaranteed. Splitting `Staff` into (say)
`Staff`/`Principal` will re-point at least one other bucket's target level, and
`--changed-archetypes` will downgrade every cell of every touched archetype again. **Model this
cost before starting, not after Phase 2 has already run** — re-derive the real cell count (tiers
× archetypes × the *whole* level range, not just the new levels) as an explicit checkpoint right
after the mapping decision is made, and update the scale estimate before Stage 3 gets a
token-spend go-ahead.

## 2. "Medium confidence" needs a mechanical check, not a self-report

Three separate rounds were needed to get the data honest:
1. 52 `medium`/`high` `L1`/`L2` cells had **no archived source at all** — a gap invisible from
   reading `comp-by-tier.json` alone, only found by cross-referencing the source archive
   directory against every non-`low` cell.
2. The recovery pass that fixed #1 surfaced 16 cells whose *recovered* source explicitly
   disclosed it wasn't real evidence at that level ("used only as interpolation boundary," "not
   a direct anchor," "confirms absence of direct posting data") — yet the cell was still marked
   `medium`. The gapfill script's own written rubric ("medium: ≥1 real named-company,
   level-specific data point") already ruled these out; nothing checked cells against it.
3. Even after a partial correction (8 of 16 fixed), re-reading the remaining 8 cells' sources by
   hand found half were still unresolved — including one (`sre-production-engineer`) where the
   "fix" round hadn't actually added any new research at all, just re-confirmed the same
   insufficient source that was already there.

**For staff-split:** write the mechanical checks *before* running gapfill, not after:
- A script that flags any `medium`/`high` cell with zero archived source file.
- A script (or even just a `grep -i "interpolat\|bracket\|no distinct\|not a direct\|reference
  only\|confirms absence"` over the source archive) that flags any `medium`/`high` cell whose own
  source note contradicts the confidence bar.

Both are cheap, deterministic, and would have caught rounds 1 and 2 above in one pass instead of
three rounds of manual re-reading.

## 3. Put the confidence bar's hard edge case in the gapfill prompt from round one

The rule that closed this out — "an interpolated number between two real anchors is not itself a
level-specific data point, even though real research went into the two anchors" — is subtle
enough that a capable research agent got it wrong by default, twice, across two different
gapfill sessions. It was added to `comp-by-tier-tier-gapfill.js`'s prompt mid-project, after the
first violation was found.

**For staff-split:** write this exact clause into the gapfill prompt on the first run, not after
a cleanup round finds it's needed:

> If you can't find a real data point observed *at* the target level, don't derive one by
> interpolating or bracketing between adjacent levels' real anchors and call it "medium" — that's
> still a `low`-confidence cell, however good the neighboring evidence is. Interpolation is fine
> to *report as a directional estimate*, but the confidence label must reflect that no direct
> observation exists.

## 4. Grep the whole repo for the old literal, not just the "primary" file

Found and fixed hardcoded `4`-level / `20`-cell assumptions in at least four separate places
across three files during this initiative — `extract-comp-signals.py`'s `summarize()` breakdown,
`comp-by-tier-tier-gapfill.js`'s `CELL_SCHEMA` enum *and* its prompt text (both had to be fixed
separately), and `validate-comp-data.ts`'s `EXPECTED_LEVELS`. Some of these had already been
flagged once before, in the commit that first introduced `--reclassify-all` — the fix pattern
(hardcode → drift → get fixed → new hardcode reappears elsewhere) repeats because each fix only
touched the file directly in front of whoever was working, not a repo-wide sweep.

**For staff-split:** once the level count changes, `grep -rn` for the *literal old array/count*
(e.g. `'L3', 'L4', 'L5', 'Staff'` or `4 levels`/`20 cells`/`340`) across the entire repo — not
just `app/scripts/` — as an explicit, single checklist item before considering the schema change
done. Don't rely on remembering which files "should" reference the level list.

## 5. A shared data file's consumers extend past the "planned" component list

`CompProgressionChart.tsx` wasn't in this initiative's Phase 4 file list — it's a separate, older
component, not part of the `comp/` subfolder the L1/L2 rollout was scoped around. But it renders
`comp-structure.json`'s `levels[].label` field directly, which a Stage 1 script change altered
(splitting one label into two). It had a pre-existing raw-internal-label leak
("Mid (unspecified level)," "Principal/Director+ (Manager/VP)") that predates this initiative,
but the label split made it worse (5 ugly labels shown instead of 4) — and it was only caught by
browser-verifying the actual page, not by reviewing the planned file list.

**For staff-split:** before finalizing the UI-rollout file list, `grep -rln` for every consumer
of the data field being changed (`comp.levels`, `byLevel`, whatever the equivalent is) across the
whole `app/` tree — not just the components the plan assumes are in scope. Then browser-verify
the actual rendered pages, not just the components on the plan's list.

## 6. Don't let research-round chasing become the default

By the third confidence-cleanup round, some "verification" work was re-confirming the same
insufficient source rather than finding new evidence — a sign that further rounds were hitting
diminishing returns on a genuinely thin market, not a process failure to keep pushing on.

**For staff-split:** decide a round cap up front (e.g. 2 gapfill rounds, then anything still
unsupported gets `low` and stays there) rather than open-ended "send it back for one more pass."
Thin cells at the top of the ladder (Principal/Distinguished/VP data is *less* publicly
disclosed than junior data, not more) should be expected and accepted early, same as
[thin-comp-cells-early-stage](../../thin-comp-cells-early-stage/README.md) already established
for the bottom.

## 7. What worked well — repeat these, don't re-derive them

- **Research-first, human-gated taxonomy proposal** (Stage 0: cite sources, no code, explicit
  sign-off before Stage 1 starts) surfaced real, checkable research and caught its own gaps
  (missing Sources section) before becoming load-bearing. Independently re-verifying the most
  quotable/specific claims via a live web search (not just trusting the proposal) confirmed they
  held up — do this for staff-split's proposal too, spot-checking 3-4 load-bearing claims.
- **Inline YOE label + one canonical methodology sentence** for the title-vs-ordinal collision
  (this app's `L3` isn't the same as any one company's `L3`) is a proven, `COPY_RULES.md`-clean
  pattern. Staff-split has the exact same collision in reverse — reuse the pattern, don't
  redesign it.
- **Verifying every stage directly** (running the actual validators, greping the actual data,
  browser-checking the actual rendered page) rather than accepting each stage's self-report
  caught a real, material issue at every single stage of this project. Budget this as an
  explicit step in the staff-split plan, not an afterthought.

## Quick-reference checklist for staff-split

- [ ] Re-derive the real cell count after the mapping decision is made (not before), and update
      the scale estimate before Stage 3 gets a go-ahead.
- [ ] Write the "interpolation ≠ medium" rule into the gapfill prompt from round one.
- [ ] Build the "no archived source" and "source contradicts confidence" checks as scripts
      before Stage 3 runs, not as manual review after.
- [ ] Repo-wide grep for the old level literal/count once the schema changes, not a per-file fix.
- [ ] Grep for every real consumer of the changed data field before finalizing the UI file list,
      then browser-verify the actual pages.
- [ ] Set an explicit gapfill round cap up front.
- [ ] Reuse the inline-YOE-label + canonical-sentence pattern for the title-collision problem.
- [ ] Verify every stage directly (run the validator, grep the data, load the page) — don't sign
      off on a stage from its self-report alone.
