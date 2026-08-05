import Link from "next/link";

export default function UnsubscribeInvalidPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-[#111]">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-amber-600 dark:text-amber-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          Invalid or expired unsubscribe link
        </h1>
        <p className="mb-8 text-sm text-[#555] dark:text-[#aaa]">
          This unsubscribe link is invalid or has already been used. If
          you&apos;re still receiving emails, please contact us or try
          subscribing again and using the new unsubscribe link.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/festivals"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Browse festivals
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-[#333] transition-colors hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-[#ddd] dark:hover:border-gray-500"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
