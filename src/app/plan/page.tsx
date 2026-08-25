import type { Metadata } from "next";
import { FestivalStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import type { PlanFestival } from "@/lib/plan-optimizer";
import PlanPageClient from "./_components/PlanPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plan your festival season — Aotearoa Festivals",
  description:
    "Browse upcoming New Zealand festivals grouped by season, mark them interested or planned, and build a non-overlapping season itinerary.",
};

export type PlanFestivalWithStatus = PlanFestival & {
  dateText: string | null;
  status: FestivalStatus;
};

export default async function PlanPage() {
  const now = new Date();
  const festivals = await prisma.festival.findMany({
    where: {
      approved: true,
      OR: [
        { startDate: { gte: now } },
        { startDate: null, status: FestivalStatus.ACTIVE },
      ],
    },
    select: {
      slug: true,
      name: true,
      region: true,
      genre: true,
      camping: true,
      ticketPrice: true,
      startDate: true,
      endDate: true,
      dateText: true,
      status: true,
      _count: { select: { lineups: true } },
      lineups: {
        select: { artist: { select: { genre: true } } },
      },
    },
    orderBy: [{ startDate: { sort: "asc", nulls: "last" } }, { name: "asc" }],
  });

  const planFestivals: PlanFestivalWithStatus[] = festivals.map((f) => ({
    slug: f.slug,
    name: f.name,
    region: f.region,
    genre: f.genre,
    camping: f.camping,
    ticketPrice: f.ticketPrice,
    lineupGenres: [
      ...new Set(
        f.lineups
          .map((l) => l.artist.genre)
          .filter((g): g is string => typeof g === "string" && g.length > 0),
      ),
    ],
    startDate: f.startDate,
    endDate: f.endDate,
    lineupCount: f._count.lineups,
    dateText: f.dateText,
    status: f.status,
  }));

  return <PlanPageClient festivals={planFestivals} />;
}
