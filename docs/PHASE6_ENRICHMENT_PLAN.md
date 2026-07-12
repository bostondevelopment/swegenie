# Phase 6: Using the job-posting corpus to improve questions, results, and archetype content

**Status: ✅ ALL 5 PHASES COMPLETE (2026-07-12).** Executed end-to-end in one continuous run, no
human checkpoint between phases. Final verification gate passes (typecheck/lint/73 tests/build all
green). Full outcome, evidence, and human-decision items are in
`docs/research/job-postings-corpus/ENRICHMENT_REPORT.md` — read that first if you want the "what
happened" summary rather than this plan's "what to do" instructions. This document is preserved
as-executed for audit purposes; nothing further needs to run against it unless you're deliberately
starting a new enrichment pass.

Phase 0 turned out much bigger than originally scoped ("fetch a ~30-40 posting sample per
archetype") — every ATS in the corpus (Greenhouse, Lever, Ashby, Workday) exposes full description
text cheaply, so instead of a sample, **the entire classified corpus got enriched**: 67,875 of
67,956 raw postings (99.88%), and 11,784 of ~11,800 classified postings have full text. See §2 for
exact paths/sizes/stats — that section was rewritten mid-run to reflect this once it became clear,
and Phases 1-5 below reference the real data, not the original sample plan.

**Audience:** an agent with a fresh, small context window that has NOT seen the conversation that
produced this plan or the job-posting corpus. Everything needed is either in this document or in
the files it points to. Read this whole document before starting Phase 1 (Phase 0 is done, skip
straight to reading §2 for what it produced, then proceed to §3).

**Recommended model:** Sonnet for essentially everything in this plan (content synthesis, report
writing, mechanical scripting). This is not hard-reasoning/architecture work — it's high-volume,
well-specified content generation and data extraction. Do not default to a more expensive model.

---

## 0. Context you need before starting

### 0.1 What this product is

SWE Genie is a career-assessment site (Next.js, static export, deployed to GitHub Pages) that
asks a user ~40 questions and ranks 18 software-engineering-adjacent career archetypes (Product
Engineer, SRE, ML Engineer, Sales Engineer, Developer Relations, etc.) by fit, using a transparent
weighted-scoring model — no black-box ML. The whole product's credibility thesis is "show your
work, cite real sources, never overclaim." Every piece of user-facing copy should read like it
came from someone who actually researched the role, not marketing copy.

### 0.2 What was just built (the input to this plan)

A previous work session built a large, verified corpus of real job postings and committed it at
`docs/research/job-postings-corpus/`:

| File | Contents |
|---|---|
| `companies.json` | 744 companies, each verified by a real HTTP request to its public Greenhouse/Lever/Ashby/Workday job-board API. Fields: `name`, `ats`, `slug`, `api_url`, `live_job_count`, `sectors`, `source`. |
| `raw_postings.jsonl` | 67,956 raw postings, one JSON object per line: `{company, ats, slug, title, department, location, url, job_id}`. **Titles/metadata only — no full job description text.** This is the key gap this plan exists to close (see Phase 0). |
| `classified_postings.jsonl` | Same 67,956 rows, each with an added `archetype` field: one of the 18 archetype ids (see §0.3), or `UNCLASSIFIED` / `EXCLUDED` / `AMBIGUOUS` / `MISSING_TITLE`. |
| `classify.py` | The exact script that produces `classified_postings.jsonl` from `raw_postings.jsonl`, using the rubric below. Reproducible — re-running it from the repo root should produce byte-identical output. |
| `COUNTS.md`, `SUMMARY.json` | Per-archetype counts. Range: 6,208 postings/542 companies (Product/Full-Stack SWE) down to 57 postings/21 companies (Solutions Architect Vendor-side). 13 of 18 archetypes have 200+ classified postings; 5 have fewer (57–148) despite dedicated sourcing effort — this is a real, reported data-scarcity finding, not a bug. |

`taxonomy/title-classification-rubric.json` (repo root `taxonomy/`, not inside the corpus folder)
holds the keyword/regex classification rubric `classify.py` applies — 18 archetype entries with
`positive_patterns`/`negative_patterns`/`priority`, plus `known_ambiguous_titles` and
`always_exclude_patterns`. You generally won't need to touch this in Phase 6 — it's already been
precision-checked (9 real bugs found and fixed by hand-sampling). Only revisit it if you discover
a *clear* new bug while doing enrichment work below.

### 0.3 The 18 archetype ids (canonical, from `taxonomy/archetypes.json`)

```
product-full-stack-software-engineer   platform-infrastructure-engineer   sre-production-engineer
data-engineer                          ml-engineer                        mobile-engineer
embedded-iot-engineer                  security-engineer                  sales-engineer-pre-sales
solutions-architect-vendor-side        solutions-architect-consulting     forward-deployed-engineer
customer-support-engineer              customer-support-solutions-engineer
consulting-engineer-professional-services   developer-relations-advocacy
engineering-management                 technical-product-manager
```

### 0.4 Taxonomy / scoring file map (READ BEFORE TOUCHING ANY OF THESE)

- `taxonomy/dimensions.json` — **22 trait dimensions** (note: some UI copy on the site says "16
  dimensions" — that's a pre-existing drift in user-facing marketing copy unrelated to this plan;
  don't "fix" it as a side effect, it's out of scope). Each dimension: `id`, `name`, `category`
  (`skill`|`preference`), `definition`, `anchors` (`"1"`/`"3"`/`"5"` text), `source_clusters`.
- `taxonomy/archetypes.json` — 18 archetypes, each with `id`, `name`, `confidence`, and a `scores`
  object keyed by dimension id: `{target: 1-5, weight: 0-1, rationale: string}`. **This file has a
  byte-identical synced copy at `app/data/archetypes.json`.** Any edit to one MUST be mirrored to
  the other, then verify with:
  `diff <(python3 -c "import json;print(json.dumps(json.load(open('taxonomy/archetypes.json')),sort_keys=True))") <(python3 -c "import json;print(json.dumps(json.load(open('app/data/archetypes.json')),sort_keys=True))")`
  — must print nothing (files identical) before you move on.
- `taxonomy/questions.json` — **40 questions** (note: some UI copy says "44" — same pre-existing
  drift, out of scope) + `stackIntake` fields. Same synced-copy requirement applies to
  `app/data/questions.json` — diff-check after any edit.
- `taxonomy/dimensions.json` also has a synced copy at `app/data/dimensions.json` — same rule.
- `app/lib/scoring.ts`, `app/lib/assessment-flow.ts` — scoring/flow logic. Do not need to change
  for this plan unless Phase 3 finds a genuine dimension gap (rare, see Phase 3 guardrails).
- `app/content/results-copy/{archetype-id}.md` — 18 markdown files, one per archetype, hand-authored
  narrative copy. **This is the actual editable source** for results copy.
- `app/scripts/generate-results-copy.mjs` — compiles the 18 markdown files above into
  `app/data/results-copy.json` (the file the app actually reads at runtime — editing the `.md`
  files alone does nothing until you run the generator). Required section headings in each `.md`
  file (must match exactly, case-sensitive) and their compiled JSON keys:
  ```
  ## What this role actually is              -> whatThisIs
  ## Why you matched                         -> whyMatchedTemplate
  ## A day in this role                      -> aDayInThisRole
  ## Comp structure                          -> compStructure
  ## Growth areas — if this wasn't a perfect fit -> growthAreasTemplate
  ## How to test this cheaply                -> howToTestCheaply
  ```
  `whyMatchedTemplate` uses `{{top_dimension_1}}`/`{{top_dimension_2}}`/`{{top_dimension_3}}`
  placeholders; `growthAreasTemplate` uses `{{growth_dimension}}` — **preserve these placeholder
  tokens exactly** if you edit those two sections, the app's `lib/results-copy.ts` does a literal
  string-replace on them at render time.
  Run `npm run results-copy:generate` (from `app/`) after editing any `.md` file.
- `docs/research/roles/{archetype-id}.md` — 18 research briefs (deeper, more technical than the
  results-copy files; this is where the "Posting corpus scale" sourcing-count sections already
  live from the prior pass). Good source material to read, generally not what you edit in this
  plan (Phase 1/2 read from here, don't need to write back to it unless you find a genuine factual
  correction).
- Test suite: `app/lib/*.test.ts` (6 files — `assessment-flow`, `degenerate-personas`, `encode`,
  `personas`, `scoring`, `taxonomy-integrity`). **Must stay 100% green after every phase.** Run
  with `cd app && npm run test -- --run`.

---

## 1. Non-negotiable safety rails

These apply for the entire overnight run. No exceptions without very strong evidence.

1. **Never edit `taxonomy/dimensions.json`, `taxonomy/archetypes.json` (the `target`/`weight`
   fields specifically — `rationale` text and `confidence` are lower-risk), or the *scoring
   behavior* of `taxonomy/questions.json`** (dimension mapping, `format`, `options`/`scale` values)
   without: (a) strong, repeated evidence across many postings in the Phase 1 signal reports, (b)
   writing the proposed change into a report first, (c) applying it only if you're highly
   confident, and (d) running the FULL test suite immediately after and reverting on any change to
   a test's expected numeric output. Wording-only question-prompt edits (the human-readable
   `prompt` string, not `format`/`options`/`dimension`) are lower-risk — see Phase 3.
