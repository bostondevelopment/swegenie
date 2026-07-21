# Staff-bucket leveling split — Execution Plan

**Status as of 2026-07-21 (round 2):** Stages 1–4 are complete and uncommitted. Stage 3
(gapfill) Round 1 is now complete — 24 of 85 Principal cells are medium/high confidence; 61
are still low. Round 1 moved +15 cells from low (9 pre-existing non-low → 24 non-low). A
second gapfill round is possible but most remaining low cells are thin-by-design
(growth-stage-private: 17, early-stage: 17) or genuinely data-scarce specialized roles at
high-growth-public. Ready for browser-verify then commit.

---

## Stage 0 — Taxonomy decision *(skipped — implemented directly)*

The previous agent did not produce a formal Stage 0 taxonomy proposal before implementing. The
decisions that would have lived here are instead recorded below as implemented facts:

**Decision: Split `Staff` into `Staff` + `Principal`.** Applied uniformly across all 5 tiers
(a uniform 7th column at `early-stage`/`growth-stage-private` is expected to remain sparse —
same "legitimate to stay low" posture as thin-comp-cells-early-stage).

**Level definitions (as implemented in `comp.utils.ts` `LEVEL_YOE_LABELS`):**
- `Staff`: 14–20 yrs
- `Principal`: 20+ yrs

**Title routing (as implemented in `EXTRACTION_LEVEL_TO_TIER_LEVEL`):**

| Extraction bucket | Tier level |
|---|---|
| Entry (New Grad) | L1 |
| Junior/Associate | L2 |
| Mid (unspecified level) | L3 |
| Senior | L4 |
| Staff Engineer/Senior Staff | Staff |  ← was `"Senior/Staff"` → `"L4"` in old schema |
| Principal/Director+ (Manager/VP) | Principal |  ← new |

`L5` (10–14yr, staff-track) remains the one tier level with no direct extraction bucket — same
deliberate gap as after the L1/L2 project (see its LESSONS-LEARNED §1).

**`inferLevel()` YOE bands (as implemented in `ResultsClient.tsx`):**
L1 0–1yr, L2 1–3yr, L3 3–6yr, L4 6–10yr, L5 10–14yr, Staff 14–20yr, Principal 20+yr.

---

## Stage 1 — Extraction layer *(done)*

Files changed:

- **`app/scripts/extract-comp-signals-by-tier.py`** — `LEVEL_RULES` now has 6 buckets:
  `Staff Engineer/Senior Staff` (matches `\bstaff\b`) and
  `Principal/Director+ (Manager/VP)` (matches `vp|director|principal(?! engineer)|distinguished|chief`)
  are separate; `LEVELS` constant updated to include both.

- **`app/scripts/extract-comp-signals.py`** — same `LEVEL_RULES` change, same `LEVELS`
  constant. Both files are in sync as of this change (previously they had drifted).

- **`app/scripts/synthesize-comp-data.py`** — `EXTRACTION_LEVEL_TO_TIER_LEVEL` now maps 6
  extraction buckets to 7 tier levels (with `L5` intentionally left unbucketed, same as before).

- **`app/scripts/workflows/comp-by-tier-tier-gapfill.js`** — `LEVELS` updated to include
  `Principal`; gapfill prompt updated with:
  - "L1/L2/Principal cells: current numbers are a FLAT PLACEHOLDER"
  - Explicit anti-interpolation rule for the Principal/Staff boundary
  - H-1B mapping note updated: `Level IV ≈ Staff/Principal`
  - Synthesis cross-check: `Staff<Principal in magnitude within each tier`

- **`app/scripts/workflows/comp-by-tier-number-fix.js`** — minor update (level list).

---

## Stage 2 — Schema + data backfill *(done)*

- **`app/data/comp-by-tier.json`** — `"levels"` array updated to
  `["L1","L2","L3","L4","L5","Staff","Principal"]`; 85 new `Principal` cells added (17
  archetypes × 5 tiers). All 595 cells present; validated programmatically.

- Source archives created for 7 archetypes (38 `Principal` JSON files under
  `docs/research/source-archive/comp-by-tier/`):
  - `product-full-stack-software-engineer` (7 files: ai-labs × 2, faang-mag7 × 5)
  - `ml-engineer` (6 files: ai-labs × 2, faang-mag7 × 4)
  - `forward-deployed-engineer` (3 files: ai-labs × 3)
  - `technical-product-manager` (3 files: faang-mag7 × 3)
  - `mobile-engineer` (2 files: faang-mag7 × 2)
  - `sales-engineer-pre-sales` (2 files: faang-mag7 × 2)
  - `solutions-architect-vendor-side` (2 files: faang-mag7 × 2)

---

## Stage 3 — Gapfill *(Round 1 complete 2026-07-21; see Round 1 summary below)*

### Confidence integrity fix (2026-07-20)

