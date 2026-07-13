import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import compStructure from "@/data/comp-structure.json";

/**
 * Human-readable drift report over the job-postings corpus, complementary
 * to personas.report.ts (which catches quiz-scoring regressions) -- this
 * catches corpus-side regressions: an archetype's posting count or comp
 * `typical` value moving without anyone noticing, whether from a deliberate
 * classify.py --reclassify-all (expected, should be reviewed once) or an
 * accidental re-run of extraction against a bad harvest (not expected).
 *
 * Run on demand, same pattern as personas.report.ts:
 *
 *   npm run corpus:report      — print the before/after drift table
 *   npm run corpus:snapshot    — recompute and overwrite the baseline
 *                                (do this once you've reviewed and
 *                                accepted a change's impact, e.g. after
 *                                running classify.py --reclassify-all and
 *                                synthesize-comp-data.py for a new/split
 *                                archetype per docs/ADD_ARCHETYPE.md)
 */

const SNAPSHOT_PATH = path.join(__dirname, "corpus-snapshot.snapshot.json");
const BY_ARCHETYPE_DIR = path.join(__dirname, "../../docs/research/job-postings-corpus/by-archetype");

const DRIFT_THRESHOLD = 0.15; // 15% change in posting count or typical comp flags for review

interface SnapshotEntry {
  postingCount: number;
  sourceCompanyCount: number;
  typical: number;
}

interface CompStructureEntry {
  archetypeId: string;
  typical: number;
  sourceCompanyCount: number;
}

function postingCountFor(archetypeId: string): number {
  const fp = path.join(BY_ARCHETYPE_DIR, `${archetypeId}.jsonl`);
  if (!fs.existsSync(fp)) return 0;
  return fs.readFileSync(fp, "utf-8").split("\n").filter((l) => l.trim().length > 0).length;
}

function loadSnapshot(): Record<string, SnapshotEntry> {
  return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf-8"));
}

function computeCurrent(): Record<string, SnapshotEntry> {
  const out: Record<string, SnapshotEntry> = {};
  for (const entry of compStructure as CompStructureEntry[]) {
    out[entry.archetypeId] = {
      postingCount: postingCountFor(entry.archetypeId),
      sourceCompanyCount: entry.sourceCompanyCount,
      typical: entry.typical,
    };
  }
  return out;
}

function pctDelta(before: number, after: number): number {
  if (before === 0) return after === 0 ? 0 : 1;
  return (after - before) / before;
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

describe("corpus drift report", () => {
  it("prints the before/after drift table", () => {
    const current = computeCurrent();

    if (process.env.WRITE_SNAPSHOT === "1") {
      fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(current, null, 2) + "\n");
      console.log(`\nWrote new baseline to ${SNAPSHOT_PATH} (${Object.keys(current).length} archetypes).\n`);
      expect(Object.keys(current).length).toBeGreaterThan(0);
      return;
    }

    const baseline = loadSnapshot();
    const rows: string[] = [];
    let anyDrift = false;

    const allIds = Array.from(new Set([...Object.keys(current), ...Object.keys(baseline)])).sort();

    for (const id of allIds) {
      const c = current[id];
      const b = baseline[id];

      if (!b) {
        rows.push(`${id.padEnd(45)} NEW — no baseline entry (run corpus:snapshot to add it)`);
        continue;
      }
      if (!c) {
        rows.push(`${id.padEnd(45)} MISSING — was in baseline, not in current comp-structure.json`);
        anyDrift = true;
        continue;
      }

      const postingDelta = pctDelta(b.postingCount, c.postingCount);
      const typicalDelta = pctDelta(b.typical, c.typical);
      const drifted = Math.abs(postingDelta) >= DRIFT_THRESHOLD || Math.abs(typicalDelta) >= DRIFT_THRESHOLD;
      if (drifted) anyDrift = true;

      const postingStr =
        b.postingCount === c.postingCount
          ? `${c.postingCount}`
          : `${b.postingCount} -> ${c.postingCount} (${postingDelta > 0 ? "+" : ""}${pct(postingDelta)})`;
      const typicalStr =
        b.typical === c.typical
          ? `$${c.typical}`
          : `$${b.typical} -> $${c.typical} (${typicalDelta > 0 ? "+" : ""}${pct(typicalDelta)})`;

      const flag = drifted ? "  <-- DRIFT >= 15%, review before trusting" : "";
      rows.push(`${id.padEnd(45)} postings ${postingStr.padEnd(28)} typical ${typicalStr}${flag}`);
    }

    console.log("\n=== Corpus drift report ===\n");
    console.log(rows.join("\n"));
    console.log(
      anyDrift
        ? "\n⚠ At least one archetype drifted >= 15% in posting count or typical comp since the last snapshot.\n" +
            "  If this was expected (e.g. a deliberate classify.py --reclassify-all for a new/split archetype),\n" +
            "  review the numbers, then run `npm run corpus:snapshot` to accept the new baseline.\n"
        : "\nNo archetype drifted >= 15% since the last snapshot.\n"
    );

    // Informational report, not a gate — this only fails if the computation itself breaks.
    expect(Object.keys(current).length).toBeGreaterThan(0);
  });
});
