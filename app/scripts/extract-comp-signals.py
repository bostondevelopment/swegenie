#!/usr/bin/env python3
"""
Extracts compensation ranges from the full job-postings corpus for every archetype.

Source: docs/research/job-postings-corpus/by-archetype/{archetypeId}.jsonl (repo root, gitignored)
Output: docs/research/job-postings-corpus/comp-extraction/{archetypeId}.json — one file per
archetype with every extracted data point cited (company, title, url, raw matched text) plus
computed stats, so every number in data/comp-structure.json can be traced back to a real posting.

Run: python3 app/scripts/extract-comp-signals.py [--window-months N]   (from repo root)

Comp figures are a "window" output (see WAVE_DESIGN.md): only postings from waves within the
trailing --window-months (default 12) of the most recent wave are counted, so a stale wave doesn't
drag current comp figures down. Records with no wave_id (pre-wave-tracking legacy data) are always
included. Each output file's _meta block records which mode/window/waves produced it.
"""
import argparse
import json
import re
import statistics
from pathlib import Path

import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from _wave_utils import load_wave_dates, window_cutoff, record_in_window

REPO_ROOT = Path(__file__).resolve().parents[2]
CORPUS_DIR = REPO_ROOT / "docs/research/job-postings-corpus/by-archetype"
OUT_DIR = REPO_ROOT / "docs/research/job-postings-corpus/comp-extraction"

DASH = r"(?:-|–|—|&mdash;|&ndash;|to)"
NUM = r"\$?\s?(\d{2,3}(?:,\d{3})+)"
RANGE_RE = re.compile(rf"\$\s?(\d{{2,3}}(?:,\d{{3}})+)\s*{DASH}\s*{NUM}", re.IGNORECASE)
SINGLE_RE = re.compile(r"\$\s?(\d{2,3}(?:,\d{3})+)")

CURRENCY_MARKERS = [
    (re.compile(r"\bCAD\b|C\$"), "CAD"),
    (re.compile(r"\bAUD\b|A\$"), "AUD"),
    (re.compile(r"\bGBP\b|£"), "GBP"),
    (re.compile(r"\bEUR\b|€"), "EUR"),
]

OTE_MARKERS = re.compile(
    r"\bOTE\b|on[- ]target earning|commission|quota|variable compensation|sales incentive|incentive plan",
    re.IGNORECASE,
)

# Non-comp dollar contexts to reject a match (revenue/funding/ARR/deal-size language near the figure)
NOISE_MARKERS = re.compile(
    r"\braised\b|\bfunding\b|\bvaluation\b|\bARR\b|\brevenue\b|\bfunded\b|\bSeries [A-F]\b|"
    r"\bcustomers?\b|\busers?\b|\bmillion (?:in )?(?:sales|deals|pipeline)\b|\bbook of business\b",
    re.IGNORECASE,
)

LEVEL_RULES = [
    ("Principal/Director+ (Manager/VP)", re.compile(
        r"\b(vp|vice president|director|head of|principal(?! engineer)|chief)\b", re.IGNORECASE)),
    ("Senior/Staff", re.compile(
        r"\b(senior|sr\.?|staff|lead|iii|iv|level\s*[3-5]|l[3-5]\b)\b", re.IGNORECASE)),
    ("Entry/Associate", re.compile(
        r"\b(junior|jr\.?|associate|entry[- ]level|new grad|i\b)\b", re.IGNORECASE)),
]


def classify_level(title: str) -> str:
    for label, pat in LEVEL_RULES:
        if pat.search(title):
            return label
    return "Mid (unspecified level)"


def context_window(text: str, start: int, end: int, pad: int = 220) -> str:
    return text[max(0, start - pad): min(len(text), end + pad)]


def detect_currency(ctx: str) -> str:
    for pat, code in CURRENCY_MARKERS:
        if pat.search(ctx):
            return code
    return "USD"


def is_plausible_salary(lo: int, hi: int | None) -> bool:
    if hi is not None:
        if not (25_000 <= lo <= 700_000 and 25_000 <= hi <= 900_000):
            return False
        if hi < lo:
            return False
        if hi > lo * 3.5:  # implausibly wide "range" usually means two unrelated numbers matched
            return False
        return True
    return 25_000 <= lo <= 700_000


