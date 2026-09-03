'use client';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[0_1px_2px_rgba(28,25,23,0.04)] dark:border-border dark:bg-card">
        <div className="mb-6 flex justify-center">
          <svg
            className="h-12 w-12 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="mb-3 text-xl font-semibold tracking-tight text-black dark:text-primary-foreground">
          Something went wrong
        </h1>
        <p className="mb-6 text-sm text-muted-foreground dark:text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
