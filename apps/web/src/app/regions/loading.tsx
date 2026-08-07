export default function RegionsLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-8 h-9 w-80 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded-lg border border-gray-200 dark:border-gray-700"
          />
        ))}
      </div>
    </main>
  );
}
