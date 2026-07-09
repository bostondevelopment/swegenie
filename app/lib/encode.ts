import { dimensions } from "./taxonomy";
import type { UserProfile } from "./scoring";

const DIMENSION_IDS = dimensions.map((d) => d.id);

/**
 * Encodes a user's answer profile into a compact, URL-safe string so results
 * can be shared/resumed via link with no server-side storage (ADR-003: no
 * login, no DB in v1). Each dimension gets one base-36 char (0-4 for values
 * 1-5, "-" for skipped/null), joined in dimensions.json's fixed order, prefixed
 * with the dimension count and a "." separator.
 *
 * The count prefix exists so a link encoded under an older taxonomy version
 * (a different dimension count/order) is detected and rejected rather than
 * silently misread — a real incident: after v1.1 split one dimension into two,
 * an already-open v1.0 results link would otherwise have decoded every
 * dimension from that point on against the wrong id, showing a garbled result
 * with no indication anything was wrong.
 */
export function encodeProfile(profile: UserProfile): string {
  const chars = DIMENSION_IDS.map((id) => {
    const v = profile[id];
    if (v === null || v === undefined) return "-";
    return String(Math.max(1, Math.min(5, Math.round(v))) - 1);
  }).join("");
  return `${DIMENSION_IDS.length}.${chars}`;
}

/**
 * Returns the decoded profile, or `null` if the encoded string doesn't match
 * the current taxonomy's dimension count (stale link from a prior version).
 */
export function decodeProfile(encoded: string): UserProfile | null {
  const separatorIndex = encoded.indexOf(".");
  if (separatorIndex === -1) return null; // pre-v1.1 link with no version prefix at all
  const count = Number(encoded.slice(0, separatorIndex));
  const chars = encoded.slice(separatorIndex + 1);
  if (count !== DIMENSION_IDS.length) return null;

  const profile: UserProfile = {};
  DIMENSION_IDS.forEach((id, i) => {
    const c = chars[i];
    if (c === undefined || c === "-") {
      profile[id] = null;
      return;
    }
    const n = Number(c);
    if (Number.isFinite(n)) profile[id] = n + 1;
  });
  return profile;
}
