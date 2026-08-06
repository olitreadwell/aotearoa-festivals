import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { GET } from "./route";
import { prisma } from "@/lib/prisma";

const FIXTURE_SLUG = "aum-festival";
const FIXTURE_START = new Date("2026-03-15T00:00:00.000Z");
const FIXTURE_END = new Date("2026-03-17T00:00:00.000Z");

let originalStartDate: Date | null = null;
let originalEndDate: Date | null = null;
let fixtureName = "";
let noDateSlug = "";

function req(slug: string): [Request, { params: Promise<{ slug: string }> }] {
  return [
    new Request(`http://localhost/festivals/${slug}/calendar.ics`),
    { params: Promise.resolve({ slug }) },
  ];
}

beforeAll(async () => {
  const fixture = await prisma.festival.findUniqueOrThrow({
    where: { slug: FIXTURE_SLUG },
    select: { name: true, startDate: true, endDate: true },
  });
  fixtureName = fixture.name;
  originalStartDate = fixture.startDate;
  originalEndDate = fixture.endDate;

  await prisma.festival.update({
    where: { slug: FIXTURE_SLUG },
    data: { startDate: FIXTURE_START, endDate: FIXTURE_END },
  });

  const withoutDate = await prisma.festival.findFirstOrThrow({
    where: { startDate: null, slug: { not: FIXTURE_SLUG } },
    select: { slug: true },
  });
  noDateSlug = withoutDate.slug;
});

afterAll(async () => {
  await prisma.festival.update({
    where: { slug: FIXTURE_SLUG },
    data: { startDate: originalStartDate, endDate: originalEndDate },
  });
  await prisma.$disconnect();
});

describe("GET /festivals/[slug]/calendar.ics", () => {
  it("returns a 200 text/calendar response with a VEVENT for a festival with a start date", async () => {
    const response = await GET(...req(FIXTURE_SLUG));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/calendar");

    const body = await response.text();
    expect(body).toContain("BEGIN:VEVENT");
    expect(body).toContain(`SUMMARY:${fixtureName}`);
    expect(body).toContain("DTSTART;VALUE=DATE:20260315");
    expect(body).toContain("DTEND;VALUE=DATE:20260318");
  });

  it("returns a 404 for a festival with no start date", async () => {
    const response = await GET(...req(noDateSlug));

    expect(response.status).toBe(404);
  });

  it("returns a 404 for a nonexistent slug", async () => {
    const response = await GET(...req("this-festival-does-not-exist"));

    expect(response.status).toBe(404);
  });
});
