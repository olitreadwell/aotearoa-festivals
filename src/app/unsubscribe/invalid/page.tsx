import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Invalid Link — Aotearoa Festivals',
  description: 'This unsubscribe link is invalid or has expired.',
};

export default function UnsubscribeInvalidPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-kowhai-300/40 dark:bg-kowhai-100/70">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-kowhai-0 dark:text-kowhai-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          Invalid or expired unsubscribe link
        </h1>
        <p className="mb-8 text-sm text-muted-foreground dark:text-muted-foreground">
          This unsubscribe link is invalid or has already been used. If you&apos;re still receiving
          emails, please contact us or try subscribing again and using the new unsubscribe link.
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
