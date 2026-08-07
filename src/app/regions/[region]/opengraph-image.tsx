import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { formatRegion } from "@/lib/format";
import type { Region } from "@/generated/prisma";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Region card";

export default async function Image({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;

  const regionEnum = region.toUpperCase() as Region;
  const count = await prisma.festival.count({
    where: { region: regionEnum, approved: true },
  });

  const label = formatRegion(regionEnum);
  const subtitle =
    count > 0
      ? `${count} festival${count !== 1 ? "s" : ""}`
      : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#171717",
        color: "#f5f5f5",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        {label}
      </div>
      {subtitle && (
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#a3a3a3",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>,
    { ...size },
  );
}
