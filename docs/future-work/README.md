# Future work

Deferred items from the levels.fyi comp-data audit, the `archetype-comparison-redesign`
branch launch-readiness check (2026-07-13), and the engineering-management taxonomy review
(2026-07-16). None of these block anything currently in flight — they were explicitly scoped
out so other work wouldn't wait on them. One folder per item; each `README.md` is written to
be picked up cold by an agent with no prior context on this conversation — it states the
problem, the exact files involved, and what "done" looks like.

| Item | Size | Blocking? |
|---|---|---|
| [staff-bucket-leveling-split](staff-bucket-leveling-split/README.md) | Medium — schema + research + UI | No — editorial call, needs human sign-off first |
| [thin-comp-cells-early-stage](thin-comp-cells-early-stage/README.md) | Small, recurring | No — legitimately thin markets, not a bug |
| [copy-rules-debt-cleanup](copy-rules-debt-cleanup/README.md) | Medium — spans ~9 files | No — pre-existing, not introduced by this branch |
| [management-orthogonal-modifier](management-orthogonal-modifier/README.md) | Large — new content + comp sourcing + methodology decision per archetype family | No — deferred in favor of removing `engineering-management` as a standalone archetype now |
| [geography](geography/README.md) | Research only so far, no plan | No — exploratory; user asked for research before any scoping (2026-07-17) |

None of these are scheduled or cron'd. Pick them up manually, one at a time, whenever there's
room for them — same as the rest of this repo's data-refresh work
(see [`docs/ADD_ARCHETYPE.md`](../ADD_ARCHETYPE.md) Stage 4f for the pattern).

## Completed

| Item | Shipped | Notes |
|---|---|---|
| [entry-level-l1-l2-tiers](archive/entry-level-l1-l2-tiers/README.md) | 2026-07-19 | Added `L1`/`L2` tiers end-to-end (taxonomy, extraction, ~340-cell gapfill research, UI). See [`archive/entry-level-l1-l2-tiers/LESSONS-LEARNED.md`](archive/entry-level-l1-l2-tiers/LESSONS-LEARNED.md) before starting [staff-bucket-leveling-split](staff-bucket-leveling-split/README.md) — same class of problem at the other end of the ladder, and several mistakes are avoidable the second time. |
