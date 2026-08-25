export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Region } from "@/generated/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Browse by Region — Aotearoa Festivals",
  description:
    "Find New Zealand music festivals by region. From Northland to Southland.",
};
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

/** Convert a Region enum key to URL slug: BAY_OF_PLENTY → "bay-of-plenty" */
function regionToSlug(region: Region): string {
  return region.toLowerCase().replace(/_/g, "-");
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function RegionsPage() {
  const groups = await prisma.festival.groupBy({
    by: ["region"],
    where: { approved: true },
    _count: { id: true },
  });

  // Filter out null regions, sort by count descending
  const rows = groups
    .filter((g) => g.region !== null)
    .sort((a, b) => b._count.id - a._count.id) as Array<{
    region: Region;
    _count: { id: number };
  }>;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Regions" }]}
      />

      {/* Hero */}
      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Browse NZ festivals by region
        </h1>
        <p className="text-sm text-[#555] dark:text-[#aaa]">
          Explore approved festivals organised by New Zealand region.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="text-sm text-[#555] dark:text-[#aaa]">
          No regions with approved festivals found.
        </p>
      ) : (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {rows.map(({ region, _count }) => (
            <li key={region}>
              <Link
                href={`/regions/${regionToSlug(region)}`}
                className="group flex h-full items-center justify-between overflow-hidden rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-150 hover:border-blue-400 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-[#111] dark:hover:border-blue-500"
              >
                <div>
                  <p className="text-base leading-snug font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {REGION_LABELS[region]}
                  </p>
                  <p className="mt-0.5 text-sm text-[#555] dark:text-[#aaa]">
                    {_count.id === 1 ? "1 festival" : `${_count.id} festivals`}
                  </p>
                </div>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
