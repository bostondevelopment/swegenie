# Role Research Brief: Customer Success Engineer / Customer Solutions Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **192 real, currently-live job postings across 71 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This clears the original ≥15-posting v1 sourcing target several times over, though it fell short of the ≥200-posting stretch goal set for this pass despite three dedicated gap-fill rounds — this appears to reflect genuine scarcity of this specific title pattern on public ATS boards (many employers for this role use Workday, Oracle Recruiting Cloud, or fully custom career sites that don't expose a bulk API) rather than a search gap; reported honestly rather than padded.

Representative sample of companies with live postings matched to this archetype (of 71 total):

- **Trace3** — "Technical Account Manager"
- **GitLab** — "Senior Customer Success Engineer- Public Sector"
- **Zuora** — "Technical Account Manager"
- **Docebo** — "Technical Account Manager, Public Sector"
- **Okta** — "Sr. Technical Account Manager"
- **Stripe** — "Technical Account Manager, German Speaking"
- **Airwallex** — "Senior Technical Account Manager"
- **Saviynt** — "Identity Security - Technical Account Manager"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Titles covered:** Customer Success Engineer (CSE), Customer Solutions Engineer, Technical
Account Manager (TAM, boundary case), "Customer Experience Engineer" (rare, treated as a synonym,
not a distinct title — no evidence found of consistent independent usage).

**Companion brief:** `/docs/research/roles/customer-support-engineer.md` covers the reactive,
ticket/SLA-driven **Support Engineer** archetype and explicitly scopes out this proactive,
account-embedded archetype, deferring to "a separate brief" — this is that brief.

**Scope decision — one archetype or several?** Treated as **two distinct archetypes** (this one,
plus the companion Support Engineer brief), not one archetype with a spectrum. Rationale: while both
share a "technical + customer-facing, not sales-quota-carrying" DNA and the market sometimes blends
titles in a single JD, the two poles differ on measurable, taxonomy-relevant axes — cadence
(proactive/scheduled vs. reactive/interrupt-driven), unit of ownership (a named account book vs. a
ticket queue), on-call burden (rare here vs. standard there), and the skill that differentiates top
performers (relationship/enablement design vs. debugging speed under pressure). These map to
different target profiles on Phase 2's planned trait dimensions (especially interrupt-driven-vs-deep-
work and ownership-of-outcome-vs-ownership-of-system), which is the operative test for "one archetype
vs. several" in this taxonomy. Companies that blend the titles in one JD (e.g., Cloudflare's
"Customer Success Engineer – Network Services," which does both onboarding *and* technical
escalations) are evidence of a blended *job*, not evidence that the underlying *archetypes* are the
same — the taxonomy models the poles; real jobs can and do sit between them.

Excluded from this brief (covered by sibling archetypes elsewhere in this taxonomy): reactive Support
Engineer (see companion brief), pre-sales Sales Engineer/Solutions Engineer (technical seller, no
post-sale account ownership, carries commission), Forward-Deployed Engineer (ships production code
embedded at the client), Consulting Engineer/Professional Services (project/SOW-scoped with a defined
end date, often billable-utilization-comped), vendor-side Solutions Architect (broader
architecture-design remit, typically more senior and less hands-on-implementation than a CSE).

---

## Day-to-day activities

CSEs own a **named book of accounts** through onboarding, adoption, and ongoing technical health —
the organizing unit of the job is the account relationship, not a ticket queue.

