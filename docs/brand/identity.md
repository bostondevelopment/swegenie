# Identity: Visual system + Copy system

**Status:** Draft — Phase 4. Assumes the product name resolves per ADR-004 (currently DRAFT,
pending human confirmation). Everything below is name-agnostic where possible — described in
terms of a generic wordmark — so it doesn't need rework if the name changes.

This doc is downstream of `docs/brand/positioning.md`. If anything here conflicts with
positioning's tone rules, positioning wins.

---

## Part 1: Visual identity

### Design thesis

The product is a research instrument wearing a fast, well-made web app. The visual system should
read like **a well-designed internal engineering tool or a data-viz-literate publication**
(think: a levels.fyi chart, a Stripe docs page, an Observable notebook) — not a consumer quiz app,
not a career-coaching SaaS. Precision over polish-for-its-own-sake. Every decorative choice should
be justifiable as "this makes the data clearer" or "this makes the result more shareable," not
"this looks fun."

**The shareable result card is the primary marketing surface.** Landing-page design matters, but
the artifact that actually acquires users is the OG image/result card that gets posted to X,
LinkedIn, or Slack. Design that first, then make the rest of the app consistent with it — not the
other way around.

### Logo / wordmark direction

No image assets in this phase — direction only, for a designer or future agent to execute.

- **Wordmark-first, no mascot, no icon-as-mascot.** A illustrated character or cute icon would
  immediately read as the HR-flavored failure mode ADR-001 flagged. If a mark is needed at all
  (favicon, avatar), it should be an abstract geometric glyph, not a face or character.
- **Glyph concept (if one is used): a small multi-axis diagram, not a badge.** The taxonomy is
  fundamentally a multi-dimensional fit space (trait dimensions × archetypes, per PLAN.md Phase
  2). A minimal radar/spoke glyph, a small scatter of connected nodes, or a simplified
  polygon-fit shape (like a tiny radar chart silhouette) is on-thesis: it *is* what the product
  does, reduced to a mark. Avoid anything that reads as a compass/map-pin cliché (overused in
  "find your path" career products — exactly the register to avoid).
- **Typeset wordmark carries most of the identity weight.** Set in the monospace or
  monospace-adjacent typeface (see Typography below) at a deliberately technical weight —
  the name should look at home next to a version number or a git SHA. A subtle detail like
  rendering part of the name in a fixed-width cut, or a single well-placed underscore/slash
  motif (echoing CLI/file-path conventions), reinforces "built by and for engineers" without
  being cute about it.
- **No gradients-as-default, no soft drop shadows, no rounded-blob shapes.** These read as
  generic SaaS/consumer-app conventions circa 2018-2023 and work against the "credible research
  tool" read. Flat color, sharp or lightly-rounded (2-4px radius) rectangles, real borders.

### Color palette

Two-mode system (light + dark), built around one confident accent rather than a rainbow of
archetype colors (archetype-specific color-coding can be a v2 nice-to-have, not a v1
requirement — it adds a design-system burden the "Done when" bar in PLAN.md Phase 4 doesn't
need).

**Core palette:**

| Token | Hex | Use |
|---|---|---|
| `ink-950` | `#0B0E14` | Dark-mode background base; near-black with a cool, slightly blue-black cast (not pure `#000`) |
| `ink-050` | `#F7F8FA` | Light-mode background base; near-white, not stark `#FFFFFF` (reduces glare, reads more "paper/terminal" than "app") |
| `slate-700` | `#3A4150` | Primary body text on light backgrounds |
| `slate-300` | `#C4CAD4` | Secondary/muted text, dark mode |
| `slate-500` | `#6B7280` | Secondary/muted text, light mode; borders |
| `accent-600` | `#2F6FED` | Primary accent — links, primary CTA, active states. A confident, slightly-desaturated blue (data-viz blue, not "startup gradient" blue) |
| `accent-400` | `#5B90F5` | Accent on dark backgrounds / hover states |
| `signal-green` | `#1E9E6B` | Positive/high-fit signal (e.g., strong match score) — desaturated, not neon |
| `signal-amber` | `#B9770E` | Near-miss / growth-area signal — desaturated ochre, not caution-tape yellow |
| `signal-red` | reserved, unused in v1 | Explicitly do not use red for "low fit" — this isn't a pass/fail test, and red reads as an error state. Low-fit archetypes should be deprioritized by omission/ordering, not color-coded as failure. |

**Archetype accent (optional, v1-lite):** if archetypes need any visual differentiation (e.g., on
the result card), use a single consistent accent hue per archetype drawn from a fixed
12-16-color qualitative palette (e.g., Observable's `d3.schemeTableau10` extended, or a similarly
desaturated qualitative set) rather than inventing bespoke colors per role. Keep saturation and
lightness consistent across the set so no archetype visually "wins" by having a louder color.

