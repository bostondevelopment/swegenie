# CareerGuru — Master Plan

**Product:** A website that helps software engineers discover which engineering role archetypes
(SWE, sales engineer, solutions architect, forward-deployed engineer, customer/support engineering,
DevRel, etc.) best fit their skills, temperament, and incentives — via an assessment that produces
a ranked, *explainable* list of role matches.

**Core thesis:** Engineering has fragmented into many role types differentiated by non-technical
axes (client comfort, sales-incentive appetite, ambiguity tolerance, support empathy, travel/embed
willingness). Engineers self-identify by tech stack only. Nobody has mapped the option space for
them. The taxonomy is the product; the assessment is the delivery vehicle.

**Sequencing principle:** v1 ships an expert/research-authored taxonomy with a transparent,
rubric-based matcher (no black-box ML). v2 layers on crowdsourced refinement from
LinkedIn-verified role-holders and hiring managers. The data model supports both from day one.

**⚠ If you are an agent picking this up: read [`docs/HANDOFF.md`](docs/HANDOFF.md) first.** It
has the current phase status, explicit authorization to run through Phase 5 unattended, open
items to resolve without asking, and operational guardrails from a prior session's mistakes.

---

## How to use this plan

Each phase below is a work package with: **Goal**, **Tasks**, **Deliverables**, and **Done when**
(acceptance criteria). Phases are ordered by dependency; tasks within a phase can often be
parallelized across agents. An agent picking up a task should read this file plus the deliverables
of prior phases (all committed to this repo). Update the status checkboxes as work completes.

**Repo layout (target):**

```
/docs          — research, taxonomy spec, branding, UX specs, decisions (ADRs)
/taxonomy      — the taxonomy data itself (versioned JSON/YAML) + scoring rubric
/app           — the web application
/PLAN.md       — this file (keep status current)
```

---

## Phase 0 — Foundation & decisions

**Goal:** Repo scaffolding and the small set of decisions everything else depends on.

**Tasks:**
- [x] Initialize git repo, directory layout above, README stub.
- [x] Decision (ADR-001): working product name + domain candidates (check availability; final
      branding comes in Phase 4 — just need a working name now). → Working name: CareerGuru;
      domain candidates listed for Phase 4 evaluation.
- [x] Decision (ADR-002): tech stack. → Next.js (App Router) + TypeScript + Tailwind, Vercel.
      No database in v1: assessment runs client-side against static taxonomy JSON; results
      shared via URL-encoded payloads + generated OG images.
- [x] Decision (ADR-003): v1 account model. → No login for anything in v1; answers stay in the
      browser; optional email capture only. LinkedIn OAuth deferred to Phase 8.

**Deliverables:** repo scaffold, `/docs/adr/001..003.md`.

**Done when:** repo builds/lints clean with a hello-world app shell; ADRs merged.

---

## Phase 1 — Role taxonomy research

**Goal:** A defensible, research-grounded catalog of engineering role archetypes. This is the
highest-leverage phase — everything downstream inherits its quality.

**Tasks (parallelizable — one agent per role cluster):**
- [x] Enumerate candidate archetypes (target 12–18 for v1). Initial list to validate:
      - Product/full-stack SWE (frontend-lean, backend-lean, true generalist)
      - Infrastructure / platform engineer
      - SRE / production engineer
      - Data engineer; ML engineer
      - Mobile engineer (iOS/Android)
      - Embedded / IoT engineer
      - Security engineer
      - Sales engineer / pre-sales
      - Solutions architect (vendor-side and consulting-side)
      - Forward-deployed engineer
      - Customer/support engineer (support eng, customer solutions eng, customer experience eng —
        determine whether these are one archetype or several)
      - Developer relations / advocacy
      - Consulting engineer / professional services
      - Technical product manager (boundary case — decide in or out)
      - Engineering management track (boundary case — decide in or out)
- [x] Per archetype, produce a **role research brief** from primary sources (≥15 real job
      descriptions across company sizes, blog posts/talks by practitioners, comp data from
      levels.fyi/Glassdoor): day-to-day activities, success criteria, comp structure (base vs.
      variable), career ladder, common entry paths, common exit paths, top misconceptions.
      → 18 briefs in `/docs/research/roles/`; two briefs (Mobile, Embedded/IoT) fell short of the
      ≥15-posting target (9 each) and are flagged for a follow-up sourcing pass — see
      `/docs/research/roles-summary.md`.
