# 40 pre-existing COPY_RULES.md violations

## Problem

`npm run lint:copy-rules -- data/archetypes.json data/comp-structure.json data/comp-by-tier.json
data/archetype-job-examples.json data/results-copy.json content/results-copy app` (run from
`app/`) currently fails with **40 banned-pattern matches and 5 warnings across 9 files**.
`COPY_RULES.md` states zero matches are required, no exceptions.

**Confirmed none of this is a regression from `archetype-comparison-redesign`** — every flagged
line was checked against `git diff` for that branch and none fall on lines it touches (two files,
`app/app/archetypes/[id]/page.tsx:63` and `app/app/results/ResultsClient.tsx:127`, appear in the
failure list but are pre-existing code comments untouched by this branch's diff). This is
inherited debt, not new debt — safe to clean up on its own timeline, separately from any branch
that happens to touch these files next.

## Where it is (40 matches)

| File | Matches | Dominant pattern(s) |
|---|---|---|
| `data/archetype-job-examples.json` | 22 | 15× `root cause`, 3× `legacy`, 2× `real user`, 1× `previously`, 1× a stray `[1-5]`-class match |
| `app/personas/page.tsx` | 5 | `v1` / `docs/research/...` path leaking into rendered copy (references `persona-suite-v1.md`) |
| `data/results-copy.json` | 4 | `root cause` (×3), `legacy` (×1) — plus 2 more instances of `not yet` that are WARN-only (see below) |
| `app/results/ResultsClient.tsx` | 2 | `v1` / `v1.6` in a code comment (line 127) |
| `content/results-copy/data-engineer.md` | 2 | `root cause` (×2) |
| `app/admin/beta/page.tsx` | 2 | `Phase \d` (×2, "Phase 6 pre-launch survey") |
| `content/results-copy/embedded-iot-engineer.md` | 1 | `legacy` |
| `content/results-copy/customer-support-solutions-engineer.md` | 1 | `root cause` |
| `app/archetypes/[id]/page.tsx` | 1 | `Phase \d` in a code comment (line 63, `// Phase 8 "Rate this role" widget.`) |

Plus 5 warnings (not failures — `not yet` / `future version` outside a roadmap section) in
`data/results-copy.json` (×2), `content/results-copy/embedded-iot-engineer.md`,
`content/results-copy/security-engineer.md`, and `app/methodology/page.tsx`. Warnings don't fail
the gate but are worth a look in the same pass since they're the same class of issue.

Reproduce the exact current list any time with the command above — line numbers will drift as
other work touches these files, so re-run it fresh rather than trusting this table verbatim.

## What "done" looks like

Per `COPY_RULES.md`'s own process: for each match, rewrite to state the current fact, delete the
process/history narration, no exceptions. The dominant pattern (`root cause`, 15+4+2+1 = 22 of the
40) is almost entirely in `results-copy`-style content narrating incident-response process
language pulled verbatim from job postings — check whether these are meant to be direct quotes
from postings (in which case COPY_RULES.md's banned-pattern list may need a documented exception
for quoted source text) or paraphrased prose that should avoid the phrase per the rules. That
distinction matters and isn't obvious from the lint tool alone — read `COPY_RULES.md`'s "Process
for any copy change" section before touching content, and if a banned pattern turns out to be
genuinely unavoidable (e.g. inside a literal quoted posting snippet), stop and ask a human rather
than silently exempting it, same as the rules file says.

The two code-comment matches (`Phase \d` in `admin/beta/page.tsx` and `archetypes/[id]/page.tsx`,
`v1.6` in `ResultsClient.tsx`) are comments, not rendered strings — confirm they never reach a
component's JSX/string output before deciding whether they even need to change; `COPY_RULES.md`'s
stated scope is "all files whose string content can reach a browser," and a stripped build
comment doesn't. If genuinely inert, this may be a case for narrowing the lint tool's scope
(skip comments) rather than editing the comments — flag that as an option, don't assume.

Validate with the same `npm run lint:copy-rules` invocation until it returns "0 banned-pattern
match(es)".

## Do not

Don't blanket-find-and-replace the banned words without reading each occurrence in context —
some of `COPY_RULES.md`'s table-driven rewrites (e.g. "Anduril's share... dropped from 26% to
23%" → "Anduril is the largest contributor...") require understanding what the sentence is
actually trying to say, not just deleting the flagged phrase.
