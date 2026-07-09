# Taxonomy v1.1: Account & Relationship Ownership Split — Research Basis

**Status:** Post-launch fix, 2026-07-09. A real user completing the assessment reported that the
single "Account & Relationship Ownership" dimension (v1.0) didn't match what they'd heard directly
from practitioners: a Customer Success Engineer (CSE) team that manages many concurrent
relationships, and a Forward Deployed Engineer (FDE) team where some roles are single-client and
others are multi-client. Rather than recalibrate on that anecdote alone, this research pulled real,
recent (2026-05 to 2026-06) job description evidence to check the claim before touching the
taxonomy. It confirmed the conflation and is the evidence basis for splitting the dimension into
`account_portfolio_breadth` and `relationship_continuity` in `taxonomy/dimensions.json` v1.1, and
for the corresponding rescoring in `taxonomy/archetypes.json`.

# JD Cache Research: Account/Relationship Breadth & Persistence by Archetype

Source: /Users/michael/Documents/Code/resume_workshop/job-search-runs/jd-cache/ (149 JD files, 2026-05 to 2026-06) — a personal job-search cache with real, current job posting text (ignoring resume/profile content in that same folder, which is unrelated to this research).

---

## 1. Forward Deployed Engineer (FDE)

**Files reviewed:** 11 substantive (Anthropic, Cresta, Defense Unicorns, Palantir, Axiomatic AI, Ramp, Warp, Aledade, Code Metal, JetBrains, OpenRouter). Jellyfish file was an uncached LinkedIn search stub with no JD content — excluded.

**Summary pattern:** FDE is NOT a single breadth pattern. There is a clear bimodal split: (a) a "classic" single-client deep-embed model where the FDE is dedicated to one strategic customer/account for the engagement duration (Anthropic, Palantir, Defense Unicorns, Axiomatic AI, Code Metal, Aledade — internal cohort-embed variant), and (b) a "portfolio/queue" model where the FDE rotates across many customers in a post-sales/support-like motion, closer to a scaled solutions-engineering job (Ramp, Cresta, Warp, JetBrains at Principal level managing multiple accounts + partners, OpenRouter explicitly "a set of post-sales customers"). Persistence also varies: some are indefinite trusted-advisor relationships that deepen over an "engagement lifecycle," others are bounded onboarding/adoption sprints (30/60/90-day ramps, then move to next customer).

**Breadth distribution:** 5 of 11 clearly single-client embed (Anthropic, Palantir, Defense Unicorns, Axiomatic AI's "customer organizations" language, Code Metal); 5 of 11 explicitly multi-account/portfolio (Cresta, Ramp, Warp["hundreds of cloud agents"/enterprise implementations plural], JetBrains Principal [mentoring across "complex deployments," partner ecosystem], OpenRouter ["a set of post-sales customers"]); 1 ambiguous/internal-facing (Aledade — embeds with one internal "PTA cohort," not an external client, so it's single-team but not a commercial account at all — a third pattern: internal stakeholder embed).

