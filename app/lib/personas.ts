/**
 * One persona per archetype (18 total), authored by reverse-mapping each
 * archetype's own target profile (taxonomy/archetypes.json) onto real
 * question-level answers (taxonomy/questions.json) -- not hand-picked
 * dimension values. This exercises the *actual* aggregateAnswersToProfile
 * pipeline a real user's answers go through, not just the scoring math in
 * isolation (the existing Phase 2 personas in scoring.test.ts skip that
 * layer entirely, which is exactly why they didn't catch the duplicate-
 * question-id bug or the slider-default bug found this session).
 *
 * Derivation method: for each dimension, pick the question option(s) whose
 * average lands as close as possible to that archetype's own target for
 * that dimension. Most land exactly on target (1/3/5 anchors average
 * cleanly, and slider questions can hit any value directly). A few
 * low-weight (<=0.4) domain-fluency/adversarial dimensions can't be hit
 * exactly when the target is 2 or 4 and the dimension has only one
 * {1,3,5}-anchored question -- see docs/research/persona-suite-v1.md for
 * the full list and why this residual imprecision doesn't matter (it never
 * lands on a dimension that's actually load-bearing for that archetype).
 *
 * Regenerate with the script documented in persona-suite-v1.md if
 * taxonomy/archetypes.json or taxonomy/questions.json change structurally.
 */

export interface Persona {
  id: string;
  personaName: string;
  targetArchetypeId: string;
  narrative: string;
  answers: Record<string, number>;
}

