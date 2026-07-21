# Launch-day checklist — work-through-it version

**Interactive version (checkboxes, progress tracker, copy buttons):** [SWE Genie — Launch Day Checklist](https://claude.ai/code/artifact/627acf40-a613-4ed7-9ade-1109d26ba061)

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

**How to read the group numbers below:** they're ordered by risk/receptiveness (safest and most
welcoming communities first), not by what day to post them. Within Groups 04–07 (Reddit), "post
first" means first *among the Reddit subs* — HN/IH/dev.to (Groups 02–03) still come before any
Reddit posting in the actual day-by-day sequence below.

## Suggested schedule — research-checked, updated

Checked actual engagement data for Reddit and Discord/Slack, not just Hacker News, since the
first draft of this schedule only accounted for HN's timing. Friday afternoon turns out to be a
weak window across all three, not just HN: Reddit engagement research explicitly flags "Friday
late afternoons when people are disengaging from work" as one of its worst windows, and
Discord/Slack both show weekday mid-morning (9–11am) as their strongest window with weekends and
Fridays trailing off. Nothing researched pointed the other way for any channel — so **today is
prep and joining only; no posts go out until Monday morning**, when every channel is in its own
strong window at once.

| When | Do |
|---|---|
| **Today — join and prepare only, don't post yet** | Finish Group 01 (Prep): verify Reddit account age/karma, take the assessment yourself. Join (but don't post in) MLOps Community Slack, DataTalks.Club Slack, DevOps Engineers Slack, cscareers.dev Discord, CS Career Hub Discord, Reactiflux Discord (Groups 08–09). |
| **Today — the one exception** | Send the Rands Leadership Slack application email (`invites@randsinrepose.com`) today regardless — approval isn't instant, so this can't wait for Monday the way everything else can. |
| **Today or this weekend, optional** | Draft the dev.to explainer (Group 03) — not time-sensitive to write, only to publish. |
| **Monday, 9:30am ET** | Post in MLOps Community Slack (#be-shameless) and DataTalks.Club Slack (#shameless-promotion) — Slack/Discord's 9–11am sweet spot. |
| **Monday, 9:45am** | Post in cscareers.dev, CS Career Hub, and Reactiflux Discord (Group 09). |
| **Monday, 10:00am** | Post Show HN (Group 02) — title, then the first comment immediately. Weekday mornings (especially Tue–Thu) outperform Friday-into-weekend. |
| **Monday, 10:15am** | Post r/ExperiencedDevs (Group 06). |
| **Monday, 10:30am** | Post r/programming (Group 06). |
| **Monday, 10:45am** | Post r/SideProject (Group 04). |
| **Monday, 11:00am** | Post r/InternetIsBeautiful (Group 04). |
| **Monday, 11:15am** | Post r/webdev (Group 05). |
| **Monday, 11:30am** | Publish the dev.to article if you wrote it; post Indie Hackers Show IH (Group 03) — neither is day-sensitive, bundled here for one coordinated launch day. |
| **Monday, all day** | Reply to every comment within the first hour or two of each post — this matters more than the exact minute you post. |
| **Tuesday or Wednesday** | Post r/cscareerquestions, r/csMajors (Group 07), CS Majors Discord, #100Devs (Group 09) — these land better once Monday's channels show real comments/traction to point to, per launch-plan.md's own campus-channel sequencing logic. |

Sources checked: Reddit engagement-timing research (Postiz, RecurPost, Single Grain, 2026 data)
and Discord/Slack community-engagement research (SocialMate, Sprinklr) — both independently point
to weekday mornings over Friday afternoons/weekends for professional and niche communities like
these.

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
  > `Show HN: "Software engineer" covers a dozen different jobs — I built a free tool to map which one fits you`
  >
  > Two alternates if the above doesn't feel right on the day: `Show HN: I built a free assessment
  > to show engineers which of 17 roles they'd actually fit` or `Show HN: Most engineers describe
  > themselves by stack. I built a tool that scores deeper fit across 17 roles`. Lead with the
  > insight or the reader's problem, not the mechanism (job postings count, archetype count).
- **Step 3 — post a first comment immediately after submitting** (standard, expected practice —
  don't wait hours):
  > "Software engineer" is one job title covering a dozen genuinely different jobs. Sales engineers,
  > SREs, solutions architects, forward-deployed engineers, developer advocates — different
  > incentives, different days, different people you talk to. Most engineers never see that
  > landscape until they've accidentally ended up in (or out of) one of those roles.
  >
  > I built SWE Genie to make the map explicit: 17 role archetypes scored across 22 dimensions
  > (client-facing comfort, ambiguity tolerance, on-call appetite, and more), so you get a ranked,
  > explained fit instead of a personality-quiz label. Taxonomy sourced from 68k real job postings
  > across 744 companies; methodology and every source are public: swe-genie.com/methodology. No
  > login, no signup.
  >
  > Genuinely want the scoring picked apart if there are holes in it.
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
  > `"Software engineer" is one title for a dozen different jobs. I built a free tool to make the map explicit.`
- **Step 3 — body:**
  > Most engineers describe themselves by stack — "I'm a backend engineer," "I do React" — because
  > that's the only vocabulary the industry gives you. It doesn't tell you whether you'd be happier
  > as an SRE, a solutions architect, a forward-deployed engineer, or DevRel.
  >
  > I built SWE Genie to make that map explicit. Taxonomy sourced from ~68k real job postings
  > across 744 companies — scores your skills and temperament against 17 role archetypes across 22
  > dimensions, tells you which ones you'd actually fit, ranked and explained. Methodology's fully
  > public, no signup, no ads. swe-genie.com
  >
  > Would love feedback, especially if a role reads inaccurately.

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
  > SWE Genie — a free tool that shows which of 17 engineering roles you'd actually fit, beyond just "software engineer"
- **Step 2 — body:**
  > "Software engineer" is one job title covering a dozen genuinely different jobs. Most engineers
  > never see the full landscape until they've stumbled into (or out of) one of these roles.
  >
  > SWE Genie maps it explicitly: 17 role archetypes scored from ~68k real job postings across 744
  > companies. You get a ranked, explained fit, not a personality-quiz label. Methodology's public,
  > no signup, no login.
  >
  > https://www.swe-genie.com
- **Step 3:** Reply to every comment in the first hour.

### r/sideprojects
- **Step 1:** Check sidebar for flair requirements.
- **Step 2 — title:**
  > SWE Genie — a free tool that shows which of 17 engineering roles you'd actually fit, beyond just "software engineer"
- **Step 2 — body:** Reuse the r/SideProject body above.
- **Step 3:** Reply to every comment in the first hour.

### r/InternetIsBeautiful
- **Step 1:** Link-title-only sub. No self-promo commentary in comments.
- **Step 2 — title (submit as link post):**
  > "Software engineer" covers a dozen different jobs. This maps which one you'd actually fit.
- **URL:** `https://www.swe-genie.com`

---

## Group 5 — Reddit: general dev subs

### r/webdev
- **Step 1:** Check sidebar for self-promo flair requirements or a restricted posting day.
- **Step 2 — title:**
  > Built a free tool that shows which of 17 engineering roles you'd actually fit — frontend/backend is only part of the map
- **Step 2 — body:**
  > Most devs describe themselves by stack — "I do React," "I'm backend" — because that's the only
  > vocabulary the industry gives you. It doesn't tell you whether you'd fit better as an SRE, a
  > solutions architect, a forward-deployed engineer, or one of a dozen other roles.
  >
  > SWE Genie maps it: 17 role archetypes scored from ~68k real job postings across 744 companies.
  > Rubric-based, not a black box — weights and sourcing are on the public methodology page. No
  > login, no gating.
  >
  > https://www.swe-genie.com

---

## Group 6 — Reddit: credible-technical subs (highest scrutiny, highest payoff)

### r/ExperiencedDevs
- **Step 1 — required:** Confirm current self-promo policy in the wiki before posting; message
  mods first if it requires pre-approval.
- **Step 2 — title:**
  > You describe yourself by stack because that's the only vocabulary the industry gives you. I built something that goes deeper — want the methodology picked apart.
- **Step 2 — body:**
  > You describe yourself by stack — "senior backend engineer," "I do React" — because that's the
  > only vocabulary the industry gives you. The thing that actually predicts whether you'll be happy
  > in a role (client-facing comfort, ambiguity tolerance, on-call appetite, sales-incentive
  > appetite) is mostly orthogonal to stack and rarely made explicit.
  >
  > I built a taxonomy of 17 role archetypes from ~68k job postings across 744 companies, plus a
  > scoring assessment against 22 dimensions. Full methodology, sourcing, and scoring logic are
  > public: https://www.swe-genie.com/methodology
  >
  > Genuinely want the methodology picked apart if there's a hole in it.

### r/compsci
- **Step 1 — required:** Leans toward CS theory and research — frame around the methodology and
  data, not the quiz. Check sidebar for self-promo rules before posting.
- **Step 2 — title:**
  > Built a taxonomy of 17 engineering role archetypes from ~68k job postings — here's what the data actually shows differentiates each role
- **Step 2 — body:**
  > "Software engineer" is one job title covering a dozen genuinely different roles. I built a
  > taxonomy of 17 of them sourced from ~68k real job postings across 744 companies on Greenhouse,
  > Lever, Ashby, and Workday — extracting the skills, responsibilities, comp structures, and
  > working patterns that actually differentiate each role from the others.
  >
  > Full methodology and sourcing are public: https://www.swe-genie.com/methodology — there's also
  > a free assessment if you want to see where you'd land.

### r/ProgrammingJobs
- **Step 1 — required:** Primarily a jobs board — check sidebar to confirm tool/resource posts are
  allowed before posting.
- **Step 2 — title:**
  > Free tool that maps which of 17 programming/engineering roles you'd actually fit — useful before your next job search
- **Step 2 — body:**
  > Before you search for your next role, it helps to know which of the dozen genuinely different
  > jobs hiding under "software engineer" you're actually built for. SWE Genie maps it: 17 role
  > archetypes scored from ~68k real job postings across 744 companies. Free, no signup.
  >
  > https://www.swe-genie.com

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

### r/learnprogramming
- **Step 1 — required:** Strict self-promo rules — check the wiki before posting. Frame as a
  career resource, not a product launch. May require posting in a weekly thread rather than as a
  standalone post.
- **Step 2 — title:**
  > Built a free tool that maps which of 17 engineering roles you'd actually fit — useful when figuring out where to go after learning to code
- **Step 2 — body:**
  > Once you can code, "software engineer" is the obvious next step. But it actually covers a dozen
  > genuinely different jobs — SRE, solutions architect, forward-deployed engineer, DevRel, sales
  > engineer, and more. Most people never see the full map until they've already landed in one.
  >
  > I built SWE Genie to make it explicit: 17 role archetypes scored from ~68k real job postings,
  > so you can see which ones match your skills and temperament before you start searching. Free,
  > no signup. https://www.swe-genie.com

### r/csMajors
- **Step 1 — required:** Same check as above.
- **Step 2:** Reuse the r/cscareerquestions caption.

---

## Group 7b — Reddit: job search and developer jobs subs

These are job-board-adjacent communities — check sidebar rules on each before posting, as several
may only allow actual job listings rather than tools/resources. Where tool posts are allowed,
frame around the pre-search use case: know which role to search for before you start.

**Title (use across all subs below):**
> Free tool to figure out which of 17 engineering roles you'd actually fit — useful before you start job searching

**Body:**
> Most engineers search for "software engineer" because that's the only vocabulary they have.
> But it covers a dozen genuinely different jobs — SRE, solutions architect, forward-deployed
> engineer, sales engineer, DevRel, and more — with different incentives, different days, and
> different hiring criteria.
>
> SWE Genie maps it: 17 role archetypes scored from ~68k real job postings across 744 companies,
> so you know which roles to actually target before you start applying. Free, no signup.
>
> https://www.swe-genie.com

### r/jobsearchhacks
- Good fit — framed as a clarity tool before the search starts. Check sidebar for self-promo rules.

### r/jobhunting
- Good fit — same framing. Check sidebar before posting.

### r/jobs
- Large, broad community. Self-promo rules vary — check sidebar. May require flair.

### r/jobsearch
- Good fit. Check sidebar for self-promo rules before posting.

### r/SoftwareEngineerJobs
- Primarily a jobs board — **check sidebar first**. If only job listings are allowed, skip.
  If tools/resources are permitted, this is the highest-precision audience of all the job subs.

### r/DeveloperJobs
- Same caveat as r/SoftwareEngineerJobs — check sidebar before posting.

### r/CsJobLinks
- Likely link-only job postings. **Check sidebar** — if it's strictly job links, skip entirely.

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
  > Built a free tool that might be relevant here: maps engineers to 17 role archetypes including
  > ML Engineer and Data Engineer specifically, sourced from ~68k real job postings. Scores your
  > actual fit across the role, not just tech stack. No signup, methodology's public. swe-genie.com

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
  > architect, DevRel, forward-deployed, etc.). Useful for your own career questions, or to point a
  > report toward when they're weighing a lateral move. Sourced from ~68k job postings,
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
- **Known issue (found during launch):** a brand-new Discord account got an instant per-server ban
  here ("Uh-oh, looks like you've been banned") before posting anything — almost certainly an
  automated anti-raid/anti-spam filter on a server this size (159k members), not anything the
  account did. Confirm it's server-specific by trying to join an unrelated server; if that works,
  it's just this server's filter. Not worth appealing for launch purposes — use CS Career Hub or
  Reactiflux instead, same channel pattern.
