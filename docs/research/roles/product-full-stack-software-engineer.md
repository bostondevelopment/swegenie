# Archetype: Product / Full-Stack Software Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **5817 real, currently-live job postings across 541 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 541 total):

- **Britive** — "Software Engineer (Cloud)"
- **Orca Security** — "Software Developer"
- **Varda Space Industries** — "Mission Software Engineer"
- **Verkada** — "Senior-Staff Software Engineer, Tooling"
- **UPS** — "Intermediate Application Developer - Python, REST API, Data Processing"
- **Materialize** — "Senior / Staff Software Engineer (Database)"
- **Ravio** — "Senior Software Engineer"
- **Fidelity** — "Principal Software Engineer/Developer"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Cluster:** Core / Product Software Engineering
**Status:** Draft brief (Phase 1)

## Scope note: one brief, not three

The initial candidate list split this into frontend-lean, backend-lean, and true-generalist
variants. After a quick pass through job postings and leveling literature, I'm treating this as
**one archetype with sub-variant notes** rather than three separate briefs:

- Real job postings (WHOOP, Ziprecruiter/full-stack listings, startup listings) overwhelmingly
  title and level these roles identically — "Software Engineer," "Full Stack Engineer," "Senior
  Software Engineer (Full Stack)" — with frontend/backend leaning expressed as a *skills emphasis
  within the posting*, not a different req, level ladder, or comp band. WHOOP's own postings show
  "Software Engineer II (Full Stack, Platform)" and "Senior Software Engineer (Frontend, Growth)"
  sitting in the same leveling/comp system ([WHOOP Full Stack listing](https://jobs.lever.co/whoop/65566b33-ab41-4b48-a138-ff5c57d1d514); [WHOOP Senior SWE Frontend, Built In Boston](https://www.builtinboston.com/job/senior-software-engineer-full-stack/6653699)).
- The IC leveling ladder (junior -> mid -> senior -> staff -> principal) and its promotion criteria
  are stack-agnostic — scope, ownership, and mentorship, not "knows React vs. knows Postgres"
  ([Pragmatic Engineer, Career Paths for Software Engineers](https://newsletter.pragmaticengineer.com/p/career-paths-for-software-engineers); [End of Line Blog, Software engineer career levels](https://www.endoflineblog.com/software-engineer-career-levels)).
- Success criteria (shipping, code review quality, cross-functional collaboration, on-call
  ownership) are consistent across frontend-lean and backend-lean postings; what differs is which
  *systems* you're expected to be deepest in, which is a skill-dimension question for Phase 2
  (tech-stack breadth/depth), not a distinct archetype.

**Where this could break down:** if Phase 2 trait-dimension work finds that frontend-lean and
backend-lean engineers diverge sharply on temperament axes (e.g., visual/UX taste and
interrupt-tolerance for frontend vs. deep-work/systems-design for backend), it may be worth
splitting later. Flagging as an open question rather than resolving it here, since the assessment
should ultimately let a user's answers pull them toward a frontend-lean or backend-lean profile
*within* this archetype rather than forcing an early split. This brief includes sub-variant notes
inline where the source material clearly differentiates.

---

## Day-to-day activities

The largest gap between perception and reality: writing new code is a minority of the job.
Coding-specific tasks account for roughly 15-20% of total engineering time, per aggregated
practitioner data discussed in Pragmatic Engineer coverage of engineering time studies; the rest
is code review, debugging, meetings/planning, design docs, and dealing with ambiguous or changing
requirements ([Pragmatic Engineer newsletter, AI tools for software engineers](https://newsletter.pragmaticengineer.com/p/ai-tools-for-software-engineers-simon-willison)).

Typical day-to-day, synthesized from job postings across company sizes:

- **Feature delivery end-to-end**: taking a product requirement from design/PM handoff through
  implementation, testing, code review, and deploy. WHOOP's senior full-stack posting explicitly
  frames this as "architect and build end-to-end features... collaborate closely with product
  managers, designers, and engineers to shape high-impact projects across both frontend and
  backend systems" ([WHOOP Senior Software Engineer, Full Stack, Built In Boston](https://www.builtinboston.com/job/senior-software-engineer-full-stack/6653699)).
- **Cross-functional collaboration** with product, design, and other engineering teams —
  consistently listed across postings (WHOOP: "collaborate cross-functionally with Product,
  Design, Platform, and Localization teams").
- **Code review and mentorship** — increases sharply with seniority; a senior engineer's job
  description functionally changes from "ship code" to "make the people around them better"
  ([Seekersy, Software Engineering Levels Explained](https://seekersy.com/blog/software-engineering-levels-explained)).
- **CI/CD, build systems, and internal tooling upkeep** — smaller/product-team engineers often
  own their own pipeline health, not just application code (WHOOP: "improve and maintain build
  and CI/CD systems").
- **AI-assisted development is now a baseline expectation**, not a differentiator, in 2026
  postings — several listings explicitly require "AI-SDLC methodology" or hands-on experience
  integrating LLMs/RAG into product features, reflecting how fast this shifted from novel to
  table-stakes (aggregated Lever/Greenhouse posting scan, e.g. Jobgether "Senior AI Product
  Engineer, Fullstack").
- **On-call / production ownership** for teams running their own services — common at Series
  B+ startups and product teams at scale-ups, less universal at very early-stage startups where
  everyone is on-call by default.

**Sub-variant notes:**
- *Frontend-lean*: heavier weighting toward component libraries, design systems, accessibility,
  i18n, and design collaboration (WHOOP's design-system/translation-infra posting is a clean
  example).
- *Backend-lean*: heavier weighting toward data modeling, API design, concurrency, caching/search
  infrastructure (e.g., a posting requiring "deep understanding of concurrency, multithreading...
  strong SQL expertise, and experience with search or caching systems").
- *Generalist*: expected to move across the stack fluidly; most common at seed/Series A startups
  where headcount doesn't support specialization.

## Success criteria

- **Shipping working software that survives contact with production** — the baseline bar at
  every level.
- **Scope of ownership, not lines of code**, is what distinguishes levels. Promotion from
  mid-level to senior hinges on "big ideas that are also right," independent ownership of major
  projects, becoming a trusted technical resource, and taking on unglamorous operational work —
  not raw output ([Pragmatic Engineer, Career Paths for Software Engineers, citing ex-Amazon VP
  Ethan Evans](https://newsletter.pragmaticengineer.com/p/career-paths-for-software-engineers)).
- **Promotions are slow and social, not instant**: typical timeline for a level promotion is
  1-2 years of *consistent* demonstrated behavior, and cross-functional relationships materially
  affect promotion outcomes — not through favoritism but because reliable, collaborative
  engineers get more visible opportunities (same source).
- At staff+ level, success criteria shift from "did you ship" to "did you set technical direction
  across multiple teams" — fewer than 1 in 10 engineers reach Staff, and roughly 1-2% reach
  Principal ([Seekersy, Software Engineering Levels Explained](https://seekersy.com/blog/software-engineering-levels-explained)).

## Comp structure

Base-heavy at small/mid companies, base+equity at scale-ups, base+bonus+heavy-RSU at big tech.

- **Aggregate market (Levels.fyi, all levels/companies)**: national median total comp ~$192,000,
  25th percentile ~$135,000, 75th percentile ~$277,000 ([Levels.fyi Software Engineer aggregate](https://www.levels.fyi/t/software-engineer)).
- **New grad**: median total comp ~$140,000, typically a base of $110K-$130K plus signing bonus
  and a 4-year vesting stock grant at companies that grant equity to new hires (same source).
- **Big tech reference points** (illustrates the ceiling, not the norm):
  - Google: $206K (L3) to $1.79M (L9); Senior SWE (L5) median total comp ~$423,000
    ([Levels.fyi Google Software Engineer](https://www.levels.fyi/companies/google/salaries/software-engineer)).
  - Meta: $180K (E3) to $4.36M (E9) ([Levels.fyi Meta Software Engineer](https://www.levels.fyi/companies/meta/salaries/software-engineer)).
  - Notably, base salary barely moves between senior and staff at big tech — the jump is almost
    entirely equity and bonus.
- **Mid-size product company reference point**: WHOOP (Boston, ~ scale-up), Software Engineer II
  (Full Stack, Platform) base range $125,000-$175,000; Senior Software Engineer (Full Stack) base
  range $150,000-$210,000 (posted ranges via aggregated Lever/Built In listing scan; WHOOP overall
  SWE range reported as $112K-$219K+ on [Levels.fyi WHOOP](https://www.levels.fyi/companies/whoop/salaries/software-engineer)).
- **Startup reference point**: remote full-stack roles average ~$119K base (range $38K-$210K
  depending on stage), with 4-6 YOE averaging ~$112K base; early-stage/seed postings frequently
  pair a below-market base with meaningful equity (e.g., a "Founding Full Stack / Applied AI
  Engineer" posting at $190-250K + early equity was an outlier on the high end, likely reflecting
  AI-role wage inflation) ([Wellfound, Remote Full-Stack Engineer Salary and Equity Compensation 2026](https://wellfound.com/hiring-data/r/full-stack-developer-1/l/remote-friendly)).
- **Takeaway for the assessment/comp-structure copy**: equity is a real but secondary comp lever
  for this archetype relative to sales/pre-sales roles (no variable/commission component) — the
  comp axis that matters most for this archetype's positioning is base-vs-equity-mix by company
  stage, not base-vs-variable.

## Career ladder

Two parallel tracks that split around the senior/staff transition:

- **IC track**: Junior (IC1-2) -> Mid-level (IC3) -> Senior (IC4) -> Staff (IC5) -> Principal
  (IC6) -> Distinguished/Fellow (IC7+). Progression is scope/impact-based, not tenure-based — an
  engineer can reach senior in 4 years or stay mid-level for 10 depending on demonstrated scope
  ([Indeed, Understanding the 10 Career Levels for Software Engineers](https://www.indeed.com/career-advice/finding-a-job/engineer-level); [Seekersy](https://seekersy.com/blog/software-engineering-levels-explained)).
- **Management track**: Team Lead -> Engineering Manager -> Director -> VP Engineering -> CTO.
  The IC/management fork typically happens at the senior-to-staff transition point, and at
  well-run companies a Staff engineer and an Engineering Manager sit at comparable level and pay
  ([Anthropos, Leaving the software engineer career path](https://anthropos.work/blog/software-engineer-career-path-what-are-your-options-for-the-future/); [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/career-paths-for-software-engineers)).
- Management is a lateral move in comp/prestige terms at mature companies, not a promotion over
  staying IC — an important framing correction for the assessment copy, since users may assume
  "manager" is the only way up.

## Common entry paths

- **CS degree (BS)** remains the modal path into new-grad SWE roles; postings commonly list "BS
  in Computer Science or related field" as baseline, with fluency in a general-purpose language
  (Java, Python, C++) and CS fundamentals (algorithms, data structures) as the technical bar
  ([aggregated new-grad posting scan, 2026](https://www.jobsfornewgrad.com/entry-level-software-engineer-jobs)).
- **Bootcamp -> portfolio -> junior/entry role** remains viable but is a steeper climb than a few
  years ago; postings increasingly accept "related majors (Engineering, Math, Physics)" or
  bootcamp grads with a strong project portfolio in lieu of a CS degree, particularly at smaller
  companies (same source).
- **Internship-to-full-time conversion** is the dominant pipeline at large/mid tech companies —
  most new-grad hiring cycles are seeded from summer internship cohorts recruited the prior fall.
- **Lateral entry from adjacent technical roles** (QA/SDET, data analyst, support engineer moving
  into SWE) is common at small/mid companies with less rigid leveling.

## Common exit paths

- **Product Management** is described as the most natural adjacent move — engineers bring
  technical credibility and the ability to translate between eng and business, and the transition
  is common enough to be treated as a standard track rather than an anomaly
  ([Product School, Alternative Career Options for Software Engineers](https://productschool.com/blog/career-development/alternative-career-options-software-engineers)).
- **Engineering management** (see career ladder above) — the highest-volume "exit" in the sense
  that it's a within-company track change, not an industry exit.
- **Sales/pre-sales engineering, technical customer success** — engineers who like the technical
  translation layer but want more people/client contact move here; relevant cross-reference for
  CareerGuru's own taxonomy, since these are separate archetypes in this project's list
  ([Indeed, Alternative Jobs for Software Engineers](https://www.indeed.com/career-advice/finding-a-job/change-career-from-software-engineer)).
- **Founder/startup** — staff+ engineers with strong product instincts frequently leave to found
  or join early-stage companies; the "Founding Engineer" postings seen in the startup job-board
  scan are the landing spot for this path.
- **Specialization pivots** — into ML/AI engineering, DevOps/platform, or security; increasingly
  common in 2026 postings given AI-integration demand pulling generalist engineers toward
  applied-AI roles.

## Top misconceptions vs. reality

1. **Misconception: the job is mostly writing new code.**
   Reality: coding is roughly 15-20% of time; the rest is review, debugging, planning, meetings,
   and dealing with changing/ambiguous requirements ([Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/ai-tools-for-software-engineers-simon-willison)).

2. **Misconception: seniority is about being a better/faster coder.**
   Reality: seniority is about scope of ownership, judgment on "big ideas that are also right,"
   and making other engineers more effective — not raw coding speed or cleverness
   ([Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/career-paths-for-software-engineers); [Seekersy](https://seekersy.com/blog/software-engineering-levels-explained)).

3. **Misconception: management is "the promotion" and staying IC is settling.**
   Reality: IC and management are parallel tracks; Staff engineers and Engineering Managers are
   comparable in level and pay at well-run companies. Treating management as the only ladder up
   is an outdated mental model this assessment should actively correct for.

4. **Misconception: total comp is mostly base salary, so offers are easy to compare.**
   Reality: at senior+ levels and at big tech specifically, base salary is nearly flat between
   senior and staff — the differentiator is equity and bonus, and comparing offers by base alone
   is misleading. This matters for how CareerGuru should frame "comp structure" content per
   archetype: show the base/equity split, not just a single number.

5. **Misconception: frontend vs. backend is a fixed identity/specialization from day one.**
   Reality: most product-engineering postings frame frontend/backend leaning as an emphasis within
   one role family and career ladder, not a separate track with different success criteria —
   engineers commonly shift emphasis across their career based on team needs.

6. **Misconception (increasingly outdated): AI coding tools are a nice-to-have differentiator.**
   Reality: by mid-2026, fluency with AI-assisted development ("AI-SDLC," LLM/RAG integration
   experience) shows up as a baseline requirement in a meaningful share of postings, not an
   advanced/optional skill — this is a fast-moving signal worth re-checking before Phase 2 locks
   the skill-dimension definitions.

## Open questions / flags for cross-review

- Confirm whether frontend-lean/backend-lean should get distinct target profiles in the Phase 2
  archetype x dimension matrix (a scoring-model question) even though this brief treats them as
  one archetype (a content-organization question) — these are separable decisions.
- Source count for this brief leans on aggregated WebSearch summaries for several claims (levels
  ladder definitions, exit-path framing) rather than fully independent primary sources per claim;
  worth a light audit pass to swap in 1-2 more primary practitioner essays (e.g., a full read of
  the Pragmatic Engineer leveling series) if time allows before Phase 2 freezes dimensions.
- Did not find a clean second real job posting with a numeric comp range at a *non-Boston* mid-size
  company to sit alongside WHOOP as a geographic comparison point — flagging in case cross-review
  wants tighter geographic diversity in the sourcing.

## Sources

1. [WHOOP — Senior Software Engineer (Full Stack), Built In Boston](https://www.builtinboston.com/job/senior-software-engineer-full-stack/6653699)
2. [WHOOP — Software Engineer II (Full Stack, Platform), Lever](https://jobs.lever.co/whoop/65566b33-ab41-4b48-a138-ff5c57d1d514)
3. [WHOOP Software Engineer Salary, Levels.fyi](https://www.levels.fyi/companies/whoop/salaries/software-engineer)
4. [Levels.fyi — Software Engineer aggregate compensation](https://www.levels.fyi/t/software-engineer)
5. [Levels.fyi — Google Software Engineer Salary](https://www.levels.fyi/companies/google/salaries/software-engineer)
6. [Levels.fyi — Meta Software Engineer Salary](https://www.levels.fyi/companies/meta/salaries/software-engineer)
7. [Wellfound — Remote Full-Stack Engineer Salary and Equity Compensation 2026](https://wellfound.com/hiring-data/r/full-stack-developer-1/l/remote-friendly)
8. [The Pragmatic Engineer — Career Paths for Software Engineers at Big Tech (via Ethan Evans)](https://newsletter.pragmaticengineer.com/p/career-paths-for-software-engineers)
9. [The Pragmatic Engineer — AI tools for software engineers, without the hype (Simon Willison)](https://newsletter.pragmaticengineer.com/p/ai-tools-for-software-engineers-simon-willison)
10. [Seekersy — Software Engineering Levels Explained: From Junior to Principal](https://seekersy.com/blog/software-engineering-levels-explained)
11. [Anthropos — Leaving the software engineer career path: 4 options to consider](https://anthropos.work/blog/software-engineer-career-path-what-are-your-options-for-the-future/)
12. [Product School — 25 Alternative Career Options for Software Engineers](https://productschool.com/blog/career-development/alternative-career-options-software-engineers)
13. [JobsForNewGrad — Entry Level Software Engineer Jobs in USA for New Grads 2026](https://www.jobsfornewgrad.com/entry-level-software-engineer-jobs)
