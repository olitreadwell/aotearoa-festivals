import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FestivalStatusBadge } from '@/components/FestivalStatusBadge';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const artists = await prisma.artist.findMany({
      select: { slug: true },
    });
    return artists.map((artist) => ({ slug: artist.slug }));
  } catch (error) {
    console.warn(
      'generateStaticParams: could not reach the database, falling back to on-demand rendering for /artists/[slug]',
      error
    );
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await prisma.artist.findUnique({ where: { slug } });
  if (!artist) return { title: 'Artist not found' };
  return {
    title: `${artist.name} — Aotearoa Festivals`,
    description: [artist.genre, artist.homeCity].filter(Boolean).join(' · ') || undefined,
  };
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const artist = await prisma.artist.findUnique({
    where: { slug },
    include: {
      lineups: {
        include: { festival: true },
        orderBy: [{ year: 'desc' }],
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
          { label: 'Home', href: '/' },
          { label: 'Artists', href: '/artists' },
          { label: artist.name },
        ]}
      />

      {/* Header */}
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{artist.name}</h1>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground dark:text-muted-foreground">
        {artist.genre && <span>{artist.genre}</span>}
        {artist.homeCity && <span>{artist.homeCity}</span>}
        {artist.crew && <span>Crew: {artist.crew}</span>}
      </div>

      {/* Social links */}
      {(artist.instagram || artist.soundcloud || artist.raUrl) && (
        <div className="mt-4 flex gap-4">
          {artist.instagram && (
            <a
              href={`https://instagram.com/${artist.instagram.replace(/^@/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted dark:border-border dark:hover:bg-muted"
            >
              <span className="font-medium text-pink-500">IG</span>
              <span className="text-muted-foreground dark:text-muted-foreground">Instagram</span>
            </a>
          )}
          {artist.soundcloud && (
            <a
              href={
                artist.soundcloud.startsWith('http')
                  ? artist.soundcloud
                  : `https://soundcloud.com/${artist.soundcloud}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted dark:border-border dark:hover:bg-muted"
            >
              <span className="font-medium text-orange-500">SC</span>
              <span className="text-muted-foreground dark:text-muted-foreground">SoundCloud</span>
            </a>
          )}
          {artist.raUrl && (
            <a
              href={
                artist.raUrl.startsWith('http') ? artist.raUrl : `https://ra.co/${artist.raUrl}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted dark:border-border dark:hover:bg-muted"
            >
              <span className="font-medium text-primary">RA</span>
              <span className="text-muted-foreground dark:text-muted-foreground">
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
          <p className="mt-3 text-sm text-muted-foreground dark:text-muted-foreground">
            No festival appearances recorded yet.
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {years.map((year) => {
              const entries = byYear.get(year) ?? [];
              return (
                <div key={year}>
                  <h3 className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase dark:text-muted-foreground">
                    {year}
                  </h3>
                  <ul className="space-y-2">
                    {entries.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 dark:border-border"
                      >
                        <Link
                          href={`/festivals/${entry.festival.slug}`}
                          className="flex-1 font-medium hover:underline"
                        >
                          {entry.festival.name}
                        </Link>
                        <FestivalStatusBadge status={entry.festival.status} />
                        {entry.isHeadliner && (
                          <span className="shrink-0 rounded-full bg-kowhai-300/40 px-2.5 py-0.5 text-xs font-medium text-kowhai-0 dark:bg-kowhai-100/70 dark:text-kowhai-300">
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

      {/* Also played with — co-artists at same festivals */}
      <AlsoPlayedWith artistId={artist.id} />
    </main>
  );
}

async function AlsoPlayedWith({ artistId }: { artistId: string }) {
  const coArtists = await prisma.artist.findMany({
    where: {
      id: { not: artistId },
      lineups: {
        some: {
          festivalId: {
            in: (
              await prisma.lineupEntry.findMany({
                where: { artistId },
                select: { festivalId: true },
                distinct: ['festivalId'],
              })
            ).map((l) => l.festivalId),
          },
        },
      },
    },
    take: 8,
    select: { id: true, name: true, slug: true },
  });

  if (coArtists.length === 0) return null;

  return (
    <section className="mt-10 border-t pt-8 dark:border-border">
      <h2 className="text-lg font-semibold tracking-tight">Also played with</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {coArtists.map((a) => (
          <li key={a.id}>
            <a
              href={`/artists/${a.slug}`}
              className="inline-block rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground/30 dark:border-border dark:text-muted-foreground dark:hover:border-foreground/30"
            >
              {a.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
