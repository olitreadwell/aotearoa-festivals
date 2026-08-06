import { afterAll, describe, expect, it } from "vitest";
import { GET } from "./route";
import { prisma } from "@/lib/prisma";
import { Region } from "@/generated/prisma";

// Distinct per test file (not shared with subscribe/route.test.ts) — both
// files run concurrently in separate Vitest workers against the same table,
// so a shared domain would make row-count assertions race.
const TEST_EMAIL_DOMAIN =
  "unsubscribe-integration-test.aotearoa-festivals.example";

function testEmail(label: string): string {
  return `unsubscribe-${label}-${Date.now()}-${Math.random().toString(36).slice(2)}@${TEST_EMAIL_DOMAIN}`;
}

function getRequest(token?: string): Request {
  const url = new URL("http://localhost/api/unsubscribe");
  if (token !== undefined) url.searchParams.set("token", token);
  return new Request(url);
}

afterAll(async () => {
  await prisma.emailSubscription.deleteMany({
    where: { email: { endsWith: TEST_EMAIL_DOMAIN } },
  });
  await prisma.$disconnect();
});

describe("GET /api/unsubscribe", () => {
  it("deletes the matching subscription and redirects to /unsubscribe/confirmed for a valid token", async () => {
    const subscription = await prisma.emailSubscription.create({
      data: { email: testEmail("valid"), region: Region.CANTERBURY },
    });

    const response = await GET(getRequest(subscription.token));

    expect(response.headers.get("location")).toContain(
      "/unsubscribe/confirmed",
    );
    const row = await prisma.emailSubscription.findUnique({
      where: { id: subscription.id },
    });
    expect(row).toBeNull();
  });

  it("redirects to /unsubscribe/invalid without querying the DB when the token is missing", async () => {
    const response = await GET(getRequest(undefined));

    expect(response.headers.get("location")).toContain("/unsubscribe/invalid");
  });

  it("redirects to /unsubscribe/confirmed without crashing for an unknown or expired token", async () => {
    const response = await GET(getRequest("this-token-does-not-exist"));

    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.status).toBeLessThan(400);
    expect(response.headers.get("location")).toContain(
      "/unsubscribe/confirmed",
    );
  });

  it("leaves unrelated subscriptions untouched when an unknown token is supplied", async () => {
    const subscription = await prisma.emailSubscription.create({
      data: { email: testEmail("untouched"), region: Region.TASMAN },
    });

    await GET(getRequest("this-token-does-not-exist"));

    const row = await prisma.emailSubscription.findUnique({
      where: { id: subscription.id },
    });
    expect(row).not.toBeNull();
  });
});
