import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { archetypeById, dimensionById } from "@/lib/taxonomy";
import { getResultsCopy } from "@/lib/results-copy";
import { ArchetypeCompareStage, type ArchetypeCompareRow } from "@/components/comp";
import type { CompByTierData } from "@/components/comp";
import compByTierData from "@/data/comp-by-tier.json";

// First 1-2 sentences of a longer passage, kept under maxChars — used to fit
// "a day in the role" into a single comparison-table cell without cutting a
// sentence off mid-thought.
function leadingSentences(text: string, maxChars = 170): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (out && next.length > maxChars) break;
    out = next;
    if (out.length >= maxChars) break;
  }
  return out || text.slice(0, maxChars);
}

export const metadata: Metadata = {
  title: "Compare Engineering Archetypes Side by Side",
  description:
    "Compare engineering role archetypes side by side — compensation, day-to-day work, and what each one actually rewards — with adjustable career level and company tier.",
};

export default function CompareArchetypesPage() {
  const archetypes = compByTierData.archetypes as unknown as CompByTierData;

  // Every archetype with comp-by-tier data, labelled by its taxonomy name.
  // Initial order doesn't matter — ArchetypeCompareTable ranks by P50 at the
  // selected tier and level.
  const rows: ArchetypeCompareRow[] = Object.entries(archetypes)
    .filter(([, data]) => Boolean(data["faang-mag7"]?.Staff))
    .map(([id, data]) => ({
      id,
      name: archetypeById.get(id)?.name ?? id,
      data,
    }));

  // archetypeId -> short "a day in the role" summary and top-weighted
  // dimension names, for the selected-comparison table below the ranking.
  const daySummaryByArchetype: Record<string, string | undefined> = {};
  const keyQualitiesByArchetype: Record<string, string[] | undefined> = {};
  for (const row of rows) {
    const archetype = archetypeById.get(row.id);
    if (archetype) {
      keyQualitiesByArchetype[row.id] = Object.entries(archetype.scores)
        .sort((a, b) => b[1].weight - a[1].weight)
        .slice(0, 3)
        .map(([dimId]) => dimensionById.get(dimId)?.name)
        .filter((name): name is string => Boolean(name));
    }
    try {
      daySummaryByArchetype[row.id] = leadingSentences(getResultsCopy(row.id).aDayInThisRole);
    } catch {
      daySummaryByArchetype[row.id] = undefined;
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-8">
          <Link
            href="/"
            className="font-mono text-[13px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)] mb-5 inline-block"
          >
            &larr; Home
          </Link>
          <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-5">
            Compare Engineering Archetypes Side by Side
          </h1>
          <p className="text-lg text-[var(--color-muted)] leading-[1.7] max-w-2xl">
            The archetype you land in matters as much as the company you land at. Rank every
            engineering archetype by total compensation — base, bonus, and annualized equity —
            then pick a few to line up side by side: pay, day-to-day work, and the qualities each
            one actually rewards. Choose a career level and a company tier to re-rank.
          </p>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="h-px bg-[var(--color-border)]" />
        </div>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <ArchetypeCompareStage
            rows={rows}
            defaultTier="high-growth-public"
            defaultLevel="Staff"
            daySummaryByArchetype={daySummaryByArchetype}
            keyQualitiesByArchetype={keyQualitiesByArchetype}
          />
          <p className="mt-10 text-[13px] text-[var(--color-muted-2)] leading-[1.6] max-w-2xl">
            Directional context only, not financial advice. Figures aren&apos;t a live feed of US
            individual-contributor total-comp submissions — see the{" "}
            <Link href="/methodology" className="underline hover:text-[var(--color-fg)]">
              methodology
            </Link>{" "}
            for sources and confidence levels.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
