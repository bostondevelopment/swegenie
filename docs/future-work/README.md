# Future work

Deferred items from the levels.fyi comp-data audit and the `archetype-comparison-redesign`
branch launch-readiness check (2026-07-13). None of these block that branch's launch — they
were explicitly scoped out so the launch wouldn't wait on them. One folder per item; each
`README.md` is written to be picked up cold by an agent with no prior context on this
conversation — it states the problem, the exact files involved, and what "done" looks like.

| Item | Size | Blocking? |
|---|---|---|
| [staff-bucket-leveling-split](staff-bucket-leveling-split/README.md) | Medium — schema + research + UI | No — editorial call, needs human sign-off first |
| [thin-comp-cells-early-stage](thin-comp-cells-early-stage/README.md) | Small, recurring | No — legitimately thin markets, not a bug |
| [staff-cross-slug-rename](staff-cross-slug-rename/README.md) | Small | No — cosmetic |
| [copy-rules-debt-cleanup](copy-rules-debt-cleanup/README.md) | Medium — spans ~9 files | No — pre-existing, not introduced by this branch |

None of these are scheduled or cron'd. Pick them up manually, one at a time, whenever there's
room for them — same as the rest of this repo's data-refresh work
(see [`docs/ADD_ARCHETYPE.md`](../ADD_ARCHETYPE.md) Stage 4f for the pattern).
