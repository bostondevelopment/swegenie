# Security Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **586 real, currently-live job postings across 219 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 219 total):

- **Axonius** — "Senior Product Security Architect"
- **Affirm** — "Senior Product Security Engineer"
- **Ripple** — "Senior Staff Security Engineer, Ripple Treasury"
- **Human Interest** — "Security Engineer II"
- **Astranis** — "Product Security Engineer"
- **Movable Ink** — "Product Security Engineer"
- **Saronic** — "Security Engineer, Detection Engineering"
- **Rockstar Games** — "Application Security Engineer"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Cluster:** Infrastructure & Reliability
**Status:** v1 draft — expert-authored, sourced

## Scope note

Treated as a single archetype for v1, while flagging internally that "security engineer" is
actually an umbrella covering several distinct specializations that increasingly hire separately.
2026 hiring commentary identifies the title splitting into **cloud security engineer, application
security engineer, network/infrastructure security engineer, and detection-and-response engineer**
as effectively separate hiring profiles with different pay premiums — e.g., cloud security
engineers fluent in tools like Wiz/Prowler/Terraform Sentinel earn "twenty to thirty percent more"
than general network security engineers with equivalent tenure ([Indeed, "Security Engineer Job Description 2026"](https://www.indeed.com/hire/job-description/security-engineer)). CareerGuru v1 should keep "Security
Engineer" as one archetype (consistent with the 12-18 target archetype count) but the results copy
should name the sub-specializations so users don't feel the match is too coarse; a v2 candidate is
splitting AppSec vs. cloud/infra security if user feedback demands it.

---

## Day-to-day activities

- Design and implement security architecture and controls across an organization's systems —
  representative language from real postings: "designing computer security strategy and
  comprehensive cybersecurity architecture," "designing and implementing secure network solutions
  to protect against advanced cyber threats" ([Indeed, Security Engineer Job Description](https://www.indeed.com/hire/job-description/security-engineer)).
- Conduct risk and vulnerability assessments on systems, applications, and networks; track and
  remediate findings ([Indeed](https://www.indeed.com/hire/job-description/security-engineer)).
- **Application security specifically:** partner embedded with product/engineering teams to secure
  the software development lifecycle — e.g., RevenueCat's Senior AppSec Engineer role is explicitly
  about "working closely with engineering teams to ensure product security" rather than working in
  isolation from developers ([RevenueCat, Senior Application Security Engineer](https://jobs.ashbyhq.com/revenuecat/21f3372e-79e4-44b4-be05-cb12506fe3e9/application)). GitLab's public handbook similarly lists
  "consult with developers and product managers on security standards" and "educate teams on secure
  coding practices" as core, not peripheral, responsibilities ([GitLab Handbook, Security Engineer](https://handbook.gitlab.com/job-description-library/security/security-engineer/)).
- **Detection & response specifically:** build and tune detection systems, own incident response,
  and increasingly build automation/AI-assisted triage — e.g., WorkOS's Detection & Response
  Security Engineer role, and HackerOne's Senior Security Engineer, Detection and Response, which
  centers on "Continuous Threat Exposure Management with agentic AI solutions" ([WorkOS, Detection & Response Security Engineer](https://jobs.ashbyhq.com/workos/f229d715-9c93-4e5a-83cb-15718af99ed5); [HackerOne, Senior Security Engineer, Detection and Response](https://jobs.ashbyhq.com/hackerone/72cdf9a9-74cb-4c0e-8cf8-241ba32680ec)).
- **Frontier/AI security (emerging sub-specialization):** Anthropic's Staff+ Application Security
  Engineer role covers designing LLM-driven code analysis and automated vulnerability remediation,
  threat modeling for AI systems whose risks fall outside existing frameworks, running a public bug
  bounty program, and being an embedded security partner across Product/Infrastructure/Research —
  plus standard on-call for incident response ([Anthropic, Staff+ Application Security Engineer](https://job-boards.greenhouse.io/anthropic/jobs/4502508008)).
- Assess and integrate security tooling, including open-source tools, and proactively hunt for and
  remove vulnerable code rather than only responding to reported issues ([GitLab Handbook](https://handbook.gitlab.com/job-description-library/security/security-engineer/)).
- Stay current on the threat landscape and compliance regimes (ISO 27001, PCI DSS, NIST) and
  translate them into concrete engineering requirements ([Indeed](https://www.indeed.com/hire/job-description/security-engineer)).

## Success criteria

- Reduction in exploitable vulnerabilities reaching production; SDLC-integrated security review
  coverage (are security reviews happening early enough to be cheap, not just before launch).
- Incident response quality when things do go wrong: detection speed, containment speed, quality of
  postmortems — closely parallel to SRE's incident metrics but scoped to security events
  specifically.
- Developer adoption of secure-by-default tooling and guidance — AppSec engineers are increasingly
  judged like platform engineers on whether developers actually use the guardrails they build,
  not just on whether the guardrails exist ([GitLab Handbook](https://handbook.gitlab.com/job-description-library/security/security-engineer/) frames "educate teams" and "consult... on
  security standards" as core deliverables, not just gatekeeping).
- At senior/staff/principal level: organizational security posture and strategic influence — GitLab's
  ladder explicitly ties Staff to "drives cross-team initiatives" and Principal to "influences
  organizational strategy" ([GitLab Handbook](https://handbook.gitlab.com/job-description-library/security/security-engineer/)).
- Ability to operate with autonomy under ambiguity is an explicit senior-level bar, not just a soft
  skill — Anthropic's Staff+ posting lists "ability to operate with high autonomy and ambiguity"
  with minimal specifications as a minimum requirement, not a nice-to-have ([Anthropic posting](https://job-boards.greenhouse.io/anthropic/jobs/4502508008)).

## Comp structure

- Base-heavy with equity, tracking general software engineering comp discipline at most tech
  companies rather than a separate "security" pay scale — mirrors the SRE and platform patterns in
  this cluster.
- levels.fyi figures (title: Security Engineer / Security Software Engineer):
  - Google Security Engineer: $188K (L3) – $484K (L6), median ~$263,000 ([levels.fyi, Google Security Engineer](https://www.levels.fyi/companies/google/salaries/security-engineer))
  - Google Security Software Engineer: $192K (L3) – $608K (L7), median ~$300,336 ([levels.fyi, Google Security Software Engineer](https://www.levels.fyi/companies/google/salaries/software-engineer/title/security-software-engineer))
  - Amazon Security Engineer: $188K (L4) – $488K (L7), median ~$239,000 ([levels.fyi, Amazon Security Engineer](https://www.levels.fyi/companies/amazon/salaries/security-engineer))
  - Nvidia Security Software Engineer: median ~$399,000 ([levels.fyi, Nvidia](https://www.levels.fyi/companies/nvidia/salaries/software-engineer/title/security-software-engineer))
  - Cisco Security Software Engineer: median ~$327,000 ([levels.fyi, Cisco](https://www.levels.fyi/companies/cisco/salaries/software-engineer/title/security-software-engineer))
- **Real posted range at frontier-lab Staff+ level:** Anthropic's Staff+ Application Security
  Engineer posting states **$320,000–$485,000 USD annually** ([Anthropic posting](https://job-boards.greenhouse.io/anthropic/jobs/4502508008)) — useful as a concrete,
  primary-source anchor rather than an aggregator estimate.
- Entry-level reality is far lower than the senior figures above: entry-level cybersecurity
  positions (SOC analyst / early feeder roles, not yet "security engineer") were reported averaging
  **$70,000–$85,000** depending on location in 2026 ([TripleTen, "Cybersecurity Career Path: 2026 Roadmap"](https://tripleten.com/blog/posts/cybersecurity-career-path); consistent with feeder-role framing in [unihackers.com, "SOC Analyst vs Security Engineer"](https://unihackers.com/blog/soc-analyst-vs-security-engineer)) — the jump to
  "security engineer" titling and the comp bands above typically requires the 5-8 year path
  described below, not an entry-level starting point.
- Security certifications (CISSP, CISM, CEH) are commonly listed requirements/preferences and can
  function similarly to a credential premium, though postings vary on whether they're required vs.
  preferred ([Indeed](https://www.indeed.com/hire/job-description/security-engineer)).

## Career ladder

GitLab's publicly published security engineering ladder is a rare fully-transparent example and is
used here as the representative structure ([GitLab Handbook, Security Engineer](https://handbook.gitlab.com/job-description-library/security/security-engineer/)):

1. **Associate** — learns fundamental security concepts, handles basic security issues.
2. **Intermediate** — applies foundational knowledge, triages basic issues independently.
3. **Senior** — demonstrated expertise in a specialty area, conducts security architecture reviews,
   interviews candidates.
4. **Staff** — trusted advisor, drives cross-team initiatives, mentors engineers.
5. **Principal** — influences organizational strategy, leads complex initiatives, ambassadorial
   role.
6. **Distinguished** — shapes long-term security direction, sets industry standards, guides senior
   professionals.

This closely parallels the IC ladders in the other two archetypes in this cluster (Associate/
Intermediate ≈ IC1-3, Senior ≈ IC4, Staff ≈ IC5, Principal/Distinguished ≈ IC6+), reinforcing that
security engineering is priced and progressed as a software engineering discipline rather than a
separate IT/compliance track once past the entry level.

## Common entry paths

- **SOC analyst → security engineer** is the most commonly cited structured path: roughly
  **5-8 years total** from entry-level, including 2-3 years as a security analyst before
  transitioning into engineering, "requiring advanced skills in cloud, automation, IAM, and
  detection engineering" to make the jump ([TripleTen, Cybersecurity Career Path 2026](https://tripleten.com/blog/posts/cybersecurity-career-path)). Many professionals specifically
  build automation/infrastructure skills while in the SOC role as the bridge to engineering
  ([unihackers.com, SOC Analyst vs Security Engineer](https://unihackers.com/blog/soc-analyst-vs-security-engineer)).
- **Feeder roles before SOC:** help desk, IT support, or junior SOC analyst — typically 1-2 years —
  before reaching even the security-analyst entry point ([TripleTen](https://tripleten.com/blog/posts/cybersecurity-career-path)).
- **Software engineering → application security engineer:** a distinct and increasingly common
  path that skips the SOC/analyst route entirely — engineers with production coding ability move
  directly into AppSec, especially since postings explicitly value "production-grade coding
  ability" and reading real codebases over traditional security-analyst backgrounds ([Anthropic posting](https://job-boards.greenhouse.io/anthropic/jobs/4502508008); market commentary that "application security engineers who can actually read a Java codebase
  and write a Semgrep rule clear two hundred thousand in non-coastal metros" ([Indeed, Security Engineer Job Description 2026](https://www.indeed.com/hire/job-description/security-engineer))).
- Certifications (Security+, CySA+) plus bootcamps and home-lab/portfolio projects are a viable
  credential-based entry route that substitutes for a CS degree at many employers ([TripleTen](https://tripleten.com/blog/posts/cybersecurity-career-path)).
- Non-CS degree entry is more common than in most engineering archetypes in this taxonomy: "the
  second-most common degree subject for new cybersecurity professionals is English Language," with
  communication and project-management skills sometimes valued over raw coding ability, particularly
  in GRC-adjacent security roles (a caveat: this applies more to broader "cybersecurity" than to
  hands-on security *engineering* specifically) ([University of Tulsa, "8 Myths About Cybersecurity Careers"](https://online.utulsa.edu/blog/8-myths-about-cybersecurity-careers/)).

## Common exit paths

- Security engineer → Security Engineering Manager / Head of Security, following the same
  IC-to-management pattern as platform and SRE.
- Senior/Staff Security Engineer → Principal/Distinguished IC track (deep technical authority,
  explicitly modeled in GitLab's published ladder) ([GitLab Handbook](https://handbook.gitlab.com/job-description-library/security/security-engineer/)).
- Lateral moves into adjacent infra disciplines (SRE, platform engineering, network engineering)
  given shared systems fluency — mirrors the cross-cluster lateral mobility noted in the other two
  briefs in this cluster.
- Specialization-driven exits: AppSec engineers with strong dev backgrounds sometimes move back into
  general software/platform engineering roles; detection-and-response engineers sometimes move into
  broader incident-response/SRE-adjacent roles given the overlapping on-call and postmortem skill
  set.
- Not well-documented in available sources: exits into GRC (governance/risk/compliance) leadership
  or CISO-track roles are commonly assumed in industry folklore but this brief did not find a strong
  primary source quantifying that path — flagged as an open question below rather than asserted.

## Top misconceptions vs. reality

- **Misconception: "Security engineers are basically hackers / offensive specialists."**
  Reality: "you don't have to be a hacker to excel in the cybersecurity field... many careers... are
  not dependent upon hacking or hacker knowledge," and the majority of the profession is proactive
  defense, incident response, risk management, and compliance rather than offensive work ([University of Tulsa, "8 Myths About Cybersecurity Careers"](https://online.utulsa.edu/blog/8-myths-about-cybersecurity-careers/)). Offensive
  security/pentesting is explicitly called out as just one *preferred* (not required) qualification
  even at a frontier-lab Staff+ AppSec posting ([Anthropic posting](https://job-boards.greenhouse.io/anthropic/jobs/4502508008)).
- **Misconception: "It's primarily a gatekeeping/blocking function — security says no to
  everything."**
  Reality: the highest-leverage parts of the job as described in real postings are collaborative —
  "consult with developers and product managers," "educate teams on secure coding practices," act
  as "embedded security partner" with product/infra/research orgs ([GitLab Handbook](https://handbook.gitlab.com/job-description-library/security/security-engineer/); [Anthropic posting](https://job-boards.greenhouse.io/anthropic/jobs/4502508008)). Engineers
  who enjoy only enforcement and not partnership tend to be a weaker fit than the "security cop"
  stereotype suggests.
- **Misconception: "There's a severe, uniform talent shortage, so it's an easy field to break
  into."**
  Reality: "the 'skills shortage' is really more of an 'experience shortage'... depending on how you
  want to frame it" — demand is real and growing (~32% projected growth cited in market commentary,
  [Indeed](https://www.indeed.com/hire/job-description/security-engineer)), but entry-level roles pay modestly ($70-85K) and the realistic path to an
  "engineer"-titled, well-compensated role takes 5-8 years via the SOC-analyst route, not a
  fast-tracked bootcamp-to-six-figures narrative ([TripleTen, Cybersecurity Career Path 2026](https://tripleten.com/blog/posts/cybersecurity-career-path)).

## Open questions for later phases

- Whether to eventually split this into AppSec vs. cloud/infra security vs. detection-and-response
  as separate archetypes — deferred to v2 per the scope note above; watch beta-user feedback in
  Phase 6 for signals that "Security Engineer" feels too coarse.
- Could not find a strong sourced answer on the security-engineer → CISO/GRC-leadership exit path
  prevalence; worth a targeted follow-up search if exit-path accuracy becomes a point of user
  pushback during Phase 6 validation.
- Comp figures mix per-company levels.fyi data (strong primary source) with one aggregator's
  entry-level estimate (TripleTen) — the entry-level number in particular should be spot-checked
  against Glassdoor/BLS data before it appears verbatim on a public results page.
