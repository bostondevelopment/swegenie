import { NextRequest, NextResponse } from "next/server";

/**
 * Funnel event sink. v1 stub: logs server-side only (no persistence, no third-party
 * analytics service is wired up — see lib/analytics.ts for why). Deliberately does not
 * store IP, user agent, or any identifier — event name + optional small data payload only.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (typeof body?.event === "string") {
      console.log(`[funnel] ${body.event}`, body.data ?? {});
    }
  } catch {
    // Never fail the request over a malformed beacon payload.
  }
  return NextResponse.json({ ok: true });
}
