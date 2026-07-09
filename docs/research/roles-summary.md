# Phase 1 Deliverable: Validated v1 Archetype List

This is the cross-reviewed, validated set of engineering role archetypes for CareerGuru v1, per
`PLAN.md`'s Phase 1 deliverable spec. It records the final archetype list, per-archetype in/out
rationale and confidence, the deliberate splits made during research, and the archetypes
considered but excluded from v1. Additions after this point go to the v2 backlog per PLAN.md's
"Done when" criteria for this phase.

**Cross-review pass performed:** 2026-07-09, single reviewer (autonomous), per the process
PLAN.md specifies ("a separate agent audits all briefs for stereotype-vs-evidence... and for
overlap/gaps between archetypes"). Scope of this pass: resolve known duplicates, skim all briefs
for uncited claims/overlap/thinness, and produce this summary. Not a full re-verification of every
citation in every brief — see "Audit method and limits" at the end of this document.

---

## Final v1 archetype list (18 archetypes)

| # | Archetype | One-line description | Filename | Confidence |
|---|---|---|---|---|
| 1 | Product / Full-Stack Software Engineer | The generalist SWE archetype (frontend-lean, backend-lean, or true generalist) building product features on a standard IC ladder. | `product-full-stack-software-engineer.md` | Well-sourced. Deliberately merges frontend/backend/generalist into one archetype with sub-variant notes rather than splitting (see Deliberate merges below); flagged as revisitable in Phase 2 if trait data disagrees. |
| 2 | Platform / Infrastructure Engineer | Builds and operates the internal platforms (CI/CD, cloud infra, developer tooling) other engineers depend on. | `platform-infrastructure-engineer.md` | Well-sourced, expert-authored per its own status line. |
| 3 | SRE / Production Engineer | Owns production reliability, on-call, and incident response for live systems, with an error-budget/SLO-driven success model. | `sre-production-engineer.md` | Well-sourced, expert-authored per its own status line. |
| 4 | Data Engineer | Builds and operates data pipelines, warehouses, and the infrastructure that feeds analytics/ML consumers. | `data-engineer.md` | Well-sourced (75 citation markers, longest non-ML brief); explicitly distinguished from ML Engineer at the feature-pipeline boundary. |
| 5 | ML Engineer | Builds and productionizes ML systems — the majority of the job is data pipelines, APIs, monitoring, and production hardening, not model tuning. | `ml-engineer.md` | Strongest-sourced brief in the corpus (111 citation markers, 570 lines, cross-checks its own statistics across multiple surveys). Explicitly excludes Research/Applied Scientist as out of scope (see Excluded below). |
| 6 | Mobile Engineer (iOS / Android) | Builds native or cross-platform mobile apps; deliberately kept as one archetype with platform as a skill-dimension, not a split. | `mobile-engineer.md` | Medium-high confidence per its own header. Below the ≥15-posting target (9 sourced) — thinner posting breadth than most peers, though citation quality is high and gaps are candidly self-flagged. |
| 7 | Embedded / IoT Engineer | Firmware/embedded software engineering across consumer IoT, industrial, automotive, and medical-device contexts, with hardware-constrained success criteria. | `embedded-iot-engineer.md` | Medium confidence per its own header — fewer high-authority practitioner sources than its Mobile sibling (leans on one Medium author for several claims), below the ≥15-posting target (9 sourced). Flagged for beta validation. |
| 8 | Security Engineer | Builds and operates an org's security posture — proactive defense, incident response, risk/compliance — not primarily offensive/hacking work. | `security-engineer.md` | Well-sourced, expert-authored per its own status line. |
| 9 | Sales Engineer / Pre-Sales Engineer | Technical seller: runs live discovery, POCs, and technical objection-handling pre-sale, compensated with sales-attainment-linked variable pay. | `sales-engineer-pre-sales.md` | Solidly sourced; explicitly documents the "Solutions Engineer" naming collision with both the vendor-side SA and Customer Solutions Engineer archetypes (see Naming ambiguity below). |
| 10 | Solutions Architect (Vendor-Side) | Deep, single-product-stack technical advisor employed by a software vendor (e.g., AWS, Salesforce, Google Cloud), pre-sales through implementation guidance. | `solutions-architect-vendor-side.md` | Solidly sourced. |
| 11 | Solutions Architect (Consulting-Side) | Multi-vendor/multi-platform technical architect employed by a systems integrator or consultancy (Accenture, Deloitte, Slalom, etc.), utilization-comped, spanning bid work through delivery oversight. | `solutions-architect-consulting.md` | Well-sourced (87 citation markers post-merge, 19 numbered sources) — the deepest-sourced brief in the Pre-Sales/Client-Facing cluster. This is the merged/surviving file from the duplicate resolution described below. |
| 12 | Forward-Deployed Engineer (FDE) | Embeds long-term with one strategic account, writes and owns production code that ships into the customer's environment — closer to "senior SWE with high client-embed tolerance" than to a Solutions Architect or Sales Engineer. | `forward-deployed-engineer.md` | Solidly sourced; clearly differentiated from Solutions Architect (coding-intensity and ownership axis) and from Sales Engineer (comp structure) with citations. |
| 13 | Customer Support Engineer | Reactive, ticket/SLA-driven, post-sales technical support — the interrupt-driven pole of the customer-facing-engineering spectrum. | `customer-support-engineer.md` | Well-sourced (54 citation markers). |
| 14 | Customer Success Engineer / Customer Solutions Engineer | Proactive, account-embedded technical role owning a named book of accounts through onboarding and ongoing technical health — the scheduled/relationship-driven pole. | `customer-support-solutions-engineer.md` | Thinner citation density than its Support Engineer sibling (10 markers vs. 54) but the split rationale itself is rigorously argued and cross-referenced. Flagged for beta validation on citation depth, not on the split decision. Note: filename says "solutions-engineer," in-document title says "Customer Success Engineer / Customer Solutions Engineer" — a naming inconsistency worth resolving before this becomes a public-facing archetype name (see Naming ambiguity below). |
| 15 | Consulting Engineer / Professional Services Engineer | Billable, SOW-scoped, hands-on implementation/delivery work (configuration, integration, custom scripting) across vendor-PS orgs and systems integrators — implementation-led, distinct from the design-led Solutions Architect. | `consulting-engineer-professional-services.md` | Well-sourced (59 citation markers); explicitly scopes itself against both Solutions Architect and FDE. |
| 16 | Developer Relations / Developer Advocacy | Builds developer trust and adoption through content, community, and feedback loops into product — external-facing technical role without a sales quota. | `developer-relations-advocacy.md` | Well-sourced (48 citation markers). |
| 17 | Engineering Management (Track) | People-management track for engineers — team delivery and people outcomes replace personal technical output as the success metric; explicitly "technical-adjacent," not "technical." | `engineering-management.md` | Well-sourced (30 citation markers); boundary case, included (see below). |
| 18 | Technical Product Manager | PM role scoped to technical/infrastructure products (APIs, SDKs, platforms) where reading code and making architecture trade-off calls is a daily requirement; explicitly not "still coding." | `technical-product-manager.md` | Well-sourced (32 citation markers); boundary case, included (see below). |

**Total: 18 archetypes** (19 briefs existed before this cross-review pass; one duplicate pair was
merged into a single brief — see below).

---

## Duplicate resolution

`solutions-architect-consulting.md` and `solutions-architect-consulting-side.md` were both
independently-authored briefs covering the same archetype (consulting-side Solutions Architect).

**Verification of the self-assessment claim:** one author's self-assessment claimed
`solutions-architect-consulting.md` had 18 sources and deeper AWS ProServe hybrid-case analysis.
Verified directly by reading both files in full:
- `solutions-architect-consulting.md` (29,595 bytes): 18 numbered sources, a dedicated Section 8
  comparison table against both the vendor-side SA and FDE archetypes, an explicit AWS
  Professional Services hybrid-case analysis (SA employed by a vendor but operating in a
  consulting-style engagement model), and granular per-claim confidence caveats throughout.
- `solutions-architect-consulting-side.md` (14,474 bytes): ~15 unique inline-linked sources, no
  dedicated hybrid-case section, comparatively less caveat discipline.

The claim was accurate. **Kept `solutions-architect-consulting.md`; deleted
`solutions-architect-consulting-side.md`** after merging in its genuinely additive content:
- The Thoughtworks "SAs still code" evidence (a primary-source job-requirement counter-example to
  the "SAs don't build" stereotype) — folded into the keeper's misconceptions section.
- Additional entry-path patterns (lateral hire from single-platform IC roles, lateral hire from
  vendor-side SA/SE) and five additional (caveated, pattern-level, not statistically quantified)
  exit-path claims — folded into the keeper's Sections 5–6.
- A wider Glassdoor Accenture comp band and a cross-firm Glassdoor aggregate — folded into the
  keeper's comp section, **flagged as an unresolved ~$100K+ discrepancy at the top end against the
  keeper's existing Levels.fyi Accenture figures**, rather than silently averaged. This needs a
  reconciliation decision (e.g., treat Levels.fyi as primary since it's level-segmented) before
  Phase 2 dimension-weighting locks in a comp figure for this archetype.
- The discarded file's question about whether this archetype overlaps with Consulting
  Engineer/Professional Services — resolved in the keeper's Open Questions: no overlap problem,
  the two are a legitimate design-led vs. implementation-led split (see Deliberate splits below).

The merge is documented inline in `solutions-architect-consulting.md`'s Open Questions section
(source [19] and a dated merge note) so the provenance of the merged content is traceable.

**Other filenames checked for near-duplication:** skimmed all 18 remaining filenames and opening
sections; no other duplicate or near-duplicate scope found. The two pairs that looked
duplicate-shaped at a glance were checked in detail and confirmed to be deliberate, evidence-based
splits, not duplicates — see next section.

---

## Deliberate splits made during research

### 1. Customer Support Engineer vs. Customer Success/Solutions Engineer

Verified as a genuine, evidence-based split, not a duplicate. Both briefs explicitly
cross-reference each other and state the split rationale: the two poles differ on cadence
(reactive/interrupt-driven vs. proactive/scheduled), unit of ownership (ticket queue vs. named
account book), on-call burden (standard vs. rare), and the skill that differentiates top
performers (debugging speed under pressure vs. relationship/enablement design). The
`customer-support-solutions-engineer.md` brief explicitly maps this to Phase 2's planned trait
dimensions (interrupt-driven-vs-deep-work; ownership-of-outcome-vs-ownership-of-system) as the
operative test for whether to split or merge — this is a substantive taxonomy justification, not
title-matching. Both briefs also explicitly note that some companies blend the two roles in one
job posting (e.g., Cloudflare's "Customer Success Engineer – Network Services"), and both treat
that as evidence of a blended *job*, not evidence the underlying *archetypes* are the same.
**Conclusion: split stands.**

### 2. Solutions Architect: vendor-side vs. consulting-side vs. Forward-Deployed Engineer

Verified as a three-way, evidence-based split. Vendor-side vs. consulting-side is differentiated
primarily by platform breadth-vs-depth and employer/engagement model, with the AWS Professional
Services case explicitly documented as a porous hybrid boundary (vendor-employed but
consulting-style engagement) rather than pretending the line is clean. Consulting-side SA vs. FDE
is differentiated with the most quantified evidence in this cluster: coding as 70-90% of an FDE's
week vs. "not the bulk of the job" for an SA, deliverable ownership (design handoff vs. owning
production), and engagement pattern (portfolio of concurrent clients vs. one deep long-term
embed). **Conclusion: three-way split stands**, though the FDE comparison leans on one secondary
comparison article for its most-quantified claims (coding %, comp bands) — flagged in the source
brief as needing a second independent source, not a reason to re-merge.

---

## Archetypes considered but excluded from v1

- **Research / Applied Scientist** (ML cluster). Explicitly and deliberately excluded — not just
  omitted — from `ml-engineer.md`. Rationale, sourced: it's a PhD-gated, publication-oriented role
  concentrated in large-org data science teams (>50 people), out of scope for a
  software-engineer-facing taxonomy; a cited 2017 Kaggle survey of 16,000 ML practitioners found
  only 15.6% held a PhD, reinforcing that PhD-gated research roles are a minority slice of the
  broader ML labor market this product targets. **Recommendation: leave excluded for v1; revisit
  only if user research surfaces meaningful demand from a PhD-holding segment.**
- **Data Scientist / Data Analyst.** Named explicitly in `ml-engineer.md` as a boundary/adjacent
  role, excluded from that brief and not present anywhere else in the 18-archetype set either.
  This was not written up as its own brief and there's no evidence a brief was ever planned for
  it in PLAN.md's initial candidate list — flagging as a genuine v1 gap (not a "considered and
  rejected" case) for the human to decide on explicitly: was Data Scientist/Analyst intentionally
  out of scope for this product (its target audience is software engineers, and DS/DA is often
  entered from non-SWE backgrounds), or is it a miss that should go on the v2 backlog?
- **Technical Account Manager (TAM).** Considered as a boundary case in
  `customer-support-solutions-engineer.md` and folded in as a synonym/overlapping title under the
  Customer Success/Solutions Engineer archetype rather than split into its own brief, on the
  grounds that no evidence of a consistently distinct TAM archetype (vs. CSE) was found.
  **Recommendation: fine as-is for v1; revisit if beta users with a TAM title report the CSE brief
  doesn't fit.**
- **General (non-technical) Product Manager.** Implicitly excluded — `technical-product-manager.md`
  explicitly scopes only the technical/infrastructure-product end of the PM spectrum, on the
  grounds that this product's audience is software engineers deciding whether to leave IC work,
  and generalist PM is a much bigger leap with less technical throughline. Not written up as a
  separate excluded-boundary-case discussion the way EM and TPM were, but the exclusion logic is
  present in the TPM brief's in/out rationale.
- **Frontend-lean / Backend-lean / True-generalist SWE as separate archetypes.** Not an exclusion
  of a candidate archetype so much as a deliberate *non-split* — see Deliberate merges below.

## Deliberate merges (kept as one archetype rather than split)

- **Product/Full-Stack SWE**: frontend-lean, backend-lean, and true-generalist were evaluated and
  kept as one archetype with sub-variant notes, on the grounds that the temperament/incentive
  profile (client-facing comfort, ambiguity tolerance, deep-work-vs-interrupt) is stack-agnostic —
  what differs is a skill-dimension question for Phase 2, not an archetype-defining one. The brief
  explicitly flags this as revisitable if Phase 2 trait-dimension work finds sharp temperament
  divergence between frontend-lean and backend-lean engineers.
- **Mobile Engineer**: iOS and Android kept as one archetype (platform as a skill-dimension
  flag, not a split), on similar temperament-profile-is-shared grounds, with cross-platform
  framework adoption (Flutter/React Native/KMP) cited as further evidence the line is blurring in
  the market itself. Also explicitly flagged as revisitable in v2 if trait data disagrees.
- **Embedded/IoT Engineer**: explicitly mirrors the Mobile brief's reasoning — RTOS/bare-metal,
  embedded Linux, wireless/connectivity, and safety-critical sub-domains kept as one archetype
  with domain variation noted inline rather than split out.
- **ML Engineer / MLOps Engineer / ML Platform Engineer**: merged into one archetype brief on the
  grounds that title usage is genuinely inconsistent across companies and MLE isn't even a
  separately-leveled track at several major companies (it's a focus-tag on the general SWE
  ladder). The brief notes real center-of-gravity differences exist at companies precise enough to
  distinguish them, and recommends Phase 2 encode "production/infra-heavy vs. modeling-heavy" as a
  scoring sub-dimension rather than a separate archetype — explicitly revisitable in v2 if beta
  feedback from ML-platform-heavy users shows the merged brief doesn't describe their day-to-day.

---

## Naming ambiguity flagged (not a merge issue, but a copy/UX issue for later phases)

"Solutions Engineer" is used as a synonym for **three different archetypes** across this corpus,
each confirmed by its own brief:
1. Pre-sales Sales Engineer (`sales-engineer-pre-sales.md` — explicit Naming Note: "Sales
   Engineer" and "Solutions Engineer" are the same job at most B2B software companies, title is a
   company-culture choice).
2. Vendor-side Solutions Architect (`solutions-architect-vendor-side.md` — "Solutions Engineer" at
   other vendors used interchangeably with SA instead of with SE).
3. Customer Solutions Engineer (`customer-support-solutions-engineer.md` — the proactive,
   account-embedded post-sales role).

This is a real, evidence-documented ambiguity in industry title usage, not an error in the
research. **Recommendation for Phase 3/4:** do not use "Solutions Engineer" as a bare archetype
name anywhere in assessment copy or result pages without a qualifier — always pair it with
pre-sales/vendor-side/customer-facing framing so users can tell which archetype is meant.
Separately, `customer-support-solutions-engineer.md`'s filename doesn't match its own in-document
title ("Customer Success Engineer / Customer Solutions Engineer") — cosmetic, but worth a filename
rename before this archetype gets a public-facing slug.

---

## Quality concerns to flag before beta trial

1. **Two briefs are below the PLAN.md sourcing target.** PLAN.md's Phase 1 task spec asks for
   "≥15 real job descriptions across company sizes" per archetype. Mobile Engineer (9 sourced) and
   Embedded/IoT Engineer (9 sourced) both fall short and both self-flag this in their own Open
   Questions sections. Neither brief is *badly* sourced — citation quality is good, gaps are
   candidly acknowledged — but both are the thinnest in the corpus by posting-count and would
   benefit from a follow-up sourcing pass before being treated as equally solid as, e.g., ML
   Engineer or Data Engineer.
2. **Unresolved comp discrepancy in the merged Solutions Architect (Consulting-side) brief.** The
   duplicate-merge introduced a ~$100K+ top-end discrepancy between two Accenture comp sources
   (Levels.fyi vs. Glassdoor) that was not reconciled — flagged explicitly in that brief's Open
   Questions for whoever owns Phase 2 dimension-weighting.
3. **Data Scientist / Data Analyst gap.** As noted above, this adjacent role is mentioned only as
   an exclusion-boundary inside the ML Engineer brief, with no explicit "considered and rejected"
   writeup of its own the way EM and TPM got. Worth a deliberate yes/no decision from the human
   rather than leaving it as an implicit gap.
4. **Customer Success/Solutions Engineer brief is comparatively thin on citation density** (10
   citation markers vs. 54 in its Support Engineer sibling), despite the split rationale itself
   being well-argued. The content that's there is fine; there's just less of it. Flag for a
   citation-depth pass before or during beta.
5. **No uncited stereotype-style trait claims were found** in this pass across all 18 briefs
   (spot-checked misconceptions/day-to-day sections in ~9 briefs directly, skimmed structure and
   citation density across all 18). This is a real finding, not a skipped check — the corpus's
   citation discipline is consistently strong, and several briefs (ML Engineer, Solutions Architect
   Consulting-side, Consulting Engineer/PS) go well beyond the minimum bar by cross-checking their
   own statistics against multiple sources and flagging single-sourced claims explicitly.

---

## Phase 2 resolution of open items (2026-07-09)

Per `docs/HANDOFF.md`'s explicit instruction to resolve open items autonomously rather than block on
human input, here are the decisions made at the start of Phase 2, with reasoning:

1. **Mobile Engineer / Embedded-IoT Engineer under-sourcing (9 postings each vs. ≥15 target).**
   **Decision: proceed without a follow-up sourcing pass; flag both as lower-confidence in the
   Phase 2 archetype × dimension matrix rather than delay Phase 2/3/5.** Rationale: PLAN.md itself
   offered this as one of two acceptable resolutions ("proceed and flag them as lower-confidence").
   Given the scale of remaining work (Phases 2, 3, and 5 in one unattended run), a sourcing pass
   would consume time better spent on the taxonomy and product build, and both briefs already
   candidly self-flag the gap with good citation *quality* despite thinner *breadth*. In
   `/taxonomy/archetypes.json`, both archetypes carry `"confidence": "medium"` (vs. `"high"` for
   well-sourced peers) as the concrete mechanism for this flag — this is the hook a v1.1/beta pass
   should use to decide whether these two need dedicated re-sourcing before wider launch.
2. **Solutions Architect (Consulting-side) comp discrepancy.** **Resolved** — see the reconciliation
   note added directly to `docs/research/roles/solutions-architect-consulting.md`'s Open Questions
   section: Levels.fyi (level-segmented) is used as the primary comp anchor; the wider Glassdoor
   aggregate is retained as market-spread context, not treated as a conflicting figure.
3. **Data Scientist / Data Analyst — in or out of v1.** **Decision: OUT of v1, added to the v2
   backlog.** Rationale: this product's audience is software engineers evaluating adjacent
   engineering role archetypes (per PLAN.md's core thesis); Data Scientist/Analyst is frequently
   entered from non-SWE backgrounds (statistics, quantitative social science, bootcamp-adjacent
   analytics tracks) rather than being a lateral move *from* a software engineering base the way
   all 18 v1 archetypes are, which breaks the product's framing device of "here's where your SWE
   skills and temperament could take you." This mirrors the exact logic already used to exclude
   Research/Applied Scientist from the ML cluster (PhD-gated, non-SWE-entry population) — treating
   both exclusions consistently rather than deciding this one differently on no stated grounds.
   This is a genuine v1 scope decision, not a "no evidence found" gap: it should be revisited in v2
   if user research surfaces meaningful demand from engineers seriously considering a DS/DA pivot.

## Audit method and limits

Per PLAN.md's cross-review task and this task's explicit time-boxing instruction, this pass did
**not** re-verify every citation in every brief (e.g., did not re-fetch every linked URL to
confirm it says what the brief claims). It did: read both duplicate SA briefs in full; read the
two split-decision brief pairs in full; read both boundary-case briefs (EM, TPM) in full; read the
two shortest briefs (Mobile, Embedded) in full; read misconceptions/claims sections of 5 more
briefs (Sales Engineer, FDE, Vendor SA, DevRel, Security) in detail; and did a structural skim
(headers, citation-marker density, self-reported confidence/status lines) of all 18 files, plus a
targeted grep pass across all files for stereotype-shaped language lacking an adjacent citation
marker (no genuine hits — see Quality concerns #5). This is consistent with a "light audit," not a
full independent re-verification, and is documented here so the human knows exactly what was and
wasn't checked before trialing this taxonomy.
