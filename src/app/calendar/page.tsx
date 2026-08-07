import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FestivalStatus, Region } from "@/generated/prisma";
import { formatRegion, STATUS_LABELS } from "@/lib/format";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";

export const metadata: Metadata = {
  title: "Calendar — Aotearoa Festivals",
  description: "New Zealand music festivals by month — past and upcoming.",
};

export const dynamic = "force-dynamic";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; status?: string; genre?: string }>;
}) {
  const { region, status, genre } = await searchParams;
  const validRegion = region && Object.values(Region).includes(region as Region) ? (region as Region) : undefined;
  const validStatus = status && Object.values(FestivalStatus).includes(status as FestivalStatus) ? (status as FestivalStatus) : undefined;

  const festivals = await prisma.festival.findMany({
    where: {
      approved: true,
      startDate: { not: null },
      ...(validRegion ? { region: validRegion } : {}),
      ...(validStatus ? { status: validStatus } : {}),
      ...(genre ? { genre: { contains: genre, mode: "insensitive" as const } } : {}),
    },
    orderBy: { startDate: "asc" },
    select: {
      id: true, name: true, slug: true, startDate: true, endDate: true,
      location: true, genre: true, region: true, status: true,
    },
  });

  const total = festivals.length;
  const now = new Date();
  const upcoming = festivals.filter(f => f.startDate! >= now);
  const past = festivals.filter(f => f.startDate! < now);

  // Group by year-month
  const byMonth = new Map<string, typeof festivals>();
  for (const f of festivals) {
    const key = `${f.startDate!.getFullYear()}-${f.startDate!.getMonth()}`;
    const list = byMonth.get(key) ?? [];
    list.push(f);
    byMonth.set(key, list);
  }
  const sortedMonths = [...byMonth.keys()].sort();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calendar" }]} />

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Festival Calendar</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {total} festivals · {upcoming.length} upcoming · {past.length} past
          </p>
        </div>
        <a
          href="/calendar.ics"
          className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          Subscribe to calendar
        </a>
      </div>

      {/* Filter bar */}
      <form method="GET" className="mb-6 flex flex-wrap items-center gap-3">
        <select name="region" defaultValue={validRegion ?? ""} className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-[#1a1a1a]">
          <option value="">All regions</option>
          {Object.values(Region).filter(r => r !== "ONLINE").map(r => (
            <option key={r} value={r}>{formatRegion(r)}</option>
          ))}
        </select>
        <select name="status" defaultValue={validStatus ?? ""} className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-[#1a1a1a]">
          <option value="">All statuses</option>
          {Object.values(FestivalStatus).map(s => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        <input type="text" name="genre" defaultValue={genre ?? ""} placeholder="Genre..." className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-[#1a1a1a] w-28" />
        <button type="submit" className="rounded-md bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">Filter</button>
        {(validRegion || validStatus || genre) && <Link href="/calendar" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Clear</Link>}
      </form>

      {sortedMonths.map((key) => {
        const [year, month] = key.split("-").map(Number);
        const items = byMonth.get(key)!;
        const isPast = new Date(year, month + 1, 1) < new Date();
        return (
          <section key={key} className={`mb-8 ${isPast ? "opacity-70" : ""}`}>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
              {MONTHS[month]} {year}
              <span className="ml-2 text-sm font-normal">({items.length})</span>
              {isPast && <span className="ml-2 text-xs text-neutral-400">· past</span>}
            </h2>
            <ul className="space-y-1.5">
              {items.map((f) => (
                <li key={f.id} className={f.startDate! < new Date() ? "opacity-60" : ""}>
                  <Link
                    href={`/festivals/${f.slug}`}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
                  >
                    <div>
                      <span className="font-medium">{f.name}</span>
                      {f.location && (
                        <span className="ml-3 text-neutral-400 dark:text-neutral-500">
                          {f.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                      {f.region && <span>{formatRegion(f.region)}</span>}
                      {f.startDate && (
                        <span>{f.startDate.toLocaleDateString("en-NZ", { day: "numeric", month: "short" })}</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {sortedMonths.length === 0 && (
        <p className="text-neutral-500 dark:text-neutral-400">No festivals match your filters.</p>
      )}
    </main>
  );
}
