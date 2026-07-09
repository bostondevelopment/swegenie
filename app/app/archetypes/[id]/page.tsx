import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { archetypes, archetypeById, dimensionById } from "@/lib/taxonomy";
import { getResultsCopy } from "@/lib/results-copy";

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

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 pb-8">
          <Link href="/" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] mb-4 inline-block">
            &larr; All archetypes
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            {archetype.name}
          </h1>
          {archetype.confidence === "medium" && (
            <p className="text-xs font-mono text-[var(--color-signal-warn,#B9770E)] mb-4">
              Lower-confidence sourcing (below target job-posting count) — see methodology.
            </p>
          )}
          <p className="text-[var(--color-fg)] leading-relaxed max-w-2xl whitespace-pre-line">
            {copy.whatThisIs}
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 border-t border-[var(--color-border)] grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-semibold mb-3">A day in this role</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {copy.aDayInThisRole}
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold mb-3">Comp structure</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line">
              {copy.compStructure}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 border-t border-[var(--color-border)]">
          <h2 className="font-display font-semibold mb-4">What matters most for this role</h2>
          <div className="flex flex-col gap-3">
            {topDimensions.map(([dimId, score]) => {
              const dim = dimensionById.get(dimId);
              if (!dim) return null;
              return (
                <div key={dimId} className="flex items-start gap-4">
                  <div className="w-40 shrink-0 text-sm font-medium pt-0.5">{dim.name}</div>
                  <div className="flex-1">
                    <div className="h-1.5 rounded-sm bg-[var(--color-border)] overflow-hidden mb-1">
                      <div
                        className="h-full rounded-sm bg-[var(--color-accent)]"
                        style={{ width: `${score.weight * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--color-muted)]">{score.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 border-t border-[var(--color-border)]">
          <h2 className="font-display font-semibold mb-3">How to test this cheaply</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-line max-w-2xl mb-8">
            {copy.howToTestCheaply}
          </p>
          <Link href="/assessment" className="btn-primary px-5 py-3 font-medium inline-block">
            See if this is your match
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
