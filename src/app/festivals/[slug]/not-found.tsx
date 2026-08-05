import Link from "next/link";

export default function FestivalNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/festivals"
        className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
      >
        <span aria-hidden="true">←</span> All festivals
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">
        Festival not found
      </h1>
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        We couldn&apos;t find the festival you&apos;re looking for. It may have
        been removed or the URL may be incorrect.
      </p>
    </main>
  );
}
