export const meta = {
  name: 'comp-by-tier-number-fix',
  description: 'Replace placeholder L1/L2 base/bonus/equity numbers in medium/high-confidence cells. These cells have correct confidence labels but still carry the whole-career placeholder band instead of real per-level numbers.',
  phases: [
    { title: 'Number research' },
    { title: 'Apply fixes' },
  ],
}

const TIERS = ['ai-labs', 'faang-mag7', 'high-growth-public', 'growth-stage-private', 'early-stage']
const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'Staff']

// Tier-specific representative companies (same as main gapfill)
const TIER_COMPANIES = {
  'ai-labs': 'OpenAI, Anthropic, DeepMind (Google), xAI, Mistral, Cohere, Scale AI',
  'faang-mag7': 'Google, Meta, Amazon (AWS), Apple, Microsoft, Nvidia, Salesforce',
  'high-growth-public': 'Datadog, Cloudflare, Snowflake, MongoDB, GitLab, HashiCorp, Confluent, Twilio, Okta, HubSpot, Samsara, Axon',
  'growth-stage-private': 'Stripe, Brex, Rippling, Plaid, Figma, Notion, Airtable, Linear, Retool, Vercel, dbt Labs',
  'early-stage': 'Use startup salary surveys (Option Impact, Carta/LTSE, Radford startup) and aggregate job-posting ranges; not company-specific level data'
}

const H1B_SOURCES = `H-1B LCA sources (use first — exact salaries by job title + employer + wage level):
- h1bdata.info — search job title + employer, H-1B wage level I≈L1, II≈L2/L3, III≈L4/L5, IV≈Staff
- myvisajobs.com/Salary/{role-slug} — aggregated by job title with employer and level breakdowns`

// These are the 64 cells that are medium/high confidence but still carry
// whole-career placeholder numbers (L1/L2 p50 is >= 97% of L3 p50 at the same tier).
// Computed from the current state of comp-by-tier.json at the time this script was written.
const PLACEHOLDER_CELLS_SCHEMA = {
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
          suggestedBase: {
            type: 'object',
            properties: {
              p10: { type: 'number' }, p25: { type: 'number' }, p50: { type: 'number' },
              p75: { type: 'number' }, p90: { type: 'number' }
            },
            required: ['p10', 'p25', 'p50', 'p75', 'p90']
          },
          suggestedBonus: {
            type: 'object',
            nullable: true,
            properties: {
              p10: { type: 'number' }, p25: { type: 'number' }, p50: { type: 'number' },
              p75: { type: 'number' }, p90: { type: 'number' }
            }
          },
          suggestedEquity: {
            type: 'object',
            nullable: true,
            properties: {
              p10: { type: 'number' }, p25: { type: 'number' }, p50: { type: 'number' },
              p75: { type: 'number' }, p90: { type: 'number' }
            }
          },
          confidenceAdjustment: { type: 'string', enum: ['keep', 'downgrade'], description: 'keep if the research confirms medium/high is still appropriate, downgrade if evidence was too thin' },
          rationale: { type: 'string' },
          sources: {
            type: 'array',
            items: {
              type: 'object',
              properties: { title: { type: 'string' }, url: { type: 'string' }, note: { type: 'string' } },
              required: ['title', 'note']
            }
          }
        },
        required: ['tier', 'level', 'suggestedBase', 'confidenceAdjustment', 'rationale', 'sources']
      }
    }
  },
  required: ['archetypeId', 'cells']
}

