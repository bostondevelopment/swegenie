const DEFAULT_MAX = 400000;

interface ComparisonEntry {
  archetypeId: string;
  label: string;
  low: number;
  high: number;
  typical: number;
}

interface CompComparisonChartProps {
  current: ComparisonEntry;
  others: ComparisonEntry[];
  max?: number;
  showOthersTicks?: boolean;
}

export function CompComparisonChart({
  current,
  others,
  max = DEFAULT_MAX,
  showOthersTicks = false,
}: CompComparisonChartProps) {
  const rows = [current, ...others].sort((a, b) => b.typical - a.typical);

  return (
    <div className="flex flex-col gap-2">
      {rows.map((entry) => {
        const isCurrent = entry.archetypeId === current.archetypeId;
        const clampedHigh = Math.min(entry.high, max);
        const left = (entry.low / max) * 100;
        const width = Math.max(0, ((clampedHigh - entry.low) / max) * 100);
        const typicalLeft = (Math.min(entry.typical, max) / max) * 100;
        const overflow = entry.high > max;
        const showTick = isCurrent || showOthersTicks;

        return (
          <div
            key={entry.archetypeId}
            className={`flex items-center gap-3 py-1.5 px-2 -mx-2 rounded-md ${
              isCurrent ? "bg-[var(--color-surface)]" : ""
            }`}
          >
            <div
              className={`w-28 sm:w-36 shrink-0 truncate text-xs ${
                isCurrent
                  ? "text-[var(--color-fg)] font-medium"
                  : "text-[var(--color-muted)] font-normal"
              }`}
            >
              {entry.label}
            </div>
            <div className="relative flex-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
              <div
                className={`absolute top-0 bottom-0 rounded-full ${
                  isCurrent ? "bg-[var(--color-accent)]" : "bg-[var(--color-fg)]/20"
                }`}
                style={{ left: `${left}%`, width: `${width}%` }}
              />
              {showTick && (
                <div
                  className={`absolute top-0 w-0.5 h-full ${
                    isCurrent ? "bg-[var(--color-accent)]" : "bg-[var(--color-muted-2)]"
                  }`}
                  style={{ left: `${typicalLeft}%` }}
                />
              )}
              {overflow && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-0.5 text-[var(--color-muted-2)] text-xs">
                  ›
                </span>
              )}
            </div>
            <div
              className={`w-24 sm:w-28 shrink-0 text-right font-mono text-xs tabular-nums ${
                isCurrent ? "text-[var(--color-fg)]" : "text-[var(--color-muted)]"
              }`}
            >
              ${Math.round(entry.low / 1000)}k–${Math.round(entry.high / 1000)}k
            </div>
          </div>
        );
      })}
      <div className="flex justify-between text-xs font-mono text-[var(--color-muted-2)] mt-1 pl-[calc(theme(spacing.28)+theme(spacing.3))]">
        <span>$0</span>
        <span>${max / 1000}K</span>
      </div>
    </div>
  );
}
