export default function MapLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6 h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-9 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Map skeleton */}
      <div className="mx-auto flex aspect-[3/4] max-w-[600px] items-center justify-center rounded-xl border border-gray-200 bg-neutral-50 dark:border-gray-700 dark:bg-neutral-900/50">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Region list skeleton */}
      <div className="mt-12">
        <div className="mb-4 h-6 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
