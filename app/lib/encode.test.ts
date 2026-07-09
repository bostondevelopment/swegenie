import { describe, it, expect } from "vitest";
import { encodeProfile, decodeProfile } from "./encode";
import { dimensions } from "./taxonomy";

describe("encodeProfile / decodeProfile round-trip", () => {
  it("round-trips a fully-answered profile", () => {
    const profile: Record<string, number> = {};
    dimensions.forEach((d, i) => (profile[d.id] = (i % 5) + 1));
    const decoded = decodeProfile(encodeProfile(profile));
    expect(decoded).not.toBeNull();
    dimensions.forEach((d) => expect(decoded![d.id]).toBe(profile[d.id]));
  });

  it("round-trips skipped (null) dimensions as null, not a neutral default", () => {
    const profile: Record<string, number | null> = {};
    dimensions.forEach((d) => (profile[d.id] = null));
    const decoded = decodeProfile(encodeProfile(profile));
    dimensions.forEach((d) => expect(decoded![d.id]).toBeNull());
  });

  it("rejects a link encoded under a different dimension count (stale taxonomy version)", () => {
    // Simulates a v1.0 link (16 dims) being opened after the v1.1 split to 17.
    const staleEncoded = "16." + "2".repeat(16);
    expect(decodeProfile(staleEncoded)).toBeNull();
  });

  it("rejects a pre-v1.1 link with no version prefix at all", () => {
    const noPrefixEncoded = "2".repeat(dimensions.length);
    expect(decodeProfile(noPrefixEncoded)).toBeNull();
  });
});
