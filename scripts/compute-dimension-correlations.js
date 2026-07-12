#!/usr/bin/env node
/**
 * compute-dimension-correlations.js
 *
 * Step 1 of the "dimension independence" fix (scoring v1.6). The scoring model
 * treats each of the 22 taxonomy dimensions independently — it has no notion
 * that some temperament traits tend to co-occur in practice (documented as a
 * limitation on the methodology page and in scoring.md's Known Limitations).
 *
 * This script derives that co-occurrence structure *from the taxonomy itself*,
 * with no outside data: across the 18 archetype profiles in
 * taxonomy/archetypes.json, each dimension has an 18-long vector of `target`
 * values (one per archetype). We compute the Pearson correlation between every
 * pair of those dimension vectors. Two dimensions whose targets rise and fall
 * together across the archetypes (|r| > THRESHOLD) are empirically co-occurring
 * traits; anti-correlated pairs (r < -THRESHOLD) trade off against each other.
 *
 * Output: taxonomy/dimension-correlations.json (and a synced copy under
 * app/data/ so the runtime scoring engine can import it — the two dirs are kept
 * byte-identical, matching the existing taxonomy/ <-> app/data/ mirror).
 *
 * Deterministic, dependency-free, reproducible: `node scripts/compute-dimension-correlations.js`.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const THRESHOLD = 0.7; // |Pearson r| above which a pair is "meaningfully correlated"

const dimensionsData = JSON.parse(
  fs.readFileSync(path.join(ROOT, "taxonomy", "dimensions.json"), "utf8")
);
const archetypesData = JSON.parse(
  fs.readFileSync(path.join(ROOT, "taxonomy", "archetypes.json"), "utf8")
);

const dimensionIds = dimensionsData.dimensions.map((d) => d.id);
const archetypes = archetypesData.archetypes;

// Build, for each dimension, the vector of its `target` across all 18 archetypes.
const vectors = {};
for (const dimId of dimensionIds) {
  vectors[dimId] = archetypes.map((a) => {
    const entry = a.scores[dimId];
    if (!entry || typeof entry.target !== "number") {
      throw new Error(`Archetype ${a.id} is missing a target for dimension ${dimId}`);
    }
    return entry.target;
  });
}

function mean(xs) {
  return xs.reduce((s, x) => s + x, 0) / xs.length;
}

/** Pearson correlation coefficient between two equal-length numeric vectors. */
function pearson(xs, ys) {
  const mx = mean(xs);
  const my = mean(ys);
  let cov = 0;
  let vx = 0;
  let vy = 0;
  for (let i = 0; i < xs.length; i++) {
    const dx = xs[i] - mx;
    const dy = ys[i] - my;
    cov += dx * dy;
    vx += dx * dx;
    vy += dy * dy;
  }
  // A dimension with an identical target across every archetype has zero
  // variance; correlation is undefined (0/0) — report it as 0 (no linear
  // relationship can be established), not NaN.
  if (vx === 0 || vy === 0) return 0;
  return cov / Math.sqrt(vx * vy);
}

function round(x, places = 3) {
  const f = Math.pow(10, places);
  return Math.round(x * f) / f;
}

// Full symmetric matrix (rounded for readable, diffable JSON).
const matrix = {};
for (const a of dimensionIds) {
  matrix[a] = {};
  for (const b of dimensionIds) {
    matrix[a][b] = a === b ? 1 : round(pearson(vectors[a], vectors[b]));
  }
}

// Unique correlated pairs above the threshold, strongest first. `direction` is
// "positive" (traits co-occur) or "negative" (traits trade off).
const correlatedPairs = [];
for (let i = 0; i < dimensionIds.length; i++) {
  for (let j = i + 1; j < dimensionIds.length; j++) {
    const a = dimensionIds[i];
    const b = dimensionIds[j];
    const r = pearson(vectors[a], vectors[b]);
    if (Math.abs(r) > THRESHOLD) {
      correlatedPairs.push({
        a,
        b,
        r: round(r),
        direction: r > 0 ? "positive" : "negative",
      });
    }
  }
}
correlatedPairs.sort((p, q) => Math.abs(q.r) - Math.abs(p.r));

const output = {
  version: "1.0",
  generated_by: "scripts/compute-dimension-correlations.js",
  source: {
    dimensions: `taxonomy/dimensions.json v${dimensionsData.version}`,
    archetypes: `taxonomy/archetypes.json v${archetypesData.version}`,
    dimension_count: dimensionIds.length,
    archetype_count: archetypes.length,
  },
  method:
    "Pearson correlation between each pair of dimensions' target vectors across all 18 archetype profiles. " +
    `Pairs with |r| > ${THRESHOLD} are reported as meaningfully correlated. Zero-variance dimensions ` +
    "(identical target across every archetype) yield r = 0 by convention (undefined linear relationship).",
  threshold: THRESHOLD,
  correlated_pairs: correlatedPairs,
  matrix,
};

const json = JSON.stringify(output, null, 2) + "\n";
const targets = [
  path.join(ROOT, "taxonomy", "dimension-correlations.json"),
  path.join(ROOT, "app", "data", "dimension-correlations.json"),
];
for (const target of targets) {
  fs.writeFileSync(target, json);
  console.log(`wrote ${path.relative(ROOT, target)}`);
}

console.log(
  `\n${correlatedPairs.length} correlated pair(s) at |r| > ${THRESHOLD}:`
);
for (const p of correlatedPairs) {
  console.log(`  ${p.r >= 0 ? "+" : ""}${p.r}  ${p.a}  <->  ${p.b}  (${p.direction})`);
}
