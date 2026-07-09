import { describe, it, expect } from "vitest";
import { rankArchetypes, scoreArchetype, fitPercent } from "./scoring";
import { archetypeById } from "./taxonomy";

/**
 * Fixtures reused verbatim from docs/research/validation-v1.md's Phase 2
 * synthetic persona validation. 9 of 10 personas are asserted to rank the
 * expected archetype #1; the "Backend IC" persona's documented miss (see
 * validation-v1.md Finding 1) is asserted to reproduce the exact same
 * documented outcome, not silently "fixed" by adjusting the algorithm.
 */
const personas: Array<{
  name: string;
  profile: Record<string, number>;
  expectedTop: string;
}> = [
  {
    name: "10-Year Backend IC Who Hates Meetings",
    profile: {
      ambiguity_tolerance: 3, interrupt_tolerance: 1, oncall_incident_appetite: 3, debugging_diagnostic_depth: 5,
      systems_design_scale: 5, technical_breadth_depth: 2, outcome_accountability: 3, stakeholder_client_comfort: 1,
      teaching_enjoyment: 1, account_relationship_ownership: 1, variable_comp_appetite: 1, coding_intensity: 5,
      travel_embed_willingness: 1, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 1,
    },
    expectedTop: "mobile-engineer", // documented Finding 1 miss, not platform/sre/data
  },
  {
    name: "Bootcamp Grad Who Loves Demos and People",
    profile: {
      ambiguity_tolerance: 3, interrupt_tolerance: 3, oncall_incident_appetite: 1, debugging_diagnostic_depth: 2,
      systems_design_scale: 1, technical_breadth_depth: 3, outcome_accountability: 3, stakeholder_client_comfort: 5,
      teaching_enjoyment: 3, account_relationship_ownership: 2, variable_comp_appetite: 4, coding_intensity: 2,
      travel_embed_willingness: 3, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 2,
    },
    expectedTop: "sales-engineer-pre-sales",
  },
  {
    name: "Public-Speaking Teacher Who Hates Sales Pressure",
    profile: {
      ambiguity_tolerance: 4, interrupt_tolerance: 2, oncall_incident_appetite: 1, debugging_diagnostic_depth: 2,
      systems_design_scale: 1, technical_breadth_depth: 3, outcome_accountability: 2, stakeholder_client_comfort: 3,
      teaching_enjoyment: 5, account_relationship_ownership: 1, variable_comp_appetite: 1, coding_intensity: 2,
      travel_embed_willingness: 3, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 2,
    },
    expectedTop: "developer-relations-advocacy",
  },
  {
    name: "Hardware Tinkerer Who Loves Debugging Physical Systems",
    profile: {
      ambiguity_tolerance: 3, interrupt_tolerance: 2, oncall_incident_appetite: 4, debugging_diagnostic_depth: 5,
      systems_design_scale: 2, technical_breadth_depth: 4, outcome_accountability: 4, stakeholder_client_comfort: 2,
      teaching_enjoyment: 1, account_relationship_ownership: 1, variable_comp_appetite: 1, coding_intensity: 4,
      travel_embed_willingness: 3, adversarial_threat_modeling: 2, physical_constraint_engineering: 5, people_management_orientation: 2,
    },
    expectedTop: "embedded-iot-engineer",
  },
  {
    name: "Wants Clear Tickets, Fast Resolution, Hates Ambiguity",
    profile: {
      ambiguity_tolerance: 2, interrupt_tolerance: 5, oncall_incident_appetite: 4, debugging_diagnostic_depth: 4,
      systems_design_scale: 2, technical_breadth_depth: 3, outcome_accountability: 3, stakeholder_client_comfort: 3,
      teaching_enjoyment: 2, account_relationship_ownership: 1, variable_comp_appetite: 1, coding_intensity: 3,
      travel_embed_willingness: 1, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 1,
    },
    expectedTop: "customer-support-engineer",
  },
  {
    name: "Loves Developing People, Willing to Give Up Coding Entirely",
    profile: {
      ambiguity_tolerance: 3, interrupt_tolerance: 4, oncall_incident_appetite: 2, debugging_diagnostic_depth: 1,
      systems_design_scale: 2, technical_breadth_depth: 2, outcome_accountability: 4, stakeholder_client_comfort: 3,
      teaching_enjoyment: 2, account_relationship_ownership: 2, variable_comp_appetite: 1, coding_intensity: 1,
      travel_embed_willingness: 1, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 5,
    },
    expectedTop: "engineering-management",
  },
  {
    name: "Embeds Deeply With One Client, Codes Constantly, No Sales Quota",
    profile: {
      ambiguity_tolerance: 4, interrupt_tolerance: 3, oncall_incident_appetite: 2, debugging_diagnostic_depth: 3,
      systems_design_scale: 3, technical_breadth_depth: 4, outcome_accountability: 5, stakeholder_client_comfort: 4,
      teaching_enjoyment: 2, account_relationship_ownership: 5, variable_comp_appetite: 1, coding_intensity: 5,
      travel_embed_willingness: 4, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 2,
    },
    expectedTop: "forward-deployed-engineer",
  },
  {
    name: "Wants Commission Upside, Loves Improvising Live Demos",
    profile: {
      ambiguity_tolerance: 3, interrupt_tolerance: 3, oncall_incident_appetite: 1, debugging_diagnostic_depth: 3,
      systems_design_scale: 2, technical_breadth_depth: 3, outcome_accountability: 3, stakeholder_client_comfort: 4,
      teaching_enjoyment: 2, account_relationship_ownership: 2, variable_comp_appetite: 5, coding_intensity: 2,
      travel_embed_willingness: 3, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 2,
    },
    expectedTop: "sales-engineer-pre-sales",
  },
  {
    name: "Adversarial Thinker Who Wants to Be the Security Gatekeeper",
    profile: {
      ambiguity_tolerance: 4, interrupt_tolerance: 3, oncall_incident_appetite: 4, debugging_diagnostic_depth: 4,
      systems_design_scale: 3, technical_breadth_depth: 3, outcome_accountability: 4, stakeholder_client_comfort: 4,
      teaching_enjoyment: 2, account_relationship_ownership: 1, variable_comp_appetite: 1, coding_intensity: 4,
      travel_embed_willingness: 1, adversarial_threat_modeling: 5, physical_constraint_engineering: 1, people_management_orientation: 2,
    },
    expectedTop: "security-engineer",
  },
  {
    name: "Broad-Platform Consultant, Prefers Utilization Billing, Moderate Travel",
    profile: {
      ambiguity_tolerance: 3, interrupt_tolerance: 3, oncall_incident_appetite: 1, debugging_diagnostic_depth: 2,
      systems_design_scale: 4, technical_breadth_depth: 4, outcome_accountability: 2, stakeholder_client_comfort: 4,
      teaching_enjoyment: 2, account_relationship_ownership: 2, variable_comp_appetite: 2, coding_intensity: 2,
      travel_embed_willingness: 3, adversarial_threat_modeling: 1, physical_constraint_engineering: 1, people_management_orientation: 2,
    },
    expectedTop: "solutions-architect-consulting",
  },
];

