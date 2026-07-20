# Launch & marketing plan — v1

**Status:** Draft, companion to PLAN.md Phase 7 (Launch & growth loop). Expands that phase's
skeleton into a full segment-by-segment plan. Read `docs/brand/positioning.md` first — every
tactic below is filtered through its tone rules; where a tactic is in tension with them, that's
called out explicitly rather than smoothed over.

## The tension to manage up front

`positioning.md` names the **primary** audience as 2–15 YOE engineers and explicitly puts CS
students/bootcamp grads in **secondary**, with a warning: *"if copy or design would appeal more to
[a non-technical/HR-adjacent] audience than to a staff engineer, that's a signal something has
drifted off-brief."*

The ask here — "get this in front of many CS undergrads, grads, early-career, mid-career" — is
broader than that brief. That's fine, but it means **holding one tone across very different
channels**, some of which (campus career centers, CS Discord servers, r/cscareerquestions) have a
much lower bar for BuzzFeed-quiz energy than r/ExperiencedDevs or Pragmatic Engineer do. The
discipline: never write a *second, softer* voice for the student segment. Use the same
methodology-forward, dry, sourced tone everywhere, and let the *channel and framing* — not the
voice — do the work of reaching students. A staff engineer and a junior about to declare their
first job search should be able to read the same landing page and both find it credible.

---

## Segments

| Segment | YOE | What they're actually deciding | Primary friction |
|---|---|---|---|
| CS undergrad | pre-grad | Which internship/new-grad track to target; often only knows "SWE" as a category | No vocabulary for the role landscape at all |
| New grad / early career | 0–2 | First real role choice; may be in a rotational program or generalist new-grad role | Sorting signal vs. noise in first 6–18 months |
| Early-mid career | 2–5 | First deliberate pivot — "is backend SWE actually it, or did I just fall into it" | Knows they're unhappy with *something* but lacks language for the tradeoff |
| Mid career | 5–15 | Considering IC ladder vs. management, or an adjacent track (SA, FDE, DevRel, EM) | Sunk cost in current stack identity; skeptical of quizzes |
| Staff/principal | 10+ | Less a target for the assessment itself, more a **credibility and distribution** node (they share what they endorse) | Won't engage with anything that reads as unserious |

Staff/principal isn't a growth target so much as a **trust amplifier** — if they share it, every
segment below trusts it more. Sequence launch so credible-technical channels go first (see
Timeline), so by the time student-facing channels see it, it's already validated, not
speculative.

---

## Positioning by segment (same voice, different entry point)

Don't rewrite the hero copy per segment — rewrite the **headline framing of the same underlying
claim** depending on where someone lands from.

- **CS undergrad / new grad entry (from campus channels, r/cscareerquestions):**
  Lead with the fragmentation problem, not the quiz. *"'Software engineer' is the job title on
  your offer letter. It covers a dozen genuinely different jobs. Here's the map, and here's where
  you'd probably land."* This reframes the assessment as **research they get access to**, not a
  quiz aimed at them specifically — consistent with the brand's "taxonomy is the product" stance.
- **Early/mid career entry (from HN, r/ExperiencedDevs, newsletters):**
  Lead with the self-diagnosis angle already drafted in positioning.md: *"You describe yourself by
  stack. The thing that actually predicts whether you'll be happy is orthogonal to stack."*
- **Mid/staff entry (from Pragmatic Engineer, engineering Twitter, Blind):**
  Lead with the methodology: sourcing discipline, explainable scoring, what the model doesn't
  capture. This audience clicks through *because* of the rigor claim, not despite it.

All three land on the same site, same tone, same result-card mechanic — only the inbound
headline/ad copy differs.

---

## Channel plan by segment

