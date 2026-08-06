// @vitest-environment node
import { describe, expect, it } from "vitest";
import Image from "./opengraph-image";
import { prisma } from "@/lib/prisma";

describe("opengraph-image for /festivals/[slug]", () => {
  it("renders a PNG image without throwing for an existing festival slug", async () => {
    const festival = await prisma.festival.findFirstOrThrow({
      select: { slug: true },
    });

    const response = await Image({
      params: Promise.resolve({ slug: festival.slug }),
    });

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("content-type")).toBe("image/png");
    const buffer = await response.arrayBuffer();
    expect(buffer.byteLength).toBeGreaterThan(0);
  });

  it("renders a PNG image without throwing for a nonexistent slug, falling back to the default title", async () => {
    const response = await Image({
      params: Promise.resolve({ slug: "this-festival-does-not-exist" }),
    });

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("content-type")).toBe("image/png");
    const buffer = await response.arrayBuffer();
    expect(buffer.byteLength).toBeGreaterThan(0);
  });
});
