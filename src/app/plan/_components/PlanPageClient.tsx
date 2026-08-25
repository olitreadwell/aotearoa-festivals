"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { PlanFestivalWithStatus } from "../page";
import { formatDateRange, formatRegion } from "@/lib/format";
import { groupFestivalsBySeason } from "@/lib/season";
import { useFestivalPlan } from "@/hooks/useFestivalPlan";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";
import { PlanStatusSelect } from "@/components/PlanStatusSelect";
import SeasonPlanner from "./SeasonPlanner";

function FestivalRow({ festival }: { festival: PlanFestivalWithStatus }) {
  return (
    <li className="flex items-center gap-3 py-3">
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
  );
}

function FestivalListSection({
  id,
  title,
  count,
  festivals,
  emptyText,
}: {
  id: string;
  title: string;
  count: number;
  festivals: PlanFestivalWithStatus[];
  emptyText?: string;
}) {
  return (
    <section className="mb-10" aria-labelledby={id}>
      <h2 id={id} className="mb-3 border-b pb-2 text-lg font-bold">
        {title}
        <span className="ml-2 text-xs font-normal text-muted-foreground">
          {count} festival{count !== 1 ? "s" : ""}
        </span>
      </h2>
      {festivals.length === 0 && emptyText ? (
        <p className="py-4 text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="divide-y">
          {festivals.map((festival) => (
            <FestivalRow key={festival.slug} festival={festival} />
          ))}
        </ul>
      )}
    </section>
  );
}

function byStartDate(a: PlanFestivalWithStatus, b: PlanFestivalWithStatus) {
  return (
    (a.startDate?.getTime() ?? Number.MAX_SAFE_INTEGER) -
    (b.startDate?.getTime() ?? Number.MAX_SAFE_INTEGER)
  );
}

export default function PlanPageClient({
  festivals,
}: {
  festivals: PlanFestivalWithStatus[];
}) {
  const { statusOf } = useFestivalPlan();
  const seasons = useMemo(() => groupFestivalsBySeason(festivals), [festivals]);
  const tbc = festivals.filter((f) => !f.startDate);

  const planned = festivals
    .filter((f) => statusOf(f.slug) === "planned")
    .sort(byStartDate);
  const interested = festivals
    .filter((f) => statusOf(f.slug) === "interested")
    .sort(byStartDate);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Plan your festival season
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Mark festivals <strong>interested</strong> or <strong>planned</strong>
          , then use the season builder to generate a non-overlapping run that
          fits your strategy. Your plan is stored in this browser.
        </p>
      </header>

      <SeasonPlanner festivals={festivals} />

      <FestivalListSection
        id="my-plan"
        title="My plan"
        count={planned.length}
        festivals={planned}
        emptyText="Nothing planned yet — mark festivals as Planned below and they'll line up here by date."
      />

      <FestivalListSection
        id="interested"
        title="Interested"
        count={interested.length}
        festivals={interested}
        emptyText="Nothing marked interested yet."
      />

      {seasons.map(({ season, festivals: group }) => (
        <FestivalListSection
          key={season.label}
          id={`season-${season.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          title={season.label}
          count={group.length}
          festivals={group}
        />
      ))}

      <FestivalListSection
        id="dates-tbc"
        title="Dates TBC"
        count={tbc.length}
        festivals={tbc}
        emptyText="No upcoming festivals without dates yet."
      />
    </main>
  );
}
