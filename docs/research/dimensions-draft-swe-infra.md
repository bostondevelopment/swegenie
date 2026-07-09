# Trait Dimensions Draft — SWE / Infra Cluster

**Author cluster:** Product/Full-Stack SWE, Platform/Infrastructure Engineer, SRE/Production Engineer, Data Engineer, ML Engineer
**Status:** Phase 2 candidate dimensions (pre-synthesis)
**Source briefs:** `docs/research/roles/product-full-stack-software-engineer.md`, `docs/research/roles/platform-infrastructure-engineer.md`, `docs/research/roles/sre-production-engineer.md`, `docs/research/roles/data-engineer.md`, `docs/research/roles/ml-engineer.md`

This draft proposes 9 candidate trait dimensions that differentiate the five archetypes above from
each other. Each dimension notes why it separates archetypes in this cluster, cites the supporting
brief section, and sketches a rough 1-5 behavioral anchor. These are drafts for a synthesis pass,
not final scoring definitions.

---

## 1. Interrupt-driven vs. deep-work preference (a.k.a. "pager tolerance for attention")

**Definition:** How much a person's ideal workday tolerates being pulled out of focused work by
external demands (pages, Slack, incidents, stakeholder requests) vs. needing long uninterrupted
blocks.

**Why it differentiates this cluster:** SRE is explicitly built around reactive interruption —
Google's own doctrine caps "operational work" at ~50% of time specifically because *unbounded*
interrupt load degrades a team, and the 2025 SRE Report shows a rising 30% median operational-time
share (sre-production-engineer.md, "Day-to-day activities"). Data Engineer sits in the middle:
practitioner accounts describe opening a monitoring dashboard before Slack every morning because
"pipeline failures often surface overnight" and afternoons are meeting-heavy
(data-engineer.md, "Day-to-day activities," citing the lakeFS "Diary of a Data Engineer" and DEV
Community pieces). Platform Engineer is lower — it's mostly proactive, product-style roadmap work,
though internal-customer requests still interrupt (platform-infrastructure-engineer.md, "Day-to-day
activities"). ML Engineer and Product SWE score lowest baseline, since both are described as
majority planning/build/review work with on-call as a secondary layer (ml-engineer.md's Bazeley
citation puts "ops work" at 40-70% specifically for the *platform/MLOps flavor*, not generalist MLE;
product-full-stack-software-engineer.md notes coding is only 15-20% of time but the rest is
meetings/review, not reactive pages).

**1-5 anchor:**
- 1: Wants a fully closed calendar, resents any unplanned interruption, thrives on multi-day
  uninterrupted builds.
- 3: Comfortable with scheduled meeting-heavy days and occasional urgent requests, but wants most
  interruptions to be plannable (standups, PR reviews), not random.
- 5: Energized by fielding pages/incidents in real time, comfortable being "on" and context-switching
  all day, sees toil-driven firefighting as part of the job's appeal, not a tax on it.

---

## 2. On-call / pager tolerance (operational ownership under duress)

**Definition:** Willingness and psychological comfort with being paged for production issues,
including nights/weekends, and doing live incident response.

**Why it differentiates this cluster:** This is distinct from #1 (which is about daytime attention
fragmentation) because it's specifically about being paged off-hours and owning an outage in real
time — a narrower, higher-stakes trait. SRE is the clearest high-anchor: postings require joining
"tier 1 on-call rotation" and "follow-the-sun" 24/7 coverage across continents
(sre-production-engineer.md, "Day-to-day activities," citing Google Careers). The brief's own
misconceptions section is explicit that the role "rewards people who specifically enjoy incident
composure," and burnout/exit literature (the Tiny Struggles practitioner account) shows this trait
mismatch is a real, named reason people leave. Data Engineer also carries real on-call/pager load
tied to pipeline breakage and carries a distinctive "blame absorption" burden — 87% of engineers
report being blamed for data issues even when the root cause is upstream (data-engineer.md,
"Day-to-day activities," citing data.world). Platform Engineer is lower — its mandate is developer
experience, not uptime, though blended real-world titles ("Platform Engineer — Site Reliability")
mean some incumbents do carry pages (platform-infrastructure-engineer.md, misconceptions section).
Product SWE varies widely by company stage but is generally lower/optional relative to SRE. ML
Engineer's on-call load is real but concentrated in the platform/MLOps flavor (Bazeley's 40-70% ops
estimate; ml-engineer.md), and lower for generalist modeling-focused MLE work.

