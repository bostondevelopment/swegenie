# Persona test suite v1 — one persona per archetype, run through the real pipeline

**Status:** added after a real user asked for a way to see, quantitatively, how much a scoring/
question/weight change moves every archetype's own "ideal" persona before committing to it — and
while building it, the suite immediately surfaced a critical, previously-undetected bug (see below).

## Why this exists, and how it differs from the existing Phase 2 personas

`app/lib/scoring.test.ts` already has 10 synthetic personas from Phase 2's validation pass
(`docs/research/validation-v1.md`). Those are defined as **dimension-level profiles**
(`ambiguity_tolerance: 5, ...`) fed directly into `scoreArchetype`/`rankArchetypes` — they never
exercise the actual answers-to-profile aggregation step (`aggregateAnswersToProfile`) a real user's
answers go through.

That gap is exactly why three real, user-reported bugs this session slipped past a 100%-passing test
suite: the question-id/dimension-id key mismatch (the very first bug), the slider question silently
defaulting to a neutral value, and — most seriously — **a duplicate question-id collision** between
`technical_breadth_depth`'s and `account_portfolio_breadth`'s questions (both reused `q_breadth_1`/
`q_breadth_2`), which silently corrupted both dimensions for every real assessment completed since
v1.1. None of the dimension-level personas could ever have caught that, because they don't route
through question ids at all. This new suite (`app/lib/personas.ts` + `app/lib/personas.test.ts`)
does — it's a genuinely different, complementary layer of coverage, not a replacement.

## What's in `personas.ts`

One persona per archetype (18 total), each with:
- `personaName` / `narrative` — a short, human-readable description grounded in that archetype's
  Phase 1 brief (`docs/research/roles/<archetype>.md`) and one-line description
  (`docs/research/roles-summary.md`).
- `answers` — a full map of **question ids** (not dimension ids) to answer values, mimicking exactly
  what real button clicks / slider drags would produce.

### Derivation method (how the answers were authored, not hand-picked)

For each archetype, for each of the 22 dimensions, the persona's answers were reverse-mapped from
that archetype's own already-cited target value in `taxonomy/archetypes.json`:

1. If a dimension has 2 discrete (`scenario_choice`/`behavioral_anchor`, values `{1,3,5}`) questions
   and the target is itself `1`, `3`, or `5`, both questions are set to that exact anchor.
2. If the target is `2` or `4` (not a native anchor), the two questions are set to adjacent anchors
   whose average lands exactly on target (e.g. target `2` → one question at `1`, one at `3`).
3. If a dimension has a `slider` question (continuous `1`-`5`), any target is achievable directly;
   sliders absorb whatever the discrete questions can't hit exactly.
4. Among multiple option combinations that all hit the target average equally well, the combination
   with the **lowest internal variance** is preferred — i.e. two questions both answered "3" beats
   one answered "1" and the other "5" for the same target-3 average. Both are mathematically
   identical once aggregated, but the low-variance version reads as an internally consistent human
   answer rather than a contradiction, which matters for these personas' value as documentation, not
   just as test fixtures.

**Residual imprecision:** a handful of **low-weight (≤0.4) secondary dimensions** can't be hit
exactly — specifically `adversarial_threat_modeling` (3 questions, values only `{1,3,5}`, so a
target of `2` lands at best ~1.67 or ~2.33) and the single-question domain-fluency dimensions
(`ml_engineering_fluency`, `mobile_platform_fluency`, `data_infrastructure_fluency`,
`cloud_infrastructure_fluency` — one `{1,3,5}` question each, so a target of `2` or `4` lands at best
one anchor off). This never affects a dimension that's actually load-bearing (weight ≥ 0.5) for that
persona's own archetype — it only ever shows up as noise on a dimension the archetype doesn't care
much about — so it doesn't materially affect any persona's ranking. Regenerate script: see
"Regenerating" below if this ever needs re-deriving after a taxonomy structural change.

## Two-tier testing

1. **`app/lib/personas.test.ts`** — part of the normal `npm test` run. Asserts each persona's target
   archetype lands in the **top 3** (matching PLAN.md's own Phase 6 beta bar: "≥70% of beta users'
   actual role appears in their top-3" — the test uses the same bar the product will be held to) and
   clears a `0.55` score floor. This is the pass/fail gate.
2. **`app/lib/personas.report.ts`** (+ `personas.snapshot.json` baseline) — an on-demand, human-
   readable diff tool, NOT part of `npm test` (excluded from the default vitest `include` glob; run
   via its own config):
   - `npm run personas:report` — recomputes all 18 personas against the real production scoring
     pipeline (same modules the test file uses — no duplicated logic to drift) and prints a
     before/after table (rank + score deltas) against the committed baseline, flagging anything that
     dropped out of top 3.
   - `npm run personas:snapshot` — recomputes and overwrites the baseline. Run this once you've
     reviewed a change's impact via `personas:report` and are ready to accept it as the new normal.

Use `personas:report` *before* committing any change to `taxonomy/archetypes.json` weights/targets,
`taxonomy/questions.json`, or `app/lib/scoring.ts`, to see the full impact across all 18 target
personas at once, rather than manually recomputing a handful of archetypes by hand (which is how
every prior fix this session was checked, one `node -e` script at a time).

## Regenerating

If `taxonomy/archetypes.json`'s dimension set or `taxonomy/questions.json`'s question set changes
structurally (new dimension, new archetype, a question's format changes), `personas.ts`'s answers
need re-deriving — they're generated, not hand-authored, from those two files via the reverse-mapping
algorithm above. There is no checked-in generator script (it was throwaway tooling run once); re-
derive it the same way: for each archetype × dimension, solve for the question-answer combination
minimizing distance to that archetype's target, preferring low-variance solutions among ties, and
preserve each persona's hand-written `personaName`/`narrative` fields across the regeneration.
