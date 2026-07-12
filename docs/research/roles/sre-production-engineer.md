# SRE / Production Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **316 real, currently-live job postings across 127 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 127 total):

- **Caterpillar** — "Senior SRE Engineer-Production Support"
- **Life360** — "Senior Site Reliability Engineer II - Infrastructure (AI Native)"
- **Harvey** — "Senior Software Engineer, Site Reliability Engineer"
- **Synthesia** — "Senior Site Reliability Engineer"
- **Anduril Industries** — "Senior Site Reliability Engineer"
- **Instructure** — "Sr Production Engineer - US Remote"
- **HPE** — "Site Reliability Engineer Staff"
- **Bybit** — "SRE Leader"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Cluster:** Infrastructure & Reliability
**Status:** v1 draft — expert-authored, sourced

## Scope note (see platform-infrastructure-engineer.md for full merge/split reasoning)

Kept as a **separate archetype from Platform/Infrastructure Engineer**. SRE's defining mandate is
service reliability (SLOs, error budgets, incident response, on-call) versus platform engineering's
developer-experience mandate ([Octopus Deploy, "Platform Engineering Versus SRE"](https://octopus.com/devops/platform-engineering/platform-engineering-vs-sre/)). The two converge
at smaller companies and share tooling almost entirely (Kubernetes, Terraform, observability
stacks), so the CareerGuru assessment should expect near-ties between these two archetypes for many
respondents and treat that as correct behavior, not a scoring bug.

---

## Day-to-day activities

- Split time between **project work** (building tooling, automation, resilience patterns) and
  **operational/reactive work** (on-call, incident response, toil). Google's own SRE doctrine
  explicitly caps operational work at ~50% of an SRE's time to prevent teams from degrading into a
  pure ops/ticket rotation — a foundational, widely-cited practitioner source ([Google SRE Book, "Being Glue" / on-call chapters](https://sre.google/sre-book/operational-overload/); [Google SRE Workbook, "On-Call"](https://sre.google/workbook/on-call/)).
  In practice this ratio slips: the 2025 SRE Report found engineers spend a **median of 30%** of
  their week on operational work, up from 25% the prior year ([cited via Rootly, "From On-Call to Reliability"](https://rootly.com/blog/from-on-call-to-reliability-how-to-turn-stress-into-system-improvement)).
- Build and maintain monitoring, alerting, and failure-detection tooling; define and track SLOs and
  error budgets; drive resilience patterns (retries, circuit breakers, graceful degradation) across
  services owned by other teams ([Splunk, "SRE vs. DevOps vs. Platform Engineering"](https://www.splunk.com/en_us/blog/learn/sre-vs-devops-vs-platform-engineering.html)).
  services owned by other teams ([Splunk, "SRE vs. DevOps vs. Platform Engineering"](https://www.splunk.com/en_us/blog/learn/sre-vs-devops-vs-platform-engineering.html)).
- Carry on-call rotations, sometimes 24/7 follow-the-sun across regions/continents, responding to
  pages and coordinating incident response — explicit in real postings, e.g. Google SRE roles
  requiring engineers to "join a tier 1 on-call rotation" and "manage on-call rotations across
  continents, using a follow-the-sun model" ([Google Careers, Site Reliability Engineering search results](https://www.google.com/about/careers/applications/jobs/results/134159803340464838-site-reliability-engineering/)).
- Own escalation during live outages and drive post-incident reviews/postmortems.
- Write production-grade code (commonly Python, Go) — SRE is an engineering role, not a
  ticket-queue role: a representative Google posting requires "4 years of experience with site
  reliability engineering... and 4 years of experience in automation and coding in Python" plus
  "3 years of experience developing infrastructure, distributed systems/networks" ([Google Careers, SRE listing](https://www.google.com/about/careers/applications/jobs/results/134159803340464838-site-reliability-engineering/)).
- Design, influence, and review architecture/standards for the services they support, working
  jointly with the product/dev teams who own those services' business logic ([Google Careers, SRE listing](https://www.google.com/about/careers/applications/jobs/results/134159803340464838-site-reliability-engineering/)).

## Success criteria

- Service availability against SLOs / error-budget adherence — the central metric distinguishing
  SRE from platform engineering's developer-experience metrics.
- Incident frequency, mean-time-to-detect, and mean-time-to-resolve trending down over time.
- Toil reduction: the fraction of time spent on manual repetitive operational work should shrink as
  automation investment pays off (directly tied to the 50%-project-time doctrine above).
- Alert quality: teams report receiving 2,000+ alerts weekly with only ~3% needing immediate
  action — a mature SRE org is judged partly on *reducing* alert noise so real signals aren't
  buried, not just on responding to alerts ([FireHydrant, "Alert Fatigue in SRE"](https://firehydrant.com/blog/alert-fatigue/)).
- At senior levels: organizational reliability posture — influencing architecture and standards
  broadly, not just firefighting one service.

## Comp structure

- Base-heavy with equity; on-call is generally *not* separately compensated as variable pay at most
  big tech companies (folded into base/equity/bonus banding), though some companies pay explicit
  on-call stipends — this varies enough by company that it's worth flagging rather than asserting
  either way.
- levels.fyi-reported total comp by company (title: Site Reliability Engineer), overall median
  reported at **$203,600**:
  - Google: $197K (L3) up to $768K (L7) ([levels.fyi, Google SRE](https://www.levels.fyi/companies/google/salaries/software-engineer/title/site-reliability-engineer))
  - Microsoft: $189K (level 59) up to $430K (level 65) ([levels.fyi, Microsoft SRE](https://www.levels.fyi/companies/microsoft/salaries/software-engineer/title/site-reliability-engineer))
  - Workday: $205K (P3) up to $265K (P4) ([levels.fyi, Workday SRE](https://www.levels.fyi/companies/workday/salaries/software-engineer/title/site-reliability-engineer))
  - Goldman Sachs: $155K–$227K+ ([levels.fyi, Goldman Sachs SRE](https://www.levels.fyi/companies/goldman-sachs/salaries/software-engineer/title/site-reliability-engineer))
  - Red Hat: $135K–$212K+ ([levels.fyi, Red Hat SRE](https://www.levels.fyi/companies/red-hat/salaries/software-engineer/title/site-reliability-engineer))
  - Electronic Arts: $151K–$211K+ ([levels.fyi, EA SRE](https://www.levels.fyi/companies/electronic-arts/salaries/software-engineer/title/site-reliability-engineer))
- Comp structure and bands closely track general software engineering ladders at the same company
  (SRE is priced as a software engineering discipline, not an ops/IT discipline) — visible in the
  shared "software-engineer" URL namespace levels.fyi uses for the title.

## Career ladder

- Maps onto standard IC ladders: IC1/2 (junior) → IC3 (mid, owns team-scoped projects) → IC4/Senior
  (owns large impactful projects consistently) → IC5/Staff (scope expands beyond one team into
  technical strategy) → IC6+/Principal → Distinguished/Fellow at the largest companies ([Seekersy, "Software Engineering Levels Explained"](https://seekersy.com/blog/software-engineering-levels-explained); [Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/), which
  explicitly includes Reliability Engineer tracks through IC7/Senior Principal).
- Distinct SRE-specific ladder branch beyond Staff: **SRE Manager, Principal SRE, or Head of
  Reliability Engineering**, with senior ICs/managers contributing to org-wide reliability policy
  rather than a single service ([DevOpsSchool, "SRE Engineer Role Blueprint"](https://www.devopsschool.com/blog/sre-engineer-role-blueprint-responsibilities-skills-kpis-and-career-path/)).
- A notable minority of SREs move into **people management** earlier than typical for pure product
  SWE, because on-call/incident coordination already builds cross-team influence and stakeholder
  management muscle (see practitioner account below).

## Common entry paths

- Backend/systems software engineering — most common feeder, especially engineers drawn to
  distributed-systems failure modes and automation over feature work.
- Traditional sysadmin/ops or DevOps roles leveling up into a formal SRE title as they add
  software-engineering rigor (coding, testing, systems design) to an operations background.
- Direct new-grad hiring exists at large companies (Google runs dedicated SRE new-grad pipelines),
  though most postings request several years of relevant experience — e.g. "4 years of experience
  with site reliability engineering" for even non-senior-titled Google roles ([Google Careers, SRE listing](https://www.google.com/about/careers/applications/jobs/results/134159803340464838-site-reliability-engineering/)).

## Common exit paths

- SRE → Engineering Manager (SRE/Platform), a common and well-trodden path given the stakeholder
  and incident-coordination experience SREs accumulate ([DevOpsSchool](https://www.devopsschool.com/blog/sre-engineer-role-blueprint-responsibilities-skills-kpis-and-career-path/)).
- Lateral moves into Platform Engineering, Security Engineering, Network Engineering, Performance
  Engineering, or FinOps/Cloud-Cost Engineering — all adjacent disciplines sharing SRE's
  infrastructure fluency ([DevOpsSchool](https://www.devopsschool.com/blog/sre-engineer-role-blueprint-responsibilities-skills-kpis-and-career-path/)).
- SRE → general product/backend Software Engineer: a genuine and non-trivial exit path. One
  practitioner's firsthand account after 7 years as a Google SRE (including time as an SRE manager)
  describes leaving because "technical learning at the job slowed a lot" in the management track,
  and because the role's "very wide circle of concern, wide circle of influence and tiny circle of
  control" (constant negotiation and dependency management, little direct execution) didn't match
  their entrepreneurial goals ([Tiny Struggles, "I left my Site Reliability job"](https://www.tinystruggles.com/posts/leaving_sre/)). This is a useful counter-narrative to
  "SRE is a stable forever-career" — some practitioners find the incident-response emotional labor
  and low creative-building time push them out after several years.
- Founder/entrepreneurial exits: anecdotally observed in practitioner writing (see above) but not
  well-documented at scale — flagged as directional, not a sourced trend.

## Top misconceptions vs. reality

- **Misconception: "SRE is just ops/sysadmin with a rebrand."**
  Reality: it's a software-engineering discipline first — Google's own hiring bar requires years of
  coding/automation experience (Python, distributed systems), and comp bands track SWE ladders, not
  IT/ops ladders ([Google Careers listing](https://www.google.com/about/careers/applications/jobs/results/134159803340464838-site-reliability-engineering/); [levels.fyi SRE data](https://www.levels.fyi/companies/google/salaries/software-engineer/title/site-reliability-engineer)).
- **Misconception: "On-call means constant firefighting, all the time."**
  Reality varies by org maturity: Google's stated doctrine reserves half of SRE time for proactive
  project work specifically to prevent this outcome — but the 2025 SRE Report shows the industry
  median is trending the wrong way (30% operational load, up from 25%), meaning the espoused
  doctrine and the lived reality diverge company-to-company ([Google SRE Book](https://sre.google/sre-book/operational-overload/); [Rootly, SRE Report synthesis](https://rootly.com/blog/from-on-call-to-reliability-how-to-turn-stress-into-system-improvement)). Candidates should ask
  specifically about on-call load and the operational/project split in interviews rather than
  assume either extreme.
- **Misconception: "It's a stable, low-drama, forever-career if you like systems."**
  Reality: burnout and exit are common enough to have a visible practitioner literature (alert
  fatigue, blurred on-call/sprint boundaries, "circle of control vs. circle of concern" frustration
  in management-track SRE) ([FireHydrant, Alert Fatigue](https://firehydrant.com/blog/alert-fatigue/); [Tiny Struggles firsthand account](https://www.tinystruggles.com/posts/leaving_sre/)). The role rewards people who
  specifically enjoy incident composure and structured toil-reduction — it is not a good fit merely
  because someone likes systems work in the abstract; that preference is better served by platform
  engineering if incident response itself isn't appealing.

## Open questions for later phases

- Need a scoring-rubric mechanism (Phase 2) for handling the expected near-tie between SRE and
  Platform/Infra Engineer archetypes rather than forcing an artificial separation.
- On-call compensation practices (stipend vs. folded into base) are heterogeneous enough across
  companies that the results-page copy should caveat this rather than state a single norm — worth
  a follow-up source pull per flagship company if this becomes a decision point users care about.