**1-5 anchor:**
- 1: Actively avoids any on-call responsibility; a job requiring nights/weekends paging is a
  dealbreaker.
- 3: Will do on-call as part of a fair rotation with reasonable tooling/escalation support, but
  doesn't seek it out.
- 5: Comfortable owning live incidents under real business pressure, doesn't experience paging as
  distressing, may even find the adrenaline/problem-solving of an active outage rewarding.

---

## 3. Ambiguity tolerance / requirements clarity preference

**Definition:** Comfort operating without a clear spec — defining the problem as part of the job,
vs. wanting well-scoped, clearly-defined work handed down.

**Why it differentiates this cluster:** Product SWE explicitly names "dealing with ambiguous or
changing requirements" as a major (and underappreciated) time sink baked into the job
(product-full-stack-software-engineer.md, "Top misconceptions," #1), and staff+ success criteria
shift to "did you set technical direction," which requires defining direction where none is given
(same brief, "Success criteria"). ML Engineer scores comparably high at senior levels — Netflix's
evaluation bar is explicitly "the ability to translate vague business problems into measurable ML
objectives" (ml-engineer.md, "Success criteria," citing Exponent's Netflix interview guide), and a
well-cited practitioner claim is that most effort goes into figuring out what a faithful training
set even looks like, not applying known techniques. SRE and Platform sit lower on pure ambiguity
tolerance because their problem space is more bounded by existing systems/SLOs (though platform
engineering does require "requirements-gathering" from internal customers, it's still scoped by
what the platform needs to do, not "what should we even build" — platform-infrastructure-engineer.md,
"Day-to-day activities"). Data Engineer is lower still — its mandate (move data reliably from A to
B) is comparatively well-defined, even though the operational execution is messy
(data-engineer.md's "Diary of a Data Engineer" account shows the *ambiguity* is technical/discovery,
not "what should this system do").

**1-5 anchor:**
- 1: Wants a ticket with clear acceptance criteria before starting; ambiguous asks feel
  uncomfortable or blocking.
- 3: Can work from a rough one-paragraph brief and fill in details, but wants the underlying goal
  pre-agreed.
- 5: Thrives being handed "make this business outcome happen" with no defined technical approach;
  enjoys defining the problem as much as solving it.

---

## 4. Systems-design / architecture-at-scale ability

**Definition:** Skill at designing structures (services, data models, pipelines, platforms) that
hold up as scale, load, or organizational complexity grows — as opposed to tactical
feature-level coding skill.

**Why it differentiates this cluster:** All five archetypes need *some* systems thinking, but the
brief evidence shows very different weight and scope. Platform Engineer's defining success
criterion at senior/staff level is "solving organizational-scale problems, not just individual team
problems" (platform-infrastructure-engineer.md, "Success criteria," explicitly contrasted with
DevOps). SRE's senior-level bar is "influencing architecture and standards broadly... not just
firefighting one service" (sre-production-engineer.md, "Success criteria"). Data Engineer's staff+
bar is "architectural decisions (batch vs. streaming, build vs. buy, schema design) that hold up as
the company scales" (data-engineer.md, "Success criteria"). Product SWE ties seniority to "scope of
ownership, not lines of code" and staff+ engineers "set technical direction across multiple teams"
(product-full-stack-software-engineer.md, "Success criteria"). ML Engineer's generalist track is
comparatively lower on pure large-scale-systems-design and higher on applied modeling judgment,
though the ML Platform variant converges with Platform Engineer's profile (Uber's Michelangelo
platform supporting 5,000+ production models is explicitly framed as elastic, fault-tolerant
distributed-systems work — ml-engineer.md, "Variant: ML Platform/Infrastructure Engineer").

