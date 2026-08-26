export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-8 h-9 w-64 animate-pulse rounded bg-muted dark:bg-muted" />
      <div className="mb-2 h-4 w-48 animate-pulse rounded bg-muted dark:bg-muted" />
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card"
          >
            <div className="h-5 w-20 rounded-full bg-muted dark:bg-muted" />
            <div className="mt-3 h-4 w-3/4 rounded bg-muted dark:bg-muted" />
            <div className="mt-2 h-3 w-1/2 rounded bg-muted dark:bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
