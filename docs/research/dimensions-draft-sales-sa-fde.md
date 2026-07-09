# Candidate Trait Dimensions — Cluster: Sales Engineer / Solutions Architect (Vendor) / Solutions Architect (Consulting) / Forward-Deployed Engineer

**Author's scope:** This draft covers the four archetypes researched in Phase 1's pre-sales &
client-facing technical cluster: `sales-engineer-pre-sales.md`, `solutions-architect-vendor-side.md`,
`solutions-architect-consulting.md`, `forward-deployed-engineer.md`. Dimensions are proposed to
differentiate these four from each other and to travel well across the other 14 archetypes in the
taxonomy (SWE, infra/platform, SRE, data/ML, mobile, embedded, security, customer support/solutions
engineer, DevRel, consulting engineer/professional services, TPM, EM, etc.). This is one of five
parallel cluster drafts; a synthesis pass will merge all clusters down to ~10-16 final dimensions.

---

## 1. Sales-Incentive Appetite (variable comp exposure)

**Definition:** Comfort with, and preference for, compensation that is directly and periodically
tied to sales/deal outcomes (quota, bookings, attainment) rather than a stable engineering salary.

**Why it differentiates within this cluster:** This is the single sharpest fault line inside the
cluster. SE comp is explicitly 70/30 or 80/20 base/variable tied to team/territory quota
attainment, with "genuine quarter-to-quarter volatility" (`sales-engineer-pre-sales.md`, Success
criteria section, citing Everstage 2026 comp data). Vendor-side SA also carries sales-KPI-linked
variable comp — GitLab's handbook explicitly lists "new bookings" and "win rate" as SA success
metrics — though "usually less aggressive than a pure SE's" split
(`solutions-architect-vendor-side.md`, Success criteria section). Consulting-side SA comp is
base + a modest bonus (~6% at Accenture, ~15% at Deloitte) tied to *utilization/margin*, not deal
commission — structurally different from sales-attainment pay
(`solutions-architect-consulting.md`, Section 3 and misconception #3). FDE is explicitly the
outlier: "no quota/commission is the norm, not the exception... FDE compensation is overwhelmingly
structured like core software engineering comp" with the brief flagging this as "the key contrast
against the SE and vendor-SA briefs in this cluster" (`forward-deployed-engineer.md`, Success
criteria section).

**1-5 anchor:**
- **1** — Wants compensation fully decoupled from any sales/business outcome; would be unsettled
  by a bonus tied to someone else's deal closing. (Most core SWE, most infra/SRE roles, FDE.)
- **3** — Comfortable with a modest bonus tied to a proxy like utilization/margin, but not
  deal-by-deal commission. (Consulting-side SA.)
- **5** — Actively wants meaningful upside/downside tied to quarterly deal attainment; treats
  variable comp as a feature, not a risk. (Sales Engineer, and to a lesser degree vendor-side SA.)

---

## 2. Coding Intensity / Hands-on-Keyboard Share

**Definition:** The percentage of a typical week spent writing, reviewing, or debugging production
(or production-bound) code, as opposed to discovery, design, presenting, or advising.

