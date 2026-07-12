interface StatTileProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatTile({ label, value, sub }: StatTileProps) {
  return (
    <div className="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 min-h-[104px]">
      <div className="font-mono uppercase tracking-wide text-[10px] text-[var(--color-muted-2)]">
        {label}
      </div>
      <div className="text-lg font-semibold leading-snug text-[var(--color-fg)] break-words mt-1">
        {value}
      </div>
      {sub && (
        <p className="text-xs text-[var(--color-muted-2)] mt-auto pt-1">{sub}</p>
      )}
    </div>
  );
}
