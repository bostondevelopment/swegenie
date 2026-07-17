/**
 * Minimal funnel analytics: land -> start -> complete -> share. Forwards each
 * event to Google Analytics (gtag.js, loaded in app/layout.tsx) — no server
 * of our own to receive events, which fits static export on GitHub Pages.
 */
export type FunnelEvent =
  | "land"
  | "assessment_start"
  | "assessment_step"
  | "assessment_skip"
  | "assessment_complete"
  | "result_share"
  | "compare_toggle_archetype"
  | "compare_level_change"
  | "compare_tier_change"
  | "persona_click"
  | "job_examples_open"
  | "rate_role_submit"
  | "beta_survey_submit";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: FunnelEvent, data?: Record<string, string | number>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, data);
}
