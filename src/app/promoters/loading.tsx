export default function PromotersLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 h-9 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
          >
            <div className="h-5 w-56 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-1.5 h-3 w-36 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </main>
  );
}