| Company | Quote | Interpretation |
|---|---|---|
| Anthropic | "embeds directly with our most strategic customers" (plural in aggregate, but "Build long term relationships with customers... throughout the lifecycle of an engagement" implies dedicated per-engagement embed) | Single-client deep embed per engagement; indefinite/ongoing during engagement lifecycle |
| Palantir | "work in small teams to own delivery of high stakes projects with clients" — "hands-on AI startup CTO" analogy | Single or very few clients at a time, deep ownership; project/strategic-account persistence |
| Defense Unicorns | "Embed with strategic customers as a technical partner, working from problem discovery to solution implementation and customer adoption" | Single-client embed (singular "a technical partner"), full lifecycle persistence |
| Axiomatic AI | "work directly with engineers, researchers, and engineering leadership at customer organizations" during "pilots, evaluations, and early production deployments" | Single-client-at-a-time deep technical embed, project/pilot-bounded but can extend to production |
| Code Metal | "Own end-to-end deployment of customer solutions... often in high-stakes, mission-critical environments" + travel "30-75% depending on the customer" (singular "the customer" per stint) | Single-client-at-a-time, project-bounded (per deployment), can be long and technically deep |
| Cresta | "ensuring high-impact AI Agent deployments" + "Conduct interactive demos... to prospective customers" + "Serve as a trusted technical advisor for the customer" (implies rotating across many named accounts, demo-heavy, pre- and post-sales mixed) | Portfolio of multiple concurrent customer engagements, mix of transactional (demos/POCs) and ongoing advisor relationships |
| Ramp | "build agents to serve our largest customers" (plural) + "Collaborate closely with Sales, Solutions, Customer Success, and Account Management to close deals, activate customers, and expand value **over time**" | Multi-account portfolio of "largest customers," ongoing/expanding relationships, not single-client |
| Warp | "Own end-to-end enterprise implementations" (plural implementations) + "Accelerate deals through technical execution; join customer calls from first discovery" | Multiple concurrent enterprise implementations; project/deal-bounded then transitions to production support |
| JetBrains (Principal FDE) | "help with complex deployments" + "Mentor and support other Forward Deployed Engineers" + client base "420 of the Fortune 500" (aggregate book, Principal oversees/supports many) | Portfolio/oversight across many enterprise accounts and partners; ongoing trusted-advisor at leadership level |
| OpenRouter | "own technical success for **a set of** post-sales customers" (90-day target, explicit "set") + "Lead technical onboarding for new customers after contract close" | Explicit portfolio of multiple concurrent post-sales customer accounts; time-boxed onboarding (30/60/90 day) transitioning to ongoing account ownership |
| Aledade (FDE, AI Enablement) | "embeds directly with a PTA cohort — Point of Care, Risk, Data, or another team" (singular team per embed) | Single internal team/stakeholder embed (not external client) — a third pattern: internal deep-embed, project/quarter-bounded then rotates to next cohort |

**Key finding:** FDE explicitly is NOT single-client-always. Defense/enterprise-AI-adjacent FDEs (Anthropic, Palantir, Defense Unicorns, Axiomatic, Code Metal) = single deep embed. Scaled product/platform companies running FDE as a post-sales function at volume (Cresta, Ramp, Warp, OpenRouter, JetBrains) = portfolio of several-to-many concurrent accounts. This is a real bimodal split within one archetype title, driven by company stage/motion, not noise.

---

## 2. Customer Success / Customer Solutions / CSM / TAM

**Files reviewed:** 4 substantive (dbt Labs Sr. Customer Solutions Engineer, dbt Labs Sr. Customer Solutions Resident Architect, LaunchDarkly Strategic CSM, Upbound Customer Success Account Manager). 3 of 7 were uncached stubs with no JD body (mabl Head of CS/TAM, Datadog CSM, StrongDM CS Solutions Architect) and are excluded from quote analysis.

**Summary pattern:** This cluster is explicitly a LARGE PORTFOLIO model across every substantive file — the opposite of "one deep relationship." dbt Labs' Sr. Customer Solutions Engineer handles ticket-based support "across our customer base" at a quota of "6-10 cases per 4-hour shift" — extremely high-breadth, low-depth-per-interaction, transactional. dbt's Resident Architect role explicitly manages "multiple simultaneous engagements" with defined start/end dates, i.e., a rotating caseload of time-boxed projects across many accounts, not one relationship. LaunchDarkly's Strategic CSM "owns a number" (a book of accounts with a quota) and runs proactive/reactive motions across "new and expanding customers" (plural, portfolio). Upbound's CSAM explicitly "map[s] every account" (plural accounts) and treats renewal/expansion as a portfolio management discipline. Persistence is real (renewal cycles, QBRs, ongoing trusted-advisor motion) but the breadth is always a book/queue, never a single embedded relationship.

**Breadth distribution:** 4 of 4 substantive postings described a portfolio/book of many accounts (0 described single-relationship embed). Persistence varied: 1 (dbt Sr CSE) is closer to transactional/ticket-based (many short interactions per account); 3 (dbt RA, LaunchDarkly, Upbound) describe ongoing, indefinite "trusted advisor"/renewal-cycle relationships layered on top of a multi-account book.