def extract_from_posting(rec: dict) -> list[dict]:
    text = rec.get("description_text") or ""
    if not text:
        return []
    found = []
    claimed_spans = []

    for m in RANGE_RE.finditer(text):
        lo = int(m.group(1).replace(",", ""))
        hi = int(m.group(2).replace(",", ""))
        if lo > hi:
            lo, hi = hi, lo
        if not is_plausible_salary(lo, hi):
            continue
        ctx = context_window(text, m.start(), m.end())
        if NOISE_MARKERS.search(ctx):
            continue
        found.append({
            "low": lo,
            "high": hi,
            "raw_match": m.group(0),
            "context": ctx.strip(),
            "currency": detect_currency(ctx),
            "is_ote": bool(OTE_MARKERS.search(ctx)),
        })
        claimed_spans.append((m.start(), m.end()))

    if not found:
        for m in SINGLE_RE.finditer(text):
            if any(s <= m.start() < e for s, e in claimed_spans):
                continue
            val = int(m.group(1).replace(",", ""))
            if not is_plausible_salary(val, None):
                continue
            ctx = context_window(text, m.start(), m.end())
            if NOISE_MARKERS.search(ctx):
                continue
            if not re.search(r"salary|compensation|base pay|pay range|annual pay", ctx, re.IGNORECASE):
                continue
            found.append({
                "low": val,
                "high": val,
                "raw_match": m.group(0),
                "context": ctx.strip(),
                "currency": detect_currency(ctx),
                "is_ote": bool(OTE_MARKERS.search(ctx)),
            })
            break  # one single-figure point per posting max, ranges are the reliable signal

    level = classify_level(rec.get("title") or "")
    for f in found:
        f.update({
            "company": rec.get("company"),
            "title": rec.get("title"),
            "location": rec.get("location"),
            "url": rec.get("url"),
            "level_hint": level,
        })
    return found


def dedup(points: list[dict]) -> list[dict]:
    seen = set()
    out = []
    for p in points:
        key = (p["company"], p["title"], p["low"], p["high"])
        if key in seen:
            continue
        seen.add(key)
        out.append(p)
    return out


def pct(values: list[int], p: float) -> int:
    values = sorted(values)
    if not values:
        return 0
    idx = min(len(values) - 1, max(0, round(p * (len(values) - 1))))
    return values[idx]


def summarize(points: list[dict]) -> dict:
    usd_base = [p for p in points if p["currency"] == "USD" and not p["is_ote"]]
    usd_ote = [p for p in points if p["currency"] == "USD" and p["is_ote"]]
    non_usd = [p for p in points if p["currency"] != "USD"]

    def band(pts):
        mids = [(p["low"] + p["high"]) / 2 for p in pts]
        los = [p["low"] for p in pts]
        his = [p["high"] for p in pts]
        if not pts:
            return None
        return {
            "count": len(pts),
            "companyCount": len(set(p["company"] for p in pts)),
            "low": min(los),
            "high": max(his),
            "typical": round(statistics.median(mids)),
        }

    by_level = {}
    for label in ["Entry/Associate", "Mid (unspecified level)", "Senior/Staff", "Principal/Director+ (Manager/VP)"]:
        lvl_pts = [p for p in usd_base if p["level_hint"] == label]
        b = band(lvl_pts)
        if b:
            by_level[label] = {**b, "companies": sorted(set(p["company"] for p in lvl_pts))}

    return {
        "totalPointsExtracted": len(points),
        "usdBase": band(usd_base),
        "usdOte": band(usd_ote),
        "nonUsd": {"count": len(non_usd), "currencies": sorted(set(p["currency"] for p in non_usd))},
        "byLevel": by_level,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--window-months", type=int, default=12)
    args = parser.parse_args()

    wave_dates = load_wave_dates()
    cutoff = window_cutoff(wave_dates, args.window_months)
    waves_included = sorted(w for w, d in wave_dates.items() if cutoff is None or d >= cutoff)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    overall = {}
    for fp in sorted(CORPUS_DIR.glob("*.jsonl")):
        if "SAMPLE" in fp.name:
            continue
        archetype_id = fp.stem
        all_points = []
        total_postings = 0
        for line in fp.open(encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            rec = json.loads(line)
            if not record_in_window(rec, wave_dates, cutoff):
                continue
            total_postings += 1
            all_points.extend(extract_from_posting(rec))

        all_points = dedup(all_points)
        summary = summarize(all_points)
        summary["totalPostingsScanned"] = total_postings

        out = {
            "archetypeId": archetype_id,
            "_meta": {"mode": "window", "window_months": args.window_months, "waves_included": waves_included},
            "summary": summary,
            "dataPoints": all_points,
        }
        (OUT_DIR / f"{archetype_id}.json").write_text(json.dumps(out, indent=2))
        overall[archetype_id] = {
            "totalPostingsScanned": total_postings,
            "totalPointsExtracted": summary["totalPointsExtracted"],
            "usdBaseCount": summary["usdBase"]["count"] if summary["usdBase"] else 0,
            "usdBaseCompanyCount": summary["usdBase"]["companyCount"] if summary["usdBase"] else 0,
        }
        print(f"{archetype_id:50s} postings={total_postings:5d}  points={summary['totalPointsExtracted']:4d}  "
              f"usd_base_pts={overall[archetype_id]['usdBaseCount']:4d}  companies={overall[archetype_id]['usdBaseCompanyCount']:3d}")

    (OUT_DIR / "_OVERVIEW.json").write_text(json.dumps(overall, indent=2))


if __name__ == "__main__":
    main()
