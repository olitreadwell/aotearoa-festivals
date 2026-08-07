import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline — Aotearoa Festivals",
};

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm dark:border-neutral-700 dark:bg-[#111]">
        <h1 className="mb-3 text-xl font-semibold">You&apos;re offline</h1>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          Aotearoa Festivals works offline. Browse festivals you&apos;ve visited
          before, or reconnect to discover new ones.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
