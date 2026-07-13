#!/usr/bin/env python3
"""
Walks the journal.jsonl files from the three already-completed comp-data workflows
and extracts every source citation (url/title/note or context) already gathered by
agents, saving them as a permanent local archive so nothing depends on re-fetching
a live URL that may have since gone stale (several already did mid-session).

Output: docs/research/source-archive/prior-workflows/{archetypeId}.json
"""
import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = REPO_ROOT / "docs/research/source-archive/prior-workflows"

JOURNALS = [
    ("comp-by-tier-confidence", "/Users/michael/.claude/projects/-Users-michael-Documents-Code-careerguru-app/5ce33cff-b47e-4aed-ba08-702f28f51143/subagents/workflows/wf_27a3ebf0-0f8/journal.jsonl"),
    ("comp-structure-full-backfill", "/Users/michael/.claude/projects/-Users-michael-Documents-Code-careerguru-app/5ce33cff-b47e-4aed-ba08-702f28f51143/subagents/workflows/wf_be40b49e-861/journal.jsonl"),
    ("comp-structure-band-gap-fill", "/Users/michael/.claude/projects/-Users-michael-Documents-Code-careerguru-app/5ce33cff-b47e-4aed-ba08-702f28f51143/subagents/workflows/wf_a514414c-157/journal.jsonl"),
]

URL_RE = re.compile(r"https?://[^\s)\"]+")


def find_archetype_id(obj):
    if isinstance(obj, dict):
        if "archetypeId" in obj and isinstance(obj["archetypeId"], str):
            return obj["archetypeId"]
        if "cluster" in obj and isinstance(obj["cluster"], str):
            return obj["cluster"]
    return None


def walk_for_sources(obj, archetype_ctx, bucket):
    """Recursively find dicts that look like a source citation, and stray URLs
    embedded in free text (dataQualityNotes/rationale/notes), tagging each with
    whichever archetypeId/cluster context we're nested under."""
    aid = find_archetype_id(obj) or archetype_ctx

    if isinstance(obj, dict):
        looks_like_source = "url" in obj and ("title" in obj or "note" in obj) and isinstance(obj.get("url"), str)
        if looks_like_source and obj["url"].startswith("http"):
            bucket.setdefault(aid or "_unknown", []).append({
                "url": obj["url"],
                "title": obj.get("title", ""),
                "note": obj.get("note", ""),
                "kind": "structured_citation",
            })
        for k, v in obj.items():
            if isinstance(v, str) and k in ("rationale", "notes", "dataQualityNotes", "context", "clusterNotes"):
                for url in URL_RE.findall(v):
                    bucket.setdefault(aid or "_unknown", []).append({
                        "url": url.rstrip(".,)"),
                        "title": "",
                        "note": v[:600],
                        "kind": "url_in_freetext",
                    })
            walk_for_sources(v, aid, bucket)
    elif isinstance(obj, list):
        for item in obj:
            walk_for_sources(item, aid, bucket)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    grand_total = 0
    for label, path in JOURNALS:
        p = Path(path)
        if not p.exists():
            print(f"SKIP (not found): {path}")
            continue
        bucket = {}
        with p.open() as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    rec = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if rec.get("type") != "result":
                    continue
                walk_for_sources(rec.get("result"), None, bucket)

        run_dir = OUT_DIR / label
        run_dir.mkdir(parents=True, exist_ok=True)
        total = 0
        for aid, sources in bucket.items():
            # dedup by url
            seen = set()
            deduped = []
            for s in sources:
                if s["url"] in seen:
                    continue
                seen.add(s["url"])
                deduped.append(s)
            (run_dir / f"{aid}.json").write_text(json.dumps({
                "archetypeId": aid,
                "workflowLabel": label,
                "sourceCount": len(deduped),
                "sources": deduped,
            }, indent=2))
            total += len(deduped)
        print(f"{label:35s} -> {total:4d} sources across {len(bucket)} archetypes/clusters")
        grand_total += total
    print(f"\nTOTAL archived source citations: {grand_total}")


if __name__ == "__main__":
    main()
