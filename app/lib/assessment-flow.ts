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

/**
 * Maps a `domains` stack-intake selection (questions.json's stackIntake.fields)
 * onto the dimension(s) it corroborates. Each selected domain contributes one
 * additional data point into that dimension's average alongside its direct
 * question answer(s) — not a fallback for skipped questions and not an
 * override, just one more vote in the same average, per the domain-fluency
 * dimensions' own "self-rated hands-on experience" framing (dimensions.json).
 * "Data/ML" maps to both ml_engineering_fluency and data_infrastructure_fluency
 * since the option deliberately bundles both; domains with no clean dimension
 * match (Web frontend, Backend/APIs) are left unmapped.
 */
const DOMAIN_DIMENSION_MAP: Record<string, string[]> = {
  "Data/ML": ["ml_engineering_fluency", "data_infrastructure_fluency"],
  "Mobile (iOS/Android)": ["mobile_platform_fluency"],
  "Infra/DevOps/Cloud": ["cloud_infrastructure_fluency"],
  "Embedded/firmware": ["physical_constraint_engineering"],
  "Security": ["adversarial_threat_modeling"],
  "Client-facing/pre-sales": ["stakeholder_client_comfort"],
  "Support/customer-facing": ["stakeholder_client_comfort"],
  "People management": ["people_management_orientation"],
};

/** The implied dimension value for a domain a user says they've worked in. */
const DOMAIN_IMPLIED_VALUE = 4;

export const FLOW: FlowStep[] = buildFlow();
export const TOTAL_STEPS = FLOW.length;

export interface FlowSegment {
  key: string;
  label: string;
  startIndex: number;
  endIndex: number; // exclusive
}

const SEGMENT_LABELS: Record<string, string> = {
  intake: "Background",
  stack: "Stack & Self-Rated Skills",
  work_style: "Work Style",
  people: "People & Client Comfort",
  incentives: "Incentives & Motivation",
};

function segmentKeyFor(step: FlowStep): string {
  return step.kind === "intake" ? "intake" : step.question.section;
}

/** Groups FLOW into contiguous segments (one per intake block / question section) for a segmented progress bar. */
export function buildSegments(): FlowSegment[] {
  const segments: FlowSegment[] = [];
  FLOW.forEach((step, i) => {
    const key = segmentKeyFor(step);
    const last = segments[segments.length - 1];
    if (last && last.key === key) {
      last.endIndex = i + 1;
    } else {
      segments.push({ key, label: SEGMENT_LABELS[key] ?? key, startIndex: i, endIndex: i + 1 });
    }
  });
  return segments;
}

export const SEGMENTS: FlowSegment[] = buildSegments();

export function segmentIndexForStep(stepIndex: number): number {
  return SEGMENTS.findIndex((s) => stepIndex >= s.startIndex && stepIndex < s.endIndex);
}

/**
 * Aggregates raw per-question answers (keyed by question id, e.g. "q_ambiguity_1")
 * into a per-dimension profile (keyed by dimension id, e.g. "ambiguity_tolerance"),
 * per questions.json's design: each dimension's final value is the average of its
 * 2 questions' answers, with skipped (null) questions excluded rather than
 * counted as a neutral value — consistent with scoring.md's own skip handling.
 */
export function aggregateAnswersToProfile(
  answers: Record<string, number | null | undefined>,
  domains?: string[]
): Record<string, number | null> {
  const byDimension = new Map<string, number[]>();
  for (const question of questions) {
    const value = answers[question.id];
    if (value === null || value === undefined) continue;
    const list = byDimension.get(question.dimension) ?? [];
    list.push(value);
    byDimension.set(question.dimension, list);
  }

  for (const domain of domains ?? []) {
    for (const dimId of DOMAIN_DIMENSION_MAP[domain] ?? []) {
      const list = byDimension.get(dimId) ?? [];
      list.push(DOMAIN_IMPLIED_VALUE);
      byDimension.set(dimId, list);
    }
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
