# Launch-day checklist — work-through-it version

**Companion to [`launch-plan.md`](launch-plan.md).** That doc specs a multi-week, segment-by-segment
rollout. This doc compresses it into a single literal today-checklist, expanded past Reddit to
Hacker News, Indie Hackers, dev.to, and verified-live Slack/Discord communities. Every
community/link below was checked today (2026-07-17) by research agents using live web search —
not recalled from training data, since invite links and self-promo rules change constantly. Where
something couldn't be verified live, it's flagged explicitly rather than presented as fact.

## Reality check first (2 min read)

- **Site verified live** at `https://www.swe-genie.com` — homepage, assessment flow, methodology
  page, and results page all load and work. 17 archetypes, matches `app/data/archetypes.json`
  (the copy in `/taxonomy/archetypes.json` at repo root is a stale Phase 1 draft — ignore it, the
  app doesn't read it).
- **Real numbers you can quote honestly:** 17 role archetypes, 22 scored dimensions (10 skill /
  12 preference), taxonomy sourced from 67,956 job postings across 744 verified companies. No
  login, no signup, no gating — methodology and all 17 archetypes are public either way.
- **This is not a sales pitch** — no paywall, no ads, nothing to buy. Every caption below is
  written that way: what it is, how it's sourced, and a straight invitation to try or pick apart
  the methodology. That's also the actual admission requirement for several communities below
  (Lobsters, r/ExperiencedDevs-style subs) — genuinely non-commercial framing is what gets this
  through their filters, not a marketing angle.
- **One real gap:** PLAN.md Phase 6 (15–25 beta testers, calibration pass) and Phase 7 (planned
  launch) are still unchecked. Launching today skips that calibration step — not a blocker, just
  means edge-case profiles may score a little rougher than after a calibration pass.

---

## Group 1 — Prep (do once, ~20 min, before posting anything)

1. **Reddit account.** Log in or create one. Many subreddits auto-remove posts from accounts
   under ~7–30 days old or with low comment karma — check yours now. If it's thin, comment
   genuinely in 2–3 target subs first.
2. **Take the assessment yourself** at `swe-genie.com/assessment` if you haven't recently — a
   real result screenshot reads far less spammy than a bare link, especially in comment threads.
3. **Canonical link locked in:** `https://www.swe-genie.com` — use this exact URL everywhere.
4. **Decide your time budget.** Some channels below (Rands Leadership Slack, a couple Discords)
   require a manual application or mod check, not an instant post — those are worth starting
   early in the day since approval isn't instant.
5. **Space posts out** — an hour or two apart, not all at once. Identical text posted rapid-fire
   across many communities is a common spam-filter trigger, on Reddit and elsewhere.

---

## Group 2 — Hacker News (Show HN) — do this early, it's the anchor channel

Confirmed live against `news.ycombinator.com/showhn.html` and the HN guidelines page.

- **Step 1:** Title must literally start with `Show HN:`, plain and factual — no marketing
  language, no exclamation points, no "best/revolutionary." You must be the creator and be
  present to reply to comments (this is an explicit rule, not a suggestion).
- **Step 2 — post with this title:**
  > `Show HN: I mapped 68k job postings into 17 software engineering role archetypes`
- **Step 3 — post a first comment immediately after submitting** (standard, expected practice —
  don't wait hours):
  > Software engineer covers a dozen genuinely different jobs — SRE, sales engineer, solutions
  > architect, DevRel, forward-deployed engineer, and so on — but the industry mostly hands you
  > tech-stack vocabulary instead of role vocabulary. Built a taxonomy of 17 of these archetypes
  > from ~68k real job postings across 744 companies, plus a scoring assessment across 22 trait
  > dimensions (client-facing comfort, ambiguity tolerance, on-call appetite, etc.) that gives a
  > ranked, explained fit instead of a personality-quiz label. No login, no signup — methodology
  > page shows every source: swe-genie.com/methodology. Would genuinely like this picked apart if
  > the scoring has holes.
- **Timing:** no official rule, but consistent community consensus — weekday (Tue–Thu skews
  best), US morning, roughly 10am–4pm Eastern. Don't over-index on this; content and first-comment
  quality matter more.
- **Don't:** ask friends to upvote/comment — "booster" activity gets spotted and penalized.
  Official rule: don't delete-and-repost if the first attempt gets little traction; a second
  Show HN generally expects a real new development, not a resubmission of the same thing.
- **Lobsters (lobste.rs) — explicitly skipped today:** confirmed invite-only, and confirmed new
  accounts (first 70 days) can't submit a domain that's never appeared on the site before —
  `swe-genie.com` is brand new, so a fresh invite wouldn't even be postable today. Also its scope
  page explicitly excludes "self-help/personal productivity," which this sits close to. Not worth
  chasing for today's launch.

---

## Group 3 — Indie Hackers + dev.to (secondary aggregators, more narrative room than HN)

### Indie Hackers — "Show IH"
- **Step 1:** Post directly into the live Show IH group (`indiehackers.com/group/show-ih`) — open,
  no gatekeeping. IH's own coaching is to lead with story, not spec sheet.
- **Step 2 — post with this title:**
  > `I built a free tool that maps the fractured "software engineer" job title into 17 real archetypes (based on 68k job postings)`
- **Step 3 — body:**
  > I kept noticing that "software engineer" has quietly split into a dozen different jobs —
  > different incentives, different days, different people you talk to — but nobody's ever handed
  > engineers the vocabulary for it. So I pulled ~68k job postings across 744 companies into a
  > sourced taxonomy of 17 role archetypes, then built a free scoring assessment (22 trait
  > dimensions) that tells you which ones you'd actually fit, ranked and explained. No signup, no
  > ads, methodology's fully public. swe-genie.com — would love feedback, especially if a role
  > reads inaccurately.

### dev.to
- **Step 1:** Confirmed self-promotion is explicitly fine here **as long as the post itself is
  helpful/educational**, not just a link drop — write it as a short explainer, not an ad.
- **Step 2 — suggested structure** (this is a short article, not a one-paste caption — budget
  20–30 min if you do this one):
  1. Open with the fragmentation problem: "software engineer" as one job title covering a dozen
     different jobs.
  2. Name a few archetypes people don't usually think of as separate lanes (forward-deployed
     engineer, solutions architect, DevRel) with one line each on what actually differs.
  3. Explain the taxonomy's sourcing (68k postings, 744 companies) in 2–3 sentences.
  4. Link the free assessment as "if you want to see where you'd land" — the resource, not the
     headline.
  5. Tag with `#career`, `#discuss`, plus one relevant tech tag.
- **Optional, do this one only if you have time today** — it's higher-effort than everything else
  in this doc, and everything else works without it.

### Product Hunt — optional, not recommended
- Technically free and open to post, but its ecosystem (maker comments, upvote rings, "launch
  support" services) is tuned for commercial SaaS launches and sits awkwardly against a genuinely
  free, non-commercial framing. Skip unless you specifically want that audience.

---

## Group 4 — Reddit: safe self-promo subs (post these first on Reddit)

### r/SideProject
- **Step 1:** Check the sidebar for a required flair (e.g. "Sharing").
- **Step 2 — title:**
  > SWE Genie — an assessment that maps your skills/temperament to 17 engineering role archetypes (SRE, sales engineer, solutions architect, DevRel, etc.), sourced from ~68k job postings
- **Step 2 — body:**
  > I got tired of "software engineer" being the only vocabulary for a dozen genuinely different
  > jobs, so I built a taxonomy of 17 engineering role archetypes and a scoring assessment that
  > maps your skills and temperament to a ranked, explained fit — not just a label.
  >
  > The taxonomy is sourced from ~68k real job postings across 744 companies, and the methodology
  > page shows every source and how the scoring works. Free, no signup, no login.
  >
  > https://www.swe-genie.com
- **Step 3:** Reply to every comment in the first hour.

### r/InternetIsBeautiful
- **Step 1:** Link-title-only sub. No self-promo commentary in comments.
- **Step 2 — title (submit as link post):**
  > A taxonomy and assessment mapping software engineers to 17 role archetypes beyond just "software engineer"
- **URL:** `https://www.swe-genie.com`

---

## Group 5 — Reddit: general dev subs

### r/webdev
- **Step 1:** Check sidebar for self-promo flair requirements or a restricted posting day.
- **Step 2 — title:**
  > Built a research-backed assessment that maps devs to 17 engineering role archetypes (not just frontend/backend) — methodology and sourcing are public
- **Step 2 — body:**
  > Built a transparent, rubric-based matcher (not a black-box model) across 17 engineering role
  > archetypes — 22 scored dimensions, weights and sourcing documented on a public methodology
  > page, ~68k job postings across 744 companies behind the taxonomy.
  >
  > No login, no gating — the full archetype list and methodology are public whether or not you
  > take the assessment.
  >
  > https://www.swe-genie.com

---

## Group 6 — Reddit: credible-technical subs (highest scrutiny, highest payoff)

### r/ExperiencedDevs
- **Step 1 — required:** Confirm current self-promo policy in the wiki before posting; message
  mods first if it requires pre-approval.
- **Step 2 — title:**
  > I built a tool to score my own profile against 17 engineering role archetypes instead of just "SWE" — curious if the methodology holds up to this crowd
- **Step 2 — body:**
  > You describe yourself by stack — "senior backend engineer," "I do React" — because that's the
  > only taxonomy the industry hands you. The thing that actually predicts whether you'll be happy
  > in a role (client-facing comfort, ambiguity tolerance, on-call appetite, sales-incentive
  > appetite) is mostly orthogonal to stack and rarely made explicit.
  >
  > I built a taxonomy of 17 role archetypes from ~68k job postings across 744 companies, plus a
  > scoring assessment against 22 dimensions. Full methodology, sourcing, and scoring logic are
  > public: https://www.swe-genie.com/methodology
  >
  > Genuinely want the methodology picked apart if there's a hole in it.

### r/programming
- **Step 1 — required:** Skims lukewarm on first-person posts; check the last week's top posts
  before deciding whether to post today.
- **Step 2:** Reuse the r/webdev caption above.

---

## Group 7 — Reddit: early-career / student subs (post last on Reddit)

### r/cscareerquestions
- **Step 1 — required:** Commonly disallows "check out my project" posts outright. Check the
  wiki; skip if disallowed rather than risk an account flag.
- **Step 2 — title:**
  > "Software engineer" covers a dozen genuinely different jobs — most people never see the map until they've stumbled into one
- **Step 2 — body:**
  > "Software engineer" is the job title on your offer letter. It covers a dozen genuinely
  > different jobs — different incentives, different days, different people you talk to. Most
  > people never see that landscape until they've accidentally ended up in (or out of) one of
  > these roles.
  >
  > I put together a map of 17 of those role archetypes (SWE, SRE, sales engineer, solutions
  > architect, DevRel, forward-deployed, etc.) sourced from ~68k real job postings, plus a free
  > assessment that scores your skills/temperament against all 17 and explains the fit.
  >
  > https://www.swe-genie.com

### r/csMajors
- **Step 1 — required:** Same check as above.
- **Step 2:** Reuse the r/cscareerquestions caption.

---

## Group 8 — Slack communities (verified live today)

Every invite link and self-promo channel below was checked live; several commonly-cited Slacks
(CodeNewbie, Out in Tech) turned out to be dead and are excluded — don't chase those.

### MLOps Community — best fit, instant join
- **Size:** 85,000+ AI/ML practitioners.
- **Join:** `gatewaze.mlops.community` (self-serve signup funnel — static invite links found via
  search are dead, use this).
- **Post in:** `#be-shameless` — their own rules explicitly invite self-promotion there.
- **Caption:**
  > Built a free tool that might be relevant here: an assessment mapping engineers to 17 role
  > archetypes (including ML Engineer and Data Engineer specifically) based on ~68k sourced job
  > postings — scores your fit across 22 trait dimensions, not just tech stack. No signup,
  > methodology's public. swe-genie.com

### DataTalks.Club — good fit, instant join
- **Size:** ~79,000+ data/ML professionals.
- **Join:** `datatalks.club/slack` — live.
- **Post in:** `#shameless-promotion` (max 2 promo posts/week, 1 link/post, must stay relevant to
  data/ML/data-engineering per their guidelines — lean on the ML/Data Engineer archetype framing).
- **Caption:** reuse the MLOps caption above.

### Rands Leadership Slack — good fit, manual approval (start this early)
- **Size:** ~30,000+ engineering managers/leaders.
- **Join:** email `invites@randsinrepose.com` with your name, occupation, reason for joining, and
  a social profile link (LinkedIn/GitHub) — not instant, so send this first thing today if you
  want to post here before end of day.
- **Post in:** `#i-built-something` (confirmed channel for exactly this).
- **Caption:**
  > Built a free tool that maps engineers to 17 role archetypes beyond just "SWE" (SRE, solutions
  > architect, DevRel, forward-deployed, etc.) — useful either for your own career questions or to
  > point a report at when they're weighing a lateral move. Sourced from ~68k job postings,
  > methodology's public, no signup. swe-genie.com

### DevOps Engineers Slack — moderate fit
- **Size:** 10,000+ engineers.
- **Join:** `devopsengineers.com/slackinvite/` — live, self-serve.
- **Post in:** channel unconfirmed — a `#career-discussion` channel is referenced third-party but
  not confirmed live; check inside the workspace for the actual self-promo channel before posting.
- **Caption:** reuse the r/webdev-style methodology caption from Group 5.

### Explicitly skipped (checked, not worth pursuing today)
- **CodeNewbie Slack** — dead, migrated off Slack entirely.
- **Out in Tech Slack** — dead invite link, no confirmed current Slack path.
- **CTO Craft Slack** — audience is CTOs/senior leaders (not the 2–15 YOE target) and explicitly
  bars anything that reads as a sales channel.
- **Techqueria** — requires a ~1-week vetting application, not same-day.

---

## Group 9 — Discord communities (verified live today)

### cscareers.dev — best fit
- **Size:** 159,570 members, ~13,600 online.
- **Join:** `discord.com/invite/cscareers` — live.
- **Post in:** `#share-your-content` (confirmed in server rules).
- **Caption:**
  > Built SWE Genie — a free assessment that scores your engineering profile against 17 role
  > archetypes (SWE, SRE, sales engineer, solutions architect, DevRel, forward-deployed, security
  > engineer, ML engineer, etc.) instead of just "software engineer." Taxonomy is sourced from
  > ~68k job postings across 744 companies; methodology and all 17 archetypes are public. No
  > signup, no ads. swe-genie.com

### CS Career Hub — good fit
- **Size:** 38,239 members, ~3,600 online.
- **Join:** `discord.com/invite/cscareerhub` — live.
- **Post in:** `#share-your-content` — their rule explicitly excludes *commercial* content, so
  lead with "free, no signup, no ads" to stay clearly inside the line.
- **Caption:** reuse the cscareers.dev caption above.

### Reactiflux — lower topical fit, cleanest rules
- **Size:** 77,146 members, ~11,000 online.
- **Join:** `discord.com/invite/reactiflux` — live.
- **Post in:** `#i-built-this` (explicit showcase channel for personal projects, confirmed via
  their own promotion policy page).
- **Note:** audience skews frontend/React specifically rather than general SWE career — lower
  priority than the two above, but the friendliest, most explicit promotion policy of any server
  checked.

### CS Majors Discord + #100Devs — good audience, verify live before posting
- `discord.com/invite/csmajors` — commonly cited as the CS Majors server; self-promo channel not
  confirmed, check pinned rules on join.
- `discord.com/invite/100devs` (Leon Noel / "Learn w/ Leon & Friends") — mostly career-changer /
  pre-first-job audience, closer to the secondary student segment; channel not confirmed, check
  pinned rules on join.

### Explicitly skipped (checked, not worth pursuing today)
- **The Coding Den** — confirmed shut down July 6, 2026. Dead.
- **The Programmer's Hangout** (214k members) — largest server checked, but its rules explicitly
  bar promoting anything you stand to benefit from, except via ModMail exception. Skip unless you
  email ModMail first and get an explicit yes.
- **freeCodeCamp Discord** — audience is more beginner/learn-to-code than the 2–15 YOE primary
  target; lower priority, fine for the secondary audience if you have time left over.

---

## After you post (today, ongoing)

- Reply to comments across all threads within the first hour or two — engagement in that window
  is what keeps a post visible, on Reddit, HN, and Discord/Slack alike.
- If a community removes the post or a mod says no, treat it as a signal to skip — don't repost
  reworded text the same day.
- Tag links per channel if you want to see what drove traffic, e.g. `?ref=hn`, `?ref=reddit-webdev`,
  `?ref=discord-cscareers` — `launch-plan.md`'s metrics section already expects UTM-style tracking.
