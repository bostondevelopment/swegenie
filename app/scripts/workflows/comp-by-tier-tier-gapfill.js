export const meta = {
  name: 'comp-by-tier-tier-gapfill',
  description: 'Close remaining comp-by-tier.json low-confidence cells using mandatory 3-source protocol: H-1B LCA data, salary-transparent job postings, and Levels.fyi; thin-by-design cells confirmed in a single pass',
  phases: [
    { title: 'Triage' },
    { title: 'Confirm thin-by-design' },
    { title: 'Research' },
    { title: 'Synthesize' },
  ],
}

const TIERS = ['ai-labs', 'faang-mag7', 'high-growth-public', 'growth-stage-private', 'early-stage']
const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'Staff', 'Principal']

// These archetype+tier combinations have had 2 full research rounds already confirm no
// real entry-level market exists. A third round of web research would just burn tokens
// on the same dead ends. We confirm them definitively in one pass and move on.
const KNOWN_THIN_COMBOS = [
  { archetypeId: 'embedded-iot-engineer', tier: 'ai-labs' },
  { archetypeId: 'customer-support-engineer', tier: 'ai-labs' },
  { archetypeId: 'customer-support-solutions-engineer', tier: 'ai-labs' },
  { archetypeId: 'consulting-engineer-professional-services', tier: 'ai-labs' },
  { archetypeId: 'forward-deployed-engineer', tier: 'ai-labs' },
]

// Tier-specific company lists for targeted research
const TIER_COMPANIES = {
  'ai-labs': 'OpenAI, Anthropic, DeepMind (Google), xAI (Elon Musk), Mistral, Cohere, Scale AI, Inflection',
  'faang-mag7': 'Google, Meta, Amazon (AWS), Apple, Microsoft, Nvidia, Salesforce',
  'high-growth-public': 'Datadog, Cloudflare, Snowflake, MongoDB, GitLab, HashiCorp, Confluent, Twilio, Okta, HubSpot, Samsara, Axon, Zendesk',
  'growth-stage-private': 'Stripe, Brex, Rippling, Plaid, Figma, Notion, Airtable, Linear, Retool, Vercel, Temporal, dbt Labs',
  'early-stage': 'Use startup salary surveys and aggregate data, not named-company level data (early-stage companies rarely publish formal level-specific comp)'
}

// Levels.fyi URL patterns for each tier (direct-fetch these, do not just search)
const LEVELS_FYI_TIER_EXAMPLES = {
  'faang-mag7': 'https://www.levels.fyi/companies/{company}/salaries/{role-slug}/levels/{level-slug} — e.g. google/salaries/solutions-engineer/levels/l3 or amazon/salaries/solution-architect/levels/sa-i',
  'high-growth-public': 'https://www.levels.fyi/companies/{company}/salaries/{role-slug} — may not have level breakdown; use the company salary page and filter to the level closest to target',
  'growth-stage-private': 'https://www.levels.fyi/companies/{company}/salaries/{role-slug} — may not have level breakdown',
  'ai-labs': 'https://www.levels.fyi/companies/{company}/salaries/{role-slug} — use openai, anthropic as company slugs',
  'early-stage': 'Levels.fyi coverage is sparse; use https://www.levels.fyi/t/{role-slug} for role-level aggregate data instead of company-specific pages'
}

// H-1B primary data sources
const H1B_SOURCES = `Primary H-1B LCA sources (search these first — they have EXACT salaries by job title + employer + year):
- h1bdata.info — search by job title keyword + employer name, shows wage level (Entry/Qualified/Experienced/Fully Competent) which maps roughly to L1→L4
- flcdatacenter.com/LCAdatacenter — DOL's own LCA database, downloadable by quarter
- myvisajobs.com/Salary/{job-title-slug} — aggregated by job title with employer breakdowns`

