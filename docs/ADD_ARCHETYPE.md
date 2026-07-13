# Adding a new archetype

A repeatable runbook for adding archetype N+1 to the taxonomy. All 18 existing
archetypes are scored **independently** by `rankArchetypes()` in
[`app/lib/scoring.ts`](../app/lib/scoring.ts) — adding one never requires
rebalancing the others' weights. The risk isn't math, it's coverage: ten
files need a new entry (including `taxonomy/title-classification-rubric.json`,
which silently drops postings for any archetype it has no entry for — see
Stage 4), six copy locations state the total count, and — until Stage 4
below was built — nothing ever reclassified historical postings or
regenerated the app's comp data after a rubric change, so a split archetype's
donor (e.g. Full-Stack, if Frontend/UI were carved out of it) would silently
keep serving stale numbers forever. This runbook plus the scripts referenced
below close that gap.

**Path note:** the repo root (`careerguru/`) and the app (`careerguru/app/`)
each have their own `scripts/` directory. Root `scripts/` holds
`validate-comp-data.ts`, `validate-source-audit.ts`, and
`compute-dimension-correlations.js`. `app/scripts/` holds everything else
referenced in this runbook: `extract-comp-signals.py`,
`extract-comp-signals-by-tier.py`, `synthesize-comp-data.py`,
`generate-results-copy.mjs`, `lint-copy-rules.mjs`, and
`workflows/comp-by-tier-tier-gapfill.js`. `docs/research/job-postings-corpus/`
(repo root) holds `classify.py`, `harvest.py`, `build-by-archetype.py`, and
`taxonomy/title-classification-rubric.json` (repo root, not inside `docs/`).
Commands below say which directory to run from — don't assume `app/` cwd for
repo-root scripts, and don't assume repo-root cwd for `app/scripts/` ones (an
earlier version of this runbook got this backwards for the comp-extraction
scripts — fixed here).

## Stage 0 — Market trigger (no artifact)

Make the case in prose, not data: is this a distinct, commonly-posted title
with its own interview loop and career ladder — not just a lean/variant of an
existing archetype? (Precedent: Mobile Engineer and Platform/Infrastructure
Engineer are both carved-out specialist archetypes; a lean that never gets
its own posting volume or interview loop stays a variant inside an existing
archetype instead, the way frontend/backend/generalist currently coexist
inside Product/Full-Stack.) This is a judgment call — don't skip it, don't
automate it.

## Stage 1 — Taxonomy definition (the judgment gate)

**This is the one stage in this runbook that is not mechanical.** Everything
downstream is generated from or validated against this file, so get it
reviewed, not rubber-stamped.

Add an entry to [`app/data/archetypes.json`](../app/data/archetypes.json)
matching the existing shape:

```json
{
  "id": "kebab-case-id",
  "name": "Display Name",
  "confidence": "high" | "medium",
  "defining_dimension": ["dimension_id", ...],
  "scores": {
    "<every dimension id in dimensions.json>": {
      "target": 1-5,
      "weight": 0-1,
      "rationale": "one sentence, evidence-grounded, matches the voice of the other 18 entries"
    }
  }
}
```

Draft it AI-assisted (have an agent draft targets/weights/rationale calibrated
against the existing 18 for scale consistency), but a human must approve it —
this file directly determines what every future quiz-taker gets matched to.

Every dimension in `app/data/dimensions.json` must get a score; the
`taxonomy-integrity` test (Stage 8) enforces this but review it by eye first.

## Stage 2 — Cannibalization check (quiz scoring — already built, just run it)

Adding an archetype can silently steal quiz matches from an adjacent one (a
new Frontend/UI archetype should pull from Product/Full-Stack, and should
*not* unintentionally pull from Mobile or Platform/Infrastructure). This is
already instrumented — don't build a new script, run the existing one:

```
cd app
npm run personas:report
```

This recomputes all 18 (soon 19) personas in
[`lib/personas.ts`](../app/lib/personas.ts) against the real scoring
pipeline and diffs against the committed baseline
(`lib/personas.snapshot.json`), flagging any persona that dropped out of its
archetype's top 3. Investigate every flag before proceeding — a drop means
the new archetype is miscalibrated relative to an existing one, back to
Stage 1.

Once the diff is reviewed and accepted (including the new persona added in
Stage 3), refresh the baseline:

```
npm run personas:snapshot
```

## Stage 3 — Persona coverage

Add at least one new persona to `app/lib/personas.ts` representing the new
archetype's ideal profile (reverse-mapped from its own `scores` targets onto
real question options in `app/data/questions.json`, per the method already
documented in the file's header comment). Run:

