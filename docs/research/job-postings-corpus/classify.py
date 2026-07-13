"""
Classifies job postings into the SWE Genie archetypes using
taxonomy/title-classification-rubric.json.

Two modes:

  --wave <id>        Incremental: classify only the new postings in
                      waves/<id>/raw_postings.jsonl, appending to
                      classified_postings.jsonl. Postings whose dedup_key
                      (company+title+location, see WAVE_DESIGN.md) is already
                      in seen_postings_index.jsonl are treated as reposts of a
                      previously-classified role and skipped -- not
                      re-classified, not double-counted. Run from the repo
                      root: python3 docs/research/job-postings-corpus/classify.py --wave 2026-07

  --reclassify-all    Full rebuild: re-runs classify() against the CURRENT
                      rubric for every posting in every waves/*/raw_postings.jsonl,
                      rewriting classified_postings.jsonl and
                      seen_postings_index.jsonl from scratch. classify() is a
                      pure function of (title, company, rubric) -- the
                      dedup-skip logic above lives only in --wave mode, so a
                      rubric change (new archetype added, or an existing
                      archetype's patterns edited) never reaches historical
                      postings unless this mode is used. Prints a
                      blast-radius report: per-archetype postings gained/lost
                      vs. the previous classification, so you know exactly
                      which archetypes need their comp data and results-copy
                      re-reviewed (see docs/ADD_ARCHETYPE.md Stage 5). Run
                      this after ANY rubric edit, even ones that look
                      additive-only -- it's a pure re-derivation from data
                      already on disk, no new harvesting required, and the
                      report tells you plainly if nothing moved.

This is the exact script used to produce wave 1's committed classified_postings.jsonl and the
counts cited in COUNTS.md, taxonomy/archetypes.json's v1.5 notes, and each archetype's research
brief. Re-running --wave 2026-07 should classify zero new postings (everything already in the
index) -- if it doesn't, either the rubric or this script has drifted from what's documented
elsewhere. Re-running --reclassify-all with no rubric change should report zero deltas for the
same reason.
"""
import argparse, hashlib, json, re
from collections import Counter
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
CORPUS_DIR = REPO_ROOT / "docs/research/job-postings-corpus"
INDEX_PATH = CORPUS_DIR / "seen_postings_index.jsonl"
CLASSIFIED_PATH = CORPUS_DIR / "classified_postings.jsonl"


def normalize_key_field(s):
    return re.sub(r"\s+", " ", re.sub(r"[^\w\s]", "", (s or "")).strip().lower())


def dedup_key(row):
    raw = "|".join(normalize_key_field(row.get(f)) for f in ("company", "title", "location"))
    return hashlib.sha256(raw.encode()).hexdigest()

with open('taxonomy/title-classification-rubric.json') as f:
    rubric = json.load(f)

exclude_res = [re.compile(e['pattern'], re.I) for e in rubric['always_exclude_patterns']]

SENIORITY = re.compile(
    r'^(senior|sr\.?|staff|principal|lead|junior|jr\.?|associate|entry[\s-]level|'
    r'i{1,3}|iv|v|1|2|3|4|5)\s+|\s+(i{1,3}|iv|v|[1-5])$',
    re.I,
)

def normalize(title):
    t = title.strip()
    prev = None
    while prev != t:
        prev = t
        t = re.sub(r'\s*[\(\[][^)\]]*[\)\]]\s*$', '', t).strip()
        t = SENIORITY.sub(' ', t).strip()
    return t.lower()

ambiguous_phrases = set()
for e in rubric['known_ambiguous_titles']:
    desc = re.sub(r'\([^)]*\)', '', e['pattern'])
    for part in re.split(r'\s*/\s*', desc):
        part = part.strip()
        if part:
            ambiguous_phrases.add(part.lower())
ambiguous_phrases.add('tpm')

archetypes = sorted(rubric['archetypes'], key=lambda a: a['priority'])
compiled = []
for a in archetypes:
    pos = [re.compile(p, re.I) for p in a['positive_patterns']]
    neg = [re.compile(p, re.I) for p in a['negative_patterns']]
    compiled.append({'id': a['id'], 'pos': pos, 'neg': neg})

# Company-context override: these are VERIFIED real consulting/SI firms (confirmed by
# reading their actual job titles -- "Solutions Architect"/"Cloud Architect"/"Consultant"
# at these companies has no reason to redundantly say "consulting" in the title, since the
# whole company IS the consultancy -- title-text-only matching systematically undercounts
# this archetype for exactly that reason).
KNOWN_CONSULTANCIES = {
    'thoughtworks', 'dept', 'solita', 'robots & pencils', 'nearform', 'excella',
    'modus create', 'caylent', 'trace3', 'effectual', 'ippon technologies', 'intellias',
    'gdit (general dynamics information technology, subsidiary of general dynamics)',
    'valtech', 'vml (wunderman thompson)', 'r/ga', 'ideo', 'reply', 'instrument', 'huge inc',
}
ARCHITECT_RE = re.compile(r'\barchitect\b', re.I)
CONSULTANT_RE = re.compile(r'\b(consultant|delivery\s+(engineer|manager|lead)|implementation)\b', re.I)
NOT_ARCHITECT_NEG = re.compile(r'\bsales\b|\brecruit(er|ing)\b|\bdata\s+scientist\b|\bdata\s+analyst\b', re.I)

