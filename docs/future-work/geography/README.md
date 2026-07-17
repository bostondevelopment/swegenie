# Geography / market-specific comp — research only, no plan yet

## Idea

Right now the app's comp data varies by **archetype × company tier × level**
(`app/data/comp-by-tier.json`: 18 archetypes × 5 tiers × 4 levels). It does not vary by
**where the person is** — a ZIP code, city, or metro area. The idea under research: let a user
enter a location and adjust the pay/benefits figures we show to reflect that market, while still
accounting for remote roles where location may matter less (or not at all).

This folder is the research stage only, per the user's request (2026-07-17). No schema, no
scoring changes, no UI — just: what does the market do here, what data do we actually have, and
what would we need. See [research.md](research.md) for the findings.

## Headline findings (detail in research.md)

- We have **zero geography in the structured comp data** (`comp-by-tier.json`,
  `comp-structure.json`, `company-tiers.json`) — the "tier" dimension is about company
  stage/prestige (ai-labs, faang-mag7, high-growth-public, growth-stage-private, early-stage), not
  location.
- We are **not** starting from nothing on raw signal: the job-postings-corpus extraction files
  (`docs/research/job-postings-corpus/comp-extraction/*.json`) already carry a `location` string
  per data point, pulled straight from each ATS API. It's messy and largely unnormalized (city
  names, "3 Locations", "Remote - US", "US - Remote", "United States") and never rolled up into
  anything.
- The bigger problem isn't presence of a location string — it's that a lot of postings quote **one
  salary range across multiple locations** (common under CA/CO/NY/WA pay-transparency laws), so
  even where we have a location string, the number attached to it usually isn't location-resolved.
- The existing tier×level grid is already thin in 32/360 cells (see
  [thin-comp-cells-early-stage](../thin-comp-cells-early-stage/README.md)) for lack of anchors —
  adding a geography axis multiplies the grid and would make sparsity meaningfully worse without a
  different data strategy (e.g., leaning on public COLA/BLS indices rather than trying to source
  empirical per-metro comp from our own corpus).

## Do not

Don't scope an implementation plan from this folder yet — the user explicitly asked for research
only. Don't fabricate metro-level precision the corpus doesn't support (same bar as
[thin-comp-cells-early-stage](../thin-comp-cells-early-stage/README.md)).
