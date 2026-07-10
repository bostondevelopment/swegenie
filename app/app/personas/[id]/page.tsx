import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FitBar } from "@/components/FitBar";
import { personas } from "@/lib/personas";
import { FLOW } from "@/lib/assessment-flow";
import { aggregateAnswersToProfile } from "@/lib/assessment-flow";
import { encodeProfile } from "@/lib/encode";
import { rankArchetypes, fitPercent } from "@/lib/scoring";
import { archetypeById, dimensionById, type Question } from "@/lib/taxonomy";

const personaById = new Map(personas.map((p) => [p.id, p]));
const questionSteps = FLOW.filter(
  (s): s is Extract<typeof s, { kind: "question" }> => s.kind === "question"
).map((s) => s.question);

export function generateStaticParams() {
  return personas.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const persona = personaById.get(id);
  return { title: persona ? `${persona.personaName} — persona preview` : "Persona preview" };
}

function describeAnswer(question: Question, value: number | undefined): string {
  if (value === undefined) return "— not answered —";
  if (question.format === "slider" && question.scale) {
    const { min, max, minLabel, maxLabel } = question.scale;
    return `${value.toFixed(1)} / ${max} (${min} = "${minLabel}", ${max} = "${maxLabel}")`;
  }
  const opt = question.options?.find((o) => o.value === value);
  return opt ? opt.label : String(value);
}

const SECTION_TITLES: Record<Question["section"], string> = {
  stack: "Stack & self-rated skills",
  work_style: "Work style",
  people: "People & client comfort",
  incentives: "Incentives & motivation",
};

export default async function PersonaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const persona = personaById.get(id);
  if (!persona) notFound();

  const profile = aggregateAnswersToProfile(persona.answers);
  const ranked = rankArchetypes(profile);
  const rank = ranked.findIndex((r) => r.id === persona.targetArchetypeId) + 1;
  const result = ranked.find((r) => r.id === persona.targetArchetypeId)!;
  const targetArchetype = archetypeById.get(persona.targetArchetypeId);
  const encoded = encodeProfile(profile);

  const dimensionRows = Object.entries(targetArchetype!.scores)
    .map(([dimId, s]) => {
      const uv = profile[dimId];
      const fit = uv == null ? null : 1 - Math.abs(uv - s.target) / 4;
      return { dimId, name: dimensionById.get(dimId)?.name ?? dimId, uv, target: s.target, weight: s.weight, fit };
    })
    .sort((a, b) => b.weight - a.weight);

  const sections: Question["section"][] = ["stack", "work_style", "people", "incentives"];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <Link href="/personas" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] mb-4 inline-block">
          &larr; All personas
        </Link>
        <p className="font-mono text-xs text-[var(--color-muted)] mb-2">
          internal / QA &middot; target: {targetArchetype?.name ?? persona.targetArchetypeId}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{persona.personaName}</h1>
        <p className="text-[var(--color-muted)] mb-6 max-w-2xl">{persona.narrative}</p>

        <div className="card p-5 mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="font-mono text-xs text-[var(--color-muted)] mb-1">
              ranked #{rank} of {ranked.length}
              {rank > 3 && <span className="text-[var(--color-accent)]"> — out of top 3</span>}
            </div>
            <FitBar percent={fitPercent(result.fitScore)} />
          </div>
          <Link href={`/results?a=${encoded}`} className="btn-primary px-4 py-2 text-sm font-medium whitespace-nowrap">
            View full results page
          </Link>
        </div>

        <details className="card p-4 mb-8 text-sm">
          <summary className="cursor-pointer font-medium">Full ranking (all {ranked.length} archetypes)</summary>
          <ol className="mt-3 flex flex-col gap-1.5">
            {ranked.map((r, i) => (
              <li key={r.id} className="flex justify-between gap-3">
                <span className={r.id === persona.targetArchetypeId ? "font-semibold" : "text-[var(--color-muted)]"}>
                  {i + 1}. {r.name}
                </span>
                <span className="font-mono">{fitPercent(r.fitScore)}%</span>
              </li>
            ))}
          </ol>
        </details>

        <h2 className="font-display text-lg font-semibold mb-3">
          How the {targetArchetype?.name} match was scored
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Each row is one dimension: this persona&apos;s aggregated answer, {targetArchetype?.name}&apos;s
          target for that dimension, how much it&apos;s weighted, and the resulting fit. Sorted by weight
          — the top rows are what actually drove the score.
        </p>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-[var(--color-muted)] border-b border-[var(--color-border)]">
                <th className="py-2 pr-3 font-medium">Dimension</th>
                <th className="py-2 pr-3 font-medium">Answer</th>
                <th className="py-2 pr-3 font-medium">Target</th>
                <th className="py-2 pr-3 font-medium">Weight</th>
                <th className="py-2 font-medium">Fit</th>
              </tr>
            </thead>
            <tbody>
              {dimensionRows.map((row) => (
                <tr key={row.dimId} className="border-b border-[var(--color-border)]/60">
                  <td className="py-2 pr-3">{row.name}</td>
                  <td className="py-2 pr-3 font-mono">{row.uv == null ? "—" : row.uv.toFixed(2)}</td>
                  <td className="py-2 pr-3 font-mono">{row.target}</td>
                  <td className="py-2 pr-3 font-mono">{row.weight.toFixed(1)}</td>
                  <td className="py-2 font-mono">{row.fit == null ? "—" : row.fit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-lg font-semibold mb-3">Every question this persona answered</h2>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          The raw answers that produced the dimension values above — grouped in the same section order
          a real test-taker sees them.
        </p>
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section}>
              <h3 className="font-mono text-xs uppercase tracking-wide text-[var(--color-muted)] mb-3">
                {SECTION_TITLES[section]}
              </h3>
              <div className="flex flex-col gap-4">
                {questionSteps
                  .filter((q) => q.section === section)
                  .map((q) => (
                    <div key={q.id} className="card p-4">
                      <div className="flex justify-between items-start gap-3 mb-1.5">
                        <p className="text-sm font-medium">{q.prompt}</p>
                        <span className="font-mono text-[10px] text-[var(--color-muted)] whitespace-nowrap pt-0.5">
                          {dimensionById.get(q.dimension)?.name ?? q.dimension}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-accent)]">
                        {describeAnswer(q, persona.answers[q.id])}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
