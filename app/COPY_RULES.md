# Copy rules

This product should always read like a finished, confident product — the way an
Apple product page reads. It never explains its own history, admits its own
bugs, or narrates the process that produced a number. These rules are
mandatory for every agent touching any string that renders to a user,
including strings inside `data/*.json` and `content/**/*.md` — not just
`.tsx` files. Violating these rules is a bug, same tier as a broken build.

They exist because this exact class of mistake has shipped repeatedly: prose
in `data/comp-structure.json` and `data/archetypes.json` narrating internal
QA, weight tuning, and fetch failures directly to end users, multiple times,
even after being told to fix it. Follow them without exception.

## The one-sentence test

Before writing or approving any user-facing string, ask: **"Would this
sentence make sense if the product had been built this way from day one, with
no prior version and no visible mistakes?"** If the sentence only makes sense
by referencing a past state, a correction, a search that failed, or a
process that ran — rewrite it to state the current fact and delete the rest.

## Banned patterns

Grep the diff for these before considering any copy task done (case-insensitive):

**Versioning / product-history language**
`v1\b`, `v1\.[0-9]`, `since v1`, `earlier version`, `prior version`, `prior pass`,
`previously`, `used to be`, `has grown since`, `has evolved`, `iterated on`,
`in an earlier`, `originally`, `legacy`, `we used to`, `carried forward from`

**Retraction / self-correction narration**
`was not supported by`, `has been removed`, `was removed`, `earlier claim`,
`no longer accurate`, `corrected from`, `was wrong`, `turned out to be`,
`in retrospect`, `we found that`, `on reflection`, `was inaccurate`,
`mistakenly`, `erroneously`

**Before/after diff narration**
`dropped from .* to`, `rose from .* to`, `improved from .* to`,
`now rests on` (implying "vs. before"), `no longer resting on`,
`newly-added`, `newly added`, `unchanged from`, `\d+% to \d+%` used as a delta,
`X->Y` / `X→Y` arrow notation describing a change over time

**Internal QA / bug-fix / process narration**
`targeted fix`, `root cause`, `mis-bucketed`, `regex matched`, `extraction error`,
`manually reclassified`, `is unreliable for this archetype`, `correcting`,
`flagged as a real .* limitation`, `weight raised`, `weight lowered`,
`weight is deliberately (raised|lowered)`

**Fetch / verification-process exposure**
Any HTTP status code (`403`, `404`, etc.), `re-fetch`, `refetch`, `redirect`,
`cached search`, `search-result snippet`, `could not be (independently )?verif`,
`confirmed live at`, `direct fetch`

**Internal artifacts leaking into copy**
`real user`, `bug report`, `regression test`, `synthetic persona`,
`persona validation`, `Phase \d`, references to internal test suites,
internal doc paths (`docs/research/...`, `taxonomy/...`), script/file names

**Search-effort narration**
`targeted search`, `turned up only`, `despite (targeted|repeated)`,
`found no additional`, `10+ (targeted )?queries`, describing *what was tried*
instead of just stating *what is true*

**Future/roadmap language outside the designated roadmap section**
`not yet`, `is now live`, `will be published`, `a future pass`,
`should revisit`, `future version` — these are fine ONLY inside a page's
explicit "What's next" / roadmap section. Everywhere else, state the present
tense capability or limitation, full stop.

## How to write it instead

State the current fact. If a number is thin or uncertain, say that plainly —
"this rests on 3 companies, read as directional" — without explaining how it
got to 3, what was tried and failed, or what it used to be.

| Instead of | Write |
|---|---|
| "The set has grown since v1: real-user results exposed gaps..." | Describe the current taxonomy's structure directly. |
| "...a deliberate improvement over an earlier linear model" | Describe the current mechanism; delete the comparison. |
| "This is a v1, expert-authored taxonomy" | "Weights are set by expert-authored research briefs." |
| "the earlier claim of a '70/30 split' was not supported... and has been removed" | State only the split that IS supported, or omit the field. |
| "Anduril's share... dropped from 26% to 23% after adding 9 new data points" | "Anduril is the largest contributor by a wide margin, more than 3x the next employer." |
| "...their Lever job pages returned HTTP 403 on direct fetch" | Omit. Either cite the figure or don't; never narrate the fetch. |
| "weight raised 0.5->0.7 in a targeted fix" | Describe why the current weight is what it is, as if it was always that way. |
| "a future pass should revisit whether this archetype needs to split" | Omit, or move to the roadmap section if genuinely planned. |
| "This result is from an older version" | "This result link has expired." |

## Repetition rule

Don't repeat a data point's sourcing justification (company counts, posting
counts, confidence caveats) next to every occurrence of that number. State it
once, in the canonical place (`/methodology`), and link to it from other
surfaces with a short pointer ("Sourcing & methodology →"). A number should
render clean; the "why should I trust this" answer lives in exactly one place.

## Process for any copy change

1. Identify every file the new/changed string could touch — including
   `data/*.json` fields, not just `.tsx`. A JSON field only matters if its
   string value is actually rendered; trace it to the JSX before assuming it's
   safe to leave alone, and trace it before assuming it's safe to write
   verbose internal content into (unrendered fields can still carry this
   junk if a future change wires them up — write ALL prose fields as if they
   will be rendered).
2. Write it clean the first time using the table above.
3. Before finishing, grep the full diff against the **Banned patterns**
   above. Zero matches, no exceptions.
4. If a banned pattern is genuinely unavoidable (rare), stop and ask the user
   rather than shipping it.

## Scope

Applies to all files whose string content can reach a browser: `app/**/*.tsx`,
`components/**/*.tsx`, `content/**/*.md`, and every string field in
`data/*.json` that is read by any component (`caveat`, `note`, `rationale`,
`whatThisIs`, `aDayInThisRole`, question/option labels, etc.) — including
fields generated by scripts in `scripts/` and any research/extraction
pipeline. If a script or agent generates `data/*.json` content, it must
comply with this file too; regenerating data is not an exemption.
