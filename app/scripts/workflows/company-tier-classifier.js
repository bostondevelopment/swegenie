export const meta = {
  name: 'company-tier-classifier',
  description: 'Classify companies into comp-by-tier tiers with cited evidence, write data/company-tiers.json + local source archive',
  phases: [
    { title: 'Classify' },
    { title: 'Synthesize' },
  ],
}

const TIER_SCHEMA = {
  type: 'object',
  properties: {
    classifications: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          company: { type: 'string' },
          tier: { type: 'string', enum: ['ai-labs', 'faang-mag7', 'high-growth-public', 'growth-stage-private', 'early-stage', 'unclear'] },
          evidence: { type: 'string' },
          sourceUrl: { type: 'string' },
          asOf: { type: 'string' }
        },
        required: ['company', 'tier', 'evidence', 'sourceUrl']
      }
    }
  },
  required: ['classifications']
}

const TIER_DEFINITIONS = `Tier definitions for this app comp model:
- ai-labs: frontier/foundation-model AI labs (OpenAI, Anthropic, Google DeepMind, xAI, Mistral, Cohere) - core business is building foundation models.
- faang-mag7: Apple, Microsoft, Amazon, Google/Alphabet, Meta, Netflix, Nvidia, Tesla - largest US public mega-cap tech companies.
- high-growth-public: other publicly traded tech/tech-adjacent companies, not mega-cap.
- growth-stage-private: private companies Series C+ or valuation over ~500M-1B.
- early-stage: private companies seed through Series B, or clearly small/young/high-risk startups.
If unclear (old large private co, gov contractor, foreign co with no US comp analog, or insufficient evidence), use tier unclear rather than guessing.`

const CHUNKS = [["1Password", "1X Technologies", "360Learning", "3M", "AT&T", "Abbott", "Abnormal Security", "ActiveCampaign", "Adyen", "Aeva Technologies", "Affirm", "Agility Robotics", "Agoda", "Airbnb", "Airbyte", "Aircall", "Airtable", "Airwallex", "Alchemy", "Algolia", "Alloy", "Allstate", "Amperity", "Amplitude", "Anaplan", "Anchorage Digital", "Anduril Industries", "Anthropic", "Anysphere (Cursor)", "Appfire", "Appian", "Applied Intuition", "AppsFlyer", "Apptronik", "Ashby", "AssemblyAI", "Astra", "Astranis", "Astronomer", "Attentive", "Aurora Innovation", "Axon", "Axonius", "Baseten", "Bestow", "Betterment", "BeyondTrust", "BigID", "Bitso", "Bitwarden"], ["Blend Labs", "Block", "Bloomreach", "Boeing", "Braintrust", "Braze", "Brex", "Brigit", "Bringg", "Britive", "Broadcom", "Bugcrowd", "Buildkite", "Butterfly Network", "Carbon Robotics", "Carta", "Caterpillar", "Caylent", "Cerebras Systems", "Chainguard", "ChargePoint", "Charm Industrial", "Checkr", "Chime", "Cigna", "CircleCI", "Cisco", "ClassPass", "ClickHouse", "Cloudflare", "Clover Health", "Clubhouse (Alpha)", "Cockroach Labs", "Coder", "Cognism", "Cohere", "Coinbase", "Collibra", "Column", "Comcast", "Confluent", "Contentful", "Contentsquare", "CoreWeave", "Corelight", "Coupa", "Cresta", "Cribl", "Crunchyroll", "Crusoe"], ["Cyberhaven", "DEPT", "Dashlane", "DataCamp", "Databricks", "Datadog", "Decagon", "Deepgram", "Definitive Healthcare", "Delinea", "Deliveroo", "Deputy", "Descope", "Descript", "Dexterity", "Dialpad", "Discord", "Disney", "Docebo", "Docker", "DoorDash", "Dragos", "Drata", "Duolingo", "E2B", "Effectual", "Eight Sleep", "Elastic", "Ethos Life", "Expel", "FREE NOW", "Faire", "FanDuel", "Fastly", "Federato", "Fictiv", "Figma", "Figure AI", "Findem", "Fireblocks", "Five9", "Fivetran", "Flexport", "Flo Health", "Formlabs", "Forter", "FourKites", "GDIT (General Dynamics Information Technology, subsidiary of General Dynamics)", "GE Aerospace (General Electric successor entity)", "GE Healthcare"], ["Gainsight", "Gemini", "General Motors", "GetYourGuide", "GitLab", "GovTech (Singapore)", "Greenhouse", "Gusto", "HP", "HPE", "HYPR", "HackerRank", "Hadrian", "Harvey", "Hasbro", "Helion Energy", "HelloFresh", "Highspot", "Hightouch", "Home Chef", "Honeycomb", "Hopper", "Hudl", "Human Interest", "Ibotta", "Illumio", "Immuta", "Incode", "Infisical", "Instacart", "Instructure", "Intel", "Intellias", "Intercom", "Invoca", "Ippon Technologies", "Iterable", "Ivalua", "JFrog", "Jamf", "JetBrains", "Johnson & Johnson", "JumpCloud", "Justworks", "Keeper Security", "Klaviyo", "Knock", "KnowBe4", "Komodo Health", "Kong"], ["Krafton", "LangChain", "Langfuse", "Lattice", "LaunchDarkly", "LayerZero Labs", "Leapsome", "Linear", "LiveKit", "LlamaIndex", "Loadsmart", "Locus Robotics", "LogicMonitor", "Lucid Motors", "Lyft", "Lyra Health", "Marqeta", "Mastercard", "Match Group", "Medtronic", "Melio", "Mercury", "Merge (Merge.dev)", "Metabase", "Micron", "Mill Industries", "Mindpeak", "Mixpanel", "Modal", "Modern Treasury", "Modus Create", "Monarch Money", "MongoDB", "Monte Carlo Data", "Monzo", "Motional", "Motive", "N26", "Narvar", "Natera", "Navan (TripActions)", "Neo4j", "Netskope", "Neuralink", "New Relic", "Nextdoor", "Nike", "NimbleRx", "Nordstrom", "Nozomi Networks"], ["Nubank", "Nuro", "Nvidia", "OKX", "Obsidian Security", "Okta", "Omada Health", "One Model", "OneTrust", "OpenAI", "OpenSpace", "Orca Security", "Osaro", "Oura", "Outschool", "Overstory", "Oyster", "Palantir Technologies", "Partiful", "Patreon", "Payscale", "Peloton", "Pendo", "Perplexity AI", "Pfizer", "Phantom", "Ping Identity", "Pinterest", "Plaid", "PlanetScale", "Pleo", "Polymarket", "Posh", "PostHog", "Postman", "Postscript", "PrizePicks", "Procurify", "Prudential", "Qualia", "QuickNode", "R/GA", "RTX (Raytheon Technologies)", "Railway", "Ramp", "Reddit", "Redis", "Redwood Materials", "Relativity Space", "Remote.com"], ["Render", "Rent the Runway", "Replit", "Reply", "Riot Games", "Ripple", "Riskified", "Ro", "Robinhood", "Roblox", "Roboflow", "Robots & Pencils", "Rockstar Games", "Roku", "Rondo Energy", "Rover", "Runway", "Safe (Gnosis Safe)", "Saildrone", "Salesforce", "Salesloft", "Salt Security", "Samsara", "Sanity", "Sardine", "Saronic", "Saviynt", "Scale AI", "Scopely", "SeatGeek", "Secureframe", "Semgrep", "Sentry", "Sequoia (Sequoia One)", "Shield AI", "Shift Technology", "Sierra", "Sigma Computing", "SingleStore", "Skydio", "SmartBear", "SnapLogic", "Snowflake", "SoFi", "Socket", "Socure", "Solita", "SonarSource", "SoundCloud", "Span"], ["Spotify", "Squarespace", "Starburst", "Stitch Fix", "Strava", "Stripe", "Sumo Logic", "Supabase", "Synthesia", "Sysdig", "T-Mobile", "Tanium", "Target", "Temporal", "Temporal Technologies", "Thoughtworks", "Thumbtack", "Tinder", "Tines", "Toast", "Torq", "Trace3", "Trainline", "Transmit Security", "Truveta", "Turnkey", "Twilio", "Twitch", "UiPath", "VML (Wunderman Thompson)", "VSCO", "VTS", "Valtech", "Vannevar Labs", "Vanta", "Varda Space Industries", "Vercel", "Veriff", "Verizon", "Verkada", "Via", "Virta Health", "Visa", "Voodoo", "WHOOP", "Waabi", "Warner Bros Discovery", "Waymo", "Wealthfront", "Weaviate"], ["Whoop", "Wolt", "WorkOS", "Workato", "Writer", "Yotpo", "Yugabyte", "Zapier", "Zenput", "Zeta Global", "Zip", "ZipRecruiter", "Zipline", "Zocdoc", "ZoomInfo", "Zoox", "Zopa", "Zuora", "Zwift", "fuboTV", "n8n", "project44", "thatgamecompany (Sky: Children of the Light)"]]

