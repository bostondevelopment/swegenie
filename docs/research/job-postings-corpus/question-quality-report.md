# Question & Dimension Quality Report — Job-Postings-Corpus Cross-Check

**Scope:** `taxonomy/dimensions.json` (v1.2, 22 dimensions) and `taxonomy/questions.json` (v1.4, 40 questions), checked against `docs/research/job-postings-corpus/archetype-signal/*.json` (18 archetypes, `dimension_evidence` + `notable_divergence_from_existing_brief` + `top_requirements`/`top_responsibilities`).

**Method:** every `dimension_evidence` entry and `notable_divergence_from_existing_brief` note across all 18 archetype-signal files was read and aggregated per dimension. Findings below are reported only where evidence was specific, repeated, and directly about the *wording* of an anchor/prompt or a *genuine absence* of coverage — not every `supports_current_scoring: false` flag in the corpus. The large majority of those `false` flags are about scoring **targets/weights** for a specific archetype (e.g., "is `ml_engineering_fluency` underweighted for Platform Engineer given how much AI-infra hiring exists"), which is a scoring-calibration question explicitly out of scope for this report — this report only edits `prompt` text (Section 2, low-risk) or flags gaps for a human to design (Sections 1 and 3, needs-human-review). Those target/weight flags are numerous (roughly 20-25 across the corpus) but are not tallied here since they require no wording action from this report.

---

## 1. Per-dimension anchor check (22 entries)

