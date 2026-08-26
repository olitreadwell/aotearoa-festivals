import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribed — Aotearoa Festivals",
  description: "You're now subscribed to festival updates.",
};

export default function SubscribeConfirmedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-wao-300/30 dark:bg-wao-100/70">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-wao-0 dark:text-wao-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          You&apos;re subscribed!
        </h1>
        <p className="mb-8 text-sm text-muted-foreground dark:text-muted-foreground">
          Thanks for subscribing. We&apos;ll let you know about upcoming
          festivals in your region.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/festivals"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary focus:ring-2 focus:ring-primary/25 focus:ring-offset-2 focus:outline-none"
          >
            Browse festivals
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 focus:ring-2 focus:ring-primary/25 focus:ring-offset-2 focus:outline-none dark:border-border dark:text-foreground dark:hover:border-foreground/30"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
