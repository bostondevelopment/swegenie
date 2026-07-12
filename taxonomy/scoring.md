# Scoring Algorithm Spec (v1.5)

**Status:** Phase 2 deliverable, revised through v1.5. v1.1 (2026-07-09) added the top-dimension
floor (Step 2.5) after a real user's result surfaced the exact dilution failure mode flagged (but
left unfixed) in v1.0's Known Limitations. v1.5 (2026-07-12) replaced v1's linear per-dimension gap
penalty with a **non-linear (squared) penalty** (Step 1) so large mismatches cost disproportionately
more than small ones, and made each archetype's defining dimension(s) an explicit, published field
(`defining_dimension` in `archetypes.json`) that drives the Step 2.5 floor. This is the spec Phase 5's
scoring engine (`app/`) implements as a pure, unit-tested module. Phase 2's persona validation
(`docs/research/validation-v1.md`) exercises this exact algorithm by hand/spreadsheet before any code
is written, per PLAN.md's "Done when" criteria for this phase.

## Inputs

1. **User profile vector** `U`: one integer 1-5 per dimension id in `taxonomy/dimensions.json`,
   collected via the Phase 3 assessment. A dimension may be `null` if the user skipped every
   question mapping to it (Phase 3's flow explicitly allows "skip/unsure").
2. **Archetype profile** `A` (one entry in `taxonomy/archetypes.json`): for each dimension id, a
   `target` (1-5) and a `weight` (0.0-1.0).

Both are keyed by the same dimension ids (17 as of v1.1) — this is the data contract between
`/taxonomy/*.json` and the scoring engine; a schema change to either file requires a taxonomy
version bump (per PLAN.md's Agent execution notes).

## Step 1 — Per-dimension fit (non-linear, v1.5)

For each dimension `d` where the user answered (`U[d] != null`):

```
distance(d)  = abs(U[d] - A[d].target)              // 0..4 on a 1-5 scale
fit(d)       = 1 - (distance(d) / 4)^2              // 1.0 = exact match, 0.0 = maximally opposite
```

**Why squared, not linear (v1.5 change).** v1 used a linear penalty (`fit = 1 - distance/4`), which
treats a 2-point gap as *exactly* twice as costly as a 1-point gap — a modeling choice, not a
proven-optimal one (v1's own Known Limitations flagged it). v1.5 penalizes the **square** of the
normalized distance instead, so the cost of a gap grows super-linearly:

| distance | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| linear `fit`  | 1.0 | 0.75 | 0.50 | 0.25 | 0.0 |
| **squared `fit`** | **1.0** | **0.9375** | **0.75** | **0.4375** | **0.0** |

A 2-point gap now costs 4× a 1-point gap (penalty 0.25 vs. 0.0625), not 2×. In words: **small
mismatches are treated as near-noise, while large mismatches hurt disproportionately** — which is the
behavior we want from a discriminating fit model, and it is still simple, monotonic, bounded to
`[0, 1]`, and fully reproducible from the user's answers (no black-box). The endpoints are unchanged
(exact match = 1.0, maximal opposite = 0.0), so an archetype the user matches perfectly still scores
100%. The tradeoff — that the convex curve reads more generously on small per-dimension gaps, lifting
absolute scores for near-miss and lukewarm profiles relative to the old linear scale — is noted in
Known Limitations.

Skipped dimensions are excluded entirely from every downstream calculation for that scoring run —
they are not imputed to a neutral value, since a neutral guess would silently understate or overstate
fit. This means two users who skip different questions are scored on different (but still
apples-to-apples-per-user) effective dimension sets; the UI should surface how many dimensions
contributed to a given match (see Step 4).

## Step 2 — Overall fit score per archetype

Weighted average of per-dimension fit, weights renormalized over only the answered dimensions:

```
answered = { d : U[d] != null }
totalWeight = sum( A[d].weight for d in answered )
fitScore = sum( A[d].weight * fit(d) for d in answered ) / totalWeight
```

`fitScore` is in `[0, 1]`; display as a percentage (`round(fitScore * 100)`). If `totalWeight == 0`
for an archetype (i.e., the user skipped every dimension that archetype cares about), that archetype
is excluded from ranking entirely and flagged as "not enough signal" rather than shown with a
misleading score.

## Step 2.5 — Top-dimension floor (v1.1)

Added after a real user's result ranked Security Engineer #4 despite a mediocre answer on
`adversarial_threat_modeling` — Security's *only* weight-1.0 dimension, the one trait the archetype
is built around. The raw weighted average let four other moderately-well-matched 0.5-0.7-weight
dimensions paper over a bad match on the defining trait. This is exactly the "dilution-by-low-weight-
agreement" pattern v1.0 flagged as a risk (see Known Limitations) and is now corrected structurally,
not just documented:

Each archetype's **defining dimension(s)** are published explicitly in `archetypes.json` as a
`defining_dimension` field — the highest-weight trait(s) in its profile (an array, because several
archetypes tie multiple dimensions at the maximum weight; e.g. Forward Deployed Engineer ties three
at weight 1.0, Developer Relations ties `teaching_enjoyment` and `public_visibility_comfort`). The
floor caps the score at the user's fit on those trait(s):

```
definingDims  = A.defining_dimension ∩ answered              // the declared defining trait(s) the user answered
if definingDims is empty:                                    // user skipped every defining trait
    topWeight    = max( A[d].weight for d in answered )
    definingDims = { d in answered : A[d].weight == topWeight }   // fall back to best available signal
worstTopFit   = min( fit(d) for d in definingDims )
fitScore      = min( fitScore_from_step_2, worstTopFit )
```

In words: **an archetype's score can never exceed how well the user matched its single most
important dimension(s).** A strong aggregate score built mostly from secondary traits can no longer
outrank a mediocre match on the trait that actually defines the archetype. When an archetype has
multiple defining dimensions, the floor uses the *worst* of those — failing any one of several
equally load-bearing traits should cap the score, not just the average of all of them. If the user
skipped every declared defining dimension, the floor falls back to the highest-weight dimension(s)
they *did* answer, so it still binds on the most important available signal rather than silently
disappearing. (Publishing `defining_dimension` in the data, rather than only recomputing it from
weights at runtime, keeps the floor's target self-documenting and lets the results UI name the trait
each archetype is gated on. A validation test asserts each declared `defining_dimension` really is the
archetype's max-weight trait set, so the data and the weights cannot silently drift apart.)

This changes nothing for a well-matched top archetype (the floor is a no-op whenever `worstTopFit`
is already ≥ the raw fitScore) and only demotes archetypes whose apparent fit was propped up by
secondary-dimension agreement rather than a real match on what makes that archetype what it is.

## Step 2.6 — Floor tie-break (v1.4)

Added after a real user found four archetypes (SRE, Sales Engineer, Forward Deployed Engineer,
Developer Relations) all capped at *exactly* 50%, for four completely unrelated reasons. Root cause:
the 1-5 answer scale only produces 5 possible `fit()` values (1.0/0.75/0.5/0.25/0), so Step 2.5's hard
floor collapses archetypes with meaningfully different overall matches onto identical scores whenever
their worst-top-dimension gap happens to be the same integer distance. This is a real information-loss
problem in the display, not a scoring error — the underlying `rawFitScore`s were already different
(e.g. 65-71% in the reported case) before Step 2.5 capped them all to the same 50%.

```
TIEBREAK_EPSILON = 0.1
fitScore = rawFitScore <= worstTopFit
  ? rawFitScore                                                   // floor doesn't bind — unchanged
  : worstTopFit + TIEBREAK_EPSILON * (rawFitScore - worstTopFit)   // floor binds — small upward nudge
```

In words: when the floor isn't binding (the raw score is already at or below the worst-top-fit value),
nothing changes. When it *is* binding, the capped score is nudged up by at most 10% of the gap between
the floor and the raw score — enough to break ties between archetypes capped at the same value for
different reasons, while preserving Step 2.5's core guarantee: an archetype can never come close to
escaping a bad match on its own defining trait through secondary-dimension agreement. A "0.5 nudged by
10% of a large gap" still reads as roughly the same percentage on the results page; it just stops being
bit-for-bit identical to three other archetypes' scores for unrelated reasons.

## Step 3 — Ranking

Sort archetypes descending by `fitScore`. The result page shows the ranked list (PLAN.md Phase 5
spec); no arbitrary top-N cutoff — show all 18 (or fewer, per Step 2's exclusion) with the score
visible, since a user's #4 match may still be a legitimate option worth knowing about.

## Step 4 — Explainability ("why you matched")

For the top-ranked archetypes shown with a "why" explanation, compute each answered dimension's
**contribution**:

```
contribution(d) = A[d].weight * fit(d)
```

The **top 3 contributing dimensions** are the 3 answered dimensions with the highest `contribution(d)`,
tie-broken by `A[d].weight` descending (prefer citing a dimension the archetype cares more about, if
two contribute equally). These are the dimensions surfaced in result copy as "you matched because
your {dimension} profile closely fits {archetype}'s {dimension} demands" (Phase 3's results-copy
template slots for top contributing dimensions reference this exact computation).

This is deliberately **not** the same as "dimensions with the highest weight" — a high-weight
dimension the user scored badly on is not something they matched *because of*; it's excluded from
"why you matched" and instead becomes a growth-area candidate (Step 5).

## Step 5 — Growth areas ("fit with gaps")

For the top-ranked archetypes, compute each answered dimension's **gap**:

```
gap(d) = A[d].weight * (1 - fit(d))
```

The **top 2-3 growth-area dimensions** are the answered dimensions with the highest `gap(d)` above a
floor threshold (`gap(d) > 0.15`, i.e., excludes near-misses too small to be worth surfacing). These
are shown as "growth areas" in Phase 3's results copy: "{archetype} typically expects more
{dimension} than your answers suggest — here's what that gap looks like in practice and how to test
whether it's a real mismatch or just unfamiliarity" (ties into Phase 3's "how to test this cheaply"
copy slots, e.g. "shadow an SE call").

If a top-ranked archetype has **no** dimension clearing the `gap(d) > 0.15` floor, its result copy
should say so plainly ("no significant gaps identified") rather than force a growth-area callout that
doesn't exist — an empty growth-areas list is a valid, meaningful output, not a bug to paper over.

This mechanism is also how the algorithm satisfies PLAN.md's requirement to "distinguish 'great fit'
from 'fit with gaps'": a **great fit** is a high `fitScore` (Step 2) **and** no large individual
`gap(d)` (Step 5); a **fit with gaps** is a moderate-to-high `fitScore` that is being pulled down by
one or two specific, nameable gaps rather than uniform mediocre fit across the board. The UI/copy
layer should distinguish these two cases explicitly rather than only showing a single percentage.

## Determinism & testability

The whole algorithm is pure arithmetic over two plain-object inputs (`U`, `A`) with no randomness, no
external calls, and no hidden state — every step above is directly unit-testable:

- `fit(d)`, `fitScore`, `contribution(d)`, and `gap(d)` are each independently testable pure functions.
- Phase 2's synthetic personas (`docs/research/validation-v1.md`) are the canonical fixture set:
  each persona is a fully-specified `U` vector; the expected top-3 ranked archetypes and the
  expected top-contributing dimensions for the #1 match are recorded as assertions.
- Phase 5's scoring engine module (`app/lib/scoring.ts` or equivalent) must implement exactly this
  spec — if the two ever diverge, the persona fixtures are the arbiter of correctness, and this
  document is the one to update if intentional scoring-behavior changes are made (with a taxonomy
  version bump per PLAN.md's Agent execution notes, since a scoring algorithm change is
  taxonomy-versioned the same way a data change is).

## Known limitations (documented rather than silently accepted)

- **Linear distance — FIXED in v1.5 (Step 1).** v1 treated a 2-point gap as exactly twice as bad as
  a 1-point gap. This was flagged from the start as an assumption, not a proven-optimal choice.
  v1.5 replaced it with a squared-distance penalty (see Step 1), so a 2-point gap now costs 4× a
  1-point gap: large mismatches hurt disproportionately more than small ones, which is the
  discriminating behavior we want. Retained here as a record of what changed and why.
- **The squared penalty reads more generously on small per-dimension gaps.** Because the penalty
  curve is convex (below the old linear line for every gap between 0 and 4), absolute fit scores sit
  higher than under v1's linear model — most visibly for lukewarm profiles (e.g. an all-neutral
  answer set, every gap ≤ 2, now reads in the 0.75–0.95 band rather than clustering at 0.50). This is
  the intended flip side of "small mismatches are near-noise," and it does not affect the *floor's*
  disqualifying power (an archetype the user mismatches on its defining trait is still capped — just
  at 0.75 for a 2-point defining-trait gap, where v1 capped at 0.50). Ranking discrimination on large
  mismatches is preserved and sharpened. The open item is *display calibration* — whether the raw
  `fitScore` percentage shown to users should be normalized (e.g. against the spread of that user's
  own ranked archetypes) so a 90% reads as "strong relative fit," not "you are 90% of this role." That
  is a results-copy/UI concern (Phase 6 beta signal: does the headline percentage feel right?), not a
  ranking-correctness one.
- **Skipped-dimension renormalization assumes remaining answered dimensions are still representative**
  of the archetype's overall shape. A user who skips most high-weight dimensions for an archetype
  gets a fitScore computed from whatever's left, which may not be very meaningful — this is why
  Step 2 excludes archetypes below a `totalWeight` floor rather than scoring them on thin signal, but
  the floor itself (currently: `totalWeight == 0`, i.e., only fully-blank archetypes excluded) is a
  conservative first cut. If beta feedback shows partial-signal scores feel unreliable, raise this
  floor (e.g., require `totalWeight >= 0.5 * archetype's full totalWeight`) in v1.1.
- **No inter-dimension correlation modeling.** Each dimension is scored independently; the algorithm
  doesn't know that, e.g., `oncall_incident_appetite` and `interrupt_tolerance` tend to co-occur. This
  is intentional simplicity for v1 (per PLAN.md's "no black-box ML" sequencing principle) — a
  transparent linear model over documented dimensions is the explicit product bet over the phase
  boundary, with v2's crowdsourced calibration (Phase 8) as the intended place to revisit this if
  linear scoring proves too coarse.
- **Dilution-by-low-weight-agreement — FIXED in v1.1 (Step 2.5).** Originally found during Phase 2
  persona validation (`docs/research/validation-v1.md` Finding 1) and left as a documented risk
  rather than fixed, on the reasoning that it hadn't yet bitten a real case. It did: a real user's
  result ranked Security Engineer #4 despite a mediocre match on `adversarial_threat_modeling` (its
  only weight-1.0 dimension), propped up by broad agreement on several lower-weight dimensions. The
  top-dimension floor (Step 2.5) now caps an archetype's score at its fit on that archetype's own
  most heavily-weighted dimension(s), closing this gap structurally. Retained here as a record of
  what was found and why the fix works, per the project's practice of not silently deleting
  documented limitations once they're addressed.
- **The top-dimension floor (Step 2.5) is itself a new, less-tested mechanism.** It was validated
  against the Phase 2 persona suite (re-run after adding it — see `app/lib/scoring.test.ts`) and the
  specific real case that motivated it, but has not yet been exercised against a large volume of real
  user profiles the way the base weighted-average has. If Phase 6 beta feedback shows the floor is
  too aggressive (demoting archetypes that should still rank respectably despite one weak dimension)
  or not aggressive enough, the threshold logic (currently a hard `min()`, not a softened blend) is
  the first thing to revisit.
