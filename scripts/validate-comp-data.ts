/**
 * Validates app/data/comp-by-tier.json against app/data/archetypes.json.
 *
 * Asserts:
 *  - every archetype id from archetypes.json is present
 *  - all 5 tiers and 4 levels present per archetype
 *  - each cell has base, bonus, equity, confidence
 *  - p10 < p25 < p50 < p75 < p90 on every band (no inversions)
 *
 * Exits non-zero and prints the failing field path on the first failure per cell.
 *
 * Run: cd app && npx ts-node ../scripts/validate-comp-data.ts
 *   (or: node --experimental-strip-types scripts/validate-comp-data.ts from repo root)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Resolve app/data whether invoked from repo root or from app/ (per run instructions).
const DATA_DIR = (() => {
  const candidates = [join(process.cwd(), 'data'), join(process.cwd(), 'app', 'data')];
  for (const c of candidates) if (existsSync(join(c, 'comp-by-tier.json'))) return c;
  throw new Error(`could not locate app/data/comp-by-tier.json from cwd ${process.cwd()}`);
})();

const EXPECTED_TIERS = ['ai-labs', 'faang-mag7', 'high-growth-public', 'growth-stage-private', 'early-stage'];
const EXPECTED_LEVELS = ['L3', 'L4', 'L5', 'Staff'];
const PERCENTILES = ['p10', 'p25', 'p50', 'p75', 'p90'] as const;
const VALID_CONFIDENCE = new Set(['high', 'medium', 'low']);
const VALID_EQUITY_TYPE = new Set(['rsu', 'options', 'profit-interest']);

const errors: string[] = [];
const fail = (path: string, msg: string) => errors.push(`${path}: ${msg}`);

const readJson = (p: string) => JSON.parse(readFileSync(p, 'utf8'));

const archetypesDoc = readJson(join(DATA_DIR, 'archetypes.json'));
const comp = readJson(join(DATA_DIR, 'comp-by-tier.json'));

const expectedIds: string[] = archetypesDoc.archetypes.map((a: { id: string }) => a.id);

// top-level shape
if (!comp.archetypes || typeof comp.archetypes !== 'object') {
  fail('archetypes', 'missing or not an object');
}

// monotonic band check
function checkBand(path: string, band: unknown) {
  if (!band || typeof band !== 'object') {
    fail(path, 'missing band object');
    return;
  }
  const b = band as Record<string, unknown>;
  let prev = -Infinity;
  for (const p of PERCENTILES) {
    const v = b[p];
    if (typeof v !== 'number' || !Number.isInteger(v)) {
      fail(`${path}.${p}`, `expected integer, got ${JSON.stringify(v)}`);
      return;
    }
    if (v <= prev) {
      fail(`${path}.${p}`, `inversion: ${p}=${v} not greater than previous ${prev}`);
      return;
    }
    prev = v;
  }
}

for (const id of expectedIds) {
  const arch = comp.archetypes?.[id];
  if (!arch) {
    fail(`archetypes.${id}`, 'archetype missing from comp-by-tier.json');
    continue;
  }
  for (const tier of EXPECTED_TIERS) {
    const tierObj = arch[tier];
    if (!tierObj) {
      fail(`archetypes.${id}.${tier}`, 'tier missing');
      continue;
    }
    for (const level of EXPECTED_LEVELS) {
      const cell = tierObj[level];
      const cellPath = `archetypes.${id}.${tier}.${level}`;
      if (!cell) {
        fail(cellPath, 'level missing');
        continue;
      }
      if (!VALID_CONFIDENCE.has(cell.confidence)) {
        fail(`${cellPath}.confidence`, `expected high|medium|low, got ${JSON.stringify(cell.confidence)}`);
      }
      checkBand(`${cellPath}.base`, cell.base);
      checkBand(`${cellPath}.bonus`, cell.bonus);
      if (!cell.equity || typeof cell.equity !== 'object') {
        fail(`${cellPath}.equity`, 'missing equity object');
      } else {
        checkBand(`${cellPath}.equity.annualizedUSD`, cell.equity.annualizedUSD);
        if (cell.equity.vestingYears !== 4) {
          fail(`${cellPath}.equity.vestingYears`, `expected 4, got ${JSON.stringify(cell.equity.vestingYears)}`);
        }
        if (!VALID_EQUITY_TYPE.has(cell.equity.type)) {
          fail(`${cellPath}.equity.type`, `expected rsu|options|profit-interest, got ${JSON.stringify(cell.equity.type)}`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`comp-by-tier validation FAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const cellCount = expectedIds.length * EXPECTED_TIERS.length * EXPECTED_LEVELS.length;
console.log(
  `comp-by-tier validation PASSED: ${expectedIds.length} archetypes x ${EXPECTED_TIERS.length} tiers x ${EXPECTED_LEVELS.length} levels = ${cellCount} cells, all bands monotonic.`
);
