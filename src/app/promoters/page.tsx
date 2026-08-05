import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PromotersPage({ searchParams }: PageProps) {
  const { page } = await searchParams;

  const requestedPage = Math.max(1, Math.floor(Number(page)) || 1);

  const totalCount = await prisma.promoter.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const promoters = await prisma.promoter.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { festivals: true } } },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  function pageUrl(targetPage: number): string {
    const params = new URLSearchParams();
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/promoters?${qs}` : "/promoters";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Promoters</h1>
      <p className="mt-2 text-neutral-500">{totalCount} promoters</p>

      {promoters.length === 0 ? (
        <p className="mt-8 text-neutral-500">No promoters on record yet.</p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200 dark:divide-neutral-800">
          {promoters.map((promoter) => (
            <li key={promoter.id}>
              <Link
                href={`/promoters/${promoter.slug}`}
                className="-mx-2 flex items-center justify-between rounded px-2 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <div>
                  <span className="font-medium">{promoter.name}</span>
                  {(promoter.region ?? promoter.genreFocus) && (
                    <span className="ml-2 text-sm text-neutral-500">
                      {[promoter.region, promoter.genreFocus]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-sm text-neutral-400">
                  {promoter._count.festivals}{" "}
                  {promoter._count.festivals === 1 ? "festival" : "festivals"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
