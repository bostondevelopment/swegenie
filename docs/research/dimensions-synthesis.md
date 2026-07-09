# Trait Dimensions — Synthesis (Phase 2)

**Status:** Final v1.0 dimension set, synthesized from five parallel cluster drafts.
**Input drafts:** `dimensions-draft-swe-infra.md`, `dimensions-draft-mobile-embedded-security.md`,
`dimensions-draft-sales-sa-fde.md`, `dimensions-draft-support-cs-devrel.md`,
`dimensions-draft-em-tpm.md` — together proposing ~40 candidate dimensions (with heavy overlap)
across all 18 archetypes.
**Output:** `/taxonomy/dimensions.json` — 16 final dimensions (6 skill, 10 preference).

This document explains what got merged into what, what got dropped and why, and flags the
dimensions least confident enough to warrant stress-testing in the Phase 2 persona-validation step.

---

## Final list (16)

| id | name | category | primary source clusters |
|---|---|---|---|
| `ambiguity_tolerance` | Ambiguity Tolerance | preference | swe-infra, sales-sa-fde, support-cs-devrel, em-tpm, mobile-embedded-security |
| `interrupt_tolerance` | Interrupt Tolerance | preference | swe-infra, support-cs-devrel |
| `oncall_incident_appetite` | On-Call / Incident Appetite | preference | swe-infra, mobile-embedded-security, support-cs-devrel |
| `debugging_diagnostic_depth` | Debugging / Diagnostic Depth | skill | support-cs-devrel, mobile-embedded-security, swe-infra |
| `systems_design_scale` | Systems Design at Scale | skill | swe-infra |
| `technical_breadth_depth` | Technical Breadth vs. Depth | skill | swe-infra, sales-sa-fde, mobile-embedded-security |
| `outcome_accountability` | Outcome Accountability | preference | swe-infra, sales-sa-fde |
| `stakeholder_client_comfort` | Stakeholder & Client-Facing Comfort | preference | swe-infra, sales-sa-fde |
| `teaching_enjoyment` | Teaching & Public Visibility | preference | support-cs-devrel |
| `account_relationship_ownership` | Account & Relationship Ownership | preference | support-cs-devrel, sales-sa-fde |
| `variable_comp_appetite` | Variable Compensation Appetite | preference | sales-sa-fde, support-cs-devrel |
| `coding_intensity` | Coding Intensity | skill | sales-sa-fde, em-tpm |
| `travel_embed_willingness` | Travel / Physical Embed Willingness | preference | sales-sa-fde |
| `adversarial_threat_modeling` | Adversarial / Threat-Model Thinking | skill | mobile-embedded-security |
| `physical_constraint_engineering` | Physical Constraint Engineering | skill | mobile-embedded-security |
| `people_management_orientation` | People-Outcome Management Orientation | preference | em-tpm |

---

## Merge decisions (what became what, and why)

