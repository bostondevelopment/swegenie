import { describe, it, expect } from "vitest";
import { calcRequiredExit, type EquityCalloutInput } from "./equityCalc";

// A canonical, hand-verified grant used as the base for most cases below.
const BASE: EquityCalloutInput = {
  grantPct: 0.001,
  currentValuation: 50_000_000,
  dilutionAssumption: 0.25,
  vestingYears: 4,
  faangRSUComparator: 180_000,
  faangLevel: "L4",
};

describe("calcRequiredExit", () => {
  it("zero dilution: annualized = grantPct * exit / vestingYears", () => {
    const out = calcRequiredExit({ ...BASE, dilutionAssumption: 0 });
    // Base scenario is 3x -> exit = 150M. Expected = 0.001 * 150M / 4 = 37,500.
    expect(out.scenarios.base.yourAnnualizedValue).toBeCloseTo(37_500, 6);
    // Bear (1x -> 50M): 0.001 * 50M / 4 = 12,500.
    expect(out.scenarios.bear.yourAnnualizedValue).toBeCloseTo(12_500, 6);
  });

  it("100% dilution: all scenario values are zero", () => {
    const out = calcRequiredExit({ ...BASE, dilutionAssumption: 1 });
    expect(out.scenarios.bear.yourAnnualizedValue).toBe(0);
    expect(out.scenarios.base.yourAnnualizedValue).toBe(0);
    expect(out.scenarios.bull.yourAnnualizedValue).toBe(0);
    // Full dilution means the grant never pays out -> no finite break-even.
    expect(out.breakEvenExitValuation).toBe(Infinity);
  });

  it("zero grant pct: all values zero, breakEven = Infinity", () => {
    const out = calcRequiredExit({ ...BASE, grantPct: 0 });
    expect(out.scenarios.bear.yourAnnualizedValue).toBe(0);
    expect(out.scenarios.base.yourAnnualizedValue).toBe(0);
    expect(out.scenarios.bull.yourAnnualizedValue).toBe(0);
    expect(out.breakEvenExitValuation).toBe(Infinity);
    expect(out.currentMultipleRequired).toBe(Infinity);
  });

  it("known verified case: breakEven=960M, multiple=19.2x, bear≈$9375/yr", () => {
    const out = calcRequiredExit(BASE);
    expect(out.breakEvenExitValuation).toBeCloseTo(960_000_000, 2);
    expect(out.currentMultipleRequired).toBeCloseTo(19.2, 6);
    // Bear = 1x current valuation (50M): 0.001 * 50M * 0.75 / 4 = 9,375.
    expect(out.scenarios.bear.yourAnnualizedValue).toBeCloseTo(9_375, 6);
    // Base = 3x (150M): 28,125. Bull = 10x (500M): 93,750.
    expect(out.scenarios.base.yourAnnualizedValue).toBeCloseTo(28_125, 6);
    expect(out.scenarios.bull.yourAnnualizedValue).toBeCloseTo(93_750, 6);
  });

  it("all scenario vsRSUPct values are non-negative", () => {
    const out = calcRequiredExit(BASE);
    for (const s of [out.scenarios.bear, out.scenarios.base, out.scenarios.bull]) {
      expect(s.vsRSUPct).toBeGreaterThanOrEqual(0);
    }
  });

  it("all scenario yourAnnualizedValue values are non-negative", () => {
    const out = calcRequiredExit(BASE);
    for (const s of [out.scenarios.bear, out.scenarios.base, out.scenarios.bull]) {
      expect(s.yourAnnualizedValue).toBeGreaterThanOrEqual(0);
    }
  });

  it("assumptions array is non-empty and reflects the inputs", () => {
    const out = calcRequiredExit(BASE);
    expect(out.assumptions.length).toBeGreaterThan(0);
    expect(out.assumptions[0]).toContain("0.1%");
    expect(out.assumptions.some((a) => a.includes("L4"))).toBe(true);
  });

  it("vsRSUPct is 0 when the FAANG comparator is 0 (no divide-by-zero)", () => {
    const out = calcRequiredExit({ ...BASE, faangRSUComparator: 0 });
    expect(out.scenarios.base.vsRSUPct).toBe(0);
    expect(Number.isNaN(out.scenarios.base.vsRSUPct)).toBe(false);
  });
});
