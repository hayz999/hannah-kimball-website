import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#FFFDF7",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            alignItems: "center",
            justifyContent: "center",
            background: "#00C2C7",
            borderRadius: "24px 8px 24px 8px",
            border: "4px solid #1A1A2E",
            color: "#1A1A2E",
            fontSize: 40,
            fontWeight: 800,
            marginBottom: 40,
          }}
        >
          HK
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#1A1A2E",
            letterSpacing: "-0.02em",
          }}
        >
          Hannah Kimball
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 500,
            color: "#5B2D8E",
            marginTop: 16,
          }}
        >
          Composer · Choral Director · Musician · Educator
        </div>
      </div>
    ),
    { ...size },
  );
}
