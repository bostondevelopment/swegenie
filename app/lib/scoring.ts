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
  return 1 - distance / 4;
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

  const fitScore = weightedFitSum / totalWeight;

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
