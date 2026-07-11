# ADR-004: Product name and domain

**Status:** Name ACCEPTED (human-confirmed, overriding the autonomous recommendation below) —
domain/trademark/handle verification still pending. **SWE Genie** is the product name, confirmed
directly by the user on 2026-07-11, in place of this ADR's original "Roleprint" recommendation.
The evaluation below is kept as a historical record of the autonomous naming pass, not because
Roleprint is still under consideration. Nothing about the *domain* (swegenie.com/.dev/.io, GitHub
org, X/LinkedIn handles) should be purchased, registered, or treated as available until a human
independently runs a real WHOIS/handle/trademark check — none of that diligence has been done for
"SWE Genie" yet, same caveat this ADR always had for "Roleprint."

**Date:** 2026-07-09 (original autonomous draft); name decision updated 2026-07-11

## Context

ADR-001 established "CareerGuru" as a placeholder working name only, explicitly flagged as
wrong for the brand: "guru" reads career-coach/HR-flavored, conflicting with the
credible-technical positioning in `docs/brand/positioning.md` (levels.fyi / Pragmatic Engineer
register, not a corporate career portal). This ADR proposes the replacement.

## Constraints from positioning.md

- Audience is skeptical, technical engineers (2-15 YOE) who bounce off anything
  BuzzFeed-quiz-shaped or HR-flavored.
- "The taxonomy is the product, the assessment is the delivery vehicle" — the name should evoke
  a map/reference/taxonomy of roles, not a coaching or self-help register.
- Must avoid astrology-adjacent or gamification words (soul, destiny, unlock, journey).
- Archetype *result* names (not the product name) are the ones people will use in bios — see
  identity.md — so the product name itself has more latitude to be infrastructure-flavored.

## Method (and its limits)

For each candidate I ran one targeted WebSearch to check for an obvious same-name product,
registered domain, or trademark-shaped collision. This is a fast sanity filter, **not** a WHOIS
lookup, trademark search, or handle-availability check. It cannot see:
- Whether the exact `.com`/`.dev`/`.io` is registered vs. parked vs. available.
- GitHub org name, X/Twitter handle, LinkedIn page availability.
- USPTO/trademark register collisions in software/HR/career-services classes.

**A human must run an actual WHOIS + registrar check, handle checks on GitHub/X/LinkedIn, and a
trademark screen before any purchase or public commitment.**

## Candidates evaluated

| # | Name | Direction | Quick-search finding | Read |
|---|---|---|---|---|
| 1 | **Roleprint** | Fit/identity ("fingerprint for your role fit") | No collision found in one search — no existing product, no obvious domain hit either way | Promising, unconfirmed |
| 2 | **Rolemap** | Map/landscape metaphor | `rolemap.com` is a parked "coming soon" page; `rolemap.ai` is a live *different* product (AI career-roadmap/gamified goal tool); a GitHub project `ramkaucha/rolemap` (job-search tracker) also exists | Collision risk — adjacent-space products already use this name |
| 3 | **Engineer Atlas** / EngAtlas | Map/landscape metaphor | `engineeratlas.com` is a **live, unrelated product** (engineering *software* directory — CAD/BIM/GIS tools) | Ruled out — direct domain collision |
| 4 | **Stackshift** | Fit/transition framing | Heavily used — at least 5 distinct live businesses across `.com`/`.ai`/`.info`/`.net` (recruiting agency, AI automation, dev agency, content platform) | Ruled out — name is saturated |
| 5 | **Archfit** | Archetype+fit portmanteau | `archfit` is an existing npm/CLI devtool (AWS architecture validation) *and* a retail footwear/apparel brand (Skechers Arch Fit, Archfit activewear) | Ruled out — collision in both the technical space and consumer retail |
| 6 | **Rolelens** | Fit/perspective framing | A domain `rolelens.com` shows up in an August 2025 domain-registration list — likely already registered (status beyond that unconfirmed) | Risky — probably taken, unconfirmed |
| 7 | **Archetype(s).dev** | Direct archetype framing | `archetype.dev` is a **live, unrelated product** (billing-as-a-service for API teams) | Ruled out — direct domain collision |
| 8 | **What Kind of Engineer** (descriptive, `.engineer`/`.engineering` alt-TLD) | Descriptive/SEO-first | No direct collision found; `.engineer` and `.engineering` are real, live gTLDs well-suited to this content (career/portfolio sites already use them) | Viable as a *content/SEO* domain, weak as a spoken brand name |