const CELL_SCHEMA = {
  type: 'object',
  properties: {
    archetypeId: { type: 'string' },
    cells: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tier: { type: 'string', enum: TIERS },
          level: { type: 'string', enum: LEVELS },
          currentConfidence: { type: 'string' },
          recommendedConfidence: { type: 'string', enum: ['low', 'medium', 'high'] },
          rationale: { type: 'string' },
          numberAdjustment: {
            type: 'object',
            properties: {
              notes: { type: 'string' },
              suggestedBase: { type: 'object', properties: { p10: { type: 'number' }, p25: { type: 'number' }, p50: { type: 'number' }, p75: { type: 'number' }, p90: { type: 'number' } } },
              suggestedBonus: { type: 'object', properties: { p10: { type: 'number' }, p25: { type: 'number' }, p50: { type: 'number' }, p75: { type: 'number' }, p90: { type: 'number' } } },
              suggestedEquity: { type: 'object', properties: { p10: { type: 'number' }, p25: { type: 'number' }, p50: { type: 'number' }, p75: { type: 'number' }, p90: { type: 'number' } } },
            }
          },
          sources: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                url: { type: 'string' },
                note: { type: 'string' }
              },
              required: ['title', 'note']
            }
          }
        },
        required: ['tier', 'level', 'currentConfidence', 'recommendedConfidence', 'rationale', 'sources']
      }
    }
  },
  required: ['archetypeId', 'cells']
}

// ── Phase 1: Triage ──────────────────────────────────────────────────────────
// Compute which cells are currently low, with their exact current numbers,
// so research agents get a precise target rather than scanning 30 cells each.

const TRIAGE_SCHEMA = {
  type: 'object',
  properties: {
    archetypes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          archetypeId: { type: 'string' },
          lowCells: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                tier: { type: 'string' },
                level: { type: 'string' },
                baseP10: { type: 'number' },
                baseP50: { type: 'number' },
                baseP90: { type: 'number' },
                bonusP50: { type: 'number' },
                equityP50: { type: 'number' },
              },
              required: ['tier', 'level']
            }
          }
        },
        required: ['archetypeId', 'lowCells']
      }
    }
  },
  required: ['archetypes']
}

const triageResult = await agent(
  `Read /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json in full. ` +
  `For every archetype in .archetypes, find all tier×level cells where confidence == "low". ` +
  `For each such cell, return the archetypeId, tier, level, and the current base.p10, base.p50, base.p90, ` +
  `bonus.p50 (or null), equity.p50 (or null). ` +
  `Return ALL archetypes that have at least one low cell, sorted alphabetically by archetypeId. ` +
  `Return via the required schema — no commentary.`,
  { phase: 'Triage', label: 'triage-low-cells', schema: TRIAGE_SCHEMA }
)

const allGapArchetypes = (triageResult?.archetypes ?? []).filter(a => a.lowCells.length > 0)
const totalLowCells = allGapArchetypes.reduce((sum, a) => sum + a.lowCells.length, 0)
log(`Triage: ${allGapArchetypes.length} archetypes, ${totalLowCells} low cells total`)

// Split: thin-by-design vs researchable
function isThinCombo(archetypeId, tier) {
  return KNOWN_THIN_COMBOS.some(c => c.archetypeId === archetypeId && c.tier === tier)
}

// ── Phase 2: Confirm thin-by-design ─────────────────────────────────────────
// These cells have had 2 full research rounds. Confirm them definitively,
// write clear rationales, and stop spending research tokens on them.

const thinCells = allGapArchetypes.flatMap(a =>
  a.lowCells
    .filter(c => isThinCombo(a.archetypeId, c.tier))
    .map(c => ({ archetypeId: a.archetypeId, ...c }))
)

log(`${thinCells.length} cells are known-thin-by-design; confirming in one pass`)

