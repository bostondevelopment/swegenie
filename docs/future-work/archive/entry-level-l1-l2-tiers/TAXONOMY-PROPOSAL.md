# L1/L2 taxonomy proposal

**Status: draft, awaiting human sign-off (Phase 0 of [README.md](README.md) / [EXECUTION-PLAN.md](EXECUTION-PLAN.md) Stage 0).**
Nothing downstream (Stage 1+) should start until this file is explicitly approved — see "Do not" in the README.

## Recommendation summary

- **Split into two levels**, not one: `L1` (new grad) and `L2` (associate / early-career).
- `L1`: **0–1 YOE**, title patterns `new grad`, `entry[- ]level`, `university grad`, `\bI\b` (as
  in "Software Engineer I"), `associate` *when paired with "new grad"/"university" language*.
- `L2`: **1–3 YOE**, title patterns `junior`, `jr\.?`, `associate` (standalone), `\bII\b`.
- **Apply the schema uniformly** across all 5 tiers in `comp-by-tier.json` (add `L1`/`L2` to the
  `levels` array everywhere), but expect — and accept — genuinely sparse/low-confidence data at
  `ai-labs` and `early-stage`/`growth-stage-private`, for different underlying reasons at each end.
  This is not a defect to force-fill; it follows the existing
  [thin-comp-cells-early-stage](../thin-comp-cells-early-stage/README.md) precedent.
- **Explicitly disclaim** that this app's `L1`–`Staff` scale is an internal, YOE-based ordinal, not
  any one company's title ladder — the collision is real and already partially visible in the data
  gathered below (Google's own `L3` is new grad; this app's `L3` will mean 3–6 YOE).
