import { dimensions } from "./taxonomy";
import type { UserProfile } from "./scoring";

const DIMENSION_IDS = dimensions.map((d) => d.id);

/**
 * Encodes a user's answer profile into a compact, URL-safe string so results
 * can be shared/resumed via link with no server-side storage (ADR-003: no
 * login, no DB in v1). Each dimension gets one base-36 char (0-4 for values
 * 1-5, "-" for skipped/null), joined in dimensions.json's fixed order.
 */
export function encodeProfile(profile: UserProfile): string {
  return DIMENSION_IDS.map((id) => {
    const v = profile[id];
    if (v === null || v === undefined) return "-";
    return String(Math.max(1, Math.min(5, Math.round(v))) - 1);
  }).join("");
}

export function decodeProfile(encoded: string): UserProfile {
  const profile: UserProfile = {};
  DIMENSION_IDS.forEach((id, i) => {
    const c = encoded[i];
    if (c === undefined || c === "-") {
      profile[id] = null;
      return;
    }
    const n = Number(c);
    if (Number.isFinite(n)) profile[id] = n + 1;
  });
  return profile;
}