- **Caption:**
  > Built SWE Genie — a free tool that shows which of 17 engineering roles you'd actually fit,
  > beyond just "software engineer." Sourced from ~68k real job postings across 744 companies,
  > methodology's public, no signup, no ads. swe-genie.com

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

## Group 10 — Archetype-specific communities (Reddit/Discord/Slack, beyond generic SWE)

Researched across 5 parallel passes covering all 17 archetypes. **Important caveat that applies to
every Reddit entry below:** reddit.com was blocked to every research agent's browser/fetch tools
this session (the same block I hit earlier in this conversation), so **no Reddit rule text or
subscriber count below is live-verified** — treat Reddit entries as "plausible, needs a 5-minute
manual check of the sidebar" rather than confirmed. Discord and Slack entries marked "verified
live" were actually loaded and checked; others are corroborated via secondary sources only, marked
accordingly.

**Communities that explicitly ban self-promotion — read before posting, not after:** PreSales
Collective, Customer Success Collective, Mind the Product, and Gain Grow Retain (see below) all
have stated no-self-promotion policies. Posting a link there risks removal or a flag on your
account. The only safe way to use these is a genuine, on-topic mention inside an existing
discussion thread — never a standalone "check this out" post.

### Platform / Infrastructure Engineer, SRE, Security Engineer

