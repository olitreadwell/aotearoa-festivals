import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { Artist } from "@/generated/prisma";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

export const metadata: Metadata = {
  title: "All Artists — Aotearoa Festivals",
  description: "Browse artists who have performed at New Zealand music festivals.",
};

interface PageProps {
  searchParams: Promise<{ genre?: string; city?: string; page?: string; sort?: string }>;
}

function SocialIcons({ artist }: { artist: Artist }) {
  return (
    <div className="flex gap-2">
      {artist.instagram && (
        <a href={`https://instagram.com/${artist.instagram.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-pink-500" title="Instagram">IG</a>
      )}
      {artist.soundcloud && (
        <a href={artist.soundcloud.startsWith("http") ? artist.soundcloud : `https://soundcloud.com/${artist.soundcloud}`} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-orange-500" title="SoundCloud">SC</a>
      )}
      {artist.raUrl && (
        <a href={artist.raUrl.startsWith("http") ? artist.raUrl : `https://ra.co/${artist.raUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-blue-500" title="Resident Advisor">RA</a>
      )}
    </div>
  );
}

export default async function ArtistsPage({ searchParams }: PageProps) {
  const { genre, city, page, sort } = await searchParams;
  const requestedPage = Math.max(1, Math.floor(Number(page)) || 1);
  const sortField = sort === "genre" || sort === "city" ? sort : "name";

  const where = {
    ...(genre ? { genre: { contains: genre, mode: "insensitive" as const } } : {}),
    ...(city ? { homeCity: { contains: city, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, artists] = await Promise.all([
    prisma.artist.count({ where }),
    prisma.artist.findMany({
      orderBy: { [sortField]: "asc" },
      where,
      skip: (requestedPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  function pageUrl(p: number): string {
    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    if (city) params.set("city", city);
    if (sort && sort !== "name") params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/artists?${qs}` : "/artists";
  }

  function sortUrl(field: string): string {
    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    if (city) params.set("city", city);
    if (field !== "name") params.set("sort", field);
    const qs = params.toString();
    return qs ? `/artists?${qs}` : "/artists";
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Artists" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Artists</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">{totalCount} artists</p>

      <div className="mt-6 mb-4 flex flex-wrap items-center gap-3">
        <form method="GET" className="flex gap-2">
          <input type="hidden" name="sort" value={sort ?? ""} />
          <input type="text" name="genre" defaultValue={genre ?? ""} placeholder="Genre..." className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
          <input type="text" name="city" defaultValue={city ?? ""} placeholder="City..." className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
          <button type="submit" className="rounded-md bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">Filter</button>
        </form>
        {(genre || city) && <Link href="/artists" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Clear</Link>}
        <div className="ml-auto flex items-center gap-1 text-xs">
          <span className="text-neutral-500">Sort:</span>
          {[{ label: "Name", field: "name" }, { label: "Genre", field: "genre" }, { label: "City", field: "city" }].map((s) => (
            <Link key={s.field} href={sortUrl(s.field)} className={`rounded px-2 py-0.5 ${sortField === s.field ? "bg-neutral-200 font-medium dark:bg-neutral-700" : "hover:underline"}`}>{s.label}</Link>
          ))}
        </div>
      </div>

      {artists.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No artists found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="py-2 pr-4 font-semibold">Name</th>
                <th className="py-2 pr-4 font-semibold">Genre</th>
                <th className="py-2 pr-4 font-semibold">City</th>
                <th className="py-2 font-semibold">Links</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((a) => (
                <tr key={a.id} className="border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/50">
                  <td className="py-2.5 pr-4"><Link href={`/artists/${a.slug}`} className="font-medium hover:underline">{a.name}</Link></td>
                  <td className="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">{a.genre || "—"}</td>
                  <td className="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">{a.homeCity || "—"}</td>
                  <td className="py-2.5"><SocialIcons artist={a} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={pageUrl} />
    </main>
  );
}