2. **Keep every synced JSON pair byte-identical** (`taxonomy/*.json` ⟷ `app/data/*.json` for
   `archetypes.json`, `questions.json`, `dimensions.json`). Diff-check after every write to either
   copy in a pair, per §0.4.
3. **After every phase that writes files, run the full verification gate:**
   ```
   cd app && npx tsc --noEmit && npx eslint . && npm run test -- --run && npm run build
   ```
   If any step fails, stop, diagnose, and fix (or revert that phase's change) before starting the
   next phase. Do not let a broken state cascade into later phases.
4. **Never fabricate a citation.** Every company/title/figure mentioned in generated copy must
   trace to an actual row in `classified_postings.jsonl` or a description fetched in Phase 0 — no
   inventing plausible-sounding examples.
5. **Respect copyright when synthesizing from job description text**: never reproduce a large
   verbatim block from any single posting. Read across the sample for an archetype and *synthesize
   patterns in your own words* — that's both the legally safe approach and the one that produces
   better, less repetitive copy anyway.
6. **Rate-limit Phase 0 fetches**: small delay (e.g. 0.3–0.5s) between requests to the same host,
   same pattern already used successfully in the corpus-building pass (see `classify.py`'s sibling
   harvest scripts referenced in `COUNTS.md` for the working pattern — Greenhouse/Lever/Ashby/
   Workday were all harvested this way already without issue).
7. **Prefer many small, reviewable diffs over one giant rewrite.** Edit `app/content/results-copy/
   {id}.md` files one archetype at a time (or via pipelined agents, one per archetype) rather than
   one mega-commit-equivalent change — makes the human's morning review tractable.
8. **No silent scope cuts.** If something can't be completed (e.g. a company's ATS blocks
   automated fetches, or an archetype has too few postings to say anything new), say so plainly in
   the Phase 5 report. Don't just skip it quietly.
