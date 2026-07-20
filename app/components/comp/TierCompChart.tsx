'use client';

import { useMemo, useRef, useState } from 'react';
import type { ArchetypeCompData, Level, Tier } from './comp.types';
import { LEVEL_TITLE_LABELS, LEVEL_YOE_LABELS, LEVELS, TIER_LABELS, TIER_ORDER, formatUSD, totalComp } from './comp.utils';
import { CompRangeBar } from './CompRangeBar';

interface TierCompChartProps {
  archetypeId: string;
  data: ArchetypeCompData;
  defaultLevel?: Level;
  /** Overrides `defaultLevel` once the assessment has inferred the user's level. */
  userLevel?: Level;
}

// Five stacked total-comp range bars (one per tier) with a level selector and a
// tier-focus filter. Pure SVG/CSS — no external charting library.
export function TierCompChart({ archetypeId, data, defaultLevel, userLevel }: TierCompChartProps) {
  const [level, setLevel] = useState<Level>(userLevel ?? defaultLevel ?? 'L3');
  const [focusedTier, setFocusedTier] = useState<Tier | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Shared x-axis: the largest P90 across all tiers at the selected level, so
  // every bar reads against the same scale. Recomputed whenever the level flips.
  const maxValue = useMemo(() => {
    return TIER_ORDER.reduce((max, tier) => {
      const p90 = totalComp(data[tier][level]).p90;
      return p90 > max ? p90 : max;
    }, 0);
  }, [data, level]);

  // Roving-tabindex arrow-key navigation for the level tablist.
  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (index + dir + LEVELS.length) % LEVELS.length;
    setLevel(LEVELS[next]);
    tabRefs.current[next]?.focus();
  }

  const gridStops = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col gap-6">
      {/* Level selector */}
      <div
        role="tablist"
        aria-label="Career level"
        className="flex gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 self-start"
      >
        {LEVELS.map((lvl, i) => {
          const selected = lvl === level;
          return (
            <button
              key={lvl}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setLevel(lvl)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                selected
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
              }`}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>{LEVEL_TITLE_LABELS[lvl]}</span>
                <span className="text-[10px] font-normal opacity-70">{lvl !== LEVEL_TITLE_LABELS[lvl] ? `${lvl} · ` : ''}{LEVEL_YOE_LABELS[lvl]}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Tier focus chips */}
      <div className="flex flex-wrap gap-2">
        {TIER_ORDER.map((tier) => {
          const active = focusedTier === tier;
          return (
            <button
              key={tier}
              type="button"
              aria-pressed={active}
              onClick={() => setFocusedTier(active ? null : tier)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-mono transition-colors ${
                active
                  ? 'border-[var(--color-accent)] text-[var(--color-fg)]'
                  : 'border-[var(--color-border)] text-[var(--color-muted-2)] hover:text-[var(--color-muted)]'
              }`}
            >
              {TIER_LABELS[tier]}
            </button>
          );
        })}
      </div>

      {/* Bars + shared gridlines. Gridlines and axis labels appear at >=768px. */}
      <div className="relative flex flex-col gap-5">
        {/* Vertical gridlines behind the bars (md+ only) */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
          {gridStops.map((stop) => (
            <div
              key={stop}
              className="absolute top-0 bottom-0 w-px bg-[var(--color-border)]"
              style={{ left: `${stop * 100}%` }}
            />
          ))}
        </div>

        {TIER_ORDER.map((tier) => (
          <CompRangeBar
            key={tier}
            tier={tier}
            data={data[tier][level]}
            maxValue={maxValue}
            highlight={focusedTier === null ? undefined : focusedTier === tier}
          />
        ))}
      </div>

      {/* Shared x-axis dollar labels at the gridlines (md+ only) */}
      <div className="relative hidden h-4 md:block" aria-hidden>
        {gridStops.map((stop) => (
          <span
            key={stop}
            className="absolute font-mono text-[11px] tabular-nums text-[var(--color-muted-2)]"
            style={{
              left: `${stop * 100}%`,
              transform:
                stop === 0 ? 'none' : stop === 1 ? 'translateX(-100%)' : 'translateX(-50%)',
            }}
          >
            {formatUSD(maxValue * stop)}
          </span>
        ))}
      </div>

      <p className="font-mono text-[11px] text-[var(--color-muted-2)]">
        {archetypeId} · total comp (base + bonus + annualized equity) · P25–P75 band, P50 median
      </p>
    </div>
  );
}
