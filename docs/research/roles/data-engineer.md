# Role Archetype Brief: Data Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **525 real, currently-live job postings across 209 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 209 total):

- **Obsidian Security** — "Senior Security Data Engineer"
- **Verkada** — "Staff Data Engineer"
- **Take-Two Interactive** — "Data Engineer (Python/Spark)"
- **Life360** — "Director, Data Engineering (AI Native)"
- **Pendo** — "Sr. AI-First Backend & Data Engineer"
- **Attentive** — "Staff Data Engineer, Cloud Optimization"
- **Fidelity** — "Principal Data Engineer"
- **Supabase** — "Senior Data Engineer"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Cluster:** Data & ML Engineering
**Status:** Draft v1 (Phase 1 research)
**Author note:** Autonomous research pass across two sequential sessions (initial draft plus a
follow-up pass adding big-tech job postings, additional comp data, and an AI-era misconception).
Open questions flagged inline.

---

## 1. Definition / scope

A data engineer designs, builds, and operates the infrastructure and pipelines that move data
from source systems into forms other people and systems (analysts, data scientists, ML engineers,
downstream products) can reliably use. The center of gravity is **data movement, transformation,
and platform reliability** — not the modeling or analysis done on top of the data.

This brief treats "data engineer" as its own archetype, distinct from:
- **Analytics engineer** — a narrower, newer role (post-dbt, ~2018+) focused on the SQL
  transformation layer between raw data and BI tools; often positioned as a sub-specialty *within*
  data engineering rather than a separate archetype for v1 purposes.
- **ML engineer** — covered in a separate brief; overlaps at the "feature pipeline" boundary but
  differs in end consumer (models vs. dashboards/apps) and skill center of gravity (ML
  infra/serving vs. distributed data systems).
- **Data scientist / data analyst** — consumers of the data engineer's output, not covered here.

## 2. Day-to-day activities

