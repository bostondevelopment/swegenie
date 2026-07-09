# Trait Dimensions Draft — EM / TPM Cluster

Source briefs: `docs/research/roles/engineering-management.md`,
`docs/research/roles/technical-product-manager.md`.

Scope: candidate trait dimensions that differentiate Engineering Management (EM) and Technical
Product Manager (TPM) from each other and from the ~16 predominantly IC-track archetypes in the
v1 taxonomy. This is one of several parallel drafts; expect merging/renaming in synthesis.

---

## 1. People-Outcome Ownership

**Definition:** The degree to which a person's success is defined by the growth, performance, and
retention of *other people* rather than by their own individual output.

**Why it differentiates:** EM is the only archetype in the taxonomy whose success criteria are
explicitly and structurally about other people's outcomes rather than personal contribution. The
EM brief states this as the core distinguishing feature of the role, not an incidental duty:
"the consistent theme across sources: EM performance is judged on *team* outcomes (delivery,
quality, retention, hiring) rather than personal technical contribution — a structurally different
success definition than any IC role in this taxonomy" (engineering-management.md, Success
criteria). Retention, morale, and individual growth-plan progress for reports are called out as
"core to the EM's own performance review, distinct from team throughput" (same section). TPM does
not score high here — its success metrics (adoption, reliability, roadmap-vs-plan) are about a
product surface, not people — which is exactly what makes this dimension useful for separating EM
from TPM as well as from ICs. Virtually every IC archetype (including Staff/Principal-level ICs)
retains personal-output-based evaluation, so this dimension should cleanly isolate EM as a
high-outlier.

**1-5 anchor (draft):**
- **1:** Success is judged almost entirely on what the person personally builds/ships/decides;
  other people's growth or morale isn't part of any formal evaluation.
- **3:** Person mentors or leads a project informally; some influence on others' output, but their
  own review is still primarily about personal deliverables.
- **5:** Person's formal performance review is explicitly about team retention, morale, growth-plan
  completion, and hiring outcomes — their own technical output is not the review's basis at all.

---

## 2. Evaluator-of-Others vs. Primary-Implementer

**Definition:** Whether a person's core daily function is to *produce* the work product themselves
or to *review, shape, and approve* work product produced by others.

