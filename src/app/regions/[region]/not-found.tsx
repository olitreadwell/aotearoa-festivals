import Link from "next/link";

export default function RegionNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/regions"
        className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
      >
        <span aria-hidden="true">←</span> All regions
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">
        Region not found
      </h1>
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        We couldn&apos;t find a region matching that URL. Check the address or
        browse all regions below.
      </p>
      <Link
        href="/regions"
        className="mt-6 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        Browse all regions →
      </Link>
    </main>
  );
}