For each dimension: does real posting language corroborate the anchor text, or suggest a wording change? 21 of 22 dimensions are well corroborated as-written, several strikingly so (the anchor's own example vocabulary shows up nearly verbatim in postings). One dimension has a specific, repeated wording mismatch.

| # | Dimension | Verdict | Evidence |
|---|---|---|---|
| 1 | `ambiguity_tolerance` | No change | Forward Deployed Engineer's postings use "dynamic environment with evolving objectives" almost identically to Instacart/Cloudflare/Palantir/OpenAI phrasing (FDE evidence). Engineering Management's evidence explicitly contrasts real EM postings against the anchor-5 "define the problem yourself" framing and confirms EM does *not* match it (target=3) — the anchor's specific language is precise enough to draw that distinction correctly. |
| 2 | `interrupt_tolerance` | No change | Customer Support Engineer: "ticket/case-queue framing (multi-channel: chat, email, forums) is near-universal" — matches anchor-5's "arrives primarily via an inbound queue... a stream of unplanned demands" almost word for word. |
| 3 | `oncall_incident_appetite` | No change | Anchor-5's specific examples ("production outages, security breaches, or safety-critical field failures with organizational or legal visibility") are directly corroborated by SRE (on-call 54%, incident response 60%), Security Engineer (79 on-call, 240 incident-response mentions), and Embedded/IoT (76/148 "safety," field-failure framing). Note: Data Engineer and Embedded/IoT both flag that the literal phrase "on-call" is rare in raw JD text relative to the brief's target/weight — that is a target-calibration question, not an anchor-wording problem; the anchor's descriptive language holds up. |
| 4 | `debugging_diagnostic_depth` | No change | Anchor-5's "hardware, firmware, network, adversarial intent" failure-domain list is directly matched by Embedded/IoT ("root-cause/field-failure framing... pervasive") and CSE ("SQL, API/webhook debugging, log/trace analysis... under SLA"). |
| 5 | `systems_design_scale` | No change | Platform/Infrastructure Engineer: "architecture/architect language appears in 263/414 (~64%) and scalability language in 243/414" — matches anchor-5's "scale multiple orders of magnitude" framing directly; this is the archetype's single highest-weighted dimension per the evidence. |
| 6 | `technical_breadth_depth` | No change | Anchor-1's own example — "even if it requires formal study of a second discipline (e.g., EE/RF for embedded work)" — is directly confirmed by Embedded/IoT evidence: "frequent EE/CompE degree preference (63/148)... a second-discipline (EE) fluency requirement is clearly real." |
| 7 | `outcome_accountability` | No change | FDE: "own production rollouts," "own the account's technical success," "own end-to-end delivery outcomes" — matches anchor-5's "named owner of a KPI/SLO/production incident... even when upstream factors they don't control contribute" closely. |
| 8 | `stakeholder_client_comfort` | No change | Sales Engineer (Pre-Sales): communication/presentation skill named in 342/372 postings (92%) — the single most universal requirement in that corpus, strongly matching the dimension's premise. Platform/Infra Engineer's divergence note flags that the brief's "internal customer"/"platform as a product" *narrative* is thin in raw JD text — but that's a target/weight-calibration concern for that one archetype, not a problem with the anchor's own wording, which never uses that phrase. |
| 9 | `teaching_enjoyment` | No change | Anchor-5's "tutorials, workshops, onboarding material" matches DevRel's own vocabulary ("blog posts, written tutorials, sample repos") closely. |
| 10 | `public_visibility_comfort` | No change | Anchor-5's "conference talks, published content, active social/community presence" is matched almost 1:1 by DevRel's requirements ("public speaking 49/87, video 40/87, social-media presence 40/87"). |
| 11 | `account_portfolio_breadth` | No change | Sales Engineer: "territory/segment/portfolio framing is pervasive... zero postings framed as single-named-account coverage" matches anchor-5's "organizing unit of the job is the whole book" directly. |
| 12 | `relationship_continuity` | No change | Customer Support Solutions Engineer (TAM): "'Trusted advisor,' 'primary point of contact,' and renewal-cycle language throughout" matches anchor-5's "open-ended, indefinite relationship... building trust and continuity over time" directly. |
| 13 | **`variable_comp_appetite`** | **Suggest wording update** | See detail below. |
| 14 | `coding_intensity` | No change | Product/Full-Stack Engineer's entire sample is "hands-on IC engineering postings with explicit language/framework/stack requirements throughout" — squarely matches anchor-5. |
| 15 | `travel_embed_willingness` | No change | FDE: "273/424 mention travel (commonly 'up to 25%'), 291/424 use embed/on-site language... several require '5 days/week in-office'" matches the anchor's spread from "periodic travel for key moments" (anchor-3) to "on the road... majority of working weeks" (anchor-5). Several archetypes flag their *target* as possibly miscalibrated (Consulting Engineer, CSE/TAM, Embedded/IoT) but none flag the anchor's own descriptive language as wrong. |
| 16 | `adversarial_threat_modeling` | No change | Security Engineer: "223 of 586 postings (38%) explicitly reference threat modeling... plus 100 penetration-testing, 73 bug-bounty, 52 red-team" — matches anchor-5's "runs threat modeling... as a primary work product" almost verbatim, down to the term "threat modeling" itself. |
| 17 | `physical_constraint_engineering` | No change | Embedded/IoT: "bring-up via oscilloscope/logic analyzer/JTAG appears in roughly a third of postings" — matches anchor-5's named tools (oscilloscopes, logic analyzers, JTAG) exactly. |
| 18 | `ml_engineering_fluency` | No change | The self-rated 1/3/5 anchor language ("no hands-on experience" / "used ML APIs... or built a model" / "built, trained, deployed... production ML systems") remains accurate; ML Engineer's evidence confirms target=5/weight=1 is "fully supported" by definition. Many archetypes flag their own *target* as possibly too low given 2026's AI-hiring surge (Data Engineer, Platform/Infra Engineer, SRE, Security Engineer, EM, TPM, Solutions Architect (Consulting), Product/Full-Stack, DevRel) — that's a target-calibration question across many archetypes, not a defect in the anchor's own wording. |
| 19 | `mobile_platform_fluency` | No change | Mobile Engineer: Swift 108/212, Kotlin 121/212, React Native 52/212, Flutter 20/212 — anchor's generic "native or cross-platform mobile apps" framing holds regardless of which specific frameworks currently dominate. |
| 20 | `data_infrastructure_fluency` | No change | Data Engineer: "definitionally the core of nearly every posting... pipelines, warehouses, ETL/ELT" — matches anchor-5's "built and operated production data pipelines or warehouse infrastructure" directly. |
| 21 | `cloud_infrastructure_fluency` | No change | Platform/Infra Engineer: AWS 64%, Kubernetes 61%, Terraform 57% — matches anchor's "cloud resources or CI/CD" (anchor-3) through "cloud infrastructure or internal developer platforms" (anchor-5) spread well. |
| 22 | `people_management_orientation` | No change | Engineering Management: "hiring (485/803), coaching (369/803), performance management (103/803), and career development (153/803)" — anchor-5's own vocabulary ("hiring," "career development," near-paraphrase of "performance management") is drawn almost directly from this exact pattern. |

### Detail: `variable_comp_appetite` (dimension #13)

**Current anchors** reference a "billable-utilization percentage" as the archetype-defining example of structured variable pay (anchor-1: "a bonus tied to deal-closing or billable-hours performance"; anchor-3: "a modest bonus tied to a proxy like utilization or margin"; anchor-5: "meaningful upside/downside tied to quarterly deal attainment or a tracked billable-utilization percentage").

**Evidence this doesn't match current posting vocabulary:**
- `consulting-engineer-professional-services.json` divergence note #2: "the literal word 'utilization' appears in only 5 of 202 posting texts... postings talk far more often in terms of go-live dates, on-time/on-budget delivery... than they name billable-utilization percentages directly."
- `solutions-architect-vendor-side.json`: "0/57 postings use the word 'quota,' only 2/57 (Zip) state an explicit OTE figure" — and separately notes the *real* stated structure across the corpus is "OTE," not "utilization."
- `solutions-architect-consulting.json`: Contentful's posting states "OTE (includes base+commission): $102,000-$138,000" as a direct company-stated exception to the utilization-bonus framing the brief assumed.
- `customer-support-solutions-engineer.json` (TAM): Hightouch "TAM Enterprise: OTE $200K-$250K vs. base $160K-$200K" — again "OTE," not "utilization."
- `sales-engineer-pre-sales.json`: commission (76), OTE (54), quota (23) are the recurring literal terms across the highest-weight dimension in that archetype's whole scorecard.

Across every archetype where real, company-stated comp structure appears in the corpus, the observed vocabulary is **"OTE" and "commission"** (sales/account-facing roles) or plain **"base + bonus/equity"** (everyone else) — "billable utilization" as a literal phrase essentially never appears in live postings, even though it's a real internal PS-org metric. The anchors' use of "billable-utilization percentage" as the headline example for target=5 risks reading as dated/internal-industry jargon to an assessment-taker rather than the concrete, recognizable term ("OTE," "on-target earnings," "commission," "quota attainment") that real job postings actually use.

**Suggested change (NEEDS-HUMAN-REVIEW, not applied by this report):** broaden the anchor-3 and anchor-5 language to lead with OTE/commission/quota-attainment as the primary example, with utilization retained as a secondary example for the consulting-PS sub-case, e.g. anchor-5: "Actively wants meaningful upside/downside tied to OTE-style quota/commission attainment (or, in a consulting context, a tracked billable-utilization target); treats variable comp as a feature, not a risk." This is an anchor-text change and is out of scope for this report to apply directly.

---

## 2. Per-question wording check

Scanning all 40 `prompt` strings against corpus vocabulary, nearly all read as current and concrete — several (e.g. `q_adversarial_3`, `q_physical_1`/`q_physical_2`, `q_teaching_1`) already use language that shows up almost verbatim in the corpus (CTF/bug bounty, oscilloscope/JTAG, tutorial). One question has a clear, well-evidenced mismatch:

### `q_variable_comp_1` (dimension: `variable_comp_appetite`)

- **Current prompt:** "You're offered a role where 30% of your pay depends on hitting a quarterly number you don't fully control."
- **Suggested prompt:** "You're offered a role where a meaningful slice of your target pay is OTE — On-Target Earnings tied to hitting a quota or deal number you don't fully control."
- **Reason:** Same evidence as the `variable_comp_appetite` anchor finding above (Section 1) — real postings overwhelmingly describe this structure using "OTE," "commission," and "quota," not a generic "quarterly number." Using the term a real candidate would recognize from an actual job posting makes the scenario more concrete without changing what it's asking. This is a `prompt`-text-only change; `options[].value` (1/3/5) and `format` (`scenario_choice`) are untouched.

No other question prompt showed a comparably specific, well-evidenced mismatch against the corpus. Per the task's guidance, this is treated as the expected outcome rather than a gap in the review — the taxonomy's question wording has evidently already absorbed most of the corpus's concrete vocabulary (v1.3's `q_adversarial_3` rewrite is a good example of this already having happened once).