## Decision update (2026-07-11): superseded by direct human choice

The user picked **SWE Genie** directly, in the same conversation that requested launching the
site on GitHub Pages — not by working through this ADR's candidate list or evaluation criteria.
That's a valid, higher-authority decision than an autonomous recommendation regardless of how it
was reached, so it overrides the "Top recommendation: Roleprint" section below. The candidate
evaluation and "Roleprint" rationale are kept as-is beneath this note for historical record (what
was actually considered and why), not as live guidance — treat "SWE Genie" as the name going
forward everywhere in this doc's "What still needs human sign-off" and "Consequences" sections.

The unfinished diligence items in this ADR (real WHOIS/handle/trademark checks, purchase) still
apply — just against "SWE Genie" / `swegenie.*` instead of "Roleprint" / `roleprint.*`. None of
that has been run yet.

## Original decision (2026-07-09, superseded above)

**Top recommendation: Roleprint**, with `roleprint.dev` as primary domain candidate and
`roleprint.com` as a stretch/monitor target if available.

Rationale:
- **On-thesis:** a "print" (as in fingerprint/blueprint) is a precise, individual, evidence-based
  artifact — consistent with "explainable ranking, not a horoscope." It reads as a noun for the
  *output* of the assessment (your role print), which maps directly to the shareable result card
  being the core growth mechanic (see identity.md).
- **Technical register, not HR register:** "print" carries engineering/forensic connotations
  (fingerprint, blueprint, footprint — diagnostic, not coach-y). No "guru," "coach," "path," or
  "journey" language.
- **Short, spoken-easily, spellable off a podcast mention** — matters for the HN/Pragmatic
  Engineer/Reddit distribution channels named in positioning.md.
- **Lowest collision signal of the set** — the one-shot search found no existing product or
  obvious domain squarely using this name (unconfirmed, needs real WHOIS/trademark check).

**Runner-up if Roleprint fails deeper diligence: "What Kind of Engineer" on a `.engineer` domain**
(e.g., `whatkindof.engineer` or similar) — weaker as a citable brand noun, but zero collision
risk found, on-the-nose for SEO long-tail acquisition (positioning.md's secondary-audience/SEO
note), and the `.engineer` TLD itself is a small extra credibility signal for this exact
audience. Good fallback, not the lead.

**Ruled out:** Rolemap (adjacent-space name collision), Engineer Atlas (direct collision),
Stackshift (saturated), Archfit (dual collision), Rolelens (likely taken), Archetype.dev (direct
collision).

## What still needs human sign-off before this is final

1. **Real domain availability check** (WHOIS, not search-engine guessing) for `swegenie.com`,
   `.dev`, `.io`, and `.ai` — pick based on availability + price, `.com` preferred if free/cheap.
2. **Handle checks**: GitHub org, X/Twitter, LinkedIn company page for "swegenie" (or close
   variants if taken).
3. **Trademark sanity screen** — at minimum a USPTO TESS search in software/career-services
   classes.
4. **Purchase/registration** — not to be done by an agent; needs a human with payment
   credentials and legal authority to commit the org to a brand name.
5. **Fallback plan** — if `swegenie.*` fails diligence, that's a decision for the human to make
   (variant spelling, different TLD, or a fresh name entirely) — don't default silently back to
   Roleprint or the ADR-001 placeholder without a new decision record.

## Consequences

- The **name** "SWE Genie" is confirmed and safe to use everywhere in app code, copy, and docs
  (done as of the 2026-07-11 rebrand sweep — see the commit that introduced this update) —
  unlike the original Roleprint draft, this one didn't need to wait, since it came from the human
  directly rather than an autonomous recommendation needing confirmation.
- The **domain/handles/trademark** are not confirmed — `metadataBase`, ADR references, etc. use a
  placeholder (`swegenie.example`) until a human completes the checks in the section above and
  this ADR is updated with the real registered domain.