- Building and maintaining ETL/ELT pipelines (batch and streaming) that extract from source
  systems (product DBs, third-party APIs, event streams) and load into warehouses/lakes
  [Indeed job description guide](https://www.indeed.com/hire/job-description/data-engineer).
- Designing and optimizing data warehouse/lakehouse schemas and storage layout for cost and query
  performance [Scaler job description template](https://www.scaler.com/blog/data-engineer-job-description/).
- Implementing data quality checks, validation, and observability (freshness, volume, schema drift
  monitors) — increasingly treated as first-class engineering work, not an afterthought
  [Taggd 2026 roles/responsibilities guide](https://taggd.in/blogs/data-engineer-roles-and-responsibilties/).
- Building/maintaining integrations with internal and external APIs and data sources; owning
  ingestion reliability.
- Collaborating with data scientists, analysts, and software engineers to translate their data
  needs into pipeline/schema requirements.
- Monitoring pipeline health, triaging failures (often via on-call/pager rotations), and doing
  root-cause fixes — this operational load is a substantial, sometimes underestimated share of the
  job. A 2023 data.world survey found **97% of data engineers report being burnt out**, with the
  top drivers being manual firefighting work (50%) and time spent finding/fixing broken data (50%);
  **87% of the time something breaks in data/analytics, the blame lands on the data engineer** even
  when the root cause is upstream [data.world, "Why so blue? 5 reasons data engineers are burnt
  out"](https://data.world/blog/why-so-blue-5-reasons-data-engineers-are-burnt-out/).
- At smaller companies/startups: doing the above end-to-end almost solo, plus DevOps-adjacent
  platform work (provisioning warehouses, managing cost). At larger companies: increasing
  specialization into platform/infra sub-tracks (see Nourish and Xealth postings below) with
  narrower, deeper ownership.

Representative real postings (title / company / level / scope, pulled July 2026):
- **Data Engineer (L5), Netflix** — USA-Remote, Data & Insights org, req JR37949: requires
  "distributed data processing or software engineering of data services, or data modeling,"
  fluency with Spark/Flink at web-scale, and "an eye for detail, good data intuition, and passion
  for data quality" [Netflix Careers](https://explore.jobs.netflix.net/careers/job/790313345439-data-engineer-l5--usa-remote?domain=netflix.com&microsite=netflix.com).
- **Senior Data Engineer / Staff Software Engineer, Data Engineering, Airbnb** — responsibilities
  span "architect and productionize batch and real-time data systems," "ensure the quality,
  performance, and stability of data systems through robust quality systems and monitoring," and
  "develop and automate large scale, high-performance batch and streaming data processing systems"
  using Scala/Python, SQL, and orchestration frameworks like Airflow
  [Airbnb Careers](https://careers.airbnb.com/positions/7256787/).
- **Data Engineer, Data Engineering Solutions, Stripe** (listing 7529428) — "deliver cutting-edge
  data pipelines that scale... focusing on reliability and efficiency," "manage the SLAs of data
  pipelines," "build pipelines processing billions of events a day," act as "stewards of canonical
  data warehouses," and — a 2025-era addition — "leverage AI/LLM and Agents at scale to produce and
  analyze high-quality data on ambiguous problems"
  [Stripe Careers](https://stripe.com/jobs/listing/data-engineer-data-engineering-solutions/7529428).
- **Data Engineer, Capital One** (New York) and **Distinguished Data Engineer, Capital One
  Software** (Remote) — designs "self-service frameworks that allow data analysts and business
  stakeholders to access clean, governed data," partners with Cyber/Tech teams on data-access
  governance for regulated financial data; the Distinguished-level posting shows the top of the IC
  ladder is a real, separately-titled rung at this company
  [Capital One Careers — Data Engineer](https://www.capitalonecareers.com/job/new-york/data-engineer/1732/89805162176);
  [Capital One Careers — Distinguished Data Engineer](https://www.capitalonecareers.com/job/mclean/distinguished-data-engineer/1732/92463057280).
- **Data Engineer, Rippling** (growth-stage, HR/IT/finance platform) — "responsible for the
  end-to-end lifecycle of data, from ingestion to consumption," builds "high-velocity streaming and
  batch consumers on AWS," develops self-service APIs for other teams; senior engineers are
  expected to "drive quarterly planning, define roadmaps, and elevate the team's engineering
  standards" — illustrating that at a mid-size company, data engineers own more of the stack
  end-to-end than the more specialized roles typical at big tech
  [Rippling Careers](https://www.rippling.com/engineering).
- **Senior Data Engineer, Recharge** — 5+ years experience, "track record of building scalable
  data pipelines, transformation, and platform solutions"
  [Greenhouse](https://job-boards.greenhouse.io/recharge/jobs/8510444002).
- **Senior Data Engineer, Xealth** — 5+ years production-grade pipelines, expert Python/PySpark/SQL,
  base salary posted $155,000–$225,000 depending on geographic market
  [Greenhouse](https://job-boards.greenhouse.io/xealth/jobs/7550718003).
- **Senior/Staff Data Engineer, Nourish** — first dedicated data-engineering hire, explicitly
  "platform role" building foundational reliability/cost-efficiency as the team scales; NYC hybrid
  preferred, remote considered for exceptional candidates
  [Greenhouse](https://job-boards.greenhouse.io/usenourish/jobs/5283958008).
- **Senior Data Engineer, Metropolis** — 5+ years across data engineering, database engineering,
  BI, data warehousing, ETL; posted base $160,000–$220,000
  [Greenhouse](https://job-boards.greenhouse.io/metropolis/jobs/7634556003).
- **Data Engineer, DataKind** — leads technical work on an end-to-end data platform for higher-ed
  clients, sits at intersection of architecture, engineering, and client partnership (a more
  consulting-flavored variant of the role) [Greenhouse](https://job-boards.greenhouse.io/datakindinc/jobs/7690497003).
- **Senior Data Engineer – Managed Services, 3Cloud** — consulting/managed-services flavor:
  supports client Azure data platforms (SSIS, Synapse, Data Factory, Databricks)
  [Greenhouse](https://job-boards.greenhouse.io/3cloud/jobs/8603382002).

At hyperscale (Uber), pipeline reliability is itself a large, dedicated engineering discipline:
Uber runs 20,000+ critical pipelines and datasets maintained by 3,000+ engineers, with formal
on-call rotations and per-dataset SLA/quality guarantees, and built a dedicated
data-quality-monitoring platform over a multi-month, cross-functional engineering effort — showing
that "pipeline reliability" work scales into its own specialty, not just an occasional side task
[Uber Engineering — "Managing Uber's Data Workflows at Scale"](https://www.uber.com/blog/managing-data-workflows-at-scale/);
[Bigeye — "Lessons Learned from Uber: Designing an Intelligent Data Quality Monitor"](https://www.bigeye.com/blog/lessons-learned-from-uber-designing-an-intelligent-data-quality-monitor).

A first-person practitioner account illustrates how this plays out day-to-day: a "should take a
day" task (adding one new event stream to the warehouse) actually took three weeks once schema
discovery, Spark/JVM debugging, cluster-contention troubleshooting, architecture review meetings,
and post-launch monitoring fixes were included — with time split roughly evenly across discovery,
development, debugging, and production operations
[lakeFS blog — "Diary of a Data Engineer"](https://lakefs.io/blog/diary-of-a-data-engineer/).
Relatedly, engineers commonly describe opening a monitoring dashboard before Slack each morning,
since pipeline failures often surface overnight, and afternoons tend to be meeting-heavy (analytics
syncs, PM planning sessions, cross-team data-model discussions) rather than pure heads-down build
time [DEV Community — "A Day in the Life of a Data Engineer (Real Talk, No Filter)"](https://dev.to/neha_christina_1ac8651819/a-day-in-the-life-of-a-data-engineer-real-talk-no-filter-18cm).

## 3. Success criteria

- Pipeline reliability/uptime and data freshness SLAs met; low rate of silent data-quality
  incidents reaching downstream consumers.
- Query/storage cost efficiency (a recurring explicit ask in postings — e.g., Nourish's "more cost
  efficient as they scale").
- Downstream trust: data scientists/analysts/PMs treat the warehouse as authoritative rather than
  re-verifying numbers themselves.
- At senior+ levels: architectural decisions (batch vs. streaming, build vs. buy, schema design)
  that hold up as the company scales, and mentoring/technical leadership across a data platform
  team.
- Successfully shifting from reactive firefighting to proactive observability — teams that measure
  this well track pipeline incident rate and mean-time-to-detect, not just feature throughput.

## 4. Comp structure

- **Structure:** Base + bonus + equity at most tech companies; consulting/managed-services shops
  (e.g., 3Cloud) skew more toward base + smaller bonus, less equity. Overwhelmingly salaried, not
  commission — this is a build/operate role, not a revenue-attributed one.
- **Levels.fyi aggregate:** median total data engineer compensation ~$160,000across reporting
  companies [Levels.fyi Data Engineer](https://www.levels.fyi/t/software-engineer/title/data-engineer).
- **Levels.fyi by company (total comp band, junior→senior IC):**
  - Google: $171K (L3) to $358K (L6), median $278K [Levels.fyi Google Data
    Engineer](https://www.levels.fyi/companies/google/salaries/software-engineer/title/data-engineer).
  - Meta: $168K (IC3) to $439K (IC6), median $182K [Levels.fyi Meta Data
    Engineer](https://www.levels.fyi/companies/meta/salaries/data-engineer).
  - Microsoft: $202K (62) to $289K (64), median $217K [Levels.fyi Microsoft Data
    Engineer](https://www.levels.fyi/companies/microsoft/salaries/software-engineer/title/data-engineer).
  - IBM: $89.1K (Band 6) to $173K (Band 9), median $115K [Levels.fyi IBM Data
    Engineer](https://www.levels.fyi/companies/ibm/salaries/software-engineer/title/data-engineer).
  - Netflix: $363K (L4) to $783K (L6), median ~$565K — a notable outlier vs. every other company
    here, consistent with Netflix's known top-of-market, all-senior-hire comp philosophy and its
    unusual model where employees elect annually how much comp to take as cash vs. stock options
    (these are crowdsourced, employee-elected figures, not official Netflix numbers) [Levels.fyi
    Netflix Data Engineer](https://www.levels.fyi/companies/netflix/salaries/software-engineer/title/data-engineer).
  - Amazon: $143K (L4) to $258K (L6) — Amazon is known industry-wide for back-loaded RSU vesting
    rather than large year-one stock grants, so early-tenure total comp understates steady-state
    comp [Levels.fyi Amazon Data Engineer](https://www.levels.fyi/companies/amazon/salaries/data-engineer).
  - Capital One: median total comp package **~$130K** — dramatically lower than the big-tech
    figures above, reflecting the more cash-heavy, less equity-driven comp model typical of banks
    even for technical roles [Levels.fyi Capital One Data
    Engineer](https://www.levels.fyi/companies/capital-one/salaries/data-engineer).
- **Glassdoor market-wide (self-reported, ~33K submissions as of June 2026):** average total pay
  **$133,484/yr**, interquartile range **$104,682–$171,980**; additional/bonus pay averages
  **~$25,335/yr** on top of base. By level: entry-level average **$94,798/yr**; Data Engineer I
  average **$126,104/yr**; Senior Data Engineer average **$175,334/yr** [Glassdoor — "Data
  Engineer: Average Salary & Pay Trends 2026"](https://www.glassdoor.com/Salaries/data-engineer-salary-SRCH_KO0,13.htm).
- **Posted base ranges (non-FAANG, mid-market, 2026):** Xealth $155K–$225K; Metropolis $160K–$220K
  — both senior-level, both notably close to or above FAANG L4/L5 base, suggesting data engineering
  base comp has compressed toward general senior-SWE bands at well-funded mid-market companies,
  while total comp still lags Big Tech mainly on the equity component.
- **Takeaway:** comp structure mirrors general software engineering (equity-heavy at Big
  Tech/late-stage startups, base-heavy at services firms and traditional enterprises) rather than
  having its own distinct structure — data engineering is priced as a SWE specialization, not a
  separate labor market.

## 5. Career ladder

Standard dual-track IC/management ladder, same leveling convention as general software
engineering [Fonzi engineering career levels
guide](https://fonzi.ai/blog/engineering-career-levels); [LeadDev: staff, principal, distinguished
engineers](https://leaddev.com/career-development/who-are-staff-principal-and-distinguished-engineers).

- **IC1–IC2 (Junior/Associate Data Engineer, 0–2 yrs):** builds and maintains pipelines under
  direction; learns the company's stack (warehouse, orchestrator, transformation tool); limited
  architectural scope.
- **IC3 (Data Engineer, 2–5 yrs):** owns pipelines/domains independently; contributes to schema
  design; on-call rotation participant.
- **IC4 (Senior Data Engineer, 5+ yrs):** sets technical direction for a data domain or platform
  component; the level most job postings above are hiring at; mentors juniors; makes build-vs-buy
  calls.
- **IC5 (Staff Data Engineer, ~7–8+ yrs):** owns platform-wide architecture (e.g., the warehouse
  migration, the streaming platform); cross-team technical leadership; often the "first dedicated
  data engineering hire" archetype seen in the Nourish posting scales into this.
- **IC6+ (Principal/Distinguished Data Engineer):** sets data platform strategy company-wide;
  rare distinct title — many organizations fold this into a general "Principal Engineer" or
  "Staff/Principal, Data Platform" title rather than keeping "data engineer" in the name.
- **Management branch:** Data Engineering Manager → Director of Data Engineering → VP
  Data/Platform, typically converges with broader "Data" or "Platform" org leadership rather than
  staying a pure-play data-engineering management ladder.

*Open question:* unlike SWE, there isn't a standardized public ladder specifically for "data
engineer" the way e.g. Rent the Runway or Medium publish SWE ladders; leveling above Staff is
company-specific and often merges into general infra/platform ladders. Treat IC5+ boundaries as
approximate.

## 6. Common entry paths

- **CS degree → generalist SWE role → lateral/rotation into data engineering.** Common at
  companies large enough to have a distinct data platform team.
- **Direct entry via bootcamp or self-study.** Feasible without a 4-year degree; average bootcamp
  job-placement rate (~71%) is cited as comparable to or slightly above CS-grad placement (~68%)
  in industry bootcamp marketing material — treat this stat with skepticism, it's largely
  bootcamp-vendor-sourced [DataDriven bootcamp comparison](https://datadriven.io/data-engineering-bootcamp);
  [CCS Learning Academy career path guide](https://bootcamp.ccslearningacademy.com/data-engineer-career-path/).
  Interviews weight demonstrated SQL/Python/data-modeling ability over credentials.
  Typical self-study runway: 3–6 months with prior programming experience, 6–12 months from zero
  [DataCamp, "How to Become a Data Engineer in 2026"](https://www.datacamp.com/blog/how-to-become-a-data-engineer).
- **Backend/software engineer → data engineer.** A common and relatively low-friction lateral move
  — shared foundation in programming, system design, and cloud infra; the delta to close is
  distributed-data-systems tooling (Spark, Kafka, orchestrators) and data-modeling practice.
- **Data analyst → analytics engineer → data engineer.** A bottom-up path through the
  SQL/transformation layer before picking up pipeline/infra ownership.
- **IT/database administrator → data engineer.** Common at traditional enterprises, especially
  where the DBA function is being modernized into a cloud data platform team.

## 7. Common exit paths

- **Analytics/data leadership:** Data Engineering Manager → Director of Data/Analytics → Head of
  Data/CDO track, especially at companies where data engineering reports into a unified data org.
- **ML engineering / MLOps:** natural adjacent move given shared infra (feature pipelines, batch
  jobs, orchestration); the boundary between senior data engineer and ML platform engineer is
  often just which consumers you serve.
- **Platform/infrastructure engineering (general):** the distributed-systems and cloud skills
  transfer directly; some data engineers exit into general infra/SRE roles for broader scope or a
  perceived reduction in "everyone blames me when a number is wrong" pressure.
- **Solutions architect / forward-deployed / consulting:** especially from services-flavored data
  engineering roles (e.g., 3Cloud-style managed services, DataKind-style client-facing data
  platform work) — the client-communication muscle built there transfers well.
- **Independent consulting/contracting:** data platform migrations (e.g., warehouse-to-warehouse,
  on-prem-to-cloud) are a recurring high-demand, project-based need that supports solo/boutique
  consulting.

## 8. Top misconceptions vs. reality

1. **Misconception: "Data engineer" = "data scientist but more technical."**
   Reality: these are different jobs with different outputs. A data engineer builds the systems
   that produce/move data; a data scientist analyzes it; an analytics engineer (increasingly a
   distinct role since ~2018, post-dbt) sits in between, turning raw data into
   consistently-modeled, analyst-ready tables. Practitioners report the titles get used
   inconsistently across companies, which fuels the confusion
   [IBM: Data Engineer vs Data Scientist vs Analytics Engineer](https://www.ibm.com/think/topics/data-engineer-data-vs-data-scientist-vs-analytics-engineer);
   [Jason Ganz, Medium — "Data Scientist or Analytics Engineer: How I Made the Decision That
   Defined My Career"](https://jasnonaz.medium.com/data-scientist-or-analytics-engineer-how-i-made-the-decision-that-defined-my-career-1646d4296467).
   Ganz's account is a useful first-person data point: he set out to become a data scientist,
   discovered through community exposure that what he actually wanted was to make data usable for
   decisions — which pulled him toward the engineering/analytics-engineering side rather than
   modeling.

2. **Misconception: it's a "build it once" infrastructure job with predictable, deep-work days.**
   Reality: a large and often underestimated share of the job is operational — pipeline breakage,
   upstream schema changes, on-call, and being the default blame target when a dashboard number
   looks wrong even if the root cause is an upstream product change. The 97%-burnout /
   50%-manual-firefighting / 87%-blamed figures above are self-reported survey data from one
   vendor (data.world) and should be read as directional signal about the *complaint pattern*,
   not a precise population statistic — but the pattern (reactive firefighting, blame absorption)
   recurs consistently in practitioner discussion.

3. **Misconception: you need a CS degree and years of "real" software engineering experience to
   break in.** Reality: entry paths are unusually plural for a technical role — bootcamp,
   self-study, DBA/IT lateral, and analyst-upward paths are all viable and commonly cited; what
   gates hiring is demonstrated SQL/Python/data-modeling competence more than credential pedigree.

4. **Misconception: comp is a distinct, lower-paying track from "real" software engineering.**
   Reality: at companies that report to Levels.fyi, data engineer total comp bands track closely
   with general SWE bands at the same company/level (e.g., Google, Meta, Microsoft postings above)
   — the job is priced as a SWE specialization, not a separate, discounted labor market. The
   *median* aggregate figure ($160K) looks lower than SWE medians mainly because more
   non-Big-Tech, non-equity-paying companies report data engineer comp into the aggregate. That
   said, the spread is real and large: a bank/enterprise data engineer (Capital One, ~$130K total)
   vs. a big-tech senior/staff data engineer (Netflix, ~$500K–780K total) is roughly a 4-6x gap,
   driven almost entirely by equity — base salaries are comparatively closer across companies than
   total comp figures suggest.

5. **Misconception (emerging, 2025-2026): AI/LLMs will replace data engineers.** Reality: industry
   commentary frames AI as shifting the role rather than eliminating it — transforming engineers
   "from pipeline coders to data architects, governance stewards, and analytics enablers" — and
   this is corroborated by an actual, current job requirement: Stripe's Data Engineer posting lists
   "leverage AI/LLM and Agents at scale to produce and analyze high-quality data on ambiguous
   problems" as a core responsibility [IT IDOL Technologies — "Data Engineering Myths That AI Is
   Breaking"](https://itidoltechnologies.com/blog/data-engineering-myths-that-ai-is-breaking/);
   [Stripe Careers](https://stripe.com/jobs/listing/data-engineer-data-engineering-solutions/7529428).
   A frequently-cited "80% of practitioners already use AI daily" stat comes from a vendor blog and
   could not be independently cross-verified in this pass — treat as directional, not precise.

## Sources

1. [Indeed — Data Engineer Job Description (Updated for 2026)](https://www.indeed.com/hire/job-description/data-engineer)
2. [Taggd — Data Engineer Roles and Responsibilities [2026]](https://taggd.in/blogs/data-engineer-roles-and-responsibilties/)
3. [Scaler — Data Engineer Job Description Template for 2025](https://www.scaler.com/blog/data-engineer-job-description/)
4. [Levels.fyi — Data Engineer Salary (aggregate)](https://www.levels.fyi/t/software-engineer/title/data-engineer)
5. [Levels.fyi — Google Data Engineer Salary](https://www.levels.fyi/companies/google/salaries/software-engineer/title/data-engineer)
6. [Levels.fyi — Meta Data Engineer Salary](https://www.levels.fyi/companies/meta/salaries/data-engineer)
7. [Levels.fyi — Microsoft Data Engineer Salary](https://www.levels.fyi/companies/microsoft/salaries/software-engineer/title/data-engineer)
8. [Levels.fyi — IBM Data Engineer Salary](https://www.levels.fyi/companies/ibm/salaries/software-engineer/title/data-engineer)
9. [Greenhouse — Senior Data Engineer, Recharge](https://job-boards.greenhouse.io/recharge/jobs/8510444002)
10. [Greenhouse — Senior Data Engineer, Xealth](https://job-boards.greenhouse.io/xealth/jobs/7550718003)
11. [Greenhouse — Senior/Staff Data Engineer, Nourish](https://job-boards.greenhouse.io/usenourish/jobs/5283958008)
12. [Greenhouse — Senior Data Engineer, Metropolis](https://job-boards.greenhouse.io/metropolis/jobs/7634556003)
13. [Greenhouse — Data Engineer, DataKind](https://job-boards.greenhouse.io/datakindinc/jobs/7690497003)
14. [Greenhouse — Senior Data Engineer, Managed Services, 3Cloud](https://job-boards.greenhouse.io/3cloud/jobs/8603382002)
15. [Fonzi — The Engineering Career Ladder: Understanding Ranks, Levels, and Paths](https://fonzi.ai/blog/engineering-career-levels)
16. [LeadDev — Who are staff, principal, and distinguished engineers?](https://leaddev.com/career-development/who-are-staff-principal-and-distinguished-engineers)
17. [DataCamp — How to Become a Data Engineer in 2026: 5 Steps for Career Success](https://www.datacamp.com/blog/how-to-become-a-data-engineer)
18. [DataDriven — Data Engineering Bootcamp: Honest Comparison vs Self-Study (2026)](https://datadriven.io/data-engineering-bootcamp)
19. [IBM — Data Engineer vs Data Scientist vs Analytics Engineer](https://www.ibm.com/think/topics/data-engineer-data-vs-data-scientist-vs-analytics-engineer)
20. [Jason Ganz (Medium) — Data Scientist or Analytics Engineer: How I Made the Decision That Defined My Career](https://jasnonaz.medium.com/data-scientist-or-analytics-engineer-how-i-made-the-decision-that-defined-my-career-1646d4296467)
21. [data.world — Why so blue? 5 reasons data engineers are burnt out](https://data.world/blog/why-so-blue-5-reasons-data-engineers-are-burnt-out/)
22. [Netflix Careers — Data Engineer (L5), USA-Remote (req JR37949)](https://explore.jobs.netflix.net/careers/job/790313345439-data-engineer-l5--usa-remote?domain=netflix.com&microsite=netflix.com)
23. [Airbnb Careers — Senior Data Engineer, Payments](https://careers.airbnb.com/positions/7256787/)
24. [Stripe Careers — Data Engineer, Data Engineering Solutions (listing 7529428)](https://stripe.com/jobs/listing/data-engineer-data-engineering-solutions/7529428)
25. [Capital One Careers — Data Engineer, New York](https://www.capitalonecareers.com/job/new-york/data-engineer/1732/89805162176)
26. [Capital One Careers — Distinguished Data Engineer, Capital One Software (Remote)](https://www.capitalonecareers.com/job/mclean/distinguished-data-engineer/1732/92463057280)
27. [Rippling Careers — Software Engineer / Data Engineering](https://www.rippling.com/engineering)
28. [Uber Engineering Blog — Managing Uber's Data Workflows at Scale](https://www.uber.com/blog/managing-data-workflows-at-scale/)
29. [Bigeye — Lessons Learned from Uber: Designing an Intelligent Data Quality Monitor](https://www.bigeye.com/blog/lessons-learned-from-uber-designing-an-intelligent-data-quality-monitor)
30. [lakeFS blog — Diary of a Data Engineer: Glimpse into the Daily Life](https://lakefs.io/blog/diary-of-a-data-engineer/)
31. [DEV Community — A Day in the Life of a Data Engineer (Real Talk, No Filter)](https://dev.to/neha_christina_1ac8651819/a-day-in-the-life-of-a-data-engineer-real-talk-no-filter-18cm)
32. [Levels.fyi — Netflix Data Engineer Salary](https://www.levels.fyi/companies/netflix/salaries/software-engineer/title/data-engineer)
33. [Levels.fyi — Amazon Data Engineer Salary](https://www.levels.fyi/companies/amazon/salaries/data-engineer)
34. [Levels.fyi — Capital One Data Engineer Salary](https://www.levels.fyi/companies/capital-one/salaries/data-engineer)
35. [Glassdoor — Data Engineer: Average Salary & Pay Trends 2026](https://www.glassdoor.com/Salaries/data-engineer-salary-SRCH_KO0,13.htm)
36. [IT IDOL Technologies — Data Engineering Myths That AI Is Breaking](https://itidoltechnologies.com/blog/data-engineering-myths-that-ai-is-breaking/)

## Open questions for cross-review

- Should "analytics engineer" be split out as its own v1 archetype, or does folding it into data
  engineer + noting the boundary (as done here) lose a meaningfully distinct persona (more
  SQL/dbt-centric, more analyst-adjacent, less distributed-systems-heavy)? Recommend the
  cross-review pass make this call explicitly, since it affects the archetype count target
  (12–18).
- IC5+ leveling is approximate/inferred rather than sourced from a published data-engineering-
  specific ladder; flag if a better public source (e.g., a company engineering-levels doc) is
  found.
- Burnout/blame statistics are single-source (data.world, likely with a vendor interest in
  highlighting data-quality pain); would benefit from a second independent source in a future
  pass.
- **Meta comp figures show a minor inconsistency across sources**: levels.fyi's Meta data-engineer
  page (cited above, IC3–IC6 $168K–$439K, median $182K) was corroborated in this pass, but a
  separate levels.fyi fetch during the follow-up session showed a lower, partially-paywalled range
  ($185K–$307K+, "4 more submissions to unlock"). Both are crowdsourced and shift frequently with
  new submissions; a human should re-pull the live page to confirm current numbers before this
  brief is used to generate user-facing comp claims.
- **Netflix comp figures are an outlier** relative to Glassdoor's market-wide average ($565K median
  vs. $133K market-wide average) — flagged as consistent with Netflix's known top-of-market,
  senior-only hiring philosophy rather than a data error, but worth calling out explicitly in any
  downstream comp-comparison UI so users don't anchor on Netflix as "typical" data engineer pay.
- **True early-stage-startup posting still missing**: the startup-tier postings in this brief
  (Recharge, Xealth, Nourish, Metropolis, Rippling) skew growth-stage/well-funded rather than
  early-stage/seed. Direct searches for individual early-stage/YC-company career pages were
  attempted in the follow-up pass but mostly returned generic job-board aggregator pages rather
  than a single attributable posting. A future pass should search individual YC-funded company
  career pages directly.
- **Reddit/r/dataengineering discussion was not directly retrievable** via WebSearch in either
  research pass (queries returned no indexed thread results). Entry/exit-path claims lean on
  secondary blog/career-site sources rather than raw practitioner forum discussion — some of those
  sources (e.g., Data Engineer Academy, a training vendor) have a commercial incentive to frame the
  field as accessible without a CS degree; treat the "teachers and accountants become data
  engineers"-style claims as directionally plausible but not independently verified.
