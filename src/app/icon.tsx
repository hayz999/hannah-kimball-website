import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#00C2C7",
          borderRadius: "8px 3px 8px 3px",
          color: "#1A1A2E",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        HK
      </div>
    ),
    { ...size },
  );
}
