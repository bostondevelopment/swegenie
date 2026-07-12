// Barrel export for the comp-visualization component library.
// Import site: `import { TierCompChart, type ArchetypeCompData } from '@/components/comp';`

export { CompRangeBar } from './CompRangeBar';
export { TierCompChart } from './TierCompChart';
export { EquityTwoLane } from './EquityTwoLane';
export { EquityCallout } from './EquityCallout';
export { CompSection } from './CompSection';
export { StaffCrossTable, type StaffCrossRow } from './StaffCrossTable';

export {
  TIER_ORDER,
  TIER_LABELS,
  LEVELS,
  STARTUP_TIERS,
  isStartupTier,
  sumBands,
  totalComp,
  guaranteedComp,
  formatUSD,
} from './comp.utils';

export type {
  Tier,
  Level,
  Confidence,
  EquityType,
  PercentileBand,
  EquityBand,
  CompCell,
  TierData,
  ArchetypeCompData,
  CompByTierData,
} from './comp.types';
