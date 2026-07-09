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
