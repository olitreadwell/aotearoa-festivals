import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribed — Aotearoa Festivals",
  description: "You've been unsubscribed from festival updates.",
};

export default function UnsubscribeConfirmedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted dark:bg-muted">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-muted-foreground dark:text-muted-foreground"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          You&apos;ve unsubscribed
        </h1>
        <p className="mb-8 text-sm text-muted-foreground dark:text-muted-foreground">
          You&apos;ve been successfully removed from our mailing list. You
          won&apos;t receive any more festival update emails.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/festivals"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary focus:ring-2 focus:ring-primary/25 focus:ring-offset-2 focus:outline-none"
          >
            Browse festivals
          </Link>
          <Link
            href="/subscribe"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 focus:ring-2 focus:ring-primary/25 focus:ring-offset-2 focus:outline-none dark:border-border dark:text-foreground dark:hover:border-foreground/30"
          >
            Subscribe again
          </Link>
        </div>
      </div>
    </main>
  );
}
