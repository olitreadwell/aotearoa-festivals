import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribed — Aotearoa Festivals",
  description: "You're now subscribed to festival updates.",
};

export default function SubscribeConfirmedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-[#111]">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-green-600 dark:text-green-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          You&apos;re subscribed!
        </h1>
        <p className="mb-8 text-sm text-[#555] dark:text-[#aaa]">
          Thanks for subscribing. We&apos;ll let you know about upcoming
          festivals in your region.
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
