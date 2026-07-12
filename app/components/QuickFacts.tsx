import { StatTile } from "./StatTile";

interface QuickFactsProps {
  comp: {
    low: number;
    high: number;
    typical: number;
    confidence: "high" | "medium";
    mix: { basePct: number; bonusPct: number; equityPct: number } | null;
    sourceCompanyCount: number;
  } | null;
  definingDimensions: { name: string; weight: number; target: number }[];
}

function formatK(dollars: number): string {
  return `$${Math.round(dollars / 1000)}K`;
}

export function QuickFacts({ comp, definingDimensions }: QuickFactsProps) {
  const topDimension = definingDimensions[0];
  const tiedCount = definingDimensions.length - 1;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {comp && (
        <StatTile
          label="Typical comp"
          value={formatK(comp.typical)}
          sub={`${formatK(comp.low)} – ${formatK(comp.high)} range`}
        />
      )}
      {comp && (
        <StatTile
          label="Evidence"
          value={`${comp.sourceCompanyCount} cos.`}
          sub="postings sampled"
        />
      )}
      <StatTile
        label="Defining trait"
        value={topDimension.name}
        sub={`target ${topDimension.target}/5${tiedCount > 0 ? ` · +${tiedCount} tied` : ""}`}
      />
    </div>
  );
}
