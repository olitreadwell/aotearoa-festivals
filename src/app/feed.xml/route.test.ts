import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { prisma } from "@/lib/prisma";
import { FestivalStatus } from "@/generated/prisma";

describe("GET /feed.xml", () => {
  it("returns RSS/XML containing an item for every approved active or TBC festival", async () => {
    const expectedCount = await prisma.festival.count({
      where: {
        approved: true,
        status: { in: [FestivalStatus.ACTIVE, FestivalStatus.TBC] },
      },
    });
    expect(expectedCount).toBeGreaterThan(0);

    const response = await GET();

    expect(response.headers.get("content-type")).toContain(
      "application/rss+xml",
    );

    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("Aotearoa Festivals");

    const itemCount = (body.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(expectedCount);
  });

  it("includes at least one known active festival's title and link", async () => {
    const sample = await prisma.festival.findFirstOrThrow({
      where: {
        approved: true,
        status: { in: [FestivalStatus.ACTIVE, FestivalStatus.TBC] },
      },
      select: { name: true, slug: true },
    });

    const response = await GET();
    const body = await response.text();

    expect(body).toContain(`/festivals/${sample.slug}`);
  });
});
