/**
 * POST /api/contribute — Phase 8 crowdsourced-taxonomy contributor-signal
 * collector (scaffold).
 *
 * Validates one contributor signal against taxonomy/contributor-signals-schema.json
 * and appends it to data/contributor-signals.jsonl. Each signal is one
 * role-holder's or hiring-manager's rating of how much a single dimension matters
 * for a single archetype. Signals are raw input only — this endpoint never touches
 * the expert taxonomy in data/archetypes.json; the Phase 8 aggregation model
 * (minimum-n thresholds, outlier damping, audit history) is separate and not yet
 * built.
 *
 * Runtime note: same as the beta-feedback route — excluded from the static export
 * build, live only under a Node server (`next dev`, or a server build with
 * `output: "export"` removed). See lib/feedback-store.ts.
 */
import { archetypeById, dimensionById } from "@/lib/taxonomy";
import { appendJsonl, CONTRIBUTOR_SIGNALS_PATH } from "@/lib/feedback-store";

const CONTRIBUTOR_ROLE = ["role-holder", "hiring-manager"] as const;
const TITLE_MAX = 200;

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

  if (typeof b.archetype_id !== "string" || !archetypeById.has(b.archetype_id)) {
    return Response.json({ error: "archetype_id must be a known archetype id." }, { status: 400 });
  }
  if (typeof b.dimension_id !== "string" || !dimensionById.has(b.dimension_id)) {
    return Response.json({ error: "dimension_id must be a known dimension id." }, { status: 400 });
  }
  if (typeof b.contributor_role !== "string" || !(CONTRIBUTOR_ROLE as readonly string[]).includes(b.contributor_role)) {
    return Response.json(
      { error: `contributor_role must be one of ${CONTRIBUTOR_ROLE.join(", ")}.` },
      { status: 400 },
    );
  }
  if (
    typeof b.signal_value !== "number" ||
    !Number.isInteger(b.signal_value) ||
    b.signal_value < 1 ||
    b.signal_value > 5
  ) {
    return Response.json({ error: "signal_value must be an integer from 1 to 5." }, { status: 400 });
  }

  // Optional fields — validate types only when present.
  let verifiedTitle: string | null = null;
  if (b.verified_title !== undefined && b.verified_title !== null && b.verified_title !== "") {
    if (typeof b.verified_title !== "string") {
      return Response.json({ error: "verified_title must be a string." }, { status: 400 });
    }
    verifiedTitle = b.verified_title.slice(0, TITLE_MAX);
  }

  let yearsInRole: number | null = null;
  if (b.years_in_role !== undefined && b.years_in_role !== null) {
    if (typeof b.years_in_role !== "number" || !Number.isFinite(b.years_in_role) || b.years_in_role < 0) {
      return Response.json({ error: "years_in_role must be a non-negative number." }, { status: 400 });
    }
    yearsInRole = b.years_in_role;
  }

  const sessionId = typeof b.session_id === "string" && b.session_id ? b.session_id.slice(0, 100) : null;

  const record = {
    archetype_id: b.archetype_id,
    dimension_id: b.dimension_id,
    contributor_role: b.contributor_role,
    signal_value: b.signal_value,
    verified_title: verifiedTitle,
    years_in_role: yearsInRole,
    timestamp: new Date().toISOString(),
    session_id: sessionId,
  };

  try {
    await appendJsonl(CONTRIBUTOR_SIGNALS_PATH, record);
  } catch {
    return Response.json({ error: "Could not record signal." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
