export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { Region } from "@/generated/prisma";
import { SearchClient } from "./_components/SearchClient";
import type { SearchItem } from "./_components/SearchClient";
import Breadcrumbs from "@/components/Breadcrumbs";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Search | Aotearoa Festivals",
};

// ---------------------------------------------------------------------------
// Region display helper (same map used in festivals/page.tsx)
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

function formatRegion(region: Region | null | undefined): string | null {
  if (!region) return null;
  return REGION_LABELS[region] ?? region;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function SearchPage() {
  // Fetch all three entity types in parallel
  const [festivals, artists, promoters] = await Promise.all([
    prisma.festival.findMany({
      where: { approved: true },
      select: {
        id: true,
        name: true,
        slug: true,
        genre: true,
        region: true,
        status: true,
      },
      orderBy: { name: "asc" },
    }),
    prisma.artist.findMany({
      select: { id: true, name: true, slug: true, genre: true, homeCity: true },
      orderBy: { name: "asc" },
    }),
    prisma.promoter.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        region: true,
        genreFocus: true,
      },
      orderBy: { name: "asc" },
    }),
  ]);

  // Map to SearchItem
  const festivalItems: SearchItem[] = festivals.map((f) => ({
    type: "festival",
    name: f.name,
    slug: f.slug,
    subtitle: [f.genre, formatRegion(f.region)].filter(Boolean).join(" · "),
  }));

  const artistItems: SearchItem[] = artists.map((a) => ({
    type: "artist",
    name: a.name,
    slug: a.slug,
    subtitle: [a.genre, a.homeCity].filter(Boolean).join(" · "),
  }));

  const promoterItems: SearchItem[] = promoters.map((p) => ({
    type: "promoter",
    name: p.name,
    slug: p.slug,
    subtitle: [p.region, p.genreFocus].filter(Boolean).join(" · "),
  }));

  const allItems: SearchItem[] = [
    ...festivalItems,
    ...artistItems,
    ...promoterItems,
  ];

  return (
    <main className="site-content">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-2">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="mt-1 text-sm text-[#555] dark:text-[#aaa]">
          Instantly search across all festivals, artists, and promoters.
        </p>
      </div>
      <SearchClient items={allItems} />
    </main>
  );
}
