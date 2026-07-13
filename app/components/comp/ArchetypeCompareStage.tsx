'use client';

import { useMemo, useState } from 'react';
import type { Level, Tier } from './comp.types';
import { TIER_LABELS } from './comp.utils';
import {
  ArchetypeCompareTable,
  MIN_SELECTED_FOR_COMPARE,
  type ArchetypeCompareRow,
} from './ArchetypeCompareTable';
import { CompareSelectedArchetypes } from './CompareSelectedArchetypes';

interface ArchetypeCompareStageProps {
  rows: ArchetypeCompareRow[];
  defaultTier?: Tier;
  defaultLevel?: Level;
  /** archetypeId -> short day-in-the-role summary, for the selected-comparison table. */
  daySummaryByArchetype?: Record<string, string | undefined>;
  /** archetypeId -> top dimension names this archetype rewards, for the selected-comparison table. */
  keyQualitiesByArchetype?: Record<string, string[] | undefined>;
}

// Owns the tier/level/selection state that the ranked table and the "compare
// selected" columns both read from, so the two sections always agree on what
// they're showing without a second selector anywhere.
export function ArchetypeCompareStage({
  rows,
  defaultTier = 'faang-mag7',
  defaultLevel = 'Staff',
  daySummaryByArchetype = {},
  keyQualitiesByArchetype = {},
}: ArchetypeCompareStageProps) {
  const [tier, setTier] = useState<Tier>(defaultTier);
  const [level, setLevel] = useState<Level>(defaultLevel);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const rowsById = useMemo(() => new Map(rows.map((r) => [r.id, r])), [rows]);

  const selectedColumns = useMemo(
    () =>
      selectedIds
        .map((id) => rowsById.get(id))
        .filter((r): r is ArchetypeCompareRow => Boolean(r))
        .map((r) => ({
          id: r.id,
          name: r.name,
          data: r.data,
          href: r.href,
          daySummary: daySummaryByArchetype[r.id],
          keyQualities: keyQualitiesByArchetype[r.id],
        })),
    [selectedIds, rowsById, daySummaryByArchetype, keyQualitiesByArchetype],
  );

  return (
    <div className="flex flex-col gap-12">
      <ArchetypeCompareTable
        rows={rows}
        tier={tier}
        level={level}
        onTierChange={setTier}
        onLevelChange={setLevel}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />

      {selectedColumns.length >= MIN_SELECTED_FOR_COMPARE && (
        <div className="flex flex-col gap-3">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-[26px] font-extrabold tracking-tight">Compare selected</h2>
            <span className="font-mono text-[12px] uppercase tracking-wide text-[var(--color-muted-2)]">
              {level} · {TIER_LABELS[tier]}
            </span>
          </div>
          <p className="mb-3 max-w-2xl text-[15px] leading-[1.7] text-[var(--color-muted)]">
            Comp, mix, and role fit for each archetype you picked above, at the same level and
            tier, lined up for a direct comparison.
          </p>
          <CompareSelectedArchetypes columns={selectedColumns} tier={tier} level={level} />
        </div>
      )}
    </div>
  );
}
