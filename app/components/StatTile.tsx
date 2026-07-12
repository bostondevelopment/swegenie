interface StatTileProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatTile({ label, value, sub }: StatTileProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
      <div className="font-mono uppercase tracking-wide text-[10px] text-[var(--color-muted-2)]">
        {label}
      </div>
      <div className="text-2xl font-bold text-[var(--color-fg)]">{value}</div>
      {sub && (
        <p className="text-xs text-[var(--color-muted-2)] mt-1">{sub}</p>
      )}
    </div>
  );
}