**Caption for the open communities below:**
> Built SWE Genie — a free tool that maps which of 17 engineering roles you'd actually fit,
> including Platform/Infrastructure Engineer, SRE, and Security Engineer specifically. Sourced from
> ~68k real job postings across 744 companies, methodology's public, no signup, no ads. swe-genie.com

- **Platform Engineering Slack** — join via `platformengineering.org/slack-rd` (verified live
  redirect to a working invite). ~6k+ members. Best single fit for the Platform Engineer archetype.
- **SRE Community Slack** — `sre-community.slack.com`, ~1,338 members. Has a **`#vendor-corner`**
  channel explicitly for tool/vendor posts — the cleanest, lowest-risk self-promo lane found in
  this entire research pass. Post there.
- **CNCF Slack** — `slack.cncf.io` (verified live self-service invite generator, never expires).
  Very large, has a `#platform-engineering` channel, but it's one channel among hundreds — be
  selective, don't blast the whole workspace.
- **DSI (DevOps, SRE, & Infrastructure) Discord** — `discord.com/invite/devops-sre-infrastructure-419745677585940482`.
  Corroborated ~20–23k members across multiple directories, but the invite page is JS-rendered so
  it couldn't be click-tested this session — verify it resolves before relying on it.
- **Black Hills InfoSec Discord** — `discord.com/invite/bhis`, ~60k members per aggregators, run by
  a reputable security-training org. Not click-tested this session — verify first.
