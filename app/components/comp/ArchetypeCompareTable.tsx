'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { FitBar } from '@/components/FitBar';
import { track } from '@/lib/analytics';
import type { ArchetypeCompData, Level, Tier } from './comp.types';
import { LEVEL_YOE_LABELS, LEVELS, TIER_LABELS, TIER_ORDER, formatUSD, totalComp } from './comp.utils';
import { CompRangeBar } from './CompRangeBar';

export interface ArchetypeCompareRow {
  id: string;
  name: string;
  data: ArchetypeCompData;
  /** Optional assessment-fit percentage, rendered as a small bar under the comp bar. */
  fitPercent?: number;
  /** Optional link target — when set, the whole row becomes clickable. */
  href?: string;
}

export const DEFAULT_MAX_SELECTED = 5;
export const MIN_SELECTED_FOR_COMPARE = 2;

interface ArchetypeCompareTableProps {
  rows: ArchetypeCompareRow[];
  defaultTier?: Tier;
  defaultLevel?: Level;
  /** Controlled tier — when set, the table stops managing tier state itself. */
  tier?: Tier;
  /** Controlled level — when set, the table stops managing level state itself. */
  level?: Level;
  onTierChange?: (tier: Tier) => void;
  onLevelChange?: (level: Level) => void;
  /** Renders a per-row checkbox letting the reader build a comparison set. */
  selectable?: boolean;
  /** Controlled selection — when set (with `selectable`), the table stops managing it itself. */
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  /** Upper bound on simultaneous selection. Defaults to 5. */
  maxSelected?: number;
}