9. **Checkpoint after every phase.** Write each phase's output to disk (paths specified below)
   *before* starting the next phase, so the run is resumable if interrupted — check whether a
   phase's output file already exists and looks complete before re-doing that phase from scratch.
10. **Do not run destructive git commands** (no `git reset --hard`, no force-push, no `--no-verify`).
    If you want to commit progress checkpoints along the way, that's fine and encouraged (small,
    well-described commits) — but never push, and never amend/rewrite history.

---

## 2. Phase 0 — Enrich the corpus with full job descriptions — ✅ COMPLETE (2026-07-12)

**What actually happened** (kept here for the record and because Phase 1 depends on the exact
output paths): all four ATS types turned out to expose full description text far more cheaply than
originally scoped — Greenhouse via `?content=true` on the *list* endpoint (one call per company,
not per job), Lever and Ashby already embed full description (plus, for Lever, a real `additional`/
`additionalPlain` field that frequently contains **actual stated salary ranges**) in the same list
call the original corpus-building pass already made, and only Workday genuinely required one GET
per posting (`https://{tenant}.wd{N}.myworkdayjobs.com/wday/cxs/{tenant}/{site}/job/{externalPath}`
→ `jobPostingInfo.jobDescription`, and this endpoint *also* frequently includes real stated salary
bands in the description text itself). Net result: instead of a ~30-40-per-archetype sample, **the
full classified corpus got enriched**.

