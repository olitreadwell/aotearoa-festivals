import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Offline — Aotearoa Festivals',
};

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card">
        <h1 className="mb-3 text-xl font-semibold">You&apos;re offline</h1>
        <p className="mb-6 text-sm text-muted-foreground dark:text-muted-foreground">
          Aotearoa Festivals works offline. Browse festivals you&apos;ve visited before, or
          reconnect to discover new ones.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
