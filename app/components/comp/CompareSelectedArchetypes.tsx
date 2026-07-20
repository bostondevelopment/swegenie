'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { ArchetypeCompData, CompCell, Level, Tier } from './comp.types';
import { formatUSD, guaranteedComp, totalComp } from './comp.utils';

export interface CompareSelectedJobExampleSection {
  heading: string;
  paragraph?: string;
  bullets?: string[];
}

export interface CompareSelectedJobExample {
  company: string;
  title: string;
  location: string | null;
  url: string;
  sections: CompareSelectedJobExampleSection[];
}

export interface CompareSelectedColumn {
  id: string;
  name: string;
  data: ArchetypeCompData;
  href?: string;
  /** Short (1-2 sentence) day-in-the-role summary, if available. */
  daySummary?: string;
  /** Top 2-3 dimensions this archetype rewards most, by display name. */
  keyQualities?: string[];
  /** A couple of real postings for this archetype, if available. */
  jobExamples?: CompareSelectedJobExample[];
}

interface CompareSelectedArchetypesProps {
  columns: CompareSelectedColumn[];
  tier: Tier;
  level: Level;
}

// Shrinks on narrow viewports (leaving more room for data columns before
// horizontal scroll kicks in) without needing a JS breakpoint check.
const LABEL_COL_WIDTH = 'clamp(112px, 32vw, 168px)';
// Numeric ceiling of the clamp above, used only to compute each row's pixel
// min-width floor (see rowStyle below) — a plain number, not a CSS intrinsic-
// sizing keyword, because of the bug described there.
const LABEL_COL_WIDTH_PX = 168;
const MIN_DATA_COL_WIDTH = 190;

const LABEL_CELL_STYLE: CSSProperties = { width: LABEL_COL_WIDTH, flexShrink: 0 };
// flex-shrink: 0 (not a separate min-width) is what enforces the floor here —
// combining flex-basis with an explicit min-width on a growable flex sibling
// reintroduces the sticky bug described below.
const DATA_CELL_STYLE: CSSProperties = { flex: `1 0 ${MIN_DATA_COL_WIDTH}px` };

// Sticky + opaque so the row label stays legible while the data columns
// scroll underneath it — the one thing a comparison table can't lose on a
// narrow screen is "which row am I looking at". Rows are flexbox, not CSS
// grid: `position: sticky` on a CSS Grid item doesn't stick reliably in this
// environment, but sticky-in-flex is solid — a fixed-width label cell plus
// `flex: 1 0 <min>px` data cells replicated identically on every row keeps
// columns aligned just as well as a shared grid track would.
const LABEL_CELL_CLASS = 'sticky left-0 z-10 bg-[var(--color-surface)]';

// Each row needs to be at least 100% of the scroll container (so 2-4
// selections still fill the available width) but grow past that when content
// needs more (so 5 selections scroll instead of squeezing). `width: max-
// content` would express that, but max-content forces every descendant's
// TEXT to be measured as if unwrapped — the "A day in the role" paragraphs
// and "What it rewards" badges are long enough that this balloons the row to
// several thousand pixels wide. A plain numeric min-width computed from the
// known column count sidesteps text measurement entirely: it's just as
// effective a floor, and normal block-width behavior (fill-available, or
// grow past 100% only when the floor demands it) handles the rest.
function rowStyle(columnCount: number): CSSProperties {
  return { minWidth: LABEL_COL_WIDTH_PX + columnCount * MIN_DATA_COL_WIDTH };
}

