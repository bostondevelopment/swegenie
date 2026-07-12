import type { CompCell, Level, Tier } from './comp.types';
import { formatUSD, guaranteedComp, isStartupTier } from './comp.utils';

interface EquityTwoLaneProps {
  tier: Tier;
  level: Level;
  data: CompCell;
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
export function EquityTwoLane({ tier, level, data }: EquityTwoLaneProps) {
  const guaranteed = guaranteedComp(data);
  const equity = data.equity.annualizedUSD;
  const startup = isStartupTier(tier);

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
        {/* Scenario callout slot — populated by Agent D for startup tiers. */}
        {startup && <div data-equity-callout="true" />}
      </div>
    </div>
  );
}
