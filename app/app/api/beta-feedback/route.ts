/**
 * POST /api/beta-feedback — Phase 6 pre-launch beta survey collector.
 *
 * Appends one submission from the results-page survey to
 * data/beta-feedback.jsonl. No DB, no auth, no email (per ADR-002/003 and the
 * task constraints) — a JSONL append is the whole pipeline.
 *
 * Runtime note: under the GitHub Pages static export (`output: "export"`) this
 * POST handler is silently excluded from the build and never runs — the survey's
 * fetch will 404 there and the client degrades gracefully. It runs for real when
 * the app is served by a Node server (`next dev`, or a server build with
 * `output: "export"` removed), which is how an instrumented beta is hosted.
 * See lib/feedback-store.ts.
 */
import { appendJsonl, BETA_FEEDBACK_PATH } from "@/lib/feedback-store";

const ROLE_IN_TOP3 = ["yes", "no", "exploring"] as const;
const WHY_SPECIFIC = ["very", "somewhat", "not_really"] as const;
const WOULD_SHARE = ["yes", "maybe", "no"] as const;

const OPEN_TEXT_MAX = 4000;

function isOneOf<T extends readonly string[]>(vals: T, x: unknown): x is T[number] {
  return typeof x === "string" && (vals as readonly string[]).includes(x);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be valid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Body must be a JSON object." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  if (!isOneOf(ROLE_IN_TOP3, b.role_in_top3)) {
    return Response.json(
      { error: `role_in_top3 must be one of ${ROLE_IN_TOP3.join(", ")}.` },
      { status: 400 },
    );
  }
  if (!isOneOf(WHY_SPECIFIC, b.why_specific)) {
    return Response.json(
      { error: `why_specific must be one of ${WHY_SPECIFIC.join(", ")}.` },
      { status: 400 },
    );
  }
  if (!isOneOf(WOULD_SHARE, b.would_share)) {
    return Response.json(
      { error: `would_share must be one of ${WOULD_SHARE.join(", ")}.` },
      { status: 400 },
    );
  }

  let openText: string | null = null;
  if (b.open_text !== undefined && b.open_text !== null && b.open_text !== "") {
    if (typeof b.open_text !== "string") {
      return Response.json({ error: "open_text must be a string." }, { status: 400 });
    }
    openText = b.open_text.slice(0, OPEN_TEXT_MAX);
  }

  const record = {
    role_in_top3: b.role_in_top3,
    why_specific: b.why_specific,
    would_share: b.would_share,
    open_text: openText,
    // Optional, non-identifying context the survey may attach (top archetype id
    // shown to the user) — stored if a plain string, ignored otherwise.
    top_archetype: typeof b.top_archetype === "string" ? b.top_archetype : null,
    received_at: new Date().toISOString(),
  };

  try {
    await appendJsonl(BETA_FEEDBACK_PATH, record);
  } catch {
    return Response.json({ error: "Could not record feedback." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
