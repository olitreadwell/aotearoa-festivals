import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// POST: Extract artists from poster image using Claude Vision
export async function POST(request: Request) {
  try {
    const { imageUrl, festival } = await request.json();

    if (!imageUrl || !festival) {
      return NextResponse.json(
        { error: "imageUrl and festival are required" },
        { status: 400 },
      );
    }

    // Fetch the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.status}` },
        { status: 400 },
      );
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const mediaType = imageResponse.headers.get("content-type") ?? "image/jpeg";

    // Call Claude Vision API
    const anthropicResponse = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: mediaType,
                    data: base64Image,
                  },
                },
                {
                  type: "text",
                  text: `Extract all artist and DJ names from this festival poster. Return ONLY a JSON array of strings with the artist names. Example: ["Artist Name 1", "DJ Name 2"]. Remove any duplicates. Do not include stage names, collectives, or non-artist text.`,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text();
      return NextResponse.json(
        { error: `Claude API error: ${anthropicResponse.status} - ${err}` },
        { status: 500 },
      );
    }

    const aiData = await anthropicResponse.json();
    const responseText = aiData.content?.[0]?.text ?? "";

    // Parse the JSON array from Claude's response
    let artistNames: string[] = [];
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        artistNames = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Fallback: try to parse line-by-line
      artistNames = responseText
        .split("\n")
        .map((l: string) => l.replace(/^["'\-\d.\s]+|["'\s]+$/g, "").trim())
        .filter((l: string) => l.length > 1 && !l.startsWith("["));

      if (artistNames.length === 0) {
        artistNames = [responseText.slice(0, 200)];
      }
    }

    // Cross-reference against existing artists
    const results = await Promise.all(
      artistNames.map(async (name) => {
        const slug = slugify(name);
        const existing = await prisma.artist.findUnique({
          where: { slug },
          select: { slug: true },
        });
        return {
          name,
          exists: !!existing,
          slug: existing?.slug,
        };
      }),
    );

    return NextResponse.json({
      artists: results,
      rawText: responseText,
    });
  } catch (error) {
    console.error("Import poster error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 },
    );
  }
}

// PUT: Save confirmed lineup entries
export async function PUT(request: Request) {
  try {
    const { festival, year, artists } = await request.json();

    if (!festival || !year || !artists?.length) {
      return NextResponse.json(
        { error: "festival, year, and artists are required" },
        { status: 400 },
      );
    }

    const festivalSlug = slugify(festival);
    const festRecord = await prisma.festival.findUnique({
      where: { slug: festivalSlug },
    });

    if (!festRecord) {
      return NextResponse.json(
        { error: `Festival not found: ${festival}` },
        { status: 404 },
      );
    }

    let created = 0;

    for (const name of artists) {
      const slug = slugify(name);

      // Upsert artist
      await prisma.artist.upsert({
        where: { slug },
        update: {},
        create: { name, slug },
      });

      // Create lineup entry
      try {
        const artistRec = await prisma.artist.findUnique({
          where: { slug },
        });
        if (artistRec) {
          await prisma.lineupEntry.upsert({
            where: {
              festivalId_artistId_year: {
                festivalId: festRecord.id,
                artistId: artistRec.id,
                year,
              },
            },
            update: {},
            create: {
              festivalId: festRecord.id,
              artistId: artistRec.id,
              year,
              isHeadliner: false,
            },
          });
          created++;
        }
      } catch {
        // Skip duplicates
      }
    }

    return NextResponse.json({ created });
  } catch (error) {
    console.error("Save lineup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 },
    );
  }
}
