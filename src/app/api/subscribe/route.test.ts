import { afterAll, describe, expect, it } from "vitest";
import { POST } from "./route";
import { prisma } from "@/lib/prisma";
import { Region } from "@/generated/prisma";

const TEST_EMAIL_DOMAIN = "integration-test.aotearoa-festivals.example";

function testEmail(label: string): string {
  return `subscribe-${label}-${Date.now()}-${Math.random().toString(36).slice(2)}@${TEST_EMAIL_DOMAIN}`;
}

function postRequest(fields: Record<string, string | undefined>): Request {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) body.set(key, value);
  }
  return new Request("http://localhost/api/subscribe", {
    method: "POST",
    body,
  });
}

async function countByEmail(email: string): Promise<number> {
  return prisma.emailSubscription.count({ where: { email } });
}

afterAll(async () => {
  await prisma.emailSubscription.deleteMany({
    where: { email: { endsWith: TEST_EMAIL_DOMAIN } },
  });
  await prisma.$disconnect();
});

describe("POST /api/subscribe", () => {
  it("creates an EmailSubscription row and redirects when the email and region are valid", async () => {
    const email = testEmail("valid");

    const response = await POST(
      postRequest({ email, region: Region.AUCKLAND }),
    );

    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.status).toBeLessThan(400);
    expect(response.headers.get("location")).toContain("/subscribe/confirmed");

    const row = await prisma.emailSubscription.findUnique({
      where: { email_region: { email, region: Region.AUCKLAND } },
    });
    expect(row).not.toBeNull();
    expect(row?.email).toBe(email);
    expect(row?.region).toBe(Region.AUCKLAND);
  });

  it("lowercases and trims the email before storing it", async () => {
    const rawEmail = testEmail("case");
    const shouted = `  ${rawEmail.toUpperCase()}  `;

    await POST(postRequest({ email: shouted, region: Region.WELLINGTON }));

    const row = await prisma.emailSubscription.findUnique({
      where: {
        email_region: { email: rawEmail, region: Region.WELLINGTON },
      },
    });
    expect(row).not.toBeNull();
  });

  it("returns a 400 without creating a row when the email is invalid", async () => {
    const email = "not-an-email";

    const response = await POST(
      postRequest({ email, region: Region.AUCKLAND }),
    );

    expect(response.status).toBe(400);
    expect(await countByEmail(email)).toBe(0);
  });

  it("returns a 400 without creating a row when the email is missing", async () => {
    const before = await prisma.emailSubscription.count();

    const response = await POST(postRequest({ region: Region.AUCKLAND }));

    expect(response.status).toBe(400);
    expect(await prisma.emailSubscription.count()).toBe(before);
  });

  it("returns a 400 without creating a row when the region is invalid", async () => {
    const email = testEmail("bad-region");

    const response = await POST(
      postRequest({ email, region: "NOT_A_REGION" }),
    );

    expect(response.status).toBe(400);
    expect(await countByEmail(email)).toBe(0);
  });

  it("returns a 400 without creating a row when the region is missing", async () => {
    const email = testEmail("no-region");

    const response = await POST(postRequest({ email }));

    expect(response.status).toBe(400);
    expect(await countByEmail(email)).toBe(0);
  });

  it("upserts idempotently when the same email and region are submitted twice, keeping the same token", async () => {
    const email = testEmail("duplicate");

    const first = await POST(postRequest({ email, region: Region.OTAGO }));
    const firstRow = await prisma.emailSubscription.findUnique({
      where: { email_region: { email, region: Region.OTAGO } },
    });

    const second = await POST(postRequest({ email, region: Region.OTAGO }));
    const secondRow = await prisma.emailSubscription.findUnique({
      where: { email_region: { email, region: Region.OTAGO } },
    });

    expect(first.status).toBeGreaterThanOrEqual(300);
    expect(first.status).toBeLessThan(400);
    expect(second.status).toBeGreaterThanOrEqual(300);
    expect(second.status).toBeLessThan(400);
    expect(await countByEmail(email)).toBe(1);
    expect(secondRow?.token).toBe(firstRow?.token);
  });
});
