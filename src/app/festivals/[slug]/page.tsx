import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Festival, Artist, Promoter } from "@/generated/prisma";
import { FestivalStatus, Region } from "@/generated/prisma";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRegion(region: Region): string {
  const map: Record<Region, string> = {
    NORTHLAND: "Northland",
    AUCKLAND: "Auckland",
    WAIKATO: "Waikato",
    BAY_OF_PLENTY: "Bay of Plenty",
    GISBORNE: "Gisborne",
    HAWKES_BAY: "Hawke's Bay",
    TARANAKI: "Taranaki",
    MANAWATU_WHANGANUI: "Manawatū-Whanganui",
    WELLINGTON: "Wellington",
    WAIRARAPA: "Wairarapa",
    TASMAN: "Tasman",
    NELSON: "Nelson",
    MARLBOROUGH: "Marlborough",
    WEST_COAST: "West Coast",
    CANTERBURY: "Canterbury",
    OTAGO: "Otago",
    SOUTHLAND: "Southland",
    ONLINE: "Online",
  };
  return map[region] ?? region;
}

type StatusStyle = { label: string; className: string };

function statusStyle(status: FestivalStatus): StatusStyle {
  switch (status) {
    case FestivalStatus.ACTIVE:
      return {
        label: "Active",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      };
    case FestivalStatus.TBC:
      return {
        label: "TBC",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      };
    case FestivalStatus.HIATUS:
      return {
        label: "Hiatus",
        className:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
      };
    case FestivalStatus.DEFUNCT:
      return {
        label: "Defunct",
        className:
          "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400",
      };
    case FestivalStatus.UNCONFIRMED:
      return {
        label: "Unconfirmed",
        className:
          "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
      };
  }
}

// ---------------------------------------------------------------------------
// Types returned from the query
// ---------------------------------------------------------------------------

type LineupEntryWithArtist = {
  id: string;
  year: number;
  isHeadliner: boolean;
  artist: Artist;
};

type FestivalWithRelations = Festival & {
  promoter: Promoter | null;
  lineups: LineupEntryWithArtist[];
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const festival = await prisma.festival.findUnique({
    where: { slug },
    select: { name: true },
  });
  if (!festival) return { title: "Festival Not Found" };
  return { title: `${festival.name} — Aotearoa Festivals` };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function FestivalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const festival = (await prisma.festival.findUnique({
    where: { slug },
    include: {
      promoter: true,
      lineups: {
        include: { artist: true },
        orderBy: [{ isHeadliner: "desc" }, { artist: { name: "asc" } }],
      },
    },
  })) as FestivalWithRelations | null;

  if (!festival) {
    notFound();
  }

  const { label: statusLabel, className: statusClass } = statusStyle(
    festival.status
  );

  // Group lineup entries by year, descending
  const lineupByYear = new Map<number, LineupEntryWithArtist[]>();
  for (const entry of festival.lineups) {
    const list = lineupByYear.get(entry.year) ?? [];
    list.push(entry);
    lineupByYear.set(entry.year, list);
  }
  const sortedYears = Array.from(lineupByYear.keys()).sort((a, b) => b - a);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/festivals"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-8"
      >
        <span aria-hidden="true">←</span> All festivals
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start gap-3 mb-2">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight">
          {festival.name}
        </h1>
        <span
          className={`inline-flex items-center self-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Meta row */}
      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        {festival.region && (
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400 font-medium">
              Region
            </dt>
            <dd className="mt-0.5">{formatRegion(festival.region)}</dd>
          </div>
        )}
        {festival.location && (
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400 font-medium">
              Location
            </dt>
            <dd className="mt-0.5">{festival.location}</dd>
          </div>
        )}
        {festival.genre && (
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400 font-medium">
              Genre
            </dt>
            <dd className="mt-0.5">{festival.genre}</dd>
          </div>
        )}
        {festival.dateText && (
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400 font-medium">
              Dates
            </dt>
            <dd className="mt-0.5">{festival.dateText}</dd>
          </div>
        )}
        {festival.costText && (
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400 font-medium">
              Cost
            </dt>
            <dd className="mt-0.5">{festival.costText}</dd>
          </div>
        )}
        {festival.website && (
          <div>
            <dt className="text-neutral-500 dark:text-neutral-400 font-medium">
              Website
            </dt>
            <dd className="mt-0.5">
              <a
                href={festival.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                {festival.website.replace(/^https?:\/\//, "")}
                <span aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
        )}
      </dl>

      {/* Notes */}
      {festival.notes && (
        <div className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 px-5 py-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {festival.notes}
        </div>
      )}

      {/* Promoter */}
      {festival.promoter && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight mb-2">
            Promoter
          </h2>
          <a
            href={`/promoters/${festival.promoter.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {festival.promoter.name}
          </a>
        </section>
      )}

      {/* Lineup */}
      {sortedYears.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight mb-5">Lineup</h2>
          <div className="space-y-8">
            {sortedYears.map((year) => {
              const entries = lineupByYear.get(year)!;
              const headliners = entries.filter((e) => e.isHeadliner);
              const others = entries.filter((e) => !e.isHeadliner);
              return (
                <div key={year}>
                  <h3 className="text-base font-medium text-neutral-600 dark:text-neutral-400 mb-3">
                    {year}
                  </h3>
                  {headliners.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1.5">
                        Headliners
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {headliners.map((entry) => (
                          <li key={entry.id}>
                            <a
                              href={`/artists/${entry.artist.slug}`}
                              className="inline-block rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-3 py-1 text-sm font-medium hover:opacity-80 transition-opacity"
                            >
                              {entry.artist.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {others.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {others.map((entry) => (
                        <li key={entry.id}>
                          <a
                            href={`/artists/${entry.artist.slug}`}
                            className="inline-block rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 px-3 py-1 text-sm hover:border-neutral-500 dark:hover:border-neutral-400 transition-colors"
                          >
                            {entry.artist.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