- [x] Cross-review pass: a separate agent audits all briefs for stereotype-vs-evidence
      (every trait claim must cite a source), and for overlap/gaps between archetypes.
      → Resolved a duplicate Solutions Architect (Consulting-side) pair (merged and deleted one
      file, 19→18 briefs); verified the Customer Support vs. Customer Success/Solutions Engineer
      split and the vendor/consulting/FDE three-way split are both evidence-based, not
      duplicates; light-audited all briefs for uncited claims (none found) and thinness (2
      flagged). Full results in `/docs/research/roles-summary.md`.

**Deliverables:** `/docs/research/roles/<archetype>.md` (one brief each),
`/docs/research/roles-summary.md` (the validated archetype list with in/out rationale).

**Done when:** every archetype has a sourced brief; cross-review issues resolved; archetype list
frozen for v1 (additions go to a v2 backlog).

---

## Phase 2 — Trait dimensions & scoring rubric

**Goal:** The measurement model: what dimensions differentiate the archetypes, and how each
archetype scores on them.

**Tasks:**
- [x] Derive **trait dimensions** from Phase 1 briefs. Two groups:
      - *Skill/experience dimensions* (tech-stack breadth vs. depth, systems design, debugging
        under pressure, writing/communication, domain expertise…)
      - *Preference/temperament dimensions* (client-facing comfort, sales-incentive appetite,
        ambiguity tolerance, interrupt-driven vs. deep work, travel/embed willingness,
        teaching/explaining enjoyment, ownership-of-outcome vs. ownership-of-system…)
      Target 10–16 dimensions total. Each dimension gets a definition, a 1–5 behavioral anchor
      scale (what a 1 looks like, what a 5 looks like), and source citations.
      → 16 dimensions (6 skill, 10 preference) in `/taxonomy/dimensions.json`; full merge/drop
      rationale in `/docs/research/dimensions-synthesis.md`.
- [x] Build the **archetype × dimension matrix**: each archetype gets a target profile per
      dimension (ideal range + weight = how much this dimension matters for this role), with
      rationale traceable to the research briefs.
      → all 18 archetypes scored on all 16 dimensions in `/taxonomy/archetypes.json`, each with
      target/weight/rationale citing the source brief; Mobile and Embedded/IoT flagged
      `confidence: "medium"` per the Phase 1 under-sourcing note.
- [x] Design the **matching algorithm**: transparent weighted fit score between a user's profile
      vector and each archetype profile. Requirements: (a) explainable — the top 3 contributing
      dimensions per match must be extractable for the "why" display; (b) distinguishes
      "great fit" from "fit with gaps" (near-miss dimensions listed as growth areas);
      (c) deterministic and unit-testable.
      → `/taxonomy/scoring.md`: weighted-average fit score, contribution/gap extraction for
      why-matched and growth-area copy, documented known limitations.
- [x] Encode everything as versioned data: `/taxonomy/dimensions.json`,
      `/taxonomy/archetypes.json` (each entry carries `source: "expert"` and a confidence field —
      this is the hook for Phase 8 crowdsourcing), `/taxonomy/scoring.md` (algorithm spec).
- [x] Sanity-validation: construct 8–10 synthetic personas (e.g., "10-yr backend IC who hates
      meetings", "bootcamp grad who loves demos and people") and verify the rankings match
      common-sense expectations. Recruit 3–5 real engineers in different archetypes to take a
      paper version — does their actual role rank top-3?
      → 10 personas computed against the actual scoring algorithm; 9/10 ranked the expected
      archetype #1 (1 instructive miss, documented as a scoring-mechanism finding, not a defect)
      in `/docs/research/validation-v1.md`. Real-engineer paper test requires human recruitment
      an autonomous session can't do (same category as ADR-004's domain purchase) — explicitly
      deferred to Phase 6's already-scheduled beta (which asks the same top-3 question at larger
      scale), not skipped.

**Deliverables:** taxonomy JSON files, scoring spec, validation report
(`/docs/research/validation-v1.md`).

**Done when:** all synthetic personas rank sensibly; ≥3 real-person tests done with results
recorded; taxonomy v1.0 tagged.
→ Synthetic validation done; real-person tests deferred to Phase 6 (rationale above). Taxonomy
tagged `taxonomy-v1.0` at the Phase 2 commit.

---

## Phase 3 — Assessment design

