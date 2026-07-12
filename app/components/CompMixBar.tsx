interface CompMix {
  basePct: number;
  bonusPct: number;
  equityPct: number;
  note?: string;
}

interface CompMixBarProps {
  mix: CompMix | null;
}

export function CompMixBar({ mix }: CompMixBarProps) {
  if (!mix) return null;

  const { basePct, bonusPct, equityPct, note } = mix;

  if (basePct + bonusPct + equityPct === 0) return null;

  const segments = [
    { key: "base", label: "Base", pct: basePct, color: "bg-[var(--color-accent)]" },
    { key: "bonus", label: "Bonus", pct: bonusPct, color: "bg-[var(--color-signal-warn)]" },
    { key: "equity", label: "Equity", pct: equityPct, color: "bg-[var(--color-signal-good)]" },
  ].filter((s) => s.pct > 0);

  return (
    <div className="flex flex-col">
      <div className="flex w-full h-2 rounded-full overflow-hidden bg-[var(--color-border)]">
        {segments.map((s, i) => (
          <div
            key={s.key}
            className={`flex-shrink-0 ${s.color} ${i < segments.length - 1 ? "border-r-2 border-[var(--color-bg)]" : ""}`}
            style={{ flexBasis: `${s.pct}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-1.5">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs">
            <span className={`w-2 h-2 rounded-full ${s.color}`} />
            <span className="text-[var(--color-muted)]">{s.label}</span>
            <span className="font-mono tabular-nums text-[var(--color-fg)]">{s.pct}%</span>
          </div>
        ))}
      </div>
      {note && (
        <p className="text-xs text-[var(--color-muted-2)] leading-relaxed mt-1">{note}</p>
      )}
    </div>
  );
}
