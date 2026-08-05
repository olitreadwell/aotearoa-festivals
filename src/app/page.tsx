import { prisma } from "@/lib/prisma";

// Counts change as festivals/promoters are added; also keeps `next build`
// from trying to prerender this against the database at build time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [festivalCount, promoterCount, artistCount] = await Promise.all([
    prisma.festival.count(),
    prisma.promoter.count(),
    prisma.artist.count(),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Aotearoa Festivals
      </h1>
      <p className="mt-2 text-neutral-500">
        {festivalCount} festivals · {promoterCount} promoters · {artistCount}{" "}
        artists
      </p>
    </main>
  );
}
