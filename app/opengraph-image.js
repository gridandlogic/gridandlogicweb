import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Grid & Logic — 3D websites, configurators & ecommerce";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#05070b",
          backgroundImage:
            "linear-gradient(to right, rgba(238,242,247,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(238,242,247,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "72px",
          color: "#eef2f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              backgroundColor: "#00e6e6",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#9aa6b8",
            }}
          >
            Grid &amp; Logic
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: "86px",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 600,
              maxWidth: "940px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>We design the grid.</span>
            <span style={{ color: "#9aa6b8" }}>
              We build the <span style={{ color: "#00e6e6" }}>logic</span>.
            </span>
          </div>
          <div style={{ fontSize: "30px", color: "#9aa6b8", maxWidth: "820px" }}>
            3D websites · Product configurators · Ecommerce
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1a2130",
            paddingTop: "28px",
            fontSize: "24px",
            color: "#5f6b7d",
          }}
        >
          <span>info@gridandlogic.com</span>
          <span>Remote-first · Worldwide</span>
        </div>
      </div>
    ),
    size
  );
}
