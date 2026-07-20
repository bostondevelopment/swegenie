// Shared type contract for the comp-visualization component library.
// Agent A produces JSON conforming to `CompByTierData`; Agent C wires it into
// the archetype pages. These interfaces are the agreed schema — keep them strict
// (no `any`) so a schema drift surfaces as a type error, not a runtime surprise.

export type Tier =
  | 'ai-labs'
  | 'faang-mag7'
  | 'high-growth-public'
  | 'growth-stage-private'
  | 'early-stage';

export type Level = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'Staff';

export type Confidence = 'high' | 'medium' | 'low';

export type EquityType = 'rsu' | 'options' | 'profit-interest';

export interface PercentileBand {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}

export interface EquityBand {
  annualizedUSD: PercentileBand;
  vestingYears: number;
  type: EquityType;
}

export interface CompCell {
  confidence: Confidence;
  base: PercentileBand;
  bonus: PercentileBand | null;
  equity: EquityBand | null;
}

export type TierData = Record<Level, CompCell>;

export type ArchetypeCompData = Record<Tier, TierData>;

export type CompByTierData = Record<string, ArchetypeCompData>;
