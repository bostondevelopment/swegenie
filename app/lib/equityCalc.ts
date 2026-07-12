// Equity callout engine — pure functions that turn a startup equity grant into
// the "what would this need to exit at to match a FAANG RSU?" reality check.
//
// No React, no side effects. Everything here is deterministic and unit-tested
// (see equityCalc.test.ts). The component layer (EquityCallout.tsx) only formats
// the numbers this module produces.

export interface EquityCalloutInput {
  grantPct: number; // e.g. 0.001 (0.1% of company, fully diluted)
  currentValuation: number; // last round post-money, USD
  dilutionAssumption: number; // e.g. 0.25 (25% dilution before exit)
  vestingYears: number; // typically 4
  faangRSUComparator: number; // annualized RSU value at FAANG tier/same level, USD
  /**
   * Optional level label (e.g. "L4") purely for the human-readable assumptions
   * line. Not part of the math; omitted → the assumption drops the level.
   */
  faangLevel?: string;
}

export interface ScenarioResult {
  exitValuation: number;
  yourAnnualizedValue: number;
  vsRSUPct: number; // yourAnnualizedValue / faangRSUComparator, as a percentage
}

export interface EquityCalloutOutput {
  breakEvenExitValuation: number;
  currentMultipleRequired: number;
  scenarios: {
    bear: ScenarioResult; // 1x current valuation
    base: ScenarioResult; // 3x current valuation
    bull: ScenarioResult; // 10x current valuation
  };
  assumptions: string[]; // human-readable, shown in the UI
}

// Annualized paper value of the grant at a given exit valuation, net of the
// modeled dilution and spread over the vesting period.
function annualizedValueAt(exitValuation: number, input: EquityCalloutInput): number {
  const { grantPct, dilutionAssumption, vestingYears } = input;
  if (vestingYears <= 0) return 0;
  return (grantPct * exitValuation * (1 - dilutionAssumption)) / vestingYears;
}

// Percentage of the FAANG RSU comparator a given annualized value represents.
// A zero comparator can't be matched — treat it as 0% rather than dividing by 0.
function vsRSU(annualizedValue: number, comparator: number): number {
  if (comparator <= 0) return 0;
  return (annualizedValue / comparator) * 100;
}

function scenarioAt(multiple: number, input: EquityCalloutInput): ScenarioResult {
  const exitValuation = input.currentValuation * multiple;
  const yourAnnualizedValue = annualizedValueAt(exitValuation, input);
  return {
    exitValuation,
    yourAnnualizedValue,
    vsRSUPct: vsRSU(yourAnnualizedValue, input.faangRSUComparator),
  };
}

// Round a fully-diluted fraction to a readable percentage (e.g. 0.001 -> "0.1").
// Trims trailing zeros so 0.05% reads as "0.05" not "0.0500".
function pctLabel(fraction: number): string {
  const pct = fraction * 100;
  // Up to 4 decimals covers grants down to a single basis point; trim zeros.
  return parseFloat(pct.toFixed(4)).toString();
}

function millionsLabel(usd: number): string {
  return parseFloat((usd / 1_000_000).toFixed(1)).toString();
}

function kLabel(usd: number): string {
  return Math.round(usd / 1000).toString();
}

export function calcRequiredExit(input: EquityCalloutInput): EquityCalloutOutput {
  const { grantPct, currentValuation, dilutionAssumption, vestingYears, faangRSUComparator, faangLevel } =
    input;

  // Exit valuation at which the grant's annualized value equals the FAANG RSU
  // comparator. If the grant can never pay out (zero grant, full dilution, or a
  // non-positive vesting period), there is no finite break-even -> Infinity.
  const payoutDenominator = grantPct * (1 - dilutionAssumption);
  const breakEvenExitValuation =
    payoutDenominator > 0 && vestingYears > 0
      ? (faangRSUComparator * vestingYears) / payoutDenominator
      : Infinity;

  const currentMultipleRequired =
    currentValuation > 0 ? breakEvenExitValuation / currentValuation : Infinity;

  const scenarios = {
    bear: scenarioAt(1, input),
    base: scenarioAt(3, input),
    bull: scenarioAt(10, input),
  };

  const faangComparatorLine = faangLevel
    ? `Compared to FAANG ${faangLevel} RSU: $${kLabel(faangRSUComparator)}k/yr annualized`
    : `Compared to FAANG RSU: $${kLabel(faangRSUComparator)}k/yr annualized`;

  const assumptions = [
    `Grant: ${pctLabel(grantPct)}% fully diluted shares`,
    `Current valuation: $${millionsLabel(currentValuation)}m post-money`,
    `Dilution before exit: ${pctLabel(dilutionAssumption)}%`,
    `Vesting: ${vestingYears} years (no cliff modeled)`,
    faangComparatorLine,
  ];

  return {
    breakEvenExitValuation,
    currentMultipleRequired,
    scenarios,
    assumptions,
  };
}
