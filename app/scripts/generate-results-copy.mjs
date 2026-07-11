#!/usr/bin/env node
// Regenerates data/results-copy.json from the markdown source files in
// content/results-copy/*.md. Run this (npm run results-copy:generate)
// whenever those markdown files change — the app reads only the generated
// JSON at runtime (see lib/results-copy.ts), not the markdown directly,
// since a client component can't bundle Node's `fs` module for static
// export (see the commit that introduced this script for the full story).
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "results-copy");
const OUT_PATH = path.join(process.cwd(), "data", "results-copy.json");

const SECTION_KEYS = {
  "What this role actually is": "whatThisIs",
  "Why you matched": "whyMatchedTemplate",
  "A day in this role": "aDayInThisRole",
  "Comp structure": "compStructure",
  "Growth areas — if this wasn't a perfect fit": "growthAreasTemplate",
  "How to test this cheaply": "howToTestCheaply",
};

function parseSections(markdown) {
  const lines = markdown.split("\n");
  const sections = {};
  let current = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      const key = SECTION_KEYS[heading[1].trim()];
      current = key ?? null;
      if (current && !sections[current]) sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
  }

  const result = {};
  for (const key of Object.values(SECTION_KEYS)) {
    result[key] = (sections[key] ?? []).join("\n").trim();
  }
  return result;
}

const out = {};
for (const file of fs.readdirSync(CONTENT_DIR)) {
  if (!file.endsWith(".md")) continue;
  const id = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  out[id] = parseSections(raw);
}

fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${OUT_PATH} (${Object.keys(out).length} archetypes).`);
