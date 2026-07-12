'use client';

import type { EquityCalloutOutput, ScenarioResult } from '@/lib/equityCalc';
import { formatUSD } from './comp.utils';

interface EquityCalloutProps {
  output: EquityCalloutOutput;
  /** Annualized FAANG RSU comparator, USD — echoed in the headline copy. */
  faangRSUComparator: number;
  /** Modeled dilution fraction (e.g. 0.25) — echoed in the headline copy. */
  dilutionAssumption: number;
}

// One decimal, trailing `.0` trimmed: 19.2 -> "19.2", 3.0 -> "3". Infinity -> "∞".
function formatMultiple(n: number): string {
  if (!Number.isFinite(n)) return '∞';
  return parseFloat(n.toFixed(1)).toString();
}

function formatPct(n: number): string {
  if (!Number.isFinite(n)) return '∞';
  // Sub-1% reads with a decimal; otherwise round to whole percent.
  return n < 1 ? parseFloat(n.toFixed(1)).toString() : Math.round(n).toString();
}

const SCENARIO_ROWS: { key: keyof EquityCalloutOutput['scenarios']; label: string; multiple: string }[] = [
  { key: 'bear', label: 'Bear', multiple: '1×' },
  { key: 'base', label: 'Base', multiple: '3×' },
  { key: 'bull', label: 'Bull', multiple: '10×' },
];

// Scenario reality-check for illiquid startup equity: given a representative
// grant + valuation, how big an exit is needed to match a FAANG RSU, and what
// three exit multiples (1x / 3x / 10x) would actually pay out per year.
export function EquityCallout({ output, faangRSUComparator, dilutionAssumption }: EquityCalloutProps) {
  const { breakEvenExitValuation, currentMultipleRequired, scenarios, assumptions } = output;
  const dilutionPct = Math.round(dilutionAssumption * 100);

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      {/* Headline reality check */}
      <p className="text-[13px] leading-[1.6] text-[var(--color-muted)]">
        To match{' '}
        <span className="font-mono text-[var(--color-fg)]">{formatUSD(faangRSUComparator)}/yr</span>{' '}
        in FAANG RSUs, this company would need to exit at{' '}
        <span className="font-mono text-[var(--color-fg)]">{formatUSD(breakEvenExitValuation)}</span>{' '}
        — a{' '}
        <span className="font-mono text-[var(--color-accent)]">
          {formatMultiple(currentMultipleRequired)}×
        </span>{' '}
        return on today&rsquo;s valuation, assuming {dilutionPct}% dilution.
      </p>

      {/* Scenario rows */}
      <div className="flex flex-col gap-1.5">
        <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3 font-mono text-[11px] text-[var(--color-muted-2)]">
          <span>Exit</span>
          <span>Your equity / yr</span>
          <span className="text-right">vs RSU</span>
        </div>
        {SCENARIO_ROWS.map(({ key, label, multiple }) => {
          const s: ScenarioResult = scenarios[key];
          return (
            <div
              key={key}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3 font-mono text-[13px] tabular-nums"
            >
              <span className="text-[var(--color-muted)]">
                {label} <span className="text-[var(--color-muted-2)]">{multiple}</span>
              </span>
              <span className="text-[var(--color-fg)]">{formatUSD(s.yourAnnualizedValue)}</span>
              <span className="text-right text-[var(--color-accent)]">{formatPct(s.vsRSUPct)}%</span>
            </div>
          );
        })}
      </div>

      {/* Assumptions — collapsed by default */}
      <details className="group">
        <summary className="cursor-pointer list-none text-[11px] font-mono text-[var(--color-muted-2)] transition-colors hover:text-[var(--color-muted)]">
          <span className="group-open:hidden">▸ Assumptions</span>
          <span className="hidden group-open:inline">▾ Assumptions</span>
        </summary>
        <ul className="mt-2 flex flex-col gap-1 pl-3 text-[11px] leading-[1.5] text-[var(--color-muted-2)]">
          {assumptions.map((a) => (
            <li key={a} className="list-disc marker:text-[var(--color-border)]">
              {a}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
