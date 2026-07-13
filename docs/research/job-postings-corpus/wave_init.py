#!/usr/bin/env python3
"""
Scaffolds a new wave directory for a fresh ATS-API harvest. Doesn't harvest anything itself --
run this first, point the harvester at waves/<id>/raw_postings.jsonl, then run classify.py --wave.

Run from the repo root: python3 docs/research/job-postings-corpus/wave_init.py 2027-01
"""
import json
import sys
from pathlib import Path

CORPUS_DIR = Path(__file__).resolve().parent


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: wave_init.py <wave-id, e.g. 2027-01>")
    wave_id = sys.argv[1]
    wave_dir = CORPUS_DIR / "waves" / wave_id
    if wave_dir.exists():
        sys.exit(f"waves/{wave_id} already exists")
    wave_dir.mkdir(parents=True)
    manifest = {
        "wave_id": wave_id,
        "harvested_at": None,  # fill in (YYYY-MM-DD) once the harvest completes
        "company_count": None,
        "posting_count": None,
        "ats_breakdown": None,
    }
    (wave_dir / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Created waves/{wave_id}/. Point the harvester at waves/{wave_id}/raw_postings.jsonl, "
          f"fill in manifest.json once harvest completes, then run:\n"
          f"  python3 docs/research/job-postings-corpus/classify.py --wave {wave_id}")


if __name__ == "__main__":
    main()
