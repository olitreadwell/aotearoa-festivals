import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Admin — Aotearoa Festivals',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [festivals, artists, promoters, lineups, pending] = await Promise.all([
    prisma.festival.count(),
    prisma.artist.count(),
    prisma.promoter.count(),
    prisma.lineupEntry.count(),
    prisma.festival.count({ where: { approved: false } }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
      <p className="mt-1 text-muted-foreground">Manage festivals, artists, and data.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold">{festivals}</div>
            <div className="text-xs text-muted-foreground">Festivals</div>
            {pending > 0 && <div className="mt-1 text-xs text-amber-600">{pending} pending</div>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold">{artists}</div>
            <div className="text-xs text-muted-foreground">Artists</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold">{promoters}</div>
            <div className="text-xs text-muted-foreground">Promoters</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold">{lineups}</div>
            <div className="text-xs text-muted-foreground">Lineups</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold">Import Tools</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/admin/import-poster" className="text-primary hover:underline">
                  Poster → Lineup AI tool
                </Link>
              </li>
              <li>
                <Link href="/api/import-poster" className="text-muted-foreground">
                  API endpoint
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold">Data</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/festivals" className="text-primary hover:underline">
                  Browse all festivals
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-primary hover:underline">
                  Browse all artists
                </Link>
              </li>
              <li>
                <Link href="/promoters" className="text-primary hover:underline">
                  Browse all promoters
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
