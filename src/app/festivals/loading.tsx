// Skeleton loading UI shown by Next.js while the festival listing page loads.

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] shadow-sm overflow-hidden animate-pulse">
      <div className="p-5 flex flex-col gap-3">
        {/* Status badge skeleton */}
        <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />

        {/* Name skeleton */}
        <div className="space-y-1.5">
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Meta rows skeleton */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="px-5 pb-4 flex justify-end">
        <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default function FestivalsLoading() {
  return (
    <main className="min-h-screen px-4 py-8 max-w-6xl mx-auto">
      {/* Header skeleton */}
      <header className="mb-8">
        <div className="h-8 w-56 rounded bg-gray-200 dark:bg-gray-700 animate-pulse mb-2" />
        <div className="h-4 w-72 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </header>

      {/* Filter bar skeleton */}
      <section className="mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-8 w-44 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-3 w-12 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="flex gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Count skeleton */}
      <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700 animate-pulse mb-5" />

      {/* Grid skeleton */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i}>
            <SkeletonCard />
          </li>
        ))}
      </ul>
    </main>
  );
}
