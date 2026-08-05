import { Region } from '@/generated/prisma'
import Link from 'next/link'

const REGION_LABELS: Record<Region, string> = {
  NORTHLAND: 'Northland',
  AUCKLAND: 'Auckland',
  WAIKATO: 'Waikato',
  BAY_OF_PLENTY: 'Bay of Plenty',
  GISBORNE: 'Gisborne',
  HAWKES_BAY: "Hawke's Bay",
  TARANAKI: 'Taranaki',
  MANAWATU_WHANGANUI: 'Manawatū-Whanganui',
  WELLINGTON: 'Wellington',
  WAIRARAPA: 'Wairarapa',
  TASMAN: 'Tasman',
  NELSON: 'Nelson',
  MARLBOROUGH: 'Marlborough',
  WEST_COAST: 'West Coast',
  CANTERBURY: 'Canterbury',
  OTAGO: 'Otago',
  SOUTHLAND: 'Southland',
  ONLINE: 'Online',
}

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const { region } = await searchParams

  const preselectedRegion =
    region && Object.values(Region).includes(region as Region)
      ? (region as Region)
      : undefined

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-[#111]">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            Subscribe to Festival Updates
          </h1>
          <p className="text-sm text-[#555] dark:text-[#aaa]">
            Get notified about upcoming festivals in your region. We&apos;ll
            only email you with relevant updates — no spam.
          </p>
        </header>

        <form method="POST" action="/api/subscribe" className="flex flex-col gap-6">
          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#333] dark:text-[#ddd]"
            >
              Email address{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#1a1a1a] dark:placeholder-gray-500"
            />
          </div>

          {/* Region field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="region"
              className="text-sm font-semibold text-[#333] dark:text-[#ddd]"
            >
              Region{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <select
              id="region"
              name="region"
              required
              defaultValue={preselectedRegion ?? ''}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#1a1a1a]"
            >
              <option value="" disabled>
                Select a region…
              </option>
              {Object.values(Region).map((r) => (
                <option key={r} value={r}>
                  {REGION_LABELS[r]}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-xs text-[#888] dark:text-[#666]">
          You can unsubscribe at any time via the link in any email we send.
          View all festivals on the{' '}
          <Link
            href="/festivals"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            festivals page
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