**`ambiguity_tolerance`** absorbed five near-duplicate proposals: swe-infra #3 ("requirements
clarity preference"), sales-sa-fde #9 ("own-scope-definition comfort"), support-cs-devrel #7
("comfort with ambiguous/unstandardized success metrics"), em-tpm #4 ("roadmap/prioritization
ownership under ambiguity"), and mobile-embedded-security #2 ("root-cause ambiguity tolerance," the
diagnostic-tolerance half only — the diagnostic-skill half went to `debugging_diagnostic_depth`,
see below). All five are the same underlying trait — comfort when the problem, scope, or success
metric itself is undefined — expressed in different archetype vocabularies (a TPM's undefined
roadmap and an SRE's undefined root cause are the same tolerance under different content). Kept the
sales-sa-fde draft's cleanest three-point anchor language as the base and folded in the metric-
ambiguity and roadmap-ownership facets from the other drafts.

**`interrupt_tolerance`** merged swe-infra #1 and support-cs-devrel #1, which were near-identical
proposals (daytime attention fragmentation / plannable vs. unplannable work cadence) from two
different clusters using almost the same evidence structure (SRE pager load vs. Support Engineer
ticket queue, DevRel's fully scheduled calendar as the low anchor in both).

**`oncall_incident_appetite`** merged swe-infra #2 ("on-call/pager tolerance"), mobile-embedded-
security #8 ("incident/on-call response appetite, adversarial vs. accidental framing"), and the
incident-response-under-pressure half of support-cs-devrel #2. All three describe the same off-hours-
paging/live-incident trait; the mobile-embedded-security draft's contribution was to generalize the
top anchor beyond "production outage" to include security breaches and safety-critical field
failures, which is preserved in the final anchor language. Kept explicitly separate from
`interrupt_tolerance` per the swe-infra draft's own recommendation — a person can love an adrenaline-
fueled page while hating routine daytime interruptions, or vice versa.

**`debugging_diagnostic_depth`** is a new synthesis-level dimension: it pulls the *skill* half out of
support-cs-devrel #2 ("debugging/technical-troubleshooting depth under pressure") and
mobile-embedded-security #2 ("root-cause ambiguity tolerance"), which had been drafted as two
different things (a support-ticket-triage skill and a hardware/software root-cause-ambiguity
tolerance) but are the same underlying capability — fast, cross-layer diagnosis under time pressure —
once you strip out the *tolerance* framing (which went to `ambiguity_tolerance`/`oncall_incident_
appetite`) and keep the *capability* framing. This is a skill dimension (can they do it) that
complements the preference dimensions above (do they want to).

**`technical_breadth_depth`** merged swe-infra #5 ("tech-stack breadth vs. depth"), sales-sa-fde #4
("platform breadth vs. depth"), and folded in mobile-embedded-security #6 ("cross-domain fluency
requirement") as an anchor-level detail rather than a separate dimension — #6's "second formal
discipline" case (EE/RF for Embedded) is treated as the extreme end of depth-specialization rather
than a distinct axis, since the underlying question ("how many different things does this person
need working fluency in") is the same shape whether the "things" are software layers, vendor
platforms, or a formal second discipline.

**`outcome_accountability`** merged swe-infra #7 ("ownership-of-outcome vs. ownership-of-system"),
sales-sa-fde #6 ("ownership-of-design vs. ownership-of-production-outcome"), and folded in two
smaller proposals: sales-sa-fde #7 ("deal-cycle vs. delivery-cycle orientation" — timing-in-lifecycle
is now one clause in the definition/anchors rather than a standalone dimension, since the sales-sa-fde
draft's own synthesis note observed these two are correlated though not identical, and the marginal
signal beyond outcome-accountability didn't clear the bar for a 17th dimension) and swe-infra #6
("infra/systems orientation vs. product/business orientation" — folded in as the "motivated by craft
vs. motivated by business outcome" facet of the same anchor scale, since in the source evidence the
two co-vary tightly: SRE/Platform score low on both system-ownership-ends-at-handoff *and*
craft-motivation, while Product SWE/FDE score high on both production-ownership *and*
business-outcome motivation).

**`stakeholder_client_comfort`** merged swe-infra #9 ("cross-team stakeholder/consulting comfort,"
internal-facing) with sales-sa-fde #10 ("client-facing comfort / communication register range,"
external-facing). These were drafted separately because one cluster is internal-facing
(Platform/SRE serving other engineers) and the other is external-facing (SE/SA/FDE serving clients),
but the underlying trait — comfort being evaluated the way a vendor is evaluated by whoever the
"customer" is, and range of communication register — is the same mechanism regardless of whether the
customer sits inside or outside the company. The swe-infra draft's own synthesis note flagged this
dimension (its #9) as overlapping with its #6 (infra/product orientation, now folded into
`outcome_accountability`) but argued for keeping #9 distinct because a platform engineer can be
highly infra-motivated yet still need high stakeholder comfort — that argument is preserved: this
dimension is now a clean "comfort serving whoever the customer/stakeholder is" axis, independent of
`outcome_accountability`'s "what motivates you" axis.

**`teaching_enjoyment`** (final name: "Teaching & Public Visibility") merged support-cs-devrel #5
("teaching/explaining enjoyment") and #4 ("public-facing/community-visibility comfort"). These were
drafted as two dimensions because the source cluster's four archetypes separate cleanly into
"private teaching" (Support/CSE/Consulting Engineer workshops) and "public teaching" (DevRel talks/
content), and the drafting agent flagged public-visibility as likely to recur in other client-facing
clusters. In practice, no source evidence anywhere in the five drafts describes *public* visibility
work that isn't fundamentally *teaching* content (conference talks, tutorials, docs are all teaching
artifacts, just broadcast rather than 1:1) — so rather than keep two dimensions that are 90% the
same underlying enjoyment with a broadcast-vs-private modifier, they're merged into one dimension
whose anchor scale runs from "no teaching" (1) through "private teaching to one account" (3) to
"public teaching as the core, evaluated job function" (5). This was a budget-driven merge (see
"Cuts" below) — flagged as the one merge I'm least happy with; see confidence flags.

