import { Badge } from "./Badge";
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

  const mixParts = comp?.mix
    ? [
        comp.mix.basePct > 0 ? `${comp.mix.basePct}% base` : null,
        comp.mix.bonusPct > 0 ? `${comp.mix.bonusPct}% bonus` : null,
        comp.mix.equityPct > 0 ? `${comp.mix.equityPct}% equity` : null,
      ].filter((part): part is string => part !== null)
    : [];
  const mixTotal = comp?.mix
    ? comp.mix.basePct + comp.mix.bonusPct + comp.mix.equityPct
    : 0;

  return (
    <div className="flex flex-col gap-3">
      {comp && (
        <Badge variant={comp.confidence === "high" ? "confidence-high" : "confidence-medium"}>
          comp data: {comp.confidence} confidence
        </Badge>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
        {comp && (
          <StatTile
            label="Typical comp"
            value={formatK(comp.typical)}
            sub={`${formatK(comp.low)} – ${formatK(comp.high)} range`}
          />
        )}
        {comp && comp.mix && mixTotal > 0 && (
          <StatTile label="Comp mix" value={mixParts.join(" / ")} />
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
    </div>
  );
}
