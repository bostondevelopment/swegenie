/**
 * Minimal, privacy-respecting funnel analytics: land -> start -> complete -> share,
 * per PLAN.md Phase 5. No third-party analytics SDK, no cookies, no client IDs, no
 * personal data — just an event name and a timestamp.
 *
 * v1 honesty note: this is a no-op. It previously posted to /api/events (a route
 * that only did a server console.log with no real persistence — not meaningfully
 * different from a no-op in production, since nobody can see serverless function
 * logs for a public site). That route was removed when the app moved to static
 * export for GitHub Pages hosting, which has no server to receive the POST at all.
 * Every call site below is already correctly instrumented — wiring a real
 * provider (e.g. a client-side snippet for Plausible/Umami, which need no server
 * of their own and work fine on static hosting) later is a one-line change inside
 * track(), not a call-site change.
 */
export type FunnelEvent = "land" | "assessment_start" | "assessment_complete" | "result_share";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- signature kept for call-site compatibility, see comment above
export function track(event: FunnelEvent, data?: Record<string, string | number>) {
  // Intentionally a no-op — see comment above.
}
