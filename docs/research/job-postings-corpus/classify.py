"""
Classifies docs/research/job-postings-corpus/raw_postings.jsonl into the 18 SWE Genie archetypes
using taxonomy/title-classification-rubric.json, writing classified_postings.jsonl.

Run from the repo root: python3 docs/research/job-postings-corpus/classify.py

This is the exact script used to produce the committed classified_postings.jsonl and the counts
cited in COUNTS.md, taxonomy/archetypes.json's v1.5 notes, and each archetype's research brief.
Re-running it against raw_postings.jsonl should reproduce identical output -- if it doesn't,
either the rubric or this script has drifted from what's documented elsewhere.
"""
import json, re, sys
from collections import Counter

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

if __name__ == '__main__':
    rows = [json.loads(l) for l in open('docs/research/job-postings-corpus/raw_postings.jsonl')]
    results = []
    counts = Counter()
    for r in rows:
        label = classify(r.get('title', ''), r.get('company'))
        results.append({**r, 'archetype': label})
        counts[label] += 1

    with open('docs/research/job-postings-corpus/classified_postings.jsonl', 'w') as f:
        for r in results:
            f.write(json.dumps(r) + "\n")

    print(f"\nTotal postings: {len(rows)}")
    print(f"\nPer-archetype counts (sorted by count):")
    for label, n in counts.most_common():
        print(f"  {label:45s} {n:6d}")
