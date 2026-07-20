# Management as an orthogonal modifier, not a standalone archetype

**Status update (2026-07-17): the immediate-inconsistency fix described below as "decided" has
since shipped.** `engineering-management` was removed as a standalone archetype in commit
`b907fcf` (2026-07-16) — `data/archetypes.json` now has 17 entries, all IC lanes, with no
management peer. The "orthogonal modifier" idea that follows is **still open, unbuilt work** —
nothing in this doc's "What 'done' looks like" section has been started. The "Problem" section
below is kept in its original present tense as the historical rationale for *why* EM was removed;
read "today" in it as "as of 2026-07-16, before the fix."

## Problem (as of 2026-07-16, before the fix shipped)

At the time this was written, `data/archetypes.json` had 18 entries: 17 individual-contributor
(IC) career lanes (Product/Full-Stack, SRE, Platform, Sales Engineer, Forward Deployed Engineer,
etc.) plus one `engineering-management` entry that behaved like an 18th peer archetype in
scoring, results, comp tables, and the compare page.

`engineering-management`'s content (`content/results-copy/engineering-management.md`,
`data/comp-structure.json`, `data/comp-by-tier.json`, `data/archetype-job-examples.json`) was
specifically **first-line software/product engineering management** — one team of 4–10
engineers, PR/architecture review rather than shipping, hiring, 1:1s. It said nothing about
managing an SRE team's on-call load, a Sales Engineering team's deal support, a Support
Engineering team's queue metrics, a DevRel team, etc. Every one of the other 17 IC lanes has
its own real, functionally distinct management path that wasn't modeled anywhere in the app.

Sitting as a peer to all 17 IC archetypes, `engineering-management` visually implied it was *the*
one management track available — which misrepresented the other 16 tracks' own management
ladders. See conversation on 2026-07-16 for the original critique (a friend flagged this) and
full discussion.

The decided fix for the immediate inconsistency was to **remove `engineering-management` as a
standalone archetype** (this app is scoped to "which IC lane fits you") — done, see the status
update above. This doc is the deferred, more ambitious alternative that was considered and
explicitly not pursued at the time: model "do you want to manage people" as an **orthogonal
modifier** layered on top of whichever IC archetype the user matches, using the existing
`people_management_orientation` dimension (`data/dimensions.json`), rather than as a competing
archetype. E.g. a Platform/Infra match with high management orientation surfaces "this track
also leads to Platform Engineering Management" as a callout; same for SRE, Sales Engineering,
Support Engineering, etc.

This is genuinely more correct than either the pre-fix state or the flat removal that actually
shipped, but "if done right" hides a large amount of net-new content and design work, not a
refactor of what exists. A research pass (2026-07-16) mapped the full blast radius; that map is
captured below so this can be picked up cold later.

## Why this isn't mechanical

The app's *code* is almost entirely archetype-count-agnostic — `lib/scoring.ts`,
`lib/taxonomy.ts`, the compare page, the homepage marquee, and `generateStaticParams` all just
iterate whatever's in `data/archetypes.json`. Nothing breaks from removing one entry. The real
work is that the modifier needs things that don't exist yet:

1. **Trigger/threshold logic (new)** — nothing today converts "the user scored high on
   `people_management_orientation`" into a UI callout. Needs a rule (hard cutoff vs. gradient)
   and a decision on where it renders (results page? a new section on each archetype page?).

2. **Per-archetype-family management copy (new content, not a redistribution)** — the current
   EM comp/day-in-the-life content is track-level and does not decompose per IC archetype.
   "Manage a Platform/Infra team" reads differently from "manage a Sales Engineering team" or
   "manage a Support Engineering team" — on-call ownership, quota-adjacency, and ticket metrics
   all differ. Doing this right means either (a) writing distinct management-callout copy per
   archetype family (comparable content-authoring scope to the original EM page, ×~5-8 families
   instead of ×1), or (b) shipping a deliberately generic callout that's explicit about varying
   by domain — which is a real, honest fallback but a much smaller win than "even more
   powerful."

3. **Comp story (new sourcing)** — the only sourced comp data for *any* management path today
   is `engineering-management`'s (Manager/Senior Manager/Director+ levels, 124 companies). A
   true per-archetype-family modifier needs comp data sourced per family (e.g. Sales
   Engineering Manager comp, SRE Manager comp) — a real job-board sourcing project, not a
   reshuffle of existing rows. The alternative is keeping one shared management comp table
   regardless of which IC lane the user came from, which is honest but doesn't fully deliver
   the "even more powerful" version of this idea.

4. **Scoring model decision** — `people_management_orientation` is currently scored as a mild
   *negative* signal for 16 of 17 IC archetypes (`target: 1-2`) since wanting to manage
   currently drags IC fit down (only `engineering-management` has `target: 5, weight: 1`,
   marked as its `defining_dimension`). Under the modifier model, decide whether this dimension
   stays a negative in the IC score (a strong people-manager still lands an IC match, with a
   callout on top) or gets excluded from IC scoring entirely and evaluated purely as the
   modifier trigger. This is a methodology call, not plumbing — get sign-off before changing
   `data/archetypes.json` weights.

5. **Compare page** — `app/archetypes/compare/page.tsx` currently lists EM as a row (data-driven
   from `comp-by-tier.json`, no code change needed to remove it). Under the modifier model it
   either disappears from the comparison entirely, or the page needs a net-new concept (a
   "+ Management" toggle/column) that doesn't exist today.

## What "done" looks like

Not mechanical — same philosophy as `docs/ADD_ARCHETYPE.md`'s "taxonomy changes are the one
stage that isn't mechanical, reviewed by a human." Start with a written recommendation, not
code:

1. Decide the trigger rule for the callout (threshold on `people_management_orientation`,
   gradient vs. cutoff) and where it surfaces in the UI.
2. Decide the scoring treatment of `people_management_orientation` in IC fit (keep as mild
   negative vs. exclude from IC scoring).
3. Decide the content strategy: full per-archetype-family management copy (biggest lift,
   biggest payoff) vs. one generic callout across all 17 (small lift, weaker payoff). This
   determines whether new comp sourcing is required per family or a single shared table
   suffices.
4. If per-family copy is chosen, scope it like a new-archetype content pass per family — see
   `docs/ADD_ARCHETYPE.md` for the existing pattern/pipeline for authoring archetype content,
   since the same research-brief → weighted-dimensions → results-copy pipeline likely applies.
5. Prototype on a single archetype family first (spike) before committing to all 17 — cheap way
   to test whether the callout actually reads better than a shared EM page did.

## Do not

Don't bolt a single generic "you also like managing people" callout onto all 17 archetypes and
call it done — that recreates the original problem (implying one generic management flavor)
at smaller scale, just with better plumbing. If the content-authoring investment for real
per-family differentiation isn't approved, a shared/generic callout is an honest fallback, but
say so explicitly in the copy rather than implying domain-specific depth that isn't there.
