interface LevelBand {
  level: string;
  low: number;
  high: number;
  typical?: number;
}

interface CompProgressionChartProps {
  levels: LevelBand[] | null;
  max?: number;
  confidence?: 'low' | 'medium' | 'high';
}

export function CompProgressionChart({ levels, max = 400000, confidence }: CompProgressionChartProps) {
  if (!levels || levels.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      {levels.map((lvl, i) => {
        const low = Math.min(lvl.low, max);
        const high = Math.min(lvl.high, max);
        const overflow = lvl.high > max;
        const opacity = 0.45 + (i / Math.max(levels.length - 1, 1)) * 0.55;

        return (
          <div key={`${lvl.level}-${i}`} className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[var(--color-muted)]">{lvl.level}</span>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-[var(--color-accent)]"
                  style={{
                    left: `${(low / max) * 100}%`,
                    width: `${((high - low) / max) * 100}%`,
                    opacity,
                  }}
                />
                {lvl.typical !== undefined && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-[var(--color-accent)]"
                    style={{ left: `${(Math.min(lvl.typical, max) / max) * 100}%` }}
                  />
                )}
                {overflow && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-0.5 text-[var(--color-muted-2)] text-xs">
                    ›
                  </span>
                )}
              </div>
              <span className="w-24 shrink-0 text-right font-mono text-xs tabular-nums text-[var(--color-fg)]">
                ${Math.round(lvl.high / 1000)}k
              </span>
            </div>
          </div>
        );
      })}
      <div className="flex items-center gap-3 mt-1">
        <div className="flex-1 flex justify-between text-xs font-mono text-[var(--color-muted-2)]">
          <span>$0</span>
          <span>${max / 1000}K</span>
        </div>
        <span className="w-24 shrink-0" aria-hidden="true" />
      </div>
      {confidence === 'low' && (
        <span className="self-start rounded-full border border-[var(--color-signal-warn)]/40 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[var(--color-signal-warn)]">
          limited data
        </span>
      )}
    </div>
  );
}
