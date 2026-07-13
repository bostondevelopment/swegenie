#!/usr/bin/env python3
"""
Same extraction logic as extract-comp-signals.py, but buckets results by
(company tier x level) instead of just level, using data/company-tiers.json.

Only processes the 9 archetypes that still have low-confidence cells in
data/comp-by-tier.json. Output: docs/research/job-postings-corpus/
comp-extraction-by-tier/{archetypeId}.json

Window output (see WAVE_DESIGN.md) — same --window-months behavior as extract-comp-signals.py.
"""
import argparse
import json
import re
import statistics
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _wave_utils import load_wave_dates, window_cutoff, record_in_window

REPO_ROOT = Path(__file__).resolve().parents[2]
CORPUS_DIR = REPO_ROOT / "docs/research/job-postings-corpus/by-archetype"
TIERS_FILE = REPO_ROOT / "app/data/company-tiers.json"
OUT_DIR = REPO_ROOT / "docs/research/job-postings-corpus/comp-extraction-by-tier"

GAP_ARCHETYPES = [
    "customer-support-engineer",
    "customer-support-solutions-engineer",
    "embedded-iot-engineer",
    "consulting-engineer-professional-services",
    "developer-relations-advocacy",
    "sales-engineer-pre-sales",
    "solutions-architect-consulting",
    "solutions-architect-vendor-side",
    "engineering-management",
]

TIERS = ["ai-labs", "faang-mag7", "high-growth-public", "growth-stage-private", "early-stage"]
LEVELS = ["Entry/Associate", "Mid (unspecified level)", "Senior/Staff", "Principal/Director+ (Manager/VP)"]

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


def context_window(text, start, end, pad=220):
    return text[max(0, start - pad): min(len(text), end + pad)]


def detect_currency(ctx):
    for pat, code in CURRENCY_MARKERS:
        if pat.search(ctx):
            return code
    return "USD"


def is_plausible_salary(lo, hi):
    if hi is not None:
        if not (25_000 <= lo <= 900_000 and 25_000 <= hi <= 1_200_000):
            return False
        if hi < lo or hi > lo * 3.5:
            return False
        return True
    return 25_000 <= lo <= 900_000


def extract_from_posting(rec):
    text = rec.get("description_text") or ""
    if not text:
        return []
    found, claimed = [], []
    for m in RANGE_RE.finditer(text):
        lo, hi = int(m.group(1).replace(",", "")), int(m.group(2).replace(",", ""))
        if lo > hi:
            lo, hi = hi, lo
        if not is_plausible_salary(lo, hi):
            continue
        ctx = context_window(text, m.start(), m.end())
        if NOISE_MARKERS.search(ctx):
            continue
        found.append({"low": lo, "high": hi, "raw_match": m.group(0), "context": ctx.strip(),
                       "currency": detect_currency(ctx), "is_ote": bool(OTE_MARKERS.search(ctx))})
        claimed.append((m.start(), m.end()))
    if not found:
        for m in SINGLE_RE.finditer(text):
            if any(s <= m.start() < e for s, e in claimed):
                continue
            val = int(m.group(1).replace(",", ""))
            if not is_plausible_salary(val, None):
                continue
            ctx = context_window(text, m.start(), m.end())
            if NOISE_MARKERS.search(ctx):
                continue
            if not re.search(r"salary|compensation|base pay|pay range|annual pay", ctx, re.IGNORECASE):
                continue
            found.append({"low": val, "high": val, "raw_match": m.group(0), "context": ctx.strip(),
                           "currency": detect_currency(ctx), "is_ote": bool(OTE_MARKERS.search(ctx))})
            break
    level = classify_level(rec.get("title") or "")
    for f in found:
        f.update({"company": rec.get("company"), "title": rec.get("title"),
                   "location": rec.get("location"), "url": rec.get("url"), "level_hint": level})
    return found


def dedup(points):
    seen, out = set(), []
    for p in points:
        key = (p["company"], p["title"], p["low"], p["high"])
        if key in seen:
            continue
        seen.add(key)
        out.append(p)
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--window-months", type=int, default=12)
    args = parser.parse_args()

    wave_dates = load_wave_dates()
    cutoff = window_cutoff(wave_dates, args.window_months)
    waves_included = sorted(w for w, d in wave_dates.items() if cutoff is None or d >= cutoff)

    tiers_data = json.loads(TIERS_FILE.read_text())
    company_tier = {name: info["tier"] for name, info in tiers_data["companies"].items()}
    # case-insensitive lookup fallback
    company_tier_ci = {k.lower(): v for k, v in company_tier.items()}

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    overview = {}

    for archetype_id in GAP_ARCHETYPES:
        fp = CORPUS_DIR / f"{archetype_id}.jsonl"
        all_points = []
        for line in fp.open(encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            rec = json.loads(line)
            if not record_in_window(rec, wave_dates, cutoff):
                continue
            pts = extract_from_posting(rec)
            for p in pts:
                tier = company_tier.get(p["company"]) or company_tier_ci.get((p["company"] or "").lower())
                p["tier"] = tier or "unclassified"
            all_points.extend(pts)

        all_points = dedup(all_points)
        usd_base = [p for p in all_points if p["currency"] == "USD" and not p["is_ote"]]

        grid = {}
        for tier in TIERS:
            grid[tier] = {}
            for level in LEVELS:
                cell_pts = [p for p in usd_base if p["tier"] == tier and p["level_hint"] == level]
                if not cell_pts:
                    grid[tier][level] = None
                    continue
                los = [p["low"] for p in cell_pts]
                his = [p["high"] for p in cell_pts]
                mids = [(p["low"] + p["high"]) / 2 for p in cell_pts]
                grid[tier][level] = {
                    "count": len(cell_pts),
                    "companyCount": len(set(p["company"] for p in cell_pts)),
                    "low": min(los),
                    "high": max(his),
                    "median": round(statistics.median(mids)),
                    "companies": sorted(set(p["company"] for p in cell_pts)),
                    "points": cell_pts,
                }

        unclassified_count = len([p for p in usd_base if p["tier"] == "unclassified"])
        out = {"archetypeId": archetype_id,
               "_meta": {"mode": "window", "window_months": args.window_months, "waves_included": waves_included},
               "grid": grid, "totalUsdBasePoints": len(usd_base),
               "unclassifiedCompanyPoints": unclassified_count}
        (OUT_DIR / f"{archetype_id}.json").write_text(json.dumps(out, indent=2))

        filled = sum(1 for tier in TIERS for level in LEVELS if grid[tier][level])
        overview[archetype_id] = {"cellsFilled": filled, "cellsTotal": 20,
                                   "totalUsdBasePoints": len(usd_base),
                                   "unclassifiedCompanyPoints": unclassified_count}
        print(f"{archetype_id:45s} cells_filled={filled:2d}/20  usd_base_pts={len(usd_base):4d}  "
              f"unclassified_company_pts={unclassified_count:4d}")

    (OUT_DIR / "_OVERVIEW.json").write_text(json.dumps(overview, indent=2))


if __name__ == "__main__":
    main()
