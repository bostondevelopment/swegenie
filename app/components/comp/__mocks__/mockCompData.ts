// Realistic mock comp data for the `swe-generalist` archetype across all five
// tiers and four levels. Figures approximate 2024–2025 US total-comp benchmarks
// (levels.fyi-style) so the components can be developed and integration-tested
// before Agent A's real JSON lands. Agent C swaps this out for the real feed.
//
// All numbers are illustrative, not sourced comp guidance.

import type {
  ArchetypeCompData,
  CompByTierData,
  CompCell,
  Confidence,
  EquityType,
  Level,
  PercentileBand,
  Tier,
} from '../comp.types';

// Build a 5-point band around a median with a symmetric fractional spread,
// rounded to the nearest $1k. spread=0.2 => p10 at -20%, p90 at +20%.
function band(mid: number, spread: number): PercentileBand {
  const round = (v: number) => Math.round(v / 1000) * 1000;
  return {
    p10: round(mid * (1 - spread)),
    p25: round(mid * (1 - spread / 2)),
    p50: round(mid),
    p75: round(mid * (1 + spread / 2)),
    p90: round(mid * (1 + spread)),
  };
}

interface CellSpec {
  base: number;
  bonus: number;
  equity: number;
  type: EquityType;
  vestingYears: number;
  confidence: Confidence;
}

function cell(spec: CellSpec): CompCell {
  return {
    confidence: spec.confidence,
    base: band(spec.base, 0.14),
    bonus: band(spec.bonus, 0.4),
    equity: {
      annualizedUSD: band(spec.equity, 0.5),
      vestingYears: spec.vestingYears,
      type: spec.type,
    },
  };
}

// Median (base, bonus, annualized-equity) by tier and level, in USD.
const SPECS: Record<Tier, Record<Level, CellSpec>> = {
  'ai-labs': {
    L1: { base: 160000, bonus: 15000, equity: 60000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L2: { base: 175000, bonus: 20000, equity: 90000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L3: { base: 185000, bonus: 28000, equity: 120000, type: 'rsu', vestingYears: 4, confidence: 'medium' },
    L4: { base: 220000, bonus: 40000, equity: 220000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    L5: { base: 250000, bonus: 50000, equity: 400000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    Staff: { base: 285000, bonus: 65000, equity: 650000, type: 'rsu', vestingYears: 4, confidence: 'medium' },
    Principal: { base: 370000, bonus: 90000, equity: 1200000, type: 'rsu', vestingYears: 4, confidence: 'low' },
  },
  'faang-mag7': {
    L1: { base: 130000, bonus: 14000, equity: 40000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L2: { base: 148000, bonus: 19000, equity: 60000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L3: { base: 165000, bonus: 24000, equity: 80000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    L4: { base: 195000, bonus: 33000, equity: 140000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    L5: { base: 230000, bonus: 46000, equity: 260000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    Staff: { base: 265000, bonus: 60000, equity: 450000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    Principal: { base: 330000, bonus: 80000, equity: 800000, type: 'rsu', vestingYears: 4, confidence: 'low' },
  },
  'high-growth-public': {
    L1: { base: 120000, bonus: 8000, equity: 25000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L2: { base: 138000, bonus: 12000, equity: 40000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L3: { base: 155000, bonus: 16000, equity: 55000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    L4: { base: 180000, bonus: 22000, equity: 95000, type: 'rsu', vestingYears: 4, confidence: 'high' },
    L5: { base: 210000, bonus: 32000, equity: 160000, type: 'rsu', vestingYears: 4, confidence: 'medium' },
    Staff: { base: 245000, bonus: 45000, equity: 280000, type: 'rsu', vestingYears: 4, confidence: 'medium' },
    Principal: { base: 290000, bonus: 58000, equity: 420000, type: 'rsu', vestingYears: 4, confidence: 'low' },
  },
  'growth-stage-private': {
    L1: { base: 110000, bonus: 4000, equity: 20000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L2: { base: 128000, bonus: 6000, equity: 32000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    L3: { base: 145000, bonus: 9000, equity: 45000, type: 'rsu', vestingYears: 4, confidence: 'medium' },
    L4: { base: 170000, bonus: 13000, equity: 80000, type: 'rsu', vestingYears: 4, confidence: 'medium' },
    L5: { base: 200000, bonus: 18000, equity: 140000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    Staff: { base: 235000, bonus: 28000, equity: 240000, type: 'rsu', vestingYears: 4, confidence: 'low' },
    Principal: { base: 270000, bonus: 38000, equity: 360000, type: 'rsu', vestingYears: 4, confidence: 'low' },
  },
  'early-stage': {
    L1: { base: 100000, bonus: 2000, equity: 15000, type: 'options', vestingYears: 4, confidence: 'low' },
    L2: { base: 118000, bonus: 3500, equity: 22000, type: 'options', vestingYears: 4, confidence: 'low' },
    L3: { base: 135000, bonus: 5000, equity: 30000, type: 'options', vestingYears: 4, confidence: 'low' },
    L4: { base: 160000, bonus: 8000, equity: 60000, type: 'options', vestingYears: 4, confidence: 'low' },
    L5: { base: 190000, bonus: 12000, equity: 110000, type: 'options', vestingYears: 4, confidence: 'low' },
    Staff: { base: 220000, bonus: 18000, equity: 180000, type: 'options', vestingYears: 4, confidence: 'low' },
    Principal: { base: 250000, bonus: 24000, equity: 280000, type: 'options', vestingYears: 4, confidence: 'low' },
  },
};

function buildArchetype(specs: Record<Tier, Record<Level, CellSpec>>): ArchetypeCompData {
  const tiers = Object.keys(specs) as Tier[];
  const levels: Level[] = ['L1', 'L2', 'L3', 'L4', 'L5', 'Staff', 'Principal'];
  return tiers.reduce((acc, tier) => {
    acc[tier] = levels.reduce(
      (byLevel, level) => {
        byLevel[level] = cell(specs[tier][level]);
        return byLevel;
      },
      {} as ArchetypeCompData[Tier],
    );
    return acc;
  }, {} as ArchetypeCompData);
}

export const mockSweGeneralistComp: ArchetypeCompData = buildArchetype(SPECS);

// Keyed by archetype id, mirroring the real `CompByTierData` shape so Agent C
// can point the integration at either source with an identical access pattern.
export const mockCompByTier: CompByTierData = {
  'swe-generalist': mockSweGeneralistComp,
};
