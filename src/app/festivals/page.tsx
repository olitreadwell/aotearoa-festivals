export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FestivalStatus, Region } from "@/generated/prisma";
import type { Festival, Promoter } from "@/generated/prisma";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import {
  REGION_LABELS,
  STATUS_LABELS,
  STATUS_BADGE_CLASS,
  formatRegion,
} from "@/lib/format";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FestivalWithPromoter = Festival & { promoter: Promoter | null };

export const metadata: Metadata = {
  title: "All Festivals — Aotearoa Festivals",
  description:
    "Browse all New Zealand music festivals. Filter by region, genre, and status.",
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

const PAGE_SIZE = 24;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function FestivalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    region?: string;
    status?: string;
    genre?: string;
    page?: string;
  }>;
}) {
  const { region, status, page } = await searchParams;

  // Validate enum values so invalid query strings don't crash Prisma
  const validRegion =
    region && Object.values(Region).includes(region as Region)
      ? (region as Region)
      : undefined;

  const validStatus =
    status && Object.values(FestivalStatus).includes(status as FestivalStatus)
      ? (status as FestivalStatus)
      : undefined;

  const requestedPage = Math.max(1, Math.floor(Number(page)) || 1);

  const where = {
    approved: true,
    ...(validRegion ? { region: validRegion } : {}),
    ...(validStatus ? { status: validStatus } : {}),
  };

  const totalCount = await prisma.festival.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const festivals: FestivalWithPromoter[] = await prisma.festival.findMany({
    where,
    orderBy: [{ startDate: "asc" }, { name: "asc" }],
    include: { promoter: true },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  // Build URL helper — preserves existing filters while swapping one param
  function filterUrl(key: string, value: string | undefined): string {
    const params = new URLSearchParams();
    if (key !== "region" && validRegion) params.set("region", validRegion);
    if (key !== "status" && validStatus) params.set("status", validStatus);
    if (value) params.set(key, value);
    const qs = params.toString();
    return qs ? `/festivals?${qs}` : "/festivals";
  }

  // Build URL helper — preserves existing filters while swapping the page
  function pageUrl(targetPage: number): string {
    const params = new URLSearchParams();
    if (validRegion) params.set("region", validRegion);
    if (validStatus) params.set("status", validStatus);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/festivals?${qs}` : "/festivals";
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="mb-8">
        <h1 className="mb-1 text-3xl font-bold tracking-tight">
          Aotearoa Festivals
        </h1>
        <p className="text-sm text-[#555] dark:text-[#aaa]">
          Discover music, arts, and culture festivals across New Zealand.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Filter bar                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="Filter festivals"
        className="mb-6 flex flex-wrap items-center gap-4"
      >
        {/* Region filter */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="region-select"
            className="text-xs font-semibold tracking-wide text-[#555] uppercase dark:text-[#aaa]"
          >
            Region
          </label>
          {/* Use a form with GET method so JS is not required */}
          <form method="GET" action="/festivals" className="flex gap-2">
            {/* Preserve status param across region changes */}
            {validStatus && (
              <input type="hidden" name="status" value={validStatus} />
            )}
            <select
              id="region-select"
              name="region"
              defaultValue={validRegion ?? ""}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#1a1a1a]"
            >
              <option value="">All regions</option>
              {Object.values(Region).map((r) => (
                <option key={r} value={r}>
                  {REGION_LABELS[r]}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Status filter — quick-link chips */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-wide text-[#555] uppercase dark:text-[#aaa]">
            Status
          </span>
          <div className="flex flex-wrap gap-1.5" role="list">
            <Link
              href={filterUrl("status", undefined)}
              role="listitem"
              aria-current={!validStatus ? "true" : undefined}
              className={`rounded-full border px-3 py-0.5 text-xs font-medium transition-colors ${
                !validStatus
                  ? "border-transparent bg-[#171717] text-white dark:bg-[#ededed] dark:text-[#171717]"
                  : "border-gray-300 bg-transparent text-[#555] hover:border-gray-500 dark:border-gray-600 dark:text-[#aaa]"
              }`}
            >
              All
            </Link>
            {Object.values(FestivalStatus).map((s) => (
              <Link
                key={s}
                href={filterUrl("status", s)}
                role="listitem"
                aria-current={validStatus === s ? "true" : undefined}
                className={`rounded-full border px-3 py-0.5 text-xs font-medium transition-colors ${
                  validStatus === s
                    ? "border-transparent bg-[#171717] text-white dark:bg-[#ededed] dark:text-[#171717]"
                    : "border-gray-300 bg-transparent text-[#555] hover:border-gray-500 dark:border-gray-600 dark:text-[#aaa]"
                }`}
              >
                {STATUS_LABELS[s]}
              </Link>
            ))}
          </div>
        </div>

        {/* Clear filters */}
        {(validRegion ?? validStatus) && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-wide uppercase opacity-0 select-none">
              &nbsp;
            </span>
            <Link
              href="/festivals"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Clear filters
            </Link>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Result count                                                        */}
      {/* ------------------------------------------------------------------ */}
      <p className="mb-5 text-sm text-[#555] dark:text-[#aaa]" role="status">
        {totalCount === 0
          ? "No festivals found."
          : totalCount === 1
            ? "1 festival found."
            : `${totalCount} festivals found.`}
      </p>

      {/* ------------------------------------------------------------------ */}
      {/* Festival grid                                                       */}
      {/* ------------------------------------------------------------------ */}
      {festivals.length > 0 ? (
        <ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {festivals.map((festival) => (
            <li key={festival.id}>
              <Link
                href={`/festivals/${festival.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-150 hover:border-blue-400 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-[#111] dark:hover:border-blue-500"
              >
                {/* Card body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* Status badge + name */}
                  <div>
                    <span
                      className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE_CLASS[festival.status]}`}
                    >
                      {STATUS_LABELS[festival.status]}
                    </span>
                    <h2 className="text-base leading-snug font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {festival.name}
                    </h2>
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

                    {festival.promoter && (
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Promoter</dt>
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                        </svg>
                        <dd>{festival.promoter.name}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Card footer arrow indicator */}
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
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-[#555] dark:border-gray-600 dark:text-[#aaa]">
          <p className="text-sm">
            No festivals match your current filters.{" "}
            <Link
              href="/festivals"
              className="text-blue-600 underline dark:text-blue-400"
            >
              Clear filters
            </Link>{" "}
            to see all festivals.
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Pagination                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        buildHref={pageUrl}
      />
    </main>
  );
}