- Reddit (unverified, check sidebar first): **r/securityCareerAdvice** (best topical fit for
  Security Engineer), **r/sre**, **r/devops** (known to gatekeep low-effort promo), **r/sysadmin**.
  **r/AskNetsec** and **r/cybersecurity** both have reputations for strict no-self-promo
  enforcement — expect removal if you post there directly.
- **Checked and dead — skip:** The Many Hats Club Discord (confirmed closed).

### Data Engineer, ML Engineer

**Caption:**
> Built SWE Genie — a free tool that maps which of 17 engineering roles you'd actually fit,
> including Data Engineer and ML Engineer specifically. Sourced from ~68k real job postings across
> 744 companies, methodology's public, no signup. swe-genie.com

- **DataExpert.io Community Discord** — `discord.com/invite/the-dataexpert-io-community-1106357930443407391`.
  **Verified live: 29,485 members, 1,338 online.** Run by Zach Wilson (ex-Netflix/Airbnb/Meta DE) —
  high-credibility, DE-career-focused. Best Discord fit for Data Engineer.
- **MLOps (@chipro) Discord** — `discord.com/invite/xWyMC9Jaqw`. **Verified live: 31,359 members,
  1,688 online.** Run by Chip Huyen (author of *Designing Machine Learning Systems*) — distinct
  from the MLOps Community **Slack** you already joined; this is a separate, equally strong
  Discord. Best fit for ML Engineer.