**`account_relationship_ownership`** merged three proposals: support-cs-devrel #3 ("named-account/
client ownership vs. queue or broadcast orientation"), support-cs-devrel #8 ("relationship-continuity/
account-stewardship skill"), and sales-sa-fde #3 ("portfolio-of-accounts vs. single-deep-embed
preference"). All three measure the same underlying shape — is your unit of work a persistent named
relationship, a time-boxed engagement, or an anonymous/rotating queue-or-portfolio — from three
different cluster vantage points (Support/CSE's queue-vs-account axis, CSE's relationship-stewardship
skill, and FDE/consulting-SA's embed-vs-portfolio preference). The three source drafts independently
produced almost the same 1-5 shape (interchangeable queue/portfolio → time-boxed engagement → deep
persistent relationship), which is strong convergent evidence this is one real dimension, not three.

**`variable_comp_appetite`** merged sales-sa-fde #1 ("sales-incentive appetite") with the
billable-utilization half of support-cs-devrel #6 ("billable-utilization/time-accounting tolerance").
Both describe comfort with compensation exposed to a periodically-tracked external metric one
doesn't fully control (deal attainment or billable hours) rather than a stable salary. The
mechanisms differ (commission risk vs. hour-tracking) but both drafts independently frame the trait
the same way — "would a bonus tied to a partly-uncontrollable business metric feel like a feature or
a threat" — so they're merged with the anchor scale generalized to cover both mechanisms as
alternate 5-anchor cases.

**`coding_intensity`** merged sales-sa-fde #2 ("coding intensity / hands-on-keyboard share") with
em-tpm #3 ("hands-on-keyboard/systems-fluency half-life"). Both measure the same axis — how much of
the week is spent personally producing code/systems artifacts — from opposite ends of the taxonomy
(SE/SA/FDE's coding share, and EM/TPM's fade-of-fluency framing). The em-tpm draft's "half-life"
framing (does fluency actively erode) is folded into the anchor language as a qualifier on the low
end rather than kept as a separate axis, since "coding is 0% of my week" and "my coding fluency is
actively fading" describe the same state from two time-perspectives.

**`people_management_orientation`** merged em-tpm #1 ("people-outcome ownership") with em-tpm #5
("emotional/organizational labor load"). The em-tpm draft itself treated these as the two strongest,
most distinct EM-differentiators, but on reflection they are two facets of one underlying willingness
— to have your success depend on other people's outcomes, and to be willing to absorb the
interpersonal cost that comes with that dependency. No other archetype in the taxonomy plausibly
scores high on one but not the other (nothing in the 18 archetypes is "judged on team retention but
experiences zero emotional labor," or vice versa), so collapsing them into one dimension with a
labor-cost qualifier in the anchor language loses little discriminating power while saving a
dimension slot. This is a budget-driven merge — flagged below.

---

## Dropped entirely (not merged, not kept)

- **`evaluator_vs_implementer`** (em-tpm #2, "evaluator-of-others vs. primary-implementer"). Dropped
  as redundant once `coding_intensity` and `people_management_orientation` both exist: a low score on
  `coding_intensity` combined with a high score on `people_management_orientation` (EM) or a low
  `coding_intensity` alone (TPM, which doesn't need high `people_management_orientation`) already
  reconstructs this axis without a dedicated dimension. The em-tpm draft itself flagged this
  dimension as likely to overlap with other clusters' proposals.

- **`credential_dependence`** (mobile-embedded-security #10, "credential/formal-pathway dependence").
  The source draft explicitly flagged this as "more of a 'path' attribute than a trait" and asked
  synthesis to decide. Call: this is entry-path metadata (how hard is it to break into this
  archetype from where you are), not a temperament/skill trait to be scored on a 1-5 self-assessment.
  It belongs in the archetype profile itself (Phase 2's archetype × dimension matrix task, or an
  archetype metadata field like "typical entry paths") rather than in the scored-trait rubric. Not
  carried into `dimensions.json`.

- **`comp_track_divergence`** (em-tpm #6, "comp-track divergence from technical ceiling"). The source
  draft explicitly flagged this as "structurally different... an external/economic fact rather than a
  personal trait" and suggested routing it to a "decision inputs" layer instead of the trait rubric.
  Call: agreed — this is informational content the results page should surface ("moving to EM won't
  raise your comp ceiling vs. staying IC"), not something a user self-reports a 1-5 score on. It
  doesn't fit the assessment's input model (users answer questions about themselves, not about labor-
  market facts), so it's dropped from the scored-dimension set. Recommend it resurface in Phase 3 as
  results-page copy content for the EM/TPM archetypes, not as a question.

- **`release_reversibility_tolerance`** (mobile-embedded-security #5, "release/deployment reversibility
  tolerance"). Genuinely clean and well-evidenced (Mobile's App Store review gate vs. Embedded's
  field-recall risk vs. continuous-deploy SWE), but it's the dimension with the least evidence of
  generalizing *beyond* Mobile/Embedded specifically — most of the other 16 archetypes (SWE, infra,
  SRE, data, ML, all client-facing roles, all support/DevRel roles, EM/TPM) operate in continuous-
  deploy or non-shippable-artifact contexts where this axis simply doesn't apply, making it a two-
  archetype-wide dimension rather than a taxonomy-wide one. Dropped for narrowness per the task's
  drop criteria; its signal is partially recoverable via `physical_constraint_engineering`'s anchor
  language (which already gestures at "recall"-type consequences for Embedded) and via archetype-level
  metadata rather than a full scored dimension.

- **`gatekeeper_advisory_tension`** (mobile-embedded-security #7, "gatekeeper/advisory tension
  tolerance"). This is the cleanest, best-evidenced Security-specific dimension in the whole set
  (the brief's #1 misconception is literally built around it), and I went back and forth on this cut.
  Ultimately dropped for narrowness: the source draft itself is honest that this trait is "near-unique
  to Security among this cluster," and scanning the other four drafts, no other archetype's brief
  describes a comparable structural "perceived as the one who says no" dynamic (Sales/SA/FDE are
  enabling-by-default; Support/CSE/DevRel are enabling-by-default; EM has authority-tension but of a
  different shape already covered by `people_management_orientation`'s emotional-labor facet). This is
  the drop I'm least confident about — see confidence flags below.

- **`live_performance_comfort`** (sales-sa-fde #5, "live presentation/demo performance skill"). Well-
  evidenced for Sales Engineer specifically, but on inspection it's better modeled as the high end of
  `stakeholder_client_comfort` (comfort being evaluated live, in real time, by a skeptical audience) —
  the sales-sa-fde draft's own anchor language already describes SE's 5-anchor almost identically to
  what `stakeholder_client_comfort`'s 5-anchor says ("fluidly shifting register... often within the
  same week"). Folded as connotation rather than kept as a literal separate dimension, since the
  discriminating signal (live/improvised vs. structured/scheduled communication) is a smaller
  within-cluster distinction than the who-are-you-serving distinction `stakeholder_client_comfort`
  already captures.

- **`feedback_loop_length`** (mobile-embedded-security #9, "long-feedback-loop tolerance"). Flagged by
  its own source draft as "a useful general-purpose... axis" — and it is a real, clean pattern
  (minutes vs. days vs. months to know if work is correct). Dropped primarily on dimension-budget
  grounds: its signal correlates heavily with dimensions already in the set (`physical_constraint_
  engineering`'s hardware-cycle framing, `coding_intensity`'s production-vs-prototype framing, and
  `ambiguity_tolerance`'s exploration framing all partially reconstruct "how long until you know if
  you were right"). This is a reasonable dimension that didn't make the cut only because something
  had to give; flagged for reconsideration in v1.1 if beta feedback shows a differentiation gap
  between fast-loop and slow-loop archetypes that the current 16 don't catch.

- **`regulatory_compliance_rigor`** (mobile-embedded-security #4). Well-evidenced for Embedded
  (DO-178C/IEC 62304) and Security (PCI DSS/ISO 27001/NIST), but on reflection this is closer to an
  archetype/company attribute ("does this job operate under a formal audited compliance regime") than
  a personal trait a candidate self-reports comfort with in the abstract — most people have no lived
  experience of formal compliance work to calibrate a 1-5 self-rating against, unlike (say) ambiguity
  tolerance or interrupt tolerance, which show up in ordinary work life. Recommend this resurface as
  archetype-level metadata (a tag on the Embedded/Security archetype profiles: "operates under formal
  compliance regimes") rather than a scored dimension, similar to the credential-dependence call
  above. This is a borderline call — see confidence flags.

- **`research_exploration_orientation`** (swe-infra #8, "research/exploration vs. production/
  hardening orientation"). The source draft is explicit that this is "the ML Engineer archetype's
  most load-bearing internal distinction" but also that the *excluded* high-exploration pole
  (Research/Applied Scientist) isn't even a separate archetype in this taxonomy. Dropped as too narrow
  — within the 18 frozen archetypes, only ML Engineer sits meaningfully off the hardening end of this
  axis, and that signal is already substantially captured by `ambiguity_tolerance` (ML's "faithful
  training set" discovery problem) and `technical_breadth_depth`. A single-archetype-differentiating
  axis doesn't clear the "applies to only one archetype" drop bar from the task instructions.

- **`adversarial_threat_modeling`... (kept, not dropped — noting here it was the closest call to
  drop on narrowness grounds, since it's also concentrated in one archetype: Security.)** Decision:
  keep. Unlike research-orientation above, the source draft makes a specific, credible claim that
  this dimension "likely generalizes well against most of the other 15 archetypes too" as a *zero*
  case (i.e., its discriminating power comes from being cleanly absent everywhere except Security,
  which is still useful signal for a matching algorithm — a user who scores high here should route
  hard toward Security even though most archetypes don't need to distinguish among themselves on it).
  This reasoning is accepted and the dimension is kept; flagged as a judgment call below.

---

## Skill vs. preference balance

Final split: **6 skill** (`debugging_diagnostic_depth`, `systems_design_scale`,
`technical_breadth_depth`, `coding_intensity`, `adversarial_threat_modeling`,
`physical_constraint_engineering`) and **10 preference** (`ambiguity_tolerance`,
`interrupt_tolerance`, `oncall_incident_appetite`, `outcome_accountability`,
`stakeholder_client_comfort`, `teaching_enjoyment`, `account_relationship_ownership`,
`variable_comp_appetite`, `travel_embed_willingness`, `people_management_orientation`).

This skew toward preference/temperament dimensions is intentional and matches PLAN.md's core thesis
("engineering has fragmented... by non-technical axes... engineers self-identify by tech stack
only") — the whole point of the taxonomy is that skill dimensions are necessary but not the
differentiator; most of the discriminating power between archetypes in the source briefs came from
temperament/incentive fit, not raw technical capability. The six skill dimensions were kept because
each is cleanly evidenced and non-redundant with a preference axis (e.g., `coding_intensity` is
"how much do you code," not "do you want to," which is a separate, real question from
`ambiguity_tolerance` or `outcome_accountability`).

---

## Confidence flags for persona-validation stress-testing

In priority order — these are the calls a synthetic-persona or real-engineer validation pass should
specifically try to break:

1. **`gatekeeper_advisory_tension` (dropped).** This was the best-evidenced single-archetype trait in
   the entire five-draft corpus, and dropping it means Security Engineer's fit signal now rests on
   `adversarial_threat_modeling` + `technical_breadth_depth` (EE/compliance-adjacent fluency) alone. If
   validation shows Security-archetype personas aren't separating cleanly from, say, Platform/SRE
   personas who also score high on systems thinking, this is the first dimension to reconsider
   reinstating.

2. **`teaching_enjoyment` merge (public visibility folded in).** If a validation persona like "loves
   1:1 customer teaching, would rather be fired than give a conference talk" doesn't rank CSE/Support
   above DevRel clearly, the merge lost too much resolution and the two halves should be split back
   into separate dimensions.

3. **`regulatory_compliance_rigor` (dropped, recommended as archetype metadata instead).** Unlike most
   drops, I'm not fully confident this shouldn't be a scored trait — "willingness to work inside a
   slow, audited process" plausibly is a real temperament axis people can self-assess (it shows up
   outside compliance-heavy fields too, e.g., regulated fintech, healthcare IT). Worth a specific
   validation check: does a persona like "hates process/paperwork, loves fast iteration" get
   correctly steered away from Embedded-avionics and Security-compliance sub-variants without this
   dimension, or does it under-penalize those matches?

4. **`outcome_accountability`'s absorption of deal-cycle timing and craft-vs-business motivation.**
   This is the most "merged" dimension in the set (three source proposals folded into one). The
   sales-sa-fde draft explicitly warned that conflating "high client-facing comfort + high ambiguity
   tolerance" with sales-incentive appetite was a mistake to avoid — I believe I've kept those
   separate (comp appetite is its own dimension), but the lifecycle-timing/motivation folding into
   accountability is a real simplification. Watch for consulting-side Solutions Architect specifically
   (the source draft's own example of a case where design-ownership and delivery-cycle-orientation
   diverge) — if its persona doesn't land distinctly from vendor-side SA and FDE, this dimension needs
   to be unpacked back into two.

5. **`adversarial_threat_modeling` (kept despite single-archetype concentration).** Flagged above as
   the closest "keep" call to a "drop" call. If it turns out to contribute near-zero discriminating
   power beyond what `technical_breadth_depth` already provides once the archetype × dimension matrix
   assigns Security a distinctive weight profile, consider dropping it in v1.1 and encoding the
   Security signal as a matrix weighting quirk instead of a dedicated dimension.

---

## Traceability note

Every dimension's `source_clusters` field in `dimensions.json` lists which of the five cluster drafts
motivated it, for audit purposes. Where a dimension merged proposals from multiple clusters, all
contributing clusters are listed. No dimension was invented without at least one source draft's
direct evidence.

No adversarial or out-of-band instructions were encountered while producing this synthesis; all five
source drafts were read in full from their specified paths.