function buildNumberFixPrompt(archetypeId, cells) {
  const cellLines = cells.map(c => {
    const cur = c.currentBaseP50 || 0
    const l3 = c.l3BaseP50 || 0
    return `  ${c.tier} / ${c.level}  [currently ${c.confidence}]  current p50=$${cur.toLocaleString()} vs L3 p50=$${l3.toLocaleString()} ← replace this number`
  }).join('\n')

  const tiersSeen = [...new Set(cells.map(c => c.tier))]
  const companyCtx = tiersSeen.map(t => `  ${t}: ${TIER_COMPANIES[t]}`).join('\n')

  return `You are fixing placeholder compensation numbers for the archetype "${archetypeId}" in a career-guidance app.

BACKGROUND: These cells were previously marked medium or high confidence (correctly — the salary range direction was verified), but the specific dollar values were never updated from the initial placeholder. The placeholder was the whole-career band for this archetype copy-pasted identically onto every tier and level, so L1 shows the same $p50 as L3 or even Staff — which is wrong. Your job is to research and provide real per-level, per-tier numbers.

Cells to fix (${cells.length} total):
${cellLines}

IMPORTANT — what these cells need:
- L1 ≈ 0-2 YOE, new-grad / entry-level titles (SWE I, Associate Engineer, Entry-Level SA, etc.)
- L2 ≈ 1-4 YOE, junior / early-career (SWE II, Junior Engineer, Associate SA, etc.)
- These must be BELOW their tier's L3 numbers. If you research and find L1 is genuinely close to L3 at a particular tier (rare but possible), explain why and use real sources; don't just inherit the placeholder.

Context to read — do this before any web searching:
1. /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json — find .archetypes["${archetypeId}"] for all levels. The L3/L4/L5/Staff numbers are real and researched. Your L1/L2 numbers must be below L3 at every tier.
2. /Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/${archetypeId}/ — READ THIS FIRST. Prior research rounds already fetched and archived many sources for this archetype. If an archived source covers a cell you need, cite it and use its numbers — no new web fetch needed. Check every file in this directory before opening a browser.
3. /Users/michael/Documents/Code/careerguru/docs/research/job-postings-corpus/comp-extraction-by-tier/${archetypeId}.json — corpus postings. If the Entry/Junior bucket has real salary points for a tier, cite them directly.

RESEARCH PROTOCOL — work through these in order, stop when you have enough to fill the cell:

STEP 1 (free — no web fetch): If the source archive already has data that covers this tier/level, use it. Many cells can be closed this way without any new searches.

STEP 2 — H-1B LCA data (if step 1 insufficient):
${H1B_SOURCES}
   H-1B Level I wage ≈ L1 (entry, 17th pctile). Level II ≈ L2/L3 (34th pctile). WebFetch h1bdata.info for representative companies in the tier — this often gives exact base salaries by title + employer.

STEP 3 — Levels.fyi direct page fetch (if step 2 insufficient):
   WebFetch https://www.levels.fyi/companies/{company}/salaries/{role-slug}/levels/{level-slug} for the tier's companies. Read the base/stock/bonus table on the page. Do not just search — fetch and read.

STEP 4 — Salary-transparent job postings (if steps 2-3 insufficient):
   Search LinkedIn Jobs or Indeed for "${archetypeId}"-like roles at tier companies in CA/NY/CO/WA (salary disclosure required). WebFetch the actual posting page to read the range.

For early-stage cells: use Wellfound/AngelList salary data or Option Impact startup survey data — named company level data rarely exists at this tier. Cross-check against the file's high-growth-public L1/L2 (already real numbers) and apply a modest discount for early-stage context.

Representative companies for "${archetypeId}":
${companyCtx}

OUTPUT FORMAT — for each cell, provide:
- suggestedBase: p10/p25/p50/p75/p90 in USD whole numbers. Ensure p10<p25<p50<p75<p90.
- suggestedBonus: same structure if bonus data found, otherwise omit / set null
- suggestedEquity: annualized equity in USD same structure if found, otherwise omit / set null
- confidenceAdjustment: "keep" if your research confirms the existing medium/high label is still right; "downgrade" if the evidence was actually thin and the prior confidence was inflated
- rationale: 2-3 sentences on what sources you used and why these numbers are right
- sources: title/url/note for every new source WebFetched (these get archived permanently)

Return all ${cells.length} cells via the required schema.`
}

// Compute which archetypes have placeholder cells to fix
const PLACEHOLDER_CELLS_SCHEMA_2 = {
  type: 'object',
  properties: {
    archetypes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          archetypeId: { type: 'string' },
          cells: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                tier: { type: 'string' },
                level: { type: 'string' },
                confidence: { type: 'string' },
                currentBaseP50: { type: 'number' },
                l3BaseP50: { type: 'number' },
              },
              required: ['tier', 'level', 'confidence', 'currentBaseP50', 'l3BaseP50']
            }
          }
        },
        required: ['archetypeId', 'cells']
      }
    }
  },
  required: ['archetypes']
}

