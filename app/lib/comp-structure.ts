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
  confidence: "high" | "medium";
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
