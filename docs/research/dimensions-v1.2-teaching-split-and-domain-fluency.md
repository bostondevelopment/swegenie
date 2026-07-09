# Taxonomy v1.2: Teaching/Visibility Split + Domain-Fluency Gates — Rationale

**Status:** Post-launch fix, 2026-07-09, same day as v1.1. A user retook the assessment after the
v1.1 fix (relationship dimension split + scoring floor) and reported two more issues from their
actual result, both confirmed by tracing the real per-dimension math against their decoded answer
profile. Unlike v1.1, this fix wasn't grounded in fresh external JD research — the root causes were
each already implicitly documented as risks earlier in the project (see below) and this pass
confirmed and fixed them, rather than discovering new market evidence.

## Issue 1 — Developer Relations scored high on private-teaching answers alone

The user's two `teaching_enjoyment` question answers were both about private, 1:1 explaining (a
tutorial for a solved problem; explaining something to a confused customer) — neither touched public
speaking, social media, or community visibility. Yet Developer Relations, whose defining trait was
the single merged `teaching_enjoyment` dimension, scored a perfect match on it.

Root cause: `docs/research/dimensions-synthesis.md` (Phase 2) already flagged this exact risk when
the original 5 cluster drafts were merged down to 16 dimensions. Quoting that document's own
"Confidence flags" section, written before any real user ever touched the product:

> **`teaching_enjoyment` merge (public visibility folded in).** If a validation persona like "loves
> 1:1 customer teaching, would rather be fired than give a conference talk" doesn't rank CSE/Support
> above DevRel clearly, the merge lost too much resolution and the two halves should be split back
> into separate dimensions.

That is exactly what happened, just with a real user instead of a synthetic persona. Fix: split
`teaching_enjoyment` back into itself (renamed "Teaching / Explaining Enjoyment", scope narrowed to
audience-agnostic teaching skill/enjoyment) and a new `public_visibility_comfort` dimension (public,
one-to-many visibility specifically). Developer Relations now carries both at weight 1.0 — it
genuinely requires both skill and public appetite — while Customer Success Engineer keeps
`teaching_enjoyment` high (workshops, enablement plans) but scores `public_visibility_comfort` low,
correctly separating the two archetypes the original merge had blurred.

## Issue 2 — ML Engineer ranked #1 with no relationship to reported ML background

The same user's stack-intake domains checklist did not include Data/ML, yet ML Engineer ranked #1.
Tracing the math: ML Engineer's four weight-0.7 dimensions (Outcome Accountability, Ambiguity
Tolerance, Systems Design at Scale, Coding Intensity) are all generic senior-engineer temperament
traits shared broadly across the taxonomy — none of them are ML-specific. Separately, the
stack-intake domain checklist has never been wired into scoring at all (by original Phase 3 design,
per ADR reasoning that "the differentiator is the preference data, not another skills checklist") —
so a user's explicit statement that they don't work in ML/data had literally no path to affect this
match.

Compare this to Embedded/IoT Engineer (`physical_constraint_engineering`, weight 1.0) and Security
Engineer (`adversarial_threat_modeling`, weight 1.0): both already have a dimension that functions as
a genuine domain-fluency gate — a low score there meaningfully demotes the archetype regardless of
generic temperament fit. ML Engineer, Mobile Engineer, Data Engineer, and Platform Engineer had no
equivalent.

**User's directive on the fix:** given the choice between (a) demoting/excluding archetypes when the
stack-intake checklist explicitly contradicts them, (b) adding real scored skill/experience
questions, (c) a display-only caveat with no scoring change, or (d) deferring — the user asked for
"the best solution overall... the one that will allow us to get the most accurate results," explicitly
approving adding real, scored technical skill-rating questions as part of the assessment (reversing
the earlier no-skills-checklist framing in favor of accuracy). Chose (b): added four new skill
dimensions — `ml_engineering_fluency`, `mobile_platform_fluency`, `data_infrastructure_fluency`,
`cloud_infrastructure_fluency` — each a self-rated hands-on-experience question, scored as a
weight-1.0 or near-1.0 gate for its directly relevant archetype and low weight/target everywhere
else, mirroring the existing Embedded/Security pattern exactly.

## Scope decision: 1 question per new dimension, not 2

Every other dimension in the taxonomy has 2 questions (averaged for reliability). The 5 new
dimensions in this pass (`public_visibility_comfort` + 4 domain-fluency dims) get only 1 question
each, to limit the growth in total assessment length: 34 dimension-questions → 39, pushing total
items (with the 4-field stack intake) from 38 to 43. This is a deliberate quality/length trade-off,
not an oversight — flagged here so a future pass can add a second question per new dimension if
single-question reliability turns out to be a problem in practice (e.g., Phase 6 beta data showing
these specific dimensions have unstable results a user disagrees with on retake).

## What this does and doesn't fix

This directly addresses ML Engineer's specific gap (and, by the same mechanism, Mobile/Data/Platform
Engineer's equivalent gaps) and Developer Relations' specific gap. It does **not** retroactively
audit every other archetype for a similar missing domain-fluency or conflated-dimension issue — this
was a targeted fix for the two concrete cases a real user found, not a full taxonomy re-audit. If
further real usage surfaces a similar pattern elsewhere (e.g., Security Engineer's threat-modeling
gate proving too easy/hard to satisfy in practice, or another merged dimension losing resolution the
way `teaching_enjoyment` did), the fix pattern here — split the conflated dimension, or add a
missing domain-fluency gate — is the template to reapply.
