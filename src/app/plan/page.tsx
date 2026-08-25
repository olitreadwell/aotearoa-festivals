import type { Metadata } from "next";
import Link from "next/link";
import { FestivalStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { formatDateRange, formatRegion } from "@/lib/format";
import { groupFestivalsBySeason } from "@/lib/season";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";
import { PlanToggle } from "@/components/PlanToggle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plan your festival season — Aotearoa Festivals",
  description:
    "Browse upcoming New Zealand festivals grouped by season and build your own festival season plan.",
};

function seasonId(label: string): string {
  return `season-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

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
      startDate: true,
      endDate: true,
      dateText: true,
      status: true,
    },
    orderBy: [{ startDate: { sort: "asc", nulls: "last" } }, { name: "asc" }],
  });

  const seasons = groupFestivalsBySeason(festivals);
  const tbc = festivals.filter((f) => !f.startDate);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Plan your festival season
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Upcoming New Zealand festivals grouped by season. Save the ones you
          want to catch — your plan is stored in this browser.
        </p>
      </header>

      {festivals.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No upcoming festivals to plan yet — check back soon.
        </p>
      )}

      {seasons.map(({ season, festivals: group }) => (
        <section
          key={season.label}
          className="mb-10"
          aria-labelledby={seasonId(season.label)}
        >
          <h2
            id={seasonId(season.label)}
            className="mb-3 border-b pb-2 text-lg font-bold"
          >
            {season.label}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {group.length} festival{group.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <ul className="divide-y">
            {group.map((festival) => (
              <li key={festival.slug} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/festivals/${festival.slug}`}
                    className="block truncate text-sm font-medium hover:underline"
                  >
                    {festival.name}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    {[
                      formatDateRange(festival.startDate, festival.endDate) ??
                        festival.dateText,
                      festival.region ? formatRegion(festival.region) : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <FestivalStatusBadge status={festival.status} />
                <PlanToggle slug={festival.slug} name={festival.name} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {tbc.length > 0 && (
        <section className="mb-10" aria-labelledby="season-tbc">
          <h2 id="season-tbc" className="mb-3 border-b pb-2 text-lg font-bold">
            Dates TBC
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {tbc.length} festival{tbc.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <ul className="divide-y">
            {tbc.map((festival) => (
              <li key={festival.slug} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/festivals/${festival.slug}`}
                    className="block truncate text-sm font-medium hover:underline"
                  >
                    {festival.name}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    {festival.region ? formatRegion(festival.region) : null}
                  </p>
                </div>
                <FestivalStatusBadge status={festival.status} />
                <PlanToggle slug={festival.slug} name={festival.name} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
