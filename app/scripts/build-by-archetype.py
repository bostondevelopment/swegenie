#!/usr/bin/env python3
"""
Regenerates docs/research/job-postings-corpus/by-archetype/{archetypeId}.jsonl from the
cumulative classified_postings.jsonl joined against job_descriptions.jsonl.gz on (company, url).

This is the join step wave 1 did ad hoc (no committed script) -- formalized here so wave_id
carries through to by-archetype records, which extract-comp-signals.py's window filtering
(_wave_utils.record_in_window) depends on.

Run: python3 app/scripts/build-by-archetype.py   (from repo root)
"""
import gzip
import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
CORPUS_DIR = REPO_ROOT / "docs/research/job-postings-corpus"


def main():
    descriptions = {}
    with gzip.open(CORPUS_DIR / "job_descriptions.jsonl.gz", "rt") as f:
        for line in f:
            d = json.loads(line)
            descriptions[(d["company"], d["url"])] = d["description_text"]

    by_archetype = {}
    missing_desc = 0
    with open(CORPUS_DIR / "classified_postings.jsonl") as f:
        for line in f:
            rec = json.loads(line)
            archetype = rec.get("archetype")
            if not archetype or archetype in ("EXCLUDED", "AMBIGUOUS", "UNCLASSIFIED", "MISSING_TITLE"):
                continue
            desc = descriptions.get((rec["company"], rec["url"]))
            if desc is None:
                missing_desc += 1
                continue
            by_archetype.setdefault(archetype, []).append({
                "company": rec["company"], "title": rec["title"], "department": rec.get("department"),
                "location": rec.get("location"), "url": rec["url"], "description_text": desc,
                "wave_id": rec.get("wave_id"),
            })

    out_dir = CORPUS_DIR / "by-archetype"
    out_dir.mkdir(parents=True, exist_ok=True)
    for archetype, records in sorted(by_archetype.items()):
        with open(out_dir / f"{archetype}.jsonl", "w") as f:
            for r in records:
                f.write(json.dumps(r) + "\n")
        print(f"{archetype:50s} {len(records):5d}")

    print(f"\n{missing_desc} classified postings had no matching description (skipped).")


if __name__ == "__main__":
    main()