| Company | Quote | Interpretation |
|---|---|---|
| dbt Labs (Sr Customer Solutions Engineer) | "working deeply across our customer base" + "handle 6–10 cases per 4-hour shift" | Very high-breadth, ticket/queue-based; many customers per day, low persistence per case (transactional support) |
| dbt Labs (Sr Customer Solutions Resident Architect) | "Engage on multiple projects simultaneously with clear scoping, start and end dates" + "managing scope, timelines, and stakeholder expectations across multiple simultaneous engagements" | Portfolio of concurrent, time-boxed (project/SOW-like) engagements across several strategic accounts at once — not single-client, not purely transactional either |
| LaunchDarkly (Strategic CSM) | "own a number and forecast on a weekly basis" (implies book of accounts with a renewal quota) + "shepherd in new customers... assessing customer's adoption on an ongoing basis" | Book/portfolio of accounts, ongoing indefinite relationship per account (renewal-cycle driven), commercially accountable across the whole book |
| Upbound (Customer Success Account Manager) | "Map every account" + "Build genuine, trusted relationships across your accounts" + "own the post-sale relationship for our Commercial segment" | Explicit multi-account portfolio ("every account," "accounts" plural throughout); ongoing/indefinite trusted-advisor relationship, renewal-driven |

**Key finding:** Every substantive CSE/CSM/TAM posting in this cache describes a portfolio of concurrent accounts (a "book" or "segment"), never a single deep-embedded relationship. This confirms the bug report's premise that CSE ≠ "one deep relationship" — real postings show CSE/CSM as inherently multi-account, with depth/persistence being a secondary axis (transactional ticket queue vs. ongoing renewal-cycle trusted advisor) that varies independently of breadth.

---

## 3. Solutions Architect

**Files reviewed:** Of 11 filename matches, only 4 had substantive JD content: Temporal (Sr Manager, Solutions Architecture), Lovable (Solutions Architect), Proton.ai (Solutions Architect), KnowBe4 (Solution Architect — **internal**, not customer-facing, excluded from relationship analysis but noted). 7 were uncached stubs (BlueConic, New Relic, Upbound Staff SA, StrongDM, Trace3, Vonage, and a second KnowBe4 duplicate with image-embedded body).

**Summary pattern:** Pre-sales Solutions Architect roles are structurally a portfolio/pipeline model — SAs are paired with Account Executives across a **territory or segment of accounts** (not one client), and the relationship is inherently transactional/deal-bounded pre-sale, converting to a lighter-touch advisory relationship post-sale (with clean hand-off to Implementation/CS in some cases). Depth of any single account relationship is shallower than FDE/CSE because SAs support deal cycles across many prospects/customers concurrently, though "trusted technical voice post-launch" (Proton.ai) shows some persistence beyond the sale.

