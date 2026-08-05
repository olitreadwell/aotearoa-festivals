import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { prisma } from "@/lib/prisma";

const STATIC_ROUTE_COUNT = 6;
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://aotearoa-festivals.nz";

describe("sitemap()", () => {
  it("covers the static routes plus one entry per festival, artist, and promoter", async () => {
    const [festivals, artists, promoters] = await Promise.all([
      prisma.festival.findMany({ select: { slug: true } }),
      prisma.artist.findMany({ select: { slug: true } }),
      prisma.promoter.findMany({ select: { slug: true } }),
    ]);

    const entries = await sitemap();

    expect(entries.length).toBe(
      STATIC_ROUTE_COUNT + festivals.length + artists.length + promoters.length,
    );

    const urls = entries.map((entry) => entry.url);
    for (const festival of festivals) {
      expect(urls).toContain(`${BASE_URL}/festivals/${festival.slug}`);
    }
    for (const promoter of promoters) {
      expect(urls).toContain(`${BASE_URL}/promoters/${promoter.slug}`);
    }
  });

  it("includes the top-level static routes", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(BASE_URL);
    expect(urls).toContain(`${BASE_URL}/festivals`);
    expect(urls).toContain(`${BASE_URL}/artists`);
    expect(urls).toContain(`${BASE_URL}/promoters`);
    expect(urls).toContain(`${BASE_URL}/regions`);
    expect(urls).toContain(`${BASE_URL}/search`);
  });
});
