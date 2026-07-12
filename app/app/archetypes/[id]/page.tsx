import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { archetypes, archetypeById, dimensionById } from "@/lib/taxonomy";
import { getResultsCopy } from "@/lib/results-copy";
import archetypeJobExamples from "@/data/archetype-job-examples.json";
import { JobExamplesAccordion } from "@/components/JobExamplesAccordion";
import { getCompStructure } from "@/lib/comp-structure";
import { CompBandBar } from "@/components/CompBandBar";
import { CompMixBar } from "@/components/CompMixBar";
import { CompComparisonChart } from "@/components/CompComparisonChart";
import { CompProgressionChart } from "@/components/CompProgressionChart";
import { RateRole } from "@/components/RateRole";

export function generateStaticParams() {
  return archetypes.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const archetype = archetypeById.get(id);
  if (!archetype) return {};
  return {
    title: archetype.name,
    description: `What the ${archetype.name} archetype actually is, day-to-day, comp structure, and how to test fit cheaply.`,
  };
}

export default async function ArchetypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const archetype = archetypeById.get(id);
  if (!archetype) notFound();

  const copy = getResultsCopy(id);
  const topDimensions = Object.entries(archetype.scores)
    .sort((a, b) => b[1].weight - a[1].weight)
    .slice(0, 5);
  const jobExamples =
    (archetypeJobExamples.examples as Record<
      string,
      {
        company: string;
        title: string;
        location: string | null;
        url: string;
        sections: { heading: string; paragraph?: string; bullets?: string[] }[];
      }[]
    >)[id] ?? [];

  // The archetype's top 3 dimensions by weight — what a contributor rates in the
  // Phase 8 "Rate this role" widget.
  const rateDimensions = topDimensions
    .slice(0, 3)
    .map(([dimId]) => ({ id: dimId, name: dimensionById.get(dimId)?.name ?? dimId }));

  const comp = getCompStructure(id);
  const comparisonOthers = archetypes
    .filter((a) => a.id !== id)
    .map((a) => {
      const otherComp = getCompStructure(a.id);
      return otherComp
        ? { archetypeId: a.id, label: a.name, low: otherComp.low, high: otherComp.high, typical: otherComp.typical }
        : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-8">
          <Link href="/" className="font-mono text-[13px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)] mb-5 inline-block">
            &larr; Home
          </Link>
          <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-5">
            {archetype.name}
          </h1>
          {archetype.confidence === "medium" && (
            <p className="text-xs font-mono text-[var(--color-signal-warn)] mb-5">
              Lower-confidence sourcing (below target job-posting count) — see methodology.
            </p>
          )}
          <p className="text-lg text-[var(--color-muted)] leading-[1.7] max-w-2xl whitespace-pre-line">
            {copy.whatThisIs}
          </p>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">A day in this role</h2>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line">
              {copy.aDayInThisRole}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Comp structure</h2>
            {comp && (
              <div className="mb-6 pt-4">
                <CompBandBar low={comp.low} high={comp.high} typical={comp.typical} />
                {comp.mix && (
                  <div className="mt-6">
                    <CompMixBar mix={comp.mix} />
                  </div>
                )}
              </div>
            )}
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line">
              {copy.compStructure}
            </p>
          </div>
        </section>

        {comp?.levels && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
              <h2 className="font-display text-xl font-semibold mb-6">Comp by level</h2>
              <CompProgressionChart
                levels={comp.levels.map((lvl) => ({ level: lvl.label, low: lvl.low, high: lvl.high }))}
              />
            </section>
          </>
        )}

        {comp && comparisonOthers.length > 0 && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
              <h2 className="font-display text-xl font-semibold mb-6">How this compares to other archetypes</h2>
              <CompComparisonChart
                current={{ archetypeId: archetype.id, label: archetype.name, low: comp.low, high: comp.high, typical: comp.typical }}
                others={comparisonOthers}
              />
            </section>
          </>
        )}

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-semibold mb-7">What matters most for this role</h2>
          <div className="flex flex-col gap-7">
            {topDimensions.map(([dimId, score]) => {
              const dim = dimensionById.get(dimId);
              if (!dim) return null;
              return (
                <div key={dimId} className="grid sm:grid-cols-[220px_1fr] gap-4 sm:gap-6 items-start">
                  <div className="font-semibold text-base pt-0.5">{dim.name}</div>
                  <div>
                    <div className="h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-[var(--color-accent)]"
                        style={{ width: `${score.weight * 100}%` }}
                      />
                    </div>
                    <p className="text-[15px] text-[var(--color-muted)] leading-[1.65]">{score.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {jobExamples.length > 0 && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

            <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
              <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                <h2 className="font-display text-2xl font-semibold">Examples of real job postings</h2>
                <span className="font-mono text-[11px] text-[var(--color-muted-2)] whitespace-nowrap">
                  snapshot from {archetypeJobExamples.generated}
                </span>
              </div>
              <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] mb-6">
                Real postings from the research corpus behind this archetype. Click one to read the actual listing.
              </p>
              <JobExamplesAccordion examples={jobExamples} />
            </section>
          </>
        )}

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <RateRole archetypeId={archetype.id} dimensions={rateDimensions} />

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-semibold mb-4">How to test this cheaply</h2>
          <p className="text-lg text-[var(--color-muted)] leading-[1.7] whitespace-pre-line max-w-2xl mb-9">
            {copy.howToTestCheaply}
          </p>
          <Link href="/assessment" className="btn-primary px-7 py-4 text-[17px] font-semibold inline-block">
            See if this is your match
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
