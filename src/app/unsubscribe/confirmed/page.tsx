import Link from 'next/link'

export default function UnsubscribeConfirmedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-[#111]">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-gray-500 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          You&apos;ve unsubscribed
        </h1>
        <p className="mb-8 text-sm text-[#555] dark:text-[#aaa]">
          You&apos;ve been successfully removed from our mailing list. You
          won&apos;t receive any more festival update emails.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/festivals"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Browse festivals
          </Link>
          <Link
            href="/subscribe"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-[#333] transition-colors hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-[#ddd] dark:hover:border-gray-500"
          >
            Subscribe again
          </Link>
        </div>
      </div>
    </main>
  )
}
