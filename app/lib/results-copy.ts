import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "results-copy");

export interface ResultsCopy {
  whatThisIs: string;
  whyMatchedTemplate: string;
  aDayInThisRole: string;
  compStructure: string;
  growthAreasTemplate: string;
  howToTestCheaply: string;
}

const SECTION_KEYS: Record<string, keyof ResultsCopy> = {
  "What this role actually is": "whatThisIs",
  "Why you matched": "whyMatchedTemplate",
  "A day in this role": "aDayInThisRole",
  "Comp structure": "compStructure",
  "Growth areas — if this wasn't a perfect fit": "growthAreasTemplate",
  "How to test this cheaply": "howToTestCheaply",
};

function parseSections(markdown: string): ResultsCopy {
  const lines = markdown.split("\n");
  const sections: Partial<Record<keyof ResultsCopy, string[]>> = {};
  let current: keyof ResultsCopy | null = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      const key = SECTION_KEYS[heading[1].trim()];
      current = key ?? null;
      if (current && !sections[current]) sections[current] = [];
      continue;
    }
    if (current) sections[current]!.push(line);
  }

  const result = {} as ResultsCopy;
  for (const key of Object.values(SECTION_KEYS)) {
    result[key] = (sections[key] ?? []).join("\n").trim();
  }
  return result;
}

const cache = new Map<string, ResultsCopy>();

export function getResultsCopy(archetypeId: string): ResultsCopy {
  const cached = cache.get(archetypeId);
  if (cached) return cached;
  const filePath = path.join(CONTENT_DIR, `${archetypeId}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = parseSections(raw);
  cache.set(archetypeId, parsed);
  return parsed;
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