log('Finding all medium/high L1/L2 cells with placeholder numbers...')
const triageResult = await agent(
  `Read /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json in full. ` +
  `For every archetype, check all L1 and L2 cells. A cell is a "placeholder" if its base.p50 is ` +
  `greater than or equal to 97% of the same tier's L3 base.p50 (meaning L1/L2 is nearly identical ` +
  `to or above L3 — which is wrong; entry-level must be below mid-level). ` +
  `Return ONLY the cells that are (1) confidence == "medium" OR "high", AND (2) have a placeholder number ` +
  `by the above rule. Include currentBaseP50, l3BaseP50, and the current base p10/p25/p75/p90 as well ` +
  `so research agents have the full current distribution. ` +
  `Group by archetypeId. Return via the required schema.`,
  { phase: 'Number research', label: 'triage-placeholders', schema: PLACEHOLDER_CELLS_SCHEMA_2 }
)

const archetypesWithPlaceholders = (triageResult?.archetypes ?? []).filter(a => a.cells.length > 0)
const totalPlaceholders = archetypesWithPlaceholders.reduce((s, a) => s + a.cells.length, 0)
log(`Found ${totalPlaceholders} placeholder cells across ${archetypesWithPlaceholders.length} archetypes`)

if (totalPlaceholders === 0) {
  log('No placeholder numbers found — nothing to fix.')
  return { message: 'No placeholder numbers detected. All L1/L2 cells already have real numbers.' }
}

const researchResults = await parallel(
  archetypesWithPlaceholders.map(({ archetypeId, cells }) => () =>
    agent(
      buildNumberFixPrompt(archetypeId, cells),
      { label: `numfix:${archetypeId}`, phase: 'Number research', schema: PLACEHOLDER_CELLS_SCHEMA }
    )
  )
)

const validResults = researchResults.filter(Boolean)
log(`Number research complete: ${validResults.length}/${archetypesWithPlaceholders.length} archetypes returned results`)

const applyResult = await agent(
  `You are applying number corrections to comp-by-tier.json and archiving sources.

Here are the per-cell number findings (${validResults.length} archetypes, each with suggested base/bonus/equity replacements):

${JSON.stringify(validResults, null, 2)}

Steps (do in order):

1. READ /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json in full.

2. APPLY NUMBER REPLACEMENTS: for each cell in the findings above, replace the existing base/bonus/equity distributions with the suggestedBase/suggestedBonus/suggestedEquity values. Rules:
   - Only apply if suggestedBase has real values (p10/p25/p50/p75/p90 all present and p10<p25<p50<p75<p90).
   - After applying, verify L1.base.p50 < L2.base.p50 < L3.base.p50 for each tier. If this ordering is violated, flag it explicitly but still write the file — do not silently skip.
   - If confidenceAdjustment == "downgrade", also change that cell's confidence from medium/high to "low". Otherwise leave confidence unchanged.
   - Write the full file back with valid JSON, preserving existing structure.

3. ARCHIVE SOURCES: for every new source (url not already on disk under docs/research/source-archive/comp-by-tier/), write /Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/{archetypeId}/{tier}-{level}-{n}.json containing { archetypeId, tier, level, title, url, note }. Increment n to avoid clobbering.

4. VERIFY:
   cd /Users/michael/Documents/Code/careerguru/app && npx tsc --noEmit
   cd /Users/michael/Documents/Code/careerguru/app && npx ts-node --compiler-options '{"module":"commonjs"}' ../scripts/validate-comp-data.ts

5. REPORT:
   - How many cells had numbers replaced
   - Any cells where the replacement created an L1>L2 or L2>L3 ordering violation (state archetype/tier/level)
   - Any cells where confidenceAdjustment was "downgrade" (these cells moved back to low)
   - typecheck and validation pass/fail
   - Count of new source files archived
   - Run a final check: for every L1 and L2 cell in the file, verify base.p50 < the same tier's L3 base.p50. List any remaining violations.`,
  { phase: 'Apply fixes' }
)

return { validResults, applyResult }