// Ranks every archetype's total comp at a chosen company tier and level, highest
// first. Both axes are adjustable — a tier chip toggle and a level tab strip —
// and the ranking re-sorts live against either one. All bars share one x-axis
// (largest P90 at the tier+level) so widths are directly comparable — this is
// the "which role pays most" answer no single-archetype page can give on its own.
export function ArchetypeCompareTable({
  rows,
  defaultTier = 'faang-mag7',
  defaultLevel = 'L3',
  tier: tierProp,
  level: levelProp,
  onTierChange,
  onLevelChange,
  selectable = false,
  selectedIds: selectedIdsProp,
  onSelectionChange,
  maxSelected = DEFAULT_MAX_SELECTED,
}: ArchetypeCompareTableProps) {
  const [internalTier, setInternalTier] = useState<Tier>(defaultTier);
  const [internalLevel, setInternalLevel] = useState<Level>(defaultLevel);
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tier = tierProp ?? internalTier;
  const level = levelProp ?? internalLevel;
  const selectedIds = selectedIdsProp ?? internalSelectedIds;

  function setTier(next: Tier) {
    if (tierProp === undefined) setInternalTier(next);
    onTierChange?.(next);
    track('compare_tier_change', { tier: next });
  }

  function setLevel(next: Level) {
    if (levelProp === undefined) setInternalLevel(next);
    onLevelChange?.(next);
    track('compare_level_change', { level: next });
  }

  function toggleSelected(id: string) {
    const isSelected = selectedIds.includes(id);
    const next = isSelected
      ? selectedIds.filter((x) => x !== id)
      : selectedIds.length < maxSelected
        ? [...selectedIds, id]
        : selectedIds;
    if (next === selectedIds) return;
    if (selectedIdsProp === undefined) setInternalSelectedIds(next);
    onSelectionChange?.(next);
    track('compare_toggle_archetype', {
      archetype_id: id,
      action: isSelected ? 'remove' : 'add',
      selected_count: next.length,
    });
  }

  const sorted = useMemo(
    () =>
      [...rows].sort(
        (a, b) => totalComp(b.data[tier][level]).p50 - totalComp(a.data[tier][level]).p50,
      ),
    [rows, tier, level],
  );

  const maxValue = useMemo(
    () => sorted.reduce((max, r) => Math.max(max, totalComp(r.data[tier][level]).p90), 0),
    [sorted, tier, level],
  );

  // Roving-tabindex arrow-key navigation for the level tablist.
  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (index + dir + LEVELS.length) % LEVELS.length;
    setLevel(LEVELS[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Level selector */}
      <div
        role="tablist"
        aria-label="Career level"
        className="flex gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 self-start"
      >
        {LEVELS.map((lvl, i) => {
          const selected = lvl === level;
          return (
            <button
              key={lvl}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setLevel(lvl)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                selected
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
              }`}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>{lvl}</span>
                <span className="text-[10px] font-normal opacity-70">{LEVEL_YOE_LABELS[lvl]}</span>
              </span>
            </button>
          );
        })}
      </div>

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

      {/* Selection helper — states the limit plainly, no selector duplicated elsewhere.
          Styled as a callout (not a muted caption) since the checkbox affordance
          below it is easy to miss otherwise. */}
      {selectable && (
        <div className="flex items-center gap-2.5 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] px-4 py-3">
          <span aria-hidden className="text-[var(--color-accent)]">
            +
          </span>
          <p className="text-[14px] font-medium text-[var(--color-fg)]">
            {selectedIds.length === 0
              ? `Check any ${maxSelected} roles below to compare them side by side.`
              : selectedIds.length === 1
                ? 'Check 1 more role to compare it side by side.'
                : selectedIds.length < maxSelected
                  ? `${selectedIds.length} selected — comparison is below the list. Check up to ${maxSelected} at a time.`
                  : `${maxSelected} selected — that's the most you can compare at once. See the comparison below.`}
          </p>
        </div>
      )}

      {/* Ranked bars — one per archetype, labelled by role name, shared x-axis */}
      <div className="flex flex-col gap-5">
        {sorted.map((row, i) => {
          const isSelected = selectedIds.includes(row.id);
          const selectionDisabled = selectable && !isSelected && selectedIds.length >= maxSelected;

          const rowContent = (
            <div className="grid grid-cols-[1.25rem_1fr] sm:grid-cols-[1.5rem_1fr] gap-2 sm:gap-3 items-start">
              <span className="font-mono text-[12px] sm:text-[13px] tabular-nums text-[var(--color-muted-2)] pt-0.5">
                {i + 1}
              </span>
              {/* min-w-0 lets this grid track shrink below its content's natural
                  width — without it, CompRangeBar's label+value row can't
                  truncate and the whole row overflows on narrow screens. */}
              <div className="flex min-w-0 flex-col gap-2">
                <CompRangeBar
                  tier={tier}
                  label={row.name}
                  data={row.data[tier][level]}
                  maxValue={maxValue}
                />
                {row.fitPercent !== undefined && (
                  <div className="flex items-center gap-2 max-w-[220px]">
                    <span className="shrink-0 font-mono text-[11px] text-[var(--color-muted-2)]">
                      fit
                    </span>
                    <FitBar percent={row.fitPercent} size="sm" />
                  </div>
                )}
              </div>
            </div>
          );

          const linkedContent = row.href ? (
            <Link
              href={row.href}
              className="-mx-2 block rounded-lg px-2 py-1 transition-colors hover:bg-[var(--color-fg)]/[0.03]"
            >
              {rowContent}
            </Link>
          ) : (
            <div>{rowContent}</div>
          );

          return (
            <div
              key={row.id}
              className={`flex items-start gap-2 sm:gap-3 rounded-lg px-2 py-1.5 -mx-2 transition-colors ${
                isSelected ? 'bg-[var(--color-accent)]/[0.07]' : ''
              }`}
            >
              {selectable && (
                <label
                  className={`mt-0.5 flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border w-7 h-7 justify-center sm:w-auto sm:h-auto sm:justify-start sm:px-2.5 sm:py-1 text-[11px] font-medium transition-colors ${
                    isSelected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                      : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]'
                  } ${selectionDisabled ? 'cursor-not-allowed opacity-40 hover:border-[var(--color-border)] hover:text-[var(--color-muted)]' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={selectionDisabled}
                    onChange={() => toggleSelected(row.id)}
                    aria-label={`Compare ${row.name}`}
                    className="sr-only"
                  />
                  <span aria-hidden>{isSelected ? '✓' : '+'}</span>
                  <span className="hidden sm:inline">{isSelected ? 'Comparing' : 'Compare'}</span>
                </label>
              )}
              <div className="min-w-0 flex-1">{linkedContent}</div>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[11px] text-[var(--color-muted-2)]">
        {level} ({LEVEL_YOE_LABELS[level]}) · {TIER_LABELS[tier]} · total comp (base + bonus + annualized equity) · P25–P75
        band, P50 median · axis to {formatUSD(maxValue)}
      </p>
    </div>
  );
}