A prior agent set 15 Principal cells to `medium` or `high` without creating corresponding
source archive files — violating the confidence rubric ("medium: ≥1 real named-company,
level-specific data point"). These were detected and downgraded to `low` on 2026-07-20:

| Archetype | Tier | Was |
|---|---|---|
| platform-infrastructure-engineer | ai-labs | medium |
| platform-infrastructure-engineer | faang-mag7 | high |
| sre-production-engineer | ai-labs | medium |
| sre-production-engineer | faang-mag7 | high |
| data-engineer | ai-labs | medium |
| data-engineer | faang-mag7 | medium |
| security-engineer | faang-mag7 | medium |
| solutions-architect-vendor-side | ai-labs | medium |
| solutions-architect-consulting | faang-mag7 | medium |
| forward-deployed-engineer | faang-mag7 | medium |
| forward-deployed-engineer | growth-stage-private | medium |
| customer-support-solutions-engineer | high-growth-public | medium |
| consulting-engineer-professional-services | faang-mag7 | medium |
| developer-relations-advocacy | faang-mag7 | medium |
| technical-product-manager | ai-labs | medium |

### Second confidence integrity fix (2026-07-21)

A second session upgraded 20 more Principal cells to `medium` without creating source archives
(same pattern as the 2026-07-20 fix). Additionally, 7 low-confidence cells had inverted
Principal base < Staff base due to errors in the original add-principal-cells.js script.
Both issues were corrected:

**Downgraded (no source archives):**
product-full-stack/high-growth-public, platform-infrastructure/faang-mag7,
platform-infrastructure/high-growth-public, sre/faang-mag7, sre/high-growth-public,
data-engineer/faang-mag7, data-engineer/high-growth-public, ml-engineer/high-growth-public,
mobile-engineer/high-growth-public, embedded-iot/faang-mag7, security/faang-mag7,
security/high-growth-public, sales-engineer/high-growth-public, sa-vendor-side/high-growth-public,
forward-deployed/faang-mag7, forward-deployed/high-growth-public,
consulting-eng/high-growth-public, devrel/faang-mag7, devrel/high-growth-public,
tpm/high-growth-public.

**Inversion fixes (Principal base was < Staff base — script errors, corrected to ~1.10–1.18×):**
sa-consulting/faang-mag7, consulting-eng/faang-mag7, tpm/ai-labs,
fde/growth-stage-private, sa-vendor-side/ai-labs (was 1.03×), fde/faang-mag7, devrel/faang-mag7.

Note: sales-engineer/faang-mag7 [high] and tpm/faang-mag7 [high] remain inverted — these
are intentional, backed by source archives showing the commercial/PM Principal track at
FAANG doesn't command higher base than Staff.

### Round 1 gapfill — complete (2026-07-21)

Ran parallel web research across faang-mag7 (11 low), ai-labs (14 low), and high-growth-public
(17 low). Growth-stage-private and early-stage left as thin-by-design (formal Principal titles
don't exist at those stages).

**Net result: 9 → 24 non-low cells (+15)**

| Tier | Before | After high | After medium | After low |
|---|---|---|---|---|
| ai-labs | high=1 medium=2 low=14 | high=2 | medium=8 | low=7 |
| faang-mag7 | high=5 medium=1 low=11 | high=8 | medium=5 | low=4 |
| high-growth-public | 0/0/17 | 0 | 1 | low=16 |
| growth-stage-private | 0/0/17 | 0 | 0 | low=17 |
| early-stage | 0/0/17 | 0 | 0 | low=17 |

**Source archives created:** 45 new files across 17 archetype directories.

**Key findings:**
- `security-engineer/faang-mag7` corrected from $380K→$298K base p50 — placeholder was ~27%
  inflated; Google L7 Security SWE official postings confirm $248K–$349K (same SWE band, no
  security premium).
- `security-engineer/ai-labs` upgraded to HIGH (2 direct job postings: OpenAI Principal Security
  $347K–$490K; Anthropic Staff+ AppSec $320K–$485K).
- `platform-infrastructure-engineer/ai-labs` corrected from $330K→$405K — placeholder was $75K
  too low.
- High-growth-public placeholders were systematically 20–35% above confirmed market base — appear
  to have been calibrated from total comp or Datadog-only (highest-paying outlier) data.

**2 new intentional inversions added** (same pattern as pre-existing sales-eng/tpm at faang-mag7):
- `solutions-architect-consulting/faang-mag7` [medium]: Principal $220K < Staff $243K — Amazon
  "Principal SA" is the top of the SA IC ladder at Amazon, so it anchors both the app's Staff and
  Principal tiers; no distinct level above it exists.
- `forward-deployed-engineer/faang-mag7` [medium]: Principal $235K < Staff $275K — commercial/FDE
  track where Amazon Principal SA ($226K) and Salesforce PTA ($185–248K) document that Principal
  FDE/CSE does not exceed Staff-level FAANG pay in the commercial function.

**Inversion resolution:** 4 high-growth-public cells were downgraded back to LOW (product SWE,
security, SA-vendor-side, TPM) because the inversion was a data artifact — Staff cells were
anchored on Block/Datadog/Reddit (higher-paying) while Principal research found Snowflake/Okta/
MongoDB (lower-paying). Numbers bumped to Staff×1.05 to maintain expected ordering, with LOW
confidence signaling the data quality.

**Integrity check passed** (2026-07-21): all 14 medium/high cells have ≥1 source archive file;
all 10 high cells have ≥2 source archive files.

### Current confidence state (post Round 1)

| Level | high | medium | low |
|---|---|---|---|
| Principal | 10 | 14 | 61 |

### Remaining low cells and next steps

61 low cells remain. Distribution:
- `growth-stage-private` (17): thin-by-design — formal Principal titles rare below ~200 engineers.
- `early-stage` (17): thin-by-design — no formal level structure.
- `high-growth-public` (16): mostly thin or data-artifact inversions. Only 1 cell (sales-engineer)
  has real sourced data. A second research pass is unlikely to yield more than 1–3 upgrades.
- `faang-mag7` (4 low): devrel, consulting-eng-ps, customer-support-eng, customer-support-solutions-
  eng — all commercial/support tracks without a formal Principal IC ladder at most FAANG companies.
- `ai-labs` (7 low): mobile, sre, data-eng, solutions-architect-consulting, customer-support
  (both), solutions-architect-consulting — mix of thin (customer-support at AI labs) and
  researchable (data-eng, sre) cells.

**Recommendation:** A second round targeting faang-mag7 (4 low) and ai-labs (7 low) remaining
cells could close 2–4 more cells. Growth-stage and early-stage are done. High-growth-public is
diminishing returns. Stop here unless Michael wants a second pass.

**Round cap:** The execution plan set a 2-round cap. If a second round is run, mark done after.

Run the "no source for medium/high" check after any future gapfill round:
  ```python
  # quick check — paste in shell
  python3 -c "
  import json, os
  with open('app/data/comp-by-tier.json') as f: d = json.load(f)
  ab = 'docs/research/source-archive/comp-by-tier'
  for aid, arch in d['archetypes'].items():
      for tid in d['tiers']:
          cell = arch[tid].get('Principal', {})
          if cell.get('confidence') in ('medium','high'):
              files = [f for f in os.listdir(f'{ab}/{aid}') if f.startswith(f'{tid}-Principal')] if os.path.isdir(f'{ab}/{aid}') else []
              if not files: print(f'NO SOURCE: {aid}/{tid}')
  "
  ```

---

## Stage 4 — UI rollout *(done)*

All UI consumers updated:

- **`app/components/comp/comp.types.ts`** — `Level` type union includes `'Principal'`.
- **`app/components/comp/comp.utils.ts`** — `LEVELS` constant is
  `['L1','L2','L3','L4','L5','Staff','Principal']`; `LEVEL_YOE_LABELS` has `Principal: '20+ yrs'`.
- **`app/app/results/ResultsClient.tsx`** — `inferLevel()` returns `'Principal'` for 20+ YOE.
- **`app/components/comp/__mocks__/mockCompData.ts`** — mock data updated to include `Principal`.
- `CompProgressionChart.tsx` — reads `levels` prop dynamically; no hardcoded level list; no
  change required.
- `validate-comp-data.ts` — reads `comp.levels` dynamically; no change required.

`npx tsc --noEmit` passes clean as of 2026-07-20.

---

## Checklist before committing

Per LESSONS-LEARNED quick-reference:

- [x] Confidence integrity: all medium/high cells have source archives (re-verified 2026-07-21 post Round 1)
- [x] Interpolation rule in gapfill prompt from round one
- [x] Gapfill Round 1 run (2026-07-21): faang-mag7 and ai-labs covered; high-growth-public covered; growth-stage and early-stage confirmed thin-by-design
- [x] "No source for medium/high" integrity check passed post-Round 1 (2026-07-21)
- [x] Repo-wide grep for old level literal — all matches are the NEW 7-level list (clean)
- [x] `grep -rln` for every consumer of `comp.levels` / `byLevel` across `app/` — done;
      `CompProgressionChart.tsx` found and confirmed safe (reads prop dynamically)
- [x] `npx tsc --noEmit` passes (re-verified 2026-07-21 post Round 1)
- [x] `validate-comp-data.ts` passes: 595 cells, all bands monotonic (re-verified 2026-07-21 post Round 1)
- [x] No unexpected Principal < Staff inversions (4 commercial-track inversions documented as intentional, matching pre-existing sales-eng/tpm pattern)
- [ ] Browser-verify rendered pages (archetypes page, compare page, results page) show Principal tab
- [ ] Optional: Round 2 gapfill targeting remaining ai-labs (7 low) and faang-mag7 (4 low) cells — diminishing returns expected
- [ ] Commit
- [ ] Commit
