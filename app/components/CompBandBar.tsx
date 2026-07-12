const DEFAULT_MAX = 400000;

interface CompBandBarProps {
  low: number;
  high: number;
  typical: number;
  max?: number;
  size?: "sm" | "md";
}

export function CompBandBar({ low, high, typical, max = DEFAULT_MAX, size = "md" }: CompBandBarProps) {
  const height = size === "sm" ? "h-1.5" : "h-2";
  const overflow = high > max;
  const cappedHigh = Math.min(high, max);
  const left = (low / max) * 100;
  const width = ((cappedHigh - low) / max) * 100;
  const typicalLeft = (Math.min(typical, max) / max) * 100;
  const collapse = (high - low) / max < 0.12;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {collapse ? (
          <span
            className="absolute -top-4 text-xs font-mono text-[var(--color-fg)] -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${left + width / 2}%` }}
          >
            {`$${(low / 1000).toFixed(0)}k–$${(high / 1000).toFixed(0)}k`}
          </span>
        ) : (
          <>
            <span
              className="absolute -top-4 text-xs font-mono text-[var(--color-fg)] -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${left}%` }}
            >
              {`$${(low / 1000).toFixed(0)}k`}
            </span>
            <span
              className="absolute -top-4 text-xs font-mono text-[var(--color-fg)] -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${left + width}%` }}
            >
              {`$${(high / 1000).toFixed(0)}k`}
            </span>
          </>
        )}
        <div className={`relative w-full ${height} rounded-full bg-[var(--color-border)] overflow-hidden`}>
          <div
            className="absolute top-0 bottom-0 rounded-full bg-[var(--color-accent)]/25"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-[var(--color-accent)]"
            style={{ left: `${typicalLeft}%` }}
          />
        </div>
        {overflow && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-0.5 text-[var(--color-muted-2)] text-xs">
            ›
          </span>
        )}
      </div>
      <div className="flex justify-between text-xs font-mono tabular-nums text-[var(--color-muted)]">
        <span>$0</span>
        <span>{`$${(max / 1000).toFixed(0)}K${overflow ? "+" : ""}`}</span>
      </div>
    </div>
  );
}