# OpenAI's "(AI) Deployment Engineer" is publicly documented as its FDE-equivalent role
# (modeled on Palantir's Forward Deployed Engineer), unlike the same phrase at other
# companies where it means infra-deployment tooling or physical robot installation --
# see known_ambiguous_titles for why this isn't a blanket regex.
OPENAI_DEPLOYMENT_RE = re.compile(r'\bdeployment\s+engineer\b', re.I)
OPENAI_MANAGER_NEG = re.compile(r'\bmanager\b', re.I)

def classify(title, company):
    if not title or not title.strip():
        return 'MISSING_TITLE'
    for r in exclude_res:
        if r.search(title):
            return 'EXCLUDED'
    norm = normalize(title)
    if norm in ambiguous_phrases:
        return 'AMBIGUOUS'
    for c in compiled:
        if any(r.search(title) for r in c['pos']) and not any(r.search(title) for r in c['neg']):
            return c['id']
    # company-context overrides
    if company and company.lower() in KNOWN_CONSULTANCIES and not NOT_ARCHITECT_NEG.search(title):
        if ARCHITECT_RE.search(title):
            return 'solutions-architect-consulting'
        if CONSULTANT_RE.search(title):
            return 'consulting-engineer-professional-services'
    if company == 'OpenAI' and OPENAI_DEPLOYMENT_RE.search(title) and not OPENAI_MANAGER_NEG.search(title):
        return 'forward-deployed-engineer'
    return 'UNCLASSIFIED'

def reclassify_all():
    waves_dir = CORPUS_DIR / "waves"
    wave_dirs = sorted(p for p in waves_dir.iterdir() if p.is_dir())

    old_by_key = {}
    if CLASSIFIED_PATH.exists():
        for l in open(CLASSIFIED_PATH):
            rec = json.loads(l)
            old_by_key[dedup_key(rec)] = rec.get('archetype')

    new_results, new_index_rows = [], []
    old_counts, new_counts = Counter(), Counter()
    seen_keys = set()
    total_raw = 0
    for wd in wave_dirs:
        raw_path = wd / "raw_postings.jsonl"
        if not raw_path.exists():
            continue
        wave_id = wd.name
        for l in open(raw_path):
            r = json.loads(l)
            total_raw += 1
            key = dedup_key(r)
            if key in seen_keys:
                # same posting harvested again in a later wave -- keep the
                # earliest wave's attribution, don't classify or count twice
                continue
            seen_keys.add(key)
            label = classify(r.get('title', ''), r.get('company'))
            new_results.append({**r, 'archetype': label, 'wave_id': wave_id})
            new_index_rows.append({'dedup_key': key, 'wave_id': wave_id})
            new_counts[label] += 1
            if key in old_by_key:
                old_counts[old_by_key[key]] += 1

    with open(CLASSIFIED_PATH, 'w') as f:
        for r in new_results:
            f.write(json.dumps(r) + "\n")
    with open(INDEX_PATH, 'w') as f:
        for r in new_index_rows:
            f.write(json.dumps(r) + "\n")

    print(f"\nFull reclassify: {total_raw} raw postings across {len(wave_dirs)} wave(s), "
          f"{len(new_results)} unique postings classified against the current rubric.")

    all_labels = sorted(set(old_counts) | set(new_counts))
    print(f"\nBlast-radius report (archetype: before -> after):")
    any_delta = False
    for label in all_labels:
        before, after = old_counts.get(label, 0), new_counts.get(label, 0)
        delta = after - before
        if delta != 0:
            any_delta = True
        flag = "" if delta == 0 else f"  <-- {'GAINED' if delta > 0 else 'LOST'} {abs(delta)}"
        print(f"  {label:45s} {before:6d} -> {after:6d}{flag}")

    if not any_delta:
        print("\nNo archetype's classification changed -- reclassify is idempotent against the current rubric.")
    else:
        print("\nRun build-by-archetype.py, then synthesize-comp-data.py, then review results-copy and job "
              "examples for every archetype flagged above (see docs/ADD_ARCHETYPE.md Stage 5).")


def classify_wave(wave_id):
    wave_raw_path = CORPUS_DIR / "waves" / wave_id / "raw_postings.jsonl"
    rows = [json.loads(l) for l in open(wave_raw_path)]

    seen = set()
    if INDEX_PATH.exists():
        for l in open(INDEX_PATH):
            seen.add(json.loads(l)['dedup_key'])

    new_results, new_index_rows = [], []
    counts, skipped = Counter(), 0
    for r in rows:
        key = dedup_key(r)
        if key in seen:
            skipped += 1
            continue
        seen.add(key)
        label = classify(r.get('title', ''), r.get('company'))
        new_results.append({**r, 'archetype': label, 'wave_id': wave_id})
        new_index_rows.append({'dedup_key': key, 'wave_id': wave_id})
        counts[label] += 1

    with open(CLASSIFIED_PATH, 'a') as f:
        for r in new_results:
            f.write(json.dumps(r) + "\n")
    with open(INDEX_PATH, 'a') as f:
        for r in new_index_rows:
            f.write(json.dumps(r) + "\n")

    print(f"\nWave {wave_id}: {len(rows)} raw postings, {skipped} already seen (skipped), "
          f"{len(new_results)} newly classified and appended.")
    print(f"\nNew-this-wave per-archetype counts (sorted by count):")
    for label, n in counts.most_common():
        print(f"  {label:45s} {n:6d}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--wave', help='wave id, e.g. 2026-07 -- classify only that wave\'s new postings')
    group.add_argument('--reclassify-all', action='store_true',
                        help='re-run classify() for every posting in every wave against the current rubric')
    args = parser.parse_args()

    if args.reclassify_all:
        reclassify_all()
    else:
        classify_wave(args.wave)
