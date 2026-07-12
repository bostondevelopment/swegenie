/**
 * Server-only JSONL store for the Phase 6 beta-feedback pipeline and the
 * Phase 8 contributor-signals scaffold. No database, no auth, no external
 * service (per the task constraints and ADR-002/003) — submissions are appended
 * as one JSON object per line to a file under `app/data/`.
 *
 * IMPORTANT — where this actually runs: the app deploys as a static export to
 * GitHub Pages (`output: "export"` in next.config.ts), which has no server, so
 * the POST route handlers that call `appendJsonl` are silently dropped from the
 * static build and never execute in that deploy. This store is live only when
 * the app is served by a Node server: `next dev`, or a server-mode build with
 * `output: "export"` removed (note `next start` refuses to run against an export
 * build). Running an instrumented beta (Phase 6) means serving it that way. This
 * mirrors the app's
 * existing honesty about the analytics stub and the mailto email capture
 * (see lib/analytics.ts). Wiring a serverless/edge collector later is a change
 * inside these two route handlers, not at the call sites.
 *
 * This module must never be imported by a client component — it touches the Node
 * filesystem. It is imported only by route handlers and the admin server page.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

// `process.cwd()` is the `app/` directory when Next runs (dev/start/build), so
// this resolves to `app/data/`, alongside the committed taxonomy JSON. The two
// runtime files are gitignored (see /.gitignore).
const DATA_DIR = path.join(process.cwd(), "data");

export const BETA_FEEDBACK_PATH = path.join(DATA_DIR, "beta-feedback.jsonl");
export const CONTRIBUTOR_SIGNALS_PATH = path.join(DATA_DIR, "contributor-signals.jsonl");

/** Append one record as a JSON line, creating `data/` on first write. */
export async function appendJsonl(filePath: string, record: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(filePath, JSON.stringify(record) + "\n", "utf8");
}

/**
 * Read every parseable JSON line from a JSONL file. Returns [] if the file
 * doesn't exist yet (nothing has been submitted). Malformed lines are skipped
 * rather than throwing, so one bad append can't take down the admin view.
 */
export async function readJsonl<T>(filePath: string): Promise<T[]> {
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  const out: T[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      out.push(JSON.parse(trimmed) as T);
    } catch {
      // Skip a corrupted line rather than failing the whole read.
    }
  }
  return out;
}