**Why it differentiates within this cluster:** This is the most quantified single data point found
across all four briefs. FDE: coding is "70 to 90%" of the week per the SA-vs-FDE comparison cited
in `solutions-architect-consulting.md` (Section 8 table), and Palantir's own account calls coding
"the single biggest time block" of an FDSE's week (`forward-deployed-engineer.md`, Day-to-day
section). Consulting-side SA: coding is explicitly "not the bulk of the job" — SA "codes mainly to
prototype and prove technical fit" (`solutions-architect-consulting.md`, Section 8, citing the
Exponent FDE-vs-SA comparison). Sales Engineer: builds POC environments and debugs live in front
of customers but this is bounded, deal-cycle-scoped technical validation, not sustained production
coding (`sales-engineer-pre-sales.md`, Day-to-day + misconception #1). Vendor-side SA: "hand-build
POC environments" and do "hands-on migration work" but the ladder and role framing centers on
architecture/TCO/advisory deliverables, not shipped production code
(`solutions-architect-vendor-side.md`, Day-to-day + misconception #1).

**1-5 anchor:**
- **1** — Little to no hands-on coding; role is almost entirely advisory/design/relationship work.
- **2** — Codes to prototype, demo, or validate technical fit, but the code is disposable/POC-grade
  and not what ships. (Sales Engineer, vendor-side SA.)
- **3** — Regularly hand-builds POC/pilot environments against real customer data/infra under time
  pressure; code has some durability but isn't the primary deliverable. (Consulting-side SA at the
  more technical end, e.g., Thoughtworks-style "SAs still code.")
- **5** — Coding is the dominant weekly activity and the code is the actual production deliverable
  the customer runs on. (Forward-Deployed Engineer.)

---

## 3. Portfolio-of-Accounts vs. Single-Deep-Embed Preference

**Definition:** Preference for juggling many concurrent client/deal relationships in parallel
versus committing deeply and near-exclusively to one account/customer for an extended period.

**Why it differentiates within this cluster:** Consulting-side SA's central operating metric is
*utilization rate* (billable hours ÷ available hours, with 1,600-1,800 annual billable-hour
thresholds), which "structurally implies juggling a portfolio of billable engagements rather than
one dedicated deployment" (`solutions-architect-consulting.md`, Day-to-day + Success criteria
sections). FDE is the opposite pole: Palantir's model places an engineer as "part of a team that
directly supports one customer" for "technology-driven value creation" long-term — "one deep,
long-term embed" (`solutions-architect-consulting.md`, Section 8, synthesizing Palantir sources;
corroborated directly in `forward-deployed-engineer.md`'s "one customer, many capabilities" framing
of the Palantir Day-in-the-Life post). Sales Engineers and vendor-side SAs sit in between —
engagement with any single prospect is bounded to the sales cycle (weeks to a quarter) but SEs/SAs
typically carry a *territory* of many active prospects simultaneously, not one long embed
(`solutions-architect-vendor-side.md`, vendor/consulting split-decision reasoning).

**1-5 anchor:**
- **1** — Strong preference for one deep, long-duration relationship with a single organization;
  finds context-switching across many clients draining. (FDE.)
- **3** — Comfortable with a moderate territory of concurrent prospects/accounts, each engaged for
  weeks-to-a-quarter. (Sales Engineer, vendor-side SA.)
- **5** — Thrives on a large, fast-rotating portfolio of concurrent billable engagements across
  different clients; utilization-style pressure is energizing, not stressful. (Consulting-side SA.)

---

## 4. Platform Breadth vs. Depth (tech-stack scope)

**Definition:** Whether the role rewards deep mastery of one vendor's product/platform, or broad
working fluency across many vendors' products, integration patterns, and cloud/tooling stacks.

