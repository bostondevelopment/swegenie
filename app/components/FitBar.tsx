export function FitBar({ percent, size = "md" }: { percent: number; size?: "sm" | "md" }) {
  const height = size === "sm" ? "h-1.5" : "h-2";
  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 ${height} rounded-full bg-[var(--color-border)] overflow-hidden`}>
        <div
          className="h-full rounded-full bg-[var(--color-accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="font-mono text-sm tabular-nums w-12 text-right text-[var(--color-fg)]">{percent}%</span>
    </div>
  );
}
