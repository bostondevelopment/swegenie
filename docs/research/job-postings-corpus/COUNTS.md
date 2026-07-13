# Job posting corpus — final counts

Generated: 2026-07-11

- **744 verified companies** (real HTTP requests to Greenhouse/Lever/Ashby/Workday public APIs)
- **67956 raw job postings** harvested (all departments, deduped by URL)

## Per-archetype classified counts

| Archetype | Count | Meets ≥200 floor? |
|---|---|---|
| product-full-stack-software-engineer | 6208 | ✓ |
| engineering-management | 804 | ✓ |
| ml-engineer | 755 | ✓ |
| security-engineer | 586 | ✓ |
| data-engineer | 525 | ✓ |
| forward-deployed-engineer | 424 | ✓ |
| platform-infrastructure-engineer | 416 | ✓ |
| sales-engineer-pre-sales | 372 | ✓ |
| customer-support-engineer | 319 | ✓ |
| sre-production-engineer | 316 | ✓ |
| mobile-engineer | 213 | ✓ |
| consulting-engineer-professional-services | 202 | ✓ |
| customer-support-solutions-engineer | 197 | ✗ |
| embedded-iot-engineer | 148 | ✗ |
| solutions-architect-consulting | 103 | ✗ |
| developer-relations-advocacy | 87 | ✗ |
| technical-product-manager | 63 | ✗ |
| solutions-architect-vendor-side | 57 | ✗ |

## Non-archetype buckets (for transparency)

| Bucket | Count | Meaning |
|---|---|---|
| UNCLASSIFIED | 48876 | No archetype pattern matched (mostly non-engineering roles: sales, finance, retail, HR, legal, hardware-assembly technicians at companies whose full job board was harvested) |
| EXCLUDED | 6819 | Matched an explicit non-archetype exclusion (QA/test, non-software engineering disciplines, research/applied scientist, HR/finance/marketing/retail) |
| AMBIGUOUS | 465 | Bare title with a documented multi-archetype collision (e.g. 'Solutions Engineer', 'Systems Engineer') that title text alone can't resolve |

**Archetypes meeting the ≥200 floor (12):** consulting-engineer-professional-services, customer-support-engineer, data-engineer, engineering-management, forward-deployed-engineer, ml-engineer, mobile-engineer, platform-infrastructure-engineer, product-full-stack-software-engineer, sales-engineer-pre-sales, security-engineer, sre-production-engineer

**Archetypes below the ≥200 floor (6), despite three gap-fill rounds (~640 companies searched, 15 sourcing agents):** customer-support-solutions-engineer, developer-relations-advocacy, embedded-iot-engineer, solutions-architect-consulting, solutions-architect-vendor-side, technical-product-manager
