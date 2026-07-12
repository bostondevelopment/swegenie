interface QuickFactsProps {
  comp: {
    low: number;
    high: number;
    typical: number;
    confidence: "high" | "medium";
    mix: { basePct: number; bonusPct: number; equityPct: number } | null;
    sourceCompanyCount: number;
  } | null;
}

function formatK(dollars: number): string {
  return `$${Math.round(dollars / 1000)}K`;
}

export function QuickFacts({ comp }: QuickFactsProps) {
  if (!comp) return null;

  return (
    <div>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl font-bold text-[var(--color-fg)]">{formatK(comp.typical)}</span>
        <span className="font-mono uppercase tracking-wide text-[11px] text-[var(--color-muted-2)]">
          typical comp
        </span>
      </div>
      <p className="text-sm text-[var(--color-muted-2)] mt-1.5">
        {formatK(comp.low)} – {formatK(comp.high)} range, based on real compensation data from{" "}
        {comp.sourceCompanyCount} companies.
      </p>
    </div>
  );
}
