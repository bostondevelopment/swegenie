# Geography-adjusted comp — research findings (2026-07-17)

Scope: research only. No implementation plan, no schema changes. Written to be picked up cold.

## 1. The concept, restated

Today a user answers the assessment, lands on an archetype, and sees pay/benefit figures cut by
**company tier** (ai-labs / faang-mag7 / high-growth-public / growth-stage-private / early-stage)
and **level** (L3–Staff). The idea is to add a third axis: **the user's location** (ZIP, city, or
metro), so the figures reflect that specific market instead of a national blend. Complication the
user flagged themselves: a meaningful share of roles in our corpus are remote, where location may
matter less or not at all — geography can't be a simple multiply-everything-by-a-city-factor
model, it has to account for remote-pay policy as its own variable.

## 2. How the market actually handles this (industry context)

Three broad models exist among comp-data providers and employers, worth knowing before designing
anything:

1. **Full geographic differentials (Radford, Mercer, Willis Towers Watson, traditional
   enterprise comp).** Comp is set per metro/MSA using a geo index against a national baseline
   (e.g., "SF Bay Area = 1.18x national base"). This requires large, continuously-refreshed
   survey panels — it's the most rigorous model and also the most data-hungry.
2. **Coarse location tiers (the "hub bands" model — Meta, Google, and most large remote-friendly
   employers use a 3–4 tier version of this).** Companies bucket metros into a small number of
   bands (e.g., "Tier 1: SF/NYC/Seattle", "Tier 2: other major metros", "Tier 3: rest of US") and
   apply a flat discount per band (commonly 0–15% below Tier 1, occasionally more). This is far
   less data-intensive and is the dominant public model for remote-first companies (GitLab and
   Buffer both publish their formulas; GitLab's is the most-cited public example: a base rate ×
   a per-location factor derived from a blend of a compensation-benchmarking index and
   cost-of-labor data, not raw cost-of-living).
3. **Cost-of-living index passthrough (simplest, least accurate).** Apply a public COLA index
   (e.g., a CPI-derived regional index) directly to pay. This is what most consumer-facing
   "salary calculator" tools do (Bankrate, NerdWallet-style calculators, some COLA widgets) because
   it needs no proprietary comp panel — just a public index — but it's a weaker signal because
   cost-of-living and cost-of-*labor* (what employers actually pay in a market) diverge, sometimes
   substantially, especially in tech hubs where pay outpaces cost of living, and in low-cost/low-pay
   rural markets where the reverse can be true.

Public data sources that make model 2 or 3 possible without a proprietary panel:
- **BLS OEWS (Occupational Employment and Wage Statistics)** — free, publishes wage percentiles by
  metro area and detailed occupation code. Coverage is broad but occupation categories are coarse
  relative to our archetypes (no "solutions architect" SOC code; would require a mapping layer,
  similar in spirit to the SOC-code mapping problem noted for BLS elsewhere in this repo's
  research if any exists).
- **levels.fyi** (already one of our cited sources for `comp-by-tier.json`) publishes per-metro
  cuts for the large tech employers it covers, but that coverage is concentrated in FAANG/big
  tech-style companies — thin or absent for early-stage/growth-stage and for non-SWE archetypes
  like ours (customer support, sales engineering, etc.).
- **Published remote-pay formulas** (GitLab, Buffer, a handful of others) are the closest thing to
  a citable, methodology-transparent geo-band model, but they're single-company formulas, not
  market data — useful as a structural reference, not a source of numbers.

## 3. What our data currently has (audit)

### `app/data/comp-by-tier.json`
360 cells: 18 archetypes × 5 tiers × 4 levels. The "tier" dimension is entirely about **company
type/stage**, not location — `ai-labs`, `faang-mag7`, `high-growth-public`, `growth-stage-private`,
`early-stage`. No metro, region, or remote/onsite field anywhere in the schema. Sourced (per the
file's own `sourcesNote`) from "levels.fyi public pages, Carta H1 2025, techinterview.org, and the
Cadence blog, cross-checked against job-posting salary data." 32 of the 360 cells are already
`confidence: "low"` for lack of tier/level anchors — see
[thin-comp-cells-early-stage](../thin-comp-cells-early-stage/README.md). This matters directly:
we already can't fully populate a 2-axis grid; a 3-axis grid (archetype × tier × geography, times
however many levels) would need either a much bigger evidence base or a much coarser geography
axis to stay honest.

### `app/data/comp-structure.json` and `app/data/company-tiers.json`
Same story — `comp-structure.json` is archetype-level low/high/typical bands by seniority label,
no location. `company-tiers.json` maps individual companies to the 5 stage-tiers above (funding
stage, IPO status), also no location.

### The job-postings corpus — this is the actually-useful finding
`docs/research/job-postings-corpus/` harvests postings from public Greenhouse/Lever/Ashby/Workday
ATS APIs. Checked the pipeline stage by stage:

- `harvest.py` **does** capture a `location` field per posting straight from the ATS API
  (`raw_postings.jsonl` schema is `{company, ats, slug, title, department, location, url,
  job_id}}`).
