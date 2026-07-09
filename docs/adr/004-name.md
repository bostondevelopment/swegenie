# ADR-004: Product name and domain

**Status:** DRAFT — pending human confirmation. Nothing in this ADR should be purchased,
registered, or baked into user-facing copy/URLs/legal filings until a human has independently
verified availability and signed off. This was written autonomously (no human in the loop) per
explicit instruction; treat every availability claim below as a lead, not a fact.

**Date:** 2026-07-09

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

## Decision (proposed — needs confirmation)

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

1. **Real domain availability check** (WHOIS, not search-engine guessing) for `roleprint.com`,
   `.dev`, `.io`, and `.ai` — pick based on availability + price, `.com` preferred if free/cheap.
2. **Handle checks**: GitHub org, X/Twitter, LinkedIn company page for "roleprint" (or close
   variants if taken).
3. **Trademark sanity screen** — at minimum a USPTO TESS search in software/career-services
   classes; "print" compounds are common enough that a proper screen matters more than usual.
4. **Purchase/registration** — not to be done by an agent; needs a human with payment
   credentials and legal authority to commit the org to a brand name.
5. **Fallback plan** — if `roleprint.*` fails diligence, re-run this evaluation on the runner-up
   (`.engineer` descriptive domain) or pull 2-3 fresh candidates; do not default silently to the
   ADR-001 placeholder table without a new decision record.

## Consequences

- Until a human confirms, all app code, copy, and docs should keep using "CareerGuru (working
  name)" per ADR-001 — do not start replacing it based on this draft alone.
- Once confirmed, this ADR should be updated to Status: Accepted with the actual registered
  domain and handles recorded, and the rename sweep (repo, domain, copy) described in ADR-001's
  Consequences should be executed as a single tracked pass.