const results = await parallel(
  CHUNKS.map((chunk, i) => () => agent(
    `Classify each of the following ${chunk.length} companies into one of five compensation-market tiers, for a career-guidance apps compensation-by-company-tier feature.

${TIER_DEFINITIONS}

Companies to classify:
${JSON.stringify(chunk)}

Use WebSearch/WebFetch to find real evidence: publicly traded (ticker/market cap) or private (funding round/valuation via Crunchbase, TechCrunch, press releases). For very well-known companies you may already know the answer confidently and can cite a well-known fact directly, but if unsure, look it up. Do not guess - use unclear when evidence is insufficient.

Return classifications via the required schema.`,
    { label: `tier-chunk-${i}`, phase: 'Classify', schema: TIER_SCHEMA }
  ))
)

const validResults = results.filter(Boolean)
const allClassifications = validResults.flatMap(r => r.classifications || [])
log(`Classified ${allClassifications.length} companies across ${CHUNKS.length} chunks`)

const synthesisResult = await agent(
  `You are finalizing a company-tier classification dataset and building a local permanent source archive so these classifications never need re-fetching a live URL.

Raw classifications from research agents:

${JSON.stringify(allClassifications, null, 2)}

Steps:
1. Deduplicate by company name (case-insensitive). If conflicting tiers with equal evidence quality, mark unclear.
2. Write /Users/michael/Documents/Code/careerguru/app/data/company-tiers.json as: { "generatedAt": "2026-07-12", "companies": { "<company>": { "tier": "...", "evidence": "...", "asOf": "..." } }, "unclearCompanies": [ { "company":..., "evidence":... } ] }. Only tier-resolved companies go in the main companies map.
3. For every company with a real sourceUrl, write /Users/michael/Documents/Code/careerguru/docs/research/source-archive/company-tiers/{slug}.json with { company, tier, evidence, sourceUrl, asOf }. slug = lowercase, non-alphanumeric to hyphens.
4. Report: total classified, breakdown by tier, count unclear.`,
  { phase: 'Synthesize' }
)

return { totalClassified: allClassifications.length, synthesisResult }