**Breadth distribution:** 3 of 3 external-facing SA postings (Temporal, Lovable, Proton.ai) describe multi-account/territory coverage, not single-client embed. 0 described single-client-only. Persistence: primarily deal/sales-cycle-bounded (pre-sales), with Proton.ai and Temporal noting some post-sale continuity ("trusted technical voice post-launch"; "seamless post-sale transitions and ongoing expansion" via CS handoff — implying the SA's own relationship shortens once CS/Implementation takes over).

| Company | Quote | Interpretation |
|---|---|---|
| Temporal (Sr Manager, Solutions Architecture) | team "supporting Scale and Enterprise accounts" (plural accounts across a team) + "Partner closely with Sales leadership... to build and execute comprehensive **account strategies**" (plural) + "ensure seamless post-sale transitions" to CS/Professional Services | Territory/segment of many Scale+Enterprise accounts per team; SA relationship is pre-sale/deal-bounded, formally handed off post-sale |
| Lovable | "Serve as Lovable's technical voice in **key enterprise deals**" (plural deals) + "Develop repeatable frameworks for demos and proofs-of-value" (implies repeated use across many prospects) | Multi-deal/multi-account pipeline coverage; relationship is deal-cycle bounded (pre-sales), reusable playbook approach signals breadth over depth |
| Proton.ai | "Own solution design through the sales cycle; clean hand-off to Implementation" + "Serve as trusted technical voice **post-launch**" | Deal-bounded ownership pre-sale (one deal at a time within a pipeline of many), but some persistence afterward as an ongoing but lighter-touch advisor once implementation owns the account |
| KnowBe4 (internal SA — not customer-facing) | "bridging business needs and engineering execution" for **internal** Salesforce/NetSuite/Workday/Mulesoft systems | Not applicable to external client relationship-breadth question — this SA variant has no external customer portfolio at all (internal enterprise architecture role); flags that "Solutions Architect" as a title is itself overloaded across customer-facing and internal-only variants |

**Key finding:** Solutions Architect (pre-sales) shows a different pattern than FDE/CSE: consistently a territory/pipeline of many concurrent deals/accounts, but depth per account is shallower and time-boxed to the sales cycle, with some roles explicitly handing off long-term relationship ownership to CS/Implementation once the deal closes. This is a THIRD distinct pattern (wide + shallow/transactional) that doesn't fit neatly on a single depth-vs-breadth line without a persistence axis.

---

## 4. Sales Engineer

**Files reviewed:** 5 of 5 filename matches had usable content (Saviynt Sales Engineering Manager, Branch Sr. Sales Engineer, Abnormal AI SE-Enterprise Boston [thin/estimated], CoreView SE Public Sector, Vantage SE).

**Summary pattern:** Uniformly a **territory model** — every posting frames the SE as covering a named territory or account segment alongside one or more Account Executives, not a single client. CoreView explicitly names "SLED accounts in North America" (plural, regional). Vantage explicitly says SEs work "alongside Account Executives to help prospective customers **across all segments**." Abnormal AI's posting is literally titled by territory ("Sales Engineer, Enterprise (Boston)"), confirming a geography/territory-based book. Saviynt's posting is a manager role overseeing a team of SEs doing "high-impact customer engagements" across many accounts. Persistence is deal-cycle-bounded pre-sale (demos, POCs, RFPs) with some continuing "trusted advisor" framing (Vantage) that could extend post-sale, but the core unit of work is one deal/prospect at a time inside a larger territory queue — never a single long-term embedded account.

**Breadth distribution:** 5 of 5 described territory/multi-account coverage; 0 described single-client dedication. Persistence: predominantly deal/sales-cycle-bounded (transactional per opportunity), though "trusted advisor" language (Vantage, Saviynt) signals some SEs maintain relationships across multiple sales cycles with the same enterprise account (expansion deals).

| Company | Quote | Interpretation |
|---|---|---|
| Saviynt (Sales Engineering Mgr) | "Oversee and participate in high-impact customer engagements" + "Build and maintain relationships with key customer stakeholders" (team-level, many accounts) | Manages a team covering many concurrent enterprise engagements; relationship persistence varies deal to deal but stakeholder relationships can be maintained across cycles |
| CoreView | "support North American State, Local Government, and Education (SLED) accounts throughout the sales cycle" (plural accounts, regional book) | Territory/segment coverage (SLED, North America); relationship is sales-cycle-bounded per account, repeated across many accounts |
| Vantage | "help prospective customers **across all segments** integrate their cloud infrastructure" + "Act as a trusted advisor to customer engineering and business stakeholders" | Explicit multi-segment/multi-account coverage; deal-bounded but "trusted advisor" language implies some continuity with the same accounts over time (expansion) |
| Abnormal AI | Role title itself: "Sales Engineer, Enterprise (**Boston**)" — territory-named role paired with a regional AE | Geographic territory model — one SE covers all enterprise opportunities in a metro/region, not one client |
| Branch | (Thin file — "5+ yr pre-sales SE/SA... FinTech preferred") | Insufficient detail to quote breadth, but standard SE title implies same territory/pipeline pattern as peers |

**Key finding:** Sales Engineer is the most consistent cluster — 100% of substantive postings describe territory/segment/multi-account coverage. No evidence of single-client SE roles in this cache. This is squarely a "wide portfolio, mostly transactional/deal-bounded" pattern, similar to Solutions Architect but even more explicitly org-structured around territories paired 1:1 or 1:few with Account Executives.

---

## 5. Support/Implementation Engineer

**Files reviewed:** Of 10 filename matches, only 3 had substantive JD content: Submittable (Implementation Specialist), Warp (Implementation Engineer), Paperless Parts (Sr. Manager, Implementation Project Management). 7 were uncached stubs (Educate!, Abridge, AcuityMD, Branch Sr. Implementation Consultant, Degreed, Tonkean, and the Paperless Parts file is a companion questions-doc, not double-counted).

**Summary pattern:** This cluster shows a **time-boxed, multi-concurrent-project** model distinct from both the CSE portfolio (indefinite/renewal-driven) and the SA/SE territory model (deal-cycle/pre-sale). Implementation roles explicitly manage several simultaneous onboarding projects, each with a defined start (kickoff/sales handoff) and end (go-live/"transition to Customer Success"), i.e., project/SOW-bounded persistence, but breadth is a caseload of concurrent clients, not one. Submittable: "manage multiple client engagements simultaneously." Warp: "manage multiple concurrent customer engagements at high quality" using an explicit "multi-week structured support program" (kickoff → weekly sessions → wrap-up). Paperless Parts describes a team overseeing "concurrent customer engagements" at scale with formal capacity/resource planning across a caseload, and an explicit hand-off "from sales handoff through go-live and transition to Customer Success" — meaning once implementation ends, the deep relationship formally passes to another archetype (CSE), sharply bounding the FDE/CSE-style indefinite persistence.

**Breadth distribution:** 3 of 3 substantive postings described multiple concurrent client engagements (a caseload), 0 described single-client dedication. Persistence: uniformly project/SOW-bounded (has a defined start and end — onboarding through go-live), explicitly NOT indefinite; the relationship is formally hand off to CS/Support once implementation completes.

| Company | Quote | Interpretation |
|---|---|---|
| Submittable | "Own the client onboarding experience from kick-off to launch" + "Strong project management skills with the ability to manage multiple client engagements simultaneously" | Multi-client caseload; each engagement explicitly time-boxed (kickoff to launch) |
| Warp | "Lead implementation engagements end-to-end (multi-week structured support program): kickoff, weekly sessions, wrap-up with outcome review and expansion planning" + "Manage multiple concurrent customer engagements at high quality" | Multi-account caseload of structured, multi-week (project-bounded) engagements running in parallel; "wrap-up" and "expansion planning" show a clean end-point, sometimes followed by handoff to ongoing account ownership |
| Paperless Parts (Sr Mgr, Implementation PM) | "Oversee customer onboarding projects from sales handoff through go-live and **transition to Customer Success**" + "manage implementation capacity and resource planning... across concurrent customer engagements" | Explicit multi-engagement caseload managed as a resourcing/capacity problem; persistence is strictly bounded to onboarding — ownership formally transfers out at go-live, unlike CSE's indefinite ownership |

**Key finding:** Implementation/Support roles show a THIRD combination on the breadth x persistence grid: multi-client caseload (like CSE) but time-boxed/project-bounded (like SA, but longer — weeks not a single sales cycle) rather than indefinite. This is meaningfully different from both FDE's single-deep-embed norm and CSE's indefinite multi-account book, and confirms relationship persistence needs to be tracked independently of breadth.

---

## 6. Consulting/Professional Services Engineer

**Files reviewed:** 2 companies, 2 substantive JDs (Cortex Sr. Professional Services Engineer, Yoodli Sr. Professional Services Consultant); Implementation Consultant filenames overlapping with cluster 5 (AcuityMD, Branch, Degreed) were uncached stubs there too and not re-quoted here to avoid double counting.

**Summary pattern:** Professional Services here is explicitly positioned as deeper/more consultative than generic implementation but still runs a multi-account caseload, not single-client. Cortex: "owning customer engagements end to end (kickoff → delivery → handover)" with a regional "book of business in ANZ/APAC" — i.e., a defined portfolio/region of accounts, each with a bounded engagement (kickoff to handover). Yoodli's PS Consultant explicitly differentiates itself from "the standard Customer Success model" by being deeper/more technical per engagement, but still serves multiple customers concurrently and hands off pieces to CSMs/Support/Sales Engineers with "clearly delineate[d] responsibilities" — implying PS is one part of a rotating multi-team account-coverage model, not sole/indefinite ownership of one account.

**Breadth distribution:** 2 of 2 described multi-account caseloads (a "book of business" or a shared customer base with defined engagement boundaries); 0 described single-client dedication. Persistence: bounded per engagement (kickoff → delivery → handover at Cortex; onboarding/integration project scope at Yoodli), with the account's longer-term/indefinite relationship living elsewhere (CSM) after PS hands off — same pattern as cluster 5, reinforcing that "implementation," "professional services," and generic support cluster together as one project-bounded, multi-account pattern distinct from CSE's indefinite ownership.

| Company | Quote | Interpretation |
|---|---|---|
| Cortex | "owning customer engagements end to end (kickoff → delivery → handover)" + role "ideally PST due to **ANZ/APAC book of business**" | Regional book/portfolio of accounts; each engagement is bounded (kickoff to handover), after which relationship presumably passes to ongoing CS |
| Yoodli | "accelerate customer success post-sale... that goes **beyond the standard Customer Success model**" + "Clearly delineate responsibilities with other teams to reduce overlap" (vs CSM, Support, Sales Engineers) | Deeper technical/consultative engagement per account than CSE, but explicitly one function among several serving the same multi-account customer base — not single-client, and its slice of the relationship is scoped/bounded (implementation, integrations, content-build), with ongoing "adoption and training" ownership living with CSMs |

**Key finding:** Consulting/Professional Services Engineer confirms the pattern from cluster 5 — multi-account caseload, project/SOW-bounded persistence, with indefinite relationship ownership explicitly handed to a different role (CSM) once the PS engagement concludes. Combined with clusters 4-5, this suggests three of the six clusters (SA, SE, Implementation/PS) share a "wide + bounded" pattern, while FDE is genuinely bimodal (single-deep vs. portfolio depending on company), and CSE is consistently "wide + indefinite."

---

## Cross-Cluster Synthesis

Two independent axes are clearly visible across all 149 postings reviewed, and no single "1-5" scale captures both without conflation:

1. **Breadth (concurrent relationships):** ranges from true single-client embed (some FDE roles: Anthropic, Palantir, Defense Unicorns, Code Metal) to small caseloads (Implementation/PS: a handful of concurrent onboarding projects) to large territories/books (CSE/CSM, SA, SE: explicit "accounts" plural, "book," "segment," "territory").
2. **Persistence (how long/deep the relationship runs):** ranges from single-sales-cycle/transactional (SA, SE pre-sales) to project/SOW-bounded (Implementation, Professional Services — has a defined start/end, e.g. "kickoff to go-live," then hands off) to indefinite/trusted-advisor (CSE/CSM/TAM renewal-cycle ownership; FDE "throughout the lifecycle of an engagement").

Critically, breadth and persistence vary **independently**: FDE can be narrow+indefinite (Anthropic) or wide+indefinite (Ramp, OpenRouter); Implementation/PS is consistently narrow-ish caseload + strictly bounded; CSE is consistently wide + indefinite; SA/SE is consistently wide + transactional. Collapsing this to one 1-5 scale forces false equivalences — e.g., an Anthropic FDE (1 client, indefinite) and an OpenRouter FDE ("a set of" post-sales customers, time-boxed 30/60/90-day ramp then indefinite ownership) would likely both score "5" under the current single-dimension scheme despite being structurally different roles. The taxonomy should split "Account & Relationship Ownership" into two dimensions: (a) concurrent portfolio breadth, and (b) relationship persistence/depth, scored independently.

