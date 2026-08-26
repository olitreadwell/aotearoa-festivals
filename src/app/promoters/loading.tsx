export default function PromotersLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 h-9 w-40 animate-pulse rounded bg-muted dark:bg-muted" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-border px-4 py-3 dark:border-border"
          >
            <div className="h-5 w-56 rounded bg-muted dark:bg-muted" />
            <div className="mt-1.5 h-3 w-36 rounded bg-muted dark:bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
