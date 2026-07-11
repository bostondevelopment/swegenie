import resultsCopyData from "@/data/results-copy.json";

export interface ResultsCopy {
  whatThisIs: string;
  whyMatchedTemplate: string;
  aDayInThisRole: string;
  compStructure: string;
  growthAreasTemplate: string;
  howToTestCheaply: string;
}

// Precomputed at build time from content/results-copy/*.md by
// scripts/generate-results-copy.mjs (npm run results-copy:generate) — not
// read from disk at runtime, so this module is safe to import from a
// Client Component (needed by ResultsClient.tsx) as well as a Server
// Component; Node's `fs` module can't be bundled for the browser, which is
// what the old fs.readFileSync-per-request version couldn't do here.
const data = resultsCopyData as Record<string, ResultsCopy>;

export function getResultsCopy(archetypeId: string): ResultsCopy {
  const copy = data[archetypeId];
  if (!copy) throw new Error(`No results copy for archetype id: ${archetypeId}`);
  return copy;
}

/** Fills {{top_dimension_1}}, {{top_dimension_2}}, {{top_dimension_3}} in a why-matched template. */
export function fillWhyMatched(template: string, dimensionNames: string[]): string {
  let filled = template;
  dimensionNames.slice(0, 3).forEach((name, i) => {
    filled = filled.replaceAll(`{{top_dimension_${i + 1}}}`, name);
  });
  return stripMarkdownBold(filled);
}

/** Fills {{growth_dimension}} in a growth-areas template. */
export function fillGrowthArea(template: string, dimensionName: string): string {
  return stripMarkdownBold(template.replaceAll("{{growth_dimension}}", dimensionName));
}

/**
 * The source markdown's filled-in illustrative examples use **bold** around
 * dimension names for readability in raw markdown; the app renders this copy
 * as plain text (no markdown renderer wired up for v1), so strip the
 * asterisks rather than show them literally.
 */
function stripMarkdownBold(text: string): string {
  return text.replaceAll("**", "");
}
