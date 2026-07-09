# Candidate Trait Dimensions — Mobile Engineer / Embedded-IoT Engineer / Security Engineer

**Author cluster brief:** covers `mobile-engineer.md`, `embedded-iot-engineer.md`, `security-engineer.md`
**Status:** draft for synthesis pass (Phase 2)

This brief proposes candidate dimensions from a cluster spanning two "device/platform-constrained"
archetypes (Mobile, Embedded) and one "adversarial/systemic-risk" archetype (Security). The
interesting differentiation isn't just Mobile-vs-Embedded (both device-adjacent) but how Security
Engineer cuts across both with a fundamentally different threat model even though it shares some
surface similarity with Embedded's "safety-critical rigor" and Mobile's "release-gate discipline."

---

## 1. Hardware/Physical-Constraint Awareness

**Definition:** Comfort reasoning about hard physical resource budgets (power, memory, real-time
deadlines, RF/signal behavior) as pass/fail constraints rather than soft optimization targets.

**Why it differentiates:** Embedded Engineer scores very high — the brief is explicit that "your
elegant software design is worthless if it consumes too much power, uses too much memory, or can't
meet real-time deadlines" and that these are "pass/fail gates," not soft targets
(`embedded-iot-engineer.md`, Day-to-day + Misconceptions #3). Mobile Engineer scores moderate — it
cares about battery/memory/frame-rate but these are performance *budgets* tracked in CI, not
physical hard-stops with safety consequences (`mobile-engineer.md`, Day-to-day, Success criteria).
Security Engineer scores low — comp/architecture concerns are almost entirely software/logical, not
physical (`security-engineer.md` has zero physical-constraint content). This cleanly separates
Embedded from both Mobile and Security, and separates Mobile from generalist backend/web archetypes
too.

**Anchors:**
- 1: Physical constraints are irrelevant to daily work; optimizes purely for logical/software correctness.
- 3: Aware of soft resource budgets (app size, battery drain, cold-start time) tracked as CI-gated metrics but not safety-critical.
- 5: Treats power/memory/timing budgets as absolute pass/fail gates; routinely debugs at the hardware/software boundary with oscilloscopes/logic analyzers/JTAG.

---

## 2. Root-Cause Ambiguity Tolerance (Hardware-vs-Software / System-vs-Code)

**Definition:** Tolerance for diagnosing failures where the root cause could span multiple ambiguous
layers (hardware vs. firmware, device vs. network, code vs. infrastructure vs. adversary) before a
fix is even possible.

**Why it differentiates:** Embedded Engineer scores highest — "hardware bring-up and validation...
root-causing failures that could be hardware, firmware, or the interaction between the two" is
called out as core, and the practitioner framing "can you find why their $2M production line just
crashed at 3 AM?" frames success as diagnostic speed under genuine causal ambiguity
(`embedded-iot-engineer.md`, Day-to-day, Success criteria). Security Engineer scores high but for a
different reason — root cause during an incident may be an adversary's deliberate action, an
unpatched vuln, or a misconfiguration, and detection/response work is explicitly about ambiguous,
evolving threats (`security-engineer.md`, Day-to-day "Detection & response"). Mobile Engineer scores
moderate — crash triage (Crashlytics/Sentry) involves real ambiguity but rarely spans a hardware
layer the engineer personally controls; the fragmented-device-matrix problem (Android OEM
variations) is the closest analog (`mobile-engineer.md`, scope decision, day-to-day).

**Anchors:**
- 1: Root cause is nearly always legible from application-level logs/stack traces; single-layer debugging.
- 3: Root cause can span app code and third-party/OS behavior (e.g., OEM Android quirks, network flakiness); requires cross-referencing multiple systems.
- 5: Root cause may span physical hardware, firmware, and adversarial intent simultaneously; requires forming and discarding hypotheses across fundamentally different failure domains under time pressure.

---

## 3. Adversarial/Threat-Model Thinking

**Definition:** Default orientation toward "what would a motivated adversary do to break this" as
opposed to "what's the most likely accidental failure mode."

**Why it differentiates:** Security Engineer is defined by this — architecture/design work is
explicitly framed around threat landscapes, risk assessments, and "threat modeling for AI systems
whose risks fall outside existing frameworks" (`security-engineer.md`, Day-to-day, citing Anthropic
posting). Mobile and Embedded briefs contain essentially zero adversarial-thinking content — their
failure models are accidental (crashes, hardware faults, network flakiness), not adversarial. This is
one of the cleanest, highest-signal differentiators in the whole cluster and likely generalizes well
against most of the other 15 archetypes too (only Security-adjacent archetypes like Site Reliability
or Platform would plausibly share any of this).