- **Learn AI Together Discord** — `discord.com/invite/learnaitogether`. Verified live, 98,278
  members — large but beginner-heavy; decent reach, lower precision.
- Reddit (unverified, check sidebar first): **r/dataengineering** (large, tolerates well-framed
  "I built X to solve Y" posts). **r/MachineLearning** is the one to be most careful with — strict
  self-promo enforcement, direct posts get removed outside a weekly "[D] Self-Promotion Thread";
  if you post there, lead with the 68k-job-postings research methodology, not the tool, and frame
  it as a `[P]`/`[D]` post. **r/learnmachinelearning** is more permissive and skews early-career —
  good fit for the "figure out your ML career path" framing. r/datascience, r/mlops also plausible.
- **Checked and dead — skip:** two other "Data Engineering Discord Server" invites, MLSpace
  Discord (all confirmed dead/invalid this session).

### Mobile Engineer (iOS/Android), Embedded/IoT Engineer

**Caption:**
> Built SWE Genie — a free tool that maps which of 17 engineering roles you'd actually fit,
> including Mobile Engineer (iOS/Android) and Embedded/IoT Engineer specifically. Sourced from
> ~68k real job postings, no signup, no ads, methodology's public. swe-genie.com

- **iOS Developers HQ Slack** — `ios-developers.io`, ~40k members, self-serve join, has a public
  Code of Conduct (real-community signal). Best verified Slack fit for Mobile Engineer.