---

## 3. Coverage gap check

Two candidate gaps surfaced with strong, repeated evidence. Both are flagged for human judgment on whether/how to incorporate them — no new dimension or question is proposed here.

### Gap 1: AI-coding-assistant / agentic-dev-tool workflow fluency

No current dimension measures a candidate's comfort/fluency using AI coding assistants (Copilot, Cursor, Claude Code, agentic dev tooling) as a normal, expected part of the daily engineering workflow. This is distinct from `ml_engineering_fluency`, whose definition is specifically about building/training/deploying ML systems, not about using AI tools as part of one's own coding process — and the evidence in the corpus is explicit that these are different things (e.g. Mobile Engineer's evidence separates "AI as a product feature the app surfaces" from "AI coding tools as the engineer's own workflow," and finds only the latter is the relevant, rarer signal).

- `product-full-stack-software-engineer.json`: "AI-assisted development / agentic tooling fluency (Copilot, Cursor, Claude Code, 'AI-SDLC', vibe coding)... combined AI-workflow + agentic-feature signal appears in roughly 100-140/400 (25-35%) postings" — named as a top-10 requirement, not incidental.
- `mobile-engineer.json`: "31 of 212 postings named this specifically" as an explicit engineering-workflow requirement (separate from the 146/212 that mention AI only as a product feature); flagged as "a 2025-2026-era addition that older mobile-engineer job description templates would not reflect."
- `data-engineer.json`: "AI-assisted coding, agentic pipeline components... shows up as an explicit, common responsibility line, not a one-off," in 408/525 (~78%) postings referencing AI/ML language broadly.
- `ml-engineer.json`: "60% mention LLMs, 49% mention agents/agentic workflows... this is now the majority pattern, not... an emerging trend."

This shows up independently across at least four archetype corpora as a distinct, repeated pattern, not a one-off mention, which is why it clears the bar for reporting despite the instruction to keep this section rare.

### Gap 2: Government / federal security-clearance eligibility

No current dimension captures willingness/eligibility to work in a government-clearance-gated role (US Person status, active Secret/TS clearance, ITAR/export-control eligibility). This is arguably not well-suited to the taxonomy's 1-5 self-rated trait format at all (it's closer to a binary legal-eligibility fact than a preference or skill spectrum) — flagging it as a gap worth a deliberate decision, not necessarily a new dimension.

