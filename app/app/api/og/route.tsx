import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") ?? "Engineering role match";
  const pct = searchParams.get("pct") ?? "—";
  const dims = [searchParams.get("d1"), searchParams.get("d2"), searchParams.get("d3")].filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0E14",
          color: "#E7E9EE",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            <span>Roleprint</span>
            <span style={{ color: "#5B90F5" }}>.</span>
          </div>
          <div style={{ fontSize: 20, color: "#C4CAD4", fontFamily: "monospace" }}>taxonomy v1.0</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 22, color: "#C4CAD4" }}>Top match</div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <div style={{ fontSize: 40, fontFamily: "monospace", color: "#5B90F5" }}>{`${pct}%`}</div>
            <div style={{ fontSize: 22, color: "#C4CAD4" }}>fit</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: 16, color: "#6B7280", fontFamily: "monospace" }}>TOP SIGNALS</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {dims.map((d) => (
              <div
                key={d}
                style={{
                  fontSize: 18,
                  padding: "8px 14px",
                  border: "1px solid rgba(196,202,212,0.25)",
                  borderRadius: 4,
                  color: "#E7E9EE",
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, color: "#6B7280", marginTop: "12px" }}>
            18 archetypes &middot; 16 sourced trait dimensions &middot; roleprint.example
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
