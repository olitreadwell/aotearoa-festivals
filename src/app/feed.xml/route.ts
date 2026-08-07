import { Feed } from "feed";
import { prisma } from "@/lib/prisma";
import { FestivalStatus } from "@/generated/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://aotearoa-festivals.nz";

  const festivals = await prisma.festival.findMany({
    where: {
      approved: true,
      status: { in: [FestivalStatus.ACTIVE, FestivalStatus.TBC] },
    },
    orderBy: [{ startDate: "asc" }, { name: "asc" }],
    select: {
      name: true,
      slug: true,
      genre: true,
      dateText: true,
      notes: true,
      startDate: true,
      updatedAt: true,
      region: true,
    },
  });

  const feed = new Feed({
    title: "Aotearoa Festivals",
    description: "Upcoming New Zealand music and arts festivals",
    id: baseUrl + "/",
    link: baseUrl + "/",
    feedLinks: { rss: baseUrl + "/feed.xml" },
    copyright: "Aotearoa Festivals",
    updated: new Date(),
    language: "en-NZ",
  });

  for (const f of festivals) {
    feed.addItem({
      title: f.name,
      id: baseUrl + "/festivals/" + f.slug,
      link: baseUrl + "/festivals/" + f.slug,
      description: [f.genre, f.dateText, f.notes].filter(Boolean).join(" · "),
      date: f.startDate ?? f.updatedAt,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
