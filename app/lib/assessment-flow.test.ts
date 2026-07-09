import { describe, it, expect } from "vitest";
import { aggregateAnswersToProfile } from "./assessment-flow";
import { questions, dimensions } from "./taxonomy";
import { rankArchetypes } from "./scoring";

describe("aggregateAnswersToProfile", () => {
  it("maps raw per-question answers (keyed by question id) onto dimension ids, not question ids", () => {
    // Regression test: a real user completing the assessment produces answers
    // keyed by question id (e.g. "q_ambiguity_1"), not dimension id. Feeding
    // that raw shape straight into encodeProfile/rankArchetypes (which expect
    // dimension-id keys) silently produces an all-null profile and a "no
    // result" page for every real user — this aggregation step is what
    // prevents that.
    const answers: Record<string, number> = {};
    for (const q of questions) answers[q.id] = 3;

    const profile = aggregateAnswersToProfile(answers);

    for (const dim of dimensions) {
      expect(profile[dim.id]).toBe(3);
    }
    // Confirm none of the raw question ids leak through as profile keys.
    for (const q of questions) {
      expect(profile[q.id]).toBeUndefined();
    }
  });

  it("averages a dimension's 2 questions when they differ", () => {
    const qsForDim = questions.filter((q) => q.dimension === "ambiguity_tolerance");
    expect(qsForDim.length).toBe(2);
    const answers = { [qsForDim[0].id]: 1, [qsForDim[1].id]: 5 };
    const profile = aggregateAnswersToProfile(answers);
    expect(profile.ambiguity_tolerance).toBe(3);
  });

  it("excludes a dimension entirely (null) when both its questions were skipped", () => {
    const profile = aggregateAnswersToProfile({});
    for (const dim of dimensions) {
      expect(profile[dim.id]).toBeNull();
    }
  });

  it("averages across one answered and one skipped question for the same dimension", () => {
    const qsForDim = questions.filter((q) => q.dimension === "coding_intensity");
    const answers = { [qsForDim[0].id]: 5, [qsForDim[1].id]: null };
    const profile = aggregateAnswersToProfile(answers);
    expect(profile.coding_intensity).toBe(5);
  });

  it("end-to-end: a realistic answer set produces a real ranking, not an empty one", () => {
    const answers: Record<string, number> = {};
    for (const q of questions) answers[q.id] = 4;
    const profile = aggregateAnswersToProfile(answers);
    const ranked = rankArchetypes(profile);
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked[0].fitScore).toBeGreaterThan(0);
  });
});
