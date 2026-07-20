#!/usr/bin/env python3
"""
The missing "synthesize" stage of the harvest -> classify -> extract -> synthesize
pipeline (see docs/ADD_ARCHETYPE.md). Before this script existed, app/data/comp-structure.json
and app/data/comp-by-tier.json were hand/agent-curated once and then only ever hand-patched --
nothing deterministically regenerated them from the extraction outputs, so a reclassification
(see classify.py --reclassify-all) had no way to actually reach the numbers the live app reads.

Run from the repo root:

  python3 app/scripts/synthesize-comp-data.py
  python3 app/scripts/synthesize-comp-data.py --changed-archetypes product-full-stack-software-engineer,frontend-ui-engineer

--changed-archetypes (comma-separated archetype ids) should be the blast-radius list printed
by `classify.py --reclassify-all` -- every archetype whose classified-postings count moved.

What this script does, per output file:

  app/data/comp-structure.json
    Always fully regenerated from docs/research/job-postings-corpus/comp-extraction/*.json
    for every archetype that has an extraction file. Purely mechanical (low/high/typical/
    sourceCompanyCount/levels are already aggregated by extract-comp-signals.py; confidence
    is assigned here from a sourceCompanyCount threshold calibrated against the existing
    file's own high/medium boundary -- see CONFIDENCE_THRESHOLDS below). Deterministic, no
    external research involved, safe to re-run any time.

  app/data/comp-by-tier.json
    NOT fully regenerated -- the base/bonus/equity percentile bands and per-cell confidence
    upgrades in this file come from comp-by-tier-tier-gapfill.js's AI-assisted research pass
    (see that file), which this script does not attempt to replace or fabricate. Instead:
      - Every archetype named in --changed-archetypes has ALL of its existing cells'
        `confidence` downgraded to "low" (numbers are left untouched -- gapfill's own prompt
        already says "adjust them... only when evidence is clearly compelling", so re-deciding
        the dollar figures is deliberately left to that research step, not invented here).
        This is the fix for the actual bug this script exists to close: a reclassification
        used to leave stale AI-researched confidence sitting on top of a corpus that had
        silently changed underneath it.
      - Any archetype present in app/data/archetypes.json but ABSENT from comp-by-tier.json
        entirely (a brand-new archetype) gets a full 5-tier x 4-level cell grid seeded from
        its own comp-structure.json numbers (same low/median/high value repeated flat across
        every tier -- there is no per-tier signal yet), confidence="low" everywhere, bonus and
        equity left null. This is a rough scaffold so the file has valid structure for
        validate-comp-data.ts and a starting point for gapfill -- not a real comp estimate.
    Downstream: after this script, run comp-by-tier-tier-gapfill.js (it dynamically finds
    "low" cells now -- see extract-comp-signals-by-tier.py's dynamic gap detection), then
    scripts/validate-comp-data.ts.
"""
import argparse
import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
EXTRACTION_DIR = REPO_ROOT / "docs/research/job-postings-corpus/comp-extraction"
DATA_DIR = REPO_ROOT / "app/data"
COMP_STRUCTURE_PATH = DATA_DIR / "comp-structure.json"
COMP_BY_TIER_PATH = DATA_DIR / "comp-by-tier.json"
ARCHETYPES_PATH = DATA_DIR / "archetypes.json"

TIERS = ["ai-labs", "faang-mag7", "high-growth-public", "growth-stage-private", "early-stage"]
LEVELS = ["L1", "L2", "L3", "L4", "L5", "Staff"]

