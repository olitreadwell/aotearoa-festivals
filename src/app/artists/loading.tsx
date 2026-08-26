export default function ArtistsLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 h-9 w-32 animate-pulse rounded bg-muted dark:bg-muted" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-border px-4 py-3 dark:border-border"
          >
            <div className="h-5 w-48 rounded bg-muted dark:bg-muted" />
            <div className="mt-1.5 h-3 w-32 rounded bg-muted dark:bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