**Final stats:**
- 67,875 of 67,956 raw postings (99.88%) have full description text.
- Of postings actually classified into one of the 18 archetypes, 11,784 have full text — see the
  exact per-archetype counts in the table below (compare to `COUNTS.md`'s classification counts —
  coverage is ~99-100% for every archetype).
- First-pass Workday fetch hit significant `429` rate-limiting (only 84% success); a gentler retry
  pass (2 concurrent per host instead of 5, exponential backoff on 429) recovered 98.5% of the
  failures, leaving only 53 permanently-unrecoverable postings out of 22,809 Workday postings —
  logged at `docs/research/job-postings-corpus/descriptions/final_unrecoverable_errors.json`.
- Greenhouse's `content` field is **double HTML-escaped** (literal `&lt;div&gt;` text, not real `<`
  characters) — a first-pass harvest missed this and produced garbage; fixed by running
  `html.unescape()` *before* stripping tags, not after. If you're touching any of this harvesting
  code again, don't lose that fix.

**Output — read from these, not from anything under `descriptions/`:**

`docs/research/job-postings-corpus/by-archetype/{archetype-id}.jsonl` — 18 files, one per
archetype, each line `{company, title, department, location, url, description_text}`. This is
**the file Phase 1 agents should read directly.** Sizes vary hugely — plan your Phase 1 read
strategy accordingly (see Phase 1 below for exact per-file sizes and sampling guidance):

| Archetype | Rows | File size |
|---|---|---|
| product-full-stack-software-engineer | 6,204 | 37M — **too large to read in full, sample it** |
| engineering-management | 803 | 5.2M |
| ml-engineer | 752 | 4.6M |
| security-engineer | 586 | 3.8M |
| data-engineer | 525 | 3.4M |
| forward-deployed-engineer | 424 | 2.8M |
| sales-engineer-pre-sales | 372 | 2.6M |
| platform-infrastructure-engineer | 414 | 2.5M |
| customer-support-engineer | 319 | 1.9M |
| sre-production-engineer | 316 | 2.0M |
| customer-support-solutions-engineer | 197 | 1.4M |
| consulting-engineer-professional-services | 202 | 1.3M |
| mobile-engineer | 212 | 1.2M |
| embedded-iot-engineer | 148 | 883K |
| solutions-architect-consulting | 103 | 752K |
| developer-relations-advocacy | 87 | 521K |
| technical-product-manager | 63 | 428K |
| solutions-architect-vendor-side | 57 | 351K |

