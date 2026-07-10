import { describe, it, expect } from "vitest";
import { dimensions, archetypes, questions } from "./taxonomy";

/**
 * Structural invariants over the taxonomy data files. Added after a real,
 * previously-undetected bug: questions.json had two completely different
 * questions (technical_breadth_depth's q_breadth_1/2, added v1.0) and
 * account_portfolio_breadth's q_breadth_1/2, added v1.1) silently sharing
 * the exact same ids. Since answers are keyed by question id in a flat
 * object, this meant one dimension's real answer silently overwrote the
 * other's in every real assessment run since v1.1, corrupting both
 * dimensions' scores with no visible symptom in the UI or in the existing
 * (dimension-level) persona tests, which never exercise raw question ids.
 * This file exists so that class of bug fails a test immediately instead of
 * silently shipping again.
 */
describe("taxonomy data integrity", () => {
  it("every question has a unique id", () => {
    const seen = new Map<string, number>();
    for (const q of questions) seen.set(q.id, (seen.get(q.id) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, count]) => count > 1);
    expect(dupes).toEqual([]);
  });

  it("every question's dimension exists in dimensions.json", () => {
    const dimIds = new Set(dimensions.map((d) => d.id));
    const orphaned = questions.filter((q) => !dimIds.has(q.dimension));
    expect(orphaned.map((q) => q.id)).toEqual([]);
  });

  it("every dimension has at least one question", () => {
    const covered = new Set(questions.map((q) => q.dimension));
    const uncovered = dimensions.filter((d) => !covered.has(d.id));
    expect(uncovered.map((d) => d.id)).toEqual([]);
  });

  it("every archetype scores every dimension", () => {
    const dimIds = dimensions.map((d) => d.id);
    for (const a of archetypes) {
      const missing = dimIds.filter((id) => a.scores[id] === undefined);
      expect(missing, `${a.name} is missing scores for: ${missing.join(", ")}`).toEqual([]);
    }
  });

  it("every archetype's dimension targets and weights are in valid range", () => {
    for (const a of archetypes) {
      for (const [dim, s] of Object.entries(a.scores)) {
        expect(s.target, `${a.name}.${dim}.target`).toBeGreaterThanOrEqual(1);
        expect(s.target, `${a.name}.${dim}.target`).toBeLessThanOrEqual(5);
        expect(s.weight, `${a.name}.${dim}.weight`).toBeGreaterThanOrEqual(0);
        expect(s.weight, `${a.name}.${dim}.weight`).toBeLessThanOrEqual(1);
      }
    }
  });

  it("archetype ids are unique", () => {
    const seen = new Map<string, number>();
    for (const a of archetypes) seen.set(a.id, (seen.get(a.id) ?? 0) + 1);
    expect([...seen.entries()].filter(([, c]) => c > 1)).toEqual([]);
  });

  it("dimension ids are unique", () => {
    const seen = new Map<string, number>();
    for (const d of dimensions) seen.set(d.id, (seen.get(d.id) ?? 0) + 1);
    expect([...seen.entries()].filter(([, c]) => c > 1)).toEqual([]);
  });
});
