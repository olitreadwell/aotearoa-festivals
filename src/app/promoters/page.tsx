import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

export const metadata: Metadata = {
  title: "All Promoters — Aotearoa Festivals",
  description: "Browse promoters and production companies behind New Zealand music festivals.",
};

export default async function PromotersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { page, sort } = await searchParams;
  const requestedPage = Math.max(1, Math.floor(Number(page)) || 1);
  const sortField = sort === "region" || sort === "genre" ? sort : "name";

  const [totalCount, promoters] = await Promise.all([
    prisma.promoter.count(),
    prisma.promoter.findMany({
      orderBy: { [sortField]: "asc" },
      skip: (requestedPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { _count: { select: { festivals: true } } },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  function pageUrl(p: number): string {
    const params = new URLSearchParams();
    if (sort && sort !== "name") params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    return params.toString() ? `/promoters?${params}` : "/promoters";
  }

  function sortUrl(field: string): string {
    const params = new URLSearchParams();
    if (field !== "name") params.set("sort", field);
    return params.toString() ? `/promoters?${params}` : "/promoters";
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Promoters" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Promoters</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">{totalCount} promoters</p>

      <div className="mt-6 mb-4 flex items-center gap-1 text-xs">
        <span className="text-neutral-500">Sort:</span>
        {[{ label: "Name", field: "name" }, { label: "Region", field: "region" }, { label: "Genre", field: "genre" }].map((s) => (
          <Link key={s.field} href={sortUrl(s.field)} className={`rounded px-2 py-0.5 ${sortField === s.field ? "bg-neutral-200 font-medium dark:bg-neutral-700" : "hover:underline"}`}>{s.label}</Link>
        ))}
      </div>

      {promoters.length === 0 ? (
        <p className="text-neutral-500">No promoters on record yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="py-2 pr-4 font-semibold">Name</th>
                <th className="py-2 pr-4 font-semibold">Region</th>
                <th className="py-2 pr-4 font-semibold">Genre</th>
                <th className="py-2 pr-4 font-semibold">Festivals</th>
                <th className="py-2 font-semibold">Links</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map((p) => (
                <tr key={p.id} className="border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/50">
                  <td className="py-2.5 pr-4">
                    <Link href={`/promoters/${p.slug}`} className="font-medium hover:underline">{p.name}</Link>
                  </td>
                  <td className="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">{p.region || "—"}</td>
                  <td className="py-2.5 pr-4 text-neutral-500 dark:text-neutral-400">{p.genreFocus || "—"}</td>
                  <td className="py-2.5 pr-4">{p._count.festivals}</td>
                  <td className="py-2.5">
                    <div className="flex gap-2">
                      {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-blue-500" title="Website">WEB</a>}
                      {p.instagram && <a href={`https://instagram.com/${p.instagram.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-pink-500" title="Instagram">IG</a>}
                      {p.facebook && <a href={p.facebook.startsWith("http") ? p.facebook : `https://facebook.com/${p.facebook}`} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-blue-600" title="Facebook">FB</a>}
                    </div>
                  </td>
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