const thinConfirmResult = thinCells.length > 0 ? await agent(
  `You are confirming that a set of compensation cells in a career-guidance app are legitimately ` +
  `"low" confidence by design — not a research failure, but a real market gap. ` +
  `These cells have been through two prior research rounds and each time the conclusion was the same: ` +
  `the market segment does not exist (e.g., AI labs do not hire entry-level embedded/IoT engineers, ` +
  `AI labs do not have a meaningful new-grad customer-support-engineer track, etc.). ` +
  `\n\nCells to confirm:\n${JSON.stringify(thinCells, null, 2)}\n\n` +
  `For each cell:\n` +
  `1. Read /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json to get the current numbers.\n` +
  `2. Do one quick search (WebSearch, not WebFetch) to see if anything has changed — a major hiring ` +
  `announcement or new level-specific comp data published in 2025-2026 for this exact role+tier. ` +
  `If you find clear new evidence, upgrade. If not (the likely outcome), keep "low" with a ` +
  `definitive, specific rationale: WHY this market does not hire for this archetype at this level ` +
  `(e.g., "AI labs have no published new-grad FDE track; Anthropic and OpenAI postings for this ` +
  `function require 3+ years experience across all published roles as of mid-2026").\n` +
  `3. The placeholder numbers (flat whole-career band copy-pasted as L1/L2) should NOT be corrected ` +
  `in this pass — leave numberAdjustment null. The data will remain low-confidence and the UI ` +
  `will reflect that.\n` +
  `Return all ${thinCells.length} cells via the required schema.`,
  { phase: 'Confirm thin-by-design', label: 'confirm-thin', schema: CELL_SCHEMA }
) : null

// ── Phase 3: Research ────────────────────────────────────────────────────────
// Researchable cells: mandatory 3-source protocol per low cell.
// Each archetype agent receives ONLY its low cells (not all 30) and must
// attempt all three source types before concluding a cell cannot be closed.

const researchArchetypes = allGapArchetypes
  .map(a => ({
    archetypeId: a.archetypeId,
    lowCells: a.lowCells.filter(c => !isThinCombo(a.archetypeId, c.tier))
  }))
  .filter(a => a.lowCells.length > 0)

log(`${researchArchetypes.length} archetypes have ${researchArchetypes.reduce((s,a) => s + a.lowCells.length, 0)} researchable low cells — launching parallel research agents`)

