interface CompHeadlineProps {
  typical: number;
  sourceCompanyCount: number;
}

function formatK(dollars: number): string {
  return `$${Math.round(dollars / 1000)}K`;
}

/**
 * Sits directly above CompBandBar, which already labels low/high on the bar
 * itself — this only adds what the bar can't show: the typical value as a
 * plain number (the bar marks it with an unlabeled tick) and the company
 * count backing the estimate.
 */
export function CompHeadline({ typical, sourceCompanyCount }: CompHeadlineProps) {
  return (
    <p className="font-mono text-xs text-[var(--color-muted-2)] mb-4">
      Typical: <span className="text-[var(--color-fg)]">{formatK(typical)}</span> · based on real
      compensation data from {sourceCompanyCount} companies
    </p>
  );
}
