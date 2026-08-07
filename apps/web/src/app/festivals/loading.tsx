// Skeleton loading UI shown by Next.js while the festival listing page loads.

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#111]">
      <div className="flex flex-col gap-3 p-5">
        {/* Status badge skeleton */}
        <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />

        {/* Name skeleton */}
        <div className="space-y-1.5">
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Meta rows skeleton */}
        <div className="mt-1 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="flex justify-end px-5 pb-4">
        <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default function FestivalsLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      {/* Header skeleton */}
      <header className="mb-8">
        <div className="mb-2 h-8 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </header>

      {/* Filter bar skeleton */}
      <section className="mb-6 flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-44 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Count skeleton */}
      <div className="mb-5 h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      {/* Grid skeleton */}
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i}>
            <SkeletonCard />
          </li>
        ))}
      </ul>
    </main>
  );
}
