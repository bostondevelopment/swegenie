import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FitBar } from "@/components/FitBar";
import { personas } from "@/lib/personas";
import { aggregateAnswersToProfile } from "@/lib/assessment-flow";
import { encodeProfile } from "@/lib/encode";
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
 * archetype, with a link to the exact same results page a real test-taker
 * would land on. Not linked from the main nav — reachable via /personas or
 * the small link in the footer.
 */
export default function PersonasPage() {
  const rows = personas.map((persona) => {
    const profile = aggregateAnswersToProfile(persona.answers);
    const ranked = rankArchetypes(profile);
    const rank = ranked.findIndex((r) => r.id === persona.targetArchetypeId) + 1;
    const result = ranked.find((r) => r.id === persona.targetArchetypeId)!;
    const encoded = encodeProfile(profile);
    return {
      persona,
      rank,
      percent: fitPercent(result.fitScore),
      href: `/results?a=${encoded}`,
      targetName: archetypeById.get(persona.targetArchetypeId)?.name ?? persona.targetArchetypeId,
    };
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">internal / QA — not linked from the main site</p>
        <h1 className="font-display text-2xl font-semibold mb-2">Persona previews</h1>
        <p className="text-[var(--color-muted)] mb-8 max-w-2xl">
          One synthetic persona per archetype, each built from that archetype&apos;s own target
          profile and run through the real assessment scoring pipeline (see{" "}
          <code className="font-mono text-sm">docs/research/persona-suite-v1.md</code>). Click a
          card to see the actual results page that profile produces.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {rows.map(({ persona, rank, percent, href, targetName }) => (
            <Link
              key={persona.id}
              href={href}
              className="card p-5 hover:border-[var(--color-accent)] transition-colors flex flex-col gap-3"
            >
              <div>
                <div className="font-mono text-xs text-[var(--color-muted)] mb-1">
                  target: {targetName}
                </div>
                <h2 className="font-display text-lg font-semibold leading-snug">{persona.personaName}</h2>
              </div>
              <p className="text-sm text-[var(--color-muted)] flex-1">{persona.narrative}</p>
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    ranked #{rank} of 18
                  </span>
                  {rank > 3 && (
                    <span className="font-mono text-xs text-[var(--color-accent)]">
                      out of top 3
                    </span>
                  )}
                </div>
                <FitBar percent={percent} size="sm" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
