# Job postings corpus — pipeline

Wave 1 (harvested 2026-07): 744 companies, 67,956 postings, via Greenhouse/Lever/Ashby/Workday
public ATS APIs only (no scraped HTML, no Indeed/LinkedIn/VC-board sources). See `COUNTS.md` for
per-archetype counts and `ENRICHMENT_REPORT.md` for the harvest narrative and bugs hit along the way.

## Stages

1. **Harvest** — pull postings from each company's public ATS API, dedupe by URL.
   Output: `raw_postings.jsonl`, `companies.json`. *(not committed — regenerate by re-running the
   harvest; see ENRICHMENT_REPORT.md for the company list and ATS-detection approach used in wave 1)*
2. **Classify** — `python3 classify.py` (run from repo root) labels each posting into one of the
   18 archetypes in `../../../taxonomy/title-classification-rubric.json`.
   Output: `classified_postings.jsonl`, `COUNTS.md`. *(classified_postings.jsonl not committed —
   regenerate from raw_postings.jsonl)*
3. **Extract** — `app/scripts/extract-comp-signals.py` and `extract-comp-signals-by-tier.py` pull
   structured comp signal (ranges, tier/level buckets) out of the classified corpus.
   Output: `comp-extraction/`, `comp-extraction-by-tier/` (tracked — small, high-value).
4. **Synthesize** — human/AI review of `archetype-signal/*.json` (per-archetype dimension evidence,
   requirement/responsibility frequency, divergence notes vs. the existing brief) against
   `../../../taxonomy/dimensions.json` and `questions.json`. Produces a report like
   `question-quality-report.md` — a punch list of wording fixes and coverage gaps, each flagged
   LOW-RISK (apply directly) or NEEDS-HUMAN-REVIEW (a product decision, not a bug).

`app/scripts/workflows/` holds two Claude Code agent-workflow scripts used for company-tier
classification and comp-by-tier gap-filling — narrower, one-off passes over the corpus rather than
core pipeline stages.

## What's committed vs. regenerated

Tracked: this README, `COUNTS.md`, `ENRICHMENT_REPORT.md`, `question-quality-report.md`,
`SUMMARY.json`, `classify.py`, `companies.json`, `bigtech-companies.json`, `harvest_errors.json`,
`workday_harvest_errors.json`, `descriptions/`, `comp-extraction/`, `comp-extraction-by-tier/`,
`archetype-signal/`.

Not tracked (large, regenerable): `raw_postings.jsonl`, `classified_postings.jsonl`,
`job_descriptions.jsonl.gz`, `by-archetype/`. If wave 1's raw data needs to survive a local disk
loss, back it up outside git (external drive / cloud bucket) — don't force it into the repo.

## Known fixes from wave 1 (carry forward to wave 2)

- Greenhouse's `content` field came back double-HTML-escaped on the first harvest pass — decode
  HTML entities twice, or verify with a spot-check before trusting a fresh harvest.
- Workday rate-limits aggressively (HTTP 429); budget for a retry pass (wave 1 went 84.4% → 98.5%
  success on retry).
- `taxonomy/questions.json` and `app/data/questions.json` (and `dimensions.json`) are duplicated,
  not symlinked/generated — a wave-2 taxonomy edit must be applied to both, or they drift.
- 6 of 18 archetypes fell short of the 200-posting floor in wave 1 (embedded-iot-engineer,
  solutions-architect-consulting, solutions-architect-vendor-side, developer-relations-advocacy,
  technical-product-manager, customer-support-solutions-engineer) — prioritize these for gap-fill
  or a wider company list in wave 2 rather than re-harvesting everything.