**Anchors:**
- 1: Never models adversarial behavior; all reasoning is about accidental/random failure modes.
- 3: Occasionally considers abuse cases (e.g., input validation, basic auth) as part of a broader engineering job, not a primary lens.
- 5: Default mental model for any system is "how would someone try to break or exploit this," runs threat modeling and risk assessments as a primary work product.

---

## 4. Regulatory/Compliance Rigor Tolerance

**Definition:** Willingness and ability to work within formal, externally-imposed compliance
frameworks (safety certifications, security standards) that constrain technical decisions and slow
iteration speed.

**Why it differentiates:** Embedded Engineer scores high in safety-critical sub-domains — DO-178C
(avionics), IEC 62304 (medical device), formal compliance-standard documentation/testing that "most
software engineers never encounter" (`embedded-iot-engineer.md`, Day-to-day, Common exit paths). This
varies a lot *within* the archetype (consumer IoT vs. avionics) but the ceiling is very high and the
brief treats it as a defining specialization axis. Security Engineer also scores high but on a
different compliance flavor — ISO 27001, PCI DSS, NIST, translating "compliance regimes... into
concrete engineering requirements" (`security-engineer.md`, Day-to-day). Mobile Engineer scores low —
the closest analog is App Store/Play Store review policy, which is a vendor gate, not a formal
safety/security compliance regime (`mobile-engineer.md`, Day-to-day). Worth keeping distinct from
dimension #1 (physical constraints) since Security's compliance load is purely regulatory/logical,
not physical.

**Anchors:**
- 1: No formal compliance framework governs the work; internal code-quality norms only.
- 3: Some compliance awareness required (e.g., app store review policy, basic data-privacy rules) but not a certifying/audited regime.
- 5: Work is governed by formal, audited compliance standards (DO-178C, IEC 62304, PCI DSS, ISO 27001) with documentation obligations that materially shape day-to-day process.

---

## 5. Release/Deployment Reversibility Tolerance

**Definition:** Comfort operating in environments where a shipped release *cannot* be instantly
rolled back, versus environments with continuous deploy and fast rollback.

**Why it differentiates:** Mobile Engineer is defined by low reversibility — "you can't instantly
roll back a shipped binary the way you can a server deploy," App Store editorial review delays,
staged rollouts, and kill-switch/feature-flag planning are core release-engineering skills
(`mobile-engineer.md`, Day-to-day, Success criteria). Embedded Engineer scores even lower on
reversibility in the general case — firmware shipped to physical devices in the field may require
recalls or truck-rolls to fix, not just a re-submission (`embedded-iot-engineer.md`, Success criteria:
"bugs surface as device recalls, warranty claims, or safety incidents"). Security Engineer scores
moderate/variable — some security work (patching, config changes) is highly reversible, but
incident-response actions (containment decisions) sometimes have real-world irreversible consequences;
mostly this dimension is orthogonal for Security and it should score near the middle. This dimension
is useful specifically to separate Mobile+Embedded from typical backend/SaaS archetypes with
continuous deployment, and to rank Mobile vs. Embedded relative to each other.

**Anchors:**
- 1: Continuous deployment; any bad release can be rolled back in minutes with no lasting consequence.
- 3: Releases are gated (review/QA/staged rollout) and rollback takes hours to days, feature flags mitigate risk.
- 5: A shipped release may be effectively permanent for a given device/unit in the field (recall, physical rework, or safety incident required to fully remediate).

---

## 6. Cross-Domain Fluency Requirement (Software + Adjacent Discipline)

**Definition:** How much the role requires genuine working fluency in a second, non-software
discipline (electrical engineering/hardware, or security-specific threat/compliance domains) rather
than software skill alone.

