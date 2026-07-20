import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StatTile } from "@/components/StatTile";
import { ActionCard } from "@/components/ActionCard";
import { ExpandableCard } from "@/components/ExpandableCard";
import { Callout } from "@/components/Callout";
import { TierCompChart, type CompByTierData } from "@/components/comp";
import compByTierData from "@/data/comp-by-tier.json";
import { dimensions, archetypes } from "@/lib/taxonomy";

const exampleArchetypeCompData = (compByTierData.archetypes as unknown as CompByTierData)[
  "product-full-stack-software-engineer"
];

export const metadata: Metadata = {
  title: "Methodology",
  description: "How the taxonomy was built, how scoring works, and what it doesn't capture.",
};

export default function MethodologyPage() {
  const mediumConfidence = archetypes.filter((a) => a.confidence === "medium");

  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-20">
        <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-5">Methodology</h1>
        <p className="text-lg text-[var(--color-muted)] leading-[1.65] max-w-2xl mb-14">
          How the taxonomy was built, how scoring works, and what it doesn&apos;t capture. Every
          claim on this page is traceable to a sourced research brief — this page exists so you
          don&apos;t have to take the result on faith.
        </p>

        <div className="h-px bg-[var(--color-border)] mb-12" />

        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">1. Where the 17 archetypes came from</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatTile label="Companies verified" value="744" />
            <StatTile label="Postings classified" value="67,956" />
            <StatTile label="Archetypes with 200+ postings" value="13 of 17" />
            <StatTile label="Top-coverage role" value="6,208" sub="postings · 542 companies" />
          </div>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            Each archetype started from a research brief built from real job postings across
            company sizes, practitioner blog posts and talks, and comp data (Levels.fyi,
            Glassdoor). Briefs cite every trait claim back to a specific source — no claim is
            asserted from stereotype alone.
          </p>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            A 2026-07-11 sourcing pass then verified those companies directly against their public
            job-board APIs and classified those postings into the 17 archetypes — not scraped or
            estimated, every posting traceable to a live URL at the time it was harvested. The
            other 5 (Embedded/IoT Engineer, Solutions Architect — Consulting-side, Developer
            Relations, Technical Product Manager, Solutions Architect — Vendor-side) came in
            between 57 and 148 postings — still several times the original sourcing bar, but a
            genuinely smaller public posting pool for these titles than for the other 13.
          </p>
          {mediumConfidence.length > 0 && (
            <p className="font-mono text-[13px] text-[var(--color-muted-2)]">
              Lower-confidence: {mediumConfidence.map((a) => a.name).join(", ")}
            </p>
          )}
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">2. The 22 trait dimensions</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="font-mono text-xs text-[var(--color-muted-2)] border border-[var(--color-border)] rounded-full px-2.5 py-1">
              22 dimensions
            </span>
            <span className="font-mono text-xs text-[var(--color-muted-2)] border border-[var(--color-border)] rounded-full px-2.5 py-1">
              10 skill · 12 preference
            </span>
          </div>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-7">
            Every archetype is scored against the same 22 dimensions — 10 skill/experience
            dimensions and 12 preference/temperament dimensions. Each dimension was derived from
            patterns across multiple research briefs, not written top-down before the research. The
            taxonomy separates skill axes precisely enough to avoid conflation — ML aptitude is
            scored apart from general domain fit, and private mentoring is scored apart from public
            visibility, so overlapping traits don&apos;t get flattened into one blurry axis.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10">
            {dimensions.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-2 py-[13px] border-b border-[var(--color-border)]">
                <span>{d.name}</span>
                <span className="font-mono text-xs text-[var(--color-muted-2)]">{d.category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">3. How scoring works</h2>
          <div className="flex flex-col gap-3">
            <ActionCard n={1} title="Target + weight per dimension">
              Every archetype has a target value (1-5) and a weight (0-1) for each dimension,
              drawn from its research brief. Your answers produce a 1-5 value per dimension.
            </ActionCard>
            <ActionCard n={2} title="Score your answers against the targets">
              Fit is a weighted average of how close your answers land to each archetype&apos;s
              targets, weighted by how much that dimension actually matters for that role — not a
              raw distance across all 22 dimensions equally. Closeness is scored with a non-linear
              penalty, so a large gap on a dimension counts far more heavily than a small one.
            </ActionCard>
            <ActionCard n={3} title="Defining-trait floor">
              A role&apos;s overall score is capped by how well you match its single defining
              trait — its highest-weighted dimension — so no role can reach the top of your list
              on incidental agreement while you mismatch on the thing that actually makes it that
              role.
            </ActionCard>
            <ActionCard n={4} title="Correlated-pair tie-breaker">
              Some traits reliably travel together across the 17 roles — depth at cross-layer
              debugging with appetite for on-call incidents, comfort teaching with comfort being
              publicly visible. Those pairs are measured directly from the taxonomy (a committed
              script, not a hidden model), and when your answers on a correlated pair line up the
              way a role&apos;s own profile does, that coherent combination nudges its score up;
              when they pull in opposite directions it nudges down. It&apos;s a deliberate
              tie-breaker between close matches — it can reorder neighbors but never override the
              defining-trait cap above it.
            </ActionCard>
            <ActionCard n={5} title="Why matched / growth areas">
              The &ldquo;why you matched&rdquo; explanation is not written after the fact — it is
              the 3 dimensions that contributed the most to your specific fit score for that
              archetype. Growth areas are the dimensions pulling your score down the most, above a
              floor that filters out noise. There is no black-box model here: every number on a
              result page is reproducible from your answers and the public taxonomy data.
            </ActionCard>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">4. What this doesn&apos;t capture</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                title: "Non-linear gap penalty",
                text: "Fit uses a non-linear (squared) gap penalty: a 2-point gap on a dimension costs four times as much as a 1-point gap, not twice. Small mismatches are treated as near-noise while large mismatches count sharply against a role. One side effect: because small gaps are forgiven, the headline percentages read a little generously, so a match is best understood relative to your other ranked roles rather than as an absolute grade.",
              },
              {
                title: "Dimension correlation layer",
                text: "Some traits reliably travel together, like appetite for on-call incidents and depth at cross-layer debugging, or comfort teaching and comfort being publicly visible. By measuring which dimensions rise and fall together across all 17 archetypes, the scorer recognizes those clusters: when your answers on a pair of correlated traits line up the way a role's own profile does, that coherent combination counts as extra signal for it, and when they pull in opposite directions it counts against. It stays fully transparent — the correlations are derived from the public taxonomy by a committed script, not a hidden model, and your result page names the exact pairs that helped or hurt. It's a nudge by design: it can reorder roles that were already neck-and-neck but never override the defining-trait check above it.",
              },
              {
                title: "Defining-trait floor",
                text: "An archetype's score is floored at how well you match its one truly defining trait (its highest-weighted dimension) — so an archetype whose incidental dimensions happen to match your answers can't float to the top on broad agreement while you mismatch on the trait that actually defines it. This is enforced structurally, not left as a caveat.",
              },
              {
                title: "Expert-authored weights",
                text: "Weights are set by expert-authored research briefs, not crowdsourced averages. A short survey on your results page and a “Rate this role” control on each archetype page let people who actually do (or hire for) a role rate what it really takes — those signals accumulate per role and only factor in once there's enough volume to aggregate safely, and any resulting diff between expert and crowd input is published, not hidden. See the roadmap below.",
              },
              {
                title: "Two dimensions we deliberately excluded",
                text: "Two candidate dimensions were evaluated against the job-posting corpus and deliberately not added. AI-coding-assistant fluency (Copilot/Cursor/Claude Code as a day-to-day workflow expectation) is real and growing, but it shows up at a broadly similar rate across nearly every engineering archetype — a trait that doesn't vary much between roles gives a ranking model nothing to discriminate on, so it's addressed in role write-ups instead of as a scored axis. Government/federal security-clearance eligibility is a strong, concentrated signal in a few archetypes (Forward-Deployed Engineer especially), but it's closer to a binary eligibility fact than a point on a 1-5 preference or skill spectrum, so it doesn't fit this model's shape either — it's called out directly in the relevant role pages instead.",
              },
            ].map((item) => (
              <ExpandableCard key={item.title} title={item.title}>
                {item.text}
              </ExpandableCard>
            ))}
          </div>
        </section>

        <section className="mb-14" id="compensation-data">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">5. Compensation data</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatTile
              label="Company tiers"
              value="5"
              sub="AI labs · FAANG/Mag7 · high-growth public · growth-stage private · early-stage"
            />
            <StatTile
              label="Career levels"
              value="7"
              sub="L1 · L2 · L3 · L4 · L5 · Staff · Principal"
            />
            <StatTile label="Percentile bands" value="5" sub="P10 / P25 / P50 / P75 / P90" />
            <StatTile label="Confidence tiers" value="3" sub="high · medium · low" />
          </div>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            The comp-by-tier charts on each archetype page (and the Staff cross-role ranking) are a
            separate, hand-curated dataset from the salary ranges in the research briefs. They cover
            all 17 archetypes and break total compensation into base, bonus, and annualized equity
            across five company tiers at six career levels. Levels are grouped by years of
            experience, not by any single company&apos;s title system — years in the field
            determines the level shown, not a job title.
          </p>

          <Callout tone="caveat" title="Sources.">
            <p className="text-[17px] leading-[1.7]">
              Manually curated from Levels.fyi public role pages, the Carta H1 2025 State of
              Startup Compensation report, techinterview.org, and the Cadence engineering-comp
              blog, cross-checked against salary figures pulled from a 67,000+ job-posting corpus
              for the archetypes where postings were plentiful enough to yield a usable sample.
              This is{" "}
              <strong className="text-[var(--color-fg)]">
                not a live feed
              </strong>{" "}
              — treat it as directional, and expect drift as the market moves. Every cell carries a
              citation — including an explicit record for cells with no public data — and it&apos;s
              permanently archived, so none of it depends on a live URL that may go stale.
            </p>
          </Callout>

          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mt-6 mb-3.5">
            <strong className="text-[var(--color-fg)]">What the percentiles mean.</strong> Each band
            (P10 / P25 / P50 / P75 / P90) reflects individual-contributor total-comp submissions for
            the US market. The P50 is the median; the P25–P75 interquartile band is the thick middle
            of each bar. Equity is <em>annualized paper value at vest</em>, not liquid cash — and for
            growth-stage and early-stage tiers that equity is illiquid, so the equity figure is an
            expected value against a wide, uncertain outcome, not money in hand. Below is a real
            worked example for one archetype, Product / Full-Stack Software Engineer, so you can
            see what the P10–P90 track, the P25–P75 band, and the P50 tick look like in practice.
          </p>
          {exampleArchetypeCompData && (
            <div className="mb-6">
              <TierCompChart
                archetypeId="product-full-stack-software-engineer"
                data={exampleArchetypeCompData}
                defaultLevel="L4"
              />
            </div>
          )}

          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            <strong className="text-[var(--color-fg)]">Confidence.</strong> Each cell is tagged
            high, medium, or low confidence by how much public data backs that specific
            role/tier/level combination. Cells marked low carry a{" "}
            <span className="font-mono text-[13px] text-[var(--color-signal-warn)]">limited data</span>{" "}
            badge on the chart. 143 of 595 cells are low-confidence, concentrated in Customer
            Support Solutions Engineer (17 cells), Embedded/IoT Engineer (16), Solutions Architect
            — Consulting-side (15), Customer Support Engineer (13), Consulting Engineer /
            Professional Services (13), and Solutions Architect — Vendor-side (12), because no
            public compensation data exists for that specific role/tier/level combination.
          </p>

          <Callout tone="caveat" title="Not financial advice.">
            <p className="text-[17px] leading-[1.7]">
              This is directional context to help you weigh paths, not a negotiation figure, an
              offer prediction, or personalized financial guidance. Your actual comp depends on
              company, location, level calibration, timing, and negotiation — none of which this
              dataset knows about you.
            </p>
          </Callout>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-[18px]">6. What&apos;s next</h2>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            A future version layers in verified practitioners and hiring managers rating what
            their role actually demands day-to-day, with expert-seeded weights adjusted by that
            crowd input — but only once there&apos;s enough traffic per archetype to make that
            signal reliable, and always with the diff between expert and crowd published, not
            hidden.
          </p>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7]">
            Questions or feedback:{" "}
            <a href="mailto:kazaam@swe-genie.com" className="text-[var(--color-fg)] underline">
              kazaam@swe-genie.com
            </a>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
