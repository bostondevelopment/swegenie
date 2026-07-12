import type { CompCell, Tier } from './comp.types';
import { TIER_LABELS, formatUSD, totalComp } from './comp.utils';

interface CompRangeBarProps {
  tier: Tier;
  data: CompCell;
  /**
   * Tri-state highlight. `undefined` — no tier is selected, render at full
   * strength. `true` — this is the selected tier. `false` — another tier is
   * selected, so dim this one to 0.3 opacity.
   */
  highlight?: boolean;
  /** Chart-wide max (largest P90 across all tiers) for a shared x-axis. */
  maxValue: number;
  /**
   * Overrides the row label. Defaults to the tier's display name — but views
   * that stack one-tier-per-row (e.g. the Staff cross-role table) pass the
   * archetype name here so the tier isn't repeated on every bar.
   */
  label?: string;
}

// Percent position of a dollar value along the shared 0..maxValue axis.
function pct(value: number, maxValue: number): number {
  if (maxValue <= 0) return 0;
  return Math.max(0, Math.min(100, (value / maxValue) * 100));
}

// A single tier's total-comp range: a thin P10–P90 track, a thick P25–P75
// interquartile bar, and a bright P50 median tick, all on a shared x-axis.
// Renders without overflow down to 320px (the label/value header wraps above a
// full-width track, so the bar never competes with text for horizontal space).
export function CompRangeBar({ tier, data, highlight, maxValue, label }: CompRangeBarProps) {
  const total = totalComp(data);
  const dimmed = highlight === false;
  const limitedData = data.confidence === 'low';

  const p10 = pct(total.p10, maxValue);
  const p25 = pct(total.p25, maxValue);
  const p50 = pct(total.p50, maxValue);
  const p75 = pct(total.p75, maxValue);
  const p90 = pct(total.p90, maxValue);

  return (
    <div
      className="flex flex-col gap-2 transition-opacity duration-200"
      style={{ opacity: dimmed ? 0.3 : 1 }}
      aria-hidden={dimmed}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate text-[13px] font-medium text-[var(--color-fg)]">
            {label ?? TIER_LABELS[tier]}
          </span>
          {limitedData && (
            <span className="shrink-0 rounded-full border border-[var(--color-signal-warn)]/40 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[var(--color-signal-warn)]">
              limited data
            </span>
          )}
        </div>
        <span className="shrink-0 font-mono text-[13px] tabular-nums text-[var(--color-fg)]">
          {formatUSD(total.p50)}
        </span>
      </div>

      {/* Track region. Height leaves room for the 12px median tick. */}
      <div className="relative h-3 w-full">
        {/* P10–P90 thin track (2px) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-[var(--color-accent)]/25"
          style={{ left: `${p10}%`, width: `${p90 - p10}%` }}
        />
        {/* P25–P75 thick interquartile bar (8px) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-[var(--color-accent)]/45"
          style={{ left: `${p25}%`, width: `${p75 - p25}%` }}
        />
        {/* Density hint: a subtle center-weighted gradient over the IQR bar,
            revealed only at >=480px so narrow screens stay flat and legible. */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full opacity-0 min-[480px]:opacity-100"
          style={{
            left: `${p25}%`,
            width: `${p75 - p25}%`,
            background:
              'linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 25%, transparent), color-mix(in oklab, var(--color-accent) 55%, transparent), color-mix(in oklab, var(--color-accent) 25%, transparent))',
          }}
        />
        {/* P50 median tick */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-0.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)]"
          style={{ left: `${p50}%` }}
        />
      </div>
    </div>
  );
}
