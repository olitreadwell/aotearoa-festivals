import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Artist } from "@/generated/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ genre?: string; city?: string }>;
}

function SocialIcons({ artist }: { artist: Artist }) {
  return (
    <div className="mt-2 flex gap-2">
      {artist.instagram && (
        <a
          href={`https://instagram.com/${artist.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-pink-500 transition-colors"
          aria-label="Instagram"
          title="Instagram"
        >
          IG
        </a>
      )}
      {artist.soundcloud && (
        <a
          href={artist.soundcloud.startsWith("http") ? artist.soundcloud : `https://soundcloud.com/${artist.soundcloud}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-orange-500 transition-colors"
          aria-label="SoundCloud"
          title="SoundCloud"
        >
          SC
        </a>
      )}
      {artist.raUrl && (
        <a
          href={artist.raUrl.startsWith("http") ? artist.raUrl : `https://ra.co/${artist.raUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-blue-500 transition-colors"
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
  const { genre, city } = await searchParams;

  const artists = await prisma.artist.findMany({
    orderBy: { name: "asc" },
    where: {
      genre: genre
        ? { contains: genre, mode: "insensitive" }
        : undefined,
      homeCity: city
        ? { contains: city, mode: "insensitive" }
        : undefined,
    },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Artists</h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          {artists.length} artist{artists.length !== 1 ? "s" : ""}
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
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <input
          type="text"
          name="city"
          defaultValue={city ?? ""}
          placeholder="Filter by city..."
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <button
          type="submit"
          className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Filter
        </button>
        {(genre || city) && (
          <Link
            href="/artists"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Clear
          </Link>
        )}
      </form>

      {artists.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No artists found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <h2 className="font-medium group-hover:underline">{artist.name}</h2>
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
    </main>
  );
}
