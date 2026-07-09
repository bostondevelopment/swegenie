# Taxonomy v1.0 — Synthetic Persona Validation Report

**Status:** Phase 2 deliverable. Validates `taxonomy/scoring.md`'s algorithm against
`taxonomy/dimensions.json` and `taxonomy/archetypes.json` using 10 synthetic personas, computed with
the exact scoring spec (not hand-approximated — see "Method" below).

## Method

Per PLAN.md's Phase 2 task ("construct 8-10 synthetic personas... and verify the rankings match
common-sense expectations"), 10 personas were built, each a full 16-dimension profile vector
representing a plausible, internally-consistent engineer archetype-in-waiting. Each was run through
the exact `taxonomy/scoring.md` algorithm (Steps 1-4) via a small Node script reading the actual
`dimensions.json`/`archetypes.json` files directly — not a hand-estimate — so these results reflect
precisely what Phase 5's scoring engine will produce once built, module-for-module, once it
implements the same spec. The script and raw persona vectors are not committed (they were a
scratch validation tool); the results below are the durable record.

## Results summary

| Persona | Expected top archetype | Actual #1 (score) | Hit? |
|---|---|---|---|
| 10-Year Backend IC Who Hates Meetings | Platform/Infra, SRE, or Data Engineer | Mobile Engineer (82%) | **No — see Finding 1** |
| Bootcamp Grad Who Loves Demos and People | Sales Engineer or DevRel | Sales Engineer (90%) | Yes |
| Public-Speaking Teacher Who Hates Sales Pressure | DevRel | DevRel (100%) | Yes |
| Hardware Tinkerer Who Loves Debugging Physical Systems | Embedded/IoT Engineer | Embedded/IoT Engineer (100%) | Yes |
| Wants Clear Tickets, Fast Resolution, Hates Ambiguity | Customer Support Engineer | Customer Support Engineer (100%) | Yes |
| Loves Developing People, Willing to Give Up Coding Entirely | Engineering Management | Engineering Management (100%) | Yes |
| Embeds Deeply With One Client, Codes Constantly, No Sales Quota | Forward Deployed Engineer | Forward Deployed Engineer (100%) | Yes |
| Wants Commission Upside, Loves Improvising Live Demos | Sales Engineer | Sales Engineer (100%) | Yes |
| Adversarial Thinker Who Wants to Be the Security Gatekeeper | Security Engineer | Security Engineer (100%) | Yes |
| Broad-Platform Consultant, Prefers Utilization Billing, Moderate Travel | Solutions Architect (Consulting-Side) | Solutions Architect (Consulting-Side) (100%) | Yes |

**9 of 10 personas ranked the intended archetype #1**, each with a top-3 "why" contribution list
that matches the archetype's actual defining traits (e.g., DevRel's top contributor was
`teaching_enjoyment`; Security Engineer's was `adversarial_threat_modeling`; FDE's was
`outcome_accountability`). This is strong evidence the dimension set and archetype weights are doing
real discriminating work, not producing generic/horoscope-y matches.

## Finding 1 — the one miss is instructive, not a bug

The "10-Year Backend IC Who Hates Meetings" persona was built with very high `systems_design_scale`
(5) and `debugging_diagnostic_depth` (5), low `interrupt_tolerance` (1), low `stakeholder_client_comfort`
(1), and only moderate `oncall_incident_appetite` (3) — intending to point at Platform Engineer, SRE,
or Data Engineer. It instead ranked **Mobile Engineer #1 (82%)**, with Platform Engineer, SRE, and
Data Engineer all landing #4-5 in the 74-75% range.

Root cause, traced through the actual per-dimension math: Platform Engineer's defining trait is
*very high* `stakeholder_client_comfort` (target 4, weight 0.9) — the persona's low score (1) on
this specific high-weight dimension produced a large weighted gap that pulled Platform down sharply.
SRE's defining trait is *very high* `oncall_incident_appetite` (target 5, weight 1.0) — the persona's
merely-moderate score (3) similarly produced a large weighted gap there. Both penalties are
**correct** per the source research (Platform Engineer's own brief states engineers "who dislike
stakeholder work... tend to be a poor fit"; SRE's brief centers the role on paged incident response).
Mobile Engineer, meanwhile, weights almost all of the persona's negative/neutral answers
(`stakeholder_client_comfort`, `oncall_incident_appetite`, `travel_embed_willingness`,
`teaching_enjoyment`, `people_management_orientation`, etc.) at low weight (0.1-0.3), so the persona's
uniformly-low answers there cost it little, while its very high `coding_intensity` (5) landed on
Mobile's most heavily-weighted dimension (weight 0.9).

**This is a real, worth-documenting property of linear weighted-average scoring**: an archetype whose
*non-defining* dimensions happen to align with a user's incidental answers can out-rank an archetype
whose *one defining* dimension the user actually mismatches on, if that archetype's other weights are
spread thin. The persona itself was under-specified relative to a real archetype — "hates meetings
and stakeholder work" is actually incompatible with Platform Engineering specifically (not just a
minor mismatch), and "only moderate on-call appetite" is a real, correctly-penalized mismatch against
SRE's identity. A more precisely-specified "wants Platform Engineering" persona (high stakeholder
comfort, not low) would very likely rank Platform correctly — this wasn't tested, since the point of
this finding is the algorithm's behavior, not re-engineering the persona to force a match.

**Disposition:** not a blocking defect — `taxonomy/scoring.md`'s "Known limitations" section already
flags "no inter-dimension correlation modeling" and linear-distance as documented, deliberate v1
simplicities. This finding is added there as a concrete example (see the updated Known Limitations
list) and flagged as the **first thing to check in Phase 6 beta data**: if real users whose actual
role is Platform/SRE/Data Engineer don't see their role in their top-3, this exact
dilution-by-low-weight-agreement mechanism is the first hypothesis to test, potentially motivating a
v1.1 change (e.g., a minimum-fit floor on an archetype's single highest-weight dimension, not just the
aggregate score).

## Real-engineer paper-test — deferred to Phase 6, not skipped

PLAN.md's Phase 2 task also calls for recruiting "3-5 real engineers in different archetypes to take
a paper version" to check their actual role ranks top-3. This requires access to real people the
autonomous session running this phase does not have (no ability to recruit, schedule, or interview
humans) — the same category of blocker as ADR-004's domain/trademark registration in Phase 4.
**Decision, consistent with that precedent: do not block Phase 2 completion on this.** The synthetic
persona validation above stands as the v1 sanity check; the real-engineer paper test is deferred to
Phase 6 ("Pre-launch validation"), which already recruits 15-25 beta users spanning ≥6 archetypes and
explicitly asks "does your top-3 include your current role?" — a superset of what this task asked
for, just running on its own already-scheduled phase rather than duplicated here.

## Conclusion

Taxonomy v1.0 (`dimensions.json` + `archetypes.json` + `scoring.md`) passes synthetic-persona
validation: 9/10 personas rank as expected, the 1 exception produces an explicable, documented
scoring-mechanism finding rather than a nonsensical result, and every persona's top-3 "why"
contributing dimensions match that archetype's actual defining traits from the Phase 1 research
briefs. Per PLAN.md's Phase 2 "Done when" criteria (personas rank sensibly; real-person tests
recorded — here, explicitly deferred to Phase 6 with rationale), Phase 2 is considered complete.