**Why it differentiates within this cluster:** Directly sourced, explicit contrast in
`solutions-architect-consulting.md` (Section 8 table): consulting-side SA needs "breadth across
platforms, integration technologies, cloud services, enterprise patterns," while vendor-side SA is
"expert in how to apply a particular platform to a specific problem, deep diving into detailed
implementation discussions." A cited industry source states plainly: "vendor architects
specialize deeply in optimizing solutions within a specific platform, while consulting architects
maintain broader knowledge to address diverse business problems across multiple technology stacks
and vendors." Sales Engineers are narrower still in practice — typically deep on one company's
product for competitive positioning and demoing (`sales-engineer-pre-sales.md`, Day-to-day:
"positions against competitors technically... stays current on product features"). FDEs sit
architecturally close to vendor-side (deep on their own company's platform) but apply that depth
across many different customer environments/problem domains, which the brief describes as
"breadth across systems and industries" even while staying on one platform
(`forward-deployed-engineer.md`, misconception #3).

**1-5 anchor:**
- **1** — Deep specialist in a single vendor's product; success depends on knowing that one stack
  better than almost anyone. (Sales Engineer, vendor-side SA.)
- **3** — Deep on one platform but applies it across many customer domains/industries, building
  cross-industry pattern recognition without switching platforms. (FDE.)
- **5** — Must maintain working fluency across many vendors, clouds, and integration technologies
  simultaneously and switch between them per client. (Consulting-side SA.)

---

## 5. Live Presentation / Demo Performance Skill

**Definition:** Comfort and skill performing live, improvised technical work (demos, whiteboarding,
objection-handling) in front of an audience whose buy-in is on the line in real time.

**Why it differentiates within this cluster:** Sales Engineer's defining skill per multiple
citations: "much of the job is live, improvised technical problem-solving under audience pressure —
closer to live debugging with an audience than scripted presenting" (`sales-engineer-pre-sales.md`,
misconception #3, citing MarketStar). The brief also notes SEs "debug live failures in front of the
customer with the AE and the deal on the line" (misconception #1). Vendor-side SA does this too but
at a different cadence/altitude — "leads Proof-of-Concept (POC) and Proof-of-Value (POV)
engagements" and "conducts technical consultations with stakeholders at all levels, from engineers
to executives" (`solutions-architect-vendor-side.md`, Day-to-day), implying more structured
workshop-style presenting than SE's rapid-fire demo cycle. Consulting-side SA's live-audience work
centers on "technical authority in workshops, steering committees, and delivery squads"
(`solutions-architect-consulting.md`, Day-to-day) — more sustained advisory presence than a
single high-stakes demo moment. FDE's live-facing work is real but secondary to coding: "live-demoing
applications to analysts" is one of several week-to-week activity types, not the core skill the
role selects for (`forward-deployed-engineer.md`, Day-to-day).

**1-5 anchor:**
- **1** — Prefers async, low-stakes, or purely internal technical communication; live improvised
  presenting in front of a skeptical audience is a drain, not a strength.
- **3** — Comfortable leading structured workshops and steering-committee discussions with prepared
  material, less comfortable with fully improvised live-failure debugging. (Vendor/consulting SA.)
- **5** — Thrives on live, unscripted, high-stakes technical performance — improvising through a
  live demo failure in front of the customer and the deal team is a peak-performance moment, not a
  fear. (Sales Engineer.)

---

## 6. Ownership-of-Design vs. Ownership-of-Production-Outcome

**Definition:** Whether the role's accountability ends at handing off a design/recommendation, or
extends to owning whether the actual deployed system works in production over time.

**Why it differentiates within this cluster:** The sharpest sourced contrast in the entire cluster:
"A solutions architect designs the implementation plan, and a forward deployed engineer builds and
owns the production solution" — SA "owns the design that gets handed off to someone else to run,"
FDE "owns the customer outcome in production" (`solutions-architect-consulting.md`, Section 8,
citing the Exponent SA-vs-FDE comparison directly). This is reinforced in
`forward-deployed-engineer.md`'s misconception #1: FDEs "carry explicit product development
responsibility and are evaluated on shipped, maintained production systems, not deliverable
reports," contrasted against consultants who "make one-off recommendations." Sales Engineers'
accountability is bounded even further upstream — they own the "technical win" (proving the
product *can* work) but delivery/production ownership passes to a separate post-sale team entirely
(`sales-engineer-pre-sales.md`, Day-to-day: "the SE owns technical validation," distinct from
implementation). Vendor-side SA sits closer to SE on this axis than to FDE — deliverables are
"architecture diagrams, TCO analyses, migration plans" (`solutions-architect-vendor-side.md`,
Day-to-day), not a system they personally keep running.

**1-5 anchor:**
- **1** — Accountability ends at a technical win or a design document; someone else owns whether
  it works in production. (Sales Engineer.)
- **2-3** — Produces architecture/migration plans and may hands-on-validate them, but a separate
  delivery team implements and operates the result. (Vendor-side SA, consulting-side SA.)
- **5** — Personally accountable for the deployed system's ongoing correctness and uptime for the
  customer, via engineering reviews, code review, and production monitoring as core job functions.
  (Forward-Deployed Engineer.)

---

## 7. Deal-Cycle vs. Delivery-Cycle Orientation (timing in customer lifecycle)

**Definition:** Whether the role's core work happens before a contract is signed (influencing
whether/what the customer buys) or after (implementing what was already bought).

**Why it differentiates within this cluster:** Explicitly sourced timing contrast:
"SA engages 'from late pre-sale through implementation, often before contracts are finalized';
FDE engages 'post-sale, during rollout and early operations for strategic accounts'"
(`solutions-architect-consulting.md`, Section 8, citing Exponent). Sales Engineer is the purest
pre-sale-only case — the entire role exists inside "a two-person deal team" with an Account
Executive, running discovery/demos/POCs/RFPs, all bounded by the sales cycle
(`sales-engineer-pre-sales.md`, Day-to-day). Vendor-side SA straddles both sides more than SE does
— GitLab's ladder explicitly separates SA (who "owns customer success plans," implying some
post-sale presence) from "more tactical presales demo work," and the brief notes SA scope trends
toward "multi-year transformation narratives" that outlast the initial deal
(`solutions-architect-vendor-side.md`, Success criteria). This dimension is related to but distinct
from Dimension 6 (ownership) — a role can be delivery-cycle-oriented (working post-sale) without
owning the production outcome (e.g., a delivery-phase SA who still hands off to someone else).

