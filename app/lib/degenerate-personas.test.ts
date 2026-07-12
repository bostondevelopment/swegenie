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
    // Under the v1.5 squared penalty small per-dimension gaps are forgiven more,
    // so absolute scores read higher than the old linear scale. The v1.6
    // co-occurrence layer (Step 2.7) lifts the everything-high archetypes a
    // little further: an all-5s profile is, by construction, internally coherent
    // on every *positive* correlated pair (both dims high together), so it earns
    // the reinforcing nudge on clusters like systems_design/cloud and
    // oncall/debugging — the model can no more tell a saturating "yes to
    // everything" apart from a genuine both-high person here than the base model
    // could. It still tops out well short of a confident (~0.85+) match.
    expect(ranked[0].fitScore).toBeLessThan(0.85);
  });

  it("an everything-high archetype tops the list, and they cluster tightly (no clear winner)", () => {
    // All-5s aligns with the archetypes whose profile wants nearly everything
    // high — SRE, Data Engineer, and ML Engineer all sit within a point of each
    // other. Which one edges out #1 is not meaningful for a degenerate profile;
    // the guarantee is that the winner comes from this cluster, not that it's
    // any single one.
    const everythingHigh = ["sre-production-engineer", "data-engineer", "ml-engineer"];
    expect(everythingHigh).toContain(ranked[0].id);
    const top3 = ranked.slice(0, 3).map((r) => r.fitScore);
    expect(top3[0] - top3[2]).toBeLessThan(0.05); // tightly clustered, no confident winner
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
    // Every archetype with an extreme-high defining trait is floored near zero;
    // the best that survives is a moderate-target generalist (e.g. TPM), still a
    // decidedly weak sub-0.5 match.
    expect(ranked[0].fitScore).toBeLessThan(0.5);
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
    // The v1.5 squared penalty forgives 1-point gaps heavily, so generalist
    // archetypes whose targets sit at 2-4 read high (~0.94) for an all-3s
    // profile — higher than the old linear scale. It still stays under a literal
    // near-100%, and the meaningful signal is the *separation* below: archetypes
    // with an extreme-target defining trait are held ~0.18 lower by the floor.
    expect(ranked[0].fitScore).toBeLessThan(0.95);
  });

  it("archetypes whose defining trait sits at an extreme (1 or 5) cluster tightly near the 0.75 floor", () => {
    // A neutral (3) answer is a 2-point gap from an extreme (1 or 5) defining
    // target, so the squared penalty floors these at 1 - (2/4)^2 = 0.75 (plus a
    // small Step 2.6 nudge) — where the linear model put them at 0.5.
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
      expect(result.fitScore, `${id} should sit near the neutral-answer floor of 0.75`).toBeGreaterThanOrEqual(0.74);
      expect(result.fitScore, `${id} should sit near the neutral-answer floor of 0.75`).toBeLessThanOrEqual(0.79);
    }
  });

  it("at least one archetype without an extreme-target defining trait scores meaningfully higher than that cluster", () => {
    // The best generalist (moderate targets, no extreme-target floor) must clear
    // the ~0.75-0.79 extreme-defining cluster by a real margin, not tie it.
    const best = ranked[0];
    expect(best.fitScore).toBeGreaterThan(0.85);
  });
});
