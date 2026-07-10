import { describe, it, expect } from "vitest";
import { personas } from "./personas";
import { aggregateAnswersToProfile } from "./assessment-flow";
import { rankArchetypes } from "./scoring";
import { archetypeById } from "./taxonomy";

/**
 * One persona per archetype (18 total, see personas.ts), run through the
 * REAL answer-aggregation pipeline (aggregateAnswersToProfile -> rankArchetypes)
 * rather than hand-crafted dimension values. This is deliberately a
 * different, complementary layer of coverage from scoring.test.ts's 10
 * Phase 2 personas, which feed dimension values directly and so cannot
 * catch bugs living in the answers -> profile step (exactly how the
 * duplicate-question-id bug and the slider-default bug both slipped past
 * the existing suite this session).
 *
 * The bar is top-3, not top-1: PLAN.md's own Phase 6 beta acceptance
 * criterion is "≥70% of beta users' actual role appears in their top-3,"
 * so a persona built from an archetype's own target profile failing to
 * clear that same bar against itself would be a genuine taxonomy problem,
 * not just a stricter-than-necessary test.
 *
 * When you change archetypes.json weights/targets, questions.json, or
 * scoring.ts, run `npm run personas:report` first to see the full
 * before/after impact across all 18 personas (rank + score deltas) before
 * relying on this file's pass/fail signal alone.
 */
describe("persona suite: each archetype's own persona ranks in its top 3", () => {
  for (const persona of personas) {
    it(`${persona.personaName} (${persona.targetArchetypeId}) lands in the top 3`, () => {
      const profile = aggregateAnswersToProfile(persona.answers);
      const ranked = rankArchetypes(profile);
      const rank = ranked.findIndex((r) => r.id === persona.targetArchetypeId) + 1;
      const result = ranked.find((r) => r.id === persona.targetArchetypeId);

      expect(rank, `${persona.personaName} ranked #${rank} — top 3 was: ${ranked
        .slice(0, 3)
        .map((r) => r.name)
        .join(", ")}`).toBeGreaterThan(0);
      expect(rank).toBeLessThanOrEqual(3);
      expect(result!.fitScore).toBeGreaterThan(0.55);
    });
  }

  it("covers every archetype exactly once", () => {
    const ids = personas.map((p) => p.targetArchetypeId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBe(archetypeById.size);
    for (const id of ids) expect(archetypeById.has(id)).toBe(true);
  });
});