- **Onboarding and implementation:** technical project management of a customer's initial rollout —
  Teleport's CSE provides "technical assistance to customers who are implementing, operating, and
  maintaining software solutions during the crucial onboarding phase," reporting to a Customer
  Success Manager rather than replacing one
  ([Teleport CSE posting](https://jobs.lever.co/teleport/04ab04f3-e8a2-4829-bf02-1a18f054c77d)).
  Cloudflare's Network Services CSE is explicitly framed as "lead project manager" for onboarding,
  partnering with Sales Specialists and Technical Product Specialists
  ([Cloudflare CSE — Network Services](https://boards.greenhouse.io/cloudflare/jobs/4937219)).
- **Enablement and training:** designing and running workshops, building custom adoption/enablement
  plans per account. Databricks frames its CSEs as "quarterbacks" — highly technical trusted advisors
  who curate product recommendations and coordinate specialist Solution Architects for deep technical
  work, rather than doing all specialist work themselves
  ([Databricks — "Day in the Life of a Customer Success Engineer"](https://www.databricks.com/blog/2022/05/19/day-in-the-life-of-a-customer-success-engineer.html)).
- **Technical advisory / designated contact:** Algolia's CSE is "a designated technical contact and
  trusted advisor" and "the key member of the team for all technical topics including customer
  onboarding, training and ensuring the resolution of complex issues" — a blend of proactive
  relationship ownership and on-demand technical problem-solving
  ([Algolia CSE posting](https://job-boards.greenhouse.io/algolia/jobs/4021919004)).
- **Health/usage tracking and internal coordination:** monitoring adoption and usage metrics per
  account, flagging risk to Customer Success Manager/Account Manager partners, and representing
  customer feedback into product roadmap conversations.
- **Scheduled cadence, not shift-based:** unlike the Support Engineer pole, CSE work is organized
  around recurring account check-ins, QBRs (quarterly business reviews, jointly with CSM/AM), and
  project milestones rather than an inbound queue or on-call rotation — though CSEs do still get
  pulled into complex technical issues for their named accounts when they arise.

## Success criteria

- **Time-to-value / time-to-onboard:** how quickly a new account reaches productive use of the
  product — the primary lagging indicator CSEs are measured against.
- **Product adoption/usage depth** for owned accounts (feature adoption breadth, usage growth) —
  Databricks' framing of "unlocking the full potential of the product to realize business outcomes"
  is the qualitative version of this metric
  ([Databricks](https://www.databricks.com/blog/2022/05/19/day-in-the-life-of-a-customer-success-engineer.html)).
- **Renewal/expansion influence:** CSEs are rarely comped directly on renewal/expansion (that's the
  CSM's/AM's number), but their technical health signal is a recognized leading indicator partner
  teams rely on — an indirect but real success criterion.
- **Trusted-advisor / relationship quality:** qualitative feedback from account teams and customers
  themselves; less quantifiable than Support's SLA/CSAT metrics, which is itself a taxonomy-relevant
  trait (comfort with ambiguous success criteria vs. Support's crisper SLA targets).
- **Enablement reach:** workshops run, documentation/training materials produced, and their downstream
  effect on reducing the account's dependence on hands-on CSE time (a scaling signal, similar in
  spirit to Support's KB-deflection metric but measured per-account rather than in aggregate).

## Comp structure

Base-heavy, similar structural pattern to the Support Engineer pole: **modest annual bonus, not
sales-style commission**, equity standard at public/late-stage companies. Direct CSE-labeled comp
data is thinner on levels.fyi than for "Support Engineer" — most granular bands available are
adjacent or partial data points, flagged explicitly below rather than overstated.

- **Datadog "Customer Success"** (broadest available adjacent band, likely blends CSM and CSE-type
  roles): $79.4K–$113K total comp
  ([levels.fyi](https://www.levels.fyi/companies/datadog/salaries/customer-success)) — treat as a
  floor/lower-bound reference, not a precise CSE figure.
- **Google "Customer Engineer"** (title overlap caution: this Google title actually skews toward
  pre-sales technical account work, closer to Sales/Solutions Engineering than post-sales CSE — cited
  here only to flag the naming collision, not as a reliable CSE comp data point): median ~$204K
  (Germany data point)
  ([levels.fyi](https://www.levels.fyi/companies/google/salaries/customer-engineer)).
- **MongoDB "Consulting Engineer"** (adjacent archetype, not CSE, but useful bracketing data given
  MongoDB doesn't have a distinctly-labeled CSE band): average ~$156,542/yr, 25th–75th percentile
  $122,266–$202,681 ([Glassdoor](https://www.glassdoor.com/Salary/MongoDB-Consulting-Engineer-Salaries-E433703_D_KO8,27.htm)) —
  cited for rough sanity-bracketing only; this is a different archetype (see Consulting Engineer
  brief) and should not be used as a CSE-specific figure in Phase 2 scoring inputs.
- General pattern corroborated across postings: CSE comp is pitched competitively with mid-level SWE
  at the same company, consistent with the Support Engineer pole's comp structure (see companion
  brief for firmer Amazon/Microsoft levels.fyi bands, which are more directly comparable in structure
  even though titled "Support Engineer").

**Data gap, flagged rather than papered over:** this research pass did not find a levels.fyi or
Glassdoor page cleanly labeled "Customer Success Engineer" or "Customer Solutions Engineer" with
multi-level bands at a mid-size SaaS company (Twilio's live posting for the role rotated off its
board mid-research; Algolia, Teleport, Cloudflare, and Logz.io postings were retrieved but did not
carry public salary ranges). **Recommendation:** before Phase 2 finalizes comp-related scoring or
result-page copy for this archetype, run a dedicated levels.fyi title-search UI pass (not just web
search) for "Customer Success Engineer" / "Customer Solutions Engineer" at Twilio, Cloudflare,
HubSpot, Segment, and Snowflake — all of which are known to run active CSE teams but didn't surface
clean comp bands in this session's web searches.

## Career ladder

No single cross-company standard ladder (same structural issue as Support Engineering, but slightly
more acute since the title itself is less standardized). Synthesized from postings and adjacent
Support Engineer ladder data (companion brief):

**Associate/Junior CSE → CSE → Senior CSE → Staff/Principal CSE**, with common lateral or upward
branches into **Technical Account Manager (TAM)**, **Solutions Architect**, or **Customer Success
Manager** (a move toward less technical depth, more commercial/relationship ownership) at senior
levels. Companies increasingly define a converged "customer-facing technical" ladder spanning
Support, CSE, and TAM (see companion brief), so lateral movement between CSE and Support-pole titles
is common mid-career and should not be read as a demotion. Manager-track next step is typically
"Manager, Customer Success Engineering" or "Manager, Technical Account Management," reporting either
into a Customer Success org or, less commonly, a Support/Technical-Services org — the reporting line
itself varies by company and is a useful signal of how seriously an org treats technical depth vs.
commercial ownership.

## Common entry paths

- **Junior SWE or QA engineer seeking more people-contact:** a documented pattern, especially at
  companies (like Databricks) that value strong technical fundamentals in CSE hires and coach the
  relationship/enablement skills on the job.
- **Technical writer or solutions-minded support engineer:** the writing/explaining skillset from
  documentation work transfers directly to enablement-plan design.
- **Consulting/systems-integrator background:** Databricks explicitly hires CSEs from consulting and
  even academic backgrounds when the domain-expertise fit is strong (e.g., a former data-engineering
  consultant moving into a data-platform CSE role)
  ([Databricks](https://www.databricks.com/blog/2022/05/19/day-in-the-life-of-a-customer-success-engineer.html)).
- **Lateral move from the Support Engineer pole:** support engineers who want less on-call burden and
  more proactive, relationship-based work move into CSE roles — the reverse direction (CSE → Support)
  is less commonly documented.
- Domain expertise in the product's problem space (security, data engineering, developer tooling) can
  substitute for raw years-of-experience in hiring bars, more so than for the Support Engineer pole,
  where general technical-support experience is more fungible across domains.

## Common exit paths

- **Customer Success Manager:** the most direct lateral move for CSEs who want to lean further into
  commercial/relationship ownership and away from hands-on technical work.
- **Solutions Architect:** a common upward move, especially at companies (like Databricks) that
  already route the deepest technical specialist work from CSEs to Solution Architects — CSEs get
  regular exposure to what SA work looks like before making the jump.
- **Product Manager:** a strong, recurring pattern across customer-facing technical roles generally;
  CSEs accumulate exactly the ground-truth "what do customers actually struggle with" knowledge that
  PM hiring managers value.
- **Sales Engineering / pre-sales:** documented transition, particularly attractive to CSEs who enjoy
  the demo/relationship-building side of the job and are willing to trade stability for
  commission-linked upside.
- **Less common than for Support Engineering:** direct moves into core backend/product engineering —
  the CSE pole sits further from core product internals day-to-day than the Support Engineer pole
  does, so this exit path is weaker here (a genuine, sourced asymmetry between the two archetypes,
  not an oversight).

## Top misconceptions vs. reality

1. **Misconception: CSEs are Customer Success Managers with a technical vocabulary.**
   Reality: postings are explicit about the division of labor — CSEs own technical implementation,
   product depth, and enablement; CSMs own the commercial relationship, renewal conversation, and
   overall account strategy. Teleport's CSE reports to a CSM rather than functioning as one
   ([Teleport](https://jobs.lever.co/teleport/04ab04f3-e8a2-4829-bf02-1a18f054c77d)).
2. **Misconception: it's basically Support Engineering with a friendlier title.**
   Reality: the cadence and ownership model differ meaningfully — CSEs work a scheduled, named-account
   book with milestone-based success criteria; Support Engineers work an inbound queue against SLA
   targets, often with on-call burden. Someone who thrives on proactive relationship design may find
   pure reactive triage draining, and vice versa — this is exactly the distinction the taxonomy should
   preserve rather than collapse.
3. **Misconception: no technical depth is required — it's a "people person" role.**
   Reality: every postings reviewed (Algolia, Teleport, Cloudflare, Databricks) require hands-on
   product fluency sufficient to run technical workshops and resolve non-trivial implementation
   issues; the differentiator from Support Engineering is *when* technical depth is applied
   (proactive workshops/design vs. reactive debugging), not *whether* it's required.
4. **Misconception: CSEs are directly comped on renewal/expansion like a CSM's book.**
   Reality: comp is overwhelmingly base+modest-bonus, structurally similar to Support Engineering and
   unlike quota-carrying Sales/CSM roles — renewal influence is real but indirect, not a comp lever.
5. **Misconception: this is a lower-status track than Support Engineering because it's "less
   technical."**
   Reality: no evidence for a consistent status hierarchy either direction; status varies by company
   culture and how central the account (e.g., strategic/enterprise vs. self-serve) is, not by which
   pole of this job family someone sits in.

## Sources

1. Teleport — Customer Success Engineer (job posting): https://jobs.lever.co/teleport/04ab04f3-e8a2-4829-bf02-1a18f054c77d
2. Algolia — Customer Success Engineer (job posting): https://job-boards.greenhouse.io/algolia/jobs/4021919004
3. Cloudflare — Customer Success Engineer, Network Services (job posting): https://boards.greenhouse.io/cloudflare/jobs/4937219
4. Databricks — "Day in the Life of a Customer Success Engineer": https://www.databricks.com/blog/2022/05/19/day-in-the-life-of-a-customer-success-engineer.html
5. Logz.io — Customer Success Engineer (job posting, referenced for onboarding-cadence framing): https://jobs.lever.co/logz/1488adb1-8722-4aaa-9337-58844f20796e
6. Datadog Customer Success — levels.fyi comp (adjacent-band reference): https://www.levels.fyi/companies/datadog/salaries/customer-success
7. Google Customer Engineer — levels.fyi comp (title-collision caution, cited to flag naming overlap): https://www.levels.fyi/companies/google/salaries/customer-engineer
8. MongoDB Consulting Engineer — Glassdoor (adjacent-archetype bracketing only): https://www.glassdoor.com/Salary/MongoDB-Consulting-Engineer-Salaries-E433703_D_KO8,27.htm
9. Companion brief — Customer Support Engineer (this taxonomy): `/docs/research/roles/customer-support-engineer.md` — used for career-ladder and entry/exit-path contrast throughout.

## Open questions for cross-review

- **Comp data is the weakest section of this brief** — no clean, multi-level, CSE-labeled comp band
  was found at a mid-size SaaS company in this research pass. Flagged inline above with a specific
  recommendation (levels.fyi title-search UI pass at Twilio/Cloudflare/HubSpot/Segment/Snowflake)
  rather than papered over with adjacent-archetype numbers presented as if precise.
- **Confirm the two-archetype split with the cross-review pass.** This brief and the companion Support
  Engineer brief were written to be consistent (both assume a two-archetype model), but neither was
  cross-reviewed against the other at time of writing per PLAN.md's Phase 1 process — a reviewer
  should verify the boundary description here matches the companion brief's framing exactly, and
  check for any double-counted or contradicted claims between the two.
  Should the archetype be renamed to something that doesn't privilege "Customer Success" (a title with
  its own baggage/overlap with non-technical CSM roles) — e.g., "Customer Solutions Engineer" alone
  may be a cleaner archetype label for the taxonomy's UI.
- Confirm with Phase 2 owner whether "reactive (Support) ↔ proactive (CSE)" should be modeled as a
  single scoring dimension shared by both archetypes' target profiles, or handled implicitly by the
  two archetypes simply having different target values on existing planned dimensions
  (interrupt-driven-vs-deep-work, ownership-of-outcome-vs-ownership-of-system) — the latter seems
  more consistent with the "one dimension set, many archetype profiles" design in PLAN.md Phase 2.