export function CompareSelectedArchetypes({ columns, tier, level }: CompareSelectedArchetypesProps) {
  const sorted = [...columns].sort(
    (a, b) => totalComp(a.data[tier][level]).p50 <= totalComp(b.data[tier][level]).p50
      ? 1
      : -1,
  );
  const maxValue = Math.max(...sorted.map((c) => totalComp(c.data[tier][level]).p90), 1);
  const hasQualities = sorted.some((col) => col.keyQualities?.length);
  const hasDaySummary = sorted.some((col) => col.daySummary);
  const hasJobExamples = sorted.some((col) => col.jobExamples?.length);

  return (
    <div className="overflow-x-auto rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div>
        {/* Column headers */}
        <div className="flex border-b border-[var(--color-border)]" style={rowStyle(sorted.length)}>
          <div className={LABEL_CELL_CLASS} style={LABEL_CELL_STYLE} />
          {sorted.map((col, i) => (
            <div
              key={col.id}
              className="relative border-l border-[var(--color-border)] px-4 sm:px-[22px] pt-4 sm:pt-[22px] pb-3 sm:pb-[18px]"
              style={DATA_CELL_STYLE}
            >
              {i === 0 && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/[0.08] to-transparent" />
              )}
              <div className="relative mb-2 flex items-center gap-2">
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                    i === 0
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                      : 'bg-[var(--color-border)] text-[var(--color-muted)]'
                  }`}
                >
                  {i + 1}
                </span>
                {i === 0 && (
                  <span className="rounded-full bg-[var(--color-accent)]/10 px-2 py-[3px] font-mono text-[10px] font-bold uppercase tracking-wide text-[var(--color-accent)]">
                    Highest paying
                  </span>
                )}
              </div>
              {col.href ? (
                <Link href={col.href} className="relative text-[14px] sm:text-[16px] font-bold leading-tight hover:underline">
                  {col.name}
                </Link>
              ) : (
                <div className="relative text-[14px] sm:text-[16px] font-bold leading-tight">{col.name}</div>
              )}
            </div>
          ))}
        </div>

        {/* Total comp — median with a real P25-P75 band */}
        <CompareRow label={<>Total comp<br />(median)</>} columnCount={sorted.length}>
          {sorted.map((col) => {
            const band = totalComp(col.data[tier][level]);
            const p25 = (band.p25 / maxValue) * 100;
            const p75 = (band.p75 / maxValue) * 100;
            const p50 = (band.p50 / maxValue) * 100;
            return (
              <div
                key={col.id}
                className="border-l border-[var(--color-border)] px-4 sm:px-[22px] py-4 sm:py-5"
                style={DATA_CELL_STYLE}
              >
                <div className="mb-2.5 font-mono text-[18px] sm:text-[22px] font-bold tabular-nums">{formatUSD(band.p50)}</div>
                <div className="relative h-2.5 w-full">
                  <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-[var(--color-accent)]/25" />
                  <div
                    className="absolute top-1/2 h-[7px] -translate-y-1/2 rounded-full bg-[var(--color-accent)]/50"
                    style={{ left: `${p25}%`, width: `${Math.max(p75 - p25, 2)}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]"
                    style={{ left: `${p50}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CompareRow>

        {/* Guaranteed */}
        <CompareRow
          label={
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
              Guaranteed
            </span>
          }
          columnCount={sorted.length}
        >
          {sorted.map((col) => (
            <div
              key={col.id}
              className="border-l border-[var(--color-border)] px-4 sm:px-[22px] py-3 sm:py-4 font-mono text-[13px] sm:text-[15px] tabular-nums"
              style={DATA_CELL_STYLE}
            >
              {formatUSD(guaranteedComp(col.data[tier][level]).p50)}
            </div>
          ))}
        </CompareRow>

        {/* Equity */}
        <CompareRow
          label={
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-signal-good)]" />
              Equity (annualized)
            </span>
          }
          columnCount={sorted.length}
        >
          {sorted.map((col) => (
            <div
              key={col.id}
              className="border-l border-[var(--color-border)] px-4 sm:px-[22px] py-3 sm:py-4 font-mono text-[13px] sm:text-[15px] tabular-nums"
              style={DATA_CELL_STYLE}
            >
              {col.data[tier][level].equity ? formatUSD(col.data[tier][level].equity!.annualizedUSD.p50) : '—'}
            </div>
          ))}
        </CompareRow>

        {/* Mix — guaranteed vs equity share of the same total */}
        <CompareRow label="Mix" last={!hasQualities && !hasDaySummary && !hasJobExamples} columnCount={sorted.length}>
          {sorted.map((col) => {
            const { guarPct, equityPct } = guaranteedVsEquityMix(col.data[tier][level]);
            return (
              <div
                key={col.id}
                className="border-l border-[var(--color-border)] px-4 sm:px-[22px] py-3 sm:py-[18px]"
                style={DATA_CELL_STYLE}
              >
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="shrink-0 border-r-2 border-[var(--color-surface)] bg-[var(--color-accent)]"
                    style={{ flexBasis: `${guarPct}%` }}
                  />
                  <div className="shrink-0 bg-[var(--color-signal-good)]" style={{ flexBasis: `${equityPct}%` }} />
                </div>
                <div className="mt-2 flex gap-3.5 text-[11px] text-[var(--color-muted)]">
                  <span>
                    Guar. <span className="font-mono text-[var(--color-fg)]">{guarPct}%</span>
                  </span>
                  <span>
                    Equity <span className="font-mono text-[var(--color-fg)]">{equityPct}%</span>
                  </span>
                </div>
              </div>
            );
          })}
        </CompareRow>

        {/* What it rewards */}
        {hasQualities && (
          <CompareRow label="What it rewards" last={!hasDaySummary && !hasJobExamples} columnCount={sorted.length}>
            {sorted.map((col) => (
              <div
                key={col.id}
                className="flex flex-col items-start gap-2 border-l border-[var(--color-border)] px-4 sm:px-[22px] py-4 sm:py-5"
                style={DATA_CELL_STYLE}
              >
                {(col.keyQualities ?? []).map((q) => (
                  <span
                    key={q}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-fg)]/[0.03] px-3 py-1.5 text-[12px] sm:text-[12.5px] text-[var(--color-fg)]/85"
                  >
                    {q}
                  </span>
                ))}
              </div>
            ))}
          </CompareRow>
        )}

        {/* A day in the role */}
        {hasDaySummary && (
          <CompareRow label="A day in the role" last={!hasJobExamples} columnCount={sorted.length}>
            {sorted.map((col) => (
              <div
                key={col.id}
                className="relative border-l border-[var(--color-border)] px-4 sm:px-[22px] py-4 sm:py-5"
                style={DATA_CELL_STYLE}
              >
                <div className="absolute bottom-5 sm:bottom-6 left-4 sm:left-[22px] top-5 sm:top-6 w-0.5 rounded-full bg-[var(--color-accent)]/25" />
                <p className="ml-4 text-[13px] sm:text-[14px] leading-[1.65] sm:leading-[1.7] text-[var(--color-muted)]">{col.daySummary}</p>
              </div>
            ))}
          </CompareRow>
        )}

        {/* Example postings */}
        {hasJobExamples && (
          <CompareRow label="Example postings" last columnCount={sorted.length}>
            {sorted.map((col) => (
              <div
                key={col.id}
                className="flex flex-col gap-2 border-l border-[var(--color-border)] px-3 sm:px-[18px] py-4 sm:py-5"
                style={DATA_CELL_STYLE}
              >
                {(col.jobExamples ?? []).slice(0, 2).map((job, i) => (
                  <CompactJobPosting key={i} columnId={col.id} index={i} job={job} />
                ))}
              </div>
            ))}
          </CompareRow>
        )}
      </div>
    </div>
  );
}

// Narrower cousin of JobExamplesAccordion: same expand-to-read-the-actual-
// posting behavior, sized to fit a comparison-table data column instead of a
// full-width page section.
function CompactJobPosting({
  columnId,
  index,
  job,
}: {
  columnId: string;
  index: number;
  job: CompareSelectedJobExample;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[12px] border border-[var(--color-border)] overflow-hidden">
      <button
        onClick={() => {
          if (!isOpen) track('job_examples_open', { company: job.company, index, source: 'compare' });
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-controls={`job-posting-${columnId}-${index}`}
        className="w-full flex items-start justify-between gap-2 px-3 py-2.5 text-left"
      >
        <div className="min-w-0">
          <div className="font-mono text-[10px] sm:text-[11px] text-[var(--color-muted-2)] mb-0.5">{job.company}</div>
          <div className="text-[12.5px] sm:text-[13px] leading-snug text-[var(--color-fg)]">{job.title}</div>
        </div>
        <span
          className={`shrink-0 mt-0.5 text-[var(--color-muted-2)] transition-transform duration-150 ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {isOpen && (
        <div id={`job-posting-${columnId}-${index}`} className="px-3 pb-3 pt-1 border-t border-[var(--color-border)]">
          <div className="max-h-[280px] overflow-y-auto mt-3 flex flex-col gap-3.5">
            {job.sections.map((s, si) => (
              <div key={si}>
                <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-muted-2)] mb-1.5">
                  {s.heading}
                </div>
                {s.paragraph && (
                  <p className="text-[12.5px] text-[var(--color-muted)] leading-[1.6]">{s.paragraph}</p>
                )}
                {s.bullets && (
                  <ul className="flex flex-col gap-1">
                    {s.bullets.map((b, bi) => (
                      <li key={bi} className="text-[12.5px] text-[var(--color-muted)] leading-[1.55] flex gap-2">
                        <span className="text-[var(--color-accent)] shrink-0">&mdash;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-[var(--color-accent)] hover:opacity-80 mt-3.5 inline-block"
          >
            View original posting ↗ (snapshot — may no longer be live)
          </a>
        </div>
      )}
    </div>
  );
}

function guaranteedVsEquityMix(cell: CompCell): { guarPct: number; equityPct: number } {
  const guaranteed = guaranteedComp(cell).p50;
  const equity = cell.equity?.annualizedUSD.p50 ?? 0;
  const sum = guaranteed + equity || 1;
  const guarPct = Math.round((guaranteed / sum) * 100);
  return { guarPct, equityPct: 100 - guarPct };
}

function CompareRow({
  label,
  last = false,
  columnCount,
  children,
}: {
  label: ReactNode;
  last?: boolean;
  columnCount: number;
  children: ReactNode;
}) {
  return (
    <div className={`flex ${last ? '' : 'border-b border-[var(--color-border)]'}`} style={rowStyle(columnCount)}>
      <div
        className={`${LABEL_CELL_CLASS} p-4 sm:p-5 font-mono text-[11px] sm:text-[12px] uppercase tracking-wide text-[var(--color-muted-2)]`}
        style={LABEL_CELL_STYLE}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