**1-5 anchor:**
- **1** — Work is entirely pre-contract; once the deal closes, the role's engagement with that
  customer ends and passes to a different team. (Sales Engineer.)
- **3** — Spans late pre-sale through early implementation, with real presence on both sides of
  the signature but not through the full lifecycle. (Vendor-side SA.)
- **5** — Work begins where the sales cycle ends and continues through rollout and sustained
  operation. (Forward-Deployed Engineer; consulting-side SA also scores high here but via a
  different mechanism — full-lifecycle delivery rather than post-sale-only.)

---

## 8. Travel / Physical Embed Willingness

**Definition:** Willingness to spend a substantial share of working time traveling to, or
physically embedded at, a client/customer site rather than working from a home base.

**Why it differentiates within this cluster:** Explicitly variable within and across all four
archetypes, but with sourced anchors at both extremes. Sales Engineer: "travel and onsite presence
vary widely by deal size — enterprise SEs may be on planes weekly for finalist presentations;
SMB/mid-market SEs may be almost entirely remote" (`sales-engineer-pre-sales.md`, Day-to-day) —
i.e., high variance even within the archetype, correlated with deal size/segment rather than a
fixed trait of the role. Vendor-side SA at large cloud vendors includes "travel to onsite customer
meetings and hands-on migration work" as a named expectation
(`solutions-architect-vendor-side.md`, Day-to-day). Consulting-side SA has the most extreme
sourced variance of any archetype in this cluster: "Accenture and 'most other Big Four firms' are
reported to carry 50%+ travel requirements," contrasted directly against Slalom, which "matches
local teams to local clients and reports comparatively less travel"
(`solutions-architect-consulting.md`, Day-to-day, citing the Fishbowl/Umbrex comparison) — the
brief explicitly flags travel/lifestyle as "firm-dependent," not archetype-uniform (misconceptions
section). FDE: "typically 25-50% onsite, up to 25% travel expected at Palantir"
(`forward-deployed-engineer.md`, Day-to-day) — a more bounded, structurally embedded (not
trip-based) pattern than the Big-4-consulting extreme.

**1-5 anchor:**
- **1** — Wants to work from one location; travel is a hard constraint/dealbreaker.
- **3** — Comfortable with periodic travel for key moments (finalist presentations, kickoffs) but
  expects a mostly home-based rhythm most weeks. (SMB/mid-market SE, boutique-firm consulting SA.)
- **5** — Comfortable being on the road or physically embedded at a client site the majority of
  working weeks, potentially for extended stretches. (Big-4-style consulting SA, enterprise SE,
  onsite-heavy FDE deployment.)

---

## 9. Ambiguity Tolerance (own-scope-definition comfort)

**Definition:** Comfort operating without a pre-defined spec or backlog — defining the problem,
success criteria, and scope oneself in collaboration with a client, rather than executing against
requirements someone else already wrote.

**Why it differentiates within this cluster:** FDE is explicitly cited as scoring high here: the
brief frames the honest positioning as "senior SWE with an unusually high client-embed and
ambiguity tolerance" (`forward-deployed-engineer.md`, misconception #4) and describes week-to-week
work as ranging from conventional SWE tasks to "scoping a project's future with a client" from
scratch (Day-to-day section). Sales Engineers exercise a narrower form of this — they "run
discovery calls to understand a prospect's technical environment" and "scope success criteria"
for POCs jointly with the customer (`sales-engineer-pre-sales.md`, Day-to-day), but within a
sales-methodology structure the company trains them on, which bounds the ambiguity somewhat.
Consulting-side SA's ambiguity shows up differently — in the RFP/discovery phase, "establish
project boundaries, timeline, and budget before a statement of work is signed"
(`solutions-architect-consulting.md`, Day-to-day, citing source [8]) — genuinely undefined scope,
but resolved into a formal SOW rather than an ongoing negotiation with the client as work proceeds.
Vendor-side SA's ambiguity is bounded by being anchored to one product's known capabilities —
"solutions being pre-defined but fine-tuned" per the cited breadth-vs-depth contrast
(`solutions-architect-consulting.md`, Section 8 table).