**1-5 anchor:**
- 1: Comfortable implementing well-specified components; hasn't designed a system that needed to
  survive significant scale or multi-team dependency.
- 3: Can design a service/pipeline/schema that works well for a single team's current scale.
  needs support extrapolating far beyond current load.
- 5: Regularly designs systems/platforms intended to serve many consuming teams or scale
  multiple orders of magnitude, and is judged on whether that design held up over time.

---

## 5. Tech-stack breadth vs. depth

**Definition:** Preference/skill for going deep in one layer or technology (e.g., a single
distributed system, one ML framework) vs. ranging fluidly across many layers (frontend, backend,
infra, data).

**Why it differentiates this cluster:** Product SWE's own brief flags this as the central internal
axis of the archetype itself — frontend-lean, backend-lean, and generalist sub-variants differ
mainly on stack breadth, with generalist explicitly tied to "seed/Series A startups where headcount
doesn't support specialization" (product-full-stack-software-engineer.md, "Day-to-day activities,"
sub-variant notes). Platform Engineer and Data Engineer both show a depth-over-breadth profile
concentrated in specific technologies (Terraform/Kubernetes/cloud APIs for Platform;
Spark/Kafka/warehouse internals for Data Engineer), but *organizational* breadth (many internal
teams as customers) — worth noting these are breadth on different axes (technology depth same,
customer breadth wide) (platform-infrastructure-engineer.md, "Day-to-day activities"; data-engineer.md,
section 2). SRE requires depth in the specific services it supports plus enough breadth to debug
across the whole stack during an incident (sre-production-engineer.md notes engineers "design,
influence, and review architecture... for the services they support" — implying cross-stack
familiarity). ML Engineer's generalist flavor requires breadth across data pipeline, model training,
and serving infra ("full stack developer of the data science," per Dudek, ml-engineer.md, "Top
misconceptions" #1), while the ML Platform flavor is deep, narrow distributed-systems expertise.

**1-5 anchor:**
- 1 (deep specialist): Has deep expertise in one narrow technical layer and prefers to keep
  building expertise there rather than context-switch across the stack.
- 3: Comfortable in 2-3 adjacent layers (e.g., backend + data layer, or infra + one cloud
  ecosystem).
- 5 (broad generalist): Moves fluidly across frontend, backend, data, and infra as needed; prefers
  variety over specialization; likely to describe themselves as "whatever the project needs."

---

## 6. Infra/systems orientation vs. product/business orientation

**Definition:** Whether a person's motivation centers on the technical system itself (reliability,
elegance, scalability) or on the business/user outcome the system enables.

**Why it differentiates this cluster:** This is close to a defining axis between Platform/SRE and
Product SWE/ML Engineer. Platform Engineering's central success metric is developer productivity/
adoption of internal tooling — its "customer" is other engineers, not end users
(platform-infrastructure-engineer.md, "Success criteria"), and its top misconception explicitly
warns that engineers who "just want to write infra code in isolation" without stakeholder/product
thinking are a poor fit (same brief, "Top misconceptions"). SRE is similar — reliability of others'
services is the mandate, and the "circle of control vs. circle of concern" frustration described in
the Tiny Struggles exit account is a direct symptom of low personal product-outcome ownership
despite broad influence (sre-production-engineer.md, "Common exit paths"). Product SWE sits at the
other pole — success is explicitly tied to "shipping working software" for product/business
outcomes, with product-manager as the single most natural adjacent/exit role
(product-full-stack-software-engineer.md, "Common exit paths"). ML Engineer's generalist flavor is
also business-outcome-oriented (success = "A/B test outcomes and business KPIs moved," not offline
model metrics — ml-engineer.md, "Success criteria") while its Platform variant pulls back toward the
infra pole. Data Engineer sits closer to infra/systems, since its "customers" are internal analysts/
scientists rather than end users, but is judged partly on downstream "trust," a soft business-facing
metric (data-engineer.md, "Success criteria").

