# Mobile Engineer (iOS / Android)

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **202 real, currently-live job postings across 65 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 65 total):

- **Wolt** — "Senior Android Engineer"
- **Fidelity** — "Principal Mobile Developer"
- **Zopa** — "Senior Android Engineer"
- **Airwallex** — "Senior iOS Engineer, GTPN Platform"
- **Handshake** — "iOS Engineer I"
- **HelloFresh** — "Senior React Native Developer, Growth"
- **Toast** — "Senior Android Engineer, International"
- **Oura** — "iOS Engineer"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Cluster:** Mobile & Embedded
**Status:** Draft v1 — Phase 1 research brief, follow-up sourcing pass completed 2026-07-11
**Confidence:** High (18 job postings sourced across company stages — seed through big tech — past the ≥15-posting target; career-ladder claims still lean on a small number of high-quality practitioner sources, see Open Questions)

## Scope decision: one archetype, not two

**Decision: treat "Mobile Engineer" as a single archetype for v1, with iOS/Android as a sub-selector rather than two separate archetypes.**

Reasoning:
- The *temperament and incentive* profile that CareerGuru's taxonomy is built to measure (client-facing comfort, ambiguity tolerance, deep-work vs. interrupt-driven, ownership-of-system) is essentially identical between iOS and Android engineers. What differs is tech stack (Swift/SwiftUI vs. Kotlin/Jetpack Compose) and platform culture (Apple's curated, review-gated ecosystem vs. Android's fragmented device/OS matrix) — those are *skill-dimension* and *tooling* differences, not archetype-defining ones. CareerGuru's tech-stack intake (Phase 3) is the right layer to capture "iOS vs. Android vs. both," not the taxonomy layer.
- Job postings themselves increasingly blur the line: many companies hire a single "Mobile Engineer" req and expect candidates to ramp on whichever platform needs coverage, or to work in a cross-platform framework (React Native/Flutter/KMP) that spans both. See Ramp's "Mobile Engineer, iOS" req, which is explicitly one slot in a shared mobile org ([Ramp — Mobile Engineer, iOS](https://jobs.ashbyhq.com/ramp/4859cd5e-f2a9-44d7-81f7-8bfc0e62369f)), and SeatGeek's "Senior Mobile Engineer, iOS" title pattern ([SeatGeek](https://job-boards.greenhouse.io/seatgeek/jobs/8003663)) — the base title is "Mobile Engineer," platform is a suffix/tag.
- Cross-platform frameworks (Flutter ~46% share, React Native ~35% share of the cross-platform segment, Kotlin Multiplatform ~8% and growing) now power a large share of net-new mobile work, meaning a growing fraction of "mobile engineers" don't specialize in one native platform at all ([Flutter vs React Native market share 2026](https://tech-insider.org/flutter-vs-react-native-2026/)).
- Where it matters (and should be captured as a skill-dimension flag, not a new archetype): Apple's App Store review process, HIG conventions, and single-vendor hardware matrix make iOS somewhat more constrained/curated; Android's device fragmentation (screen sizes, OS versions, OEM skins) makes Android engineering more defensive/testing-heavy. This is real but secondary to the shared "build performant, offline-tolerant, App-Store/Play-Store-gated software that runs on a device you don't fully control" identity.

Open question for Phase 2: if trait-dimension scoring later reveals iOS and Android engineers cluster differently on ambiguity tolerance or fragmentation-tolerance, revisit as a v2 split. Flagging, not resolving, here.

---

## Day-to-day activities

- Building UI and business logic natively (Swift/SwiftUI/UIKit on iOS; Kotlin/Jetpack Compose on Android) or via a cross-platform framework (React Native, Flutter), translating design specs into shipped screens ([Toptal iOS Developer Job Description](https://www.toptal.com/ios/job-description); [Workable Android Engineer JD](https://resources.workable.com/android-engineer-job-description)).
- Integrating with backend APIs/SDKs, handling offline state, caching, and sync — mobile apps must degrade gracefully on flaky networks in a way most backend services don't.
- Performance work specific to constrained devices: startup time, memory footprint, battery/battery-drain profiling, frame-rate/jank on lower-end Android hardware.
- Release engineering unique to the platform: App Store/Play Store submission, review-queue delays (especially iOS, which has editorial review), staged rollouts, crash-reporting triage (Crashlytics/Sentry), feature flags for phased release since you can't instantly roll back a shipped binary the way you can a server deploy.
- Code review, mentoring, and — at senior+ — setting patterns for modularization, DI, and test architecture as the app and team scale (see Ramp posting: "help establish engineering processes and tools to scale the codebase," [Ramp](https://jobs.ashbyhq.com/ramp/4859cd5e-f2a9-44d7-81f7-8bfc0e62369f)).
- Cross-functional work with Product/Design on feasibility and UX tradeoffs — mobile teams sit close to design because screen real estate and platform conventions constrain what's buildable.
- At Staff+: architecture ownership across a growing app (modularization, build-time reduction, shared component libraries), driving productivity/reliability/maintainability standards across multiple teams rather than one feature ([Principal iOS Engineer role blueprint](https://www.devopsschool.com/blog/principal-ios-engineer-role-blueprint-responsibilities-skills-kpis-and-career-path/)).

## Success criteria

- Shipped features that are stable in production: crash-free session rate, ANR rate (Android), App Store/Play rating trend.
- Release cadence discipline — getting features through platform review and staged rollout without regressions; owning rollback/kill-switch plans since a bad native release can't be hotfixed instantly.
- Performance budgets held (cold start time, frame drops, binary/app size) — these are explicit, measurable, and often gated in CI at maturity.
- At senior+: mentoring output, architecture decisions that reduce team-wide build/test friction, and — per the Ramp and Faire postings — measurable adoption/engagement impact of shipped features, not just "shipped."
- Individual-level, not team-level, code ownership is more common than on backend teams of similar size, because mobile codebases are still often organized around platform rather than service boundaries.

## Comp structure (US, 2025-2026 figures)

- **Aggregate median (all levels, iOS+Android combined), levels.fyi:** ~$219,000 total comp; iOS-specific median ~$191,500; Android-specific median ~$194,200 ([levels.fyi Mobile (iOS+Android) Software Engineer](https://www.levels.fyi/t/software-engineer/focus/mobile-ios-android); [iOS Engineer](https://www.levels.fyi/t/software-engineer/title/ios-engineer); [Android Engineer](https://www.levels.fyi/t/software-engineer/title/android-engineer)).
- **Big Tech examples:** Meta Android Engineer $271K–$411K+ total comp across levels ([levels.fyi Meta](https://www.levels.fyi/companies/meta/salaries/software-engineer/title/android-engineer)); LinkedIn iOS Engineer $213K–$303K+ ([levels.fyi LinkedIn](https://www.levels.fyi/companies/linkedin/salaries/software-engineer/title/ios-engineer)); LinkedIn Mobile SWE median ~$247K.
- **Glassdoor (broader market, skews smaller companies, base-leaning):** iOS Developer overall average base ~$130K (25th–75th percentile $103K–$166K); Senior iOS Developer average ~$169K ($134K–$217K); Lead iOS Developer average ~$160K ($127K–$205K) ([Glassdoor iOS Developer](https://www.glassdoor.com/Salaries/us-ios-developer-salary-SRCH_IL.0,2_IN1_KO3,16.htm); [Glassdoor Senior iOS Developer](https://www.glassdoor.com/Salaries/senior-ios-developer-salary-SRCH_KO0,20.htm)).
- **Structure:** Base + equity (RSUs at public/late-stage companies, options at early-stage) + bonus, same general shape as other SWE archetypes at the same company — mobile does not carry a distinct comp *structure* (e.g., no variable/commission component). The gap between Glassdoor (mostly smaller/non-tech-hub employers) and levels.fyi (skews FAANG/unicorn self-reporters) is roughly 40-50%, which is a useful signal of how much company tier matters more than platform choice for mobile comp.
- **Open question:** we don't yet have clean data on iOS-vs-Android base/equity mix differences within the same company/level; anecdotally treated as equivalent by employers (single "mobile" band), consistent with the single-archetype decision above.

## Career ladder

Standard IC ladder: Junior/Associate → Mid → Senior → Staff → Principal → Distinguished/Fellow (rare, biggest companies only), with a parallel EM/Director/VP track ([Pragmatic Engineer — Engineering Career Paths](https://newsletter.pragmaticengineer.com/p/engineering-career-paths); [End of Line Blog — SWE career levels](https://www.endoflineblog.com/software-engineer-career-levels)).

Mobile-specific dynamic worth flagging explicitly: multiple practitioner sources describe a **"glass ceiling" for mobile ICs above Senior/Staff at large companies**. At Uber — one of the largest native mobile codebases in the industry — of the ~10-15 engineers at the highest IC level (senior staff/principal), reportedly none were mobile, and only a small fraction of all staff engineers were mobile despite mobile being a large, technically demanding part of the org ([The Pragmatic Engineer — Mobile Engineering at Uber](https://blog.pragmaticengineer.com/mobile-engineering-at-uber/); [Uber's engineering level changes](https://blog.pragmaticengineer.com/uber-engineering-levels/)). The likely mechanism: distributed-systems/backend work is more legible to promotion committees as "complex, cross-cutting technical impact" than UI/client work, even though building large native apps at scale is comparably hard. This is a real career-planning consideration for anyone matched into this archetype who cares about IC ladder ceiling — worth surfacing in results copy (Phase 3) as a growth-area / tradeoff note, not just a neutral fact.

## Common entry paths

- **CS degree → new-grad mobile role**, often after a generalist new-grad program that lets the person choose or get assigned to a mobile team.
- **Self-taught/bootcamp**, notably common on iOS given Swift's approachability and the dense self-study ecosystem (e.g., Paul Hudson's "100 Days of Swift"). Realistic timeline to first job is longer than bootcamp marketing claims — dedicated 20+ hrs/week study is commonly cited as 6+ months to job-ready from zero programming background, less with prior programming experience; expect 50-100+ applications for a first junior role ([Bootcamp to iOS Job: A Realistic Timeline](https://medium.com/@chandra.welim/bootcamp-to-ios-job-a-realistic-timeline-836789234ef0)).
- **Lateral move from web/frontend**, especially into React Native or Flutter roles, leveraging existing JS/Dart-adjacent skills — this is a lower-friction entry point than native iOS/Android given the shared component/state-management mental model.
- **Internal transfer from QA/support into mobile eng** at companies with large consumer apps, especially where mobile QA automation overlaps with Espresso/XCUITest skills.

## Common exit paths

- **Engineering management** — a well-worn path once a mobile IC hits Senior/Staff and hits (or wants to avoid) the glass-ceiling dynamic above; managing a mobile team leverages platform context without requiring further promotion up a constrained IC ladder.
- **Backend/full-stack engineering** — described by multiple practitioners as friction-heavy because mobile and backend language/runtime ecosystems don't overlap much (unlike frontend web → Node.js, which is a much shorter hop) ([Why I Transitioned from Android Developer to Backend Engineer](https://medium.com/@hamza97/why-and-how-i-transitioned-from-mobile-development-to-backend-engineering-part-1-a03d58536850); [My Engineering Transition from Mobile to Backend](https://pspdfkit.com/blog/2023/mobile-to-backend-transition/)). Common enough to be a real path, but requires deliberate ramp-up, not a natural adjacency.
- **Developer productivity / platform / build tooling** — mobile engineers who specialized in build systems, modularization, or CI end up well-positioned for internal developer-experience roles.
- **Founder/startup**, but less common than from backend/full-stack backgrounds — most technical founders of infrastructure-heavy startups skew backend/systems, per practitioner commentary; mobile founders more often build consumer/mobile-first products where the mobile skill set is the direct product need rather than a general "can build anything" toolkit ([Strategic Career Paths for Mobile Engineers](https://medium.com/@deepak.srivastava.india/strategic-career-paths-for-mobile-engineers-in-a-shifting-tech-landscape-a23749907e0c)).
- Rarely CTO at scale-up/large companies per the same practitioner set — worth noting as a contrarian data point against "mobile is a stepping stone to any technical leadership role."

## Top misconceptions vs. reality

1. **Misconception: mobile dev is "just UI work," lower-status than backend.** Reality: native mobile at scale involves real systems-engineering problems — offline-first data sync, memory-constrained performance tuning, binary size budgets, and release processes with no instant rollback. The Uber staff-level data above is itself evidence the *perception* gap (not a competence gap) is the real issue.
2. **Misconception: "iOS developer" or "Android developer" is a fixed, narrow specialization.** Reality: multiple senior practitioners describe realizing the label itself was self-limiting — the underlying skill (structuring an app, working with APIs, state management) transfers across platforms and even to backend; the practical entry barrier is language/tooling familiarity, not fundamentally different engineering skill ([iOS Application Development: Expectations vs Reality](https://etelligens.medium.com/ios-application-development-expectations-vs-reality-8e318ed0ee6e)).
3. **Misconception: more architecture/abstraction is always better.** Reality: practitioner sources flag over-engineering (excess abstraction layers, premature Clean Architecture/VIPER-style setups) as a common and costly mistake in mobile codebases, especially on small teams ([Toptal — 10 Common iOS Development Mistakes](https://www.toptal.com/ios/top-ios-development-mistakes)).
4. **Misconception: downloads/install numbers equal business success.** Reality: retention and in-app monetization matter far more than raw download counts; teams that optimize for downloads alone often miss the metrics that actually predict revenue ([App Development Reality Check](https://thisisglance.com/blog/app-development-reality-check-what-makes-mobile-projects-challenging)).
5. **Misconception: getting into mobile via bootcamp is fast (weeks to job-ready).** Reality: realistic self-study-to-hire timelines run months, not weeks, and the job search itself (50-100+ applications) is a significant part of the "cost" of entry that marketing materials omit.

## Additional sourced postings (follow-up pass, 2026-07-11)

10 further postings, verified live and fetched directly, added to close the sourcing gap flagged in the original Phase 1 pass. Spread across seed, Series B/C, growth, and big-tech stages:

- **Packz — iOS Engineer** (seed; gamified collectibles app). Solo full-feature-lifecycle ownership in Swift/SwiftUI at a small founder-led team; posting explicitly wants candidates who "move quickly with limited structure" and use AI coding tools daily. High signal for ambiguity tolerance at the earliest company stage. ([Packz](https://jobs.ashbyhq.com/packz/dd3c3954-2180-4d37-bd4d-baa2fb934902))
- **Embrace — Senior iOS SDK Engineer** (Series B, mobile observability, clients incl. NYT/Marriott). Builds a modular Swift SDK (crash/hang detection, MetricKit) consumed by *other companies'* apps — infrastructure-for-mobile-teams work, not product UI; coordinates with React Native/Flutter/Unity SDK counterparts. $130K-$170K. ([Embrace](https://job-boards.greenhouse.io/embrace/jobs/5810605004))
- **Sprig — Senior Software Engineer, Android** (Series C, AI survey platform). Owns an Android SDK deployed inside millions of end-users' apps across customers; heavy emphasis on OEM compatibility, ANR/startup-time metrics, API-contract discipline — a "platform engineer" flavor of mobile work. $180K-$260K. ([Sprig](https://jobs.ashbyhq.com/sprig/d45584b5-1e61-436e-b5a9-2f5307cf25d9))
- **Airwallex — Senior Mobile Engineer, Yield (iOS)** (growth-stage unicorn fintech). Team framed as "a startup within a startup" — full-cycle ownership of a compliance-aware enterprise iOS app; illustrates big-company resources paired with startup-style ownership expectations. ([Airwallex](https://jobs.ashbyhq.com/airwallex/e02b40d3-eff8-4c76-b9fb-0e466b29220b))
- **EarnIn — Senior Mobile Engineer (iOS)** (profitable growth-stage fintech). $199K-$244K CAD. Explicitly lists AI-assisted coding tools as a plus, MVVM/MVP/VIPER fluency, and cross-functional KPI ownership. ([EarnIn](https://job-boards.greenhouse.io/earnin/jobs/7927859))
- **Speechify — Software Engineer, iOS Core Product** (growth-stage, ~200 people, fully distributed). $140K-$200K. Leads product/engineering decisions solo in a flat org — a strong "high ownership, high ambiguity" profile typical of lean growth-stage teams. ([Speechify](https://job-boards.greenhouse.io/speechify/jobs/5981056004))
- **Life360 — Staff iOS Engineer (AI Native), Family AI Lab** (growth/public, ~98M MAU). $190K-$280K. A "zero-to-one lab inside a public company" with same-day prototype-to-ship cycles and an explicit mandate to orchestrate AI coding agents — strong signal on design-engineering blur and low-spec ambiguity tolerance even at a public company. ([Life360](https://job-boards.greenhouse.io/life360/jobs/8544284002))
- **Oura — Senior iOS Engineer** (growth-stage consumer wearables brand). $139K-$203K by region. Cross-functional squads with full design-to-maintenance autonomy; stack spans UIKit/SwiftUI/Combine plus hardware-adjacent skills (BLE, Kotlin Multiplatform) — an example of mobile engineering touching the firmware boundary. ([Oura](https://job-boards.greenhouse.io/oura/jobs/4024438009))
- **Robinhood — Senior iOS Engineer, Crypto Trading** (big tech, public). $196K-$230K, 3 days/week in-office. Real-time market data, complex order flows, charting — high coding-intensity, high-stakes financial UI; 6+ years expected with mentoring/architectural leadership even at "senior." ([Robinhood](https://job-boards.greenhouse.io/robinhood/jobs/8027506))
- **xAI — Mobile Android Engineer** (big tech, mega-funded). $180K-$440K. Flat org; Kotlin/Jetpack Compose *plus* Rust for backend components — an unusually broad platform-fluency bar expecting mobile engineers to reach into backend/systems work even by big-tech standards. ([xAI](https://job-boards.greenhouse.io/xai/jobs/4892323007))

Total sourcing: 18 postings (8 from the original pass + these 10), past the ≥15-posting target. Several other candidates found via search (Warmer, Mercury, Maven Clinic, Suno, and several jobs.lever.co-hosted postings including WHOOP/360Learning/Proof/ION Group/US Mobile) were excluded because they could not be verified live at fetch time — not counted toward this total.

## Open questions / gaps for cross-review

- No direct comp data found specifically isolating cross-platform (Flutter/React Native) engineer pay vs. native iOS/Android at the same company/level — plausible these are treated identically in banding, but unconfirmed.
- The "glass ceiling" claim rests on a small number of Pragmatic Engineer/Gergely Orosz sources anchored on one company (Uber, historical). Directionally credible (Orosz is a widely-respected primary source, ex-Uber mobile lead himself) but would benefit from a second independent company data point before being treated as a general industry law rather than an Uber-specific/historical anecdote.
- jobs.lever.co consistently returned HTTP 403 during the follow-up sourcing pass, blocking verification of several otherwise-promising postings (WHOOP, 360Learning, Proof, ION Group, US Mobile) — likely bot-blocking on that ATS rather than the postings being fake; worth revisiting with a different fetch approach in a future pass rather than treated as a content gap.
