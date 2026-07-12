# Forward-Deployed Engineer (FDE)

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **424 real, currently-live job postings across 73 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 73 total):

- **Snowflake** — "Senior Forward Deployed Engineer, Applied AI"
- **Ivalua** — "AI Forward Deployed Engineer (H/F)"
- **Sigma Computing** — "Forward Deployed Engineer"
- **Instacart** — "Forward Deployed Engineer"
- **Twilio** — "Forward Deployed Engineer"
- **Okta** — "Senior Forward Deployed Engineer - Okta for AI Agents"
- **Postman** — "Senior Forward Deployed Engineer"
- **Valtech** — "Forward Deployed Engineer, Google Cloud, AI Expert"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Also known as:** Forward Deployed Software Engineer (FDSE — Palantir's specific title),
Forward Deployed AI Engineer (emerging title at AI labs).

## Day-to-day activities

- Embeds directly with a customer (typically 25–50% onsite, up to 25% travel expected at
  Palantir) to configure and build on top of the company's platform for that customer's specific
  problems — the defining frame is "one customer, many capabilities" versus a typical SWE's "one
  capability, many customers" ([Palantir — A Day in the Life of a Forward Deployed Software
  Engineer](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1);
  synthesis via [Pragmatic Engineer — What are Forward Deployed Engineers, and why are they so in
  demand?](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
- Writes real production code — architects technical solutions, maps data schemas, writes
  integration pipelines, builds custom dashboards/decision-support tools/automated workflows.
  Coding is described as "the single biggest time block" of the week, though not always the
  majority, because it's interleaved with client-facing work (same Palantir source).
- Week-to-week work varies substantially: some weeks are conventional SWE work (PySpark
  transforms, TypeScript code review); other weeks are scoping a project's future with a client,
  live-demoing applications to analysts, or pair-programming with a client's own junior engineer
  so the client can maintain the system after the engagement ends (same Palantir source).
- Participates in standard engineering rigor — engineering reviews, code review, deployability
  optimization, production monitoring — not a "prototype and walk away" model.
- Feeds field insights back to business development and core product teams — a structured
  feedback loop from live deployments into the roadmap, similar in spirit to the SE/SA feedback
  channel but sourced from deep, sustained embeds rather than sales-cycle conversations.
- At OpenAI specifically, FDEs are distinguished from Solutions Architects by writing code
  *directly on customer infrastructure* rather than building offline proofs-of-concept — a sharper
  build-in-production posture than either SA archetype in this cluster ([Pragmatic Engineer,
  above](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
- Companies actively hiring FDEs as of 2026: Palantir (pioneered the role, originally called
  "Deltas," still the largest employer of it), OpenAI (formal FDE function established 2025, 10+
  engineers across 8 cities), Ramp (~15 FDEs), Salesforce, Gecko Robotics, Commure, Matta, Lindy
  (same Pragmatic Engineer source). FDE job volume is reported to have grown roughly 1,165% as AI
  agent deployment has proven to require exactly this hybrid skill set ([FDE Academy — Is Forward
  Deployed Engineer a Good Career?](https://fde.academy/blog/is-forward-deployed-engineer-a-good-career)).

## Success criteria (comp structure)

**FDE is the one archetype in this cluster where "no quota/commission" is the norm, not the
exception — this is the key contrast against the SE and vendor-SA briefs in this cluster.**

- FDE compensation is overwhelmingly structured like core software engineering comp — base salary
  + significant RSU/equity component + annual bonus — **not** deal-attainment or utilization-linked
  variable pay. Success is measured by deployment/delivery outcomes (did the system ship and keep
  working in production for the client) and, at AI labs, research/product alignment — not by
  whether a sale closed.
- This is explicit in Palantir's own framing: FDSEs are evaluated as engineers first (engineering
  reviews, code review, production monitoring are core job functions), with customer success as an
  outcome of good engineering, not a sales quota layered on top.
- Practitioner sources are explicit that FDE should not be confused with a services/consulting
  delivery role or with sales-adjacent roles: "FDEs aren't consultants... FDEs have explicit
  product development responsibilities" ([Pragmatic Engineer, above](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
- Practical implication for the assessment's incentive/comp-structure dimension: FDE should score
  **low** on "sales-incentive appetite" relative to SE and vendor-side SA, despite scoring **high**
  on client-facing comfort and ambiguity tolerance — this is a genuinely different point in the
  trait space than "SE but more technical," and the taxonomy should not conflate the two just
  because both are client-facing.

## Comp structure (sourced)

- Palantir FDSE (Levels.fyi, US-wide): **$171K–$295K+** total comp, median **$211K**
  ([Levels.fyi — Palantir Forward Deployed Software Engineer
  Salary](https://www.levels.fyi/companies/palantir/salaries/software-engineer/title/fdse)).
  New York City area specifically runs **$171K–$358K+** ([Levels.fyi — NYC
  breakout](https://www.levels.fyi/companies/palantir/salaries/software-engineer/title/fdse/locations/new-york-city-area)).
- By level at Palantir (secondary source aggregating levels.fyi-style data): mid-level
  **$205K–$300K** total comp; senior **$300K–$486K**; staff/principal ceiling **$630K+**
  ([Perspective AI — The 2026 Forward Deployed Engineering Compensation
  Report](https://getperspective.ai/blog/2026-forward-deployed-engineering-compensation-report-1200-fdes),
  based on a stated sample of 1,200 FDEs — treat as a secondary/aggregator source, not audited).
- Frontier AI labs pay markedly more than Palantir for the same role, with the entire premium
  concentrated in equity: reported **2.0–3.5x** Palantir's comp at equivalent levels (same
  Perspective AI source). OpenAI FDE roles reported at **$350K–$550K** total comp for
  mid-to-senior levels, with base salary alone in the **$160K–$280K** band for mid-level, San
  Francisco ([Paraform — What Is OpenAI's Forward Deployed
  Engineer?](https://www.paraform.com/blog/openai-forward-deployed-engineer)). Market-wide 2026
  figures cited: median mid-level FDE total comp **$385K**; staff-level **$610K**; principal FDEs
  at frontier labs reported clearing **$1.2M** (Perspective AI source, same caveat on rigor).
- OpenAI publishes live FDE roles directly on its careers site, including a specific "Forward
  Deployed Engineer, Gov" posting for Washington, DC — signaling a public-sector/government FDE
  sub-track distinct from commercial FDE work ([OpenAI careers — Forward Deployed Engineer,
  Gov](https://openai.com/careers/forward-deployed-engineer-gov-washington-dc/)).

## Career ladder

FDE career ladders are less standardized across the industry than SE/SA ladders because the role
is younger and concentrated in a small number of companies. Representative pattern:

1. Forward Deployed (Software) Engineer — most companies want 5+ years of engineering experience
   for senior-track hires, though some (Ramp, and Palantir for strong candidates) hire with as
   little as ~1 year post-college experience ([Pragmatic Engineer, above](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
2. Senior FDE — larger/more strategic deployments, more autonomy on architecture decisions.
3. Staff/Principal FDE — the compensation ceiling here is unusually high relative to typical SWE
   staff/principal bands (see comp section), reflecting how scarce the hybrid skill set is.
4. Branch points: technical leadership of a deployment vertical/industry practice, transition into
   core product engineering leveraging field-derived insight, or people-management of an FDE pod.

## Common entry paths

- Lateral from Software Engineering — the dominant path. Most FDEs "start as software engineers
  who develop customer-facing skills, typically spending 3–5 years building their technical
  foundation before moving into" the FDE role ([search synthesis on FDE career
  path](https://www.gsdcouncil.org/certification-program/forward-deployed-engineer-career-path)).
- New-grad or very early-career hires directly into FDE at companies willing to train
  customer-facing skills on top of raw technical strength (Palantir, Ramp) — less common than
  lateral SWE moves but explicitly a stated hiring pattern.
- Lateral from Solutions Architect/Sales Engineer roles at companies wanting deeper build
  capability than a typical presales SA provides.

## Common exit paths

- Core/product software engineering roles at the same company, leveraging field-derived product
  insight (explicitly cited progression in [Pragmatic Engineer, above](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
- Product management — deep, sustained exposure to a customer's actual operational problems is
  a strong PM-credibility builder.
- Entrepreneurship/startup founding — cited as a notably common exit because FDEs "spend
  considerable time with customers and operational processes" and are positioned to "spot high
  value startup opportunities" ([FDE Academy — Is Forward Deployed Engineer a Good
  Career?](https://fde.academy/blog/is-forward-deployed-engineer-a-good-career)). This is a
  stronger, more specific claim than the analogous "SEs sometimes found startups" note in the
  Sales Engineer brief, though still not independently quantified — flagged below.
- Solutions Architecture (either vendor- or consulting-side) for those who want to step back from
  the coding-heavy, high-travel FDE intensity while keeping client-facing work.
- Engineering leadership within the FDE org itself (pod lead, practice lead for a vertical).

## Top misconceptions vs. reality

1. **"FDE is just consulting with a software engineering title."** Reality, addressed directly by
   practitioner sources: "Consultants make one-off recommendations; FDEs develop long-term
   customer relationships while contributing to products" — FDEs carry explicit product
   development responsibility and are evaluated on shipped, maintained production systems, not
   deliverable reports ([Pragmatic Engineer, above](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
2. **"It's not real engineering — it's demos and hand-holding."** Reality: Palantir's own
   description of the role centers on engineering reviews, code review, production monitoring,
   and shipping production code (PySpark transforms, TypeScript, integration pipelines) as the
   dominant time allocation; the client-facing work is layered on top of, not instead of, core
   engineering practice.
3. **"FDE is a risky detour from 'real' software engineering that will hurt your technical
   trajectory."** This is a live, explicitly debated question in practitioner circles rather than
   a settled misconception — one source frames it directly: "Is becoming a Forward Deployed
   Engineer a smart career move — or a risky detour from real software engineering?" — and answers
   that FDEs "cultivate breadth across systems and industries," which is valuable rather than
   limiting, while acknowledging the role trades some depth-in-one-codebase for breadth
   ([FDE Academy, above](https://fde.academy/blog/is-forward-deployed-engineer-a-good-career)).
   The honest framing for this product: FDE is a genuine breadth-over-depth trade, not a lesser
   version of core SWE — evidenced by comp ceilings at frontier labs that meet or exceed core SWE
   staff/principal comp.
4. **"FDEs are basically Forward-Deployed Sales Engineers — same job, different name."** Reality:
   the comp structure alone refutes this — FDEs are not on sales-attainment-linked variable comp;
   they are core-engineering-comp-structured with equity upside. The skill and incentive profile
   is closer to "senior SWE with an unusually high client-embed and ambiguity tolerance" than to
   "SE with more coding."

## Open questions / notes for cross-review

- The "FDE → startup founder" exit-path claim is more strongly asserted in sourcing than the
  analogous claim in the Sales Engineer brief, but still comes from a single blog-style source
  (FDE Academy) without a cited dataset — recommend treating as directional, consistent with the
  caveat applied elsewhere in this cluster.
- Comp figures for frontier AI labs (OpenAI, and reported Anthropic figures) are moving fast in
  2025–2026 and sourced here from aggregator/secondary sites (Perspective AI, Paraform) rather
  than levels.fyi directly for those specific companies — Palantir figures are the most reliably
  sourced (direct Levels.fyi pull). Recommend a refresh closer to Phase 2 dimension-weighting if
  the comp-structure dimension needs precise anchors.
- FDE's overlap with the "Consulting engineer / professional services" candidate archetype (listed
  separately in PLAN.md's initial candidate list, likely owned by another cluster) is worth an
  explicit cross-review check — this brief argues FDE is *not* consulting/professional-services
  (see misconception #1) and that distinction should hold up against whatever the professional-
  services brief concludes.
- OpenAI's "Forward Deployed Engineer, Gov" posting suggests a public-sector/government FDE
  sub-track may be emerging as its own thing (security clearance requirements, different
  procurement cycles) — noted but not researched in depth here; possible v2 archetype refinement
  if evidence grows.
