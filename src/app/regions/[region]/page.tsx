export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Festival, Promoter } from "@/generated/prisma";
import { Region, FestivalStatus } from "@/generated/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";

// ---------------------------------------------------------------------------
// Region helpers
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

// Reverse map: slug → Region enum value
// Build from REGION_LABELS so it stays in sync automatically.
const SLUG_TO_REGION: Record<string, Region> = Object.fromEntries(
  (Object.keys(REGION_LABELS) as Region[]).map((key) => [
    key.toLowerCase().replace(/_/g, "-"),
    key,
  ]),
);

/** Resolve a URL slug to a Region enum value, or undefined if unknown. */
function slugToRegion(slug: string): Region | undefined {
  return SLUG_TO_REGION[slug];
}

// ---------------------------------------------------------------------------
// Status badge helpers
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<FestivalStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  TBC: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  HIATUS: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  DEFUNCT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  UNCONFIRMED:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const STATUS_LABELS: Record<FestivalStatus, string> = {
  ACTIVE: "Active",
  TBC: "TBC",
  HIATUS: "Hiatus",
  DEFUNCT: "Defunct",
  UNCONFIRMED: "Unconfirmed",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FestivalWithPromoter = Festival & { promoter: Promoter | null };

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: slug } = await params;
  const enumVal = slugToRegion(slug);
  if (!enumVal) return { title: "Region Not Found | Aotearoa Festivals" };
  return {
    title: `${REGION_LABELS[enumVal]} Festivals | Aotearoa Festivals`,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: slug } = await params;

  const enumVal = slugToRegion(slug);
  if (!enumVal) {
    notFound();
  }

  const regionLabel = REGION_LABELS[enumVal];

  const festivals: FestivalWithPromoter[] = await prisma.festival.findMany({
    where: { region: enumVal, approved: true },
    orderBy: [{ startDate: "asc" }, { name: "asc" }],
    include: { promoter: true },
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions" },
          { label: regionLabel },
        ]}
      />

      {/* Header */}
      <header className="mb-8">
        <h1 className="mb-1 text-3xl font-bold tracking-tight">
          {regionLabel}
        </h1>
        <p className="text-sm text-[#555] dark:text-[#aaa]">
          {festivals.length === 0
            ? "No approved festivals in this region yet."
            : festivals.length === 1
              ? "1 approved festival"
              : `${festivals.length} approved festivals`}
        </p>
      </header>

      {/* Festival grid */}
      {festivals.length > 0 ? (
        <ul
          className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
                      className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[festival.status]}`}
                    >
                      {STATUS_LABELS[festival.status]}
                    </span>
                    <h2 className="text-base leading-snug font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {festival.name}
                    </h2>
                  </div>

                  {/* Meta rows */}
                  <dl className="flex flex-col gap-1 text-sm text-[#555] dark:text-[#aaa]">
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
        <div className="mb-12 rounded-xl border border-dashed border-gray-300 p-12 text-center text-[#555] dark:border-gray-600 dark:text-[#aaa]">
          <p className="text-sm">No approved festivals in {regionLabel} yet.</p>
        </div>
      )}

      {/* Subscribe CTA */}
      <section
        aria-labelledby="subscribe-heading"
        className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-8 dark:border-blue-900 dark:bg-blue-950/40"
      >
        <h2
          id="subscribe-heading"
          className="mb-1 text-lg font-semibold tracking-tight"
        >
          Get notified about {regionLabel} festivals
        </h2>
        <p className="mb-5 text-sm text-[#555] dark:text-[#aaa]">
          Be the first to hear about new and upcoming festivals in {regionLabel}
          . No spam — unsubscribe any time.
        </p>
        <form
          method="POST"
          action="/api/subscribe"
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input type="hidden" name="region" value={enumVal} />
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>
          <input
            id="subscribe-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#1a1a1a]"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