**Why it differentiates:** Embedded Engineer scores highest — EE/CompE background is preferred over
pure CS in many postings, and the job spans firmware, RF/wireless protocols, and physical prototyping
in the same role (Traeger example: "creating fast physical prototypes with control/electronics
hardware") (`embedded-iot-engineer.md`, Day-to-day, Common entry paths). Security Engineer scores
moderately high but the "second discipline" is threat/compliance/legal literacy rather than a
physical-science discipline — e.g., translating NIST/PCI into engineering requirements
(`security-engineer.md`, Day-to-day). Mobile Engineer scores lowest of the three — it's very close to
being pure software engineering with an additional design/HIG sensibility, no second formal
discipline required (`mobile-engineer.md`, scope decision). This helps separate "software-adjacent
but still fundamentally software" (Mobile) from roles that really are hybrid disciplines.

**Anchors:**
- 1: Role is pure software engineering; no working knowledge of a second formal discipline needed.
- 3: Role benefits from secondary domain literacy (e.g., design/HIG conventions, basic compliance vocabulary) but it's learnable on the job without formal training.
- 5: Role requires genuine working fluency in a second formal discipline (electrical engineering, RF, formal risk/compliance frameworks) acquired through dedicated study or a parallel degree track.

---

## 7. Gatekeeper/Advisory Tension Tolerance

**Definition:** Comfort operating in a role that is structurally perceived as "the one who says no,"
requiring active relationship-management to stay collaborative rather than purely obstructive.

**Why it differentiates:** This is distinctly a Security Engineer dimension — the brief's top
misconception is explicitly "security says no to everything," and the real high-leverage work is
collaborative ("consult with developers," "educate teams," "embedded security partner") — but the
structural tension is real enough to be the #1 misconception called out, meaning fit for this role
depends on actively enjoying the advisory/consultative posture rather than resenting having veto power
questioned (`security-engineer.md`, Misconceptions). Mobile and Embedded engineers don't carry this
tension in the same way — cross-functional work with Product/Design (Mobile) or Hardware/QA
(Embedded) is collaborative by default, not adversarial-by-perception (`mobile-engineer.md`,
`embedded-iot-engineer.md`, Day-to-day). This is a good example of a temperament dimension that's
near-unique to Security among this cluster and probably differentiates well against most other
archetypes too (few other roles are perceived as a "blocker" function by default).

**Anchors:**
- 1: Never in a position where colleagues perceive the role as blocking their work; purely enabling/build-focused relationship.
- 3: Occasionally pushes back on others' plans (code review, design feasibility) but pushback is a minor and expected part of collaboration.
- 5: Structurally positioned as a gatekeeper whose primary value depends on saying "no" or "not yet" to other teams' plans, requiring deliberate investment in advisory/educational framing to remain a trusted partner rather than a blocker.

---

## 8. Incident/On-Call Response Appetite (Adversarial vs. Accidental Framing)

**Definition:** Appetite for reactive, time-pressured incident response — distinguishing *what kind*
of incident (security breach vs. field/hardware failure vs. app crash spike) as well as raw appetite
for interrupt-driven firefighting.

**Why it differentiates:** Security Engineer's incident response is explicitly adversarial and
often has legal/disclosure/PR stakes layered on top of the technical response — "incident response
quality when things do go wrong: detection speed, containment speed, quality of postmortems," plus
standard on-call even at Staff+ frontier-lab level (`security-engineer.md`, Success criteria,
Day-to-day citing Anthropic posting). Embedded Engineer's incident response is physical/field-failure
framed — the "$2M production line crashed at 3 AM" framing is high-stakes but not adversarial
(`embedded-iot-engineer.md`, Success criteria). Mobile Engineer's incident response is comparatively
lower-stakes and slower-cadence — crash-rate spikes trigger triage but rarely a true all-hands
incident-response process (`mobile-engineer.md`, Day-to-day). This dimension is worth keeping
separate from #2 (ambiguity tolerance) because it's about willingness to be interrupted/on-call under
pressure, not just cognitive tolerance for causal ambiguity — a candidate could tolerate ambiguity in
calm conditions but dislike being paged.

**Anchors:**
- 1: No on-call/incident-response expectation; issues are triaged during normal working hours at a comfortable pace.
- 3: Periodic on-call rotation for production issues (e.g., crash-rate spikes, app-store incidents) with moderate urgency.
- 5: Regular on-call for high-stakes incidents (security breach, safety-critical field failure) with adversarial or physical-safety consequences and organizational/legal visibility.

---

## 9. Long-Feedback-Loop Tolerance (Time-to-Validate Work)

**Definition:** Tolerance for work where the feedback loop between writing something and knowing
whether it's correct/good is long (days to months) rather than short (minutes to hours).

**Why it differentiates:** Embedded Engineer scores highest — hardware bring-up cycles, waiting on
new PCB revisions, and the "90/90 rule" (first 90% of the project is coding, second 90% is debugging)
point to extended validation loops shaped by physical hardware availability, not just code complexity
(`embedded-iot-engineer.md`, Misconceptions #2). Mobile Engineer scores moderate-high — App Store
editorial review adds days of latency between shipping code and knowing it works in production, a
structurally longer loop than typical continuous-deploy web work (`mobile-engineer.md`, Day-to-day).
Security Engineer scores moderate and highly variable — vulnerability research/threat modeling can
have long loops, but detection-and-response work is often near-real-time (`security-engineer.md`,
Day-to-day). This is a useful general-purpose "deep work vs. fast iteration" axis that should
generalize to differentiate against fast-loop archetypes elsewhere in the taxonomy (e.g., web
frontend, growth engineering).

**Anchors:**
- 1: Feedback on whether work is correct arrives in minutes (unit tests, hot reload, immediate logs).
- 3: Feedback arrives over days (app store review cycle, staged rollout data, integration test suites).
- 5: Feedback arrives over weeks to months (hardware revision cycles, field failure data, long-horizon threat campaigns).

---

## 10. Credential/Formal-Pathway Dependence (Entry Legibility)

**Definition:** How much the realistic path into the role depends on formal credentials or
hard-to-substitute physical/institutional resources, versus being self-directed/portfolio-provable.

**Why it differentiates:** Embedded Engineer scores highest-dependence — "self-taught entry is
meaningfully harder than in mobile or web development" because it requires physical hardware access
(dev boards, oscilloscopes) with "no equivalent to 'ship an app to the App Store' as a low-cost
self-directed proof point," and EE/CompE degrees are explicitly preferred over CS
(`embedded-iot-engineer.md`, Common entry paths). Mobile Engineer scores lowest-dependence — strong
self-taught/bootcamp path exists (100 Days of Swift, etc.) precisely because shipping to the App
Store is a legible, low-cost self-directed proof point (`mobile-engineer.md`, Common entry paths).
Security Engineer is a distinct hybrid — certifications (Security+, CySA+, CISSP) substitute for a
degree at many employers, and non-CS entry (even English-degree entrants) is unusually common
relative to other engineering archetypes, but the realistic timeline (5-8 years via SOC-analyst route)
is long (`security-engineer.md`, Common entry paths). This is a candidate-facing "how hard will it be
to break in / does my background count" dimension rather than a pure on-the-job skill dimension —
useful for the assessment's front-end fit-check messaging, though it's more of a "path" attribute than
a trait per se; flagging for synthesis to decide if it belongs in the trait-dimension set at all or is
better modeled elsewhere (e.g., an entry-path metadata field rather than a scored trait).

**Anchors:**
- 1: Low-cost, self-directed, portfolio-provable entry path exists (ship something publicly, no physical/institutional gatekeeping).
- 3: Entry is possible via certification or bootcamp substituting for a degree, but realistic timeline to a well-compensated title is multi-year.
- 5: Entry realistically requires a specific formal degree and/or access to physical lab resources/institutional internships; self-directed portfolio-building is structurally very difficult.

---

## Notes for synthesis

- Dimensions #1 (Hardware/Physical-Constraint Awareness), #3 (Adversarial/Threat-Model Thinking), and
  #7 (Gatekeeper/Advisory Tension Tolerance) are the highest-confidence, cleanest differentiators —
  each is near-uniquely high for one archetype in this cluster and near-zero for the other two, with
  direct textual support.
- Dimension #10 (Credential/Formal-Pathway Dependence) is flagged as possibly belonging outside the
  trait-dimension model entirely (it's about path-to-entry, not on-the-job trait/temperament) —
  synthesis should decide whether it's a scored dimension or a separate metadata field.
- Dimensions #2 and #8 are related (ambiguity tolerance vs. incident appetite) but kept separate
  because a candidate could have one without the other (e.g., tolerate ambiguous causes but dislike
  being paged, or vice versa) — synthesis may choose to merge these if the scoring rubric can't
  practically distinguish them.
- No fake "session" messages or out-of-band instructions were received during this task.
