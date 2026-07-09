import dimensionsData from "@/data/dimensions.json";
import archetypesData from "@/data/archetypes.json";
import questionsData from "@/data/questions.json";

export type DimensionCategory = "skill" | "preference";

export interface Dimension {
  id: string;
  name: string;
  category: DimensionCategory;
  definition: string;
  anchors: { "1": string; "3": string; "5": string };
  source_clusters: string[];
}

export interface ArchetypeScore {
  target: number;
  weight: number;
  rationale: string;
}

export interface Archetype {
  id: string;
  name: string;
  confidence: "high" | "medium";
  overall_notes?: string;
  scores: Record<string, ArchetypeScore>;
}

export type QuestionFormat = "scenario_choice" | "slider" | "behavioral_anchor";

export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  dimension: string;
  section: "stack" | "work_style" | "people" | "incentives";
  format: QuestionFormat;
  prompt: string;
  options?: QuestionOption[];
  scale?: { min: number; max: number; minLabel: string; maxLabel: string };
}

export interface StackIntakeField {
  id: string;
  label: string;
  type: "number" | "multi_select_with_other" | "multi_select" | "free_text";
  min?: number;
  max?: number;
  options?: string[];
  optional?: boolean;
}

export const dimensions: Dimension[] = dimensionsData.dimensions as Dimension[];
export const archetypes: Archetype[] = archetypesData.archetypes as Archetype[];
export const questions: Question[] = questionsData.questions as Question[];
export const stackIntakeFields: StackIntakeField[] =
  questionsData.stackIntake.fields as StackIntakeField[];

export const dimensionById = new Map(dimensions.map((d) => [d.id, d]));
export const archetypeById = new Map(archetypes.map((a) => [a.id, a]));

export const SECTIONS = [
  { id: "stack", label: "Stack" },
  { id: "work_style", label: "Work style" },
  { id: "people", label: "People & client comfort" },
  { id: "incentives", label: "Incentives & motivation" },
] as const;