### CS undergrads
- **CS-specific subreddits/Discords:** r/csMajors, r/cscareerquestions, university CS Discord
  servers. Post the fragmentation essay (not "try our quiz") — this community is allergic to
  transparent quiz marketing but receptive to a genuinely useful map, especially pre-internship
  season (roughly Aug–Oct for the following summer's cycle, and Jan–Feb for new-grad cycles).
- **University career centers / CS department newsletters:** low-cost, high-trust distribution if
  a career center will link it as a resource — pitch it as a free tool, not a sponsored placement.
  Target schools where you (or beta users) have existing relationships first.
- **Campus CS clubs / ACM chapters:** offer to do a 15-minute lightning talk or just seed the link
  in a club Slack/Discord around recruiting season — cheap, and clubs are hungry for content that
  isn't a company recruiting pitch.
- **TA/instructor channel:** if any beta users are TAs or adjuncts, a professor linking it in a
  "careers in CS" lecture slide is disproportionately effective and durable (semesters recur).

### New grad / early career (0–2 YOE)
- **r/cscareerquestions, r/ExperiencedDevs (lower bound), Blind (early-career channels).**
- **New-grad-focused newsletters** (e.g., ones that already cover internship/new-grad cycles) —
  pitch the fragmentation essay as a guest post or link inclusion.
- **LinkedIn**, used carefully: a short post from a real person (founder or beta user) sharing
  *their own* result card with a specific, non-hypey caption — not a company-page broadcast ad.
  This segment is heavily LinkedIn-native in a way the primary segment isn't. Full post copy,
  first-comment link, and tactical notes are in `launch-day-checklist.md` Group 11.

### Early-mid & mid career (2–15 YOE) — primary per positioning.md, so this is where launch *starts*
- **Show HN** with the fragmentation essay as the post, tool linked from it, per the existing
  Phase 7 plan.
- **r/ExperiencedDevs**, engineering Twitter/X, Pragmatic Engineer and similar newsletters (pitch
  directly, per Phase 7).
- **Engineering Slacks/Discords** or company alumni networks.

### Mid/staff (credibility amplifiers)
- Direct outreach to 5–10 respected staff/principal engineers or newsletter writers with early
  access *before* public launch, asking for honest feedback (not "please share") — a genuine share
  from this tier is worth more than any paid placement, and asking-for-feedback-not-shares reads
  as consistent with the brand's own "show the work, don't hype" rule.

---

## The engine: shareable result card + archetype SEO pages

This is the actual distribution mechanism across every segment, not a separate tactic — both are
already spec'd in `docs/brand/identity.md` and PLAN.md Phase 5/7:

- **Result card** is what turns any one segment's visit into the next segment's visit — a
  new grad's LinkedIn share and a staff engineer's X share both use the identical card geometry,
  which is exactly the "brand recognition through repeated structure" identity.md calls for.
- **Archetype pages** ("what does a solutions architect actually do," "forward deployed engineer
  vs. solutions architect") are long-tail SEO surface that disproportionately catches *student and
  early-career* search behavior — this is genuinely the lowest-friction way to reach undergrads
  without ever changing tone, since they're arriving via a Google search for a real question, not
  an ad. Prioritize writing/publishing these pages before broad campus-channel push — they need to
  be indexed and ranking by the time that traffic starts searching.

---

## Launch sequence

1. **Pre-launch (Phase 6, already planned):** 15–25 beta users across ≥6 archetypes, calibration
   pass.
2. **Trust seed (staff/principal outreach):** private early access to 5–10 credible names, 3–5
   days before public launch. Goal: 2–3 organic shares/mentions lined up for launch day.
3. **Public launch, credible-technical channels first (Week 1):** Show HN + fragmentation essay,
   r/ExperiencedDevs, Pragmatic-Engineer-style newsletter pitches, engineering Twitter. This
   establishes the credibility baseline before student channels see it.
4. **Archetype SEO pages live and indexed (Week 1, ideally before Week 2 push):** publish all
   drafted archetype pages; submit sitemap; this is what catches organic student search traffic
   later without any additional spend.
5. **Early-career expansion (Week 2–3):** r/cscareerquestions, Blind early-career channels,
   new-grad newsletters, LinkedIn organic (individual posts, not company page ads).
6. **Campus channels (Week 3–4, timed to recruiting season if possible):** CS subreddits/Discords,
   career centers, CS club outreach. Deliberately last — by now the tool has visible traction
   (completion count, real shares) to point to, which matters to this segment's trust calculus
   more than it does to HN's.
7. **Ongoing:** weekly metrics review (Phase 7 already specs this), feedback-loop triage, and a
   steady cadence of 1–2 new archetype/comparison pages per week feeding SEO.

---

## Metrics (segment-aware, layered on top of Phase 7's baseline)

Phase 7's "Done when" bar (1,000 completed assessments, share-rate + accuracy-feedback baselines)
stays the top-line gate. Add lightweight segment visibility so campus/student channels don't
silently dominate volume in a way that drifts the product:

- Track referrer/UTM by channel tier (credible-technical vs. campus/student) — not to gate
  launch, but to notice early if growth is coming disproportionately from one register, which is a
  signal to re-check whether copy or design has drifted (see Tension section above).
- Share-rate and "did the why feel specific to you" feedback (already in Phase 6's beta survey)
  should be tracked per traffic-tier too, if volume allows — a credibility product that scores well
  with staff engineers but poorly on "did this feel specific" with students is a real signal, not
  noise to ignore.

## Risks specific to this broader push

- **Tone drift toward HR/bootcamp-quiz territory** as student-channel volume grows — mitigated by
  sequencing (credible channels first) and by refusing a second, softer voice (see Tension
  section).
- **Campus career-center placement reads as a sponsored/HR tool** if pitched wrong — always pitch
  as "free research tool," never as a co-branded or sponsored placement, to stay consistent with
  "not the audience: HR/L&D buyers" in positioning.md.
- **SEO archetype pages ranking for the wrong intent** (e.g., ranking for "solutions architect
  salary" instead of "what does a solutions architect do") — write pages to match the *comparison/
  definitional* intent this plan is counting on, not a comp-data intent the product doesn't serve.