```
npm test
```

to confirm `lib/personas.test.ts` and `lib/degenerate-personas.test.ts` pass
with the new persona included.

## Stage 4 — Classification, job examples, and comp data (full pipeline)

This is the sequence that used to be two disconnected stages (classify, then
comp data) with no way for a rubric change to retroactively reach historical
postings or the app's comp files. It's now one ordered sequence — run all of
it, in order, every time, even for changes that look additive-only:

**4a. Add the rubric entry.** `classify.py` does not classify against
`archetypes.json` — it matches titles against
`taxonomy/title-classification-rubric.json` (repo root), a separate rubric
iterated in ascending `priority` order; a title matching none of the
existing entries' `positive_patterns` falls through to `UNCLASSIFIED` and is
silently dropped. Add a new entry: `id`, `priority` (where it should slot
relative to archetypes it could be confused with), `positive_patterns`
(Python `re.IGNORECASE` regex list), `negative_patterns`, and a
`disambiguation_note` — follow the style of the existing entries. Check
`known_ambiguous_titles` in the same file for anything that should route to
manual review instead of auto-classifying into the new archetype.

**4b. Reclassify everything, not just new postings.** `classify()` is a pure
function of `(title, company, rubric)`, but the incremental `--wave` mode
skips anything already seen — a rubric change never reaches historical
postings unless you force it:

```
python3 docs/research/job-postings-corpus/classify.py --reclassify-all   # from repo root
```

