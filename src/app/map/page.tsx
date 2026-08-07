import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { REGION_LABELS, formatRegion } from "@/lib/format";
import type { Region } from "@/generated/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "NZ Festival Map — Aotearoa Festivals",
  description:
    "Explore New Zealand music festivals by region on an interactive map.",
};

export const revalidate = 3600;

// SVG path data for the 16 regions of New Zealand (simplified polygons).
// Each region is an approximate shape positioned relative to others.
// Coordinates are in a 600x800 viewBox covering the NZ landmass.
const REGION_PATHS: Record<Region, string> = {
  NORTHLAND:
    "M200,20 L280,20 L300,60 L290,100 L240,120 L180,110 L160,80 L170,50 Z",
  AUCKLAND:
    "M170,50 L180,110 L240,120 L250,160 L220,190 L170,180 L140,140 L150,90 Z",
  WAIKATO:
    "M220,190 L250,160 L300,180 L320,230 L290,270 L250,280 L210,260 L200,220 Z",
  BAY_OF_PLENTY:
    "M320,230 L300,180 L360,160 L410,180 L420,220 L390,260 L340,270 Z",
  GISBORNE: "M410,180 L440,170 L470,200 L460,250 L420,220 Z",
  HAWKES_BAY:
    "M390,260 L420,220 L460,250 L490,300 L470,340 L420,350 L380,320 Z",
  TARANAKI:
    "M150,280 L200,260 L220,300 L210,340 L180,360 L140,340 L130,300 Z",
  MANAWATU_WHANGANUI:
    "M250,280 L290,270 L340,300 L350,350 L310,380 L260,370 L230,340 Z",
  WELLINGTON:
    "M260,370 L310,380 L350,350 L380,380 L350,430 L300,440 L260,420 Z",
  WAIRARAPA:
    "M380,380 L420,350 L470,340 L500,370 L510,420 L460,440 L420,430 Z",
  TASMAN:
    "M100,360 L140,340 L180,360 L190,400 L170,440 L130,450 L90,420 Z",
  NELSON: "M190,400 L210,340 L230,420 L210,460 L170,440 Z",
  MARLBOROUGH:
    "M230,420 L260,370 L300,440 L340,430 L380,440 L360,470 L300,480 L250,460 Z",
  WEST_COAST:
    "M80,450 L130,450 L170,440 L210,460 L180,520 L130,550 L80,540 L60,490 Z",
  CANTERBURY:
    "M210,460 L230,420 L300,480 L360,470 L380,520 L350,580 L280,600 L210,580 L180,520 Z",
  OTAGO:
    "M180,520 L210,580 L280,600 L300,650 L260,700 L200,680 L150,620 L130,550 Z",
  SOUTHLAND:
    "M130,550 L150,620 L200,680 L220,740 L170,760 L100,740 L60,680 L80,610 Z",
  ONLINE: "",
};

function getRegionColor(count: number, max: number): string {
  if (count === 0) return "fill-neutral-100 dark:fill-neutral-800";
  const ratio = count / max;
  if (ratio > 0.8) return "fill-emerald-600 dark:fill-emerald-500";
  if (ratio > 0.6) return "fill-emerald-500 dark:fill-emerald-400";
  if (ratio > 0.4) return "fill-emerald-400 dark:fill-emerald-300";
  if (ratio > 0.2) return "fill-emerald-300 dark:fill-emerald-200";
  return "fill-emerald-200 dark:fill-emerald-400/30";
}

export default async function MapPage() {
  const counts = await prisma.festival.groupBy({
    by: ["region"],
    where: { approved: true, region: { not: null } },
    _count: { id: true },
  });

  const regionCounts = new Map<Region, number>();
  for (const row of counts) {
    if (row.region) regionCounts.set(row.region, row._count.id);
  }

  const maxCount = Math.max(1, ...regionCounts.values());

  // Filter to regions that are on the map
  const regions = (Object.keys(REGION_PATHS) as Region[]).filter(
    (r) => r !== "ONLINE" && REGION_PATHS[r],
  );

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Map" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          NZ Festival Map
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Click a region to browse festivals. Darker green = more festivals.
        </p>
      </header>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 600 800"
          className="mx-auto w-full max-w-[600px]"
          role="img"
          aria-label="Map of New Zealand showing festival counts by region"
        >
          {/* Ocean background */}
          <rect width="600" height="800" className="fill-transparent" />

          {regions.map((region) => {
            const count = regionCounts.get(region) ?? 0;
            return (
              <Link
                key={region}
                href={`/regions/${region.toLowerCase()}`}
                className="cursor-pointer"
              >
                <title>
                  {formatRegion(region)}: {count} festival
                  {count !== 1 ? "s" : ""}
                </title>
                <path
                  d={REGION_PATHS[region]}
                  className={`${getRegionColor(count, maxCount)} stroke-neutral-300 stroke-[1.5] dark:stroke-neutral-600 transition-colors hover:fill-emerald-700 dark:hover:fill-emerald-600`}
                />
              </Link>
            );
          })}

          {/* Labels for key regions */}
          {regions.map((region) => {
            const count = regionCounts.get(region) ?? 0;
            const pathD = REGION_PATHS[region];
            // Approximate center from path bounding box
            const nums = pathD.match(/[\d.]+/g)?.map(Number) ?? [];
            let cx = 0,
              cy = 0;
            for (let i = 0; i < nums.length; i += 2) {
              cx += nums[i];
              cy += nums[i + 1];
            }
            cx /= nums.length / 2;
            cy /= nums.length / 2;

            return (
              <text
                key={`label-${region}`}
                x={cx}
                y={cy}
                textAnchor="middle"
                className={`pointer-events-none fill-current text-[10px] font-semibold ${
                  count > 0
                    ? "text-white dark:text-black"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {REGION_LABELS[region]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-200 dark:bg-emerald-400/30" />
          1–2
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-400 dark:bg-emerald-300" />
          3–4
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500 dark:bg-emerald-400" />
          5–6
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
          7+
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-neutral-100 dark:bg-neutral-800" />
          None
        </span>
      </div>

      {/* Region list for accessibility */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">All regions</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {regions.map((region) => {
            const count = regionCounts.get(region) ?? 0;
            return (
              <Link
                key={region}
                href={`/regions/${region.toLowerCase()}`}
                className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
              >
                <span>{REGION_LABELS[region]}</span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
