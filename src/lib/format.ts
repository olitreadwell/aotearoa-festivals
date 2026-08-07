import { FestivalStatus, Region } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// Region labels
// ---------------------------------------------------------------------------

export const REGION_LABELS: Record<Region, string> = {
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

export function formatRegion(r: Region | null | undefined): string {
  if (!r) return "Unknown region";
  return REGION_LABELS[r] ?? r;
}

// ---------------------------------------------------------------------------
// Status labels and badge classes
// ---------------------------------------------------------------------------

export const STATUS_LABELS: Record<FestivalStatus, string> = {
  ACTIVE: "Upcoming",
  TBC: "Dates TBC",
  HIATUS: "On break",
  DEFUNCT: "Ended",
  UNCONFIRMED: "Unconfirmed",
};

export const STATUS_BADGE_CLASS: Record<FestivalStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  TBC: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  HIATUS: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  DEFUNCT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  UNCONFIRMED:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

export function formatStatus(s: FestivalStatus): {
  label: string;
  className: string;
} {
  return { label: STATUS_LABELS[s], className: STATUS_BADGE_CLASS[s] };
}

// ---------------------------------------------------------------------------
// Slug generation — matches the formula used in prisma/seed.ts
// ---------------------------------------------------------------------------

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
