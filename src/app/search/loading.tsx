export default function SearchLoading() {
  return (
    <main className="site-content">
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-2">
        <div className="h-9 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-1 h-4 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mx-auto max-w-3xl px-4">
        <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </main>
  );
}