**1-5 anchor:**
- 1 (pure infra/systems): Motivated by the system's technical soundness for its own sake; cares
  more that the pipeline/service is well-built than what business result it drives.
- 3: Cares about both — wants technically sound systems but frames success in terms of what they
  enable for users/the business.
- 5 (pure product/business): Primarily motivated by user/business impact; treats the technology as
  a means to an end and is comfortable with imperfect infra if it ships the outcome.

---

## 7. Ownership-of-outcome vs. ownership-of-system

**Definition:** Whether a person's sense of responsibility is anchored to a measurable external
outcome they can be held accountable for (e.g., a KPI, an SLO, blame for a bug) vs. stewardship of
a system/codebase's long-term health regardless of any single outcome.

**Why it differentiates this cluster:** Data Engineer is a sharp positive case for
outcome-accountability without proportionate control: 87% of data engineers report being blamed
when a number is wrong "even when the root cause is upstream" — a distinctive burden of being held
accountable for outcomes they don't fully control (data-engineer.md, "Day-to-day activities," citing
data.world). SRE's error-budget/SLO model is the most formalized version of outcome-ownership in
this cluster — engineers are literally scored against a numeric reliability target for services they
often don't write the business logic for (sre-production-engineer.md, "Success criteria"). Platform
Engineer, by contrast, is judged on system/tooling adoption and quality (a proxy closer to
system-stewardship than a hard external KPI) (platform-infrastructure-engineer.md, "Success
criteria"). Product SWE's success criteria are explicitly scope-and-judgment based rather than
tied to a single metric ("big ideas that are also right," not raw output —
product-full-stack-software-engineer.md, "Success criteria"), placing it more toward system/
craft-ownership except when directly running an on-call product surface. ML Engineer is a strong
outcome-ownership case: success is explicitly tied to "A/B test outcomes and business KPIs moved"
rather than code elegance or model sophistication (ml-engineer.md, "Success criteria").

**1-5 anchor:**
- 1 (system stewardship): Derives satisfaction from the system being well-designed/maintainable;
  uncomfortable being personally on the hook for a metric influenced by factors outside their
  control.
- 3: Comfortable owning a metric or SLA for a system they mostly control, wants clear
  attribution before accepting blame.
- 5 (outcome accountability): Readily accepts being the named owner of a KPI/SLO/production
  incident even when upstream factors they don't control contribute, and treats that accountability
  as motivating rather than unfair.

---

## 8. Research/exploration vs. production/hardening orientation

**Definition:** Preference for open-ended exploration and iteration toward a promising approach vs.
hardening a known-working approach into something reliable, repeatable, and low-maintenance.

**Why it differentiates this cluster:** This is the ML Engineer archetype's most load-bearing
internal distinction, and the brief is emphatic about where the *center of gravity* sits for the
archetype as scoped here: "the center of gravity is making ML work reliably in production, not
inventing new algorithms," and companies explicitly prefer strong engineers over strong ML
theorists because "engineering discipline is harder to teach than ML concepts"
(ml-engineer.md, "Scope and definition," citing Huyen). The brief draws a hard boundary excluding
Research/Applied Scientist (high-exploration, publication-oriented, PhD-gated) from this archetype
entirely, which is itself evidence this dimension is real and worth scoring even though the
excluded pole isn't a separate archetype in this taxonomy (ml-engineer.md, "Out-of-scope boundary
note"). Within this cluster, ML Engineer still scores highest on the exploration end relative to the
other four archetypes, since model/approach selection retains some open-ended trial-and-error that
Platform, SRE, Data Engineer, and Product SWE don't really have analogs for. SRE, Platform, and Data
Engineer are all clearly hardening-oriented — reliability, adoption, and pipeline stability are
literally about taking something and making it dependable at scale, not exploring new approaches.
Product SWE is closest to Data Engineer/Platform on this axis — mostly hardening/shipping known
patterns, with occasional prototyping.

**1-5 anchor:**
- 1 (production/hardening): Wants to take a known-good approach and make it bulletproof,
  repeatable, and low-toil; loses interest once the "interesting problem" is solved and the work
  becomes operational polish.
- 3: Comfortable moving between exploring a new approach and hardening it once proven.
- 5 (research/exploration): Energized by open-ended "will this approach even work" problems;
  finds the hardening/maintenance phase after a solution is proven to be the less interesting part
  of the job.

---

## 9. Cross-team stakeholder/consulting comfort (internal client-facing orientation)

**Definition:** Comfort acting as a service provider to other engineers or teams — gathering
requirements, advocating for adoption, and being evaluated the way an internal vendor would be —
as distinct from writing code for an external end user or for oneself.

**Why it differentiates this cluster:** Platform Engineer is the clearest high-anchor: the brief
insists platform engineering is "not just a technical shift — primarily... a mindset shift" toward
product thinking where internal developers are literally treated as customers whose adoption is the
success metric, and warns that engineers who "dislike stakeholder work" are a poor fit despite
matching technical skills (platform-infrastructure-engineer.md, "Career ladder" and "Top
misconceptions"). Data Engineer's brief describes an explicitly "consulting-flavored variant"
(DataKind) sitting "at the intersection of architecture, engineering, and client partnership," and
lists solutions-architect/forward-deployed roles as a common exit path specifically because the
"client-communication muscle" built in data engineering transfers well
(data-engineer.md, "Day-to-day activities" and "Common exit paths"). ML Engineer's Platform/MLOps
flavor is explicitly compared to "embedded consulting" to data science/ML teams, evaluated on
internal-customer outcomes rather than a hard metrics rubric (ml-engineer.md, "Success criteria,"
citing Bazeley). SRE carries some of this (cross-team architecture influence) but its primary
relationship is to the reliability of a system, not a client relationship per se
(sre-production-engineer.md). Product SWE's version of this is collaboration with product/design,
which is closer to a peer/teammate relationship than a vendor/customer one
(product-full-stack-software-engineer.md, "Day-to-day activities").

**1-5 anchor:**
- 1: Prefers to be handed requirements and left alone to build; uncomfortable "selling" adoption
  of their own work internally or fielding open-ended requests from other teams.
- 3: Willing to gather requirements and communicate with other teams when the process is
  structured (tickets, planning cycles).
- 5: Actively enjoys the requirements-gathering/advocacy/adoption-driving loop of treating other
  engineers as customers; comfortable being evaluated on whether people choose to use what they
  built.

---

## Notes for synthesis pass

- Dimension #1 (interrupt-driven vs. deep-work) and #2 (on-call/pager tolerance) are closely
  related but distinct — #1 is about daytime attention fragmentation generally, #2 is specifically
  about off-hours paging and incident response. Synthesis may choose to merge these into one
  "operational load tolerance" dimension with two sub-anchors, or keep separate; recommend keeping
  separate since a person could tolerate meeting-heavy interrupt-driven days but still refuse
  on-call (or vice versa — enjoy the adrenaline of an on-call page but hate routine daytime
  interruptions).
- Dimension #6 (infra/product orientation) and #9 (stakeholder/consulting comfort) overlap somewhat
  — #6 is about what the person is motivated by (the system vs. the outcome), #9 is about the
  *relational* comfort of serving other engineers as clients. A platform engineer could be highly
  infra-oriented (#6 low) but still need high stakeholder comfort (#9 high) to succeed, so
  recommend keeping both.
- Did not propose a standalone "coding ability" or "years of experience" dimension per the task
  instructions (redundant/obvious). Also did not propose a standalone "communication/writing skill"
  dimension since the evidence for this cluster maps more precisely onto #9 (stakeholder comfort)
  and #3 (ambiguity tolerance) rather than being a distinct axis with clear differentiation across
  these five archetypes specifically — may still be warranted from other clusters (e.g.,
  client-facing/pre-sales archetypes), so leaving that call to synthesis.
