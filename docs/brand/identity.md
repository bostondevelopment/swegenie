# Identity: Visual system + Copy system

**Status:** Part 1 (Visual identity) rewritten 2026-07-17 to document the system **as actually
implemented and shipped** at swe-genie.com, verified against the live site's computed styles —
not the Phase 4 speculative spec. Where the original draft and the shipped product disagree, the
shipped product wins and the difference is called out explicitly below, because a designer or
agent picking this up should build to match the real app, not a plan that was superseded before
anyone circled back to update this doc. Part 2 (Copy system) was spot-checked against live copy
and still holds — not rewritten.

The product name is confirmed: **SWE Genie**, at `swe-genie.com` (see ADR-004). This doc is
downstream of `docs/brand/positioning.md`. If anything here conflicts with positioning's tone
rules, positioning wins.

---

## Part 1: Visual identity (as shipped — verified against the live site 2026-07-17)

### Design thesis

The product reads darker, punchier, and more playful than the original Phase 4 spec called for —
closer to a well-made dev-tool marketing site (Vercel, Raycast, Linear) than the "Stripe docs /
Observable notebook" register the original draft aimed for. It's still unmistakably
credibility-first — dry copy, a real methodology page, sourced numbers everywhere — but the visual
system leans into one confident, high-contrast accent color and bold geometry rather than the
muted, borders-not-color restraint originally specced. That's a legitimate, coherent direction; it
just isn't the one originally drafted, so this section documents what's actually there.

**The shareable result card is still the primary marketing surface** — that thesis holds and
hasn't changed.

### Logo / wordmark

No dedicated glyph/icon mark has shipped — the identity currently rests entirely on the typeset
wordmark "SWE Genie" plus a small accent-colored dot, both set in Space Grotesk (see Typography).
There's no radar/spoke glyph, and the homepage's central visual is a large, literal accent-colored
question mark ("?") rather than an abstract multi-axis diagram — a bolder, more illustrative
choice than the original "no mascot, no icon-as-mascot, abstract geometric glyph only" guidance
called for. It still avoids a face/character/mascot, so it doesn't cross into the HR-flavored
failure mode ADR-001 flagged, but a future agent shouldn't assume a radar-glyph favicon exists
anywhere in the codebase — it doesn't.

### Color palette

**Dark-only, not two-mode.** There is no light theme and no theme toggle in the shipped app — the
original "two-mode system, dark treated as co-primary" plan didn't ship as two modes; it shipped
as one, dark by default regardless of OS preference. If a light mode is wanted later, it needs to
be built from scratch against these tokens, not adapted from an existing light variant (none
exists).

**Actual tokens, read directly from the site's CSS custom properties:**

| Token | Hex / value | Use |
|---|---|---|
| `--color-bg` | `#0A0A0C` | Page background — near-black, warm-neutral (not the blue-black `ink-950` originally specced) |
| `--color-surface` | `#16161A` | Card/section surface, one step up from bg |
| `--color-fg` | `#F5F5F2` | Primary text — warm off-white, not pure white |
| `--color-muted` | `#F5F5F2` at ~68% opacity | Secondary text |
| `--color-muted-2` | `#F5F5F2` at ~50% opacity | Tertiary/faint text |
| `--color-border` | `#F5F5F2` at ~8% opacity | Hairline borders |
| `--color-accent` | `#B3EE55` | Primary accent — buttons, links, active states, hero glyph. A saturated chartreuse/lime green — **not** the desaturated blue (`#2F6FED`) originally specced. This is the single biggest divergence from the Phase 4 plan and the one most worth a deliberate decision either way, since it reads closer to "startup-punchy" than the original "data-viz blue, credible-research" brief called for. |
| `--color-accent-ink` | `#0A0A0C` | Text color rendered on top of accent-filled surfaces (buttons) |
| `--color-signal-good` | `#56D57B` | Positive/high-fit signal — a distinct, slightly cooler green from the accent, so the two don't collide |
| `--color-signal-warn` | `#FAAB3F` | Near-miss/growth-area signal — orange-amber |
| signal-red | still unused | The original "don't color-code low fit as failure" rule held — no red token exists in the shipped palette either. |

