#!/usr/bin/env python3
"""
Harvests postings from each company's public ATS API into a wave directory.

Run from the repo root, after `wave_init.py <id>`:
  python3 docs/research/job-postings-corpus/harvest.py --wave 2027-01

Reads company/api_url list from companies.json. Covers Greenhouse, Lever, and Ashby (public
JSON GET endpoints, field shapes verified live 2026-07) -- together ~93% of wave 1's 744
companies. Workday is NOT implemented here: it requires a POST with a pagination body whose
exact shape varies more per-tenant, and wave 1's Workday harvest (see ENRICHMENT_REPORT.md) needed
manual retry handling for aggressive 429 rate-limiting. Run Workday companies through a separate,
hand-verified pass and merge their output into the same wave's raw_postings.jsonl /
job_descriptions.jsonl.gz before running classify.py.

Writes:
  waves/<id>/raw_postings.jsonl   -- {company, ats, slug, title, department, location, url, job_id}
  job_descriptions.jsonl.gz appended -- {company, ats, url, job_id, description_text}
    (appended, not per-wave, since extract-comp-signals.py's by-archetype join is keyed on this
    file directly; safe to append because (company, ats, url, job_id) is unique per posting)
"""
import argparse
import gzip
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

CORPUS_DIR = Path(__file__).resolve().parent
HEADERS = {"User-Agent": "careerguru-research/1.0"}


def fetch_json(url, retries=3, backoff=2.0):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as r:
                return json.loads(r.read())
        except (urllib.error.HTTPError, urllib.error.URLError) as e:
            if attempt == retries - 1:
                raise
            time.sleep(backoff * (attempt + 1))
    raise RuntimeError("unreachable")


def strip_html(raw):
    # Greenhouse's `content` field comes back double-HTML-escaped (&lt;h2&gt; instead of <h2>) --
    # unescape twice before stripping tags. See ENRICHMENT_REPORT.md for the wave-1 discovery of
    # this bug; unescaping plain single-escaped HTML twice is a no-op, so this is safe for
    # Lever/Ashby's already-plain-text fields too.
    text = html.unescape(html.unescape(raw or ""))
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", text)).strip()


def harvest_greenhouse(company):
    data = fetch_json(f"{company['api_url']}?content=true")
    postings, descriptions = [], []
    for j in data.get("jobs", []):
        loc = (j.get("location") or {}).get("name")
        postings.append({
            "company": company["name"], "ats": "greenhouse", "slug": company["slug"],
            "title": j.get("title"), "department": None, "location": loc,
            "url": j.get("absolute_url"), "job_id": str(j.get("id")),
        })
        descriptions.append({
            "company": company["name"], "ats": "greenhouse", "url": j.get("absolute_url"),
            "job_id": str(j.get("id")), "description_text": strip_html(j.get("content")),
        })
    return postings, descriptions


def harvest_lever(company):
    data = fetch_json(company["api_url"])
    postings, descriptions = [], []
    for j in data:
        cats = j.get("categories") or {}
        postings.append({
            "company": company["name"], "ats": "lever", "slug": company["slug"],
            "title": j.get("text"), "department": cats.get("team"), "location": cats.get("location"),
            "url": j.get("hostedUrl"), "job_id": j.get("id"),
        })
        body = " ".join(filter(None, [j.get("descriptionPlain"), j.get("additionalPlain")]))
        descriptions.append({
            "company": company["name"], "ats": "lever", "url": j.get("hostedUrl"),
            "job_id": j.get("id"), "description_text": body,
        })
    return postings, descriptions


def harvest_ashby(company):
    data = fetch_json(company["api_url"])
    postings, descriptions = [], []
    for j in data.get("jobs", []):
        postings.append({
            "company": company["name"], "ats": "ashby", "slug": company["slug"],
            "title": j.get("title"), "department": j.get("department"), "location": j.get("location"),
            "url": j.get("jobUrl"), "job_id": j.get("id"),
        })
        descriptions.append({
            "company": company["name"], "ats": "ashby", "url": j.get("jobUrl"),
            "job_id": j.get("id"), "description_text": j.get("descriptionPlain") or strip_html(j.get("descriptionHtml")),
        })
    return postings, descriptions


HARVESTERS = {"greenhouse": harvest_greenhouse, "lever": harvest_lever, "ashby": harvest_ashby}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--wave", required=True)
    parser.add_argument("--sleep", type=float, default=0.3, help="seconds between company requests")
    args = parser.parse_args()

    wave_dir = CORPUS_DIR / "waves" / args.wave
    if not wave_dir.exists():
        sys.exit(f"waves/{args.wave} doesn't exist -- run wave_init.py {args.wave} first")

    companies = json.loads((CORPUS_DIR / "companies.json").read_text())["companies"]
    supported = [c for c in companies if c["ats"] in HARVESTERS]
    skipped_ats = sorted(set(c["ats"] for c in companies if c["ats"] not in HARVESTERS))
    if skipped_ats:
        print(f"Skipping unsupported ATS types (harvest separately): {skipped_ats}")

    all_postings, all_descriptions, errors = [], [], []
    for i, company in enumerate(supported, 1):
        try:
            postings, descriptions = HARVESTERS[company["ats"]](company)
            all_postings.extend(postings)
            all_descriptions.extend(descriptions)
            print(f"[{i}/{len(supported)}] {company['name']:30s} {company['ats']:12s} {len(postings):4d} postings")
        except Exception as e:
            errors.append({"company": company["name"], "ats": company["ats"], "error": str(e)})
            print(f"[{i}/{len(supported)}] {company['name']:30s} {company['ats']:12s} ERROR: {e}")
        time.sleep(args.sleep)

    with open(wave_dir / "raw_postings.jsonl", "w") as f:
        for p in all_postings:
            f.write(json.dumps(p) + "\n")

    descriptions_gz = CORPUS_DIR / "job_descriptions.jsonl.gz"
    with gzip.open(descriptions_gz, "at") as f:
        for d in all_descriptions:
            f.write(json.dumps(d) + "\n")

    if errors:
        (wave_dir / "harvest_errors.json").write_text(json.dumps(errors, indent=2))

    print(f"\nWave {args.wave}: {len(all_postings)} postings from {len(supported)} companies "
          f"({len(errors)} errors). Fill in manifest.json, then run classify.py --wave {args.wave}.")


if __name__ == "__main__":
    main()