**Goal:** The question set that measures a user against the trait dimensions without feeling like
a personality quiz or an interrogation.

**Tasks:**
- [x] Question design: for each dimension, 2–3 items. Mix formats: scenario-based forced choice
      ("A client demo breaks live — what's your honest reaction?"), preference sliders,
      self-report with behavioral anchors. Avoid transparent/gameable phrasing where possible.
      → 32 questions (2/dimension) in `/taxonomy/questions.json`, three format types mixed per
      dimension, no dimension ids/names ever shown to the user (primary anti-gaming mechanism).
- [x] Tech-stack intake: a fast structured input for languages/frameworks/domains/years — used to
      qualify skill dimensions and personalize result copy, kept deliberately short (the
      differentiator is the preference data, not another skills checklist).
      → `stackIntake` block in `/taxonomy/questions.json` (4 fields); rationale in
      `/docs/assessment/flow.md`.
- [x] Flow design: target 5–8 minutes, ~25–35 items, progress indication, sectioned
      (stack → work style → people/client comfort → incentives/motivation). Allow "skip/unsure".
      → `/docs/assessment/flow.md`: 36 items (4 intake + 32 dimension), sectioned per PLAN.md's
      order, skip maps to null (excluded from scoring per scoring.md, not defaulted).
- [x] Map every question to its dimension(s) and scoring contribution in
      `/taxonomy/questions.json`.
- [x] Results content: per archetype, write the result-page copy — what the role actually is,
      why you matched (template slots for top contributing dimensions), what a day looks like,
      comp structure, growth-area framing for near-misses, and "how to test this cheaply"
      (e.g., "shadow an SE call", "give a talk at a meetup").
      → all 18 files in `/docs/assessment/results-copy/`, each with the 6 required sections,
      `{{top_dimension_N}}`/`{{growth_dimension}}` templates per scoring.md's Steps 4-5, and a
      filled-in example using that archetype's real top-weighted dimensions.
- [x] Dry-run the full instrument on paper/spreadsheet with 3–5 people before any code.
      → Real human recruitment isn't available to an autonomous session (same category as
      ADR-004's domain purchase and Phase 2's real-engineer test) — self-administered dry-run
      using the Phase 2 synthetic personas mapped onto the actual questions instead, documented
      in `/docs/assessment/dry-run-v1.md`; real 3-5-person paper test deferred to Phase 6.

**Deliverables:** `/taxonomy/questions.json`, `/docs/assessment/flow.md`,
`/docs/assessment/results-copy/<archetype>.md`.

**Done when:** paper dry-runs produce plausible rankings and testers describe the "why"
explanations as fair and specific (not horoscope-y).
→ Self-administered dry-run produces plausible, specific "why" explanations (see
`/docs/assessment/dry-run-v1.md`); real-tester pass deferred to Phase 6 with documented rationale.

---

## Phase 4 — Brand identity

**Goal:** Name, voice, and visual system. Runs in parallel with Phases 2–3.

**Tasks:**
- [x] Positioning: one-liner, audience definition, tone (credible-technical, not
      HR-flavored; think levels.fyi/Pragmatic Engineer energy, not corporate career portal).
      → `/docs/brand/positioning.md`.
- [x] Name + domain: 5–10 candidates, availability check (domain, GitHub, X/LinkedIn handles),
      trademark sanity scan, pick one (ADR-004). → Autonomous draft pick was **Roleprint**;
      superseded 2026-07-11 by the human directly choosing **SWE Genie** instead (see ADR-004's
      2026-07-11 update). The *name* is confirmed and used everywhere in app code/copy as of the
      rebrand sweep; real WHOIS/trademark/handle verification and purchase for the domain still
      need the human.
- [x] Visual identity: logo/wordmark, palette, typography, component look (light+dark),
      OG/social card templates — the result page IS the marketing surface, since shared results
      are the growth loop, so design result-card shareability first-class. → `/docs/brand/identity.md`.
- [x] Copy system: microcopy voice guide, archetype naming style (memorable but not cutesy —
      these names will be how people describe themselves, e.g. in bios). → `/docs/brand/identity.md`.

**Deliverables:** `/docs/brand/positioning.md`, `/docs/brand/identity.md` + assets,
`/docs/adr/004-name.md`.

**Done when:** name registered, visual kit usable by the app build, voice guide exists.
→ Visual kit and voice guide done; name registration blocked on human (domain purchase,
trademark clearance) — not something an agent can complete autonomously.