describe("rankArchetypes against Phase 2 synthetic personas", () => {
  for (const persona of personas) {
    it(`ranks "${persona.name}" -> ${persona.expectedTop} #1`, () => {
      const ranked = rankArchetypes(persona.profile);
      expect(ranked[0].id).toBe(persona.expectedTop);
    });
  }

  it("DevRel's top contributor for the teacher persona is teaching_enjoyment", () => {
    const persona = personas.find((p) => p.expectedTop === "developer-relations-advocacy")!;
    const ranked = rankArchetypes(persona.profile);
    expect(ranked[0].topContributors[0].dimension).toBe("teaching_enjoyment");
  });

  it("Security's top contributor is adversarial_threat_modeling", () => {
    const persona = personas.find((p) => p.expectedTop === "security-engineer")!;
    const ranked = rankArchetypes(persona.profile);
    expect(ranked[0].topContributors[0].dimension).toBe("adversarial_threat_modeling");
  });
});

describe("scoreArchetype arithmetic", () => {
  it("returns fitScore of 1.0 for a perfect match on every weighted dimension", () => {
    const archetype = archetypeById.get("developer-relations-advocacy")!;
    const perfectProfile: Record<string, number> = {};
    for (const [dim, s] of Object.entries(archetype.scores)) {
      perfectProfile[dim] = s.target;
    }
    const result = scoreArchetype(perfectProfile, archetype);
    expect(result).not.toBeNull();
    expect(result!.fitScore).toBeCloseTo(1.0, 5);
    expect(fitPercent(result!.fitScore)).toBe(100);
  });

  it("excludes skipped (null) dimensions from the weighted average, not defaulting them", () => {
    const archetype = archetypeById.get("security-engineer")!;
    const full: Record<string, number> = {};
    for (const [dim, s] of Object.entries(archetype.scores)) full[dim] = s.target;
    const withGaps = { ...full, adversarial_threat_modeling: null } as Record<string, number | null>;

    const fullResult = scoreArchetype(full, archetype)!;
    const partialResult = scoreArchetype(withGaps, archetype)!;

    // Both should still be a perfect fit on whatever was answered.
    expect(fullResult.fitScore).toBeCloseTo(1.0, 5);
    expect(partialResult.fitScore).toBeCloseTo(1.0, 5);
    // But the partial one has one fewer contributing dimension.
    expect(partialResult.topContributors.some((c) => c.dimension === "adversarial_threat_modeling")).toBe(false);
  });

  it("returns null when totalWeight is 0 (every answered dimension has zero weight in this archetype)", () => {
    const archetype = archetypeById.get("security-engineer")!;
    const zeroWeightDims = Object.entries(archetype.scores).filter(([, s]) => s.weight === 0);
    if (zeroWeightDims.length === 0) return; // no zero-weight dims in this archetype; skip
    const profile: Record<string, number> = {};
    for (const [dim, s] of zeroWeightDims) profile[dim] = s.target;
    expect(scoreArchetype(profile, archetype)).toBeNull();
  });

  it("growth-area gaps only surface above the 0.15 floor", () => {
    const archetype = archetypeById.get("security-engineer")!;
    // Max mismatch (distance 4) on the highest-weight dimension.
    const profile: Record<string, number> = {};
    for (const [dim, s] of Object.entries(archetype.scores)) profile[dim] = s.target;
    profile.adversarial_threat_modeling = profile.adversarial_threat_modeling === 5 ? 1 : 5;
    const result = scoreArchetype(profile, archetype)!;
    expect(result.topGaps.length).toBeGreaterThan(0);
    expect(result.topGaps[0].dimension).toBe("adversarial_threat_modeling");
    expect(result.topGaps.every((g) => g.gap > 0.15)).toBe(true);
  });
});
