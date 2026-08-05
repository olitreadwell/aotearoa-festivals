import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Festival, Artist, Promoter } from "@/generated/prisma";
import { FestivalStatus } from "@/generated/prisma";
import { formatRegion, formatStatus } from "@/lib/format";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Types returned from the query
// ---------------------------------------------------------------------------

type LineupEntryWithArtist = {
  id: string;
  year: number;
  isHeadliner: boolean;
  artist: Artist;
};

type FestivalWithRelations = Festival & {
  promoter: Promoter | null;
  lineups: LineupEntryWithArtist[];
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const festival = await prisma.festival.findUnique({
    where: { slug },
    select: { name: true },
  });
  if (!festival) return { title: "Festival Not Found" };
  return { title: `${festival.name} — Aotearoa Festivals` };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function FestivalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const festival = (await prisma.festival.findUnique({
    where: { slug },
    include: {
      promoter: true,
      lineups: {
        include: { artist: true },
        orderBy: [{ isHeadliner: "desc" }, { artist: { name: "asc" } }],
      },
    },
  })) as FestivalWithRelations | null;

  if (!festival) {
    notFound();
  }

  const { label: statusLabel, className: statusClass } = formatStatus(
    festival.status,
  );

  // Group lineup entries by year, descending
  const lineupByYear = new Map<number, LineupEntryWithArtist[]>();
  for (const entry of festival.lineups) {
    const list = lineupByYear.get(entry.year) ?? [];
    list.push(entry);
    lineupByYear.set(entry.year, list);
  }
  const sortedYears = Array.from(lineupByYear.keys()).sort((a, b) => b - a);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/festivals"
        className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
      >
        <span aria-hidden="true">←</span> All festivals
      </Link>

      {/* Header */}
      <div className="mb-2 flex flex-wrap items-start gap-3">
        <h1 className="text-3xl leading-tight font-semibold tracking-tight">
          {festival.name}
        </h1>
        <span
          className={`inline-flex items-center self-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Meta row */}
      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
        {festival.region && (
          <div>
            <dt className="font-medium text-neutral-500 dark:text-neutral-400">
              Region
            </dt>
            <dd className="mt-0.5">{formatRegion(festival.region)}</dd>
          </div>
        )}
        {festival.location && (
          <div>
            <dt className="font-medium text-neutral-500 dark:text-neutral-400">
              Location
            </dt>
            <dd className="mt-0.5">{festival.location}</dd>
          </div>
        )}
        {festival.genre && (
          <div>
            <dt className="font-medium text-neutral-500 dark:text-neutral-400">
              Genre
            </dt>
            <dd className="mt-0.5">{festival.genre}</dd>
          </div>
        )}
        {festival.dateText && (
          <div>
            <dt className="font-medium text-neutral-500 dark:text-neutral-400">
              Dates
            </dt>
            <dd className="mt-0.5">{festival.dateText}</dd>
          </div>
        )}
        {festival.costText && (
          <div>
            <dt className="font-medium text-neutral-500 dark:text-neutral-400">
              Cost
            </dt>
            <dd className="mt-0.5">{festival.costText}</dd>
          </div>
        )}
        {festival.website && (
          <div>
            <dt className="font-medium text-neutral-500 dark:text-neutral-400">
              Website
            </dt>
            <dd className="mt-0.5">
              <a
                href={festival.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
              >
                {festival.website.replace(/^https?:\/\//, "")}
                <span aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
        )}
      </dl>

      {/* Notes */}
      {festival.notes && (
        <div className="mt-8 rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm leading-relaxed text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300">
          {festival.notes}
        </div>
      )}

      {/* Promoter */}
      {festival.promoter && (
        <section className="mt-10">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">
            Promoter
          </h2>
          <a
            href={`/promoters/${festival.promoter.slug}`}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {festival.promoter.name}
          </a>
        </section>
      )}

      {/* Lineup */}
      {sortedYears.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-lg font-semibold tracking-tight">Lineup</h2>
          <div className="space-y-8">
            {sortedYears.map((year) => {
              const entries = lineupByYear.get(year)!;
              const headliners = entries.filter((e) => e.isHeadliner);
              const others = entries.filter((e) => !e.isHeadliner);
              return (
                <div key={year}>
                  <h3 className="mb-3 text-base font-medium text-neutral-600 dark:text-neutral-400">
                    {year}
                  </h3>
                  {headliners.length > 0 && (
                    <div className="mb-3">
                      <p className="mb-1.5 text-xs tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                        Headliners
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {headliners.map((entry) => (
                          <li key={entry.id}>
                            <a
                              href={`/artists/${entry.artist.slug}`}
                              className="inline-block rounded-full bg-neutral-900 px-3 py-1 text-sm font-medium text-neutral-100 transition-opacity hover:opacity-80 dark:bg-neutral-100 dark:text-neutral-900"
                            >
                              {entry.artist.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {others.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {others.map((entry) => (
                        <li key={entry.id}>
                          <a
                            href={`/artists/${entry.artist.slug}`}
                            className="inline-block rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 transition-colors hover:border-neutral-500 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-400"
                          >
                            {entry.artist.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