This rewrites `classified_postings.jsonl` and `seen_postings_index.jsonl`
from every wave's raw postings against the *current* rubric, and prints a
**blast-radius report**: every archetype whose postings count changed,
before -> after. This is your authoritative list for the rest of Stage 4 and
for Stage 5 — write it down, every archetype named here needs its comp data
and results-copy re-reviewed, not just the new one. Running this with no
rubric change should report zero deltas (regenerating the current corpus
with a tiny number of legacy duplicate-title exceptions is expected — see
the script's own docstring); a real rubric change should show the new
archetype gaining postings and, if this was a split, the donor archetype
losing exactly that many.

**4c. Rebuild the by-archetype corpus:**

```
python3 app/scripts/build-by-archetype.py   # from repo root
```

Confirm `docs/research/job-postings-corpus/by-archetype/<new-id>.jsonl` has
non-trivial volume before relying on it downstream. If volume is thin,
that's a rubric-pattern problem (patterns too narrow) or a genuine
market-scarcity signal (worth noting back in Stage 0) — not something to
force by loosening `always_exclude_patterns`.

**4d. Re-extract comp signals for every archetype** (cheap, deterministic,
always run both, not just for the changed ones):

```
cd app
python3 scripts/extract-comp-signals.py
python3 scripts/extract-comp-signals-by-tier.py
```

`extract-comp-signals-by-tier.py` only processes archetypes with a
low-confidence cell in `comp-by-tier.json` — computed dynamically each run,
not a hardcoded list (it used to be; the hardcoded version had already
drifted stale by the time this was fixed). Run Stage 4e first so the new/
changed archetypes actually show up as low-confidence and get picked up
here.

**4e. Synthesize the app-facing comp files** (the step that didn't exist
before this runbook revision — this is what actually makes 4b/4d's changes
reach the live app):

```
python3 scripts/synthesize-comp-data.py --changed-archetypes <comma-separated ids from Stage 4b's blast-radius report>
```

Fully regenerates `app/data/comp-structure.json` from the fresh extraction
(deterministic, all 18+ archetypes, every run). For `app/data/comp-by-tier.json`:
downgrades every cell of each `--changed-archetypes` id to `confidence: "low"`
(numbers untouched — deciding new numbers is Stage 4f's job, not this
script's), and seeds a fresh 20-cell `confidence: "low"` grid for any
archetype that has no `comp-by-tier.json` entry at all yet (a genuinely new
archetype). **Review the comp-structure.json diff before committing it** —
it reflects real corpus data, not a curator's prior judgment calls, and can
legitimately move existing archetypes' numbers even when only one archetype
was added.

**4f. Gapfill the now-low-confidence cells.** This is a Workflow script, not
a plain Node script — it uses the `agent()`/`parallel()` orchestration
primitives, so it has to be run through the Workflow tool, e.g.
`Workflow({ scriptPath: "app/scripts/workflows/comp-by-tier-tier-gapfill.js" })`,
not `node app/scripts/workflows/comp-by-tier-tier-gapfill.js`. It computes
the current low-confidence archetype list dynamically (a leading agent call
reads `comp-by-tier.json` fresh — same fix as 4d, no hardcoded list to go
stale), then does AI-assisted research to raise each cell to `medium`/`high`
with real per-tier-per-level anchors, citing sources. This step consumes
real tokens (a WebSearch/WebFetch-heavy multi-agent pass) — confirm with
whoever's running the pipeline before triggering it, same as any other
Workflow invocation.

**4g. Validate:**

```
cd .. && npx ts-node --compiler-options '{"module":"commonjs"}' scripts/validate-comp-data.ts
# or: node --experimental-strip-types scripts/validate-comp-data.ts
```

Confirms `comp-by-tier.json` is still structurally valid (monotonic
percentile bands, all cells present).

## Stage 5 — Results copy

Every archetype named in Stage 4b's blast-radius report needs its
`content/results-copy/<id>.md` reviewed — not just the new archetype's.
`content/results-copy/*.md` is hand-written prose citing specific numbers
and companies from the corpus at write-time; nothing regenerates it
automatically, so a donor archetype's copy silently goes stale after a
split unless someone re-reads it against the new corpus.

For the new archetype: write `app/content/results-copy/<new-id>.md` with the
six required headings (`What this role actually is`, `Why you matched`,
`A day in this role`, `Comp structure`, `Growth areas — if this wasn't a
perfect fit`, `How to test this cheaply`) — copy the structure from an
existing file, e.g.
`app/content/results-copy/product-full-stack-software-engineer.md`.

**Every sentence must pass COPY_RULES.md.** AI-drafted against real postings
data from Stage 4, human-reviewed — this is not a stage to fully automate,
per `app/COPY_RULES.md`'s own instructions. Then compile:

```
cd app
npm run results-copy:generate
```

Run the linter (Stage 6) on every touched file before considering this
stage done.

## Stage 6 — Copy-rules linter

`app/COPY_RULES.md`'s banned-pattern list is regex-able and was never
enforced by anything but manual review — that's how the same violation class
(process/versioning narration leaking into product copy) shipped repeatedly
per the file's own changelog. Run it against anything touched in Stages 1
and 5:

```
cd app
npm run lint:copy-rules -- <path> [<path> ...]
# or lint everything in scope:
npm run lint:copy-rules -- data/archetypes.json data/comp-structure.json data/archetype-job-examples.json data/results-copy.json content/results-copy app
```

Zero matches required, no exceptions (matching the copy rules file's own
standard). If a banned pattern is genuinely unavoidable, stop and ask a human
rather than shipping it — same as the rules file already says.

## Stage 7 — Hardcoded count sweep

Six places state the archetype count in prose (not computed from data —
grepping bare `18` also matches unrelated Tailwind `mb-[18px]` classes, so
check these exact locations, don't blind-grep):

- `app/app/page.tsx:54` — "fractured ... into 18 careers"
- `app/app/assessment/page.tsx:104` — "against 18 role archetypes"
- `app/app/methodology/page.tsx:38` — "Where the 18 archetypes came from"
- `app/app/methodology/page.tsx:42` — `<StatTile value="13 of 18" />`
  (postings-coverage stat — also update the numerator if the new archetype
  starts under/over the 200-posting threshold this stat tracks)
- `app/app/methodology/page.tsx:53` — "classified those postings into the 18 archetypes"
- `app/app/methodology/page.tsx:144` — "across all 18 archetypes"
- `app/app/methodology/page.tsx:181` — "all 18 archetypes and break total compensation"
- `app/components/ShareBar.tsx:53` — "all 18 archetypes are public"

Update each to 19. Longer term, replace these literals with
`archetypes.length` computed from `lib/taxonomy.ts` so this class of miss
can't recur — worth doing opportunistically next time one of these files is
touched, not blocking for this runbook.

## Stage 8 — Full validation gate

All of these must pass before the new archetype ships:

```
cd app
npm test                                       # taxonomy-integrity, scoring, personas, degenerate-personas, assessment-flow, encode, equityCalc
npm run lint
npm run personas:report                        # Stage 2, re-run after all changes land — no drops out of top 3
npm run corpus:report                          # corpus-side drift check — every archetype named in Stage 4b's
                                                #   blast-radius report should show as expected drift here; anything
                                                #   else flags an unreviewed corpus change
npm run lint:copy-rules -- <changed paths>      # Stage 6
```

Once `corpus:report`'s drift is reviewed and expected, accept the new
baseline: `npm run corpus:snapshot`.

There is no CI in this repo (no `.github/workflows`) — these are run
manually before merge. If that changes, wire this exact command list in as
the gate.
