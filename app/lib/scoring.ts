import {
  archetypes,
  dimensions,
  correlatedDimensionPairs,
  type Archetype,
} from "./taxonomy";

const DIMENSION_IDS = dimensions.map((d) => d.id);
const GAP_FLOOR = 0.15;

// Step 2.7 (v1.6) co-occurrence adjustment tuning. A correlated dimension pair
// counts as a *defining feature* of an archetype only when at least one of the
// two dims is a strong (defining-tier) trait for it and the other is at least
// moderately weighted — so the layer nudges archetypes the cluster actually
// characterizes, not every archetype that happens to weight both dims slightly.
const CORR_STRONG_WEIGHT = 0.6;
const CORR_MIN_WEIGHT = 0.3;
// Per-pair adjustment magnitude scales with correlation strength across the
// [0.7, 1.0] band the pairs live in: r=0.7 -> 0.02, r=1.0 -> 0.05.
const CORR_MIN_DELTA = 0.02;
const CORR_MAX_DELTA = 0.05;
const CORR_MAX_TOTAL = 0.1; // total adjustment per archetype clamped to [-0.10, +0.10]

export type UserProfile = Partial<Record<string, number | null>>;

export interface DimensionContribution {
  dimension: string;
  fit: number;
  weight: number;
  contribution: number;
  gap: number;
}

/**
 * One correlated dimension pair that moved an archetype's score in Step 2.7.
 * `kind` is "reinforcing" (the user's answers on both dims match the direction
 * the archetype's cluster expects — a coherent co-occurring signal, positive
 * `delta`) or "conflicting" (the answers pull in opposite directions relative
 * to the archetype's expected pattern — negative `delta`).
 */
export interface CorrelationPairAdjustment {
  a: string;
  b: string;
  r: number;
  kind: "reinforcing" | "conflicting";
  delta: number;
}

export interface CorrelationAdjustment {
  /** Signed total, clamped to [-CORR_MAX_TOTAL, +CORR_MAX_TOTAL]. */
  total: number;
  pairs: CorrelationPairAdjustment[];
}

export interface ArchetypeResult {
  id: string;
  name: string;
  confidence: Archetype["confidence"];
  fitScore: number;
  topContributors: DimensionContribution[];
  topGaps: DimensionContribution[];
  /**
   * Step 2.7 (v1.6): how inter-dimension correlations moved this archetype's
   * score, and which pairs did it — so the results UI can explain *why* a
   * combination of answers helped or hurt beyond the per-dimension breakdown.
   */
  correlationAdjustment: CorrelationAdjustment;
}

function fit(userValue: number, target: number): number {
  const distance = Math.abs(userValue - target);
  // Non-linear (squared) gap penalty (v1.5): the penalty grows with the SQUARE
  // of the normalized distance, so a 2-point gap costs 4x a 1-point gap, not 2x.
  // Small mismatches are treated as near-noise while large mismatches hurt
  // super-linearly — a modeling improvement over v1's flat linear penalty that
  // is still fully explainable and bounded to [0,1]:
  //   distance 0 -> 1.0, 1 -> 0.9375, 2 -> 0.75, 3 -> 0.4375, 4 -> 0.0.
  // See taxonomy/scoring.md Step 1.
  const normalized = distance / 4;
  return 1 - normalized * normalized;
}

