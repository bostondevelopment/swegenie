import compStructureData from "@/data/comp-structure.json";

export interface CompMix {
  basePct: number;
  bonusPct: number;
  equityPct: number;
  note?: string;
  sourceCompanyCount?: number;
}

export interface CompLevelBand {
  label: string;
  low: number;
  high: number;
  companies: string[];
}

export interface CompStructure {
  archetypeId: string;
  low: number;
  high: number;
  typical: number;
  sourceCompanyCount: number;
  confidence: "high" | "medium" | "low";
  mix: CompMix | null;
  levels: CompLevelBand[] | null;
  caveat?: string;
}

const data = compStructureData as CompStructure[];

const compStructureById = new Map(data.map((c) => [c.archetypeId, c]));

export function getCompStructure(archetypeId: string): CompStructure | undefined {
  return compStructureById.get(archetypeId);
}

export function getAllCompStructures(): CompStructure[] {
  return data;
}

// comp-structure.json's level bands are labeled by the title-classification pipeline's internal
// bucket names (e.g. "Mid (unspecified level)") -- readable in research output, not in product
// copy. Map to display labels wherever a CompLevelBand's label reaches the UI.
const LEVEL_DISPLAY_LABELS: Record<string, string> = {
  "Entry (New Grad)": "New Grad",
  "Junior/Associate": "Junior",
  "Mid (unspecified level)": "Mid-Level",
  "Senior/Staff": "Senior",
  "Principal/Director+ (Manager/VP)": "Principal+",
};

export function levelDisplayLabel(label: string): string {
  return LEVEL_DISPLAY_LABELS[label] ?? label;
}