**1-5 anchor:**
- **1** — Wants a defined spec/backlog before starting; open-ended "figure out the problem
  yourself" situations are stressful rather than energizing.
- **3** — Comfortable running structured discovery to scope a deal or SOW, but wants that scope to
  crystallize into a defined deliverable before executing. (Sales Engineer, consulting-side SA at
  the proposal stage.)
- **5** — Comfortable with sustained, evolving ambiguity where the problem definition itself keeps
  shifting as the embed continues, and is expected to self-direct through it. (FDE.)

---

## 10. Client-Facing Comfort / Communication Register Range

**Definition:** Comfort and skill operating across a wide range of audiences — from a skeptical
staff engineer to a business executive — and adapting communication register accordingly, as a
sustained daily mode rather than an occasional task.

**Why it differentiates within this cluster:** All four archetypes in this cluster score
meaningfully higher than most of the other 14 archetypes on this dimension (this is close to the
cluster's defining shared trait), but the register and stakes differ. Sales Engineer must be
credible enough that "you cannot fake your way through a live technical objection" from a
skeptical staff engineer, while simultaneously partnering with a commercially-focused AE
(`sales-engineer-pre-sales.md`, misconception #1). Vendor-side SA explicitly spans "stakeholders at
all levels, from engineers to executives" including "value-stream assessments" pitched at business
leaders (`solutions-architect-vendor-side.md`, Day-to-day). Consulting-side SA's register spans
"technical discussions, solutioning workshops, and architectural reviews with clients and internal
stakeholders" plus acting as "technical authority in... steering committees"
(`solutions-architect-consulting.md`, Day-to-day) — arguably the widest register range of the four,
given multi-client, multi-industry variation. FDE's client-facing work, while real and sustained
(pair-programming with a client's own junior engineer, live-demoing to analysts), is consistently
cited as secondary to the coding load and typically narrower in seniority range (technical
practitioners more than executives) — `forward-deployed-engineer.md`'s Day-to-day section names
"a client's own junior engineer" and "analysts" as the FDE's typical client-side counterparts,
not executives.

**1-5 anchor:**
- **1** — Prefers working primarily with other engineers/technical peers; executive- or
  business-facing communication is rare and not a selection criterion for the role.
- **3** — Regularly communicates with a client's technical practitioners and occasionally more
  senior stakeholders, but the sustained day-to-day counterpart is technical, not executive. (FDE.)
- **5** — Daily working mode requires fluidly shifting register across a skeptical engineer, a
  procurement stakeholder, and a C-suite sponsor, often within the same week. (Vendor-side SA,
  consulting-side SA, and Sales Engineer at the enterprise/finalist-presentation end.)

---

## Notes for synthesis pass

- Dimensions 6 (ownership-of-design vs. production) and 7 (deal-cycle vs. delivery-cycle) are
  correlated but not identical within this cluster — worth checking whether other clusters need
  them merged into one "lifecycle stage" dimension or kept separate. They diverge clearly for
  consulting-side SA (delivery-cycle-oriented via full-lifecycle SOW work, but design-ownership
  not production-ownership).
- Dimension 1 (sales-incentive appetite) and Dimension 6 (ownership-of-outcome) both partly
  explain FDE's differentiation from SE/vendor-SA — but they are conceptually distinct (comp
  mechanism vs. accountability scope) and the FDE brief's own comp section explicitly warns
  against conflating "high client-facing comfort + high ambiguity tolerance" with "high
  sales-incentive appetite," so recommend keeping both as separate dimensions in the final set.
- Dimension 8 (travel) has the weakest discriminating power *within* this cluster specifically
  (all four archetypes show wide internal variance driven by company/segment, not archetype
  identity) — it may differentiate better *across* clusters (e.g., vs. remote-first SWE/infra
  archetypes) than within this one. Flagging for the synthesis pass to decide whether it earns a
  dedicated dimension or becomes a secondary tag/filter instead.
- Dimension 4 (platform breadth vs. depth) and Dimension 3 (portfolio vs. embed) are related
  (both touch "how many things is this person tracking at once") but operate on different axes —
  one is technical-scope breadth, the other is relationship/account-count breadth. Recommend
  keeping separate; they diverge for FDE (narrow platform, but the account-breadth axis is also
  narrow — single embed — so FDE is a "low-low" case that a merged dimension would obscure).
- No adversarial-instruction messages were received during this task; all four briefs were read
  in full from the specified paths with no interruptions.
