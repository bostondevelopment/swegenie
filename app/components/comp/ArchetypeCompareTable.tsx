'use client';

import { useMemo, useState } from 'react';
import type { ArchetypeCompData, Tier } from './comp.types';
import { TIER_LABELS, TIER_ORDER, formatUSD, totalComp } from './comp.utils';
import { CompRangeBar } from './CompRangeBar';

export interface StaffCrossRow {
  id: string;
  name: string;
  data: ArchetypeCompData;
}

interface StaffCrossTableProps {
  rows: StaffCrossRow[];
}

// Ranks every archetype's Staff-level total comp at a chosen company tier, highest
// first. FAANG/Mag7 is the reference tier; a chip toggle re-scales and re-sorts
// against any other tier. All bars share one x-axis (largest P90 at the tier) so
// the widths are directly comparable — this is the "which role pays most at Staff"
// answer no per-archetype page can give on its own.
export function StaffCrossTable({ rows }: StaffCrossTableProps) {
  const [tier, setTier] = useState<Tier>('faang-mag7');

  const sorted = useMemo(
    () =>
      [...rows].sort(
        (a, b) => totalComp(b.data[tier].Staff).p50 - totalComp(a.data[tier].Staff).p50,
      ),
    [rows, tier],
  );

  const maxValue = useMemo(
    () => sorted.reduce((max, r) => Math.max(max, totalComp(r.data[tier].Staff).p90), 0),
    [sorted, tier],
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Tier toggle */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Company tier">
        {TIER_ORDER.map((t) => {
          const active = t === tier;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setTier(t)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-mono transition-colors ${
                active
                  ? 'border-[var(--color-accent)] text-[var(--color-fg)]'
                  : 'border-[var(--color-border)] text-[var(--color-muted-2)] hover:text-[var(--color-muted)]'
              }`}
            >
              {TIER_LABELS[t]}
            </button>
          );
        })}
      </div>

      {/* Ranked bars — one per archetype, labelled by role name, shared x-axis */}
      <div className="flex flex-col gap-5">
        {sorted.map((row, i) => (
          <div key={row.id} className="grid grid-cols-[1.5rem_1fr] gap-3 items-start">
            <span className="font-mono text-[13px] tabular-nums text-[var(--color-muted-2)] pt-0.5">
              {i + 1}
            </span>
            <CompRangeBar
              tier={tier}
              label={row.name}
              data={row.data[tier].Staff}
              maxValue={maxValue}
            />
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-[var(--color-muted-2)]">
        Staff level · {TIER_LABELS[tier]} · total comp (base + bonus + annualized equity) · P25–P75
        band, P50 median · axis to {formatUSD(maxValue)}
      </p>
    </div>
  );
}
