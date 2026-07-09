# Assessment Flow (Phase 3)

**Status:** Phase 3 deliverable. Describes the end-to-end assessment experience Phase 5 builds;
`taxonomy/questions.json` is the data contract this flow renders.

## Target

5-8 minutes, ~36 items total (4 stack-intake fields + 32 dimension questions), sectioned, with
progress indication and "skip/unsure" always available. This slightly favors the low end of PLAN.md's
"~25-35 items" estimate on pure dimension questions (32) plus a short intake block on top — the intake
fields are fast multi-select/number inputs (seconds each), not full scenario questions, so they don't
meaningfully add to completion time despite adding to the raw item count.

## Sections, in order

1. **Stack** (`taxonomy/questions.json`'s `stackIntake` block, plus the `stack`-sectioned dimension
   questions: `technical_breadth_depth` ×2, `coding_intensity` ×2, `physical_constraint_engineering`
   ×2). ~45-60 seconds. This section exists to (a) personalize later result copy ("as a
   Python/backend engineer with 6 years...") and (b) sanity-check the self-reported technical
   dimensions against concrete stack/domain signal, per PLAN.md's intent that this be "a fast
   structured input... kept deliberately short."
2. **Work style** (`ambiguity_tolerance`, `interrupt_tolerance`, `oncall_incident_appetite`,
   `debugging_diagnostic_depth`, `systems_design_scale`, `adversarial_threat_modeling` — 12
   questions). The "how do you actually want to spend your working hours" section.
3. **People & client comfort** (`stakeholder_client_comfort`, `teaching_enjoyment`,
   `account_relationship_ownership`, `people_management_orientation` — 8 questions). The
   "who do you want to spend your working hours with, and how" section.
4. **Incentives & motivation** (`outcome_accountability`, `variable_comp_appetite`,
   `travel_embed_willingness` — 6 questions). The "what trade-offs are you actually willing to make"
   section — deliberately last, since these are the most identity-adjacent questions (comp risk,
   travel) and benefit from the user already being warmed up by the more concrete work-style
   questions first.

This ordering matches PLAN.md's own suggested section order ("stack → work style → people/client
comfort → incentives/motivation") exactly.

## Progress & UX requirements (for Phase 5)

- **Progress indicator**: a slim bar or "12 of 36" counter, visible throughout, per-section
  sub-progress optional but the overall counter is required (users abandoning quizzes cite "not
  knowing how much is left" as a top complaint — avoid it outright).
- **Skip/unsure**: every dimension question has a visible "skip" affordance that maps to `null` for
  that question, per `taxonomy/scoring.md`'s explicit null-handling (excluded from that dimension's
  average, not defaulted to a neutral 3 — a defaulted skip would silently distort scoring, which is
  worse than an honest "I don't have signal here").
- **Autosave to localStorage** after every answer (Phase 5 task, called out here since the flow
  depends on it): a user closing the tab mid-assessment and returning later should resume exactly
  where they left off, not restart. No login required, consistent with ADR-003's no-login-in-v1
  decision.
- **Mobile-first, single question per screen** (not a long scrolling form) — keeps each screen fast
  to parse and matches the "5-8 minutes on a phone" target explicitly named in PLAN.md's Phase 5
  "Done when" bar.
- **Format variety by design**: `taxonomy/questions.json` deliberately mixes `scenario_choice`
  (a vivid situational prompt with 3 labeled options), `slider` (a 1-5 continuous scale with only the
  two end labels shown, no middle label, to avoid anchoring bias toward the literal anchor-3 text),
  and `behavioral_anchor` (a direct 1/3/5 self-report against the dimension's own anchor language).
  This variety is intentional, per PLAN.md's instruction to "avoid transparent/gameable phrasing" —
  a user who wanted to game their way toward a specific archetype would need to guess which of three
  different question *shapes* maps to which dimension, not just learn one pattern.
- **No dimension labels shown to the user.** Questions never display their `dimension` id or name —
  the user sees only the scenario/prompt text. This is the primary anti-gaming mechanism: showing
  "Ambiguity Tolerance: rate yourself 1-5" would let a user reverse-engineer which answer produces
  which archetype; a scenario about a vague-spec conversation with their manager does not.

## Tech-stack intake — design rationale

Per PLAN.md's explicit instruction that "the differentiator is the preference data, not another
skills checklist," the stack intake is intentionally minimal: 4 fields (years of experience, primary
languages, domains worked in, current title — the last optional). It is **not** scored against the 16
trait dimensions directly. Its two jobs are:
1. **Personalization** — result copy can say "given your 6 years in backend Python, here's what a
   jump to X would concretely look like" instead of generic copy.
2. **Light sanity-check** — if someone reports 15 years of experience across 8 domains but answers
   every `technical_breadth_depth`/`coding_intensity` question at the extreme low end, that's a
   plausible signal worth a soft "does this feel right?" confirmation UI in Phase 5 (not built into
   the scoring math itself — this is a UX nicety, not an algorithmic gate, since PLAN.md's scoring
   spec is explicitly the user's self-reported preference data, not a corrective layer overriding it).

## Dry-run validation — deferred to Phase 6, not skipped

PLAN.md's Phase 3 task list calls for a "dry-run [of] the full instrument on paper/spreadsheet with
3-5 people before any code." Like Phase 2's real-engineer paper test, this requires recruiting and
scheduling real humans, which an autonomous session cannot do — the same category of blocker as
ADR-004's domain registration and Phase 2's real-person validation. **Decision, consistent with both
of those precedents: do not block Phase 3 completion on this.** In its place, a self-administered
dry-run was done using the synthetic personas already built for Phase 2's validation
(`docs/research/validation-v1.md`) — mapping each persona's dimension-vector back into plausible
answers to the actual questions in `questions.json` and confirming the resulting scores match what
Phase 2 already validated (see `docs/assessment/dry-run-v1.md`). The full 3-5-person paper dry-run
with real engineers is explicitly deferred to Phase 6, which already recruits 15-25 beta users and
is a superset of what this task asked for.
