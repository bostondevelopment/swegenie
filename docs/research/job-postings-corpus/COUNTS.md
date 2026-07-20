# Job posting corpus — final counts

Generated: 2026-07-11. Regenerated 2026-07-18: the prior version of this table was built from
`by-archetype/*.jsonl`, which predates the company+title+location dedup key described in
`WAVE_DESIGN.md` and so double- and triple-counted reposted listings (one Nike "Lead Technical
Product Manager, ITC" posting alone appeared 3 times) — every archetype's count below is lower
for that reason alone, not a rubric change; `classify.py --reclassify-all` is idempotent against
the current rubric. Separately, a real gap-fill harvest (AHEAD / `thinkahead`, verified live via
the public Lever API, 120 postings) was added to close consulting-engineer-professional-services'
post-dedup shortfall against the ≥200 floor.

- **745 verified companies** (real HTTP requests to Greenhouse/Lever/Ashby/Workday public APIs)
- **68076 raw job postings** harvested (all departments, deduped by URL)
- **65397 unique postings classified** after deduping reposts by company+title+location

## Per-archetype classified counts

| Archetype | Count | Meets ≥200 floor? |
|---|---|---|
| product-full-stack-software-engineer | 5824 | ✓ |
| engineering-management | 792 | ✓ |
| ml-engineer | 725 | ✓ |
| security-engineer | 574 | ✓ |
| data-engineer | 495 | ✓ |
| forward-deployed-engineer | 413 | ✓ |
| platform-infrastructure-engineer | 402 | ✓ |
| sales-engineer-pre-sales | 372 | ✓ |
| customer-support-engineer | 305 | ✓ |
| sre-production-engineer | 303 | ✓ |
| consulting-engineer-professional-services | 230 | ✓ |
| mobile-engineer | 202 | ✓ |
| customer-support-solutions-engineer | 192 | ✗ |
| embedded-iot-engineer | 140 | ✗ |
| solutions-architect-consulting | 103 | ✗ |
| developer-relations-advocacy | 85 | ✗ |
| technical-product-manager | 61 | ✗ |
| solutions-architect-vendor-side | 56 | ✗ |

## Non-archetype buckets (for transparency)

| Bucket | Count | Meaning |
|---|---|---|
| UNCLASSIFIED | 47060 | No archetype pattern matched (mostly non-engineering roles: sales, finance, retail, HR, legal, hardware-assembly technicians at companies whose full job board was harvested) |
| EXCLUDED | 6609 | Matched an explicit non-archetype exclusion (QA/test, non-software engineering disciplines, research/applied scientist, HR/finance/marketing/retail) |
| AMBIGUOUS | 453 | Bare title with a documented multi-archetype collision (e.g. 'Solutions Engineer', 'Systems Engineer') that title text alone can't resolve |
| MISSING_TITLE | 1 | Posting had no title text to classify |

**Archetypes meeting the ≥200 floor (12):** consulting-engineer-professional-services, customer-support-engineer, data-engineer, engineering-management, forward-deployed-engineer, ml-engineer, mobile-engineer, platform-infrastructure-engineer, product-full-stack-software-engineer, sales-engineer-pre-sales, security-engineer, sre-production-engineer

**Archetypes below the ≥200 floor (6), despite three gap-fill rounds (~640 companies searched, 15 sourcing agents):** customer-support-solutions-engineer, developer-relations-advocacy, embedded-iot-engineer, solutions-architect-consulting, solutions-architect-vendor-side, technical-product-manager
