// Explicit /index.js because this project is "type": "module" — plain Node
// ESM (unlike Next's bundler) doesn't allow bare directory imports.
import { PrismaClient } from "../src/generated/prisma/index.js";

// The real seed data (prisma/data/festivals-seed.json) has no Artist or
// LineupEntry rows yet (see BACKLOG.md) — fabricating one there would
// pollute real festival data with a fake artist. Instead, the E2E suite
// creates its own minimal, clearly-test-only fixture here, upserted
// against whatever DATABASE_URL is active (CI's ephemeral Postgres or a
// local one), so /artists and /artists/[slug] have a real page to test.
export default async function globalSetup() {
  const prisma = new PrismaClient();
  try {
    const festival = await prisma.festival.findUnique({
      where: { slug: "8th-wonder" },
      select: { id: true },
    });
    if (!festival) {
      throw new Error(
        "global-setup: expected seeded festival '8th-wonder' not found — did db:seed run before the e2e suite?",
      );
    }

    const artist = await prisma.artist.upsert({
      where: { slug: "fat-freddys-drop" },
      update: {},
      create: {
        name: "Fat Freddys Drop",
        slug: "fat-freddys-drop",
        genre: "Dub / Reggae",
        homeCity: "Wellington",
      },
    });

    await prisma.lineupEntry.upsert({
      where: {
        festivalId_artistId_year: {
          festivalId: festival.id,
          artistId: artist.id,
          year: 2027,
        },
      },
      update: {},
      create: {
        festivalId: festival.id,
        artistId: artist.id,
        year: 2027,
        isHeadliner: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
