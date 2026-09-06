import { ImageResponse } from "next/og";
import { getStats } from "@/lib/queries";

export const alt = "Samasya Nepal — real problems worth solving";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const stats = await getStats();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40 }}>🇳🇵</div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Samasya Nepal
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          Real problems in Nepal, worth building for.
        </div>
        <div style={{ display: "flex", marginTop: 56, gap: 64 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 700 }}>
              {stats.total}
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
              problems documented
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 700 }}>
              {stats.categoryCount}
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
              sectors covered
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