# Buckets extract-comp-signals.py and extract-comp-signals-by-tier.py both use for
# byLevel/level_hint. The title-regex layer only distinguishes 5 seniority buckets, one fewer
# than the 6 tier levels, so exactly one tier level can never get direct extraction signal no
# matter how the other 5 are assigned -- "Senior/Staff" alone can't tell L4/senior-IC apart from
# L5/staff-track (that's the same conflation tracked separately in
# docs/future-work/staff-bucket-leveling-split/README.md; not re-solved here).
#
# Given that, L1/L2/L3/L4/Staff are assigned to the extraction bucket whose real-world
# composition best matches each level's YOE band (per docs/future-work/entry-level-l1-l2-tiers/
# TAXONOMY-PROPOSAL.md Sec 5), leaving L5 (10-14yr, "staff-track") as the one with no direct
# bucket -- deliberately, not arbitrarily:
#   - "Mid (unspecified level)" fires when a title has NO seniority keyword at all. Companies
#     overwhelmingly add "Senior" once someone is senior-track, so an unqualified title reads
#     much closer to L3 (3-6yr, "fully independent, not yet senior") than L4 (6-10yr, "senior
#     IC") -- mapping it to L4 would mislabel a large population of mid-level postings as
#     senior. L3 is also the level TAXONOMY-PROPOSAL.md actually anchored with evidence, so
#     it's the level most worth keeping populated.
#   - "Senior/Staff" is dominated by volume by the "Senior" keyword, not "Staff" -- industry
#     data (levels.fyi's standard leveling guide) puts Senior at roughly 5-10yr and ~30% of
#     engineers, vs. Staff at a much rarer <3% of engineers spanning a wider 5-15yr+ range. L4
#     (6-10yr) is the closer single-level fit for what this bucket actually contains than L5
#     (10-14yr) is.
#   - "Principal/Director+ (Manager/VP)" stays mapped to Staff (14+): Principal Engineer is
#     15+yr and Director is typically 8-10yr plus management tenure per the same levels.fyi
#     leveling guide, so the bucket skews toward Staff's upper range even though Director alone
#     understates it -- the VP/Director/Principal/Distinguished conflation at the top is the
#     pre-existing, separately-tracked staff-bucket-leveling-split problem, not something to
#     fix by picking a different target level here.
# L5 ends up the blind level as a result -- it's also the level TAXONOMY-PROPOSAL.md explicitly
# flagged as an unresearched placeholder, so landing the gap there (not on L3) is the better
# trade. Real L5 signal still arrives via Phase 2/3's corpus tier-bucketing and gapfill research,
# same as any other cell. If this mapping is wrong, fix it here in one place.
EXTRACTION_LEVEL_TO_TIER_LEVEL = {
    "Entry (New Grad)": "L1",
    "Junior/Associate": "L2",
    "Mid (unspecified level)": "L3",
    "Senior/Staff": "L4",
    "Principal/Director+ (Manager/VP)": "Staff",
}

# Calibrated against the current comp-structure.json: existing "high" entries start at
# sourceCompanyCount=26, existing "medium" entries top out at 23. 25 sits cleanly between them.
CONFIDENCE_THRESHOLDS = [(25, "high"), (10, "medium")]


def confidence_for_company_count(count):
    for threshold, label in CONFIDENCE_THRESHOLDS:
        if count >= threshold:
            return label
    return "low"


def synthesize_comp_structure():
    live_archetype_ids = {a["id"] for a in json.loads(ARCHETYPES_PATH.read_text())["archetypes"]}
    entries = []
    for fp in sorted(EXTRACTION_DIR.glob("*.json")):
        if fp.name == "_OVERVIEW.json":
            continue
        data = json.loads(fp.read_text())
        archetype_id = data["archetypeId"]
        if archetype_id not in live_archetype_ids:
            # classify.py's rubric can carry corpus-only classification buckets (e.g. a
            # retired standalone archetype kept for research signal) that never made it into
            # -- or were deliberately dropped from -- app/data/archetypes.json; comp-structure.json
            # only ever reflects the live app taxonomy.
            print(f"  skip {archetype_id}: not in app/data/archetypes.json (corpus-only bucket)")
            continue
        usd_base = data["summary"]["usdBase"]
        if not usd_base.get("count"):
            print(f"  skip {archetype_id}: no usdBase points extracted")
            continue

        levels = []
        for label, lvl in data["summary"]["byLevel"].items():
            if not lvl or not lvl.get("count"):
                continue
            levels.append({
                "label": label,
                "low": lvl["low"],
                "high": lvl["high"],
                "companies": lvl["companies"],
            })

        entries.append({
            "archetypeId": archetype_id,
            "low": usd_base["low"],
            "high": usd_base["high"],
            "typical": usd_base["typical"],
            "sourceCompanyCount": usd_base["companyCount"],
            "confidence": confidence_for_company_count(usd_base["companyCount"]),
            "levels": levels,
        })

    entries.sort(key=lambda e: e["archetypeId"])
    COMP_STRUCTURE_PATH.write_text(json.dumps(entries, indent=2) + "\n")
    print(f"\nWrote {COMP_STRUCTURE_PATH.relative_to(REPO_ROOT)}: {len(entries)} archetypes.")
    return entries


def flat_percentile_band(low, median, high):
    # Rough, explicitly-labeled placeholder curve for a brand-new archetype with no per-tier
    # signal yet -- linear interpolation between low/median/high, not a real distribution.
    # gapfill.js's job is to replace this with researched numbers; this only needs to be
    # structurally valid (monotonic) so validate-comp-data.ts passes in the meantime.
    p25 = round((low + median) / 2)
    p75 = round((median + high) / 2)
    return {"p10": low, "p25": p25, "p50": median, "p75": p75, "p90": high}


