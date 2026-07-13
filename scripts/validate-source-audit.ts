/**
 * Validates that comp-data confidence assignments touched by the 2026-07-12 data-quality
 * initiative are backed by a traceable local record (a real cited source, or an explicit
 * "researched, no public data found" negative result) — not just a plausible-sounding number.
 *
 * Scope: the 9 archetypes whose comp-by-tier.json cells were re-researched with tier-aware
 * sourcing (docs/research/source-archive/comp-by-tier/), and the 18 archetypes whose
 * comp-structure.json entries were rebuilt from the full job-postings corpus
 * (docs/research/job-postings-corpus/comp-extraction/). Archetypes/cells outside this scope
 * (comp-by-tier.json cells that were already medium/high before this initiative) still rely
 * on the original hand-curated Levels.fyi/Carta/techinterview.org/Cadence-blog sourcesNote and
 * are NOT individually audited here — that is a known, honest scope boundary, not a false pass.
 *
 * Run: cd app && node --experimental-strip-types ../scripts/validate-source-audit.ts
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const APP_DIR = (() => {
  const candidates = [process.cwd(), join(process.cwd(), 'app')];
  for (const c of candidates) if (existsSync(join(c, 'data', 'comp-by-tier.json'))) return c;
  throw new Error(`could not locate app/data from cwd ${process.cwd()}`);
})();
const REPO_ROOT = APP_DIR.endsWith('/app') ? APP_DIR.slice(0, -4) : join(APP_DIR, '..');

const TIER_AUDITED_ARCHETYPES = [
  'customer-support-engineer',
  'customer-support-solutions-engineer',
  'embedded-iot-engineer',
  'consulting-engineer-professional-services',
  'developer-relations-advocacy',
  'sales-engineer-pre-sales',
  'solutions-architect-consulting',
  'solutions-architect-vendor-side',
  'engineering-management',
];
const TIERS = ['ai-labs', 'faang-mag7', 'high-growth-public', 'growth-stage-private', 'early-stage'];
const LEVELS = ['L3', 'L4', 'L5', 'Staff'];

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

// --- comp-by-tier.json cell-level audit (scoped to tier-audited archetypes) ---
const compByTierArchiveDir = join(REPO_ROOT, 'docs/research/source-archive/comp-by-tier');
let cellsChecked = 0;
for (const archetypeId of TIER_AUDITED_ARCHETYPES) {
  const dir = join(compByTierArchiveDir, archetypeId);
  if (!existsSync(dir)) {
    fail(`comp-by-tier: no archive directory for ${archetypeId} at ${dir}`);
    continue;
  }
  const files = readdirSync(dir);
  for (const tier of TIERS) {
    for (const level of LEVELS) {
      cellsChecked++;
      const prefix = `${tier}-${level}`;
      const hasRecord = files.some((f) => f.startsWith(prefix));
      if (!hasRecord) {
        fail(`comp-by-tier: ${archetypeId}/${tier}/${level} has no archived source AND no no-data-found record`);
      }
    }
  }
}

// --- comp-structure.json archetype-level audit (all 18, via corpus extraction files) ---
const compStructure = JSON.parse(readFileSync(join(APP_DIR, 'data', 'comp-structure.json'), 'utf8')) as Array<{
  archetypeId: string;
}>;
const extractionDir = join(REPO_ROOT, 'docs/research/job-postings-corpus/comp-extraction');
let structureChecked = 0;
for (const { archetypeId } of compStructure) {
  structureChecked++;
  const extractionFile = join(extractionDir, `${archetypeId}.json`);
  if (!existsSync(extractionFile)) {
    fail(`comp-structure: no corpus extraction audit trail for ${archetypeId} at ${extractionFile}`);
  }
}

if (errors.length > 0) {
  console.error(`source-audit validation FAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `source-audit validation PASSED: ${cellsChecked} tier-audited comp-by-tier cells across ${TIER_AUDITED_ARCHETYPES.length} archetypes all have a traceable local record; ${structureChecked} comp-structure archetypes all have a corpus extraction audit trail.`
);
console.log(
  `NOTE: this does not cover comp-by-tier.json cells outside the 9 tier-audited archetypes — those retain the original hand-curated Levels.fyi/Carta sourcesNote without per-cell archived citations.`
);
