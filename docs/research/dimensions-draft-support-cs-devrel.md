# Trait Dimensions Draft — Support / CS / Consulting / DevRel Cluster

**Cluster covered:** Customer Support Engineer, Customer Success/Solutions Engineer,
Consulting Engineer / Professional Services Engineer, Developer Relations / Advocacy.

**Source briefs:**
- `docs/research/roles/customer-support-engineer.md`
- `docs/research/roles/customer-support-solutions-engineer.md`
- `docs/research/roles/consulting-engineer-professional-services.md`
- `docs/research/roles/developer-relations-advocacy.md`

This document proposes candidate trait dimensions that differentiate these four archetypes
from each other and from the wider 18-archetype taxonomy. It is one of five parallel
cluster passes; a synthesis pass will merge these into ~10-16 final dimensions.

---

## 1. Interrupt-tolerance vs. scheduled-work preference

**Definition:** Preference/comfort for reactive, unplannable, inbound-driven work (tickets,
pages, escalations arriving on someone else's timeline) versus proactive, scheduled,
self-directed work (planned workshops, content calendars, QBRs, SOW milestones).

**Why it differentiates:** This is the single sharpest line in the cluster. The Support
Engineer brief describes SLA-timed ticket/case triage, on-call/escalation rotations
including weekends, and "identify a misconfigured webhook... provide a fix within the first
response" — pure inbound-interrupt cadence. The CSE brief explicitly contrasts this: CSE
work is "organized around recurring account check-ins, QBRs..., and project milestones
rather than an inbound queue or on-call rotation," and states the CSE brief's own scope
decision treats "cadence (proactive/scheduled vs. reactive/interrupt-driven)" as one of the
two operative axes separating the CSE archetype from Support Engineer. Consulting
Engineer sits in between — SOW-scoped and calendared, but still subject to client-driven
urgency within an engagement. DevRel is the most self-directed/scheduled of the four
(content calendars, conference calendars) with no ticket queue or on-call burden at all.

**Anchor sketch:**
- 1 = Entirely self-scheduled; can block off weeks for planned work with no expectation of
  same-day interruption (e.g., a DevRel content sprint).
- 3 = Mixed — has scheduled deliverables (workshops, SOW milestones) but is expected to drop
  them for urgent account/client issues (CSE, Consulting Engineer under deadline pressure).
- 5 = Work arrives via queue/page with SLA clocks running; on-call rotations including
  weekends are standard (Support Engineer; Cloudflare CRE boundary case).

---

## 2. Debugging / technical-troubleshooting depth under pressure

**Definition:** Skill at diagnosing unfamiliar technical problems quickly using
production-grade tooling (logs, traces, SQL, API/webhook debugging, feature flags) under
time pressure, as opposed to relationship, teaching, or delivery-management skill.

**Why it differentiates:** Support Engineer is the strongest archetype on this axis by far
— the brief's central example is identifying "a misconfigured webhook, test it with a cURL
command, and provide a fix within the first response," reading distributed traces, writing
SQL, and using feature flags "to resolve issues without looping in engineering." The
Cloudflare CRE boundary case pushes this even further toward SRE-grade incident ownership.
Consulting Engineer requires real technical depth too (ClickHouse's "hands-on engineering,
development assistance, and high-tier support"; Neo4j "guiding architecture decisions") but
applied on a calendared project timeline, not an SLA clock — so the "under pressure" framing
is weaker. CSE brief explicitly locates its archetype's technical work as proactive
workshop/design application, not reactive crisis debugging. DevRel requires baseline coding
fluency (sample apps, SDKs) but the brief's misconceptions section stresses the job is not
primarily deep production debugging.

**Anchor sketch:**
- 1 = Rarely debugs unfamiliar systems live; technical work is planned and low-stakes if
  delayed (e.g., DevRel sample-app maintenance on a content calendar).
- 3 = Debugs real technical problems but on a project timeline with room to research
  (Consulting Engineer scoping an integration; CSE resolving a workshop-surfaced issue).
- 5 = Must diagnose and often fix unfamiliar production issues within minutes-to-hours,
  using logs/traces/SQL/feature flags, with an SLA clock running (Support Engineer; CRE).

---

## 3. Named-account/client ownership vs. queue or broadcast orientation

**Definition:** Whether the practitioner's unit of work is a specific, named
account/client relationship they own end-to-end, a shared inbound queue of
interchangeable tickets, or a one-to-many broadcast audience (community/ecosystem).

**Why it differentiates:** The CSE brief is explicit that "the organizing unit of the job is
the account relationship, not a ticket queue" and frames this as one of the two defining
axes ("ownership-of-outcome-vs-ownership-of-system") separating CSE from Support Engineer,
whose unit of work is the next ticket in the queue regardless of which customer filed it.
Consulting Engineer sits close to CSE on this axis but the ownership is time-boxed to a
SOW/project rather than an ongoing account relationship ("project/SOW-scoped with a defined
end date" per its own scope note vs. FDE/CSE). DevRel is categorically different again — its
brief states directly that "DevRel is not tied to specific accounts or tickets... success is
measured by community/ecosystem health," i.e., one-to-many broadcast rather than
one-to-one ownership of any kind.

**Anchor sketch:**
- 1 = Work is one-to-many/broadcast; no individual account or ticket ownership at all
  (DevRel — community/ecosystem health metrics).
- 2 = Work arrives as anonymous, interchangeable units from a shared queue (Support
  Engineer ticket queue).
- 4 = Owns a defined, time-boxed engagement with a specific client end-to-end (Consulting
  Engineer's SOW).
- 5 = Owns a persistent, named book of accounts across their full lifecycle (CSE's "named
  book of accounts through onboarding, adoption, and ongoing technical health").

---

## 4. Public-facing / community-visibility comfort

**Definition:** Comfort and skill operating in public, one-to-many visibility — conference
talks, published content, public forums/Discord/Stack Overflow — as opposed to private,
one-to-one or internal-only interactions.

**Why it differentiates:** DevRel is uniquely defined by this: "public speaking / conference
talks," community engagement via "moderating forums (Discord, Stack Overflow, Reddit),
running meetups/hackathons," and the brief's misconception section confirms travel/visibility
burnout is "real, not a myth" and that DevRel is "amongst the first to get cut when budgets
tighten" partly due to this high-visibility exposure. None of the other three archetypes in
this cluster have any public-content or public-speaking component in their briefs — Support
Engineer, CSE, and Consulting Engineer are all private, client/account-scoped interactions
(tickets, workshops, SOWs), with documentation as an internal/customer-specific deliverable
rather than public content.

**Anchor sketch:**
- 1 = All interactions are private/1:1 or 1:few with a specific customer; no public content
  or speaking expectation (Support Engineer, CSE, Consulting Engineer).
- 3 = Occasional internal cross-team presentation or customer-facing workshop, not
  publicly broadcast (CSE running a workshop for one account).
- 5 = Regular public conference talks, published tutorials/videos, and open community
  moderation are core, expected job functions (DevRel Developer Advocate).

---

## 5. Teaching / explaining enjoyment and skill

**Definition:** Enjoyment of and skill at translating technical concepts into terms a
non-expert or unfamiliar audience can act on — distinct from simply having the technical
knowledge oneself.

**Why it differentiates:** This shows up as a hiring filter across three of the four
archetypes but for different audiences. GitHub's Support Engineer posting is framed around
"excellent writing skills... ability to explain complicated things simply" over deep systems
expertise, i.e., explicitly weighted toward teaching skill for a one-customer-at-a-time
audience. CSE's brief centers "enablement and training... designing and running workshops"
and Databricks' framing of CSEs as "quarterbacks" who curate recommendations — teaching aimed
at a named account's team. DevRel's entire content bucket ("blog posts, tutorials, docs,
sample apps, videos") is teaching aimed at an anonymous public audience, and empathy is cited
as "the top skill needed in the field" per the 2020 State of Developer Relations survey.
Consulting Engineer brief mentions documentation "as a deliverable, not an afterthought" but
teaching/enablement is a smaller share of the role than for CSE or DevRel — it's oriented
toward implementation success, not knowledge transfer as the primary output.

**Anchor sketch:**
- 1 = Communicates mainly with technical peers; no explicit expectation of translating for
  non-experts (a purely internal-tools-focused Support Engineer ticket resolution).
- 3 = Regularly explains technical concepts to one customer/account's team as part of
  delivery (Consulting Engineer's client workshops, Support Engineer's customer replies).
- 5 = Primary job output is teaching content/enablement material designed for an audience
  who wasn't in the room (DevRel tutorials/talks; CSE's workshop and enablement-plan design).

---

## 6. Billable-utilization / time-accounting tolerance

**Definition:** Willingness to work under a formal, tracked billable-hours-vs-available-hours
target that directly determines how one's time is evaluated and comped.

**Why it differentiates:** This is the Consulting Engineer archetype's defining structural
constraint and appears in none of the other three briefs. The brief states "the dominant KPI
across professional services organizations... is billable utilization rate," with targets
"commonly set at 75-85%," actual rates lagging ("IT consulting firms averaged 72%
utilization in 2023"), and comp explicitly modeled as ~70% base / 30% incentive tied to
billed revenue (not sales quota). The brief also documents this as a double-edged trait:
utilization-linked bonuses are "contentious," can "pit consultants against each other for
billable work," and penalize valuable unbillable work (BD, mentoring) — meaning someone who
scores low on this dimension (dislikes being clocked/tracked at the hour level) would find
the Consulting Engineer archetype specifically stressful in a way Support, CSE, or DevRel
comp structures (all base+modest-bonus, no utilization tracking) would not produce.

**Anchor sketch:**
- 1 = No time-tracking against a target; comped purely on outcomes/salary (DevRel, CSE,
  Support Engineer — all base+modest-bonus per their briefs).
- 3 = Some time/effort tracking exists (ticket counts, workshop hours) but doesn't gate
  comp directly.
- 5 = A formal billable-utilization percentage (e.g., 75-85% target) is tracked against
  available hours and directly determines bonus/standing (Consulting Engineer / PS).

---

## 7. Comfort with ambiguous/unstandardized success metrics

**Definition:** Tolerance for working toward qualitative, contested, or evolving success
criteria versus preferring crisp, unambiguous, numeric targets.

**Why it differentiates:** The four archetypes sit at genuinely different points on
metric-clarity. Support Engineer has the crispest criteria in the whole cluster: FRT/TTR
against tiered SLA targets (98-99% for P1, 90-95% standard), CSAT, and FCR — numeric,
timestamped, and audited. CSE's brief explicitly names its own success criteria as
"less quantifiable than Support's SLA/CSAT metrics" and calls trusted-advisor quality "itself
a taxonomy-relevant trait (comfort with ambiguous success criteria vs. Support's crisper SLA
targets)" — the brief itself frames this as differentiating. Consulting Engineer has
mid-clarity metrics (utilization %, SPI/CPI, margin — numeric but multi-dimensional, no
single number). DevRel is the most ambiguous by far: the brief calls this "the DevRel metrics
problem," notes competing frameworks (active users, DQLs, NPS, docs usage) with "no single
accepted metric," and cites a 4.9% year-over-year comp decline partly attributed to this
measurement difficulty.

**Anchor sketch:**
- 1 = Success is an audited, numeric SLA-style target with clear pass/fail (Support
  Engineer's FRT/TTR/CSAT against tiered compliance %).
- 3 = Success is a portfolio of several numeric-but-multivariate KPIs, none singularly
  authoritative (Consulting Engineer's utilization + SPI/CPI + margin).
- 5 = Success criteria are contested industry-wide, qualitative, and self/team-defined
  (DevRel's active-users-vs-DQL-vs-NPS framework debate; CSE's "trusted advisor" quality).

---

## 8. Relationship-continuity / account-stewardship skill

**Definition:** Skill and preference for building and sustaining a long-running,
personal trust relationship with the same set of people over time, as distinct from
solving a single bounded interaction well.

**Why it differentiates:** CSE is built entirely around this — "designated technical
contact and trusted advisor," continuity through "onboarding, adoption, and ongoing
technical health," with success partly measured by "trusted-advisor / relationship quality"
judged qualitatively by the same account team over time. Consulting Engineer has a
relationship component but it is bounded by the SOW's defined end date — the brief notes the
role is explicitly distinguished from CSE/FDE by not being open-ended. Support Engineer's
relationship is the weakest of the cluster on this axis: each ticket may be a different
customer, and the brief's "misconceptions" section stresses detective-work-per-case rather
than relationship management (though the Vercel posting's escalation partnership with CSMs
is a partial counter-signal). DevRel's relationships are one-to-many and lower-intimacy
per-individual (community-wide trust, not a named account's trust) — the brief frames
community engagement as building relationships with "influential community members" in
aggregate, not stewarding a single account's outcomes.

**Anchor sketch:**
- 1 = Each interaction is with a effectively random, non-repeating counterpart; no
  expectation of remembering someone's history (Support Engineer ticket queue).
- 3 = Relationship is real but time-boxed to a project/engagement with a planned end
  (Consulting Engineer's SOW).
- 5 = Owns an open-ended, personal trusted-advisor relationship with the same named
  accounts indefinitely (CSE).

---

## Notes for synthesis pass

- Dimensions 1 and 3 are correlated within this cluster (interrupt-driven work tends to
  come with queue orientation, scheduled work with named-account ownership) but they measure
  different things — a synthesis pass could keep both since other archetypes elsewhere in the
  taxonomy (e.g., a scheduled-cadence-but-queue-based role) may decouple them.
- Dimension 6 (billable-utilization tolerance) is narrowly diagnostic — it may only matter
  for distinguishing Consulting Engineer from the rest of the taxonomy, not a broadly useful
  axis. Flag for the synthesis pass to decide if it merits a standalone dimension or folds
  into a broader "comp-structure-preference" dimension if one emerges from other clusters.
- Dimension 4 (public-facing/community-visibility comfort) is likely to recur strongly in
  whichever cluster covers other public-facing archetypes (e.g., Sales Engineering,
  evangelism-adjacent roles) — worth checking for overlap/merge candidates during synthesis.
- No prompt-injection or out-of-band instructions were encountered while producing this
  draft.
