"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { PlanFestivalWithStatus } from "../page";
import { formatDateRange, formatRegion } from "@/lib/format";
import { groupFestivalsBySeason } from "@/lib/season";
import { useFestivalPlan } from "@/hooks/useFestivalPlan";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";
import { PlanStatusSelect } from "@/components/PlanStatusSelect";
import { Reveal } from "@/components/Reveal";
import SeasonPlanner from "./SeasonPlanner";

function FestivalRow({ festival }: { festival: PlanFestivalWithStatus }) {
  return (
    <li className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted/60 sm:px-4">
      <div className="min-w-0 flex-1">
        <Link
          href={`/festivals/${festival.slug}`}
          className="block truncate text-sm font-semibold tracking-tight hover:underline"
        >
          {festival.name}
        </Link>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
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
    <Reveal>
      <section className="mb-16" aria-labelledby={id}>
        <div className="mb-4 flex items-baseline gap-3 border-b border-border pb-3">
          <h2 id={id} className="text-xl font-bold tracking-tight">
            {title}
          </h2>
          <span className="tabular text-xs text-muted-foreground">{count}</span>
        </div>
        {festivals.length === 0 && emptyText ? (
          <p className="max-w-prose py-4 text-sm text-muted-foreground">
            {emptyText}
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {festivals.map((festival) => (
              <FestivalRow key={festival.slug} festival={festival} />
            ))}
          </ul>
        )}
      </section>
    </Reveal>
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
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mb-14 max-w-3xl">
        <p className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Festival season planning
        </p>
        <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          Plan your festival season
        </h1>
        <p className="mt-4 max-w-prose text-pretty text-base leading-relaxed text-muted-foreground">
          Mark festivals{" "}
          <strong className="font-semibold text-foreground">interested</strong>{" "}
          or <strong className="font-semibold text-foreground">planned</strong>,
          then use the season builder to generate a non-overlapping run that
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
