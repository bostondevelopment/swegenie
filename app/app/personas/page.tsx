import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PersonaCard } from "@/components/PersonaCard";
import { personas } from "@/lib/personas";
import { aggregateAnswersToProfile } from "@/lib/assessment-flow";
import { rankArchetypes, fitPercent } from "@/lib/scoring";
import { archetypeById } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Persona previews",
  robots: { index: false, follow: false },
};

/**
 * Internal QA tool, not part of the product funnel: one card per persona
 * from app/lib/personas.ts (see docs/research/persona-suite-v1.md), showing
 * where that persona's own answers currently rank against its target
 * archetype, with a link to a detail page showing the full dimension
 * breakdown and every question/answer that produced it, plus a link from
 * there to the exact results page a real test-taker would land on. Not
 * linked from the main nav — reachable via /personas or the small link in
 * the footer.
 */
export default function PersonasPage() {
  const rows = personas.map((persona) => {
    const profile = aggregateAnswersToProfile(persona.answers);
    const ranked = rankArchetypes(profile);
    const rank = ranked.findIndex((r) => r.id === persona.targetArchetypeId) + 1;
    const result = ranked.find((r) => r.id === persona.targetArchetypeId)!;
    return {
      persona,
      rank,
      total: ranked.length,
      percent: fitPercent(result.fitScore),
      href: `/personas/${persona.id}`,
      targetName: archetypeById.get(persona.targetArchetypeId)?.name ?? persona.targetArchetypeId,
    };
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 pt-14 pb-20">
        <p className="font-mono text-[13px] text-[var(--color-muted-2)] mb-[18px]">internal / QA — not linked from the main site</p>
        <h1 className="font-display text-4xl font-bold tracking-tight mb-[18px]">Persona previews</h1>
        <p className="text-lg text-[var(--color-muted)] leading-[1.7] max-w-2xl mb-11">
          One synthetic persona per archetype, each built from that archetype&apos;s own target
          profile and run through the real assessment scoring pipeline (see{" "}
          <code className="font-mono text-[15px] text-[var(--color-muted-2)]">docs/research/persona-suite-v1.md</code>). Click a
          card to see the full dimension breakdown and every question/answer behind its score.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {rows.map(({ persona, rank, total, percent, href, targetName }) => (
            <PersonaCard
              key={persona.id}
              personaId={persona.id}
              href={href}
              targetName={targetName}
              personaName={persona.personaName}
              narrative={persona.narrative}
              rank={rank}
              total={total}
              percent={percent}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
