#!/usr/bin/env node
// Enforces the banned-pattern list in COPY_RULES.md against user-facing
// strings. Run against changed files before shipping any copy change:
//   node scripts/lint-copy-rules.mjs <path> [<path> ...]
// Paths may be files or directories (directories are walked recursively,
// restricted to the extensions COPY_RULES.md scopes: .tsx, .md, .json).
// Exits non-zero on any match — same "zero matches, no exceptions" standard
// COPY_RULES.md itself states, just enforced instead of hoped for.
import fs from "node:fs";
import path from "node:path";

const SCOPED_EXTENSIONS = new Set([".tsx", ".md", ".json"]);

// One entry per COPY_RULES.md "Banned patterns" bullet. Keep this list in
// sync with that file — it's the source of truth, this is the enforcement.
const BANNED_PATTERNS = [
  // Versioning / product-history language
  /\bv1\b/i,
  /\bv1\.[0-9]/i,
  /since v1/i,
  /earlier version/i,
  /prior version/i,
  /prior pass/i,
  /\bpreviously\b/i,
  /used to be/i,
  /has grown since/i,
  /has evolved/i,
  /iterated on/i,
  /in an earlier/i,
  /\boriginally\b/i,
  /\blegacy\b/i,
  /we used to/i,
  /carried forward from/i,

  // Retraction / self-correction narration
  /was not supported by/i,
  /has been removed/i,
  /was removed/i,
  /earlier claim/i,
  /no longer accurate/i,
  /corrected from/i,
  /was wrong/i,
  /turned out to be/i,
  /in retrospect/i,
  /we found that/i,
  /on reflection/i,
  /was inaccurate/i,
  /\bmistakenly\b/i,
  /\berroneously\b/i,

  // Before/after diff narration
  /dropped from .* to/i,
  /rose from .* to/i,
  /improved from .* to/i,
  /now rests on/i,
  /no longer resting on/i,
  /newly-added/i,
  /newly added/i,
  /unchanged from/i,
  /\d+%\s*(to|->|→)\s*\d+%/,
  /\d+\s*(->|→)\s*\d+/,

  // Internal QA / bug-fix / process narration
  /targeted fix/i,
  /root cause/i,
  /mis-bucketed/i,
  /regex matched/i,
  /extraction error/i,
  /manually reclassified/i,
  /is unreliable for this archetype/i,
  /weight raised/i,
  /weight lowered/i,
  /weight is deliberately (raised|lowered)/i,

  // Fetch / verification-process exposure
  /\b[1-5]\d{2}\b(?=.*\b(status|error|response|http)\b)/i,
  /\bHTTP\s*[1-5]\d{2}\b/i,
  /\bre-?fetch\b/i,
  /\bredirect(ed|s)?\b/i,
  /cached search/i,
  /search-result snippet/i,
  /could not be (independently )?verif/i,
  /confirmed live at/i,
  /direct fetch/i,

  // Internal artifacts leaking into copy
  /real user/i,
  /bug report/i,
  /regression test/i,
  /synthetic persona/i,
  /persona validation/i,
  /Phase \d/i,
  /docs\/research\//i,
  /taxonomy\//i,

  // Search-effort narration
  /targeted search/i,
  /turned up only/i,
  /despite (targeted|repeated)/i,
  /found no additional/i,
  /\d+\+?\s*(targeted )?queries/i,

  // Future/roadmap language outside the designated roadmap section
  // (heuristic only — these are legitimate inside a "What's next" /
  // roadmap section, so they're reported as warnings, not hard failures;
  // see WARN_ONLY_PATTERNS below)
];

const WARN_ONLY_PATTERNS = [
  /\bnot yet\b/i,
  /is now live/i,
  /will be published/i,
  /a future pass/i,
  /should revisit/i,
  /future version/i,
];

function walk(target) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    return fs
      .readdirSync(target)
      .filter((entry) => entry !== "node_modules" && !entry.startsWith("."))
      .flatMap((entry) => walk(path.join(target, entry)));
  }
  if (SCOPED_EXTENSIONS.has(path.extname(target))) return [target];
  return [];
}

function lintFile(file) {
  const text = fs.readFileSync(file, "utf-8");
  const lines = text.split("\n");
  const findings = [];
  lines.forEach((line, i) => {
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(line)) {
        findings.push({ file, line: i + 1, pattern: pattern.source, text: line.trim(), level: "FAIL" });
      }
    }
    for (const pattern of WARN_ONLY_PATTERNS) {
      if (pattern.test(line)) {
        findings.push({ file, line: i + 1, pattern: pattern.source, text: line.trim(), level: "WARN (ok only inside a roadmap/what's-next section)" });
      }
    }
  });
  return findings;
}

function main() {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error("Usage: node scripts/lint-copy-rules.mjs <path> [<path> ...]");
    process.exit(2);
  }

  const files = targets.flatMap((t) => walk(path.resolve(t)));
  const allFindings = files.flatMap(lintFile);

  const failures = allFindings.filter((f) => f.level === "FAIL");
  const warnings = allFindings.filter((f) => f.level !== "FAIL");

  for (const f of allFindings) {
    console.log(`${f.level} ${f.file}:${f.line}  [${f.pattern}]\n  ${f.text}`);
  }

  console.log(`\n${failures.length} banned-pattern match(es), ${warnings.length} warning(s) across ${files.length} file(s) scanned.`);

  if (failures.length > 0) {
    console.log("\nSee COPY_RULES.md — rewrite to state the current fact, no process/history narration.");
    process.exit(1);
  }
}

main();
