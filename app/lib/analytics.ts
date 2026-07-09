/**
 * Minimal, privacy-respecting funnel analytics: land -> start -> complete -> share,
 * per PLAN.md Phase 5. No third-party analytics SDK, no cookies, no client IDs, no
 * personal data — just an event name and a timestamp, posted to /api/events.
 *
 * v1 honesty note: /api/events currently just logs server-side (see that route's
 * comment) rather than persisting to a real analytics backend, since no analytics
 * service credentials (Plausible/PostHog/etc.) are available to this build. Every
 * call site below is already correctly instrumented — wiring a real provider later
 * is a one-line change inside track(), not a call-site change.
 */
export type FunnelEvent = "land" | "assessment_start" | "assessment_complete" | "result_share";

export function track(event: FunnelEvent, data?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  try {
    navigator.sendBeacon?.(
      "/api/events",
      new Blob([JSON.stringify({ event, data, t: Date.now() })], { type: "application/json" })
    );
  } catch {
    // Analytics must never break the product experience.
  }
}