function buildResearchPrompt(archetypeId, lowCells) {
  const cellList = lowCells.map(c =>
    `  - ${c.tier} / ${c.level}  (current base p50: $${(c.baseP50 || 0).toLocaleString()}, ` +
    `p10: $${(c.baseP10 || 0).toLocaleString()}, p90: $${(c.baseP90 || 0).toLocaleString()})` +
    (c.level === 'L1' || c.level === 'L2' || c.level === 'Principal' ? ' ← PLACEHOLDER, replace from scratch' : ' ← re-verify only')
  ).join('\n')

  const tiersSeen = [...new Set(lowCells.map(c => c.tier))]
  const companyContext = tiersSeen.map(t =>
    `  ${t}: ${TIER_COMPANIES[t]}`
  ).join('\n')

  return `You are closing low-confidence cells in a compensation dataset for the archetype "${archetypeId}" ` +
  `in a career-guidance app. You have ${lowCells.length} specific cells to research — do NOT spend time on ` +
  `cells that are already medium/high confidence. Focus exclusively on:\n\n${cellList}\n\n` +

  `Context files to read first:\n` +
  `1. /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json — find .archetypes["${archetypeId}"] ` +
  `for current numbers and neighboring cells (use L3/L4/L5 cells to cross-check L1/L2 estimates for internal consistency).\n` +
  `2. /Users/michael/Documents/Code/careerguru/docs/research/job-postings-corpus/comp-extraction-by-tier/${archetypeId}.json — ` +
  `real corpus postings. Where a cell has actual points (company/title/salary/url), cite them and treat them as grounding evidence.\n` +
  `3. /Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/${archetypeId}/ — ` +
  `any sources already gathered in prior rounds (read these before fetching URLs that may already be archived).\n\n` +

  `MANDATORY 3-SOURCE PROTOCOL for each low cell (attempt all three before concluding a cell can't be closed):\n\n` +

  `SOURCE 1 — H-1B LCA data (always attempt this first, even before Levels.fyi):\n` +
  `${H1B_SOURCES}\n` +
  `Search for the job title most similar to "${archetypeId}" + the representative companies for the tier.\n` +
  `H-1B wage levels roughly map: Level I ≈ L1/L2 (entry), Level II ≈ L3 (mid), Level III ≈ L4/L5 (senior), Level IV ≈ Staff/Principal.\n` +
  `Use WebFetch on h1bdata.info search results — the page returns a table with exact dollar amounts.\n\n` +

  `SOURCE 2 — Salary-transparent job postings (California, New York, Colorado, Washington require salary ranges):\n` +
  `Search LinkedIn Jobs, Indeed, Glassdoor, or direct company careers pages for "${archetypeId}"-like roles at the ` +
  `tier's representative companies (see below), filtering to CA/NY/CO/WA locations which require posted salary ranges. ` +
  `Sample search: site:linkedin.com/jobs "${archetypeId}" site:ca OR site:ny salary — then WebFetch the actual posting.\n` +
  `Even a handful of real posted ranges gives solid anchoring.\n\n` +

  `SOURCE 3 — Levels.fyi direct URL fetch:\n` +
  `${tiersSeen.map(t => `${t}: ${LEVELS_FYI_TIER_EXAMPLES[t] || 'use https://www.levels.fyi/t/{role-slug} for aggregate'}`).join('\n')}\n` +
  `WebFetch the actual Levels.fyi URL — do not just search, fetch the page and read the salary table directly.\n\n` +

  `FOR EARLY-STAGE CELLS SPECIFICALLY:\n` +
  `Early-stage companies (seed/Series A-B) rarely publish formal level-specific compensation — do NOT try to find ` +
  `named-company L1/L2 data. Instead:\n` +
  `- Search for startup salary benchmarks: Option Impact 2024 survey, Carta compensation report, ` +
  `"Radford technology startup" salary data, AngelList (now Wellfound) salary data\n` +
  `- Search h1bdata.info for early-stage startups (filter to smaller employers, <$50M funding)\n` +
  `- Use BLS OES data for the closest occupation code as a floor/sanity check\n` +
  `- Cross-reference against the high-growth-public L1/L2 cell (already filled) and discount by ~15-25% for early-stage risk premium tradeoff\n\n` +

  `FOR AI-LABS CELLS (mainstream roles only — ML, mobile, security, data, solutions architect at ai-labs):\n` +
  `AI labs DO hire these roles at volume and pay well. Use Levels.fyi company pages for openai and anthropic directly, ` +
  `plus H-1B data (AI labs sponsor many H-1B workers). For L1/L2 at ai-labs, look for "new grad" or "university hire" tracks ` +
  `explicitly — some labs post these separately.\n\n` +

  `Representative companies by tier for "${archetypeId}":\n${companyContext}\n\n` +

  `TWO TYPES OF LOW CELLS — treat differently:\n` +
  `- L1/L2/Principal cells: current numbers are a FLAT PLACEHOLDER. ` +
  `Replace with real per-level, per-tier numbers from your research. The placeholder is meaningless; anchor=0.\n` +
  `  For Principal specifically: this level captures Principal Engineer, Distinguished Engineer, and equivalent ` +
  `top-of-IC-ladder titles at companies that distinguish Staff from Principal in their leveling systems ` +
  `(e.g. Google L7/L8, Meta E7/E8, Anthropic Principal MTS). Do NOT interpolate between Staff and a ` +
  `hypothetical ceiling — find real data points for Principal/Distinguished titles specifically. ` +
  `If you can only find data for the Staff/Principal range combined, that is still "low" confidence ` +
  `for the Principal cell — interpolation between adjacent anchors does not count as a direct observation.\n` +
  `- L3/L4/L5/Staff cells: real numbers from prior research, only confidence was reset. ` +
  `Verify the existing number holds; only override if you find clear contrary evidence.\n\n` +

  `CONFIDENCE STANDARDS (do not inflate):\n` +
  `- "low": attempted all 3 source types, found nothing usable for this specific tier+level. State exactly which ` +
  `companies were searched and what each returned. "Low" is legitimate for thin markets but requires this evidence.\n` +
  `- "medium": ≥1 real named-company, level-specific data point (from any of the 3 sources). Must be actual ` +
  `salary numbers, not a vague "this role pays well at FAANG".\n` +
  `- "high": ≥2 independent sources with real numbers that converge within ~20% of each other.\n\n` +

  `NUMBER ADJUSTMENTS: when you find real numbers that differ from the current cell, include suggestedBase/suggestedBonus/suggestedEquity ` +
  `with p10/p25/p50/p75/p90 values in numberAdjustment. Maintain p10<p25<p50<p75<p90 ordering. ` +
  `For L1/L2 cells, always provide suggested numbers when you have data — the placeholder must be replaced.\n\n` +

  `SOURCE ARCHIVING: for every new URL you WebFetch, include it in sources[] with title/url/note so the synthesis ` +
  `step can archive it to /Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/${archetypeId}/.\n\n` +

  `Return all ${lowCells.length} cells via the required schema (one entry per low cell — you do NOT need to return ` +
  `cells that are already medium or high confidence).`
}