**Rationale:** the palette should look correct sitting next to a terminal, a Grafana dashboard,
or a GitHub dark-mode PR — the audience's daily visual environment — not next to a consumer
lifestyle app.

### Typography

Real, Google Fonts-available families only (confirm current availability at fonts.google.com
before implementation — font libraries do shift):

- **Display / wordmark / large headings:** **Space Grotesk** — geometric, slightly technical,
  distinct without being novelty. Alternative if unavailable or too trendy by launch:
  **IBM Plex Sans**.
- **Body copy:** **Inter** — the highest-legibility, most neutral choice for long-form
  methodology-page reading; avoids drawing attention to itself, which is correct for a
  credibility-first reading experience.
- **Monospace (data, scores, dimension labels, code-adjacent UI like the result-card
  "fit: 87%" readout, archetype IDs, version tags):** **JetBrains Mono** or **IBM Plex Mono** —
  either works; pick one and use it deliberately anywhere a number or technical label appears.
  This is a major tone lever: numbers set in monospace read as *measured*, the same numbers set
  in the body sans read as *marketing copy*.

**Pairing rule:** headings in Space Grotesk, body in Inter, anything quantitative or
identifier-like in the monospace. A results page should visibly mix all three — that mixture
*is* the "research instrument, not a quiz" signal.

### Light + dark component direction

- **Dark mode is not an afterthought — treat it as co-primary.** This audience (HN/Reddit/dev
  Twitter) browses dark-mode-default at a high rate, and a shared result card should look
  intentional in both, since it'll be screenshotted into both light and dark timelines/threads.
- **Borders over shadows.** Use 1px borders (`slate-500` at low opacity) to separate cards and
  sections rather than soft box-shadows. Shadows read as consumer-app "elevation"; borders read
  as technical-document "sectioning."
- **Data-forward components:** fit scores rendered as horizontal bar meters or small radar/spoke
  charts (echoing the logo glyph), not gauges/speedometers or badge-and-star ratings — the latter
  read as gamification, which positioning.md explicitly rules out.
- **Buttons:** rectangular or minimally rounded (4px), solid `accent-600` fill for primary,
  outlined for secondary. No pill-shaped buttons — pill buttons are the single most
  consumer-app-coded shape in current web design and work against the register here.
- **Motion:** minimal, fast (150-200ms), no bouncy/spring easing. Springy easing reads as
  playful/consumer; linear or ease-out reads as tool-like.

### The shareable result card (primary marketing surface)

Per PLAN.md Phase 5, the result page's OG image is the growth loop. Design constraints:

**What makes it shareable (credibly, to this audience):**
1. **It looks like a finding, not a badge.** Structure it like a small data card: archetype name
   set prominently in Space Grotesk, a fit score in monospace, and 2-3 top contributing
   dimensions shown as small labeled bars/spokes — not a shield/crest/certificate motif (those
   read as Buzzfeed/LinkedIn-certificate cringe to this audience).
2. **It shows its work in miniature.** Even at OG-image size, include a tiny "top signals: systems
   design, ambiguity tolerance, low client-facing pull" style annotation — the explainability that
   differentiates this from a horoscope is exactly what should survive compression into a shared
   image. A card that just says "You are: Solutions Architect 87%" with no supporting signal is a
   worse, more horoscope-shaped version of the product.
3. **Dry, specific caption line, not a hype line.** E.g., "Ranked #1 of 16 engineering role
   archetypes for [name/anonymous]" beats "I found my dream career!" — follows the voice
   checklist in positioning.md directly (would this survive being read aloud in an HN thread).
4. **Consistent card geometry regardless of archetype**, so the artifact itself becomes
   recognizable as "oh, that's a [product] result card" the second or third time someone sees one
   in a feed — brand recognition through repeated structure, not repeated logo placement.
5. **Legible at OG-image scale (1200x630) and as a thumbnail.** Monospace score + bold archetype
   name must both be readable shrunk to a Slack link-preview size; test the design at that size,
   not just full-screen.
6. **A small methodology credibility mark** (e.g., "based on N practitioner interviews" or the
   taxonomy version tag, `v1.0`, in monospace, bottom corner) — reinforces "research artifact worth
   showing off," per positioning.md's framing of the share card as "a lab notebook artifact," not
   a gamified badge.
7. **Include the domain/URL small and unobtrusive**, not as a giant watermark — confidence, not
   desperation for traffic.

**What to explicitly avoid on the card:** confetti/celebration motifs, percentile framing that
implies competition ("beat 92% of engineers!"), zodiac/horoscope-style archetype icon
illustrations, streak/gamification badges, exclamation points.

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