There is no archetype-specific qualitative color set in production — archetypes are
differentiated by name/rank/score, not by hue, which is actually simpler than the "optional
v1-lite" 12–16-color plan the original draft floated. Treat that plan as not-built and not
currently needed.

### Typography

**Two typefaces shipped, not three** — there is no Inter anywhere in the app; body copy uses the
same display face as headings.

- **Space Grotesk** — used for *everything* except uppercase micro-labels: h1/h2 headings, body
  paragraphs, button labels, and — notably — the numeric stat figures on the methodology page
  (`67,956`, `744`, etc., set at weight 600). The original plan's "numbers in monospace read as
  measured, numbers in body sans read as marketing copy" distinction did not carry through to
  implementation — stat figures are Space Grotesk, not monospace, in the shipped site.
- **IBM Plex Mono** — used narrowly, for short uppercase micro-copy only: section eyebrows like
  "FIND YOUR LANE," small kickers, and similar label-scale text (13px, ~3px letter-spacing in the
  observed instance). It is **not** JetBrains Mono (the original doc's either/or pick), and it is
  **not** applied to data/scores/numbers the way the original spec intended — its actual role in
  the shipped app is closer to "uppercase eyebrow typeface" than "the numbers-and-data typeface."

**Practical pairing rule as shipped:** Space Grotesk for essentially all reading content
(headings, body, numbers, buttons); IBM Plex Mono reserved for short all-caps kickers only. A
future agent extending the UI should follow this real pattern rather than the original
three-way split, unless a deliberate decision is made to reintroduce a numbers-in-mono treatment
(which would be a legitimate, easy way to recover some of the original "measured, not marketing"
signal if it's ever felt to be missing).

### Component direction (as shipped)

- **Buttons are fully pill-shaped** (`border-radius: 999px`), solid accent-lime fill with
  near-black text for primary actions. This directly contradicts the original "no pill-shaped
  buttons, rectangular or 4px radius only" rule — pill buttons are the shipped reality across the
  primary CTA ("Take the assessment"). Worth a conscious call: keep the pill (it's now the
  established, live brand mark) or file a redesign — but don't silently assume rectangular buttons
  exist anywhere in production.
- **Archetype word-cloud tags are rotated "sticker" chips** — small accent-bordered pills/tags
  (4px corner radius) tilted a few degrees off-axis, scattered around the homepage hero. This
  reads closer to a playful, sticker-sheet motif than the original "precision over polish, avoid
  anything that reads as fun" thesis anticipated — it's restrained (no illustrations, no color
  variety, no characters) but is a genuine tonal departure worth knowing about before adding more
  UI in this style.
- **Borders over shadows still holds** — hairline borders (`--color-border`, ~8% opacity) separate
  sections; no soft box-shadows observed. This part of the original plan did ship as specced.
  Data is generally shown as text/numbers rather than radar or spoke charts — no chart component
  matching the original "small radar/spoke chart" idea was found on the pages checked
  (homepage, methodology).
- **Motion:** not audited in this pass; no obvious spring/bounce easing observed casually, but
  this wasn't measured the way color/type/shape were — treat as unverified rather than confirmed.

### The shareable result card (primary marketing surface)

**This has not shipped at all.** Confirmed by grepping the app source: there is no OG-image route,
no `ImageResponse`, no `og:image`/`twitter:image` generation anywhere in `/app`. The live
`ShareBar` component (`app/components/ShareBar.tsx`) only copies a plain result-page URL to the
clipboard — there is no generated image artifact today. So the growth-loop mechanic this whole
section describes as "the primary marketing surface" doesn't exist yet in production; treat
everything below as a design brief for unbuilt work, not a description of anything live:

1. It should look like a finding, not a badge — archetype name prominent, fit score legible, 2–3
   top contributing dimensions shown as small annotations, not a shield/crest/certificate motif.
2. It should show its work in miniature (e.g., "top signals: systems design, ambiguity tolerance,
   low client-facing pull") rather than a bare label + score.
3. Caption should be dry and specific ("Ranked #1 of 17 engineering role archetypes"), not hypey —
   note the count is **17**, not the original draft's placeholder 16 or 18.
4. Consistent card geometry across archetypes so it's recognizable as "a SWE Genie result card" on
   sight.
5. Legible at OG-image scale (1200×630) and as a link-preview thumbnail.
6. A small methodology credibility mark (taxonomy version, source count) in a corner.
7. Domain shown small and unobtrusive, not as a watermark.

**What to still explicitly avoid:** confetti/celebration motifs, competitive percentile framing,
horoscope-style icon illustrations, streak/gamification badges, exclamation points — consistent
with positioning.md and unaffected by anything else that's changed above.

---

## Part 2: Copy system

### Microcopy voice guide

The full tone doctrine lives in positioning.md; this section is the applied, line-level guide —
before/after rewrites for the copy an engineer actually building the product will need to write
constantly (buttons, empty states, errors, transitions).

**Core rewrite move, almost every time:** delete the enthusiasm, add the specific.

| Context | Before (generic quiz/HR voice) | After (this brand's voice) | Why |
|---|---|---|---|
| Landing CTA | "Ready to discover your career superpower? Take the quiz!" | "Take the 6-minute assessment. See your top role matches, ranked and explained." | Removes "superpower"/exclamation hype; states duration and mechanism up front — respects time, per positioning.md |
| Assessment intro | "There are no wrong answers — just be yourself!" | "Answer for how you actually behave, not how you'd like to. The model only works if the input's honest." | Original is filler reassurance; rewrite gives an actual reason, treats reader as capable of following an argument |
| Progress/loading state | "Crunching your results... almost there!" | "Scoring your profile against 16 role archetypes." | States what's literally happening instead of faux-suspense; still short |
| Result headline | "You're a Solutions Architect! 🎉" | "Top match: Solutions Architect — 87% fit" | Emoji/exclamation removed; score included inline, which is the credibility signal, not the celebration |
| Near-miss / secondary match | "So close! You almost got Sales Engineer." | "Sales Engineer ranked #2 (81%). Gap driver: lower client-facing comfort score." | "So close" implies a test with a winner; rewrite reframes as ranked continuum with a named, specific driver — matches "near-miss dimensions as growth areas," not failure |
| Share prompt | "Share your results with friends and unlock your full report!" | "Share your result card. Full methodology and all 16 archetypes are public — nothing's gated." | Removes "unlock" (positioning.md explicitly bans gamification language); also removes any implied paywall/gating the product doesn't have |
| Empty/skip state | "Oops! You skipped this one. No worries, we'll figure it out." | "Skipped. We'll estimate this dimension from your other answers and flag it as lower-confidence." | "Oops/no worries" is faux-casual filler; rewrite tells the reader the actual mechanism, consistent with "state confidence and evidence quality" |
| Error state | "Something went wrong on our end. Oopsie!" | "That didn't save. Your answers are still in this browser — reload and continue." | Removes cutesy "oopsie"; gives the actually-useful information (data isn't lost), ties back to the "answers never leave your browser" trust property from ADR-003 |
| Methodology page teaser | "Curious how the magic happens? Peek behind the curtain!" | "How the taxonomy was built, and what it doesn't capture." | "Magic"/"curtain" undercuts the entire credibility thesis; rewrite is the literal, dry table-of-contents description — which is stronger copy for this audience, not weaker |

**Quick rules extracted from the above:**
- If a sentence would work equally well for a horoscope app, a personality quiz, and this
  product, it's not doing its job — make it specific to *this* product's mechanism (scoring,
  dimensions, sourcing).
- State the mechanism, not the emotion. "Scoring against 16 archetypes" beats "crunching the
  numbers." The mechanism *is* the credibility.
- Delete exclamation points by default; earn one back only for genuinely surprising factual
  content (rare — e.g., a truly unexpected top match), never for UI chrome.
- Never use: unlock, superpower, journey, magic, curtain, oops/oopsie, "no wrong answers,"
  "friends," any emoji in product copy (emoji are fine in a founder's own launch-post voice on
  X/HN, not in in-product UI).

### Archetype naming style guide

This is the highest-stakes copy surface in the product: archetype names become **how people
describe themselves** — in a bio, in a Slack status, in conversation ("I tested as a Forward
Field Engineer"). That's a much higher bar than typical UI copy: it has to survive being said out
loud by a stranger about themselves, unprompted, and not embarrass them.

**Rules:**

1. **Memorable, not cutesy.** The name should be sticky because it's *precise*, not because it's
   whimsical. Test: would a staff engineer put this in their Twitter bio without feeling like
   they're quoting a Buzzfeed result? "The Debugger" passes. "The Code Whisperer" fails (mystical
   framing positioning.md explicitly warns against).
2. **Grounded in the real job title family where one exists — don't invent fantasy names for
   real roles.** If the archetype maps closely to an existing recognized title (Sales Engineer,
   Solutions Architect, SRE), keep that title as the primary name, possibly with a sharpening
   modifier ("Forward-Deployed Engineer" rather than a renamed fantasy label). Invented names are
   only for archetypes that don't already have one clear industry-standard title, or where the
   research (Phase 1) found the existing title is itself ambiguous/contested.
3. **When a name must be coined, ground it in a concrete behavior or artifact, not a
   personality trait or animal/element metaphor.** Behavior-and-artifact-grounded names age well
   and sound like job descriptions; trait/metaphor names age like personality-quiz output.
   - Good pattern: "[Verb-adjacent noun] + [domain noun]" — e.g., "Incident Commander" (SRE-lean,
     production-facing), "Systems Cartographer" (platform/infra-mapping-heavy roles),
     "Live-Demo Engineer" (if distinct from generic Sales Engineer).
   - Avoid pattern: "The [Adjective] [Animal/Element]" — e.g., "The Agile Falcon," "The Code
     Ninja," "The Debugging Wizard." Also avoid pure trait labels with no artifact — "The
     Empath," "The Visionary" — these are astrology-shaped, exactly what positioning.md rules
     out.
4. **No tiering language in the name itself.** Don't produce names that read as a hierarchy
   ("Junior Builder" / "Master Architect") — fit is about role shape, not seniority; seniority is
   a separate, orthogonal axis already captured by tech-stack intake (PLAN.md Phase 3). An
   archetype name should be equally sayable by a 3-YOE and a 15-YOE engineer.
5. **Two-to-four words, front-loaded with the identifying noun.** "Forward-Deployed Engineer,"
   not "The Engineer Who Deploys Forward." Bio-length, not headline-length.
6. **Pressure-test every candidate name with the positioning.md voice checklist**, plus one added
   question specific to naming: *"Would I be a little proud to say this about myself at a
   meetup, unprompted?"* If the honest answer is "I'd only say this ironically," reject the name.

**Worked examples (illustrative — final names are a Phase 1/3 taxonomy deliverable, not this
doc's job to finalize):**

| Reject | Why | Better direction |
|---|---|---|
| "The Client Whisperer" | Mystical/trait framing, animal-adjacent "whisperer" cliché | "Client-Facing Systems Engineer" or keep "Sales Engineer" if that's the closer match |
| "Code Ninja" | Novelty/meme term, has zero information content about the actual role | "Deep Systems Engineer" or "Infrastructure Engineer" (name the actual work) |
| "The Visionary Architect" | "Visionary" is a personality trait, not a job function; also flatters in a way that reads as horoscope | "Solutions Architect" (keep the real title) or "Platform Architect" if more specific |
| "Junior Helper" / "Master Builder" | Bakes in seniority tiering | Drop the tier word; if a real distinction is needed, express it as a separate "experience level" field, not the archetype name |
| "The Firefighter" | Borderline — vivid but is a trait metaphor rather than a job artifact | "Incident Commander" (same energy, but names an actual accountable role/artifact that exists in real orgs) |

**Process note for Phase 1/3 taxonomy authors:** when naming an archetype, first check whether
an existing, recognized industry title already covers it — use that. Only coin a new name when
the research brief shows the existing vocabulary is genuinely missing or misleading, and when
coining one, run it through rules 3-6 above before it goes in `/taxonomy/archetypes.json`.
