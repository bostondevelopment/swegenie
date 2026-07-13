# Multi-wave corpus design

Problem: wave 1 (67,956 postings, 2026-07) has no provenance tracking. Re-running harvest today
would either fully clobber it or (if naively concatenated) double-count reposted roles and let
stale comp figures drag down fresh ones. This doc is the shared contract for the scripts that
implement wave-awareness — every script below must conform to it.

## Directory layout

```
docs/research/job-postings-corpus/
  waves/
    2026-07/
      manifest.json          # {wave_id, harvested_at, company_count, posting_count, ats_breakdown}
      raw_postings.jsonl     # gitignored (large) — this wave's harvest only
    2027-01/
      manifest.json
      raw_postings.jsonl
  seen_postings_index.jsonl  # tracked, small — one row per dedup_key ever seen, {dedup_key, wave_id, first_seen_at}
  classified_postings.jsonl  # gitignored (large) — CUMULATIVE across all waves, each record tagged wave_id
  comp-extraction/           # tracked — output of a --window run (see below)
  comp-extraction-by-tier/   # tracked — output of a --window run
  archetype-signal/          # tracked — output of an ALL-WAVES accumulate run
```

`raw_postings.jsonl` and `classified_postings.jsonl` at the corpus root (not under `waves/`) are
retired — wave 1's existing root-level files get moved to `waves/2026-07/` as part of this change.

## Dedup key (cross-wave)

A posting is the "same role" across waves if:

```
dedup_key = sha256(normalize(company) + "|" + normalize(title) + "|" + normalize(location))
```

where `normalize()` lowercases, collapses whitespace, and strips punctuation. `raw_postings.jsonl`
doesn't carry posting body text (that lives separately, gzipped, keyed by url/job_id) so the key
uses company+title+location rather than a content hash — cheaper, no cross-file join required, and
still catches the common repost case (same role, new ATS-assigned URL/job_id). Matching on
company+title+location instead of URL alone because ATS platforms regenerate posting IDs when a
role is reposted or re-leveled, and URL-only dedup (wave 1's approach, within a single harvest)
would double-count the same role across waves.

`seen_postings_index.jsonl` is the append-only ledger: every dedup_key ever classified, with the
wave it was first seen in. A new wave's harvest is classified against this index — postings whose
dedup_key is already present get skipped (not re-classified, not double-counted in
`classified_postings.jsonl`), but the *fact* that they're still open in the new wave doesn't need
separate tracking for v1 (we don't currently model "still open" vs "closed").

## Window vs. accumulate — the core behavior split

Two output families read the cumulative `classified_postings.jsonl`, and each wants a different
slice of wave history:

- **Comp figures** (`comp-extraction/`, `comp-extraction-by-tier/`, and downstream
  `data/comp-structure.json` / `data/comp-by-tier.json`) — market comp drifts; a number blended
  across 18 months of waves understates the most recent quarter. These scripts take a
  `--window-months N` flag (default **12**) and only read postings from waves within that trailing
  window of the *latest* wave's `harvested_at`. This is effectively **replace**, scoped to a
  recency window rather than "only the newest wave," so a wave gap (e.g. skip a quarter) doesn't
  starve the sample.
- **Archetype/dimension signal** (`archetype-signal/`, and `COUNTS.md`'s per-archetype totals) —
  qualitative requirement patterns (does this archetype require travel, on-call, threat modeling)
  get *more reliable* with more data and don't go stale the way a dollar figure does. These read
  **all waves, unfiltered** — true accumulate.

Every wave-derived artifact (COUNTS.md, comp-extraction/*.json, archetype-signal/*.json) must
record which mode produced it and which waves were included, e.g. a `_meta` block:
`{"mode": "window", "window_months": 12, "waves_included": ["2026-07", "2027-01"]}` or
`{"mode": "accumulate", "waves_included": [...]}`. Without this, a future reader can't tell
whether a number reflects one wave or five.

## What changes in each script

1. **`classify.py`** — currently reads a single root-level `raw_postings.jsonl` and overwrites
   `classified_postings.jsonl`. Change: takes a `--wave <id>` arg pointing at
   `waves/<id>/raw_postings.jsonl`; computes dedup_key per posting; skips keys already in
   `seen_postings_index.jsonl`; appends newly-classified postings to `classified_postings.jsonl`
   (tagging each record with `wave_id`) and new keys to the index. `COUNTS.md` generation becomes
   window-aware per the split above (default: current wave's trailing 12 months).
2. **`extract-comp-signals.py`** / **`extract-comp-signals-by-tier.py`** — add `--window-months`
   (default 12), filter `classified_postings.jsonl` records by wave before extracting, emit the
   `_meta` provenance block in each output file.
3. **New: `wave_init.py`** — small script to scaffold `waves/<YYYY-MM>/` + a starter
   `manifest.json` for a new harvest run. Doesn't do the harvesting itself (that's still the
   ATS-API pull, unchanged) — just standardizes where a new wave's raw output lands.
4. **Archetype-signal generation** stays an AI/agent-driven synthesis pass (it always has been —
   no committed script exists for it), but the agent doing it must read `classified_postings.jsonl`
   unfiltered (all waves) and write the `_meta.waves_included` block, per the split above.

## Migration for wave 1

Existing `docs/research/job-postings-corpus/raw_postings.jsonl` and `classified_postings.jsonl`
move to `waves/2026-07/raw_postings.jsonl` (gitignored) and become the seed of the new cumulative
`classified_postings.jsonl` (also gitignored) with every record tagged `wave_id: "2026-07"`.
`seen_postings_index.jsonl` gets backfilled with wave 1's dedup keys.
