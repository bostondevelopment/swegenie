import { questions } from "./taxonomy";

/**
 * Three degenerate (not-a-real-person) answer sets, added as permanent
 * regression tests after manually exploring "what happens at the extremes"
 * with the user. Each answers every question at one fixed point on the
 * scale rather than a plausible human profile — these exist to lock in
 * documented findings about how the scoring engine (specifically the Step
 * 2.5/2.6 floor + tiebreak) behaves on inputs that aren't trying to look
 * like any particular archetype, so a future weight/formula change that
 * quietly lets one of these produce a false-confident or nonsensical
 * result gets caught. See degenerate-personas.test.ts for the actual
 * assertions and docs/research/persona-suite-v1.md for the persona suite
 * this complements.
 */
function buildAnswers(pick: (min: number, max: number) => number): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const q of questions) {
    if (q.format === "slider" && q.scale) {
      answers[q.id] = pick(q.scale.min, q.scale.max);
    } else {
      const values = (q.options ?? []).map((o) => o.value);
      answers[q.id] = pick(Math.min(...values), Math.max(...values));
    }
  }
  return answers;
}

export const allAffirmativeAnswers = buildAnswers((_min, max) => max);
export const allNegativeAnswers = buildAnswers((min) => min);
export const allNeutralAnswers = buildAnswers((min, max) => (min + max) / 2);