- `classify.py` carries it through (its own dedupe key is `company+title+location`).
- `app/scripts/extract-comp-signals.py` and `extract-comp-signals-by-tier.py` pull `location`
  into the per-archetype extraction files at
  `docs/research/job-postings-corpus/comp-extraction/*.json`.
- Spot-checked `comp-extraction/data-engineer.json` (251 data points): `location` is populated on
  most records, e.g. `"San Francisco, California, United States"`, `"Boston, MA"`, `"New York City"`.
  But a large share are **not resolvable to one metro**: `"United States"` (18), `"2 Locations"`
  (16), `"3 Locations"` (14), `"Remote - US"` (8), `"5 Locations"` (8), `"US - Remote"` (6),
  `"4 Locations"` (6), and similar multi-location/remote strings account for a meaningful chunk of
  the set.
- Deeper problem: even the single-city records (e.g. Brex's "$120,800 - $151,000" range tagged
  `San Francisco, California, United States`) often come from postings whose salary range is
  legally required to be disclosed as a **single band that may cover multiple work locations**
  under state pay-transparency laws (CA/CO/NY/WA), not necessarily a figure specific to that one
  city. The `location` string being present doesn't guarantee the number next to it is
  location-resolved — that would need to be validated per posting, not assumed.
- The corpus's own `job_descriptions.jsonl.gz` (the compressed full-text dump) does **not** carry
  location at all — only `{company, ats, url, job_id, description_text}`. Location lives only in
  the earlier-stage files (`raw_postings.jsonl`, `classified_postings.jsonl`,
  `comp-extraction*/`), which are the smaller, tracked, high-value files per the corpus README —
  raw/classified postings themselves aren't committed and would need re-harvesting to reconstitute
  at scale.

So: we're not starting from a "we have no location data" position — we have raw location strings
already flowing into the extraction layer for every archetype. What we don't have is (a)
normalization of those strings into a clean set of metros/regions, (b) any handling of the
multi-location/remote-band postings that make up a sizable fraction of the set, and (c) any
validation that a given salary figure is actually specific to the location it's tagged with rather
than a multi-site band.

### Remote roles specifically
No archetype currently has a `remote` field distinguishing "this role could be anywhere" from
"this role is tied to a location." The corpus data suggests a workable proxy already exists
(postings explicitly tagged `"Remote - US"` / `"US - Remote"` in the location field), but nothing
downstream reads it today.

## 4. What this would take, at a concept level (not a plan)

Two structurally different paths, not mutually exclusive:

- **Coarse band model** (closer to GitLab/Buffer/the big-tech "Tier 1/2/3 hub" approach): define a
  small number of location bands (maybe 3–5, e.g. top hubs / secondary metros / remote-US-flat /
  everything else), and apply a per-band adjustment factor on top of the existing tier×level
  figures, sourced from a public index (BLS OEWS metro wage ratios, or a published methodology
  like GitLab's) rather than from our own corpus. Cheaper to build and maintain, coarser insight,
  and the adjustment factor's provenance would need to be as transparent as `comp-by-tier.json`'s
  `sourcesNote` already is — this repo has a clear existing bar for that (see
  `thin-comp-cells-early-stage`'s "don't fabricate precision" standard) and geography should be
  held to the same one.
- **Corpus-derived empirical bands**: clean and re-harvest with `location` normalization (map raw
  ATS strings to a controlled metro list), filter out multi-location/ambiguous-remote records or
  handle them as their own "remote" bucket, and only report a geo cut where sample size clears
  some floor per archetype × metro (mirroring the existing 200-posting-per-archetype floor
  mentioned in the corpus README, which itself isn't met for 6 of 18 archetypes today — see
  `docs/research/job-postings-corpus/README.md` "Known fixes from wave 1"). More accurate in
  principle, meaningfully more expensive, and likely to produce **more** `low`-confidence /
  unreportable cells rather than fewer, given several archetypes don't even clear the *archetype*-level
  posting floor yet, let alone an archetype × metro floor.

A ZIP-code-level promise to the user is very unlikely to be honestly supportable by either path —
both public wage data (BLS OEWS) and our own corpus resolve at the metro/MSA level at finest, not
ZIP. A ZIP input could be *accepted* from the user and mapped down to a metro/band under the hood,
but presenting ZIP-level precision in the output would overstate what any underlying source
actually supports.

## 5. Open questions for the user (decisions to make before this becomes a plan)

- Coarse bands vs. corpus-derived empirical metros — different cost and different honesty
  guarantees, per above.
- How should remote roles be handled: excluded from geo adjustment entirely, given their own flat
  "remote" band, or something else? The corpus already tags a meaningful chunk of postings as
  remote, so this doesn't need to be guessed at, but it does need a policy decision.
- Is a location input worth the UX cost if a real share of the archetypes (customer
  support, sales engineering, etc. — the same six flagged as thin in the corpus README) don't have
  enough posting volume to support even an archetype-level cut, let alone archetype × geography?
  Might be worth sequencing geography only for the higher-volume archetypes first.
- Same "no cron, run manually as part of the Stage 4f pipeline" cadence as the rest of the comp
  data (per `docs/ADD_ARCHETYPE.md`), or does geography need fresher data than company-tier
  research given how quickly hub-vs-remote pay policy moves?
