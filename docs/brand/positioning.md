# Positioning

**Status:** Draft — Phase 4. Product name pending human confirmation (see ADR-004).

## One-liner

> **The engineering role landscape has fragmented. Find out which one you actually are.**

Working alt (results-oriented, for landing-page hero A/B testing):

> **A 6-minute assessment that maps your skills and temperament to the engineering role you'd actually be great at — SWE, SRE, sales engineer, solutions architect, and a dozen more.**

Working alt (problem-first, for content/SEO framing):

> **You describe yourself by tech stack. But "software engineer" now covers a dozen genuinely different jobs — different incentives, different days, different people you talk to. Most engineers have never seen the map.**

## The core insight (why this isn't a personality quiz)

Engineers self-sort by *stack* (I'm a "React dev," a "backend Go person," a "data engineer") because
stack is the only taxonomy the industry has handed them. But the thing that actually determines
whether you'll be happy and good at a job — client-facing comfort, ambiguity tolerance,
sales-incentive appetite, travel/embed willingness, teaching vs. building — is orthogonal to
stack, and largely invisible until you've stumbled into or out of a role by accident. This product
makes that second taxonomy explicit, sources it like research (not vibes), and gives you an
explainable ranking instead of a horoscope.

This is the thing to keep re-asserting against scope creep and tone drift: **the taxonomy is the
product, the assessment is the delivery vehicle.** Positioning, copy, and visuals should all make
the taxonomy/methodology feel like the credible core, and the quiz feel like the fast, respectful
way to apply it to you personally.

## Audience

**Primary:** Software engineers, roughly 2–15 YOE — from mid-level IC through staff/principal.
They:
- Default to describing themselves by tech stack or level ("I'm a senior backend engineer," "I do
  React"), not by role archetype, because the archetype vocabulary doesn't widely exist yet.
- Don't know the fuller landscape of technical role archetypes exists, or know it fuzzily (they've
  heard "solutions architect" and "DevRel" as job-title trivia, not as a coherent, comparable set
  of options with real tradeoffs).
- Are often quietly dissatisfied with some aspect of their current role (too much client contact,
  not enough; too much ambiguity, not enough; too much meeting load, too little human contact) but
  don't have language for what they'd trade it for.
- Are skeptical by professional habit — they will bounce hard off anything that reads as a
  BuzzFeed quiz, a corporate career-portal upsell, or unsourced trait claims. They respond to
  visible methodology, real data, and being treated as a peer who can evaluate an argument.
- Spend time on Hacker News, levels.fyi, Blind, r/ExperiencedDevs, engineering Twitter/X,
  Pragmatic Engineer, and similar — i.e., they already read reasonably rigorous
  career-and-comp content and have a bar for it.

**Secondary (not designed for first, but a natural adjacent audience):** bootcamp grads and CS
students evaluating which track to aim for; engineering managers/recruiters wanting a shared
vocabulary to describe open roles; the archetype pages themselves will pull long-tail SEO traffic
from people searching "what does a solutions architect actually do" etc.

**Explicitly not the audience:** HR/L&D buyers, career coaches as a B2B channel, non-technical job
seekers. If copy or design would appeal more to that audience than to a staff engineer, that's a
signal something has drifted off-brief.

## Tone

**Credible-technical. Think levels.fyi meets Pragmatic Engineer meets a good internal engineering
wiki — not a corporate career portal, not LinkedIn Learning, not a BuzzFeed quiz.**

Concretely:

- **Show the work.** Every trait claim in the taxonomy is sourced (Phase 1 discipline). The
  methodology page is a first-class nav item, not a footer link. Confidence and evidence quality
  are stated, not implied.
- **Respect the reader's time and intelligence.** No throat-clearing, no "Ready to discover your
  career superpower?" Assume the reader has read a methods section before and can tell when one is
  missing.
- **Precise over enthusiastic.** Prefer a specific, slightly dry claim over an exclamation point.
  "73% of sales engineers we interviewed cited live-demo recovery as their most-tested skill" beats
  "Sales engineers think on their feet!"
- **Confident but not hypey.** This is a serious research product wearing a fast, well-made web
  app, not a growth-hacked quiz wearing a research veneer. Avoid gamification language (streaks,
  badges, "unlock"), avoid astrology-adjacent words (soul, destiny, "the real you"), avoid
  therapy-speak ("holding space," "journey").
  When "growth-loop" mechanics are used (the shareable result card), they should read as a lab
  notebook artifact worth showing off — "here's my fit profile" — not a Buzzfeed "which Hogwarts
  house" card.
- **Plain about limitations.** State what the model doesn't capture, what a near-miss dimension
  means, and that this is v1 research, not gospel. Undercutting your own hype is a credibility
  signal to this audience, not a weakness.
- **Dry humor allowed, cuteness is not.** A wry aside is fine ("no, this will not ask about your
  spirit animal"). Whimsical mascot energy, forced puns, or relentless positivity are not — they
  read as HR-flavored, which is the exact failure mode ADR-001 flagged.

### Voice checklist (quick gut check for any new copy)
1. Would this sentence survive being read aloud in a Hacker News comments thread without getting
   roasted?
2. Does it make a specific, falsifiable claim, or a vague feel-good one?
3. Could this exact sentence appear on a corporate HR SaaS landing page? If yes, rewrite it.
4. Is there an exclamation point doing work that a precise word should be doing instead?

See `docs/brand/identity.md` § Copy System for worked before/after examples and the archetype
naming style guide.

## Competitive/reference framing

Not direct competitors (no one else is doing role-archetype matching for engineers specifically
at this rigor), but useful tone/credibility references:
- **levels.fyi** — data-driven, no-nonsense, engineer-to-engineer register.
- **Pragmatic Engineer** (newsletter) — practitioner-sourced, specific, allergic to fluff.
- **Otherbranch/16Personalities-style quizzes** — useful negative reference for interaction
  pattern (short, well-designed, shareable result card) but explicitly *not* for tone (horoscope
  framing, cute type names) — see identity.md naming style guide for how we differ.
- **Triplebyte's old "what kind of engineer are you" positioning** — closest historical analog;
  worth knowing about but not copying wholesale (it leaned more hiring-marketplace than
  self-discovery/taxonomy).
