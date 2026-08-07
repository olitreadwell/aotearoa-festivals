import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FestivalStatus } from "@/generated/prisma";
import { formatRegion } from "@/lib/format";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Calendar — Aotearoa Festivals",
  description: "Upcoming New Zealand music festivals by month.",
};

export const dynamic = "force-dynamic";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default async function CalendarPage() {
  const festivals = await prisma.festival.findMany({
    where: {
      approved: true,
      status: { in: [FestivalStatus.ACTIVE, FestivalStatus.TBC] },
    },
    orderBy: { startDate: "asc" },
    select: {
      id: true, name: true, slug: true, startDate: true, endDate: true,
      location: true, genre: true, region: true,
    },
  });

  // Group by month
  const byMonth = new Map<string, typeof festivals>();
  const noDate: typeof festivals = [];

  for (const f of festivals) {
    if (!f.startDate) { noDate.push(f); continue; }
    const key = `${f.startDate.getFullYear()}-${f.startDate.getMonth()}`;
    const list = byMonth.get(key) ?? [];
    list.push(f);
    byMonth.set(key, list);
  }

  const sortedMonths = [...byMonth.keys()].sort();
  const total = festivals.filter(f => f.startDate).length;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calendar" }]} />

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Festival Calendar</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {total} upcoming festivals
          </p>
        </div>
        <a
          href="/calendar.ics"
          className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          Subscribe to calendar
        </a>
      </div>

      {sortedMonths.map((key) => {
        const [year, month] = key.split("-").map(Number);
        const items = byMonth.get(key)!;
        return (
          <section key={key} className="mb-10">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
              {MONTHS[month]} {year}
              <span className="ml-2 text-sm font-normal">({items.length})</span>
            </h2>
            <ul className="space-y-1.5">
              {items.map((f) => (
                <li key={f.id}>
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

      {noDate.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-neutral-500 dark:text-neutral-400">
            Date TBC
          </h2>
          <ul className="space-y-1.5">
            {noDate.map((f) => (
              <li key={f.id}>
                <Link
                  href={`/festivals/${f.slug}`}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
                >
                  <span className="font-medium">{f.name}</span>
                  <span className="text-xs text-neutral-400">{f.genre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sortedMonths.length === 0 && noDate.length === 0 && (
        <p className="text-neutral-500 dark:text-neutral-400">No upcoming festivals scheduled.</p>
      )}
    </main>
  );
}
