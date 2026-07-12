import type { CompByTierData, CompCell, Level, Tier } from './comp.types';
import { formatUSD, guaranteedComp, isStartupTier } from './comp.utils';
import { calcRequiredExit, type EquityCalloutInput } from '@/lib/equityCalc';
import rawCompData from '@/data/comp-by-tier.json';
import { EquityCallout } from './EquityCallout';

interface EquityTwoLaneProps {
  tier: Tier;
  level: Level;
  data: CompCell;
  /**
   * Archetype key, used to pull the same-archetype FAANG RSU comparator for the
   * equity callout. Optional: when absent, the callout falls back to the
   * cross-archetype average FAANG value for the level.
   */
  archetypeId?: string;
}

// The JSON carries metadata fields alongside `archetypes`; the archetype map
// itself conforms to CompByTierData. Cast once here so the lookups stay typed.
const ARCHETYPES = (rawCompData as unknown as { archetypes: CompByTierData }).archetypes;

// Representative startup grant midpoints (from the research). comp-by-tier.json
// stores equity as annualized paper value, not grant% + valuation, so the
// callout reconstructs a plausible grant from these tier-level defaults.
const STARTUP_GRANT_DEFAULTS: Partial<Record<Tier, { grantPct: number; currentValuation: number }>> = {
  'growth-stage-private': { grantPct: 0.0005, currentValuation: 500_000_000 },
  'early-stage': { grantPct: 0.002, currentValuation: 50_000_000 },
};

const DILUTION_ASSUMPTION = 0.25;

// Annualized FAANG (Mag7) RSU value at the given level, as the comparator the
// startup equity is measured against. Prefers the specific archetype; falls back
// to the cross-archetype average when the archetype is unknown.
function faangComparator(archetypeId: string | undefined, level: Level): number {
  if (archetypeId) {
    const cell = ARCHETYPES[archetypeId]?.['faang-mag7']?.[level];
    if (cell) return cell.equity.annualizedUSD.p50;
  }
  const values = Object.values(ARCHETYPES)
    .map((a) => a['faang-mag7']?.[level]?.equity.annualizedUSD.p50)
    .filter((v): v is number => typeof v === 'number');
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

const EQUITY_TYPE_LABELS: Record<CompCell['equity']['type'], string> = {
  rsu: 'RSU',
  options: 'options',
  'profit-interest': 'profit interest',
};

// Two stacked lanes contrasting the certain money against the equity upside:
//   Lane 1 — Base + Bonus, solid accent fill (the guaranteed floor).
//   Lane 2 — Annualized equity, gradient fill. Public/RSU tiers get a tight
//            70%->20% fade; startup tiers get a wide 60%->0% fade-to-transparent
//            (signalling illiquidity) plus a callout slot for scenario copy.
// Both lanes share a scale so their P50 widths are directly comparable.
export function EquityTwoLane({ tier, level, data, archetypeId }: EquityTwoLaneProps) {
  const guaranteed = guaranteedComp(data);
  const equity = data.equity.annualizedUSD;
  const startup = isStartupTier(tier);

  // Startup tiers get a scenario callout: reconstruct a representative grant for
  // the tier and compare its exit-value math against the FAANG RSU comparator.
  const startupDefaults = STARTUP_GRANT_DEFAULTS[tier];
  const comparator = startup ? faangComparator(archetypeId, level) : 0;
  const calloutInput: EquityCalloutInput | null =
    startup && startupDefaults
      ? {
          grantPct: startupDefaults.grantPct,
          currentValuation: startupDefaults.currentValuation,
          dilutionAssumption: DILUTION_ASSUMPTION,
          vestingYears: data.equity.vestingYears,
          faangRSUComparator: comparator,
          faangLevel: level,
        }
      : null;
  const calloutOutput = calloutInput ? calcRequiredExit(calloutInput) : null;

  // Shared scale = the larger of the two lanes' medians, so the bigger lane
  // fills the track and the other reads proportionally against it.
  const scaleMax = Math.max(guaranteed.p50, equity.p50, 1);
  const guaranteedWidth = (guaranteed.p50 / scaleMax) * 100;
  const equityWidth = (equity.p50 / scaleMax) * 100;

  const equityGradient = startup
    ? 'linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 60%, transparent), transparent)'
    : 'linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 70%, transparent), color-mix(in oklab, var(--color-accent) 20%, transparent))';

  return (
    <div className="flex flex-col gap-4">
      {/* Lane 1 — guaranteed */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] text-[var(--color-muted)]">Guaranteed (Base + Bonus)</span>
          <span className="font-mono text-[13px] tabular-nums text-[var(--color-fg)]">
            {formatUSD(guaranteed.p50)}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)]/80"
            style={{ width: `${guaranteedWidth}%` }}
          />
        </div>
      </div>

      {/* Lane 2 — equity */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] text-[var(--color-muted)]">
            Equity (annualized, at vest)
            {startup && (
              <span className="text-[var(--color-muted-2)]"> (illiquid — see scenarios below)</span>
            )}
          </span>
          <span className="font-mono text-[13px] tabular-nums text-[var(--color-fg)]">
            {formatUSD(equity.p50)}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div className="h-full rounded-full" style={{ width: `${equityWidth}%`, background: equityGradient }} />
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-muted-2)]">
          <span>{data.equity.vestingYears}-yr vest</span>
          <span aria-hidden>·</span>
          <span>{EQUITY_TYPE_LABELS[data.equity.type]}</span>
          <span aria-hidden>·</span>
          <span>{level}</span>
        </div>
        {/* Scenario callout slot — startup tiers only; RSU tiers render nothing. */}
        {startup && calloutOutput && calloutInput && (
          <div data-equity-callout="true">
            <EquityCallout
              output={calloutOutput}
              faangRSUComparator={calloutInput.faangRSUComparator}
              dilutionAssumption={calloutInput.dilutionAssumption}
            />
          </div>
        )}
      </div>
    </div>
  );
}
