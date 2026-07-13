"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FitBar } from "@/components/FitBar";
import { ShareBar } from "@/components/ShareBar";
import { BetaSurvey } from "@/components/BetaSurvey";
import { decodeProfile } from "@/lib/encode";
import { rankArchetypes, fitPercent } from "@/lib/scoring";
import { archetypeById, dimensionById } from "@/lib/taxonomy";
import { getResultsCopy, fillWhyMatched, fillGrowthArea } from "@/lib/results-copy";
import { getCompStructure } from "@/lib/comp-structure";
import { CompBandBar } from "@/components/CompBandBar";
import { CompMixBar } from "@/components/CompMixBar";
import { CompComparisonChart } from "@/components/CompComparisonChart";
import { CompProgressionChart } from "@/components/CompProgressionChart";
import { CompSection, ArchetypeCompareTable, type ArchetypeCompareRow } from "@/components/comp";
import type { CompByTierData, Level } from "@/components/comp";
import compByTierData from "@/data/comp-by-tier.json";
import archetypeJobExamples from "@/data/archetype-job-examples.json";
import { JobExamplesAccordion } from "@/components/JobExamplesAccordion";
import { RateRole } from "@/components/RateRole";
import { CompHeadline } from "@/components/CompHeadline";
import { ExpandableCard } from "@/components/ExpandableCard";
import { ActionCard } from "@/components/ActionCard";
import { Badge } from "@/components/Badge";

// Comp-by-tier detail keyed by archetype id (static JSON — works under
// `output: 'export'`). Same cast the archetype detail page uses.
const compByTier = compByTierData.archetypes as unknown as CompByTierData;

/**
 * Infer the user's career level from the stack-intake `s=` param (JSON blob set
 * by the assessment: `/results?a=…&s=…`). `years_experience` is the only YOE
 * signal we collect — the dimension answers in `a=` are preference scores, not
 * seniority. Falls back to L4 when the param is missing, malformed, or has no
 * usable years value. Bands: L3 0–2yr, L4 3–6yr, L5 7–12yr, Staff 12+yr.
 */
function inferLevel(stackRaw: string | null): Level {
  if (!stackRaw) return "L4";
  try {
    const intake = JSON.parse(stackRaw) as { years_experience?: unknown };
    const yoe = Number(intake.years_experience);
    if (!Number.isFinite(yoe)) return "L4";
    if (yoe < 3) return "L3";
    if (yoe < 7) return "L4";
    if (yoe <= 12) return "L5";
    return "Staff";
  } catch {
    return "L4";
  }
}

type RankedState =
  | { kind: "none" }
  | { kind: "stale" }
  | { kind: "ranked"; ranked: ReturnType<typeof rankArchetypes> };

function getRanked(encoded: string | null): RankedState {
  if (!encoded) return { kind: "none" };
  const profile = decodeProfile(encoded);
  if (profile === null) return { kind: "stale" }; // encoded under a prior taxonomy version
  const answeredCount = Object.values(profile).filter((v) => v !== null && v !== undefined).length;
  if (answeredCount === 0) return { kind: "none" };
  return { kind: "ranked", ranked: rankArchetypes(profile) };
}

/**
 * Computed entirely client-side (static export has no per-request server to
 * decode the `a=` query param and render personalized HTML/metadata — see
 * ADR-002 update on static hosting). This also means the page's <title> and
 * OG tags can no longer vary per result; that personalization was dropped
 * along with the sharing feature (see the api/og removal commit) rather than
 * kept half-working.
 */