export const personas: Persona[] = [
  {
    id: "product-full-stack-software-engineer",
    personaName: "The Platonic Product Engineer",
    targetArchetypeId: "product-full-stack-software-engineer",
    narrative: "Generalist IC who ships features across the stack, wants moderate ownership and moderate ambiguity, and explicitly does not want to manage people or live in front of clients.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":3,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":3,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "platform-infrastructure-engineer",
    personaName: "The Platform Builder",
    targetArchetypeId: "platform-infrastructure-engineer",
    narrative: "Builds the internal tooling and cloud infrastructure other engineers depend on; high systems-design orientation, genuine cloud/infra hands-on depth, low client-facing need.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":3,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":5,"q_systems_design_2":5,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":5,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "sre-production-engineer",
    personaName: "The On-Call Owner",
    targetArchetypeId: "sre-production-engineer",
    narrative: "Lives for production reliability and incident response, high on-call appetite, SLO-driven, low interest in sales/teaching/public visibility.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":5,"q_oncall_1":5,"q_oncall_2":5,"q_debugging_1":5,"q_debugging_2":5,"q_systems_design_1":3,"q_systems_design_2":5,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":5,"q_outcome_2":5,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":3,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "data-engineer",
    personaName: "The Pipeline Builder",
    targetArchetypeId: "data-engineer",
    narrative: "Builds and operates data pipelines and warehouses feeding analytics/ML, real hands-on data-infrastructure depth, moderate systems-design scope, low client-facing need.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":5,"q_oncall_1":3,"q_oncall_2":5,"q_debugging_1":3,"q_debugging_2":5,"q_systems_design_1":3,"q_systems_design_2":5,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":3,"q_mobile_fluency_1":1,"q_data_fluency_1":5,"q_cloud_fluency_1":3,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "ml-engineer",
    personaName: "The Production ML Engineer",
    targetArchetypeId: "ml-engineer",
    narrative: "Ships production ML systems end-to-end (pipelines, APIs, monitoring), genuine hands-on ML experience, high ambiguity tolerance and outcome accountability, not a researcher.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":3,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":5,"q_systems_design_1":3,"q_systems_design_2":5,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":5,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":5,"q_mobile_fluency_1":1,"q_data_fluency_1":3,"q_cloud_fluency_1":3,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "mobile-engineer",
    personaName: "The Mobile App Builder",
    targetArchetypeId: "mobile-engineer",
    narrative: "Builds native or cross-platform mobile apps with real hands-on mobile-platform depth; otherwise a fairly standard IC profile, low client-facing and low management orientation.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":1,"q_interrupt_2":3,"q_oncall_1":3,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":1,"q_systems_design_2":3,"q_breadth_1":2,"q_breadth_2":2,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":1,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":1,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":1,"q_continuity_1":1,"q_continuity_2":1,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":5,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":3,"q_physical_1":3,"q_ml_fluency_1":1,"q_mobile_fluency_1":5,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "embedded-iot-engineer",
    personaName: "The Firmware Engineer",
    targetArchetypeId: "embedded-iot-engineer",
    narrative: "Works at the hardware/software boundary with hard physical constraints as a daily reality (power, memory, real-time deadlines), low ambiguity tolerance, low client-facing need.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":1,"q_interrupt_2":3,"q_oncall_1":3,"q_oncall_2":5,"q_debugging_1":5,"q_debugging_2":5,"q_systems_design_1":1,"q_systems_design_2":3,"q_breadth_1":4,"q_breadth_2":4,"q_outcome_1":3,"q_outcome_2":5,"q_stakeholder_1":1,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":1,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":1,"q_continuity_1":1,"q_continuity_2":1,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":3,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":3,"q_adversarial_3":3,"q_physical_2":5,"q_physical_1":5,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "security-engineer",
    personaName: "The Security Gatekeeper",
    targetArchetypeId: "security-engineer",
    narrative: "Adversarial thinking is a default lens on every system, not an occasional checklist item; has actually sought out security-focused work, moderate-high on-call appetite.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":3,"q_oncall_2":5,"q_debugging_1":3,"q_debugging_2":5,"q_systems_design_1":3,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":5,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":1,"q_continuity_1":1,"q_continuity_2":1,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":5,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":5,"q_adversarial_2":5,"q_adversarial_3":5,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "sales-engineer-pre-sales",
    personaName: "The Technical Seller",
    targetArchetypeId: "sales-engineer-pre-sales",
    narrative: "Runs live discovery and POCs, genuinely energized by high-stakes client rooms, wants variable/commission-linked comp, low interest in deep hands-on-keyboard coding.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":1,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":1,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":5,"q_account_breadth_2":5,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":5,"q_variable_comp_2":5,"q_coding_1":1,"q_coding_2":3,"q_travel_2":3,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "solutions-architect-vendor-side",
    personaName: "The Vendor-Side Architect",
    targetArchetypeId: "solutions-architect-vendor-side",
    narrative: "Deep single-product-stack technical advisor, comfortable with client/exec rooms, some variable comp appetite, moderate coding intensity — designs more than it ships.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":1,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":3,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":3,"q_account_breadth_2":5,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":3,"q_variable_comp_2":5,"q_coding_1":1,"q_coding_2":3,"q_travel_2":3,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "solutions-architect-consulting",
    personaName: "The Consulting Architect",
    targetArchetypeId: "solutions-architect-consulting",
    narrative: "Multi-platform technical architect spanning bid work through delivery oversight across many concurrent client engagements, broad technical breadth over narrow depth, low people-management pull.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":1,"q_debugging_1":1,"q_debugging_2":3,"q_systems_design_1":3,"q_systems_design_2":5,"q_breadth_1":4,"q_breadth_2":4,"q_outcome_1":1,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":5,"q_account_breadth_2":5,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":3,"q_coding_1":1,"q_coding_2":3,"q_travel_2":3,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "forward-deployed-engineer",
    personaName: "The Embedded Builder",
    targetArchetypeId: "forward-deployed-engineer",
    narrative: "Embeds long-term with one strategic account and personally ships production code into their environment — coding is 70-90% of the week, no sales quota, high travel/embed willingness.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":3,"q_systems_design_2":3,"q_breadth_1":4,"q_breadth_2":4,"q_outcome_1":5,"q_outcome_2":5,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":5,"q_continuity_2":5,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":5,"q_coding_2":5,"q_travel_2":3,"q_travel_1":5,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "customer-support-engineer",
    personaName: "The Ticket-Queue Debugger",
    targetArchetypeId: "customer-support-engineer",
    narrative: "Thrives on fast, interrupt-driven ticket resolution with crisp SLA targets; low ambiguity tolerance and low interest in open-ended architecture work, high debugging speed.",
    answers: {"q_ambiguity_1":1,"q_ambiguity_2":3,"q_interrupt_1":5,"q_interrupt_2":5,"q_oncall_1":3,"q_oncall_2":5,"q_debugging_1":3,"q_debugging_2":5,"q_systems_design_1":1,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":5,"q_account_breadth_2":5,"q_continuity_1":1,"q_continuity_2":1,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":3,"q_coding_2":3,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":1},
  },
  {
    id: "customer-support-solutions-engineer",
    personaName: "The Named-Account Owner",
    targetArchetypeId: "customer-support-solutions-engineer",
    narrative: "Owns a book of accounts on a scheduled cadence (QBRs, check-ins), wants one persistent long-term relationship over ticket-queue variety, genuinely enjoys teaching without wanting a public stage.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":1,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":1,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":3,"q_teaching_2":5,"q_public_visibility_1":1,"q_account_breadth_1":3,"q_account_breadth_2":5,"q_continuity_1":5,"q_continuity_2":5,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":1,"q_coding_2":3,"q_travel_2":1,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":1},
  },
  {
    id: "consulting-engineer-professional-services",
    personaName: "The Delivery Consultant",
    targetArchetypeId: "consulting-engineer-professional-services",
    narrative: "Billable, SOW-scoped hands-on implementation and integration work across many client engagements; high coding intensity but implementation-led, not design-led like an architect.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":3,"q_debugging_1":3,"q_debugging_2":3,"q_systems_design_1":3,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":3,"q_account_breadth_2":5,"q_continuity_1":3,"q_continuity_2":3,"q_variable_comp_1":3,"q_variable_comp_2":5,"q_coding_1":3,"q_coding_2":3,"q_travel_2":3,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "developer-relations-advocacy",
    personaName: "The Public-Stage Teacher",
    targetArchetypeId: "developer-relations-advocacy",
    narrative: "Genuinely wants the public stage — conference talks, content, community — not just 1:1 explaining; no sales quota, high ambiguity tolerance, low structured account ownership.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":1,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":1,"q_debugging_1":1,"q_debugging_2":3,"q_systems_design_1":1,"q_systems_design_2":1,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":1,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":5,"q_teaching_2":5,"q_public_visibility_1":5,"q_account_breadth_1":1,"q_account_breadth_2":1,"q_continuity_1":1,"q_continuity_2":1,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":1,"q_coding_2":3,"q_travel_2":3,"q_travel_1":3,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":3},
  },
  {
    id: "engineering-management",
    personaName: "The People Manager",
    targetArchetypeId: "engineering-management",
    narrative: "Wants to be judged entirely on team retention, morale, and growth rather than personal technical output; willing to give up hands-on coding almost entirely.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":3,"q_interrupt_1":3,"q_interrupt_2":5,"q_oncall_1":1,"q_oncall_2":3,"q_debugging_1":1,"q_debugging_2":1,"q_systems_design_1":1,"q_systems_design_2":3,"q_breadth_1":2,"q_breadth_2":2,"q_outcome_1":3,"q_outcome_2":5,"q_stakeholder_1":3,"q_stakeholder_2":3,"q_teaching_1":1,"q_teaching_2":3,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":1,"q_coding_2":1,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":5,"q_people_mgmt_2":5},
  },
  {
    id: "technical-product-manager",
    personaName: "The Technical PM",
    targetArchetypeId: "technical-product-manager",
    narrative: "Owns roadmap and architecture trade-off calls for a technical/infrastructure product; reads code and sits in ambiguity comfortably, but doesn't ship production code personally.",
    answers: {"q_ambiguity_1":3,"q_ambiguity_2":5,"q_interrupt_1":3,"q_interrupt_2":3,"q_oncall_1":1,"q_oncall_2":1,"q_debugging_1":1,"q_debugging_2":3,"q_systems_design_1":3,"q_systems_design_2":3,"q_breadth_1":3,"q_breadth_2":3,"q_outcome_1":3,"q_outcome_2":3,"q_stakeholder_1":3,"q_stakeholder_2":5,"q_teaching_1":1,"q_teaching_2":1,"q_public_visibility_1":1,"q_account_breadth_1":1,"q_account_breadth_2":3,"q_continuity_1":1,"q_continuity_2":3,"q_variable_comp_1":1,"q_variable_comp_2":1,"q_coding_1":1,"q_coding_2":1,"q_travel_2":1,"q_travel_1":1,"q_adversarial_1":1,"q_adversarial_2":1,"q_adversarial_3":1,"q_physical_2":1,"q_physical_1":1,"q_ml_fluency_1":1,"q_mobile_fluency_1":1,"q_data_fluency_1":1,"q_cloud_fluency_1":1,"q_people_mgmt_1":1,"q_people_mgmt_2":1},
  },
];
