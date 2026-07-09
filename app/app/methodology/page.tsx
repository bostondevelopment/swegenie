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
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-semibold tracking-tight mb-4">Methodology</h1>
        <p className="text-[var(--color-muted)] leading-relaxed mb-10 max-w-2xl">
          How the taxonomy was built, how scoring works, and what it doesn&apos;t capture. Every
          claim on this page is traceable to a sourced research brief — this page exists so you
          don&apos;t have to take the result on faith.
        </p>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">1. Where the 18 archetypes came from</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
            Each archetype is backed by a research brief built from real job postings across
            company sizes, practitioner blog posts and talks, and comp data (Levels.fyi,
            Glassdoor). Briefs cite every trait claim back to a specific source — no claim is
            asserted from stereotype alone. Two archetypes (Mobile Engineer, Embedded/IoT
            Engineer) fell short of the sourcing target during initial research and are marked
            lower-confidence; they still meet the citation-quality bar, just with fewer postings
            behind them.
          </p>
          {mediumConfidence.length > 0 && (
            <p className="text-xs text-[var(--color-muted)] font-mono">
              Lower-confidence: {mediumConfidence.map((a) => a.name).join(", ")}
            </p>
          )}
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">2. The 16 trait dimensions</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            Every archetype is scored against the same 16 dimensions — 6 skill/experience
            dimensions and 10 preference/temperament dimensions. Each dimension was derived from
            patterns across multiple research briefs, not written top-down before the research.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {dimensions.map((d) => (
              <div key={d.id} className="flex items-baseline gap-2 py-1 border-b border-[var(--color-border)]">
                <span className="flex-1">{d.name}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">{d.category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">3. How scoring works</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
            Every archetype has a target value (1-5) and a weight (0-1) for each dimension,
            drawn from its research brief. Your answers produce a 1-5 value per dimension. Fit is
            a weighted average of how close your answers land to each archetype&apos;s targets,
            weighted by how much that dimension actually matters for that role — not a raw
            distance across all 16 dimensions equally.
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
            The &ldquo;why you matched&rdquo; explanation is not written after the fact — it is
            the 3 dimensions that contributed the most to your specific fit score for that
            archetype. Growth areas are the dimensions pulling your score down the most, above a
            floor that filters out noise. There is no black-box model here: every number on a
            result page is reproducible from your answers and the public taxonomy data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">4. What this doesn&apos;t capture</h2>
          <ul className="text-sm text-[var(--color-muted)] leading-relaxed list-disc pl-5 space-y-2">
            <li>
              This is a linear model: a 2-point gap on a dimension is treated as exactly twice as
              costly as a 1-point gap. That&apos;s a modeling choice, not a proven-optimal one.
            </li>
            <li>
              Dimensions are scored independently — the model doesn&apos;t know that some
              temperament traits tend to co-occur in practice.
            </li>
            <li>
              An archetype whose non-defining dimensions happen to match your incidental answers
              can occasionally out-rank an archetype where you mismatch on its one truly defining
              trait. We found this in our own persona validation before launch — it&apos;s a known
              limitation of weighted-average scoring, not a bug we missed.
            </li>
            <li>
              This is a v1, expert-authored taxonomy, not yet calibrated against crowdsourced
              input from verified practitioners in each role. That&apos;s the explicit plan for a
              later version — see the roadmap below.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold mb-3">5. What&apos;s next</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
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
