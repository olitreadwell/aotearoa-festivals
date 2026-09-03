import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About — Aotearoa Festivals',
  description:
    "A community directory of New Zealand music festivals, promoters, and artists. Built to help you discover Aotearoa's festival scene.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">About Aotearoa Festivals</h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground dark:text-muted-foreground">
        <p>
          Aotearoa Festivals is a community-driven directory of New Zealand music festivals. We
          track active, upcoming, and historical festivals across every region — from Northland to
          Southland, from boutique electronic gatherings to massive multi-day camping events.
        </p>

        <p>
          For each festival, we collect what matters: who runs it, where it happens, what genres to
          expect, whether there&apos;s camping, what tickets cost, and — crucially — who&apos;s
          played there. Browse artists to discover which festivals they&apos;ve graced, or explore
          by region to find what&apos;s happening near you.
        </p>

        <p>
          This project is inspired by{' '}
          <a
            href="https://techevents.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 dark:text-primary"
          >
            techevents.co.nz
          </a>
          , which does the same thing for NZ tech meetups. We took that proven model and applied it
          to music festivals — adding artist lineups, promoter records, and a discovery engine that
          helps you find your next favourite festival.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-black dark:text-primary-foreground">
          How it works
        </h2>

        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-black dark:text-primary-foreground">Browse</strong> — explore
            festivals by region, genre, or status. Filter to find what you&apos;re into.
          </li>
          <li>
            <strong className="text-black dark:text-primary-foreground">Discover</strong> — click an
            artist to see every festival they&apos;ve played. Find similar events through shared
            lineups.
          </li>
          <li>
            <strong className="text-black dark:text-primary-foreground">Subscribe</strong> — get
            notified when new festivals are added to regions you care about.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-black dark:text-primary-foreground">
          Contribute
        </h2>

        <p>
          This directory is open source. The code is on{' '}
          <a
            href="https://github.com/olitreadwell/aotearoa-festivals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 dark:text-primary"
          >
            GitHub
          </a>
          . If you know of a festival, promoter, or lineup we&apos;re missing, open an issue or
          submit a pull request. We welcome corrections, additions, and ideas.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-black dark:text-primary-foreground">
          Stack
        </h2>

        <p>
          Built with Next.js, TypeScript, Tailwind CSS, Prisma, and Postgres. Deployed on Vercel.
          Data lives in Neon.
        </p>
      </div>
    </main>
  );
}
