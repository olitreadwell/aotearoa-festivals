"use client";

import { useState } from "react";
import Link from "next/link";
import type { PlanFestivalWithStatus } from "../page";
import {
  buildFestivalItinerary,
  type PlanStrategy,
} from "@/lib/plan-optimizer";
import { formatDateRange, formatRegion } from "@/lib/format";
import { useFestivalPlan } from "@/hooks/useFestivalPlan";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";
import { PlanStatusSelect } from "@/components/PlanStatusSelect";

const STRATEGY_LABELS: Record<PlanStrategy, string> = {
  most: "Most festivals",
  biggest: "Biggest lineups",
  indie: "Indie & undiscovered",
};

const REGION_LABELS: Record<"all" | "north" | "south", string> = {
  all: "All of NZ",
  north: "North Island",
  south: "South Island",
};

const inputClass =
  "h-9 rounded-md border border-neutral-300 bg-background px-2 text-xs text-foreground dark:border-neutral-700";

export default function SeasonPlanner({
  festivals,
}: {
  festivals: PlanFestivalWithStatus[];
}) {
  const [strategy, setStrategy] = useState<PlanStrategy>("most");
  const [region, setRegion] = useState<"all" | "north" | "south">("all");
  const [genre, setGenre] = useState("");
  const [maxCount, setMaxCount] = useState("");
  const [itinerary, setItinerary] = useState<PlanFestivalWithStatus[] | null>(
    null,
  );
  const { setStatus } = useFestivalPlan();

  function build() {
    const parsedMax = maxCount ? Number(maxCount) : undefined;
    setItinerary(
      buildFestivalItinerary(festivals, {
        strategy,
        region,
        genre: genre || undefined,
        maxCount: parsedMax && parsedMax > 0 ? parsedMax : undefined,
      }),
    );
  }

  function addAllToPlan() {
    if (!itinerary) return;
    for (const festival of itinerary) {
      setStatus(festival.slug, "planned");
    }
  }

  const firstDate = itinerary?.[0]?.startDate;
  const lastDate = itinerary?.[itinerary.length - 1]?.startDate;

  return (
    <section
      className="mb-10 rounded-xl border p-4"
      aria-labelledby="season-builder"
    >
      <h2 id="season-builder" className="text-lg font-bold">
        Build your season
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Pick a strategy and the builder returns a non-overlapping run of
        festivals, sorted by date.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Strategy
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as PlanStrategy)}
            className={inputClass}
          >
            {Object.entries(STRATEGY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium">
          Region
          <select
            value={region}
            onChange={(e) =>
              setRegion(e.target.value as "all" | "north" | "south")
            }
            className={inputClass}
          >
            {Object.entries(REGION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium">
          Genre
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. EDM, jazz, indie"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium">
          Max festivals
          <input
            type="number"
            min={1}
            value={maxCount}
            onChange={(e) => setMaxCount(e.target.value)}
            placeholder="Any"
            className={`${inputClass} w-20`}
          />
        </label>

        <button
          type="button"
          onClick={build}
          className="h-9 rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90"
        >
          Build itinerary
        </button>
      </div>

      {itinerary && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">
              {itinerary.length} festival{itinerary.length !== 1 ? "s" : ""}
              {firstDate && lastDate
                ? ` · ${formatDateRange(firstDate, lastDate)}`
                : ""}
            </p>
            {itinerary.length > 0 && (
              <button
                type="button"
                onClick={addAllToPlan}
                className="rounded-md border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
              >
                Add all to my plan
              </button>
            )}
          </div>
          {itinerary.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No festivals match those choices — try widening the region or
              genre.
            </p>
          ) : (
            <ul className="mt-3 divide-y">
              {itinerary.map((festival) => (
                <li
                  key={festival.slug}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/festivals/${festival.slug}`}
                      className="block truncate text-sm font-medium hover:underline"
                    >
                      {festival.name}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">
                      {[
                        formatDateRange(festival.startDate, festival.endDate) ??
                          festival.dateText,
                        festival.region ? formatRegion(festival.region) : null,
                        festival.genre,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <FestivalStatusBadge status={festival.status} />
                  <PlanStatusSelect slug={festival.slug} name={festival.name} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