def flat_cell(comp_structure_entry):
    band = flat_percentile_band(
        comp_structure_entry["low"], comp_structure_entry["typical"], comp_structure_entry["high"]
    )
    return {"confidence": "low", "base": band, "bonus": None, "equity": None}


def seed_new_archetype_grid(comp_structure_entry):
    return {tier: {level: flat_cell(comp_structure_entry) for level in LEVELS} for tier in TIERS}


def add_missing_level_cells(comp_by_tier, comp_structure_by_id):
    # Handles the case where LEVELS has grown (e.g. L1/L2 added) since an archetype's grid was
    # last written: existing archetypes keep whatever tier x level cells they already have, and
    # only the newly-missing levels get a flat low-confidence placeholder, same construction as
    # seed_new_archetype_grid uses for a brand-new archetype -- gapfill.js replaces these with
    # researched numbers same as any other "low" cell.
    added = []
    for archetype_id, entry in comp_by_tier["archetypes"].items():
        cs_entry = comp_structure_by_id.get(archetype_id)
        cells_added = 0
        for tier in TIERS:
            tier_cells = entry.setdefault(tier, {})
            for level in LEVELS:
                if level in tier_cells:
                    continue
                if cs_entry is None:
                    continue  # no extraction data to seed from -- leave level absent
                tier_cells[level] = flat_cell(cs_entry)
                cells_added += 1
        if cells_added:
            added.append((archetype_id, cells_added))
    return added


def synthesize_comp_by_tier(changed_archetypes, comp_structure_entries):
    comp_by_tier = json.loads(COMP_BY_TIER_PATH.read_text())
    comp_by_tier["levels"] = LEVELS
    archetype_ids = [a["id"] for a in json.loads(ARCHETYPES_PATH.read_text())["archetypes"]]
    comp_structure_by_id = {e["archetypeId"]: e for e in comp_structure_entries}

    downgraded, seeded = [], []

    for archetype_id in changed_archetypes:
        entry = comp_by_tier["archetypes"].get(archetype_id)
        if entry is None:
            continue  # brand new -- handled in the seed pass below, not here
        cells_touched = 0
        for tier in entry.values():
            for cell in tier.values():
                if cell is not None:
                    cell["confidence"] = "low"
                    cells_touched += 1
        downgraded.append((archetype_id, cells_touched))

    for archetype_id in archetype_ids:
        if archetype_id in comp_by_tier["archetypes"]:
            continue
        cs_entry = comp_structure_by_id.get(archetype_id)
        if cs_entry is None:
            continue  # no extraction data at all yet -- nothing to seed from
        comp_by_tier["archetypes"][archetype_id] = seed_new_archetype_grid(cs_entry)
        seeded.append(archetype_id)

    level_cells_added = add_missing_level_cells(comp_by_tier, comp_structure_by_id)

    COMP_BY_TIER_PATH.write_text(json.dumps(comp_by_tier, indent=2) + "\n")

    print(f"\nWrote {COMP_BY_TIER_PATH.relative_to(REPO_ROOT)}.")
    if downgraded:
        print("Downgraded to confidence=low (numbers unchanged, needs gapfill re-verification):")
        for archetype_id, n in downgraded:
            print(f"  {archetype_id:45s} {n} cells")
    if seeded:
        print(f"Seeded fresh {len(TIERS) * len(LEVELS)}-cell low-confidence grid for brand-new archetypes:")
        for archetype_id in seeded:
            print(f"  {archetype_id}")
    if level_cells_added:
        print("Seeded low-confidence placeholder cells for levels missing from existing archetypes:")
        for archetype_id, n in level_cells_added:
            print(f"  {archetype_id:45s} {n} cells")
    if not downgraded and not seeded and not level_cells_added:
        print("No changed or new archetypes to apply -- comp-by-tier.json structure unchanged.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--changed-archetypes", default="",
        help="comma-separated archetype ids from classify.py --reclassify-all's blast-radius report",
    )
    args = parser.parse_args()
    changed = [a.strip() for a in args.changed_archetypes.split(",") if a.strip()]

    print("Synthesizing app/data/comp-structure.json from extraction...")
    comp_structure_entries = synthesize_comp_structure()

    print("\nSynthesizing app/data/comp-by-tier.json (staleness pass)...")
    synthesize_comp_by_tier(changed, comp_structure_entries)


if __name__ == "__main__":
    main()
