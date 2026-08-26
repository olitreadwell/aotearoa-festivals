import type { Metadata } from "next";
import { Region } from "@/generated/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe — Aotearoa Festivals",
  description: "Get notified about upcoming festivals in your region.",
};

const REGION_LABELS: Record<Region, string> = {
  NORTHLAND: "Northland",
  AUCKLAND: "Auckland",
  WAIKATO: "Waikato",
  BAY_OF_PLENTY: "Bay of Plenty",
  GISBORNE: "Gisborne",
  HAWKES_BAY: "Hawke's Bay",
  TARANAKI: "Taranaki",
  MANAWATU_WHANGANUI: "Manawatū-Whanganui",
  WELLINGTON: "Wellington",
  WAIRARAPA: "Wairarapa",
  TASMAN: "Tasman",
  NELSON: "Nelson",
  MARLBOROUGH: "Marlborough",
  WEST_COAST: "West Coast",
  CANTERBURY: "Canterbury",
  OTAGO: "Otago",
  SOUTHLAND: "Southland",
  ONLINE: "Online",
};

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;

  const preselectedRegion =
    region && Object.values(Region).includes(region as Region)
      ? (region as Region)
      : undefined;

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            Subscribe to Festival Updates
          </h1>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            Get notified about upcoming festivals in your region. We&apos;ll
            only email you with relevant updates — no spam.
          </p>
        </header>

        <form
          method="POST"
          action="/api/subscribe"
          className="flex flex-col gap-6"
        >
          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-foreground dark:text-foreground"
            >
              Email address{" "}
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/25 focus:outline-none dark:border-border dark:bg-card dark:placeholder:text-muted-foreground"
            />
          </div>

          {/* Region field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="region"
              className="text-sm font-semibold text-foreground dark:text-foreground"
            >
              Region{" "}
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            </label>
            <select
              id="region"
              name="region"
              required
              defaultValue={preselectedRegion ?? ""}
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/25 focus:outline-none dark:border-border dark:bg-card"
            >
              <option value="" disabled>
                Select a region…
              </option>
              {Object.values(Region).map((r) => (
                <option key={r} value={r}>
                  {REGION_LABELS[r]}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary focus:ring-2 focus:ring-primary/25 focus:ring-offset-2 focus:outline-none"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-xs text-[#888] dark:text-[#666]">
          You can unsubscribe at any time via the link in any email we send.
          View all festivals on the{" "}
          <Link
            href="/festivals"
            className="text-primary underline dark:text-primary"
          >
            festivals page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