- **Proposed full YOE table** (all 6 levels): see [§5](#5-proposed-yoe-to-level-table-all-levels).

---

## 1. One level or two?

**Recommendation: two — `L1` (new grad) and `L2` (associate/early-career).**

Every company checked below — regardless of size, age, or how flat its public title system is —
draws a real line between "still being onboarded, works on tasks scoped by someone else" and
"owns a feature end-to-end with minimal guidance." That line shows up consistently as a distinct
rung, not just a pay bump within one rung:

- **Google**: `L3` (new grad, "still learning") → `L4` ("fully independent contributor"),
  promotion typically within ~2 years.
- **Meta**: `E3` (new grad, "some guidance") → `E4` ("own projects and deliver end to end," even
  mentors new grads), promotion typically ~1.5–2 years.
- **Amazon**: `SDE I` (entry, component-level work) → `SDE II` (owns larger components,
  mentors SDE Is).
- **Stripe** (`growth-stage-private` in this app's own tier data) — the clearest evidence a
  two-level split isn't just a big-company luxury: `L1` is explicitly capped at 18 months
  ("your manager and senior engineers break down problems for you"), `L2` is capped at 36 months
  ("you own features end-to-end with minimal guidance... the jump from L1 is about operating
  without scaffolding"). Stripe chose to formalize exactly this two-rung split even at flat,
  IC-title-only levels (`L1`–`L3` are all "Software Engineer," no "Senior" title exists below
  Staff).
- **Ramp** (also `growth-stage-private`): `IC3` (new grad) → `IC4` (mid) — a smaller, younger
  company than Stripe, still keeping the split.

A single merged entry rung would recreate, one level up, the exact compression problem this whole
initiative exists to fix (new grad and 2-3-year associate folded into one `L3` cell today). The
scope/independence distinction is consistently real, not an artifact of how a company chooses to
name its levels — companies with completely different title conventions (Google's numeric `L`,
Meta's `E`, Stripe's flat "Software Engineer," Ramp's `IC`) independently landed on the same
two-rung shape for this part of the ladder. That's a strong signal it reflects an actual
capability difference worth a separate cell, not a naming choice.

---

## 2. Proposed YOE bands and title patterns

Grounded in Google, Meta, Amazon, Anthropic, OpenAI, plus Stripe and Ramp (both
`growth-stage-private` in this app's own `company-tiers.json`) and Airbnb (`high-growth-public`).

### `L1` — new grad / entry-level (0–1 YOE)

**Defining trait:** tasks are scoped by someone else; close mentorship; first exposure to a
production codebase.

| Company | Title / level | Notes |
|---|---|---|
| Google | `L3`, "Software Engineer II" | Explicitly the "new grad level." |
| Meta | `E3` | "Write production-quality code for individual tasks with some guidance." |
| Amazon | `SDE I` | University/campus-hire entry point. |
| OpenAI | `L3` (of a 5-rung `L3`–`L7` IC ladder) | Entry IC tier; "junior." |
| Stripe | `L1`, "Software Engineer" | 18-month cap; "manager and senior engineers break down problems for you." |
| Ramp | `IC3` | New-grad rung. |
| Airbnb | `G7` (mapped to legacy `L3`) | Entry IC rung under Airbnb's G-level system. |

Representative title strings: *"New Grad Software Engineer," "Software Engineer I," "Software
Engineer, University Grad," "Associate Software Engineer" (campus/rotational program framing),
"Entry-Level [role]."*

Proposed pattern family (illustrative, not final regex — Phase 1 owns the actual implementation):
`new grad|university grad|entry[- ]level|\bI\b(?!\w)` plus `associate` **only** when co-occurring
with new-grad/rotational-program/campus language (to avoid swallowing `L2`'s standalone
"Associate Engineer" titles — see note below).

### `L2` — junior / associate / early-career (1–3 YOE)

**Defining trait:** owns a feature end-to-end without someone reviewing every step; no longer
scaffolded, not yet trusted with ambiguous or cross-team scope.

| Company | Title / level | Notes |
|---|---|---|
| Google | `L4` (lower end), "Software Engineer III" | 1–5 YOE band; independent contributor. |
| Meta | `E4` (lower end) | "Own features end-to-end," own projects. |
| Amazon | `SDE II` (lower end) | Amazon's own published range for `SDE II` runs wider (roughly 3–10 YOE per secondary sources) — its lower edge is what maps to `L2` here; its upper edge overlaps this app's `L3`. |
| Stripe | `L2`, "Software Engineer" | 36-month cap; "independently scope work, write design docs." |
| Ramp | `IC4` (entry portion) | Mid rung; overlaps into this app's `L3`. |

Representative title strings: *"Junior [role]," "Software Engineer II," "Associate [role]"
(standalone, not campus-program-qualified).*

Proposed pattern family: `junior|jr\.?|\bII\b(?!\w)` plus standalone `associate` (i.e. `associate`
**not** co-occurring with new-grad/campus/university language, which routes to `L1` instead).

### A caution on titles vs. YOE vs. tenure-in-level

These three axes don't perfectly line up, and the proposal below picks YOE as the one this app can
actually use, because `ResultsClient.tsx` only collects self-reported total years of experience —
not tenure at current level, not title. Two concrete mismatches worth flagging for whoever
implements Phase 1:

- **Amazon's `SDE II` band is unusually wide** (roughly 3–10 YOE per secondary sourcing) and
  meaningfully overlaps this app's proposed `L3` (3–6 YOE). Titles alone won't cleanly separate an
  `SDE II` posting requiring "3+ years" from one requiring "7+ years" — Phase 1's regex will
  under-split this specific case regardless of how the bucket boundary is drawn. Not fixable at
  the taxonomy-definition level; flag it as a known limit of title-based extraction.
- **Stripe's caps are tenure-in-level, not YOE.** Someone can join Stripe directly into `L2` with
  zero prior Stripe tenure but 2 years of YOE elsewhere. The YOE bands below approximate the
  common case (fresh grads enter near `L1`/`L2`) but will misclassify laterally-hired early-career
  engineers in either direction. This is a structural limitation of a single-YOE-input model, not
  something Phase 1 can regex its way out of.

---

## 3. Tier applicability

**Recommendation: keep the `levels` array uniform across all 5 tiers** (structural consistency —
same validation logic, same UI, no per-tier schema branching), **but expect real, legitimate
sparseness at both ends of the tier spectrum, for two different reasons:**

### `ai-labs` — sparse because these companies barely hire at this level at all

This is a new finding from this pass, not something the README anticipated. Anthropic's own
hiring data (via public reporting, not Anthropic's own disclosure) shows new-grad/entry-level
hiring is a small fraction of its engineering org — median reported experience across its
engineering team is over a decade, and the minority of engineers with under six years of
experience mostly entered through highly selective channels (competitive internships at other
major labs, AI-safety fellowships, elite academic credentials), not standard new-grad postings.
If `ai-labs` broadly hires this way — frontier labs generally compete on research/engineering
depth, not on absorbing large new-grad cohorts — `L1`/`L2` cells at this tier should be expected
to land thin or `low`-confidence across most archetypes, independent of how good Phase 2's
sourcing effort is. This mirrors, but is distinct from, the existing `ai-labs`/`Staff` thinness
already documented in `thin-comp-cells-early-stage/README.md` — that thinness is about *disclosure*
(labs don't publish granular level data); this one is about *hiring volume* (labs structurally
hire few people at this level in the first place).

### `early-stage` / `growth-stage-private` — sparse because formal ladders are thin, not because these companies skip entry-level hiring

This matches the README's own hypothesis and the precedent set by the Staff-split doc: companies
below roughly 40 engineers often don't have 6 formally distinct levels, and job postings may just
say "Software Engineer" with no level qualifier at all. But this tier's sparseness looks different
in kind from `ai-labs`'s: **evidence above shows growth-stage-private companies do hire and title
entry-level rungs explicitly** — Stripe and Ramp both have formal, named `L1`/`IC3` new-grad
rungs with real comp data. So `growth-stage-private` cells should be less uniformly sparse than
`early-stage`, and where they are thin, it's more likely a real-postings-availability problem
(fewer companies, fewer reqs) than a "this company doesn't have that level" problem. `early-stage`
(pre-Series-B-ish, per this repo's existing tier definitions) is where "no formal ladder" is most
likely to be literally true.

**Net:** don't force-fill any tier. Let Phase 2's gapfill research report cell-by-cell whether a
gap is a sourcing gap (worth another research round) or a structural gap (the level doesn't
meaningfully exist at that tier for that archetype) — same posture the gapfill workflow already
takes for the existing 31 low-confidence cells.

---

## 4. The `L3` naming collision — explicit call-out and recommendation

**The problem, stated plainly:** this app's `L3` is (and after this change, will remain) an
internal ordinal — "the third rung on this app's 6-rung ladder" — not a claim about what any real
company calls its `L3`. That's already misleading today (this app's current `L3` folds in
new-grad postings), and it gets *more* misleading after this change, not less: once `L1`/`L2` are
added, this app's `L3` shifts to mean roughly 3–6 YOE (see §5) — while **Google's own `L3` is
explicitly the new-grad level**, and Airbnb's legacy `L3`/`G7` is also an entry rung. A user who
worked one year at Google as an `L3` and sees this app's `L3` tab will reasonably, and wrongly,
assume it describes their own experience level. It doesn't — it's roughly describing someone 2–5
years further along.

This isn't a hypothetical: the app's own comp UI (`comp.utils.ts`'s `LEVELS` constant) renders the
bare strings `"L3"`, `"L4"`, `"L5"`, `"Staff"` directly as the level-selector tab labels today, with
no accompanying YOE range or disclaimer anywhere in that component. Adding `L1`/`L2` to that same
bare-label pattern makes the collision worse, not better, unless something changes alongside it.

**Recommendation (two parts, both needed):**

1. **Show the YOE band next to the level label wherever levels are rendered as tabs/pills** — not
   as a tooltip a user has to discover, but inline, every time. This is a UI/interaction decision
   for Phase 4, not a copy decision, but it's the actual fix: the confusion happens because `"L3"`
   alone reads as a claim about title equivalence, and `"L3 · 3–6 yrs"` doesn't. This is cheap
   (rendering an existing data value) and doesn't add new prose to police against `COPY_RULES.md`.
2. **State the fact once, in the canonical methodology location**, per this repo's own repetition
   rule — don't repeat the caveat next to every level selector. One sentence, present tense, no
   process narration:

   > Levels here are grouped by years of experience, not by any single company's title system —
   > years in the field determines the level shown, not a job title.

   That sentence passes the `COPY_RULES.md` one-sentence test (it reads as true on day one, states
   the current mechanism, doesn't reference a "fix" or a prior state) and avoids every banned
   pattern (no versioning language, no internal doc paths, no "Phase" references, no naming a
   specific company for comparison — naming Google specifically would itself read as an
   unnecessary, hard-to-maintain claim about a competitor's ladder that could go stale).

Do **not** attempt to solve this by renaming this app's levels to avoid the letter/number
collision entirely (e.g. switching to descriptive labels like "New Grad" / "Associate" / "Mid" /
"Senior" / "Staff" / "Principal"). That's a larger, separate UX decision outside this proposal's
scope, would touch every component in the README's Phase 4 list for reasons beyond this change,
and isn't necessary to resolve the confusion — showing the YOE band inline solves the actual
problem (a user mismapping their own title) without a naming migration.

---

## 5. Proposed YOE-to-level table (all levels)

No such table exists anywhere in the repo today for *any* level — `ResultsClient.tsx`'s current
`inferLevel()` bands (`L3` 0–2yr, `L4` 3–6yr, `L5` 7–12yr, `Staff` 12+yr) are inline code with no
supporting research, by the synthesis script's own admission ("inferred from ascending seniority
order... not from any existing mapping table"). Inserting `L1`/`L2` below today's `L3` forces a
choice: either squeeze `L1`+`L2`+`L3` into today's old `0–2yr` `L3` band (leaving `L3` a
near-meaningless ~1-year sliver not supported by any title/YOE evidence gathered above), or
redraw the whole table using the same research rigor just applied to `L1`/`L2`. This proposal
takes the second option.

| Level | YOE band | Anchor evidence |
|---|---|---|
| `L1` | 0–1 | New-grad rung across Google `L3`, Meta `E3`, Amazon `SDE I`, Stripe `L1`, Ramp `IC3` (§2). |
| `L2` | 1–3 | Associate/junior rung: Google `L4` (lower end), Meta `E4` (lower end), Stripe `L2`, Amazon `SDE II` (lower end) (§2). |
| `L3` | 3–6 | Fully-independent mid-level IC: Google `L4` upper end (1–5yr band), Meta `E4`/`E5` transition (~2–5yr+), Amazon `SDE II` core range. Carries forward the width (not the position) of today's old `L4` band. |
| `L4` | 6–10 | Senior IC — carried forward from today's implicit "senior" understanding; **not independently re-researched in this pass** (this proposal's research mandate was scoped to `L1`/`L2` — see below). |
| `L5` | 10–14 | Staff-track/senior-plus — same caveat as `L4`. |
| `Staff` | 14+ | Staff and above — widened from today's `12+` to preserve the old table's total span after `L3`/`L4`/`L5` shift up to make room for `L1`/`L2`. Same caveat as `L4`. |

**Flag for the human reviewer:** the `L3`–`Staff` boundaries above are a mechanical extension of
the existing (already-unresearched) table, adjusted only to leave room for `L1`/`L2` — they carry
real evidence for `L3`'s *lower* bound (where it meets `L2`) but not for the `L4`/`L5`/`Staff`
boundaries themselves, since this pass's research mandate (per the Stage 0 prompt) was scoped to
`L1`/`L2` title patterns specifically. The `Staff` bucket is already a separately flagged problem
in [staff-bucket-leveling-split](../staff-bucket-leveling-split/README.md) (Staff/Senior
Staff/Principal/Distinguished compressed into one cell) — if that split happens too, its
YOE-band research should supersede the `L4`/`L5`/`Staff` rows here rather than these two efforts
producing two different tables independently. Until then, treat rows `L4` and below `L3` as a
reasonable placeholder, and `L1`–`L3` as the researched core of this proposal.

**Alternative considered and rejected:** keep `L4`/`L5`/`Staff` bands byte-for-byte unchanged
(`3–6`/`7–12`/`12+`) and compress `L1`+`L2`+`L3` entirely inside the old `0–2yr` `L3` window
(e.g. `L1` 0–1, `L2` 1–1.5, `L3` 1.5–2). Rejected because it produces boundaries with no title or
YOE evidence behind them (nothing in §2's research suggests a real distinction at the 1.5-year
mark), and because it would make `L3` a near-vestigial band sitting entirely inside what every
company surveyed still calls "early career" — reintroducing, in miniature, the same
evidence-free-cutoff problem this whole initiative exists to fix.

`inferLevel()`'s existing fallback behavior (default to `L4` when `years_experience` is missing or
unparseable) should stay pointed at `L4` — it's still a reasonable "assume mid-career" default
when no signal is available, this proposal just moves what `L4` means.

---

## 6. Sources

Independently re-checked before sign-off (2026-07-18) — the specific quoted/statistical claims
above trace to:

- **Stripe L1 (18-month cap) / L2 (36-month cap), quoted framing** — [Stripe Software Engineer
  Career Ladder: Levels, Timelines, and Promotion Path](https://www.careerclimb.app/career-ladder/stripe-software-engineer)
  (CareerClimb).
- **Anthropic hiring composition** (median 12.2 years experience; entry-level hiring rare; 172 of
  1,680 engineers under 6 years experience, 50 under 3; junior hires' internship pedigree) —
  [What Kind of Engineers Does Anthropic Actually Hire? Insights from 1,680 Résumés](https://ai-engineering-trend.medium.com/what-kind-of-engineers-does-anthropic-actually-hire-insights-from-1680-resumes-11fa07ace719)
  (Medium), corroborated by [1,680 Résumés Expose Anthropic's Talent Strategy](https://finance.biggo.com/news/vLl-y54BKciKzF2A_7Et)
  (BigGo Finance) and [Anthropic Engineering Team Is an Infrastructure Army](https://www.techtimes.com/articles/318396/20260615/anthropic-engineering-team-infrastructure-army-new-analysis-1680-engineers.htm)
  (Tech Times).
- **OpenAI L3–L7 IC ladder, L3 rare for external hires** — [AI Lab Levels Explained: OpenAI
  L3–L7, Google L3–L8, Anthropic, Meta](https://ctaio.dev/en/salary/ai-lab-levels-explained/)
  (CTAIO).
- **Airbnb G7 = legacy L3 = new-grad rung** — [Airbnb Software Engineer Career Ladder: Levels,
  Timelines, and Promotion Path](https://www.careerclimb.app/career-ladder/airbnb-software-engineer)
  (CareerClimb).
- Google `L3`/`L4`, Meta `E3`/`E4`, Amazon `SDE I`/`SDE II`, and Ramp `IC3`/`IC4` leveling are
  treated as commonly-documented (levels.fyi and each company's own published ladder) and were
  not independently re-verified beyond the initial research pass for this proposal.
