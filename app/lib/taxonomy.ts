import dimensionsData from "@/data/dimensions.json";
import archetypesData from "@/data/archetypes.json";
import questionsData from "@/data/questions.json";
import dimensionCorrelationsData from "@/data/dimension-correlations.json";

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
  /**
   * The archetype's defining dimension(s): the highest-weight trait(s) in its
   * profile — what actually makes it what it is. Usually one dimension; an array
   * because several archetypes tie multiple dimensions at the maximum weight
   * (e.g. Forward Deployed Engineer ties three at weight 1.0). Drives the Step 2.5
   * defining-trait floor in scoring.ts. See taxonomy/scoring.md Step 2.5.
   */
  defining_dimension: string[];
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

/**
 * A pair of dimensions whose `target` vectors across the 17 archetypes are
 * meaningfully correlated (|Pearson r| > 0.7), computed by
 * scripts/compute-dimension-correlations.js. `direction` is "positive" (the two
 * traits co-occur — both high or both low across archetypes) or "negative" (they
 * trade off). Consumed by scoring.ts's Step 2.7 co-occurrence adjustment. See
 * taxonomy/scoring.md Step 2.7 and taxonomy/dimension-correlations.json.
 */
export interface DimensionCorrelationPair {
  a: string;
  b: string;
  r: number;
  direction: "positive" | "negative";
}

export const dimensions: Dimension[] = dimensionsData.dimensions as Dimension[];
export const archetypes: Archetype[] = archetypesData.archetypes as Archetype[];
export const questions: Question[] = questionsData.questions as Question[];
export const stackIntakeFields: StackIntakeField[] =
  questionsData.stackIntake.fields as StackIntakeField[];
export const correlatedDimensionPairs: DimensionCorrelationPair[] =
  dimensionCorrelationsData.correlated_pairs as DimensionCorrelationPair[];

export const dimensionById = new Map(dimensions.map((d) => [d.id, d]));
export const archetypeById = new Map(archetypes.map((a) => [a.id, a]));

export const SECTIONS = [
  { id: "stack", label: "Stack" },
  { id: "work_style", label: "Work style" },
  { id: "people", label: "People & client comfort" },
  { id: "incentives", label: "Incentives & motivation" },
] as const;
