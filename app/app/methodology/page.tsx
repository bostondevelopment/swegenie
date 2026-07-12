import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { dimensions, archetypes } from "@/lib/taxonomy";

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
          <h2 className="font-display text-2xl font-semibold mb-[18px]">1. Where the 18 archetypes came from</h2>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            Each archetype started from a research brief built from real job postings across
            company sizes, practitioner blog posts and talks, and comp data (Levels.fyi,
            Glassdoor). Briefs cite every trait claim back to a specific source — no claim is
            asserted from stereotype alone.
          </p>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-3.5">
            A 2026-07-11 sourcing pass then verified 744 companies directly against their public
            job-board APIs and classified 67,956 real, currently-live postings into the 18
            archetypes — not scraped or estimated, every posting traceable to a live URL at the
            time it was harvested. 13 of the 18 archetypes are backed by 200+ classified postings
            each, topping out at 6,208 postings across 542 companies for the most common role. The
            other 5 (Embedded/IoT Engineer, Solutions Architect — Consulting-side, Developer
            Relations, Technical Product Manager, Solutions Architect — Vendor-side) came in
            between 57 and 148 postings despite three dedicated follow-up passes — still several
            times the original sourcing bar, but a real, reported gap rather than one we padded to
            hit a round number.
          </p>
          {mediumConfidence.length > 0 && (
            <p className="font-mono text-[13px] text-[var(--color-muted-2)]">
              Lower-confidence: {mediumConfidence.map((a) => a.name).join(", ")}
            </p>
          )}
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">2. The 16 trait dimensions</h2>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-7">
            Every archetype is scored against the same 16 dimensions — 6 skill/experience
            dimensions and 10 preference/temperament dimensions. Each dimension was derived from
            patterns across multiple research briefs, not written top-down before the research.
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
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7] mb-4">
            Every archetype has a target value (1-5) and a weight (0-1) for each dimension,
            drawn from its research brief. Your answers produce a 1-5 value per dimension. Fit is
            a weighted average of how close your answers land to each archetype&apos;s targets,
            weighted by how much that dimension actually matters for that role — not a raw
            distance across all 16 dimensions equally.
          </p>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7]">
            The &ldquo;why you matched&rdquo; explanation is not written after the fact — it is
            the 3 dimensions that contributed the most to your specific fit score for that
            archetype. Growth areas are the dimensions pulling your score down the most, above a
            floor that filters out noise. There is no black-box model here: every number on a
            result page is reproducible from your answers and the public taxonomy data.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-2xl font-semibold mb-[18px]">4. What this doesn&apos;t capture</h2>
          <div className="flex flex-col gap-4">
            {[
              "This is a linear model: a 2-point gap on a dimension is treated as exactly twice as costly as a 1-point gap. That's a modeling choice, not a proven-optimal one.",
              "Dimensions are scored independently — the model doesn't know that some temperament traits tend to co-occur in practice.",
              "An archetype whose non-defining dimensions happen to match your incidental answers can occasionally out-rank an archetype where you mismatch on its one truly defining trait. We found this in our own persona validation before launch — it's a known limitation of weighted-average scoring, not a bug we missed.",
              "This is a v1, expert-authored taxonomy, not yet calibrated against crowdsourced input from verified practitioners in each role. That's the explicit plan for a later version — see the roadmap below.",
              "Two candidate dimensions were evaluated against the job-posting corpus and deliberately not added. AI-coding-assistant fluency (Copilot/Cursor/Claude Code as a day-to-day workflow expectation) is real and growing, but it shows up at a broadly similar rate across nearly every engineering archetype — a trait that doesn't vary much between roles gives a ranking model nothing to discriminate on, so it's addressed in role write-ups instead of as a scored axis. Government/federal security-clearance eligibility is a strong, concentrated signal in a few archetypes (Forward-Deployed Engineer especially), but it's closer to a binary eligibility fact than a point on a 1-5 preference or skill spectrum, so it doesn't fit this model's shape either — it's called out directly in the relevant role pages instead.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3.5">
                <span className="text-[var(--color-accent)] shrink-0">&mdash;</span>
                <p className="text-[17px] text-[var(--color-muted)] leading-[1.7]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-[18px]">5. What&apos;s next</h2>
          <p className="text-[17px] text-[var(--color-muted)] leading-[1.7]">
            A future version layers in verified practitioners and hiring managers rating what
            their role actually demands day-to-day, with expert-seeded weights adjusted by that
            crowd input — but only once there&apos;s enough traffic per archetype to make that
            signal reliable, and always with the diff between expert and crowd published, not
            hidden.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
