export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { FestivalStatus, Region } from "@/generated/prisma";
import type { Festival, Promoter } from "@/generated/prisma";
import Link from "next/link";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";

// ---------------------------------------------------------------------------
// Region display helpers
// ---------------------------------------------------------------------------

const REGION_LABELS: Record<Region, string> = {
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

function formatRegion(region: Region | null): string {
  if (!region) return "Unknown region";
  return REGION_LABELS[region] ?? region;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FestivalWithPromoter = Festival & { promoter: Promoter | null };

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function Home() {
  const [festivalCount, activeCount, upcomingFestivals, regionRows] =
    await Promise.all([
      prisma.festival.count({ where: { approved: true } }),
      prisma.festival.count({
        where: { approved: true, status: FestivalStatus.ACTIVE },
      }),
      prisma.festival.findMany({
        where: {
          approved: true,
          status: { in: [FestivalStatus.ACTIVE, FestivalStatus.TBC] },
        },
        orderBy: [{ startDate: "asc" }, { name: "asc" }],
        take: 6,
        include: { promoter: true },
      }) as Promise<FestivalWithPromoter[]>,
      prisma.festival.findMany({
        where: { approved: true, region: { not: null } },
        select: { region: true },
        distinct: ["region"],
      }),
    ]);

  const regions = regionRows
    .map((r) => r.region)
    .filter((r): r is Region => r !== null)
    .slice(0, 8);

  const regionCount = regionRows.filter((r) => r.region !== null).length;

  return (
    <main className="min-h-screen">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 to-white px-6 py-20 text-center dark:border-gray-800 dark:from-blue-950/30 dark:to-[#0a0a0a]">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Aotearoa Festivals
          </h1>
          <p className="mt-4 text-lg text-[#555] dark:text-[#aaa]">
            Discover music, arts &amp; culture festivals across New Zealand
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/festivals"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              Browse all festivals &rarr;
            </Link>
            <Link
              href="/festivals?search=1"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-600 dark:bg-[#111] dark:text-[#ededed] dark:hover:bg-[#1a1a1a]"
            >
              Search &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Stats row                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="Site statistics"
        className="border-b border-gray-200 px-6 py-5 dark:border-gray-800"
      >
        <dl className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-2 text-center text-sm text-[#555] dark:text-[#aaa]">
          <div className="flex items-center gap-1.5">
            <dt className="font-semibold text-[#171717] dark:text-[#ededed]">
              {festivalCount}
            </dt>
            <dd>festivals</dd>
          </div>
          <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">
            &middot;
          </span>
          <div className="flex items-center gap-1.5">
            <dt className="font-semibold text-[#171717] dark:text-[#ededed]">
              {activeCount}
            </dt>
            <dd>active</dd>
          </div>
          <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">
            &middot;
          </span>
          <div className="flex items-center gap-1.5">
            <dt className="font-semibold text-[#171717] dark:text-[#ededed]">
              {regionCount}
            </dt>
            <dd>regions covered</dd>
          </div>
        </dl>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* ---------------------------------------------------------------- */}
        {/* Upcoming festivals                                               */}
        {/* ---------------------------------------------------------------- */}
        <section aria-labelledby="upcoming-heading" className="mb-14">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="upcoming-heading"
              className="text-xl font-bold tracking-tight"
            >
              Upcoming festivals
            </h2>
            <Link
              href="/festivals"
              className="shrink-0 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              View all &rarr;
            </Link>
          </div>

          {upcomingFestivals.length > 0 ? (
            <ul
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {upcomingFestivals.map((festival) => (
                <li key={festival.id}>
                  <Link
                    href={`/festivals/${festival.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-150 hover:border-blue-400 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-[#111] dark:hover:border-blue-500"
                  >
                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      {/* Status badge + name */}
                      <div>
                        <FestivalStatusBadge status={festival.status} className="mb-2" />
                        <h3 className="text-base leading-snug font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {festival.name}
                        </h3>
                      </div>

                      {/* Meta rows */}
                      <dl className="flex flex-col gap-1 text-sm text-[#555] dark:text-[#aaa]">
                        {festival.region && (
                          <div className="flex items-center gap-1.5">
                            <dt className="sr-only">Region</dt>
                            <svg
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <dd>{formatRegion(festival.region)}</dd>
                          </div>
                        )}

                        {festival.genre && (
                          <div className="flex items-center gap-1.5">
                            <dt className="sr-only">Genre</dt>
                            <svg
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                            <dd>{festival.genre}</dd>
                          </div>
                        )}

                        {festival.dateText && (
                          <div className="flex items-center gap-1.5">
                            <dt className="sr-only">Date</dt>
                            <svg
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <dd>{festival.dateText}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Card footer arrow */}
                    <div className="flex justify-end px-5 pb-4">
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-[#555] dark:border-gray-600 dark:text-[#aaa]">
              No upcoming festivals at the moment.{" "}
              <Link
                href="/festivals"
                className="text-blue-600 underline dark:text-blue-400"
              >
                Browse all festivals
              </Link>
              .
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Browse by region                                                 */}
        {/* ---------------------------------------------------------------- */}
        {regions.length > 0 && (
          <section aria-labelledby="regions-heading" className="mb-14">
            <h2
              id="regions-heading"
              className="mb-5 text-xl font-bold tracking-tight"
            >
              Browse by region
            </h2>
            <div className="flex flex-wrap gap-2.5" role="list">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={`/regions/${region.toLowerCase()}`}
                  role="listitem"
                  className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-[#333] transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-600 dark:bg-[#111] dark:text-[#ccc] dark:hover:border-blue-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                >
                  {REGION_LABELS[region]}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Footer CTA                                                       */}
        {/* ---------------------------------------------------------------- */}
        <section
          aria-label="Submit a festival"
          className="rounded-xl border border-dashed border-gray-300 px-8 py-10 text-center dark:border-gray-700"
        >
          <h2 className="mb-2 text-lg font-semibold">
            Know a festival we&apos;re missing?
          </h2>
          <p className="mb-5 text-sm text-[#555] dark:text-[#aaa]">
            Help us keep the directory complete — submissions are reviewed and
            published within a few days.
          </p>
          <Link
            href="/submit"
            className="inline-block rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-600 dark:bg-[#111] dark:text-[#ededed] dark:hover:bg-[#1a1a1a]"
          >
            Submit a festival &rarr;
          </Link>
        </section>
      </div>
    </main>
  );
}