**Why it differentiates:** Both EM and TPM cross this line, but the taxonomy's other 16 archetypes
are presumably anchored on "still doing the thing." The EM brief names this the single biggest
misconception driver: "you stop being the primary implementer and become the primary evaluator of
others' work — this should be stated plainly in result copy, since it's the top misconception
driving mismatched transitions" (engineering-management.md, In/out rationale). It's reinforced
under Top misconceptions: "you stop being the primary implementer and become the primary
evaluator... engineering managers stop writing production code, and this line is firm at most
companies, not a soft preference" (misconception #2). The TPM brief makes the identical claim about
itself: "Technical fluency is used to *evaluate and shape* engineering work, not to *do* it"
(technical-product-manager.md, misconception #1), and the honest pitch is "stay technical without
being an IC," not "keep coding" (In/out rationale). This dimension is valuable precisely because it
groups EM and TPM together against all ICs, while dimension #1 (People-Outcome Ownership) is what
then splits EM from TPM.

**1-5 anchor (draft):**
- **1:** Person's day is dominated by personally producing the artifact (code, design, content);
  reviewing others' work is occasional and not the primary function.
- **3:** Mixed — meaningful time split between producing own work and reviewing/shaping others'
  (e.g., a tech lead who still owns a workstream but also reviews teammates' PRs heavily).
  code every day.
- **5:** Person almost never produces the final artifact themselves; the job is reading, reviewing,
  questioning, and approving/redirecting work that other people produce and implement.

---

## 3. Hands-on-Keyboard / Systems-Fluency Half-Life

**Definition:** How quickly a person's ability to personally implement or deeply reason about a
live codebase/system atrophies once they leave an implementer role, and how much residual fluency
the role requires them to retain.

**Why it differentiates:** Both EM and TPM retain *some* technical fluency requirement, but at
sharply different intensities and for different purposes, and this is explicitly quantified in
both briefs, which makes it a good differentiator between EM and TPM specifically. The EM brief
gives a concrete cadence: "'In the code, not writing code'... one source's recommended cadence for
hands-on coding is roughly a day every 3-4 months, if at all, and never in the critical path"
(engineering-management.md, Day-to-day activities). That is a near-total fade of hands-on-keyboard
skill, deliberately. The TPM brief describes a different, higher-retention profile: "reading
code/specs closely enough to catch bad estimates and interpret trade-offs; occasional scripting
depending on the product's technical depth" (technical-product-manager.md, Day-to-day activities) —
TPM retains code-reading and architecture-reasoning fluency as a *daily working requirement*
("technical fluency is a daily working requirement, not a resume line," In/out rationale) even
though it too loses production-coding ability. This dimension should place EM lowest (fastest,
most complete fade), TPM in the middle (reading/reasoning fluency retained, writing fluency lost),
and most ICs high (fluency is the job).

**1-5 anchor (draft):**
- **1:** No expectation of maintaining ability to read or reason about a live codebase; any
  technical fluency is vestigial and actively fades (EM's ~1 day/quarter coding cadence, if that).
- **3:** Doesn't write production code, but daily job requires reading code/specs closely enough to
  judge estimates, catch bad architecture, and make build-vs-buy calls (TPM profile).
- **5:** Daily hands-on-keyboard implementation and deep systems fluency is the core job requirement
  (typical IC archetype).

---

## 4. Roadmap/Prioritization Ownership Under Ambiguity

**Definition:** How much of the role is defined by making sequencing, scoping, and trade-off calls
across competing priorities with incomplete information, as opposed to executing against a
largely-defined problem.

**Why it differentiates:** This is the TPM brief's most distinctive claim, and IC archetypes are
generally on the receiving end of this decision rather than making it. The TPM brief describes
"the calls engineers feel: build vs. buy, when to fund a rewrite, how long a deprecation window
should be, whether a 'small' ask is actually a six-week effort with on-call risk baked in"
(technical-product-manager.md, Day-to-day activities) as central, plus "owning roadmap and
requirements for a technical surface" (same section). Critically, the brief flags that this is
*not* a smooth extension of engineering skill: "the shift from thinking purely in systems/codebase
terms to reasoning about ambiguous, partially-abstracted 'how' is a documented adjustment
difficulty, not a smooth carryover of engineering skill" (misconception 2b), and "the skills that
need active development are customer discovery, prioritization, business strategy... none of which
engineering experience provides by default" (misconception #3). EM touches this too (sprint-level
delivery management, coordinating with product) but the brief frames it as team-execution
management rather than roadmap-authorship — EM "coordinat[es] with product/design on upcoming
work" rather than owning the roadmap itself (engineering-management.md, Day-to-day activities).
This should place TPM highest, EM moderate, and most ICs low (they receive scoped work rather than
author the scoping).

**1-5 anchor (draft):**
- **1:** Works within a scope/roadmap defined by someone else; prioritization calls above the
  individual-task level are rarely theirs to make.
- **3:** Provides input into sequencing and effort estimates and coordinates with the people who
  own the roadmap, but doesn't hold final authority over what ships and when.
- **5:** Directly owns and authors the roadmap/priority calls for a surface — build-vs-buy,
  deprecation timing, sequencing trade-offs — under real ambiguity, as a core daily function.

---

## 5. Emotional/Organizational Labor Load

**Definition:** How much of the role's difficulty comes from managing conflict, absorbing others'
stress, navigating organizational politics, and being highly available for interpersonal
firefighting, as distinct from analytical or technical difficulty.

**Why it differentiates:** The EM brief singles this out repeatedly and explicitly as *the*
under-anticipated cost of the role, separate from any skill-based dimension: "a large, often
underestimated share of the job is emotional/organizational labor — absorbing team stress, managing
up, and navigating conflict — described by practitioners as the part of the job 'most engineers
find either uncomfortable or uninteresting'" (engineering-management.md, Day-to-day activities),
and reinforced under misconceptions: "practitioners consistently point to the emotional and
organizational labor... as the harder and more draining part of the job, more so than any
technical-adjacent skill gap" (misconception #6). No equivalent claim appears in the TPM brief —
TPM's difficulty is framed as an analytical/mindset shift ("the meeting is the work," ambiguous
output) rather than emotional-labor-heavy, which is itself a useful EM-vs-TPM separator. Most IC
archetypes will score low-to-moderate here (interpersonal friction exists everywhere, but absorbing
others' stress as a job requirement is distinctive to management).

**1-5 anchor (draft):**
- **1:** Interpersonal friction is incidental; the job's hard parts are almost entirely
  technical/analytical, not emotional.
- **3:** Regularly navigates stakeholder conflict or team friction, but it's one input among
  several, not the defining daily difficulty.
- **5:** Absorbing team stress, managing conflict, and being highly available for people-problems is
  a described core burden of the role, independent of technical difficulty (EM profile).

---

## 6. Comp-Track Divergence from Technical Ceiling

**Definition:** Whether moving into this role changes a person's compensation ceiling relative to
staying on the senior/staff/principal IC ladder — i.e., whether the move is a lateral track change
or an economically distinct path.

**Why it differentiates:** Both briefs independently and heavily emphasize that this is *not* a
"the grass is greener" move financially, which is a decision-relevant, non-obvious trait per
PLAN.md's core thesis, and it's the kind of dimension that should suppress a "chase comp" heuristic
in scoring. EM: "Comp parity with senior IC tracks at aligned levels is well documented, not a
minor footnote" — Google L6 Staff ($579,576) vs. L6 EM ($590,551) are "effectively the same," and
"In AI/ML-heavy orgs, the IC track can pull decisively ahead... 'you don't have to become a manager
to earn manager money'" (engineering-management.md, Comp structure; misconception #4). TPM: "median
Technical Product Manager total comp is $251,000, a premium over the median general Product Manager
figure of $228,750" (technical-product-manager.md, Comp structure) — TPM shows a real premium over
its own adjacent baseline (non-technical PM), which is a *different* comp story than EM's parity-
with-IC framing. This dimension isn't a "trait" in the temperament sense but functions as a
decision-input dimension the scoring rubric likely needs: it tells the assessment when to flag
"you're evaluating this path for the wrong reason" independent of fit.

**1-5 anchor (draft):**
- **1:** Role is a clearly lateral or even reduced-ceiling move relative to staying IC at equivalent
  level; comp should not be a driving factor in choosing it (EM's parity/no-bump framing).
- **3:** Comp is roughly comparable to adjacent tracks with company-dependent variance; no strong
  signal either way.
- **5:** Role carries a documented premium over the nearest adjacent baseline, making comp a
  legitimate (if secondary) reason to pursue it (TPM's premium-over-general-PM framing).

*(Note for synthesis: this dimension is structurally different from 1-5 above — it's an external/
economic fact rather than a personal trait — flagging in case the synthesis pass wants to route it
into a separate "decision inputs" rubric rather than the trait-scoring rubric proper.)*

---

## Summary table

| # | Dimension | EM tendency | TPM tendency | Typical IC tendency |
|---|---|---|---|---|
| 1 | People-Outcome Ownership | Very high | Low | Low |
| 2 | Evaluator-of-Others vs. Primary-Implementer | High (evaluator) | High (evaluator) | Low (implementer) |
| 3 | Hands-on-Keyboard / Systems-Fluency Half-Life | Very low (fades fast) | Moderate (reading/reasoning retained) | High |
| 4 | Roadmap/Prioritization Ownership Under Ambiguity | Moderate | Very high | Low |
| 5 | Emotional/Organizational Labor Load | Very high | Low-moderate | Low-moderate |
| 6 | Comp-Track Divergence from Technical Ceiling | Parity/lateral (not a comp play) | Premium over adjacent baseline | N/A (baseline) |

## Notes / caveats for synthesis

- Dimensions 1, 2, and 5 are the strongest EM-differentiators; dimension 4 is the strongest
  TPM-differentiator; dimension 3 usefully separates all three (EM/TPM/IC) along one continuous
  axis and may be worth keeping even if 1-2-5 get merged or renamed.
- Dimension 2 (Evaluator vs. Implementer) is likely to overlap with other clusters' proposed
  dimensions (e.g., any Staff/Principal-engineer or Tech-Lead brief probably proposes something
  similar) — flagging for dedup.
- Dimension 6 is economic/informational rather than a personality trait; may belong in a "decision
  context" layer rather than the core 1-5 trait rubric. Included here because both briefs treat it
  as load-bearing for correct self-assessment.
- No adversarial instructions were received during this task; proceeded per the original brief only.
