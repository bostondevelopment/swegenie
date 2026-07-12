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
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-20">
        <Link href="/personas" className="font-mono text-[13px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)] mb-5 inline-block">
          &larr; All personas
        </Link>
        <p className="font-mono text-[13px] text-[var(--color-muted-2)] mb-2.5">
          internal / QA &middot; target: {targetArchetype?.name ?? persona.targetArchetypeId}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight mb-[18px]">{persona.personaName}</h1>
        <p className="text-lg text-[var(--color-muted)] leading-[1.7] mb-8 max-w-2xl">{persona.narrative}</p>

        <div className="card p-6 mb-5 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1 flex flex-wrap items-center gap-6">
            <span className="font-mono text-[13px] text-[var(--color-muted-2)] whitespace-nowrap">
              ranked #{rank} of {ranked.length}
            </span>
            <div className="flex-1 min-w-[180px]">
              <FitBar percent={fitPercent(result.fitScore)} />
            </div>
          </div>
          <Link href={`/results?a=${encoded}`} className="btn-primary self-start sm:self-auto px-[22px] py-3 text-[15px] font-semibold whitespace-nowrap">
            View full results page
          </Link>
        </div>

        <details className="card p-5 mb-11">
          <summary className="cursor-pointer font-semibold text-[15px]">&#9656; Full ranking (all {ranked.length} archetypes)</summary>
          <p className="mt-3.5 text-sm text-[var(--color-muted-2)]">
            See the <Link href={`/results?a=${encoded}`} className="text-[var(--color-accent)]">full results page</Link> for the complete ranked list of all {ranked.length} archetypes.
          </p>
        </details>

        <h2 className="font-display text-2xl font-semibold mb-3.5">
          How the {targetArchetype?.name} match was scored
        </h2>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.7] mb-7">
          Each row is one dimension: this persona&apos;s aggregated answer, {targetArchetype?.name}&apos;s
          target for that dimension, how much it&apos;s weighted, and the resulting fit. Sorted by weight
          — the top rows are what actually drove the score.
        </p>
        <div className="overflow-x-auto mb-14">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[1fr_90px_90px_90px_70px] py-2.5 border-b border-[rgba(245,245,242,0.15)] font-mono text-xs uppercase tracking-wide text-[var(--color-muted-2)]">
              <div>Dimension</div><div>Answer</div><div>Target</div><div>Weight</div><div>Fit</div>
            </div>
            {dimensionRows.map((row) => (
              <div key={row.dimId} className="grid grid-cols-[1fr_90px_90px_90px_70px] py-3 border-b border-[var(--color-border)] text-[15px]">
                <div>{row.name}</div>
                <div className="font-mono text-[var(--color-muted)]">{row.uv == null ? "—" : row.uv.toFixed(2)}</div>
                <div className="font-mono text-[var(--color-muted)]">{row.target}</div>
                <div className="font-mono text-[var(--color-muted)]">{row.weight.toFixed(1)}</div>
                <div className="font-mono text-[var(--color-accent)]">{row.fit == null ? "—" : row.fit.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-display text-2xl font-semibold mb-2.5">Every question this persona answered</h2>
        <p className="text-[15px] text-[var(--color-muted)] leading-[1.7] mb-7">
          The raw answers that produced the dimension values above — grouped in the same section order
          a real test-taker sees them.
        </p>
        <div className="flex flex-col gap-9">
          {sections.map((section) => (
            <div key={section}>
              <h3 className="font-mono text-xs uppercase tracking-wide text-[var(--color-muted-2)] mb-4">
                {SECTION_TITLES[section]}
              </h3>
              <div className="flex flex-col gap-3.5">
                {questionSteps
                  .filter((q) => q.section === section)
                  .map((q) => (
                    <div key={q.id} className="card p-5">
                      <div className="flex justify-between items-start gap-4 mb-2.5">
                        <p className="text-base font-semibold">{q.prompt}</p>
                        <span className="font-mono text-[11px] text-[var(--color-muted-2)] whitespace-nowrap pt-0.5">
                          {dimensionById.get(q.dimension)?.name ?? q.dimension}
                        </span>
                      </div>
                      <p className="text-[15px] text-[var(--color-accent)] leading-[1.6]">
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