Also present (secondary, not what Phase 1 reads): `docs/research/job-postings-corpus/
job_descriptions.jsonl.gz` — the full 67,875-row unsplit archive, gzip-compressed (64M compressed;
do not commit the uncompressed form, it's ~410M and was deleted after the by-archetype split was
verified — decompress with `gunzip -k` if you ever need the unsplit version for something the
by-archetype split doesn't cover, e.g. cross-referencing `UNCLASSIFIED` postings).

---

## 3. Phase 1 — Extract structured signal per archetype

**Why:** raw description text isn't directly usable for content generation. Need to distill it
into comparable, structured signal per archetype first.

**Mechanism:** use the `Workflow` tool. This is exactly the kind of fan-out it's designed for —
independent, per-archetype agents. All 18 in one `parallel()` call is fine (the tool caps
concurrent agents at `min(16, cpu_cores - 2)`, excess just queues).

**Each agent reads:**
- `docs/research/job-postings-corpus/by-archetype/{archetype-id}.jsonl` (Phase 0 output, §2) — for
  the 17 archetypes under ~5M (everything except `product-full-stack-software-engineer`), the agent
  can read the file directly in full. **For `product-full-stack-software-engineer` (37M, 6,204
  rows), do not read the whole file** — pre-sample it before handing to the agent: take a
  deterministic diverse subset (e.g. every 15th line ≈ 400 rows, or shell out to `shuf -n 400` /
  equivalent, then write that subset to a temp file for the agent to read instead). 300-500 rows is
  plenty of signal for this kind of qualitative synthesis; there's no benefit to an agent reading
  all 6,204.
- `docs/research/roles/{archetype-id}.md` (existing research brief)
- `app/content/results-copy/{archetype-id}.md` (existing user-facing copy)
- Its archetype's `scores` object from `taxonomy/archetypes.json` (target/weight/rationale per
  dimension)

**Each agent produces** (schema-enforced via `agent(..., {schema})`):

```js
const SIGNAL_SCHEMA = {
  type: 'object',
  properties: {
    archetype_id: { type: 'string' },
    postings_analyzed: { type: 'number' },
    top_requirements: {
      type: 'array',
      items: { type: 'object', properties: {
        requirement: { type: 'string' }, approx_frequency: { type: 'string' } // e.g. "8 of 30 postings"
      }, required: ['requirement', 'approx_frequency'] },
    },
    top_responsibilities: {
      type: 'array',
      items: { type: 'string' }, // synthesized/paraphrased patterns, NOT verbatim quotes
    },
    comp_signals: {
      type: 'array',
      items: { type: 'object', properties: {
        company: { type: 'string' }, range_text: { type: 'string' }, source_url: { type: 'string' }
      }, required: ['company', 'range_text', 'source_url'] },
      description: 'Only explicit salary/comp figures actually stated in a posting. Empty array if none found.',
    },
    seniority_distribution_notes: { type: 'string' },
    notable_divergence_from_existing_brief: { type: 'string', description: 'Specific claims in the research brief this new sample confirms or nuances. Empty string if nothing notable.' },
    dimension_evidence: {
      type: 'array',
      items: { type: 'object', properties: {
        dimension_id: { type: 'string' },
        current_target: { type: 'number' },
        current_weight: { type: 'number' },
        supports_current_scoring: { type: 'boolean' },
        note: { type: 'string' },
      }, required: ['dimension_id', 'current_target', 'current_weight', 'supports_current_scoring', 'note'] },
      description: 'One entry per dimension this archetype scores on. REPORT ONLY — do not propose or make scoring changes here.',
    },
    representative_companies_currently_hiring: {
      type: 'array',
      items: { type: 'object', properties: {
        company: { type: 'string' }, title: { type: 'string' }, url: { type: 'string' }
      }, required: ['company', 'title', 'url'] },
      description: '5-8 diverse real citations suitable for product copy.',
    },
  },
  required: ['archetype_id', 'postings_analyzed', 'top_requirements', 'top_responsibilities',
             'comp_signals', 'seniority_distribution_notes', 'notable_divergence_from_existing_brief',
             'dimension_evidence', 'representative_companies_currently_hiring'],
}
```

**Output:** `docs/research/job-postings-corpus/archetype-signal/{archetype-id}.json` (18 files).

**Verification:** after each agent completes, confirm `top_requirements` and `top_responsibilities`
are non-empty before accepting the result. If an archetype's Phase 0 sample was thin (very low
`postings_analyzed`), that's expected for the 5 low-count archetypes — note it, don't force
padding.