function sign(x: number): number {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

/** Per-pair magnitude scaled linearly across the [0.7, 1.0] |r| band. */
function correlationDelta(r: number): number {
  const abs = Math.abs(r);
  const t = (abs - 0.7) / (1 - 0.7); // 0 at r=0.7, 1 at r=1.0
  return CORR_MIN_DELTA + Math.min(1, Math.max(0, t)) * (CORR_MAX_DELTA - CORR_MIN_DELTA);
}

/**
 * Step 2.7 (v1.6) — inter-dimension co-occurrence adjustment.
 *
 * The base model (Steps 1-2) scores every dimension independently, so it can't
 * see that some traits co-occur in practice — the "no inter-dimension
 * correlation modeling" limitation. This closes that gap transparently: using
 * the empirically-derived correlated pairs (|r| > 0.7 across the 17 archetype
 * profiles; see taxonomy/dimension-correlations.json), we reward a user whose
 * answers on a correlated pair line up the way the archetype's own cluster does,
 * and penalize answers that pull in opposite directions.
 *
 * A pair only applies to an archetype where that cluster is a *defining
 * feature*: at least one of the two dims is a strong (>= 0.6-weight) trait, the
 * other is at least moderately weighted (>= 0.3), and the archetype's own
 * targets express the pair's correlation direction (both off-neutral, matching
 * sign(r)). Then, for the user's off-neutral answers:
 *   - both lean the archetype's way   -> reinforcing (+delta)
 *   - exactly one leans its way        -> conflicting (-delta): the combination
 *                                         breaks the co-occurrence the role expects
 *   - neither leans its way            -> no correlation signal (plain poor fit,
 *                                         already handled by Steps 1-2; not
 *                                         double-counted here)
 * Neutral (3) answers carry no directional signal and are skipped.
 *
 * The signed total is clamped to [-0.10, +0.10]. It's a nudge, by design: folded
 * into the raw fit *before* the Step 2.5 defining-trait floor, so it can reorder
 * near-neighbors but never rescue an archetype the user mismatches on its
 * defining trait.
 */
export function computeCorrelationAdjustment(
  profile: UserProfile,
  archetype: Archetype
): CorrelationAdjustment {
  const pairs: CorrelationPairAdjustment[] = [];
  let total = 0;

  for (const pair of correlatedDimensionPairs) {
    const ua = profile[pair.a];
    const ub = profile[pair.b];
    if (ua === null || ua === undefined || ub === null || ub === undefined) continue;

    const sa = archetype.scores[pair.a];
    const sb = archetype.scores[pair.b];
    if (!sa || !sb) continue;

    // Gate: the cluster must be a defining feature of this archetype.
    if (Math.max(sa.weight, sb.weight) < CORR_STRONG_WEIGHT) continue;
    if (sa.weight < CORR_MIN_WEIGHT || sb.weight < CORR_MIN_WEIGHT) continue;

    const ta = sign(sa.target - 3);
    const tb = sign(sb.target - 3);
    if (ta === 0 || tb === 0) continue; // archetype neutral on one -> no signature
    if (ta * tb !== sign(pair.r)) continue; // archetype doesn't express this correlation

    const da = sign(ua - 3);
    const db = sign(ub - 3);
    if (da === 0 || db === 0) continue; // user neutral on one -> no directional signal

    const matchA = da === ta;
    const matchB = db === tb;
    const delta = correlationDelta(pair.r);

    if (matchA && matchB) {
      total += delta;
      pairs.push({ a: pair.a, b: pair.b, r: pair.r, kind: "reinforcing", delta });
    } else if (matchA !== matchB) {
      total -= delta;
      pairs.push({ a: pair.a, b: pair.b, r: pair.r, kind: "conflicting", delta: -delta });
    }
    // matchA === matchB === false: user opposes the role on both dims — that's a
    // plain fit miss (already penalized in Steps 1-2), not a correlation signal.
  }

  const clamped = Math.max(-CORR_MAX_TOTAL, Math.min(CORR_MAX_TOTAL, total));
  if (clamped !== total && total !== 0) {
    // Rescale the surfaced per-pair deltas so they still sum to the clamped
    // total the UI displays.
    const scale = clamped / total;
    for (const p of pairs) p.delta *= scale;
  }

  return { total: clamped, pairs };
}

/** Pure implementation of taxonomy/scoring.md. */
export function scoreArchetype(
  profile: UserProfile,
  archetype: Archetype
): ArchetypeResult | null {
  let weightedFitSum = 0;
  let totalWeight = 0;
  const contributions: DimensionContribution[] = [];

  for (const dimId of DIMENSION_IDS) {
    const userValue = profile[dimId];
    if (userValue === null || userValue === undefined) continue;
    const entry = archetype.scores[dimId];
    if (!entry) continue;

    const f = fit(userValue, entry.target);
    weightedFitSum += entry.weight * f;
    totalWeight += entry.weight;
    contributions.push({
      dimension: dimId,
      fit: f,
      weight: entry.weight,
      contribution: entry.weight * f,
      gap: entry.weight * (1 - f),
    });
  }

  if (totalWeight === 0) return null;

  // Step 2.7 (v1.6): fold the inter-dimension co-occurrence adjustment into the
  // raw fit *before* the floor, so a coherent (or contradictory) combination of
  // answers nudges the score, but the Step 2.5 defining-trait floor still caps
  // an archetype the user mismatched on its defining trait — a positive
  // correlation nudge can't rescue a fundamentally bad match.
  const correlationAdjustment = computeCorrelationAdjustment(profile, archetype);
  const rawFitScore = Math.min(
    1,
    Math.max(0, weightedFitSum / totalWeight + correlationAdjustment.total)
  );

  // Step 2.5 (v1.1): an archetype's score can never exceed its fit on that
  // archetype's own defining dimension(s). Without this, an archetype can rank
  // highly on broad agreement across secondary dimensions despite a mediocre
  // match on the one trait that actually defines it — the exact bug a real user
  // found (Security Engineer ranking #4 on a weak adversarial_threat_modeling
  // match, propped up by lower-weight agreement elsewhere). See scoring.md 2.5.
  //
  // The defining dimension(s) are published per-archetype in
  // archetypes.json's `defining_dimension` (the highest-weight trait(s); an
  // array because several archetypes tie multiple dims at the max weight). We
  // floor on the ones the user actually answered; if they skipped every declared
  // defining dimension, we fall back to the highest-weight dimension(s) they did
  // answer, so the floor still binds on the most important available signal
  // rather than silently disappearing. When the defining dimensions are answered
  // (the normal case) this is exactly the archetype's own most-weighted trait(s).
  const answered = new Set(contributions.map((c) => c.dimension));
  const declaredDefining = archetype.defining_dimension.filter((d) => answered.has(d));
  let floorContributions: DimensionContribution[];
  if (declaredDefining.length > 0) {
    const defining = new Set(declaredDefining);
    floorContributions = contributions.filter((c) => defining.has(c.dimension));
  } else {
    const topWeight = Math.max(...contributions.map((c) => c.weight));
    floorContributions = contributions.filter((c) => c.weight === topWeight);
  }
  const worstTopFit = Math.min(...floorContributions.map((c) => c.fit));

  // Step 2.6 (v1.4): tie-break within the floor using the raw score. The 1-5
  // answer scale only produces 5 possible fit() values per dimension, so the
  // floor alone often collapses archetypes with meaningfully different
  // overall matches onto the exact same capped value (e.g. a real user saw
  // four different archetypes all land on precisely 0.5, for four unrelated
  // reasons). TIEBREAK_EPSILON lets rawFitScore break that tie, but only by
  // a small, one-directional nudge upward from the floor — an archetype can
  // never recover more than 10% of the gap between its floor and its
  // (diluted) raw score, preserving Step 2.5's disqualifying intent.
  const TIEBREAK_EPSILON = 0.1;
  const fitScore =
    rawFitScore <= worstTopFit
      ? rawFitScore
      : worstTopFit + TIEBREAK_EPSILON * (rawFitScore - worstTopFit);

  const topContributors = [...contributions]
    .sort((a, b) => b.contribution - a.contribution || b.weight - a.weight)
    .slice(0, 3);

  const topGaps = [...contributions]
    .filter((c) => c.gap > GAP_FLOOR)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  return {
    id: archetype.id,
    name: archetype.name,
    confidence: archetype.confidence,
    fitScore,
    topContributors,
    topGaps,
    correlationAdjustment,
  };
}

/** Ranks all 17 archetypes for a given user profile, per scoring.md Step 3. */
export function rankArchetypes(profile: UserProfile): ArchetypeResult[] {
  return archetypes
    .map((a) => scoreArchetype(profile, a))
    .filter((r): r is ArchetypeResult => r !== null)
    .sort((a, b) => b.fitScore - a.fitScore);
}

export function fitPercent(fitScore: number): number {
  return Math.round(fitScore * 100);
}