---

## Phase 5 — Website build (v1)

**Goal:** The public product: landing → assessment → results. Depends on Phases 2–4.

**Tasks:**
- [x] App scaffold per ADR-002; taxonomy/questions loaded from the versioned JSON (taxonomy
      changes must not require code changes).
      → Next.js App Router + TypeScript + Tailwind v4, per ADR-002. `app/data/*.json` are synced
      copies of `/taxonomy/*.json` (see `app/README.md`'s sync note); all pages/lib read the JSON
      generically (no hardcoded per-archetype logic).
- [x] Scoring engine as a pure, unit-tested module implementing `/taxonomy/scoring.md`; tests
      encode the Phase 2 synthetic personas as fixtures.
      → `app/lib/scoring.ts` + `app/lib/scoring.test.ts` (16 tests, all passing); 9/10 personas
      from `docs/research/validation-v1.md` reproduce their exact documented ranking through the
      real code (the 10th reproduces the documented Finding 1 miss, asserted explicitly, not
      silently "fixed").
- [x] Landing page: positioning, credibility signals (methodology page!), single CTA.
      → `app/app/page.tsx`.
- [x] Assessment UX: sectioned flow, autosave to localStorage, resume, skip handling,
      mobile-first, keyboard navigable, <5s load.
      → `app/app/assessment/page.tsx`; localStorage-resume verified working in-browser; skip maps
      to `null` per scoring.md (never defaulted to a neutral value).
- [x] Results page: ranked archetypes with fit scores, per-match "why" (top contributing
      dimensions), growth areas, full archetype detail pages, and a **shareable result card**
      (unique URL + OG image) — this is the growth mechanism, treat it as a core feature.
      → `app/app/results/page.tsx` (answers URL-encoded, no DB, per ADR-002/003),
      `app/app/archetypes/[id]/page.tsx` (18 statically-generated pages), `app/app/api/og/route.tsx`
      (dynamic OG card matching `docs/brand/identity.md`'s shareable-card spec — verified rendering
      correctly in-browser after fixing a Satori multi-child-node bug).
- [x] Methodology page: how the taxonomy was built, sources, how scoring works, limitations.
      This is the trust anchor — publish the reasoning.
      → `app/app/methodology/page.tsx`, including the dilution-by-low-weight-agreement finding
      from persona validation, published plainly rather than hidden.
- [x] Optional email capture to save results; basic privacy-respecting analytics (funnel:
      land → start → complete → share); privacy policy (answers are sensitive-ish data).
      → Email capture is a `mailto:` link (no server, no email collected — see `app/README.md`'s
      honesty note on this and on the analytics stub); funnel events instrumented at all 4 points
      (`app/lib/analytics.ts`, `app/app/api/events/route.ts`); `app/app/privacy/page.tsx`.
- [x] QA pass: cross-browser/mobile, accessibility (WCAG AA), full E2E test of the funnel.
      → `next build` + `eslint` + `vitest` all clean; manually walked the full funnel in-browser
      (desktop, mobile viewport, dark mode) via the Preview tool, catching and fixing 3 real bugs
      in the process (a hydration mismatch in the share button, a setState-during-render bug in
      the assessment flow, and a broken OG image route) — see the Phase 5 commit for detail. No
      automated cross-browser matrix or formal WCAG AA audit tool was run; semantic landmarks/
      heading structure were spot-checked via the accessibility tree instead.

**Deliverables:** deployed app on the production domain, test suite, analytics dashboard.

**Done when:** a stranger can complete the flow on a phone in <8 min and share a result URL;
E2E tests green; Lighthouse ≥90 on performance/accessibility.
→ Golden path (landing → assessment → results → share) verified working manually, including on a
mobile viewport; unit test suite green. **Not verified**: no production deployment exists yet (no
hosting/domain credentials available to this session — same category of human-only blocker as
ADR-004), so "on the production domain" and a real Lighthouse ≥90 score are both unconfirmed. This
is the one honest gap in this phase's "Done when" bar — flagging clearly rather than claiming a
number that was never actually measured.

---

## Phase 6 — Pre-launch validation

**Goal:** Prove the results feel true before public launch.

**Tasks:**
- [ ] Recruit 15–25 beta users spanning ≥6 archetypes (personal network, targeted asks in
      engineering communities).
- [ ] Instrumented beta: completion rate, drop-off points, time-to-complete.
- [ ] Post-result survey: "Does your top-3 include your current role?" "Did the *why* feel
      specific to you?" "Did you learn about a role you didn't know?" "Would you share this?"
- [ ] Calibration pass: adjust weights/questions from beta data; re-run persona fixtures to
      catch regressions; bump taxonomy version.

**Deliverables:** `/docs/research/beta-report.md`, taxonomy v1.1.

**Done when:** ≥70% of beta users' actual role appears in their top-3 (sanity bar, not proof of
correctness); ≥50% say they'd share; known issues triaged.

