# Staff-bucket leveling split — Execution Plan

**Status as of 2026-07-20:** Stages 1–4 are complete and uncommitted. Stage 3 (gapfill) is
partially done — 9 of 85 Principal cells are medium/high confidence; 76 are still low. A
confidence integrity fix was applied on 2026-07-20 (see Stage 3 notes). Ready for a gapfill
pass to raise the remaining 76 low cells before committing.

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

## Stage 3 — Gapfill *(partially done; confidence integrity fix applied 2026-07-20)*

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

### Current confidence state

| Level | high | medium | low |
|---|---|---|---|
| Principal | 6 | 3 | 76 |

All 9 surviving medium/high cells have ≥2 source archive files.

### Remaining gapfill work

76 low-confidence Principal cells remain. The gapfill workflow is already configured for
Principal (`comp-by-tier-tier-gapfill.js`'s `LEVELS` includes `Principal` and the prompt
includes the anti-interpolation clause). Run it as:

```
Workflow({ scriptPath: "app/scripts/workflows/comp-by-tier-tier-gapfill.js" })
```

**Before triggering, note:**
- Expect thin coverage at `early-stage` (17 low) and `growth-stage-private` (16 low) — formal
  Principal titles rarely exist below ~200 engineers. Accept these as thin-by-design.
- `high-growth-public` (16 low): plausible that public companies like Stripe, Databricks,
  Snowflake have public Principal comp data. Worth a full pass.
- `faang-mag7` (3 low) and `ai-labs` (9 low): highest priority — real data exists and 9 of
  these were incorrectly marked non-low before the integrity fix, so they're clearly researchable.
- Set a round cap of 2 gapfill runs; if cells remain low after 2 rounds, leave them — Principal
  pay at non-top-tier companies is structurally less publicly disclosed (per LESSONS-LEARNED §6).
- Run the "no source for medium/high" check after each gapfill round:
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

- [x] Confidence integrity: all medium/high cells have source archives (verified 2026-07-20)
- [x] Interpolation rule in gapfill prompt from round one
- [ ] Gapfill round(s) run — at minimum cover faang-mag7 and ai-labs low cells
- [ ] Re-run "no source for medium/high" check after gapfill
- [x] Repo-wide grep for old level literal — `grep -rn "'L3', 'L4', 'L5', 'Staff'" app/`
      should return 0 hits (verified: returns 0)
- [x] `grep -rln` for every consumer of `comp.levels` / `byLevel` across `app/` — done;
      `CompProgressionChart.tsx` found and confirmed safe (reads prop dynamically)
- [x] `npx tsc --noEmit` passes
- [ ] `validate-comp-data.ts` run from `app/` — blocked by ts-node version issue in sandbox;
      run locally: `npx ts-node --compiler-options '{"module":"commonjs"}' ../scripts/validate-comp-data.ts`
- [ ] Browser-verify rendered pages (archetypes page, compare page, results page) show Principal tab
- [ ] Commit
