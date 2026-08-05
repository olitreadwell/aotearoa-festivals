import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";

export const revalidate = 3600;

export async function generateStaticParams() {
  const artists = await prisma.artist.findMany({
    select: { slug: true },
  });
  return artists.map((artist) => ({ slug: artist.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await prisma.artist.findUnique({ where: { slug } });
  if (!artist) return { title: "Artist not found" };
  return {
    title: `${artist.name} — Aotearoa Festivals`,
    description:
      [artist.genre, artist.homeCity].filter(Boolean).join(" · ") || undefined,
  };
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const artist = await prisma.artist.findUnique({
    where: { slug },
    include: {
      lineups: {
        include: { festival: true },
        orderBy: [{ year: "desc" }],
      },
    },
  });

  if (!artist) notFound();

  // Group lineup entries by year
  const byYear = new Map<number, typeof artist.lineups>();
  for (const entry of artist.lineups) {
    const bucket = byYear.get(entry.year) ?? [];
    bucket.push(entry);
    byYear.set(entry.year, bucket);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Artists", href: "/artists" },
          { label: artist.name },
        ]}
      />

      {/* Header */}
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {artist.name}
      </h1>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
        {artist.genre && <span>{artist.genre}</span>}
        {artist.homeCity && <span>{artist.homeCity}</span>}
        {artist.crew && <span>Crew: {artist.crew}</span>}
      </div>

      {/* Social links */}
      {(artist.instagram || artist.soundcloud || artist.raUrl) && (
        <div className="mt-4 flex gap-4">
          {artist.instagram && (
            <a
              href={`https://instagram.com/${artist.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <span className="font-medium text-pink-500">IG</span>
              <span className="text-neutral-600 dark:text-neutral-300">
                Instagram
              </span>
            </a>
          )}
          {artist.soundcloud && (
            <a
              href={
                artist.soundcloud.startsWith("http")
                  ? artist.soundcloud
                  : `https://soundcloud.com/${artist.soundcloud}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <span className="font-medium text-orange-500">SC</span>
              <span className="text-neutral-600 dark:text-neutral-300">
                SoundCloud
              </span>
            </a>
          )}
          {artist.raUrl && (
            <a
              href={
                artist.raUrl.startsWith("http")
                  ? artist.raUrl
                  : `https://ra.co/${artist.raUrl}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <span className="font-medium text-blue-500">RA</span>
              <span className="text-neutral-600 dark:text-neutral-300">
                Resident Advisor
              </span>
            </a>
          )}
        </div>
      )}

      {/* Festival history */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Festival history</h2>
        {years.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            No festival appearances recorded yet.
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {years.map((year) => {
              const entries = byYear.get(year) ?? [];
              return (
                <div key={year}>
                  <h3 className="mb-2 text-sm font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                    {year}
                  </h3>
                  <ul className="space-y-2">
                    {entries.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex items-center gap-3 rounded-md border border-neutral-200 px-4 py-3 dark:border-neutral-800"
                      >
                        <Link
                          href={`/festivals/${entry.festival.slug}`}
                          className="flex-1 font-medium hover:underline"
                        >
                          {entry.festival.name}
                        </Link>
                        {entry.isHeadliner && (
                          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                            Headliner
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