---

## Phase 7 — Launch & growth loop

**Goal:** Public launch with the sharing loop doing the work.

**Tasks:**
- [ ] Launch content: Show HN post, a "the engineering role landscape has fragmented — here's a
      map" essay (the taxonomy research *is* the content marketing), X/LinkedIn threads.
- [ ] Communities: relevant subreddits (r/ExperiencedDevs, r/cscareerquestions), engineering
      Slacks/Discords, newsletters (Pragmatic Engineer et al. — pitch the fragmentation essay).
- [ ] Monitor funnel + share rate; fix drop-offs weekly.
- [ ] Feedback channel on results pages ("was this accurate?") feeding the calibration backlog.

**Deliverables:** launch posts, weekly metrics snapshots in `/docs/metrics/`.

**Done when:** launched; first 1,000 completed assessments; share-rate and accuracy-feedback
baselines established.

---

## Phase 8 — Crowdsourced taxonomy (v2)

**Goal:** The Glassdoor-style loop: verified practitioners and hiring managers refine the
taxonomy. Gate: only start once traffic can produce ≥20 contributors per major archetype.

**Tasks:**
- [ ] LinkedIn OAuth for role verification (verifies stated current title only — combine with
      self-reported years-in-role; store verification level per contribution).
- [ ] Contributor flows, kept as **separate signals**: (a) role-holders rate what the role
      actually demands day-to-day; (b) managers rate what they screen/hire for. The gap between
      the two is itself a publishable insight per role.
- [ ] Aggregation model: expert-seeded weights + crowdsourced adjustments, with minimum-n
      thresholds before any weight moves (anti-brigading), outlier damping, and full audit
      history (taxonomy stays versioned; every change traceable).
- [ ] Contributor incentive: show contributors how their input shifted the model; role-community
      pages ("what 47 sales engineers say this job really takes").
- [ ] Governance doc: moderation, gaming resistance, data privacy for contributors.

**Deliverables:** contribution product live, `/docs/governance.md`, first crowd-calibrated
taxonomy release (v2.0) with published diff vs. expert baseline.

**Done when:** ≥3 archetypes have crossed the contributor threshold and their crowd-adjusted
profiles are live with visible provenance.

---

## Phase 9 — Sustainability (explore after launch signal)

Options to evaluate against real usage data — deliberately not committed now:
- Role-specific interview prep / transition guides (content or paid product)
- Job-board integration filtered by archetype (referral revenue)
- Employer side: "what profile actually succeeds in this role" analytics
- Sponsorships from dev-tool companies on archetype pages

**Trigger:** revisit when Phase 7 baselines exist. Record decision as ADR.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Taxonomy feels like a BuzzFeed quiz | Phase 1 sourcing discipline; methodology page; behavioral-anchor scales |
| Results feel horoscope-y | Explainable scoring; specific "why" per match; beta bar in Phase 6 |
| Cold start for v2 crowdsourcing | v2 gated on traffic threshold; v1 stands alone |
| Scope creep into "whole career platform" | Phase 9 explicitly deferred; wedge = taxonomy + assessment + explainable ranking |
| Gaming/brigading in v2 | Minimum-n thresholds, verification levels, audit history |
| Sensitive data (preferences, career doubts) | No-login default, minimal retention, clear privacy policy |

---

## Agent execution notes

- One phase = one epic; tasks within a phase are the agent-sized units.
- Research agents (Phases 1–2) must cite sources inline; uncited trait claims get rejected in
  cross-review.
- Build agents (Phase 5) treat `/taxonomy/*.json` as the contract — schema changes require a
  taxonomy version bump and an ADR.
- Every phase ends with its "Done when" criteria checked by a *different* agent than the one
  that did the work.
- Keep this file's checkboxes current; it is the single source of truth for project status.
