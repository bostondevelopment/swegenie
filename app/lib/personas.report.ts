import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { personas } from "./personas";
import { aggregateAnswersToProfile } from "./assessment-flow";
import { rankArchetypes } from "./scoring";

/**
 * Human-readable impact report: recomputes all 18 personas against the
 * REAL production scoring pipeline (same modules personas.test.ts uses,
 * so there is no duplicated/drifting logic here) and diffs the result
 * against the committed baseline snapshot (personas.snapshot.json).
 *
 * Run on demand — NOT part of `npm test` (this file doesn't match the
 * `*.test.ts` glob, so it's excluded from the default vitest run; it's
 * invoked explicitly by path):
 *
 *   npm run personas:report              — print the before/after diff table
 *   npm run personas:snapshot            — recompute and overwrite the baseline
 *                                           (do this once you've reviewed and
 *                                           accepted a change's impact)
 *
 * Use this whenever you change taxonomy/archetypes.json weights/targets,
 * taxonomy/questions.json, or app/lib/scoring.ts, to see exactly how much
 * every target persona's rank and score moved before committing.
 */

const SNAPSHOT_PATH = path.join(__dirname, "personas.snapshot.json");

interface SnapshotEntry {
  personaName: string;
  targetRank: number;
  targetScore: number;
  rankedList: Array<{ id: string; score: number }>;
}

function loadSnapshot(): Record<string, SnapshotEntry> {
  return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf-8"));
}

function computeCurrent(): Record<string, SnapshotEntry> {
  const out: Record<string, SnapshotEntry> = {};
  for (const persona of personas) {
    const profile = aggregateAnswersToProfile(persona.answers);
    const ranked = rankArchetypes(profile);
    const rank = ranked.findIndex((r) => r.id === persona.targetArchetypeId) + 1;
    out[persona.targetArchetypeId] = {
      personaName: persona.personaName,
      targetRank: rank,
      targetScore: Math.round(ranked[rank - 1].fitScore * 1000) / 1000,
      rankedList: ranked.map((r) => ({ id: r.id, score: Math.round(r.fitScore * 1000) / 1000 })),
    };
  }
  return out;
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

describe("persona impact report", () => {
  it("prints the before/after diff table", () => {
    const current = computeCurrent();

    if (process.env.WRITE_SNAPSHOT === "1") {
      fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(current, null, 2) + "\n");
      console.log(`\nWrote new baseline to ${SNAPSHOT_PATH} (${Object.keys(current).length} personas).\n`);
      expect(Object.keys(current).length).toBeGreaterThan(0);
      return;
    }

    const baseline = loadSnapshot();
    const rows: string[] = [];
    let anyRegression = false;

    for (const id of Object.keys(current)) {
      const c = current[id];
      const b = baseline[id];
      if (!b) {
        rows.push(`${c.personaName.padEnd(32)} NEW — no baseline entry (run personas:snapshot to add it)`);
        continue;
      }
      const rankDelta = b.targetRank - c.targetRank; // positive = improved (lower rank number)
      const scoreDelta = c.targetScore - b.targetScore;
      const droppedOutOfTop3 = b.targetRank <= 3 && c.targetRank > 3;
      if (droppedOutOfTop3) anyRegression = true;

      const rankStr = rankDelta === 0 ? `#${c.targetRank}` : `#${b.targetRank} -> #${c.targetRank}`;
      const scoreStr =
        Math.abs(scoreDelta) < 0.0005
          ? pct(c.targetScore)
          : `${pct(b.targetScore)} -> ${pct(c.targetScore)} (${scoreDelta > 0 ? "+" : ""}${(scoreDelta * 100).toFixed(1)}pt)`;
      const flag = droppedOutOfTop3 ? "  <-- DROPPED OUT OF TOP 3" : "";

      rows.push(`${c.personaName.padEnd(32)} rank ${rankStr.padEnd(14)} score ${scoreStr}${flag}`);
    }

    console.log("\n=== Persona impact report ===\n");
    console.log(rows.join("\n"));
    console.log(
      anyRegression
        ? "\n⚠ At least one persona dropped out of its archetype's top 3 vs. the baseline.\n"
        : "\nNo persona dropped out of top 3 vs. the baseline.\n"
    );

    // Informational report, not a gate — personas.test.ts is the pass/fail
    // check. This only fails if the computation itself breaks.
    expect(Object.keys(current).length).toBeGreaterThan(0);
  });
});