export default function ResultsClient() {
  const searchParams = useSearchParams();
  const state = getRanked(searchParams.get("a"));

  if (state.kind === "stale") {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">This result link has expired</h1>
          <p className="text-[var(--color-muted)] mb-8">
            This link can no longer be read. Retake the assessment to get a fresh result.
          </p>
          <Link href="/assessment" className="btn-primary px-5 py-3 font-medium">
            Retake the assessment
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (state.kind === "none") {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">No result to show yet</h1>
          <p className="text-[var(--color-muted)] mb-8">
            This link doesn&apos;t have an assessment result encoded in it.
          </p>
          <Link href="/assessment" className="btn-primary px-5 py-3 font-medium">
            Take the assessment
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  const ranked = state.ranked;
  const inferredLevel = inferLevel(searchParams.get("s"));
  const top = ranked[0];
  const topCopy = getResultsCopy(top.id);
  const topDimNames = top.topContributors.map((c) => dimensionById.get(c.dimension)?.name ?? c.dimension);
  const whyMatched = fillWhyMatched(topCopy.whyMatchedTemplate, topDimNames);
  const growthDim = top.topGaps[0] ? dimensionById.get(top.topGaps[0].dimension)?.name : undefined;
  const growthText = growthDim ? fillGrowthArea(topCopy.growthAreasTemplate, growthDim) : null;

  // Step 2.7 (v1.6) — surface how correlated dimension *combinations* helped or
  // hurt this match, beyond the per-dimension "why". Only shown when the
  // co-occurrence layer actually moved the top match's score.
  const dimName = (id: string) => dimensionById.get(id)?.name ?? id;
  const correlationNotes = top.correlationAdjustment.pairs.map((p) => ({
    kind: p.kind,
    text:
      p.kind === "reinforcing"
        ? `Your combination of ${dimName(p.a)} and ${dimName(p.b)} is a strong signal for this role.`
        : `Your answers on ${dimName(p.a)} and ${dimName(p.b)} pull in opposite directions for this role.`,
  }));

  const topArchetype = archetypeById.get(top.id);
  const topDimensions = topArchetype
    ? Object.entries(topArchetype.scores).sort((a, b) => b[1].weight - a[1].weight).slice(0, 5)
    : [];
  const rateDimensions = topDimensions
    .slice(0, 3)
    .map(([dimId]) => ({ id: dimId, name: dimensionById.get(dimId)?.name ?? dimId }));
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
    >)[top.id] ?? [];
  const archetypeCompData = compByTier[top.id];

  const topComp = getCompStructure(top.id);
  const compareRows: ArchetypeCompareRow[] = ranked
    .filter((r) => Boolean(compByTier[r.id]))
    .map((r) => ({
      id: r.id,
      name: r.name,
      data: compByTier[r.id],
      fitPercent: fitPercent(r.fitScore),
      href: `/archetypes/${r.id}`,
    }));
  const comparisonOthers = ranked
    .slice(1)
    .map((r) => {
      const comp = getCompStructure(r.id);
      return comp
        ? { archetypeId: r.id, label: r.name, low: comp.low, high: comp.high, typical: comp.typical }
        : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-8">
          <p className="font-mono text-sm text-[var(--color-muted-2)] mb-[18px]">
            Ranked #1 of {ranked.length} engineering role archetypes
          </p>
          <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-5">
            {top.name}
          </h1>
          {top.confidence === "medium" && (
            <p className="text-xs font-mono text-[var(--color-signal-warn)] mb-5">
              Lower-confidence sourcing (below target job-posting count) — see{" "}
              <Link href="/methodology" className="underline hover:text-[var(--color-fg)]">
                methodology
              </Link>
              .
            </p>
          )}
          <div className="max-w-md mb-8">
            <FitBar percent={fitPercent(top.fitScore)} />
          </div>
          <p className="text-lg text-[var(--color-muted)] leading-[1.7] mb-9 max-w-2xl whitespace-pre-line">
            {whyMatched}
          </p>
          {correlationNotes.length > 0 && (
            <ul className="mb-9 max-w-2xl flex flex-col gap-2.5">
              {correlationNotes.map((note, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] text-[var(--color-muted)] leading-[1.6] border-l-2 pl-3.5 py-0.5"
                  style={{
                    borderColor:
                      note.kind === "reinforcing"
                        ? "var(--color-accent, #6ee7b7)"
                        : "var(--color-muted-2)",
                  }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-muted-2)] mt-1 shrink-0">
                    {note.kind === "reinforcing" ? "+ signal" : "− tension"}
                  </span>
                  <span>{note.text}</span>
                </li>
              ))}
            </ul>
          )}
          <ShareBar topArchetypeName={top.name} fitPercent={fitPercent(top.fitScore)} />
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="font-display text-xl font-semibold mb-4">What this role actually is</h2>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line max-w-2xl">
            {topCopy.whatThisIs}
          </p>
        </section>

        {topDimensions.length > 0 && (
          <>
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
          </>
        )}

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="font-display text-xl font-semibold mb-4">A day in this role</h2>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line max-w-2xl">
            {topCopy.aDayInThisRole}
          </p>
        </section>

        {growthText && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
              <h2 className="font-display text-xl font-semibold mb-4">Growth areas — if this wasn&apos;t a perfect fit</h2>
              <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line max-w-2xl">
                {growthText}
              </p>
            </section>
          </>
        )}

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="font-display text-xl font-semibold">Comp structure</h2>
            <Link
              href="/methodology#compensation-data"
              className="font-mono text-xs text-[var(--color-muted-2)] underline hover:text-[var(--color-fg)] shrink-0"
            >
              Sourcing &amp; methodology
            </Link>
          </div>
          {topComp && (
            <div className="mb-6 pt-4">
              <CompHeadline typical={topComp.typical} />
              <CompBandBar low={topComp.low} high={topComp.high} typical={topComp.typical} />
              {topComp.mix && (
                <div className="mt-6">
                  <CompMixBar mix={topComp.mix} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topComp.mix.basePct > 0 && (
                      <Badge variant="neutral">{topComp.mix.basePct}% base</Badge>
                    )}
                    {topComp.mix.bonusPct > 0 && (
                      <Badge variant="neutral">{topComp.mix.bonusPct}% bonus</Badge>
                    )}
                    {topComp.mix.equityPct > 0 && (
                      <Badge variant="neutral">{topComp.mix.equityPct}% equity</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line max-w-2xl">
            {topCopy.compStructure}
          </p>
          {topComp?.caveat && (
            <div className="mt-6 max-w-2xl">
              <ExpandableCard title="Data notes">{topComp.caveat}</ExpandableCard>
            </div>
          )}
        </section>

        {topComp?.levels && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
              <h2 className="font-display text-xl font-semibold mb-6">Comp by level</h2>
              <CompProgressionChart
                levels={topComp.levels.map((lvl) => ({ level: lvl.label, low: lvl.low, high: lvl.high }))}
              />
            </section>
          </>
        )}

        {archetypeCompData && (
          <CompSection archetypeId={top.id} data={archetypeCompData} userLevel={inferredLevel} />
        )}

        {topComp && comparisonOthers.length > 0 && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
              <h2 className="font-display text-xl font-semibold mb-6">How this compares to other archetypes</h2>
              <CompComparisonChart
                current={{ archetypeId: top.id, label: top.name, low: topComp.low, high: topComp.high, typical: topComp.typical }}
                others={comparisonOthers}
              />
            </section>
          </>
        )}

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

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-semibold mb-2">Full ranking</h2>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] mb-8 max-w-2xl">
            Every archetype you matched, compared on one aligned scale. Choose a level and company
            tier to re-rank by pay; each row also shows how well it fit your answers.
          </p>
          {compareRows.length > 0 ? (
            <ArchetypeCompareTable
              rows={compareRows}
              defaultTier="high-growth-public"
              defaultLevel={inferredLevel}
            />
          ) : (
            <div className="flex flex-col">
              {ranked.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/archetypes/${r.id}`}
                  className={`grid grid-cols-[32px_1fr_auto] sm:grid-cols-[32px_1fr_200px] items-center gap-4 py-3.5 border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-fg)]/[0.03] ${
                    i === 0 ? "bg-[var(--color-fg)]/[0.03]" : ""
                  }`}
                >
                  <span className="font-mono text-sm text-[var(--color-muted-2)]">{i + 1}</span>
                  <span className={`text-[15px] truncate ${i === 0 ? "font-semibold" : ""}`}>
                    {r.name}
                    {r.confidence === "medium" && (
                      <span className="ml-2 font-mono text-[11px] text-[var(--color-muted-2)]">lower-confidence</span>
                    )}
                  </span>
                  <span className="hidden sm:block w-full">
                    <FitBar percent={fitPercent(r.fitScore)} size="sm" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="font-display text-xl font-semibold mb-4">How to test this cheaply</h2>
          <div className="flex flex-col gap-4 max-w-2xl">
            {topCopy.howToTestCheaply.map((step, i) => (
              <ActionCard key={i} n={i + 1}>
                {step}
              </ActionCard>
            ))}
          </div>
          <div className="mt-8">
            <Link href={`/archetypes/${top.id}`} className="btn-primary inline-flex px-5 py-3 font-medium">
              Explore {top.name} in depth
            </Link>
          </div>
        </section>

        {rateDimensions.length > 0 && (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>
            <RateRole archetypeId={top.id} dimensions={rateDimensions} />
          </>
        )}

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <BetaSurvey topArchetype={top.id} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
