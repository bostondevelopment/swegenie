import { questions, stackIntakeFields, SECTIONS, type Question, type StackIntakeField } from "./taxonomy";

export type FlowStep =
  | { kind: "intake"; field: StackIntakeField }
  | { kind: "question"; question: Question };

/** Orders stack-intake fields first, then all 32 questions grouped by section per docs/assessment/flow.md. */
export function buildFlow(): FlowStep[] {
  const steps: FlowStep[] = stackIntakeFields.map((field) => ({ kind: "intake", field }));
  for (const section of SECTIONS) {
    for (const question of questions) {
      if (question.section === section.id) {
        steps.push({ kind: "question", question });
      }
    }
  }
  return steps;
}

export const FLOW: FlowStep[] = buildFlow();
export const TOTAL_STEPS = FLOW.length;

/**
 * Aggregates raw per-question answers (keyed by question id, e.g. "q_ambiguity_1")
 * into a per-dimension profile (keyed by dimension id, e.g. "ambiguity_tolerance"),
 * per questions.json's design: each dimension's final value is the average of its
 * 2 questions' answers, with skipped (null) questions excluded rather than
 * counted as a neutral value — consistent with scoring.md's own skip handling.
 */
export function aggregateAnswersToProfile(
  answers: Record<string, number | null | undefined>
): Record<string, number | null> {
  const byDimension = new Map<string, number[]>();
  for (const question of questions) {
    const value = answers[question.id];
    if (value === null || value === undefined) continue;
    const list = byDimension.get(question.dimension) ?? [];
    list.push(value);
    byDimension.set(question.dimension, list);
  }

  const profile: Record<string, number | null> = {};
  for (const question of questions) {
    if (profile[question.dimension] !== undefined) continue;
    const values = byDimension.get(question.dimension);
    profile[question.dimension] = values && values.length > 0
      ? values.reduce((a, b) => a + b, 0) / values.length
      : null;
  }
  return profile;
}
