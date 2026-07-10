import { describe, it, expect } from "vitest";
import {
  allAffirmativeAnswers,
  allNegativeAnswers,
  allNeutralAnswers,
} from "./degenerate-personas";
import { aggregateAnswersToProfile } from "./assessment-flow";
import { rankArchetypes } from "./scoring";
import { archetypes, archetypeById } from "./taxonomy";

/**
 * Regression tests for three degenerate (not-a-real-person) inputs, added
 * after manually exploring "what happens at the extremes" with the user.
 * These lock in documented findings about the Step 2.5/2.6 floor+tiebreak
 * mechanism so a future change that lets one of these produce a
 * false-confident or nonsensical result gets caught immediately.
 */
describe("degenerate inputs: all-affirmative (5/5 on everything)", () => {
  const profile = aggregateAnswersToProfile(allAffirmativeAnswers);
  const ranked = rankArchetypes(profile);

  it("no archetype looks like a confident, near-perfect match for a self-contradictory profile", () => {
    expect(ranked[0].fitScore).toBeLessThan(0.75);
  });

  it("SRE / Production Engineer is the top match (no dimension wants it low, several want it maxed)", () => {
    expect(ranked[0].id).toBe("sre-production-engineer");
  });

  it("Forward Deployed Engineer is hard-capped near the floor by variable_comp_appetite (wants 1, got 5)", () => {
    const fde = ranked.find((r) => r.id === "forward-deployed-engineer")!;
    expect(fde.fitScore).toBeLessThan(0.15);
  });

  it("every archetype whose top-weight dimension has an extreme-low target gets capped near the floor", () => {
    // Generalized version of the FDE check above: find every archetype with
    // a weight >= 0.9 dimension targeting 1, and confirm all-5s caps them.
    for (const a of archetypes) {
      const topWeight = Math.max(...Object.values(a.scores).map((s) => s.weight));
      if (topWeight < 0.9) continue;
      const hasExtremeLowTopDim = Object.values(a.scores).some(
        (s) => s.weight === topWeight && s.target === 1
      );
      if (!hasExtremeLowTopDim) continue;
      const result = ranked.find((r) => r.id === a.id)!;
      expect(result.fitScore, `${a.name} should be capped low`).toBeLessThan(0.15);
    }
  });
});

describe("degenerate inputs: all-negative (1/5 on everything)", () => {
  const profile = aggregateAnswersToProfile(allNegativeAnswers);
  const ranked = rankArchetypes(profile);

  it("no archetype looks like a confident match — the best available is still weak", () => {
    expect(ranked[0].fitScore).toBeLessThan(0.4);
  });

  it("Engineering Management is hard-capped near the floor by people_management_orientation (wants 5, got 1)", () => {
    const em = archetypeById.get("engineering-management")!;
    const result = ranked.find((r) => r.id === "engineering-management")!;
    const topWeight = Math.max(...Object.values(em.scores).map((s) => s.weight));
    expect(em.scores.people_management_orientation.weight).toBe(topWeight);
    expect(result.fitScore).toBeLessThan(0.15);
  });

  it("every archetype whose top-weight dimension has an extreme-high target gets capped near the floor", () => {
    for (const a of archetypes) {
      const topWeight = Math.max(...Object.values(a.scores).map((s) => s.weight));
      if (topWeight < 0.9) continue;
      const hasExtremeHighTopDim = Object.values(a.scores).some(
        (s) => s.weight === topWeight && s.target === 5
      );
      if (!hasExtremeHighTopDim) continue;
      const result = ranked.find((r) => r.id === a.id)!;
      expect(result.fitScore, `${a.name} should be capped low`).toBeLessThan(0.15);
    }
  });
});

describe("degenerate inputs: all-neutral (3/5 on everything)", () => {
  const profile = aggregateAnswersToProfile(allNeutralAnswers);
  const ranked = rankArchetypes(profile);

  it("no archetype looks like a confident match — a wishy-washy profile shouldn't produce near-100%", () => {
    expect(ranked[0].fitScore).toBeLessThan(0.85);
  });

  it("archetypes whose defining trait sits at an extreme (1 or 5) cluster tightly near the 0.5 floor", () => {
    const extremeTierIds = archetypes
      .filter((a) => {
        const topWeight = Math.max(...Object.values(a.scores).map((s) => s.weight));
        return (
          topWeight >= 0.9 &&
          Object.values(a.scores).some((s) => s.weight === topWeight && (s.target === 1 || s.target === 5))
        );
      })
      .map((a) => a.id);

    expect(extremeTierIds.length).toBeGreaterThan(5); // sanity: this should be most of the roster

    for (const id of extremeTierIds) {
      const result = ranked.find((r) => r.id === id)!;
      expect(result.fitScore, `${id} should sit near the neutral-answer floor of 0.5`).toBeGreaterThanOrEqual(0.45);
      expect(result.fitScore, `${id} should sit near the neutral-answer floor of 0.5`).toBeLessThanOrEqual(0.6);
    }
  });

  it("at least one archetype without an extreme-target defining trait scores meaningfully higher than that cluster", () => {
    const best = ranked[0];
    expect(best.fitScore).toBeGreaterThan(0.65);
  });
});