- **Interrupt Slack** (Memfault's embedded/firmware community) — via `interrupt.memfault.com`,
  ~2,100+ registered, real and actively maintained, professional embedded/firmware focus. Join is
  email-gated (not instant). Best fit for Embedded/IoT Engineer.
- **Apple Development Discord** — `discord.com/invite/vVNXQZT`, ~16.5k members (Swift/iOS/macOS
  focus). Not click-tested this session — verify before relying on it.
- **Embedded Engineering – Amulius Discord** — `discord.com/invite/embedded`, ~16.4k members,
  covers EE/embedded/FPGA/hardware. Not click-tested this session.
- Reddit (unverified, check sidebar first): **r/iOSProgramming** (historically tolerant of
  disclosed self-built tool posts), **r/androiddev** (stricter — frame as research, not an app
  plug), **r/embedded** (has an anti-advertising stance, disclose clearly and lead with the
  non-commercial framing), **r/FPGA** (more tolerant, smaller niche audience).
- **Lower priority:** AndroidChat Slack (activity signal is stale, possibly low-traffic), Android
  United Slack (real but application-gated, requires LinkedIn/GitHub — not a quick join).

### Sales Engineer/Pre-Sales, Solutions Architect (both), Forward Deployed Engineer, Consulting Engineer

**Caption (for the open communities — r/salesengineers, BeSA Discord):**
> Built SWE Genie — a free tool that maps which of 17 engineering roles you'd actually fit,
> including Sales Engineer/Pre-Sales and Solutions Architect specifically. Sourced from ~68k real
> job postings, no signup, no ads. swe-genie.com

**Contextual-mention only (PreSales Collective explicitly bans direct self-promo — only use this
as a reply inside a relevant existing thread, never a standalone post):**
> There's a free tool that maps engineers into 17 role archetypes including Sales Engineer/Pre-Sales
> and Solutions Architect, based on ~68k job postings — swe-genie.com, if it's useful for anyone
> weighing a pivot into pre-sales.

- **r/salesengineers** — ~29–30k members (unverified live), active, heavy career-discussion
  volume. Best Reddit fit for Sales Engineer/Pre-Sales — check sidebar rules before posting.
- **"Become a Solutions Architect" (BeSA) Discord** — via `besaprogram.com`. **Verified live:
  13,706 members, 353 online.** Best Discord fit for Solutions Architect (cloud-certification
  leaning, closer to vendor-side than consulting-side).
- **PreSales Collective Slack** — `presalescollective.com/slack`, confirmed real, 15k+ members,
  requires free membership signup first (not an instant invite). **Their own site states: "No
  self-promotion. No selling. No spam."** — use the contextual-mention caption above only, inside
  a real thread, never a standalone post.
- **Confirmed gaps — genuinely nothing found, not a search failure:** Forward Deployed Engineer has
  no dedicated public community anywhere (the closest thing, an ex-Palantir alumni Slack, is
  alumni-only and not publicly joinable). Consulting Engineer/Professional Services Engineer has
  no dedicated community either. Don't spend more time searching for these two — broader channels
  (LinkedIn, X, HN) are the realistic option for those two archetypes specifically.
- **Checked and ruled out:** r/consulting (376k members, but skews MBB/management consulting exit-ops
  discussion — noise for this audience, not worth posting). r/Palantir (quarantined by Reddit,
  requires login/opt-in, not FDE-specific anyway — avoid). SE.io / salesengineers.io (domain is
  dead, DNS failure). IASA Global Discord (real but essentially dormant, 136 members/3 online).

### Customer Support Engineer, Customer Success/Solutions Engineer, DevRel, Technical Product Manager

**Contextual-mention only (Customer Success Collective and Mind the Product both restrict direct
self-promotion — only mention if genuinely answering an existing question):**
> If it's useful — there's a free assessment that maps engineers to 17 role archetypes including
> Customer Success/Solutions Engineer, based on ~68k job postings: swe-genie.com.

- **Customer Success Collective (CSC) Slack** — `customersuccesscollective.com`, **verified live,
  10,000+ members, free**. Their FAQ allows a transparent contextual mention if it genuinely solves
  a problem in an ongoing discussion — not a blanket promo channel. Best verified fit for Customer
  Success/Solutions Engineer.
- **Mind the Product Slack** — verified live, 60,000+ members, free via email invite. Self-promo
  is explicitly restricted, but has a `#freshcontent` channel for content/articles and `#careers`
  for job posts — a methodology-focused write-up shared in `#freshcontent` is more defensible than
  a product pitch.
- Reddit (unverified, check sidebar first): **r/CustomerSuccess** (~52k members), **r/ProductManagement**
  (~271–274k, broad — no confirmed dedicated technical-PM space, treat "r/technicalproductmanagement"
  as likely not a real active community), **r/devrel** (small, ~1k, but relevant — the community's
  own discussion suggests contextual/careful self-promo is tolerated).
- **No dedicated community found for Customer Support Engineer specifically** — r/TechSupport is
  consumer tech-help, not a fit for this archetype; don't use it.
- **No Discord found at all for any of these four archetypes** — genuine gap across all research,
  not a missed search.
- **Corrections to communities that sound right but aren't what you'd expect:** Gain Grow Retain is
  **no longer on Slack** — it migrated to a web forum (Higher Logic Vanilla) with an explicit
  "self-promotion is not allowed and will be removed" policy; skip it. DevRel Collective is real
  and active but **gated to full-time DevRel/community-management practitioners via a ~2-week
  application review** — not an open signup, and not somewhere a SWE-background founder would
  likely qualify to join directly.

---

## Group 11 — LinkedIn (personal founder post, Week 2–3 per launch-plan.md sequencing)

LinkedIn is sequenced *after* HN, Reddit, and Slack/Discord channels — by the time this goes out,
there should be real traction (comments, completions) to point to. Post from your personal profile,
not a company page. No link in the post body — put it in the first comment (LinkedIn's algorithm
penalizes posts with external links by ~60%).

**Timing:** Tuesday–Thursday, 8–10am or 12–1pm ET. Reply to every comment within the first hour —
that window is what determines whether the algorithm extends reach beyond your immediate network.

**Post — copy/paste ready:**

---

If you could code, you became a software engineer. That was the whole story.

Not anymore. Sales engineers, solutions architects, forward deployed engineers, SREs, developer advocates — these are genuinely different jobs, not variations on the same one.

I didn't fully see that until I went into professional services consulting as a software engineer.

What consulting taught me: consultants fill different gaps for different clients at different times. Depending on the engagement, I was:

→ Sales Engineer — building demos, supporting pitches, justifying technical choices to procurement committees
→ Solutions Architect — designing integration plans across systems nobody had documented
→ Forward Deployed Engineer — inside a client's codebase, refactoring, modernizing, building on top of what was there
→ Customer Support Engineer — owning production bugs at a client site where every hour of downtime had a dollar figure attached
→ Product / Full-Stack Software Engineer — writing and shipping features, the thing most people picture when they hear "software engineer"

Consulting gave me a vocabulary most engineers never get. They go straight from "I can code" into a job search without ever seeing the full map.

So I built SWE Genie to make the map explicit. I had Claude pull 65,000+ real job postings from 745 companies on Greenhouse, Lever, Ashby, and Workday: Stripe, Whoop, Figma, Datadog, Cloudflare, Salesforce, Databricks, Twilio, Palantir, OpenAI, and more. From those I extracted the skills, daily responsibilities, comp structures, and working patterns that actually differentiate each role, then built an assessment taxonomy directly from that data. Link in the comments.

When did you figure out which kind of engineering work you were actually built for? Did you land there on purpose, or did you stumble into it?

---

**First comment — post immediately after publishing:**

> Find out which archetype you're actually built for: www.swe-genie.com — 6 minutes, no email required to see your result.

**Notes:**
- Bold formatting on the archetype names (→ **Sales Engineer**) renders in LinkedIn's editor — add it manually when pasting.
- If you have a screenshot of your own assessment result, attach it as an image — role-clarity content with a visual gets significantly higher repost rates.
- Tag `?ref=linkedin` on the URL in the first comment for UTM tracking.

---

## After you post (today, ongoing)

- Reply to comments across all threads within the first hour or two — engagement in that window
  is what keeps a post visible, on Reddit, HN, and Discord/Slack alike.
- If a community removes the post or a mod says no, treat it as a signal to skip — don't repost
  reworded text the same day.
- Tag links per channel if you want to see what drove traffic, e.g. `?ref=hn`, `?ref=reddit-webdev`,
  `?ref=discord-cscareers` — `launch-plan.md`'s metrics section already expects UTM-style tracking.