- `forward-deployed-engineer.json`: "177/424 postings (42%) reference government/federal/public-sector/clearance/defense terms" — the single largest sub-track identified in that archetype's corpus, which the existing brief treats as a "possible v2 refinement" rather than an already-mature, parallel commercial/defense split.
- `embedded-iot-engineer.json`: "28/148 mention 'U.S. Person' status and 24/148 mention security clearance explicitly," concentrated at Anduril/RTX/Boeing/GE Aerospace but also appearing at some consumer-adjacent companies due to export-control/dual-use policy.
- `security-engineer.json`: "64 of 586 (~11%)... concentrated almost entirely at defense/gov contractors" and shown to pay meaningfully differently (Palantir's government-facing role priced $90K-$150K vs. $135K-$200K for the equivalent commercial-track role at the same company).
- `solutions-architect-consulting.json`: GDIT's federal-SI subset (19/103 postings) requires "active US government security clearance (Secret/TS, US citizenship required)" and reads as functionally a different archetype (hands-on delivery, no RFP/pre-sales/utilization language) from the rest of the corpus.

---

## 4. Risk classification

| # | Section | Item | Classification |
|---|---|---|---|
| 1 | 1 | `variable_comp_appetite` anchor wording (OTE/commission vs. "billable-utilization") | **NEEDS-HUMAN-REVIEW** — touches `taxonomy/dimensions.json` `anchors` field, which is scoring-calibration-adjacent even though it's "just text" |
| 2 | 2 | `q_variable_comp_1` prompt rewrite | **LOW-RISK** — `prompt` string only; `format`, `options[].value`, `dimension` untouched |
| 3 | 3 | Gap: AI-coding-assistant/agentic-tool workflow fluency not captured by any dimension | **NEEDS-HUMAN-REVIEW** — would require a new dimension/question if acted on |
| 4 | 3 | Gap: government/federal security-clearance eligibility not captured by any dimension | **NEEDS-HUMAN-REVIEW** — would require a new dimension/question (or a decision that it doesn't belong in this taxonomy) if acted on |

**Totals: 1 LOW-RISK, 3 NEEDS-HUMAN-REVIEW (4 suggestions total).**

The low count reflects the underlying finding, not under-effort: the 22-dimension taxonomy and 40-question set are, on the whole, strongly corroborated by the fresh 18-archetype job-postings corpus — several anchors and questions use language that shows up nearly verbatim in real 2026 postings. The one repeated, well-evidenced wording issue (variable-comp vocabulary) and two repeated coverage gaps (AI-tool-workflow fluency, government-clearance eligibility) are the only findings that cleared the bar for "specific, repeated, evidence-backed" rather than a one-off `supports_current_scoring: false` flag about a single archetype's target/weight.

---

## LOW-RISK-ONLY summary

| question id | current prompt | suggested prompt | one-line reason |
|---|---|---|---|
| `q_variable_comp_1` | "You're offered a role where 30% of your pay depends on hitting a quarterly number you don't fully control." | "You're offered a role where a meaningful slice of your target pay is OTE — On-Target Earnings tied to hitting a quota or deal number you don't fully control." | Real postings overwhelmingly use "OTE"/"commission"/"quota" vocabulary (sales-engineer-pre-sales, solutions-architect-consulting/vendor-side, customer-support-solutions-engineer evidence); "a quarterly number" is generic where a concrete, recognizable term exists. |
