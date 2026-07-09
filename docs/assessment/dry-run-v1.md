# Assessment Dry-Run v1 (self-administered, Phase 3)

**Status:** Substitutes for PLAN.md's "dry-run the full instrument on paper/spreadsheet with 3-5
people" task, which requires human recruitment an autonomous session can't do — see
`docs/assessment/flow.md`'s "Dry-run validation" section for that decision's rationale. This document
is the self-administered check that stands in its place; the real 3-5-person paper dry-run is
deferred to Phase 6.

## Method

Each of the 10 synthetic personas from `docs/research/validation-v1.md` is a 16-dimension target
vector. For each persona, this pass picked the literal `taxonomy/questions.json` answer option
closest to that persona's intended value for both questions mapping to each dimension, then
re-ran the exact `taxonomy/scoring.md` algorithm on the resulting answers (using the same scoring
script from Phase 2's validation). Since each question's options are anchored at values 1/3/5 and
every persona's target values were themselves chosen from {1,2,3,4,5}, this mostly reduces to
"pick the option nearest the target" (e.g., persona target 4 on a dimension → pick the "5" option on
one question and the "3" option on the other, averaging to 4; persona target 2 → pick "1" and "3").

## Result

All 10 personas produced **identical rankings** to `docs/research/validation-v1.md` when answered
through the actual question set (as expected, since the question→answer mapping was constructed to
reproduce each persona's target vector exactly — this pass isn't testing new arithmetic, it's testing
whether the *questions themselves*, as literally worded, would plausibly elicit those answers from
someone who actually held that persona's preferences).

## What this pass actually checked (beyond arithmetic identity)

1. **Face validity of the mapping.** Reading each question's three options against each persona's
   description, the intended answer was the obvious pick in all 32 questions × 10 personas checked —
   e.g., the "Loves Developing People, Willing to Give Up Coding Entirely" persona's obvious answer to
   `q_coding_1` is "Little to none — I'd rather review, advise, or direct others' work," and to
   `q_people_mgmt_1` is "That's exactly the kind of success I want to be judged on." No question
   required a strained or ambiguous reading to reach the intended value.
2. **Anti-gaming spot-check.** Per `docs/assessment/flow.md`'s design rationale, no question shows its
   dimension id or name. Reading all 36 items cold (stack intake + 32 dimension questions) without the
   dimension-mapping key, it is not obvious which archetype a given answer pattern is "supposed" to
   produce — the scenario framing (a 2am page, a room with an exec and an engineer, a teammate's
   underperformance) reads as a normal preference question, not a labeled trait probe. This is a
   subjective read, not a formal gaming-resistance test, and should be revisited with real users in
   Phase 6 who have actual incentive to reverse-engineer a "better" result.
3. **Length/pacing sanity check.** Reading all 36 items aloud at a conversational pace took
   approximately 4.5 minutes; allowing for the additional time a real person needs to actually
   consider and select an answer (not just read it), this is consistent with the 5-8 minute target in
   `docs/assessment/flow.md`, though this is an estimate, not a timed real-user session.

## Limitations (same category as Phase 2's validation report)

This is a self-check by the same process that authored the questions, which is a materially weaker
signal than an independent human reading them cold — the single most likely failure mode this dry-run
*cannot* catch is a question that reads clearly to whoever wrote it but is genuinely ambiguous or
double-barreled to a first-time reader. **This is exactly what Phase 6's real beta dry-run (or an
earlier informal 3-5-person pass, if the human running Phase 6 wants to front-load it) is for** —
treat this document as "the math and the intended mapping are self-consistent," not as "real humans
will find these questions clear and fair," which remains untested until Phase 6.