const researchResults = await parallel(
  researchArchetypes.map(({ archetypeId, lowCells }) => () =>
    agent(
      buildResearchPrompt(archetypeId, lowCells),
      { label: `research:${archetypeId}`, phase: 'Research', schema: CELL_SCHEMA }
    )
  )
)

const validResearchResults = researchResults.filter(Boolean)
const thinResult = thinConfirmResult ? [thinConfirmResult].filter(Boolean) : []
const allResults = [...thinResult, ...validResearchResults]

log(`Research complete: ${validResearchResults.length}/${researchArchetypes.length} archetypes returned results`)
log(`Sending ${allResults.length} archetype results to synthesis`)

// ── Phase 4: Synthesize ──────────────────────────────────────────────────────

const synthesisResult = await agent(
  `You are applying compensation confidence and number updates to the live app data, then building a permanent source archive.\n\n` +
  `Here are per-cell findings from research agents — ${allResults.length} archetypes, each covering only their low-confidence cells:\n\n` +
  `${JSON.stringify(allResults, null, 2)}\n\n` +

  `Steps (do in order, do not skip):\n\n` +

  `1. READ /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json in full before making any changes.\n\n` +

  `2. APPLY CONFIDENCE UPDATES: for each cell in the findings above, update ` +
  `.archetypes[archetypeId][tier][level].confidence to the recommendedConfidence, UNLESS the rationale ` +
  `lists zero real sources (not even H-1B data or a job posting) — in that case keep "low" and note it. ` +
  `Write the full file back. Preserve existing format.\n\n` +

  `3. APPLY NUMBER ADJUSTMENTS: if a cell has numberAdjustment.suggestedBase (and/or suggestedBonus, suggestedEquity) ` +
  `with actual p10/p25/p50/p75/p90 values, replace the current cell numbers with those suggested values. ` +
  `This is especially important for L1/L2 cells whose current numbers are flat placeholders. ` +
  `Enforce p10<p25<p50<p75<p90 ordering within each component. ` +
  `Cross-check that L1<L2<L3 and Staff<Principal in magnitude within each tier — flag if either ordering is violated after applying changes.\n\n` +

  `4. ARCHIVE SOURCES: for every new source cited (url not already present as a file under ` +
  `/Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/), write ` +
  `/Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/{archetypeId}/{tier}-{level}-{n}.json ` +
  `containing { archetypeId, tier, level, title, url, note }. Increment n to avoid overwrites.\n\n` +

  `5. VERIFY: Run:\n` +
  `   cd /Users/michael/Documents/Code/careerguru/app && npx tsc --noEmit\n` +
  `   cd /Users/michael/Documents/Code/careerguru/app && npx ts-node --compiler-options '{"module":"commonjs"}' ../scripts/validate-comp-data.ts\n` +
  `Fix any failures before reporting.\n\n` +

  `6. REPORT:\n` +
  `   - How many cells moved: low→medium, low→high, and any unexpected changes (upgrades that were reversed)\n` +
  `   - How many stayed "low" and exactly which archetype/tier/level, with the specific reason each one could not be closed\n` +
  `   - How many number adjustments were applied (especially L1/L2 placeholder replacements)\n` +
  `   - typecheck and validation pass/fail\n` +
  `   - Count of new source files archived`,
  { phase: 'Synthesize' }
)

return { allResults, synthesisResult }
