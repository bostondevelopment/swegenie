# Platform / Infrastructure Engineer

**Cluster:** Infrastructure & Reliability
**Status:** v1 draft — expert-authored, sourced

## Scope decision: merged, not split from SRE

This brief treats **Platform Engineer** and **Infrastructure Engineer** as one archetype, and
treats **SRE** as a *separate but adjacent* archetype (see `/docs/research/roles/sre-production-engineer.md`),
with an explicit note that at many companies — especially smaller ones — these blend into a single
job. Reasoning:

- The two roles differ on a clear axis even though tooling overlaps heavily (Terraform, Kubernetes,
  CI/CD, cloud APIs): **platform engineering's primary customer is internal developers** (build
  self-service tooling, reduce cognitive load, treat the platform as a product), while **SRE's
  primary mandate is service reliability** (SLOs/error budgets, incident response, on-call,
  capacity). Platform engineering's own advocacy body frames this as building "internal developer
  platforms" to reduce friction and cognitive load for product teams — a distinct discipline from
  reliability engineering ([Team Topologies, "Designing and executing a platform strategy"](https://teamtopologies.com/platform-engineering); [Humanitec, "Platform as a product"](https://humanitec.com/blog/platform-as-a-product-the-evolution-of-devops-and-platform-engineering)).
- Industry comparisons converge on the same distinction: "SRE focuses on reliability, while
  Platform Engineering focuses on developer experience and efficiency," with SRE's audience
  including end users who depend on uptime, and platform engineering's audience being internal
  builders ([Octopus Deploy, "Platform Engineering Versus SRE"](https://octopus.com/devops/platform-engineering/platform-engineering-vs-sre/); [Tigera, "Platform Engineering vs SRE"](https://www.tigera.io/learn/guides/devsecops/platform-engineering-vs-sre/)).
- But real job postings frequently blur the line — e.g., a "Platform Engineer – Product
  Reliability" posting at Kraken explicitly requires prior SRE experience and SaaS reliability
  background ([Kraken, Platform Engineer – Product Reliability](https://jobs.lever.co/kraken123/4fe05f09-5bec-44a6-b595-fc364ad725b6)), and Scout24 posts a "Senior Platform Engineer – Site
  Reliability" as one title ([Scout24 careers](https://boards.greenhouse.io/scout24/jobs/1200342)). Commentary in 2026 notes the roles are "converging at many companies... 'Platform
  Engineers' do both DevOps and SRE work" ([InfoWorld, "DevOps, SRE, and platform engineering"](https://www.infoworld.com/article/4037775/devops-sre-and-platform-engineering-whats-the-difference.html)).
- **Decision for CareerGuru's taxonomy:** keep them as two archetypes because the underlying
  temperament fit differs (platform engineering rewards product-thinking and long-horizon tooling
  investment; SRE rewards incident composure and reliability-under-pressure), which is exactly the
  kind of distinction this product exists to surface. But the results copy and matching should flag
  that these frequently collapse into one job at companies under ~500 engineers, and a user's
  answers may legitimately produce a near-tie between the two. Open question for Phase 2: consider
  a shared "Infra generalist" fallback label if the assessment can't cleanly separate them for a
  given respondent.

---

## Day-to-day activities

- Design, build, and operate **internal developer platforms (IDPs)**: self-service infrastructure,
  golden paths/paved roads, CI/CD pipelines, provisioning APIs — so product teams don't need deep
  infra expertise to ship ([Octopus Deploy](https://octopus.com/devops/platform-engineering/platform-engineering-vs-sre/); [ZipRecruiter, "What Is a Platform Engineer"](https://www.ziprecruiter.com/career/Platform-Engineer/What-Is-How-to-Become)).
- Manage cloud resources and infrastructure-as-code (Terraform, Pulumi), Kubernetes clusters,
  networking, compute/storage platforms — e.g., Stripe's Core Infrastructure org owns "Compute,
  Networking, DocumentDB, Distributed Caching and High assurance engineering" as the foundational
  platform other product teams build on ([Stripe, Backend Engineer – Core Technology](https://stripe.com/jobs/listing/software-engineer-infrastructure/6042172)).
- Write client libraries and infra tooling that other engineers consume directly — e.g., "write
  easy-to-use and reliable client libraries for Kafka or database systems," plan multi-region
  availability for shared infra ([Stripe, Infrastructure Engineer – Batch Data Platform](https://startup.jobs/infrastructure-engineer-batch-data-platform-stripe-1864081)).
- Treat the platform explicitly as a **product**: gather requirements from internal "customers"
  (application teams), define a minimum viable ("thinnest viable") platform, iterate based on
  developer feedback rather than top-down mandate ([Team Topologies](https://teamtopologies.com/platform-engineering); [Jellyfish, "Platform as a Product Guide"](https://jellyfish.co/library/platform-engineering/platform-as-a-product/)).
- Collaborate cross-team constantly — unlike a product team shipping features to end users, the
  "customers" are other engineers, so requirements-gathering and internal advocacy are a real part
  of the job, not a side activity.
- At data-heavy orgs, this specializes into "data platform" work — e.g., Match Group's Senior Data
  Platform Engineer role centers on maintaining and continuously improving the data platform used
  company-wide ([Match Group, Senior Data Platform Engineer](https://jobs.lever.co/matchgroup/b70c8cbd-79d2-4dcf-a1a6-4a56bc47dfc8)).

## Success criteria

- Developer experience / cognitive load reduction: are product engineers shipping faster with less
  infra-specific knowledge required? This is the platform-engineering-specific metric that
  distinguishes it from SRE's uptime/SLO metrics ([Humanitec](https://humanitec.com/blog/platform-as-a-product-the-evolution-of-devops-and-platform-engineering); [Microsoft Learn, "Build the Platform Engineering Team"](https://learn.microsoft.com/en-us/platform-engineering/team)).
- Adoption of self-service tooling/golden paths (a platform nobody uses has failed regardless of
  its technical elegance — this is the "platform as a product" success bar).
- System scalability, efficiency, and cost — optimizing shared infrastructure performance across
  the teams that depend on it ([ZipRecruiter](https://www.ziprecruiter.com/career/Platform-Engineer/What-Is-How-to-Become)).
- At senior/staff level: solving *organizational*-scale problems, not just individual team
  problems — this is called out as the key distinction from classic DevOps ([InfoWorld](https://www.infoworld.com/article/4037775/devops-sre-and-platform-engineering-whats-the-difference.html)).

## Comp structure

- Base-heavy with equity, similar to general software engineering comp structures (no material
  sales-style variable comp).
- Reported 2025 US median base ~$172K, median total comp ~$235K at mid-career, rising to $400K+
  total comp at Staff level; Bay Area median base ~$198K / total comp ~$310K, NYC ~$189K base /
  $290K total ([KORE1, Platform Engineer Salary Guide 2026](https://www.kore1.com/platform-engineer-salary-guide-2026/), citing levels.fyi-derived figures). Treat these
  aggregate figures as directional — levels.fyi's own per-company breakdowns are the more reliable
  primary source and should be checked per-company at implementation time.
- levels.fyi search results show wide per-company spread consistent with general senior SWE
  comp bands (no separate "platform engineer" comp discipline exists on the site distinct from
  general software engineer tracks) ([levels.fyi, Software Engineer](https://www.levels.fyi/t/software-engineer)).
- AI-infra-adjacent platform roles command a premium: "AI platform engineering pays roughly
  $180K–$310K in the US at mid-to-senior levels" ([jobsbyculture.com, AI Platform Engineer Career Path 2026](https://jobsbyculture.com/blog/ai-platform-engineer-career-path-2026)).

## Career ladder

- Follows standard IC engineering ladders (no distinct platform-specific ladder at most
  companies): Junior/IC1-2 → Mid/IC3 → Senior/IC4 → Staff/IC5 → Principal/IC6+, e.g. Dropbox's
  public engineering career framework applies this uniformly across disciplines including
  infrastructure roles ([Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/)).
- Progression is marked by scope expansion: IC3 owns large impactful projects within a team's
  domain; IC4/Senior owns them consistently; IC5+/Staff expands influence beyond the immediate team
  into technical strategy and cross-org architecture ([Dropbox IC2 Software Engineer framework](https://dropbox.github.io/dbx-career-framework/ic2_software_engineer.html); general IC-level synthesis, [Seekersy, "Software Engineering Levels Explained"](https://seekersy.com/blog/software-engineering-levels-explained)).
- Specialization tracks exist within platform engineering (data platform, compute platform,
  developer-tooling platform, AI/ML platform) — "most platform engineers touch multiple areas, but
  specialization creates clear progression paths" ([jobcannon.io, Platform Engineer Career Path Guide](https://jobcannon.io/careers/platform-engineer)).
- Senior ICs are expected to shift from "primarily technical shift" to a genuine **product
  mindset** — treating internal developers as customers — as a defining competency for advancement
  ([The New Stack, "How to Become a Platform Engineer"](https://thenewstack.io/how-to-become-a-platform-engineer/)).

## Common entry paths

- Backend software engineering (most common) — engineers who gravitate toward systems/infra work
  within a product team and move into a dedicated platform org.
- DevOps engineering and SRE — a natural lateral move given tooling overlap (Terraform, Kubernetes,
  CI/CD); multiple sources describe DevOps/SRE as the most common feeder roles ([jobcannon.io](https://jobcannon.io/careers/platform-engineer); [The New Stack](https://thenewstack.io/how-to-become-a-platform-engineer/)).
- Junior/entry-level direct hires are increasingly possible but require demonstrating
  multidisciplinary capability (coding + systems + some product thinking) quickly, unlike a
  traditional siloed ops role ([jobsbyculture.com](https://jobsbyculture.com/blog/ai-platform-engineer-career-path-2026)).
- ML/data engineers moving into platform roles when the "platform" in question is a data or ML
  platform specifically.

## Common exit paths

- Senior/Staff platform engineer → Principal or Distinguished IC track (deep technical authority
  without management).
- Platform engineer → Engineering Manager (Platform/Infra) — common because the "internal customer"
  orientation already builds stakeholder-management muscle.
- Lateral moves into SRE, security engineering, or FinOps/cloud-cost engineering, which share
  tooling and infra fluency.
- Platform engineers with strong internal-tooling instincts sometimes found devtool/infra startups,
  since the "build the thing that makes other engineers faster" instinct maps directly to a devtool
  product thesis (pattern observed across practitioner career-path writing; no single citation, flag
  as directional rather than sourced fact).

## Top misconceptions vs. reality

- **Misconception: "Platform engineering is just rebranded DevOps."**
  Reality: the defining difference is that DevOps optimizes for individual team/pipeline problems,
  while platform engineering is explicitly about solving problems at organizational scale via a
  reusable, self-service product — that framing (not the tool list) is what practitioners insist
  distinguishes the discipline ([InfoWorld](https://www.infoworld.com/article/4037775/devops-sre-and-platform-engineering-whats-the-difference.html); [Team Topologies](https://teamtopologies.com/platform-engineering)).
- **Misconception: "It's a pure infrastructure/ops job with no product skills needed."**
  Reality: multiple sources emphasize platform engineering is "not just a technical shift —
  primarily, it is a mindset shift" toward product thinking, with the platform team's internal
  developers treated as paying customers whose adoption is the success metric ([The New Stack](https://thenewstack.io/how-to-become-a-platform-engineer/); [Jellyfish](https://jellyfish.co/library/platform-engineering/platform-as-a-product/)).
  Engineers who dislike stakeholder work and just want to write infra code in isolation tend to be
  a poor fit despite the technical overlap.
  - **Misconception: "Platform engineer and SRE are the same job everywhere."**
  Reality: conceptually distinct (developer-experience mandate vs. reliability mandate), but in
  practice many companies — especially sub-500-engineer orgs — hire one role that does both, as
  seen directly in job titles like "Platform Engineer – Site Reliability" ([Scout24](https://boards.greenhouse.io/scout24/jobs/1200342)). Job-seekers should read the actual
  responsibilities section, not just the title.

## Open questions for later phases

- Should the taxonomy surface "Platform/Infra Engineer" and "SRE" as separate assessment results
  with a note about frequent real-world blending, or collapse them into one archetype with an
  "SRE-leaning vs. DevEx-leaning" sub-flavor? Recommend Phase 2 test this with synthetic personas —
  if a "10-yr backend IC who hates meetings but loves Terraform" persona ties between the two, that's
  a signal to consider a merged label with sub-flavors instead.
- Comp figures above are aggregated/derivative (KORE1, jobsbyculture) rather than pulled directly
  from levels.fyi's own tables; before publishing on the results page, re-verify against live
  levels.fyi company pages for 3-5 flagship companies (Google, Datadog, Stripe) since aggregator
  figures can lag or round.
