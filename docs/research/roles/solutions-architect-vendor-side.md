# Solutions Architect (Vendor-Side)

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **57 real, currently-live job postings across 21 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This clears the original ≥15-posting v1 sourcing target several times over, though it fell short of the ≥200-posting stretch goal set for this pass despite three dedicated gap-fill rounds — this appears to reflect genuine scarcity of this specific title pattern on public ATS boards (many employers for this role use Workday, Oracle Recruiting Cloud, or fully custom career sites that don't expose a bulk API) rather than a search gap; reported honestly rather than padded.

Representative sample of companies with live postings matched to this archetype (of 21 total):

- **Datadog** — "Partner Solutions Architect (Pan-EMEA GSI)"
- **Stripe** — "Partner Solutions Architect - LatAm"
- **MongoDB** — "Senior Partner Solutions Architect"
- **Supabase** — "Partner Solutions Architect - AWS"
- **GDIT (General Dynamics Information Technology, subsidiary of General Dynamics)** — "Cloud Solutions Architect"
- **Remote.com** — "Senior Partner Solutions Architect"
- **Databricks** — "AWS Cloud Partner Solutions Architect — EMEA"
- **3M** — "Salesforce Solutions Architect / Senior Engineer"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Also known as:** Solutions Engineer (at some vendors, used interchangeably with this role rather
than with Sales Engineer — title usage is company-specific), Technical Account Architect, Field
Solutions Architect.

## Vendor-side vs. consulting-side split decision

**Decision: split into two archetypes.** Both "Solutions Architect" briefs in this cluster treat
vendor-side and consulting-side as distinct archetypes, not one archetype with a modifier tag.

Reasoning:
- **Different employer, different incentive alignment.** A vendor-side SA is paid (partly, see
  comp below) to make one company's product look right for the prospect; a consulting-side SA is
  paid to design the *best* solution across potentially many vendors' products, including
  recommending against their own employer's product/practice offering when appropriate. This is a
  meaningfully different professional stance, not a cosmetic difference — sources agree: "when
  acting on behalf of a client, the SA adopts a more cautious approach, meticulously evaluating
  the vendor's digital property... before committing," vs. the vendor SA whose job is to
  "effectively communicate the value proposition of their technology solutions" ([Medium — The
  Role of a Solutions Architect: Vendor vs. Client
  Perspectives](https://solutionsarchitecture.medium.com/the-role-of-a-solutions-architect-vendor-vs-client-perspectives-23b23cf2668e)).
- **Different comp mechanics.** Vendor-side SA comp routinely includes sales-attainment-linked
  variable pay (see GitLab handbook below — SAs are explicitly on Sales KPIs including bookings).
  Consulting-side SA comp is typically billable-utilization-linked, not deal-attainment-linked —
  a materially different risk/reward structure that this product's "quota/commission" incentive
  dimension needs to distinguish.
- **Different engagement duration and depth.** Vendor SA engagement with any single customer is
  usually pre-sales-bounded (weeks to a quarter, until the deal closes or dies); consulting-side SA
  engagement is often the full implementation lifecycle (months to years), closer to embedded
  delivery work.
- **Caveat:** the boundary is genuinely blurry in practice — "some SAs are presales, some are post
  sales, some are in between... the definitions differ company to company" ([same Medium
  source](https://solutionsarchitecture.medium.com/the-role-of-a-solutions-architect-vendor-vs-client-perspectives-23b23cf2668e)).
  Treat the split as the dominant pattern, not a hard law; the assessment's result copy (Phase 3)
  should acknowledge hybrid roles exist.

## Day-to-day activities

- Acts as "trusted advisor to prospects and clients," bridging technical requirements and business
  objectives during the sales cycle ([GitLab Handbook — Solutions Architect job
  family](https://handbook.gitlab.com/job-families/sales/solutions-architect/) — used here as a
  detailed, public, primary-source job family definition).
- Conducts technical consultations with stakeholders at all levels, from engineers to executives;
  runs value-stream assessments and discovery workshops.
- Leads Proof-of-Concept (POC) and Proof-of-Value (POV) engagements — hands-on technical
  validation with the prospect's actual environment/data, not just a slide deck (GitLab Handbook,
  same source).
- Designs future-state architecture and produces supporting collateral: architecture diagrams,
  TCO (total cost of ownership) analyses, migration plans ([Simplilearn — Day in the Life of an
  AWS Solutions Architect](https://www.simplilearn.com/what-a-day-in-the-life-of-an-aws-solutions-architect-look-like-article)).
- Provides competitive positioning/market analysis to support the sales team's deal strategy.
- Supports RFP responses and technical audits; creates reusable technical reference content.
- Serves as customer advocate back into Product, Engineering, and Marketing — a structured
  feedback channel, similar to the SE role but usually engaged on larger/more strategic accounts
  and later-stage or more complex deals than a typical SE handles.
- At large cloud vendors (AWS, Azure, GCP) this role is explicitly described as "the technical glue
  between everything inside [the company] — support teams, service teams, and sales teams,"
  including travel to onsite customer meetings and hands-on migration work ([search synthesis
  citing AWS SA role descriptions](https://www.simplilearn.com/what-a-day-in-the-life-of-an-aws-solutions-architect-look-like-article)).

## Success criteria (comp structure)

- Explicitly tied to **sales KPIs**: new bookings (new-logo acquisition), growth/expansion
  bookings, sales efficiency, customer adoption/utilization post-sale, and deal win rate on
  technically-evaluated opportunities ([GitLab Handbook — Solutions
  Architect](https://handbook.gitlab.com/job-families/sales/solutions-architect/)).
- Like the Sales Engineer, vendor-side SAs typically carry **variable/incentive compensation** tied
  to their aligned sales territory's attainment — not a flat engineering salary. The split is
  usually less aggressive than a pure SE's (more base-weighted), but the presence of any
  attainment-linked variable is the defining structural difference from IC engineering and from
  consulting-side SA.
- Distinguishing feature vs. Sales Engineer: vendor SA scope trends toward larger/more strategic
  accounts, longer sales cycles, and multi-year transformation narratives rather than single-product
  demos — GitLab's own ladder explicitly separates "Solutions Architect" (owns customer success
  plans) from more tactical presales demo work.

## Comp structure (sourced)

- AWS/Azure-class public cloud vendors: senior SAs typically **$165K–$210K base + ~15% target
  bonus + RSUs vesting over 4 years**, total comp **$250K–$340K** (search synthesis of multiple
  2026 comp-guide sources, cross-checked against Levels.fyi).
- Amazon Solutions Architect (Levels.fyi): **$167K (L4) to $432K+ (L7)**, median total comp
  **$279K** ([Levels.fyi — Amazon Solution
  Architect](https://www.levels.fyi/companies/amazon/salaries/solution-architect)).
- Salesforce Solution Architect (Levels.fyi): **$150K (Associate) to $284K+ (Principal)**, median
  total comp **$250K**; Principal specifically medians **~$290K** ([Levels.fyi — Salesforce
  Solution Architect](https://www.levels.fyi/companies/salesforce/salaries/solution-architect);
  [Principal level
  page](https://www.levels.fyi/companies/salesforce/salaries/solution-architect/levels/principal-solution-architect)).
- Real postings:
  - Glean, Solutions Architect: **$160,000–$225,000 OTE** ([Greenhouse
    posting](https://job-boards.greenhouse.io/gleanwork/jobs/4508312005)).
  - Temporal Technologies, Staff Solutions Architect (San Francisco): **$250,000–$300,000**
    ([Greenhouse posting](https://job-boards.greenhouse.io/temporaltechnologies/jobs/5071974007)).
  - Temporal Technologies, Staff Solutions Architect (Germany, remote DACH): **€165,000–€185,000
    OTE** ([Greenhouse posting](https://job-boards.greenhouse.io/temporaltechnologies/jobs/5083396007)).
  - dbt Labs, Staff Solutions Architect (Central US) — posting confirmed to exist ([Greenhouse
    posting](https://boards.greenhouse.io/embed/job_app?token=4581967005)), specific range not
    extracted; flagged as open item below.

## Career ladder

GitLab's public handbook gives one of the clearest documented ladders and is used here as a
representative structure (title conventions vary by company, but the shape is consistent across
vendor-side SA orgs):

1. Associate Solutions Architect — entry-level, building foundational technical expertise
2. Solutions Architect — owns customer success plans independently
3. Senior Solutions Architect — complex deal ownership, mentors juniors
4. Staff Solutions Architect — company-wide scope, geographic/multi-segment impact
5. Principal Solutions Architect — global influence, recognized external industry authority
6. Branches into management: Manager → Senior Manager → Director → Senior Director → VP (Solutions
   Engineering/Architecture)

([GitLab Handbook — Solutions Architect](https://handbook.gitlab.com/job-families/sales/solutions-architect/))

Beyond Principal, individual contributors sometimes reach "Distinguished Architect" or field-CTO
style roles; management-track SAs become VP of Solutions Engineering/Architecture.

## Common entry paths

- Lateral from Software Engineering — particularly common at cloud infrastructure vendors, where
  deep hands-on system-design skill is a prerequisite and the job is pitched internally as "still
  very technical, just pointed at customers."
  ([AWS careers blog — "Unique paths to rewarding solutions architect careers at
  AWS"](https://aws.amazon.com/careers/life-at-aws-5-employees-share-their-unique-paths-to-rewarding-solutions-architect-careers-at-aws/)
  profiles employees who moved in from engineering and other technical backgrounds.)
- Promotion/lateral from Sales Engineer — natural adjacent move for SEs who want to own larger,
  more strategic accounts and longer-horizon technical narratives rather than single-deal demos.
- Lateral from Solutions Consulting/Customer Success Engineering.
- Direct hire from consulting-side SA or systems-integrator roles, bringing multi-vendor
  architecture experience into a single-vendor advocate role.

## Common exit paths

- Consulting-side Solutions Architect (moving from single-vendor advocacy to multi-vendor,
  client-first advisory).
- Enterprise Architect or Software/Systems Architect (deeper single-org technical ownership).
- CTO or VP Engineering track at smaller companies, leveraging breadth across many customer
  architectures ("architects who develop strong leadership and business acumen may transition
  into CTO or enterprise architect roles" — [LeanIX — Solution Architect: Skill Sets, Career
  Paths](https://www.leanix.net/en/wiki/it-architecture/solution-architect)).
- Product Management / Technical Product Management — "a plausible and frequent move," though it
  "requires conscious skill-shifting and evidence of product-oriented impact" (same LeanIX
  synthesis, corroborated in [Quora discussion on SA-to-PM
  moves](https://www.quora.com/What-is-the-next-role-available-after-solution-architect-Can-someone-aspire-to-be-a-product-manager-or-technical-product-manager)).
- Sales Engineering or full sales (AE) leadership, given the deal-cycle fluency built up over time.

## Top misconceptions vs. reality

1. **"It's not real engineering — you just talk, you don't build."** Reality: vendor SAs hand-build
   POC environments against real customer data/infrastructure under time pressure, produce TCO and
   migration architecture that customer engineering teams will hold them accountable for post-sale,
   and are frequently required to hold the same technical certifications (e.g., AWS Solutions
   Architect Professional) as engineers who never touch a customer. One forum debate captures the
   stereotype directly — "SWE just puts blocks together... [SA is] more like a technician" — countered
   by practitioners describing the role as "part software engineer, part project manager, part
   researcher, part designer, and part business manager" ([search synthesis of Solutions Architect
   vs Software Engineer
   discourse](https://www.institutedata.com/us/blog/solutions-architect-software-engineer/), citing
   community debate).
2. **"SA is just a fancier title for Sales Engineer."** Reality: scope and account strategic value
   differ — vendor SAs more often own multi-year transformation narratives and executive
   relationships, not single-product demos, and the ladder (Associate through Principal at GitLab)
   is deliberately deeper than most SE ladders.
3. **"There's no accountability — if the deal fails, only the AE and SE take the heat."** Reality:
   vendor SAs carry sales-KPI-linked variable comp in most orgs (GitLab handbook explicitly lists
   new bookings and win rate as SA success metrics) — the incentive exposure is real, not
   symbolic.

## Open questions / notes for cross-review

- dbt Labs Staff SA posting confirmed but specific comp range not extracted in this pass — low
  priority, comp picture is already well-triangulated from AWS/Salesforce/Glean/Temporal data.
- The vendor/consulting split is a judgment call (see reasoning above); if Phase 2 dimension
  scoring finds the two archetypes land in nearly identical positions on every trait dimension,
  consider merging with a "context" sub-tag instead of two full archetypes — flag for the Phase 1
  cross-review pass.
- Title collision with "Solutions Engineer" (used by some vendors as a synonym for this role,
  by others as a synonym for Sales Engineer) is a real risk for user confusion in the assessment
  UI; recommend the results-copy pass (Phase 3) explicitly disambiguate by employer type rather
  than by title alone.
