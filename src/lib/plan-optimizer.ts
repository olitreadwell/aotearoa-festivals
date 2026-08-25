// Season itinerary builder: picks a non-overlapping run of festivals that
// best matches a strategy (most festivals, biggest lineups, or indie picks).

import type { Region } from "@/generated/prisma";

export type PlanStrategy = "most" | "biggest" | "indie";

export interface PlanFestival {
  slug: string;
  name: string;
  region: Region | null;
  genre: string | null;
  startDate: Date | null;
  endDate: Date | null;
  lineupCount: number;
}

export interface PlannerOptions {
  strategy: PlanStrategy;
  region: "all" | "north" | "south";
  genre?: string;
  maxCount?: number;
}

export const NORTH_ISLAND_REGIONS: Region[] = [
  "NORTHLAND",
  "AUCKLAND",
  "WAIKATO",
  "BAY_OF_PLENTY",
  "GISBORNE",
  "HAWKES_BAY",
  "TARANAKI",
  "MANAWATU_WHANGANUI",
  "WELLINGTON",
  "WAIRARAPA",
];

export const SOUTH_ISLAND_REGIONS: Region[] = [
  "TASMAN",
  "NELSON",
  "MARLBOROUGH",
  "WEST_COAST",
  "CANTERBURY",
  "OTAGO",
  "SOUTHLAND",
];

function regionMatches(
  region: Region | null,
  filter: PlannerOptions["region"],
): boolean {
  if (filter === "all") return true;
  if (!region) return false;
  const set = filter === "north" ? NORTH_ISLAND_REGIONS : SOUTH_ISLAND_REGIONS;
  return set.includes(region);
}

export function filterFestivalsForPlanner<T extends PlanFestival>(
  festivals: T[],
  options: PlannerOptions,
): T[] {
  const genre = options.genre?.trim().toLowerCase();
  return festivals.filter(
    (f) =>
      f.startDate !== null &&
      regionMatches(f.region, options.region) &&
      (!genre || (f.genre ?? "").toLowerCase().includes(genre)),
  );
}

function festivalWeight(
  festival: PlanFestival,
  strategy: PlanStrategy,
): number {
  switch (strategy) {
    case "most":
      return 1;
    case "biggest":
      return festival.lineupCount + 1;
    case "indie":
      return 1 / (1 + festival.lineupCount);
  }
}

function festivalEnd(festival: PlanFestival): number {
  const start = festival.startDate!.getTime();
  return festival.endDate
    ? festival.endDate.getTime()
    : start + 24 * 60 * 60 * 1000;
}

export function buildFestivalItinerary<T extends PlanFestival>(
  festivals: T[],
  options: PlannerOptions,
): T[] {
  const candidates = filterFestivalsForPlanner(festivals, options);
  if (candidates.length === 0) return [];

  const sorted = [...candidates].sort(
    (a, b) => festivalEnd(a) - festivalEnd(b),
  );
  const n = sorted.length;

  // p(i): last festival that ends before festival i starts.
  const p = new Array<number>(n).fill(-1);
  for (let i = 0; i < n; i++) {
    const start = sorted[i].startDate!.getTime();
    for (let j = i - 1; j >= 0; j--) {
      if (festivalEnd(sorted[j]) <= start) {
        p[i] = j;
        break;
      }
    }
  }

  const dp = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++) {
    const weight = festivalWeight(sorted[i], options.strategy);
    const withCurrent = weight + (p[i] >= 0 ? dp[p[i]] : 0);
    const withoutCurrent = i > 0 ? dp[i - 1] : 0;
    dp[i] = Math.max(withCurrent, withoutCurrent);
  }

  const itinerary: T[] = [];
  let i = n - 1;
  while (i >= 0) {
    const weight = festivalWeight(sorted[i], options.strategy);
    const withCurrent = weight + (p[i] >= 0 ? dp[p[i]] : 0);
    if (withCurrent > (i > 0 ? dp[i - 1] : 0)) {
      itinerary.push(sorted[i]);
      i = p[i];
    } else {
      i--;
    }
  }

  let result = itinerary.reverse();
  if (options.maxCount && result.length > options.maxCount) {
    result = [...result]
      .sort(
        (a, b) =>
          festivalWeight(b, options.strategy) -
          festivalWeight(a, options.strategy),
      )
      .slice(0, options.maxCount)
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime());
  }
  return result;
}
