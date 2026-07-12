import { archetypes, dimensions, type Archetype } from "./taxonomy";

const DIMENSION_IDS = dimensions.map((d) => d.id);
const GAP_FLOOR = 0.15;

export type UserProfile = Partial<Record<string, number | null>>;

export interface DimensionContribution {
  dimension: string;
  fit: number;
  weight: number;
  contribution: number;
  gap: number;
}

export interface ArchetypeResult {
  id: string;
  name: string;
  confidence: Archetype["confidence"];
  fitScore: number;
  topContributors: DimensionContribution[];
  topGaps: DimensionContribution[];
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

  const rawFitScore = weightedFitSum / totalWeight;

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
  };
}

/** Ranks all 18 archetypes for a given user profile, per scoring.md Step 3. */
export function rankArchetypes(profile: UserProfile): ArchetypeResult[] {
  return archetypes
    .map((a) => scoreArchetype(profile, a))
    .filter((r): r is ArchetypeResult => r !== null)
    .sort((a, b) => b.fitScore - a.fitScore);
}

export function fitPercent(fitScore: number): number {
  return Math.round(fitScore * 100);
}
