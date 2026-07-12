# Role Research Brief: Developer Relations / Developer Advocacy

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **87 real, currently-live job postings across 48 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This clears the original ≥15-posting v1 sourcing target several times over, though it fell short of the ≥200-posting stretch goal set for this pass despite three dedicated gap-fill rounds — this appears to reflect genuine scarcity of this specific title pattern on public ATS boards (many employers for this role use Workday, Oracle Recruiting Cloud, or fully custom career sites that don't expose a bulk API) rather than a search gap; reported honestly rather than padded.

Representative sample of companies with live postings matched to this archetype (of 48 total):

- **Langfuse** — "Developer Relations Engineer (Events & Community)"
- **Krafton** — "[HR Div.] Developer Relations Program Manager (3년 ~ 5년 / 계약직)"
- **HackerRank** — "Senior DevRel Engineer"
- **JFrog** — "Developer Advocate"
- **Metabase** — "Developer Advocate"
- **MongoDB** — "Senior Developer Advocate"
- **AssemblyAI** — "Developer Relations Evangelist"
- **Temporal Technologies** — "Staff Developer Advocate, Enterprise - EMEA"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Titles covered:** Developer Advocate, Developer Relations Engineer, DevRel Engineer, Technical
Evangelist, Community Engineer.

**Distinction from adjacent briefs:** Unlike Support Engineering or Solutions Engineering, DevRel
is not tied to specific accounts or tickets. Success is measured by community/ecosystem health,
content reach, and developer sentiment — not case resolution or account expansion. DevRel sits
closer to product/marketing feedback loops than to individual customer relationships.

---

## Day-to-day activities

DevRel work spans four recurring buckets, consistent across company sizes:

1. **Technical content creation** — blog posts, tutorials, docs, sample apps, videos. A DevRel
   career guide summarizes this as writing "actionable blog posts based on product usage, product
   updates, integration and proof-of-concept how-tos" [1].
2. **Public speaking / conference talks** — both a Google Developer Advocate at big-tech scale and
   a startup Developer Advocate (e.g. Tailscale's video-focused posting, or JetBrains' advocate
   role "creating technical content and engaging with developers online and in person") do this,
   though emphasis varies: some postings (Tailscale) are almost entirely content/video-focused
   with little travel implied, while others (Twilio Senior Developer Advocate – Integrations)
   emphasize developer success across partner ecosystems [2].
3. **Community engagement** — moderating forums (Discord, Stack Overflow, Reddit), running
   meetups/hackathons, and building relationships with influential community members [1]. HashiCorp
   describes its Developer Relations team as helping "technical users solve problems using
   HashiCorp products, from creating documentation to holding live and online events like
   HashiConf and HashiTalks" [3].
4. **Internal feedback loop to product/engineering** — friction logs, customer empathy sessions,
   and office hours that "gather user insights that inform product development" [1]. This
   internal-facing function is frequently cited as the most defensible source of DevRel value:
   Mary Thengvall's research on internal DevRel found the most successful metric was "increased
   communication and collaboration among teammates," measurable via project velocity, feedback
   volume, and how other teams rate cross-functional collaboration [4].

Role emphasis differs by title even within DevRel: "Developer Experience Engineer" postings skew
toward improving SDKs, docs, CLIs, and onboarding flows (more code, less travel), while
"Community"-titled roles skew toward events/programs with less hands-on coding — both still sit
under the broader DevRel umbrella [5].

Sample real postings reviewed: Airtable (Developer Advocate, developer engagement strategy,
2+ years DevRel experience required), Backblaze (a "ground-floor" advocate role requiring 4-7
years as a software developer/engineer with cloud infra background), Temporal Technologies
(Staff Developer Advocate, Developer Enablement, listed pay range **$170,000–$215,000**), and
Telnyx (Developer Advocate acting as a "liaison for the developer community") [2].

## Success criteria / the "DevRel metrics problem"

DevRel is widely documented as one of the hardest functions to measure, and this difficulty is
itself a recurring topic in practitioner writing rather than an incidental complaint. The 11th
Annual State of Developer Relations Report (2024, ~pollees from stateofdeveloperrelations.com)
found **active users remained the top program-success metric at 44.3%**, with **revenue influenced
(17.5%)** newly entering the top 3, tied with **developer satisfaction/NPS** [6]. The same survey
tracked average total DevRel compensation falling from $225,094 (2023) to $213,907 (2024), a 4.9%
decline, illustrating that budget/headcount pressure and measurement difficulty are linked in
practice [6].

Mary Thengvall — a longtime DevRel/community strategist — has proposed repurposing existing
business metrics (e.g., adapting the MQL concept into a "DevRel Qualified Lead," or DQL: an
external contact who provides value the company can act on) specifically because DevRel lacked a
metric business stakeholders already trusted [4]. Her broader framework groups DevRel metrics into
four buckets: **adoption, developer engagement, DevRel-qualified leads, and documentation
usage/quality** [4]. This proliferation of competing frameworks (participation counts, content
reach, community growth, sentiment/NPS, influenced pipeline, internal stakeholder satisfaction) is
itself evidence that no single accepted metric exists — a "DevRel metrics problem" distinct from
sales (quota) or support (ticket resolution/CSAT), where the yardstick is unambiguous.

## Comp structure

DevRel comp is overwhelmingly **base + equity**, with little to no sales-style variable
compensation — a structural difference from Sales/Solutions Engineering. Levels.fyi data shows a
median Developer Advocate salary of **$156,000** across all companies, rising sharply at big tech:
Google ($190K L3 to $376K L6, median $217K), Amazon ($165K L4–$236K L5, median $190K), Apple
($141K–$315K, median $209K), and IBM ($145K–$205K, median $204K) [7]. Advocates "may qualify for a
bonus in addition to base salary" and typically receive equity grants at hire plus ESPP
eligibility, but this is discretionary/annual bonus, not commission-style variable pay tied to
deals [8].

**Organizational placement materially changes pay bands.** One compensation analysis states
plainly: "Two advocates with the same title and the same seniority can have total compensation
that differs by a big margin, almost entirely because one role reports to engineering and the
other to marketing... Whether the role reports to engineering or marketing often sets the pay band
before anything else" [8]. The same source gives rough US bands: entry-level $90K–$120K base,
mid-level $130K–$160K, senior/Head of DevRel $170K–$260K, with company stage and eng-vs-marketing
reporting line cited as the two biggest swing factors [8]. This is corroborated by practitioner
debate over "Does Developer Relations Belong Under Marketing or Engineering" as a live, unresolved
organizational question [8][9].

## Career ladder

Public ladders exist but are inconsistent industry-wide. GitLab's public developer-evangelist job
family lists levels as: developer evangelist → senior → staff → manager → program manager, with
principal-level titles appearing mainly at large organizations [10]. A synthesized ladder across
postings: **Junior/Associate Developer Advocate** (entry, content + supported community work) →
**Developer Advocate / Senior Developer Advocate** (autonomous content strategy, speaking,
strategic community programs) → **Staff Developer Advocate** (cross-team technical enablement,
education strategy — e.g., Temporal's "Staff Developer Advocate, Developer Enablement" posting) →
**Principal / Head / Director / VP of Developer Relations** (budget ownership, team management of
5–20 people, executive visibility) [2][10][11].

Standardization is a documented, named pain point: the 2021 State of Developer Relations annual
survey found only **34% of respondents said they have a defined career path in their
organization** [10]. Some orgs (Slack, Camunda) have published their DevRel career ladders
publicly specifically because the industry norm is to lack one, treating publication itself as a
notable and citable event [10].

## Common entry paths

The dominant entry path is **from software engineering**, particularly engineers "with a history
of mentoring juniors and improving developer experience within their own teams" who learn to
"externalize" tacit technical knowledge into teaching material [11]. Backblaze's posting explicitly
requires 4–7 years as a software developer/engineer for what it calls a "ground-floor" DevRel role,
underscoring that many companies still hire DevRel primarily for engineering depth [2]. Other
documented entry paths: **technical writers** who add community/speaking skills, **product
managers** who pivot from internal coordination to external community storytelling, and **sales
engineers** who "adapt by emphasizing developer success over deal closure" [1][11]. The top-cited
soft skill for success is empathy — the 2020 State of Developer Relations survey listed empathy as
the top skill needed in the field [12].

## Common exit paths

Documented exit paths include: **product management** (leveraging the strategic/feedback-loop
muscle built in DevRel — practitioners describe this as a natural adjacency since both roles sit
between engineering and external stakeholders) [13][11]; **technical/developer marketing**;
**back to core engineering leadership**, using enhanced communication skills; **technical
consulting**, specializing as a named authority in a technology; **open-source maintenance** as a
full-time role; and **DevRel executive tracks** (VP/Chief Developer Relations Officer) for those
who stay in-discipline [11]. Founder/independent-creator paths (developer education businesses,
course creators, newsletter/YouTube-driven consulting) are frequently referenced anecdotally in
practitioner blogs (e.g., "first year as a Developer Advocate" retrospectives) though less formally
documented than the PM or engineering-return paths [14].

## Top misconceptions vs. reality

- **"It's just marketing."** This is the most frequently and forcefully rebutted misconception in
  practitioner writing: "DevRel is not marketing — this point cannot be emphasized strongly
  enough... DevRel folks should not be put into marketing, they should actually be close to
  engineering," and "hiring a marketer and calling them 'Developer Advocate' damages trust with
  developers — they'll see through it immediately" [9]. Yet organizationally, many DevRel teams
  *do* report into marketing, which is itself a source of the friction described above regarding
  comp bands and identity [8][9].
- **"You just travel and give talks."** In practice, advocates "write code, build sample
  applications, and engage in technical discussions, while spending most of their time creating
  content, speaking at events, and building relationships" — speaking is one visible activity among
  several, and some roles (e.g., Tailscale's video-focused posting) minimize travel almost
  entirely in favor of remote content production [2][9].
- **Burnout/travel reality is real, not a myth.** "Conference travel, constant content production,
  and always being 'on' leads to high burnout in DevRel," and the external, always-visible nature
  of the role "can make developer relations team members feel isolated from other teams" while
  straining family schedules [15].
- **Org instability — DevRel is frequently first-cut in downturns.** This is a recurring,
  named concern in the practitioner community rather than a fringe complaint: DeveloperRelations.com
  ran a dedicated conference talk, "The DevRel Layoff Survival Guide," at DevRelCon London,
  addressing the "emotional experience of being laid off" and providing survival tips specifically
  because DevRel teams are "amongst the first to get cut when budgets tighten" [16]. This tracks
  with the measured compensation decline (down 4.9% in the 2024 State of Developer Relations report)
  during a period of broader tech contraction, though no single named case study of a DevRel-only
  layoff was independently verified in this research pass (see Notes below) [6][16].

## Notes / open questions (judgment calls made in this autonomous run)

- **No single named/dated DevRel-specific layoff case study was independently verified.** General
  tech-industry layoff trackers (Crunchbase, TrueUp) and DevRel-community commentary confirm the
  *pattern* (DevRel teams are early/frequent targets) [16], and aggregate comp data shows a
  contraction consistent with that pattern [6], but a specific "Company X cut its entire DevRel
  team on date Y" citation was not found in the searches run. A follow-up pass could search
  company-specific DevRel alumni LinkedIn posts or Twitter/X threads circa 2022–2024 for a concrete
  example (candidates worth checking: Twitter/X API DevRel post-2022 acquisition, Salesforce
  Heroku DevRel, or Meta's 2022–2023 developer platform cuts) — flagged as an open gap rather than
  asserted without a source.
- **Comp figures blend self-reported survey data, aggregator estimates (levels.fyi, InterviewPal),
  and a small number of explicit job-posting ranges** (Temporal's $170K–$215K is the only precise,
  first-party range captured; most company-specific figures come from levels.fyi crowdsourced
  data, which the site itself flags as self-reported and not verified by employers). Treated as
  directionally reliable but not authoritative for any single company/level.
  distribution note: role-cluster overlap. This brief deliberately treats "Developer Experience
  Engineer" as a DevRel sub-variant rather than a separate archetype, per source [5]'s framing that
  it differs mainly in coding-vs-speaking emphasis, not in fundamental success criteria or org
  placement. If the cross-review pass (per PLAN.md Phase 1) decides Developer Experience Engineer
  warrants a standalone archetype, this brief's day-to-day section should be revisited for scope.
- **Ladder synthesis is a composite**, not a single sourced ladder — no one public source lists all
  four levels I present, so I combined GitLab's public job family [10] with posting-level evidence
  (Temporal's Staff title, other Head/Director/VP postings) [2][11]. Flagged as synthesis, not a
  direct quote from any one source.
- Sourcing bar target for this brief was 6–8 distinct sources; 16 distinct URLs are cited below,
  exceeding the minimum.

---

## Sources

1. Reo.dev — "Developer Advocate: Complete Career Guide for DevRel Professionals" — https://www.reo.dev/blog/developer-advocate-guide-devrel
2. Real job postings (Greenhouse/Ashby boards), reviewed directly:
   - Airtable, Developer Advocate — https://boards.greenhouse.io/airtable/jobs/4652024002
   - Tailscale, Developer Advocate (Video) — https://job-boards.greenhouse.io/tailscale/jobs/4656023005
   - Upbound, Senior Developer Advocate — https://job-boards.greenhouse.io/upboundext/jobs/5268137004
   - Backblaze, Developer Advocate — https://job-boards.greenhouse.io/backblaze/jobs/5196139008
   - Temporal Technologies, Staff Developer Advocate, Developer Enablement ($170,000–$215,000) — https://job-boards.greenhouse.io/temporaltechnologies/jobs/5041529007
   - JetBrains, Developer Advocate (AIR) — https://job-boards.eu.greenhouse.io/jetbrains/jobs/4826456101
   - Twilio, Senior Developer Advocate – Integrations — https://job-boards.greenhouse.io/twilio/jobs/3212015
   - Telnyx, Developer Advocate (API) — https://boards.greenhouse.io/telnyx54/jobs/4353176003
3. HashiCorp — "Developer Relations jobs at HashiCorp" — https://www.hashicorp.com/jobs/developer-relations
4. Mary Thengvall — DevRel metrics writing/podcast — https://www.marythengvall.com/blog/tag/metrics and CHAOSScast Episode 18 — https://podcast.chaoss.community/18
5. JobRise — "Developer Relations Careers and Salary Guide 2026" (Developer Experience Engineer vs. community-focused role distinction) — https://jobrise.io/en/blog/developer-relations-careers-guide-2026/
6. State of Developer Relations — 2024 (11th Annual) Survey Report — https://www.stateofdeveloperrelations.com/2024devrelreport
7. Levels.fyi — Developer Advocate aggregate and per-company salary pages — https://www.levels.fyi/t/software-engineer/title/developer-advocate ; https://www.levels.fyi/companies/google/salaries/software-engineer/title/developer-advocate
8. InterviewPal — "Developer Advocate Compensation Benchmarks & Market Rates for 2026" — https://www.interviewpal.com/salaries/us/developer-advocate
9. Dan Vega — "What is Developer Relations and How do you define Developer Advocacy?" — https://www.danvega.dev/blog/developer-advocate
10. DevRel career ladders — GitLab's DevRel career ladder (via DeveloperRelations.com) — https://developerrelations.com/talks/gitlabs-devrel-career-ladder/ ; Slack Engineering, "Defining a career path for Developer Relations" — https://slack.engineering/defining-a-career-path-for-developer-relations/ ; State of Developer Relations 2021 (34% defined-career-path stat, cited via secondary summary in codecademy source below)
11. Codecademy — "What Is A Developer Advocate & How To Become One" — https://www.codecademy.com/resources/blog/what-is-developer-advocate-job-responsibilities
12. Draft.dev — "What is a Developer Advocate?" (2020 State of Developer Relations survey / empathy as top skill) — https://draft.dev/learn/what-is-a-developer-advocate
13. LinkedIn (Sohini Pattanayak) — "The transition from Developer Advocacy to Product" — https://www.linkedin.com/pulse/transition-from-developer-advocacy-product-sohini-pattanayak
14. Jessica Temporal — "First year as a Developer Advocate" — https://jtemporal.com/one-year-as-a-developer-advocate/
15. DEV Community — DevRel burnout/travel/isolation commentary, aggregated from search of practitioner posts including Advocu, "Beyond the glitter: Uncovering the DevRel Challenges" — https://www.advocu.com/post/beyond-the-glitter-uncovering-the-devrel-challenges-and-finding-solutions
16. DeveloperRelations.com — "The DevRel Layoff Survival Guide" (DevRelCon London talk) — https://developerrelations.com/talks/the-devrel-layoff-survival-guide/