---

## 4. Phase 2 — Draft improved results-copy

**Why:** turn Phase 1's structured signal into actual improved user-facing copy.

**Mechanism:** `Workflow`, pipelined per archetype (each archetype's Phase 1 signal feeds its own
Phase 2 drafting agent — use `pipeline()` if running Phase 1+2 in the same script, or just read
Phase 1's already-written JSON files if running Phase 2 as a separate invocation after Phase 1
completes and was verified).

**Each agent reads:**
- `app/content/results-copy/{archetype-id}.md` (current version — READ §0.4 above first for the
  exact required section-heading format before touching this file)
- `docs/research/job-postings-corpus/archetype-signal/{archetype-id}.json` (Phase 1 output)
- `docs/research/roles/{archetype-id}.md` (research brief, for additional grounding)

**Each agent writes** an improved `app/content/results-copy/{archetype-id}.md`, in place (git
history is the safety net — don't create `*_new.md` side files), following these rules:

- Keep the exact 6 required `##` section headings, in the same order, verbatim (§0.4) — the
  compile script string-matches on them.
- Preserve `{{top_dimension_1}}`/`{{top_dimension_2}}`/`{{top_dimension_3}}` in "Why you matched"
  and `{{growth_dimension}}` in "Growth areas" exactly as tokens — do not remove or rename them.
- Ground "A day in this role" and "What this role actually is" in the *patterns* observed across
  `top_responsibilities`/`top_requirements` — synthesized into original prose, not stitched-
  together quotes from individual postings (see safety rail §1.5).
- Update "Comp structure" only where `comp_signals` has real data; if `comp_signals` is empty or
  thin, leave the existing comp text as-is rather than inventing precision the sample doesn't
  support. If updating, cite generically ("postings at companies like X and Y list $A–$B") rather
  than overclaiming a market-wide median from a small sample.
- "How to test this cheaply" and the *structure* of "Why you matched"/"Growth areas" (beyond
  filling in better example dimension names/phrasing) should change only if there's a clear,
  specific improvement — these are more tightly coupled to how the scoring UI actually renders
  them, so be conservative.
- Match the existing voice: direct, a little irreverent, allergic to corporate-speak and hedge-
  words, always concrete (specific numbers/examples over vague claims) — read 2-3 other archetypes'
  existing `.md` files first to calibrate tone before writing.

**Verification (mandatory, blocking, before Phase 3):**
1. After all 18 are drafted: `cd app && npm run results-copy:generate` to recompile
   `app/data/results-copy.json`. Must exit 0.
2. Full gate: `npx tsc --noEmit && npx eslint . && npm run test -- --run && npm run build`.
3. If anything fails, that's a hard stop for this phase — diagnose which archetype's `.md` broke
   the compile (usually a mismatched heading or an accidentally-deleted `{{placeholder}}`), fix it,
   re-run the gate. Do not proceed to Phase 3 with a broken build.

---

## 5. Phase 3 — Assessment question quality pass (report-first, conservative)

**Why:** real posting language can validate or challenge how the current 40 questions and 22
dimension anchors are worded, and reveal genuine coverage gaps.

**Mechanism:** ONE agent (not per-archetype — needs the whole question/dimension set in view at
once to reason about coverage across archetypes). This is a deep-reasoning task; if you want to
deviate from the "Sonnet for everything" default anywhere in this plan, this is the one phase
where a stronger model is defensible — but Sonnet should still be tried first.

**This agent reads:**
- `taxonomy/dimensions.json` (all 22 dimensions + anchors)
- `taxonomy/questions.json` (all 40 questions)
- All 18 files in `docs/research/job-postings-corpus/archetype-signal/` (Phase 1 output, aggregate
  view)

**Produces a REPORT** at `docs/research/job-postings-corpus/question-quality-report.md` — **do
NOT directly edit `taxonomy/questions.json` or `dimensions.json` in this step.** Report sections:

1. **Per-dimension anchor check** (22 entries): does the real posting language corroborate the
   current `1`/`3`/`5` anchor text, or suggest more concrete/current wording? Cite specific
   evidence (archetype + observed phrase pattern) for any suggested change.
2. **Per-question wording check**: any existing `prompt` text that feels stale or generic compared
   to how the corpus actually talks about that trait, with a suggested rewrite — **only propose a
   change to the human-readable `prompt` string itself, never to `format`, `options[].value`,
   `scale`, or `dimension`** (those are scoring-load-bearing).
3. **Coverage gap check**: any trait that real postings for a *specific* archetype clearly and
   repeatedly care about, with no current dimension capturing it. Flag only with strong, repeated
   cross-company evidence — this should be rare. If found, describe it but do NOT invent a new
   dimension or question yourself; that requires taxonomy-wide re-balancing this plan explicitly
   does not authorize unattended.
4. Classify every suggestion in this report as **LOW-RISK** (wording-only, no scoring-field touch)
   or **NEEDS-HUMAN-REVIEW** (anything touching dimension mapping, weights, targets, or adding
   new questions/dimensions).

**Conditional follow-up (only for LOW-RISK items):** if the report contains specific, low-risk,
wording-only `prompt` text improvements, a second pass may apply *only those* directly to
`taxonomy/questions.json` (and sync to `app/data/questions.json` — diff-check per §0.4). After
applying, run the full test suite: `cd app && npm run test -- --run`, paying special attention to
`taxonomy-integrity.test.ts`, `personas.test.ts`, `degenerate-personas.test.ts`,
`assessment-flow.test.ts`. **Every test's expected numeric output must be unchanged.** If any
expected value changes, that proves the edit wasn't actually wording-only — revert it immediately
and move it to the NEEDS-HUMAN-REVIEW list in the report instead.

Everything classified NEEDS-HUMAN-REVIEW stays as a written proposal only. Do not apply it.

---

## 6. Phase 4 — Archetype detail page: "Currently hiring" section

**Why:** low-risk, additive way to surface the corpus directly in the product, not just in
research docs.

**Decision point (your judgment):** if Phase 1's `representative_companies_currently_hiring`
data looks solid across most archetypes, implement this. If the corpus enrichment revealed the
sourcing is too thin/stale-feeling for a good chunk of archetypes, it's fine to skip this phase
and note why in the Phase 5 report — this phase is the most optional of the plan.

**If implementing:**
1. Write a small build-time data file, e.g. `app/data/archetype-citations.json`, generated by a
   short script that pulls `representative_companies_currently_hiring` from each
   `archetype-signal/{id}.json` (Phase 1 output) into a flat `{archetypeId: [{company, title, url}]}`
   map.
2. Add a new section to `app/app/archetypes/[id]/page.tsx` (read the existing file first — match
   its current structure/Tailwind conventions exactly, this is a dark-theme site using CSS custom
   properties like `var(--color-accent)`, `var(--color-muted)`, mono font for small metadata
   labels, card-style `border-[var(--color-border)]` blocks — do not introduce new colors or a
   different visual language). Something like "Companies hiring for this role" with 4-6
   company/title link chips.
3. **Be explicit about staleness in the copy itself**: this is a snapshot from a specific harvest
   date (2026-07-11), not a live feed. Say so plainly — e.g. a small mono-font caption "as of
   {date}, from a snapshot of public job boards" — consistent with this product's whole
   "don't oversell" ethos (see how the Methodology page already handles this same tension for the
   sourcing-count claims).
4. Handle thin data gracefully: some archetypes only have 21 unique companies total (Solutions
   Architect Vendor-side) — the section must not look broken or awkwardly empty for those; either
   show fewer chips or add a small note if the citation pool is small.

**Verification:** full gate (`tsc`/`eslint`/`test`/`build`), plus manually check (browser or by
reading rendered output) at least 3 archetype detail pages spanning both a high-count archetype
(e.g. `product-full-stack-software-engineer`) and a low-count one (e.g.
`solutions-architect-vendor-side`) to confirm the section renders sensibly at both ends of the
data-volume range.

---

## 7. Phase 5 — Final master report + full regression

**Always do this phase, regardless of how much of Phases 0-4 completed.**

Write `docs/research/job-postings-corpus/ENRICHMENT_REPORT.md` containing:

1. **Top-line status**: did the full gate (`tsc`/`eslint`/`test`/`build`) pass as of this report? —
   put this at the very top, not buried.
2. **What was changed**: file-by-file list, one line each (e.g. "app/content/results-copy/
   ml-engineer.md — rewrote 'A day in this role' and 'Comp structure' using 34 enriched postings").
3. **What was proposed but NOT applied**, and why (e.g. "question-quality-report.md flagged 3
   NEEDS-HUMAN-REVIEW items requiring dimension-mapping decisions — see that file §3").
4. **Corpus/enrichment stats**: how many postings got full descriptions in Phase 0 (and any
   failure-rate notes per ATS type), per-archetype `postings_analyzed` from Phase 1.
5. **Synced-file integrity check**: confirm (and show the diff-check command output) that
   `taxonomy/archetypes.json` ⟷ `app/data/archetypes.json`, and the `questions.json`/
   `dimensions.json` pairs, are still byte-identical.
6. **`git status --short` output**, appended verbatim, so the human can see the full diff surface
   at a glance.
7. **Explicit "human TODO" list**: anything genuinely requiring a judgment call this plan withheld
   from making autonomously (Phase 3's NEEDS-HUMAN-REVIEW items belong here, plus anything else
   you flagged along the way per safety rail §1.8).

Run the full gate one final time before writing this report so its top-line status is accurate at
the moment of writing, not stale from an earlier phase.

---

## 8. Execution order summary

```
Phase 0 (script, mechanical)  ──┐
                                 ├─► Phase 1 (Workflow, 18 agents, parallel-ish)
                                 │        │
                                 │        ▼
                                 │   Phase 2 (Workflow, 18 agents, per-archetype)
                                 │        │
                                 │        ▼ [BLOCKING gate: results-copy compile + full verification]
                                 │
                                 ├─► Phase 3 (single agent → report → conditional low-risk apply → full gate)
                                 │
                                 └─► Phase 4 (optional, code change → full gate + manual spot-check)

                                          Phase 5 (always — final report + final full gate)
```

Phases 1 and 3 can start as soon as Phase 0's output exists (they don't depend on each other).
Phase 2 depends on Phase 1 (needs its signal JSON). Phase 4 depends on Phase 1 (needs the
representative-companies data) but not on Phase 2 or 3. Phase 5 depends on everything else having
at least attempted to run (even if some phases were partially skipped per their own guardrails).

## 9. Definition of done

- ✅ Phase 0 produced `by-archetype/{id}.jsonl` for all 18 archetypes, real description text for
  99-100% of each archetype's classified postings (11,784 postings total, see §2's table).
- Phase 1 produced all 18 `archetype-signal/*.json` files, each with non-empty
  `top_requirements`/`top_responsibilities`.
- Phase 2 produced updated `app/content/results-copy/*.md` for as many archetypes as had usable
  Phase 1 signal, AND the results-copy compile + full verification gate passes.
- Phase 3 produced `question-quality-report.md`; any LOW-RISK wording edits applied still leave
  100% of tests passing with unchanged expected values.
- Phase 4 either implemented cleanly (full gate + manual spot-check passing) or was explicitly
  skipped with a documented reason.
- Phase 5's `ENRICHMENT_REPORT.md` exists, its top-line status reflects a genuinely final gate run,
  and every change made anywhere in the repo is accounted for in that report.
- The full verification gate (`tsc`/`eslint`/`test`/`build`) passes at the moment the run ends,
  full stop — this is the one requirement with zero flexibility.
