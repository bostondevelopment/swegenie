# Role Research Brief: Consulting Engineer / Professional Services Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11; gap-fill 2026-07-18)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **230 real, currently-live job postings across 54 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 54 total):

- **Robots & Pencils** — "Senior Delivery Manager"
- **Ramp** — "Technical Consultant, Mid-Market"
- **GE Aerospace (General Electric successor entity)** — "Chief Consulting Engineer – Power Generation"
- **Stripe** — "Implementation Consultant"
- **Databricks** — "Data & AI Platform Architect (Professional Services)"
- **Modus Create** — "Atlassian Consultant"
- **Roboflow** — "Implementation Engineer"
- **AHEAD** — "Principal Technical Consultant, ServiceNow"
- **Intellias** — "Delivery Manager"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Titles covered:** Professional Services Engineer, Implementation Engineer, Consulting Engineer,
Technical Consultant, Delivery Consultant, Implementation Consultant.

**Scope note:** This archetype is billable, project/SOW-scoped, client-embedded technical delivery
work. It spans two organizational contexts that share the same day-to-day mechanics but differ in
comp and career structure: (1) **vendor professional services orgs** — the PS arm of a software
company (Salesforce, ServiceNow, Databricks, Snowflake, MongoDB, Neo4j, ClickHouse, HashiCorp,
Confluent, Elastic) implementing/customizing their own product for enterprise clients, and (2)
**systems integrators / consultancies** (Slalom, Thoughtworks, Accenture, Deloitte Digital) doing
multi-vendor technical delivery for clients under statements of work. The **Forward Deployed
Engineer (FDE)** is a related but distinct archetype covered elsewhere in this taxonomy: FDEs sit
inside engineering, write production code that ships back into the core product, and don't carry
a billable-utilization target the way PS/consulting engineers do — the FDE's unit of output is a
merged PR toward a customer go-live, not a closed SOW ["Forward Deployed Engineer vs Software
Engineer"](https://www.rocketlane.com/blogs/forward-deployed-engineer-vs-software-engineer);
["What are Forward Deployed Engineers, and why are they so in demand?" — Pragmatic
Engineer](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers).

---

## Day-to-day activities

Consulting/PS engineers spend the majority of their time on **SOW-scoped, client-facing
implementation work**: configuring and customizing a vendor's product (or a multi-vendor stack)
against a specific client's environment, data, and workflows. Representative postings:

- **ClickHouse Senior Consulting Engineer** roles are explicitly described as blending "hands-on
  engineering, development assistance, and high-tier support," spanning functions across
  Consultative Support, Engineering, and Support — i.e., the role is a hybrid of deep technical
  work and structured client interaction, not pure coding
  ([ClickHouse Senior Consulting Engineer — EMEA](https://job-boards.greenhouse.io/clickhouse/jobs/5726643004)).
- **Neo4j Senior Consulting Engineer** works directly with enterprise customers to "design and
  implement graph-powered solutions, guiding architecture decisions and helping deliver successful
  Neo4j implementations" — architecture consulting plus hands-on delivery
  ([Neo4j Senior Consulting Engineer](https://job-boards.greenhouse.io/neo4j/jobs/4663095006)).
- Implementation Engineer postings (Cloudflare, Sourcegraph, Tailscale, Harbor and others)
  describe the role as sitting "at the intersection of Pre-sales, Support, and Product," being the
  "primary architect of customers' first experience with the product," and doing hands-on work —
  "architecting workflows, configuring environments, writing code/configurations, debugging
  integrations, and guiding deployments" — often running structured onboarding programs "from
  kickoff through wrap-up with weekly implementation sessions"
  ([Implementation Engineer listings, Greenhouse/Lever aggregate search](https://job-boards.greenhouse.io/warp/jobs/5832041004)).
- On the ServiceNow-ecosystem side, PS/technical-consultant work is described as delivering
  "solutions through configuration and/or customization including user interface, workflow
  administration, reports, data imports, integration, custom scripting, and third-party software
  integrations," plus authoring implementation standards and documentation
  ([ServiceNow platform engineer/developer role descriptions aggregate](https://www.imocha.io/job-description/servicenow-developer)).

Common threads across postings: **technical workshops** with client stakeholders (discovery,
architecture review, requirements gathering), **custom integration/configuration work** (APIs,
data migration, scripting — SQL and relational-database work shows up repeatedly as a baseline
skill), **running structured delivery programs** against a scoped timeline, and **documentation**
as a deliverable, not an afterthought (client-facing runbooks, configuration standards). Travel/
embed intensity varies by firm model: pure consultancies historically ran Monday–Thursday
on-client-site patterns for early-career staff (4-5 days/week travel), shifting post-COVID toward
every-other-week hybrid cadences, with travel load decreasing at senior/principal levels as the
role shifts toward oversight and multiple concurrent accounts
([Consulting travel expectations](https://www.hackingthecaseinterview.com/pages/consulting-travel-expectations)).
Vendor in-house PS roles tend to run lighter travel (client-site kickoffs and key milestones,
otherwise remote/video), though this is directional rather than a sourced statistic for every
vendor.

## Success criteria / how performance is actually measured

The dominant KPI across professional services organizations — vendor and consultancy alike — is
**billable utilization rate**: billable hours ÷ total available hours. Benchmarks cluster tightly
across independent sources:

- Target utilization for technical consultants/engineers specifically is commonly set at
  **75-85%**, higher than the org-wide average, with management roles targeted lower
  ([BigTime, "Utilization Rate Made Simple"](https://www.bigtime.net/utilization-rate/)).
- Industry-wide, "the typical target utilization rate often falls between 70% and 80%," with
  consulting/IT services/engineering aiming for 80%+
  ([Rocketlane, "Maximizing billable utilization for professional services"](https://www.rocketlane.com/blogs/strategies-for-maximizing-billable-utilization-for-professional-services-firms)).
- Actual achieved rates lag targets: **IT consulting firms averaged 72% utilization in 2023**,
  "well below the optimal target of 80%" — and firms explicitly warn that pushing utilization
  above ~80% sustainably raises burnout and attrition risk
  ([Operating.app, "How IT Consulting Firms Can Fix Bench Management"](https://www.operating.app/blog-posts/bench-management-it-consulting);
  [Mosaic, "Billable Utilization Rate Statistics in Professional Services Firms"](https://www.mosaicapp.com/post/billable-utilization-rate-statistics-in-professional-services-firms)).

Beyond utilization, professional-services-specific KPI frameworks consistently name a cluster of
secondary metrics: **project delivery timeliness/schedule performance (SPI), earned value, cost
performance index (CPI), revenue and profit margin per client/engagement, and client
satisfaction** — treated as a portfolio, not a single number
([Productive.io, "7 Professional Services KPIs You Need To Track"](https://productive.io/blog/professional-services-kpis/);
[Precursive, "Professional Services KPIs You Should Be Tracking"](https://www.precursive.com/post/professional-services-kpis-you-should-be-tracking)).
SOW margin (delivered cost vs. contracted price) is a first-class metric because scope creep on a
fixed-price or capped-hours SOW directly erodes it — a recurring theme in PS management literature
and in the "bench management" sources above, where mismatched sales forecasts, project plans, and
resourcing lead to both idle time and overruns simultaneously.

## Comp structure

- **Base + variable, with variable typically tied to utilization/billed revenue rather than to
  closed sales quota** (the sales-quota model belongs to sales engineering, a neighboring
  archetype). A modeled example from professional-services compensation literature: a consultant
  billing at 80% utilization (~1,664 billable hours/year) at a $200/hr rate generates ~$332,800 in
  billed revenue; a 10% bonus on that revenue yields ~$33,280, producing an on-target-earnings mix
  of roughly **70% base / 30% incentive**
  ([bdimuccio, "Compensating PS Staff on Billable Utilization"](https://bdimuccio.wordpress.com/2010/09/27/compensating-ps-staff-on-billable-utilization-is-there-a-new-normal/)).
- Utilization-linked bonus design is contentious in the field: practitioners note it can pit
  consultants against each other for billable work, penalize investment in business development
  or knowledge-sharing (unbillable but valuable), and create friction between staying billable and
  taking on strategically important but under-scoped work — leading some firms to recommend tying
  bonuses to a blend of utilization *and* project margin rather than raw hours
  ([LinkedIn, "Rethinking Utilization as a Consultant Compensation Measure" — Calkins](https://www.linkedin.com/pulse/rethinking-utilization-consultant-compensation-measure-calkins)).
- **Vendor in-house PS vs. pure consultancy comp differs structurally**, not just in level:
  product-embedded PS orgs inside software companies are "typically less focused on consulting
  profitability than traditional consultancies and don't prioritize billable utilization as
  heavily as pure-play consulting firms" — meaning vendor PS comp leans closer to standard
  tech-company base+bonus+equity, while consultancy comp leans harder on the
  utilization/margin-linked bonus pool
  (search synthesis citing PS-compensation literature; corroborated directionally by
  [Rocketlane's utilization-maximization framing for vendor vs. agency PS](https://www.rocketlane.com/blogs/strategies-for-maximizing-billable-utilization-for-professional-services-firms)).
- Entry/mid consultancy base pay: **Deloitte and Accenture analyst/consultant-level base
  generally falls in the $80,000-$110,000 range in the US**, with "minimal variation between the
  two firms at entry and mid-career levels"
  ([CaseBasix, "Accenture vs Deloitte Consulting Careers Salary and Culture"](https://www.casebasix.com/pages/accenture-vs-deloitte-comparison)).
- Direct levels.fyi/Glassdoor data specifically labeled "Professional Services Engineer" was
  sparse in this search pass (most levels.fyi listings for Databricks/MongoDB/Cisco are filed
  under "Software Engineer" or unlabeled aggregate bands) — flagged as an open gap below rather
  than asserted with a weak citation.

## Career ladder

Two parallel ladder shapes show up in sourced material:

- **Consultancy ladder (Slalom, as a representative example):** Associate Consultant → Consultant
  → Senior Consultant → Principal → Director → Managing Director, with a bifurcation at senior
  levels into a **business track** (Consultant → Principal Consultant → Client Service Lead →
  Client Service Partner) and a **technical track** (Solution Architect → Solution Principal →
  Program Area Lead → Program Area Director)
  ([Glassdoor Forum, "Someone please explain career levels at Slalom Consulting"](https://www.glassdoor.com/Community/consulting/someone-please-explain-career-levels-at-slalom-consulting-i-see-titles-like-consultant-principal-sr-principal-practice)).
- **Thoughtworks ladder:** Consultant → Senior Consultant → Lead Consultant → Principal Consultant
  → Director ([Fishbowl, "What are the career levels in thoughtworks?"](https://www.fishbowlapp.com/post/what-are-the-career-levels-in-thoughtworks)).
- **Deloitte core ladder:** Analyst → Consultant → Senior Consultant → Manager → Senior Manager →
  Principal/Managing Director/Partner, with Deloitte Digital specifically recruiting heavily out
  of college for entry-level technical-consulting tracks
  ([MyConsultingOffer, "Deloitte Consulting Career Path"](https://www.myconsultingoffer.org/what-is-consulting/deloitte-consulting-career-path/);
  [Deloitte Digital careers page](https://www.deloittedigital.com/us/en/careers.html)).
- Promotion in these ladders is explicitly performance/capability/leadership-readiness gated
  rather than tenure-gated at the named firms in this search
  ([Glassdoor Forum, Slalom levels thread](https://www.glassdoor.com/Community/consulting/someone-please-explain-career-levels-at-slalom-consulting-i-see-titles-like-consultant-principal-sr-principal-practice)).
  **Note:** classic "up-or-out" (mandatory exit if not promoted within a window), the norm at MBB/
  Big Four strategy consulting, is well documented for those firms but this search did not surface
  a firm-specific citation confirming a formal up-or-out policy at Slalom or Thoughtworks
  specifically for technical/delivery consultants — flagged as an open question below rather than
  asserted.
- Vendor PS orgs typically run a flatter, more engineering-adjacent ladder (e.g., Consulting
  Engineer → Senior Consulting Engineer → Staff/Principal Consulting Engineer → Practice
  Lead/Manager), visible directly in the leveled job titles on postings such as ClickHouse's
  "Senior Consulting Engineer" ([ClickHouse posting](https://job-boards.greenhouse.io/clickhouse/jobs/5726643004))
  and Neo4j's "Senior Consulting Engineer" ([Neo4j posting](https://job-boards.greenhouse.io/neo4j/jobs/4663095006)).

## Common entry paths

- **New grad into a consultancy's structured analyst/associate program** — Deloitte Digital and
  similar firms recruit directly out of college into entry-level technical-consulting roles as a
  primary pipeline ([Deloitte Digital careers](https://www.deloittedigital.com/us/en/careers.html)).
- **SWE who wants client variety and faster feedback loops than internal product work offers** —
  implied by the repeated posting language positioning Implementation/Consulting Engineer roles as
  requiring "3+ years of experience in implementation engineering, solutions engineering, forward-
  deployed engineering, or similar customer-facing technical roles," i.e., vendors recruit
  directly from adjacent technical ICs, not exclusively from consulting backgrounds (Implementation
  Engineer postings aggregate, e.g. [Cloudflare](https://job-boards.greenhouse.io/cloudflare/jobs/7096016)).
- **Domain expert who picks up technical/platform skills** — visible in the ServiceNow-ecosystem
  postings, where the role explicitly blends business-process/workflow expertise with scripting
  and integration skill, a common entry point for people coming from IT operations or
  functional-analyst backgrounds rather than core software engineering
  ([ServiceNow developer role description](https://www.imocha.io/job-description/servicenow-developer)).

## Common exit paths

- **Into the client's engineering org** — a well-known pattern in vendor PS/FDE-adjacent work
  where deep embedding with one client's stack creates a natural hiring pipeline in both
  directions; this dynamic is discussed explicitly in the FDE-boundary literature even though it
  applies more broadly to embedded consulting engineers too
  ([Pragmatic Engineer, "What are Forward Deployed Engineers"](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)).
- **Sales engineering** — a documented adjacent-role transition, though sourced material frames it
  as requiring the PS engineer to build more overtly technical/demo-and-POC skills to make the
  jump, since sales engineering carries a quota-linked incentive PS work does not
  ([4dayweek.io / FullEnrich career-path aggregate on Solutions Consultant → Sales Engineer transitions](https://www.jobtrees.com/tree/solutions-consultant-career-path)).
- **Solutions architecture** — the technical track within consultancy ladders (e.g., Slalom's
  Solution Architect → Solution Principal → Program Area Lead track) is effectively a formalized
  internal exit path from delivery-consultant work
  ([Glassdoor Forum, Slalom levels thread](https://www.glassdoor.com/Community/consulting/someone-please-explain-career-levels-at-slalom-consulting-i-see-titles-like-consultant-principal-sr-principal-practice)).
- **Product management** and **starting an independent consultancy/boutique SI** are commonly
  cited anecdotally in career-path aggregators for consultant-type roles generally (business
  acumen + client-facing pattern recognition are the transferable assets), though this pass did
  not find a rigorous, PS-engineer-specific primary source quantifying either path — flagged below
  as directional rather than strongly sourced.

## Top misconceptions vs. reality

- **"It's just IT support / glorified helpdesk."** Reality per job postings: the role explicitly
  requires architecture-level design input (Neo4j: "guiding architecture decisions"), custom
  integration/scripting work, and technical ownership of go-live outcomes — support is one
  function among several, not the job's definition
  ([Neo4j posting](https://job-boards.greenhouse.io/neo4j/jobs/4663095006);
  [ClickHouse posting](https://job-boards.greenhouse.io/clickhouse/jobs/5726643004)).
- **"Travel is constant and unavoidable."** Reality is bimodal and has shifted: classic
  Monday-Thursday on-site travel (4-5 days/week) was the norm pre-COVID at traditional
  consultancies, but "hybrid models are common and many teams travel every other week instead of
  every week" post-COVID, and vendor in-house PS roles generally travel less than SI/consultancy
  roles to begin with
  ([Hacking the Case Interview, "Consulting Travel Expectations"](https://www.hackingthecaseinterview.com/pages/consulting-travel-expectations)).
- **"High utilization is unambiguously good and firms want it maxed out."** Reality: firms
  explicitly flag that utilization above ~80% sustained is a burnout/attrition risk, and PS
  compensation experts argue pure utilization-based bonuses create perverse incentives (avoiding
  valuable unbillable work like BD or mentoring) — utilization is a target band, not a maximize-
  forever metric
  ([Mosaic, "Billable Utilization Rate Statistics"](https://www.mosaicapp.com/post/billable-utilization-rate-statistics-in-professional-services-firms);
  [LinkedIn, "Rethinking Utilization as a Consultant Compensation Measure"](https://www.linkedin.com/pulse/rethinking-utilization-consultant-compensation-measure-calkins)).
- **"Staffing is steady — you finish one project and roll onto the next."** Reality: bench time is
  a named, structurally recurring problem — "IT consulting firms averaged 72% consultant
  utilization in 2023 — well below the optimal target of 80%," and firms explicitly describe a
  "feast or famine" cycle where sales forecasting and delivery staffing fall out of sync,
  producing simultaneous idle time and overbooking of the most senior/visible consultants
  ([Operating.app, "How IT Consulting Firms Can Fix Bench Management"](https://www.operating.app/blog-posts/bench-management-it-consulting)).
- **"Scope is whatever the client wants."** Reality: SOW margin management and scope-creep control
  is treated as a first-class delivery skill in PS KPI frameworks, not an edge case — cost
  performance index (CPI) and schedule performance index (SPI) are named as standard tracked
  metrics specifically because uncontrolled scope directly erodes contracted margin
  ([Productive.io, "7 Professional Services KPIs You Need To Track"](https://productive.io/blog/professional-services-kpis/)).

## Notes / open questions

- **FDE boundary drawn narrowly per instructions**: FDE is treated here only as a boundary
  reference (distinguished by: sits in engineering, ships product code, no utilization target).
  The parallel FDE brief should confirm/refine this boundary independently rather than deferring
  to this document, since both briefs were written without cross-review at the time of writing.
- **levels.fyi/Glassdoor searches did not surface clean, role-labeled "Professional Services
  Engineer" compensation bands** for the target vendors (Databricks, Snowflake, MongoDB,
  Salesforce, ServiceNow) in this search pass — most public leveled comp data for these companies
  is filed under generic "Software Engineer" titles. This is a real data gap, not an oversight;
  a follow-up pass hitting levels.fyi's title-search UI directly (rather than via web search)
  would likely do better and is worth a dedicated retry before Phase 2 rubric-building leans on
  precise comp numbers for this archetype.
- **Up-or-out**: I could not find a primary source confirming formal up-or-out policies at Slalom
  or Thoughtworks specifically (as distinct from the well-documented MBB/Big Four strategy-
  consulting norm). I described promotion at these firms as "performance/capability-gated" per
  sourced material, and explicitly flagged the up-or-out claim as unconfirmed for this sub-segment
  rather than asserting it. Cross-reviewer should treat any up-or-out claim about SI/technical-
  consultancy tracks specifically (as opposed to strategy consulting) as needing another source
  pass.
- **Exit into client's engineering org and "starting own consultancy"** are included because they
  are strongly plausible and repeatedly gestured at in career-path literature, but the strongest
  direct citation available was FDE-context (Pragmatic Engineer) rather than PS-engineer-specific.
  Flagged inline above; treat as medium-confidence rather than fully verified.
- Source count for this brief: **14 distinct URLs cited** (see Sources), exceeding the 6-8 minimum
  for a single brief and contributing meaningfully to the >=15 cluster-wide target.

---

## Sources

1. Rocketlane — [Forward Deployed Engineer vs Software Engineer](https://www.rocketlane.com/blogs/forward-deployed-engineer-vs-software-engineer)
2. Pragmatic Engineer (Gergely Orosz) — [What are Forward Deployed Engineers, and why are they so in demand?](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)
3. ClickHouse — [Senior Consulting Engineer — EMEA (job posting)](https://job-boards.greenhouse.io/clickhouse/jobs/5726643004)
4. Neo4j — [Senior Consulting Engineer (job posting)](https://job-boards.greenhouse.io/neo4j/jobs/4663095006)
5. Warp / aggregate Implementation Engineer postings (Greenhouse/Lever) — [Implementation Engineer (job posting)](https://job-boards.greenhouse.io/warp/jobs/5832041004)
6. Cloudflare — [Implementation Engineer (job posting)](https://job-boards.greenhouse.io/cloudflare/jobs/7096016)
7. iMocha — [ServiceNow Developer job description / role template](https://www.imocha.io/job-description/servicenow-developer)
8. BigTime — [Utilization Rate Made Simple: Formula and Examples](https://www.bigtime.net/utilization-rate/)
9. Rocketlane — [Maximizing billable utilization for professional services](https://www.rocketlane.com/blogs/strategies-for-maximizing-billable-utilization-for-professional-services-firms)
10. Operating.app — [How IT Consulting Firms Can Fix Bench Management and Improve Utilization](https://www.operating.app/blog-posts/bench-management-it-consulting)
11. Mosaic — [Billable Utilization Rate Statistics in Professional Services Firms](https://www.mosaicapp.com/post/billable-utilization-rate-statistics-in-professional-services-firms)
12. Productive.io — [7 Professional Services KPIs You Need To Track + Formulas](https://productive.io/blog/professional-services-kpis/)
13. Precursive — [Professional Services KPIs You Should Be Tracking](https://www.precursive.com/post/professional-services-kpis-you-should-be-tracking)
14. bdimuccio (WordPress) — [Compensating PS Staff on Billable Utilization: Is There a "New Normal?"](https://bdimuccio.wordpress.com/2010/09/27/compensating-ps-staff-on-billable-utilization-is-there-a-new-normal/)
15. LinkedIn (Calkins) — [Rethinking Utilization as a Consultant Compensation Measure](https://www.linkedin.com/pulse/rethinking-utilization-consultant-compensation-measure-calkins)
16. CaseBasix — [Accenture vs Deloitte Consulting Careers Salary and Culture](https://www.casebasix.com/pages/accenture-vs-deloitte-comparison)
17. Glassdoor Forum — [Someone please explain career levels at Slalom Consulting?](https://www.glassdoor.com/Community/consulting/someone-please-explain-career-levels-at-slalom-consulting-i-see-titles-like-consultant-principal-sr-principal-practice)
18. Fishbowl — [What are the career levels in thoughtworks?](https://www.fishbowlapp.com/post/what-are-the-career-levels-in-thoughtworks)
19. MyConsultingOffer — [Deloitte Consulting Career Path: Your Roadmap to Partner](https://www.myconsultingoffer.org/what-is-consulting/deloitte-consulting-career-path/)
20. Deloitte Digital — [Careers page](https://www.deloittedigital.com/us/en/careers.html)
21. Hacking the Case Interview — [Consulting Travel Expectations: What to Actually Expect](https://www.hackingthecaseinterview.com/pages/consulting-travel-expectations)
22. Jobtrees — [Solutions Consultant Career Path](https://www.jobtrees.com/tree/solutions-consultant-career-path)
