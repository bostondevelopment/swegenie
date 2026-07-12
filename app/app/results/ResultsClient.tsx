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
import { dimensionById } from "@/lib/taxonomy";
import { getResultsCopy, fillWhyMatched, fillGrowthArea } from "@/lib/results-copy";
import { getCompStructure } from "@/lib/comp-structure";
import { CompBandBar } from "@/components/CompBandBar";
import { CompMixBar } from "@/components/CompMixBar";
import { CompComparisonChart } from "@/components/CompComparisonChart";
import { CompProgressionChart } from "@/components/CompProgressionChart";
import { TierCompChart } from "@/components/comp";
import type { CompByTierData, Level } from "@/components/comp";
import compByTierData from "@/data/comp-by-tier.json";

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
          <h1 className="font-display text-2xl font-semibold mb-4">This result is from an older version</h1>
          <p className="text-[var(--color-muted)] mb-8">
            The assessment&apos;s scoring model has been updated since this link was created, so it
            can&apos;t be read anymore. Retake the assessment to get a result under the current model.
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

  const topComp = getCompStructure(top.id);
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
          <h1 className="font-display text-4xl sm:text-[44px] font-bold tracking-tight mb-6">
            {top.name}
          </h1>
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

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">What this role actually is</h2>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line">
              {topCopy.whatThisIs}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">A day in this role</h2>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line">
              {topCopy.aDayInThisRole}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Comp structure</h2>
            {topComp && (
              <div className="mb-6 pt-4">
                <CompBandBar low={topComp.low} high={topComp.high} typical={topComp.typical} />
                {topComp.mix && (
                  <div className="mt-6">
                    <CompMixBar mix={topComp.mix} />
                  </div>
                )}
              </div>
            )}
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line">
              {topCopy.compStructure}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">How to test this cheaply</h2>
            <p className="text-[15px] text-[var(--color-muted)] leading-[1.75] whitespace-pre-line">
              {topCopy.howToTestCheaply}
            </p>
          </div>
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
          <h2 className="font-display text-2xl font-semibold mb-6">Full ranking</h2>
          <div className="flex flex-col">
            {ranked.map((r, i) => {
              const compData = compByTier[r.id];
              return (
                <div key={r.id} className="border-b border-[var(--color-border)]">
                  <Link
                    href={`/archetypes/${r.id}`}
                    className={`grid grid-cols-[32px_1fr_auto] sm:grid-cols-[32px_1fr_200px] items-center gap-4 py-3.5 transition-colors hover:bg-[var(--color-fg)]/[0.03] ${
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

                  {/* Compact comp-by-tier chart per matched archetype. Silent
                      no-op when this archetype has no comp-by-tier data. Pure-CSS
                      collapse (checkbox peer): collapsed by default on mobile,
                      forced-open at >=768px where the toggle is hidden. */}
                  {compData && (
                    <div className="pb-4 pl-[46px] pr-1">
                      <input
                        type="checkbox"
                        id={`comp-toggle-${r.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`comp-toggle-${r.id}`}
                        className="md:hidden inline-flex cursor-pointer select-none items-center gap-1 font-mono text-[12px] text-[var(--color-muted-2)] hover:text-[var(--color-fg)]"
                      >
                        Compensation by tier
                        <span aria-hidden>&#9662;</span>
                      </label>
                      <div className="hidden peer-checked:block md:block mt-4">
                        <TierCompChart
                          archetypeId={r.id}
                          data={compData}
                          defaultLevel={inferredLevel}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="h-px bg-[var(--color-border)]" /></div>

        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <BetaSurvey topArchetype={top.id} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
