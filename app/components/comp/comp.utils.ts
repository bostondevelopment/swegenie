// Runtime helpers + display constants shared across the comp-viz components.
// Kept out of comp.types.ts so that file stays pure type declarations.

import type { CompCell, Level, PercentileBand, Tier } from './comp.types';

// Render order, top (highest-comp) to bottom, used by every stacked chart.
export const TIER_ORDER: readonly Tier[] = [
  'ai-labs',
  'faang-mag7',
  'high-growth-public',
  'growth-stage-private',
  'early-stage',
] as const;

export const TIER_LABELS: Record<Tier, string> = {
  'ai-labs': 'AI labs',
  'faang-mag7': 'FAANG / Mag7',
  'high-growth-public': 'High-growth public',
  'growth-stage-private': 'Growth-stage private',
  'early-stage': 'Early-stage',
};

export const LEVELS: readonly Level[] = ['L1', 'L2', 'L3', 'L4', 'L5', 'Staff', 'Principal'] as const;

export const LEVEL_YOE_LABELS: Record<Level, string> = {
  L1: '0–1 yr',
  L2: '1–3 yrs',
  L3: '3–6 yrs',
  L4: '6–10 yrs',
  L5: '10–14 yrs',
  Staff: '14–20 yrs',
  Principal: '20+ yrs',
};

// Startup tiers carry illiquid equity and get the wide, fade-to-transparent
// equity gradient plus a scenario callout slot.
export const STARTUP_TIERS: readonly Tier[] = ['growth-stage-private', 'early-stage'] as const;

export function isStartupTier(tier: Tier): boolean {
  return STARTUP_TIERS.includes(tier);
}

// Percentile-wise sum of any number of bands. Total comp = base + bonus +
// annualized equity, summed at each percentile independently. This is a rough
// upper bound on the true joint distribution (it assumes rank correlation across
// components) but it is the standard way comp ranges are presented.
export function sumBands(...bands: PercentileBand[]): PercentileBand {
  return bands.reduce<PercentileBand>(
    (acc, b) => ({
      p10: acc.p10 + b.p10,
      p25: acc.p25 + b.p25,
      p50: acc.p50 + b.p50,
      p75: acc.p75 + b.p75,
      p90: acc.p90 + b.p90,
    }),
    { p10: 0, p25: 0, p50: 0, p75: 0, p90: 0 },
  );
}

const ZERO_BAND: PercentileBand = { p10: 0, p25: 0, p50: 0, p75: 0, p90: 0 };

// Total-compensation band for a single cell.
export function totalComp(cell: CompCell): PercentileBand {
  return sumBands(cell.base, cell.bonus ?? ZERO_BAND, cell.equity?.annualizedUSD ?? ZERO_BAND);
}

// Guaranteed (base + bonus) band — the "certain" money.
export function guaranteedComp(cell: CompCell): PercentileBand {
  return sumBands(cell.base, cell.bonus ?? ZERO_BAND);
}

// `$230k`, `$1.2M`. Compact, matches the existing font-mono comp labels.
export function formatUSD(n: number): string {
  if (n >= 1_000_000) {
    const millions = n / 1_000_000;
    // Drop a trailing .0 so $2.0M reads as $2M.
    return `$${millions.toFixed(1).replace(/\.0$/, '')}M`;
  }
  return `$${Math.round(n / 1000)}k`;
}
