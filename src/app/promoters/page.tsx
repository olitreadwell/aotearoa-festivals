import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PromotersPage() {
  const promoters = await prisma.promoter.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { festivals: true } } },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Promoters</h1>
      <p className="mt-2 text-neutral-500">{promoters.length} promoters</p>

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
    </main>
  );
}
