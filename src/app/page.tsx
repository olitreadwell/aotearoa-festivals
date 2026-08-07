import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FestivalStatus, Region } from "@/generated/prisma";
import type { Festival, Promoter } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";
import { formatRegion, REGION_LABELS, STATUS_LABELS } from "@/lib/format";
import HomeMap from "./_components/HomeMap";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aotearoa Festivals — NZ Music Festival Directory",
  description:
    "Discover New Zealand music festivals, promoters, and artists. Browse by region, genre, or status.",
};

type FestivalWithPromoter = Festival & { promoter: Promoter | null };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    region?: string;
    status?: string;
    genre?: string;
    camping?: string;
    search?: string;
  }>;
}) {
  const { region, status, genre, camping, search } = await searchParams;

  const validRegion =
    region && Object.values(Region).includes(region as Region)
      ? (region as Region)
      : undefined;
  const validStatus =
    status && Object.values(FestivalStatus).includes(status as FestivalStatus)
      ? (status as FestivalStatus)
      : undefined;

  const baseWhere = {
    approved: true,
    ...(validRegion ? { region: validRegion } : {}),
    ...(validStatus ? { status: validStatus } : {}),
    ...(genre
      ? { genre: { contains: genre, mode: "insensitive" as const } }
      : {}),
    ...(camping === "yes"
      ? { camping: true }
      : camping === "no"
        ? { camping: false }
        : {}),
    ...(search
      ? { name: { contains: search, mode: "insensitive" as const } }
      : {}),
  };

  const [festivalCount, activeCount, upcoming, mapFestivals] =
    await Promise.all([
      prisma.festival.count({ where: { approved: true } }),
      prisma.festival.count({
        where: { approved: true, status: FestivalStatus.ACTIVE },
      }),
      prisma.festival.findMany({
        where: baseWhere,
        orderBy: [
          { startDate: { sort: "asc", nulls: "last" } },
          { name: "asc" },
        ],
        include: { promoter: true },
        take: 24,
      }) as Promise<FestivalWithPromoter[]>,
      prisma.festival.findMany({
        where: {
          approved: true,
          latitude: { not: null },
          longitude: { not: null },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          latitude: true,
          longitude: true,
          genre: true,
          region: true,
          status: true,
        },
        orderBy: { name: "asc" },
      }),
    ]);

  const regionCount = await prisma.festival
    .findMany({
      where: { approved: true, region: { not: null } },
      select: { region: true },
      distinct: ["region"],
    })
    .then((r) => r.length);

  const now = new Date();
  const upcomingCount = upcoming.filter(
    (f) =>
      !f.startDate ||
      f.startDate >= now ||
      (!f.startDate && f.status === "ACTIVE"),
  ).length;
  const pastCount = upcoming.length - upcomingCount;

  function filterUrl(key: string, value: string | undefined): string {
    const params = new URLSearchParams();
    if (key !== "region" && validRegion) params.set("region", validRegion);
    if (key !== "status" && validStatus) params.set("status", validStatus);
    if (key !== "genre" && genre) params.set("genre", genre);
    if (key !== "camping" && camping) params.set("camping", camping);
    if (key !== "search" && search) params.set("search", search);
    if (value) params.set(key, value);
    return params.toString() ? `/?${params}` : "/";
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background px-6 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          {festivalCount} festivals · {activeCount} active · {regionCount}{" "}
          regions
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Aotearoa Festivals
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Discover music festivals across New Zealand. Browse by region, genre,
          or date.
        </p>
      </section>

      {/* Advanced Filters */}
      <section className="border-b bg-muted/30 px-4 py-3">
        <form
          method="GET"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-2"
        >
          <select
            name="region"
            defaultValue={validRegion ?? ""}
            className="h-9 rounded-md border bg-background px-2 text-xs"
          >
            <option value="">All regions</option>
            {Object.values(Region)
              .filter((r) => r !== "ONLINE")
              .map((r) => (
                <option key={r} value={r}>
                  {REGION_LABELS[r]}
                </option>
              ))}
          </select>
          <select
            name="status"
            defaultValue={validStatus ?? ""}
            className="h-9 rounded-md border bg-background px-2 text-xs"
          >
            <option value="">All statuses</option>
            {Object.values(FestivalStatus).map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="genre"
            defaultValue={genre ?? ""}
            placeholder="Genre..."
            className="h-9 w-24 rounded-md border bg-background px-2 text-xs"
          />
          <select
            name="camping"
            defaultValue={camping ?? ""}
            className="h-9 rounded-md border bg-background px-2 text-xs"
          >
            <option value="">Camping: any</option>
            <option value="yes">Camping: yes</option>
            <option value="no">Camping: no</option>
          </select>
          <input
            type="search"
            name="search"
            defaultValue={search ?? ""}
            placeholder="Search..."
            className="h-9 w-32 rounded-md border bg-background px-2 text-xs"
          />
          <Button type="submit" size="sm" variant="secondary">
            Filter
          </Button>
          {(validRegion || validStatus || genre || camping || search) && (
            <Link href="/" className="text-xs text-primary hover:underline">
              Clear
            </Link>
          )}
        </form>
      </section>

      {/* Map + List Dashboard */}
      <div className="mx-auto flex max-w-full flex-col lg:flex-row">
        {/* Map */}
        <div className="lg:w-1/2" style={{ minHeight: "50dvh" }}>
          <HomeMap
            festivals={mapFestivals.map((f) => ({
              id: f.id,
              name: f.name,
              slug: f.slug,
              latitude: f.latitude!,
              longitude: f.longitude!,
              genre: f.genre,
              region: f.region,
              status: f.status,
            }))}
          />
        </div>

        {/* Sorted festival list */}
        <div className="lg:w-1/2 border-t lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-semibold">
              {upcoming.length} festival{upcoming.length !== 1 ? "s" : ""}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {upcomingCount} upcoming
                {upcomingCount !== upcoming.length
                  ? ` · ${upcoming.length - upcomingCount} past`
                  : ""}
              </span>
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/calendar">Calendar view →</Link>
            </Button>
          </div>
          <div className="divide-y max-h-[70dvh] overflow-y-auto">
            {upcoming.map((f) => (
              <Link
                key={f.id}
                href={`/festivals/${f.slug}`}
                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <FestivalStatusBadge status={f.status} />
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {f.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {[
                      f.genre,
                      f.region ? formatRegion(f.region) : null,
                      f.dateText,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  {f.camping && (
                    <span className="mt-0.5 inline-block rounded bg-secondary px-1.5 py-px text-[10px] font-medium text-secondary-foreground">
                      🏕 Camping
                    </span>
                  )}
                </div>
                {f.ticketPrice && (
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    {f.ticketPrice}
                  </span>
                )}
              </Link>
            ))}
            {upcoming.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No festivals match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
