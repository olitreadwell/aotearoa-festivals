import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Artist } from "@/generated/prisma";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

interface PageProps {
  searchParams: Promise<{ genre?: string; city?: string; page?: string }>;
}

function SocialIcons({ artist }: { artist: Artist }) {
  return (
    <div className="mt-2 flex gap-2">
      {artist.instagram && (
        <a
          href={`https://instagram.com/${artist.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 transition-colors hover:text-pink-500"
          aria-label="Instagram"
          title="Instagram"
        >
          IG
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
          className="text-xs text-neutral-500 transition-colors hover:text-orange-500"
          aria-label="SoundCloud"
          title="SoundCloud"
        >
          SC
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
          className="text-xs text-neutral-500 transition-colors hover:text-blue-500"
          aria-label="Resident Advisor"
          title="Resident Advisor"
        >
          RA
        </a>
      )}
    </div>
  );
}

export default async function ArtistsPage({ searchParams }: PageProps) {
  const { genre, city, page } = await searchParams;

  const requestedPage = Math.max(1, Math.floor(Number(page)) || 1);

  const where = {
    genre: genre ? { contains: genre, mode: "insensitive" as const } : undefined,
    homeCity: city ? { contains: city, mode: "insensitive" as const } : undefined,
  };

  const totalCount = await prisma.artist.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const artists = await prisma.artist.findMany({
    orderBy: { name: "asc" },
    where,
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  function pageUrl(targetPage: number): string {
    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    if (city) params.set("city", city);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/artists?${qs}` : "/artists";
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Artists</h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          {totalCount} artist{totalCount !== 1 ? "s" : ""}
          {genre ? ` in ${genre}` : ""}
          {city ? ` from ${city}` : ""}
        </p>
      </div>

      {/* Filter bar */}
      <form method="GET" className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          name="genre"
          defaultValue={genre ?? ""}
          placeholder="Filter by genre..."
          className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        />
        <input
          type="text"
          name="city"
          defaultValue={city ?? ""}
          placeholder="Filter by city..."
          className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Filter
        </button>
        {(genre || city) && (
          <Link
            href="/artists"
            className="rounded-md border border-neutral-300 px-4 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Clear
          </Link>
        )}
      </form>

      {artists.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          No artists found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="group rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <h2 className="font-medium group-hover:underline">
                {artist.name}
              </h2>
              {artist.genre && (
                <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                  {artist.genre}
                </p>
              )}
              {artist.homeCity && (
                <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
                  {artist.homeCity}
                </p>
              )}
              <SocialIcons artist={artist} />
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-8 flex items-center justify-between"
        >
          {currentPage > 1 ? (
            <Link
              href={pageUrl(currentPage - 1)}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:border-neutral-500 dark:border-neutral-700"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
              Previous
            </span>
          )}

          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={pageUrl(currentPage + 1)}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:border-neutral-500 dark:border-neutral-700"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
              Next
            </span>
          )}
        </nav>
      )}
    </main>
  );
}
