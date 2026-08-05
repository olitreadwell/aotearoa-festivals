import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { FestivalStatus } from "@/generated/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const promoters = await prisma.promoter.findMany({
      select: { slug: true },
    });
    return promoters.map((promoter) => ({ slug: promoter.slug }));
  } catch (error) {
    console.warn(
      "generateStaticParams: could not reach the database, falling back to on-demand rendering for /promoters/[slug]",
      error,
    );
    return [];
  }
}

const statusStyles: Record<FestivalStatus, string> = {
  ACTIVE:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  TBC: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  HIATUS:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  DEFUNCT: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  UNCONFIRMED:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const promoter = await prisma.promoter.findUnique({ where: { slug } });
  if (!promoter) return { title: "Promoter not found — Aotearoa Festivals" };
  return {
    title: `${promoter.name} — Aotearoa Festivals`,
    description: `Festivals and events run by ${promoter.name}${
      promoter.region ? ` in ${promoter.region}` : ""
    }.`,
  };
}

export default async function PromoterDetailPage({ params }: Props) {
  const { slug } = await params;

  const promoter = await prisma.promoter.findUnique({
    where: { slug },
    include: {
      festivals: {
        orderBy: [{ startDate: "desc" }, { name: "asc" }],
      },
    },
  });

  if (!promoter) notFound();

  const socialLinks: { label: string; href: string }[] = [];
  if (promoter.website)
    socialLinks.push({ label: "Website", href: promoter.website });
  if (promoter.instagram)
    socialLinks.push({ label: "Instagram", href: promoter.instagram });
  if (promoter.facebook)
    socialLinks.push({ label: "Facebook", href: promoter.facebook });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Promoters", href: "/promoters" },
          { label: promoter.name },
        ]}
      />

      <h1 className="text-3xl font-semibold tracking-tight">{promoter.name}</h1>

      {(promoter.region ?? promoter.genreFocus) && (
        <dl className="mt-4 space-y-1.5 text-sm">
          {promoter.region && (
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-medium text-neutral-800 dark:text-neutral-200">
                Region
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {promoter.region}
              </dd>
            </div>
          )}
          {promoter.genreFocus && (
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-medium text-neutral-800 dark:text-neutral-200">
                Genre
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {promoter.genreFocus}
              </dd>
            </div>
          )}
        </dl>
      )}

      {socialLinks.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-1 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Festivals{" "}
          <span className="text-base font-normal text-neutral-500">
            ({promoter.festivals.length})
          </span>
        </h2>

        {promoter.festivals.length === 0 ? (
          <p className="mt-4 text-neutral-500">No festivals on record yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
            {promoter.festivals.map((festival) => (
              <li key={festival.id}>
                <Link
                  href={`/festivals/${festival.slug}`}
                  className="-mx-2 flex items-center justify-between rounded px-2 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <div>
                    <span className="font-medium">{festival.name}</span>
                    {festival.dateText && (
                      <span className="ml-2 text-sm text-neutral-500">
                        {festival.dateText}
                      </span>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[festival.status]}`}
                  >
                    {festival.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
