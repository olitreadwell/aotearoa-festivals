import {
  PrismaClient,
  FestivalStatus,
  Region,
} from "../src/generated/prisma/index.js";
import seedData from "./data/festivals-seed.json" with { type: "json" };

interface SeedFestival {
  name: string;
  promoter: string;
  status: string;
  date: string;
  region: string;
  location: string;
  genre: string;
  cost: string;
  links: string;
  notes: string;
  vibe?: string;
  camping?: boolean | null;
  ticketPrice?: string;
  ticketUrl?: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface SeedArtist {
  name: string;
  genre?: string;
  homeCity?: string;
  instagram?: string;
}

interface SeedLineup {
  festival: string;
  artist: string;
  year: number;
  headliner?: boolean;
  source?: string;
}

const prisma = new PrismaClient();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const STATUS_MAP: Record<string, FestivalStatus> = {
  active: FestivalStatus.ACTIVE,
  tbc: FestivalStatus.TBC,
  hiatus: FestivalStatus.HIATUS,
  defunct: FestivalStatus.DEFUNCT,
  unconfirmed: FestivalStatus.UNCONFIRMED,
};

// Loose region strings from the source dataset -> Region enum. Falls back
// to null (unmapped) rather than guessing wrong for multi-region entries
// like "Auckland / Canterbury".
const REGION_MAP: Record<string, Region> = {
  Northland: Region.NORTHLAND,
  Auckland: Region.AUCKLAND,
  Waikato: Region.WAIKATO,
  "Bay of Plenty": Region.BAY_OF_PLENTY,
  "East Coast": Region.GISBORNE,
  Gisborne: Region.GISBORNE,
  "Hawke's Bay": Region.HAWKES_BAY,
  Taranaki: Region.TARANAKI,
  "Manawatū-Whanganui": Region.MANAWATU_WHANGANUI,
  Wellington: Region.WELLINGTON,
  Wairarapa: Region.WAIRARAPA,
  "Nelson-Tasman": Region.NELSON,
  Marlborough: Region.MARLBOROUGH,
  "West Coast": Region.WEST_COAST,
  Canterbury: Region.CANTERBURY,
  Otago: Region.OTAGO,
  Southland: Region.SOUTHLAND,
};

function mapRegion(raw: string | null | undefined): Region | null {
  if (!raw) return null;
  return REGION_MAP[raw] ?? null;
}

async function main() {
  console.log(`Seeding ${seedData.promoters.length} promoters...`);
  const promoterIdByName = new Map<string, string>();

  for (const p of seedData.promoters) {
    const slug = slugify(p.name);
    const promoter = await prisma.promoter.upsert({
      where: { slug },
      update: {
        region: p.region || null,
        genreFocus: p.genre || null,
        instagram: p.ig || null,
        facebook: p.fb || null,
        website: p.site || null,
        notes: p.notes || null,
      },
      create: {
        name: p.name,
        slug,
        region: p.region || null,
        genreFocus: p.genre || null,
        instagram: p.ig || null,
        facebook: p.fb || null,
        website: p.site || null,
        notes: p.notes || null,
      },
    });
    promoterIdByName.set(p.name, promoter.id);
  }

  console.log(`Seeding ${seedData.festivals.length} festivals...`);
  let autoCreatedPromoters = 0;

  for (const f of seedData.festivals as SeedFestival[]) {
    const slug = slugify(f.name);
    let promoterId = f.promoter
      ? (promoterIdByName.get(f.promoter) ?? null)
      : null;

    // Some historic festivals only ever had a founder's name recorded
    // (e.g. "Andrew McManus" for Raggamuffin), not a company/collective
    // with its own Promoter entry. Auto-create a minimal Promoter row
    // rather than silently dropping the attribution.
    if (f.promoter && !promoterId) {
      const fallbackSlug = slugify(f.promoter);
      const fallback = await prisma.promoter.upsert({
        where: { slug: fallbackSlug },
        update: {},
        create: { name: f.promoter, slug: fallbackSlug },
      });
      promoterId = fallback.id;
      promoterIdByName.set(f.promoter, promoterId);
      autoCreatedPromoters++;
    }

    await prisma.festival.upsert({
      where: { slug },
      update: {
        status: STATUS_MAP[f.status] ?? FestivalStatus.UNCONFIRMED,
        region: mapRegion(f.region),
        location: f.location || null,
        genre: f.genre || null,
        costText: f.cost || null,
        dateText: f.date || null,
        notes: f.notes || null,
        website: f.links || null,
        promoterId,
        vibe: f.vibe || null,
        camping: f.camping ?? null,
        ticketPrice: f.ticketPrice || null,
        ticketUrl: f.ticketUrl || null,
        latitude: f.latitude ?? null,
        longitude: f.longitude ?? null,
      },
      create: {
        name: f.name,
        slug,
        status: STATUS_MAP[f.status] ?? FestivalStatus.UNCONFIRMED,
        region: mapRegion(f.region),
        location: f.location || null,
        genre: f.genre || null,
        costText: f.cost || null,
        dateText: f.date || null,
        notes: f.notes || null,
        website: f.links || null,
        promoterId,
        vibe: f.vibe || null,
        camping: f.camping ?? null,
        ticketPrice: f.ticketPrice || null,
        ticketUrl: f.ticketUrl || null,
        latitude: f.latitude ?? null,
        longitude: f.longitude ?? null,
      },
    });
  }

  if (autoCreatedPromoters > 0) {
    console.warn(
      `${autoCreatedPromoters} festival(s) had a promoter name not in the curated list; auto-created a minimal Promoter row for it.`,
    );
  }

  // Seed artists
  if (seedData.artists && seedData.artists.length > 0) {
    console.log(`Seeding ${seedData.artists.length} artists...`);
    for (const a of seedData.artists as SeedArtist[]) {
      const slug = slugify(a.name);
      await prisma.artist.upsert({
        where: { slug },
        update: {
          genre: a.genre || null,
          homeCity: a.homeCity || null,
          instagram: a.instagram || null,
        },
        create: {
          name: a.name,
          slug,
          genre: a.genre || null,
          homeCity: a.homeCity || null,
          instagram: a.instagram || null,
        },
      });
    }
  }

  // Seed lineup entries
  if (seedData.lineups && seedData.lineups.length > 0) {
    console.log(`Seeding ${seedData.lineups.length} lineup entries...`);
    for (const l of seedData.lineups as SeedLineup[]) {
      const festival = await prisma.festival.findUnique({
        where: { slug: slugify(l.festival) },
      });
      const artist = await prisma.artist.findUnique({
        where: { slug: slugify(l.artist) },
      });
      if (festival && artist) {
        await prisma.lineupEntry.upsert({
          where: {
            festivalId_artistId_year: {
              festivalId: festival.id,
              artistId: artist.id,
              year: l.year,
            },
          },
          update: {
            isHeadliner: l.headliner ?? false,
            source: l.source || null,
          },
          create: {
            festivalId: festival.id,
            artistId: artist.id,
            year: l.year,
            isHeadliner: l.headliner ?? false,
            source: l.source || null,
          },
        });
      } else {
        console.warn(
          `Skipping lineup: ${l.artist} @ ${l.festival} (${l.year}) — ${!festival ? "festival" : "artist"} not found`,
        );
      }
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
