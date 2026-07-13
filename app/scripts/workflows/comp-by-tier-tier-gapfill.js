export const meta = {
  name: 'comp-by-tier-tier-gapfill',
  description: 'Close remaining comp-by-tier.json low-confidence cells using tier-bucketed corpus extraction plus targeted external research, with mandatory source archiving',
  phases: [
    { title: 'Gapfill' },
    { title: 'Synthesize' },
  ],
}

const CELL_SCHEMA = {
  type: 'object',
  properties: {
    archetypeId: { type: 'string' },
    cells: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tier: { type: 'string', enum: ['ai-labs', 'faang-mag7', 'high-growth-public', 'growth-stage-private', 'early-stage'] },
          level: { type: 'string', enum: ['L3', 'L4', 'L5', 'Staff'] },
          currentConfidence: { type: 'string' },
          recommendedConfidence: { type: 'string', enum: ['low', 'medium', 'high'] },
          rationale: { type: 'string' },
          numberAdjustment: {
            type: 'object',
            properties: { notes: { type: 'string' } }
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

// Archetype list used to be a hardcoded 9-id array here -- it drifted stale (one of the
// 9 already had all cells at confidence="medium" from a prior gapfill round, verified when
// this was made dynamic). Computed fresh each run instead: an agent reads comp-by-tier.json
// and returns every archetype id with >=1 confidence="low" cell right now. Run
// synthesize-comp-data.py before this workflow so the set reflects any recent
// reclassification (see docs/ADD_ARCHETYPE.md Stage 5) rather than a snapshot from whenever
// this list was last hand-edited.
const GAP_ARCHETYPES_SCHEMA = {
  type: 'object',
  properties: {
    archetypeIds: { type: 'array', items: { type: 'string' } },
  },
  required: ['archetypeIds'],
}

const gapArchetypesResult = await agent(
  `Read /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json. For every key in ` +
  `.archetypes, check all of its tier x level cells (5 tiers x 4 levels = 20 cells). Return the ` +
  `full list of archetype ids that have AT LEAST ONE cell with confidence == "low" right now. ` +
  `Return via the required schema as archetypeIds -- a plain array of archetype id strings, no ` +
  `commentary.`,
  { phase: 'Gapfill', label: 'compute-gap-archetypes', schema: GAP_ARCHETYPES_SCHEMA }
)
const GAP_ARCHETYPES = (gapArchetypesResult?.archetypeIds ?? []).sort()
log(`${GAP_ARCHETYPES.length} archetype(s) currently have a low-confidence cell: ${GAP_ARCHETYPES.join(', ') || '(none)'}`)

function buildPrompt(archetypeId) {
  return `You're closing remaining low-confidence cells in a compensation-by-company-tier dataset for the archetype "${archetypeId}", for a career-guidance app. This archetype has some cells still marked confidence="low" across 5 company tiers (ai-labs, faang-mag7, high-growth-public, growth-stage-private, early-stage) x 4 levels (L3, L4, L5, Staff) = 20 cells total.

Context to read first:
1. /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json - find .archetypes["${archetypeId}"] for the CURRENT confidence and base/bonus/equity percentile numbers per tier/level cell.
2. /Users/michael/Documents/Code/careerguru/docs/research/job-postings-corpus/comp-extraction-by-tier/${archetypeId}.json - a company-tier-bucketed extraction from the FULL job-postings corpus for this archetype (real postings, cited company/title/url, already classified by tier via /Users/michael/Documents/Code/careerguru/app/data/company-tiers.json and by level via title keywords). Many cells will be null/empty here because job postings are naturally sparse per exact tier x level combination - that's expected, not a bug. Where a cell HAS points, treat them as strong grounding evidence.
3. /Users/michael/Documents/Code/careerguru/docs/research/source-archive/ - check /Users/michael/Documents/Code/careerguru/docs/research/source-archive/prior-workflows/*/${archetypeId}.json and /Users/michael/Documents/Code/careerguru/docs/research/source-archive/company-tiers/ for citations already gathered in earlier rounds that might be relevant (e.g. Levels.fyi per-level company data already fetched for a related archetype).

Your job, cell by cell (all 20, but focus real effort on the ones currently "low"):
1. Where the tier-bucketed extraction file has real data points for a cell, use those directly as grounding evidence - cite them as sources (company/title/url from the extraction file's "points" array, no need to re-fetch).
2. Where a cell is currently low confidence and has no corpus support, use WebSearch/WebFetch to find real per-level compensation data for THIS SPECIFIC company tier. Effective approach: search Levels.fyi/Glassdoor for named companies representative of that tier (ai-labs: OpenAI/Anthropic; faang-mag7: the 8 named mega-caps; high-growth-public: mid-cap public tech; growth-stage-private: well-funded late-stage startups; early-stage: seed/Series A-B startups) doing a role similar to "${archetypeId}" at the target level, and use their PER-LEVEL breakdown (not just a company-wide average) as your anchor. This is the approach that worked well in a prior round for embedded-iot-engineer - reuse that pattern.
3. For each cell, decide: does the evidence (corpus + new research) support keeping "low", or raising to "medium" (real anchor data found, directionally consistent with current numbers) or "high" (multiple independent sources converge)? Do NOT fabricate precision or fake confidence - if you genuinely can't find real per-tier-per-level anchors (e.g. no AI lab publicly discloses embedded/IoT engineer comp because they don't hire for that role), keep it "low" and say so plainly in rationale. This is a legitimate outcome for genuinely non-existent markets, not a failure.
4. If your research suggests the existing dollar figures in comp-by-tier.json are meaningfully wrong (not just under-sourced), note that in numberAdjustment.notes - don't edit any files, just report findings.
5. IMPORTANT - source archiving: for every NEW external source you fetch (not already in the corpus extraction file), after using WebFetch to confirm it's real, note its title/url/note in your sources array so the synthesis step can archive it permanently to /Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/${archetypeId}/ - this must never depend on re-fetching that URL again in the future.

Return your per-cell findings via the required schema, covering all 20 cells (tier x level combinations) even ones staying at their current confidence.`
}

const results = await parallel(
  GAP_ARCHETYPES.map(id => () => agent(buildPrompt(id), { label: `tiergapfill:${id}`, phase: 'Gapfill', schema: CELL_SCHEMA }))
)

const validResults = results.filter(Boolean)
log(`Gap-fill complete for ${validResults.length}/${GAP_ARCHETYPES.length} archetypes`)

const synthesisResult = await agent(
  `You're applying a tier-aware compensation confidence overhaul to the live app, and building a permanent local source archive.

Here are the per-cell findings from research agents (one entry per archetype, each with up to 20 cells: tier, level, currentConfidence, recommendedConfidence, rationale, numberAdjustment, sources):

${JSON.stringify(validResults, null, 2)}

Steps:
1. Read /Users/michael/Documents/Code/careerguru/app/data/comp-by-tier.json. For each archetype/tier/level cell in the findings above, update .archetypes[archetypeId][tier][level].confidence to the recommendedConfidence value, UNLESS the rationale is weak or has no real sources - in that case keep the current confidence and note why in your final summary. Write the file back with valid JSON, keeping the existing format/structure.
2. If numberAdjustment.notes indicates the existing base/bonus/equity percentile numbers are meaningfully wrong for a cell, use judgment to adjust them (keep p10<p25<p50<p75<p90 ordering intact, stay consistent in magnitude with neighboring tiers/levels/archetypes) - only when evidence is clearly compelling.
3. Build the permanent source archive: for every NEW source cited in the findings above (one not already present as a file under /Users/michael/Documents/Code/careerguru/docs/research/source-archive/), write /Users/michael/Documents/Code/careerguru/docs/research/source-archive/comp-by-tier/{archetypeId}/{tier}-{level}-{n}.json containing { archetypeId, tier, level, title, url, note }.
4. Run \`npx tsc --noEmit\` to confirm nothing broke, fix any errors.
5. Run \`cd /Users/michael/Documents/Code/careerguru/app && npx ts-node --compiler-options '{"module":"commonjs"}' ../scripts/validate-comp-data.ts\` if ts-node is available, or otherwise \`node --experimental-strip-types ../scripts/validate-comp-data.ts\` from the app directory, to confirm comp-by-tier.json still passes structural validation (all bands monotonic, all cells present). Fix any failures.
6. Report back: total cells reviewed, how many moved low->medium, how many moved low->high, how many stayed low (with archetypeId/tier/level and why), and confirm typecheck + validation both pass.`,
  { phase: 'Synthesize' }
)

return { validResults, synthesisResult }
