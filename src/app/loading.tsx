export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-8 h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#111]"
          >
            <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="mt-3 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </main>
  );
}
