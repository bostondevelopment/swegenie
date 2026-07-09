# Scoring Algorithm Spec (v1.0)

**Status:** Phase 2 deliverable. This is the spec Phase 5's scoring engine (`app/`) implements as a
pure, unit-tested module. Phase 2's persona validation (`docs/research/validation-v1.md`) exercises
this exact algorithm by hand/spreadsheet before any code is written, per PLAN.md's "Done when"
criteria for this phase.

## Inputs

1. **User profile vector** `U`: one integer 1-5 per dimension id in `taxonomy/dimensions.json`,
   collected via the Phase 3 assessment. A dimension may be `null` if the user skipped every
   question mapping to it (Phase 3's flow explicitly allows "skip/unsure").
2. **Archetype profile** `A` (one entry in `taxonomy/archetypes.json`): for each dimension id, a
   `target` (1-5) and a `weight` (0.0-1.0).

Both are keyed by the same 16 dimension ids — this is the data contract between `/taxonomy/*.json`
and the scoring engine; a schema change to either file requires a taxonomy version bump (per
PLAN.md's Agent execution notes).

## Step 1 — Per-dimension fit

For each dimension `d` where the user answered (`U[d] != null`):

```
distance(d)  = abs(U[d] - A[d].target)          // 0..4 on a 1-5 scale
fit(d)       = 1 - distance(d) / 4              // 1.0 = exact match, 0.0 = maximally opposite
```

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

## Known limitations (v1, documented rather than silently accepted)

- **Linear distance is a modeling choice, not a proven-optimal one.** Treating a 2-point gap as
  exactly twice as bad as a 1-point gap is an assumption; Phase 6 beta feedback (does the #1 match
  feel right?) is the intended calibration signal for whether this needs to become non-linear
  (e.g., penalize gaps on high-weight dimensions super-linearly) in v1.1.
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
- **Dilution-by-low-weight-agreement (found during persona validation, see
  `docs/research/validation-v1.md` Finding 1).** Because Step 2 is a weighted *average*, an archetype
  whose non-defining dimensions happen to align with a user's incidental answers can out-rank an
  archetype whose one truly defining dimension the user mismatches on, if that archetype's remaining
  weights are spread thin across many low-weight dimensions. A concrete case: a user who scores low
  on Platform Engineering's single highest-weight dimension (`stakeholder_client_comfort`) can still
  rank a low-stakeholder-weighted archetype like Mobile Engineer above Platform, if their other
  answers happen to match Mobile's low-weighted dimensions well. This is the first mechanism to
  suspect if Phase 6 beta data shows real users' actual roles aren't appearing in their top-3 — a
  candidate v1.1 fix is a minimum-fit floor on an archetype's single highest-weight dimension (e.g.,
  if `fit(d) < 0.3` for the dimension with the highest `weight` in an archetype's profile, cap that
  archetype's displayed rank regardless of aggregate `fitScore`), not just relying on the aggregate.
