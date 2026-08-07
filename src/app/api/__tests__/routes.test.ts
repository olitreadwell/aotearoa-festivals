import { describe, it, expect } from "vitest";

const BASE = "http://localhost:3000";

describe("API — subscribe", () => {
  it("POST /api/subscribe returns 400 without body", async () => {
    const res = await fetch(`${BASE}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  it("POST /api/subscribe returns 400 with invalid email", async () => {
    const res = await fetch(`${BASE}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "not-an-email", region: "AUCKLAND" }),
    });
    expect(res.status).toBe(400);
  });
});

describe("API — unsubscribe", () => {
  it("GET /api/unsubscribe returns 400 without token", async () => {
    const res = await fetch(`${BASE}/api/unsubscribe`);
    expect(res.status).toBe(400);
  });
});

describe("API — calendar feed", () => {
  it("GET /calendar.ics returns text/calendar", async () => {
    const res = await fetch(`${BASE}/calendar.ics`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/calendar");
  });
});

describe("API — RSS feed", () => {
  it("GET /feed.xml returns XML", async () => {
    const res = await fetch(`${BASE}/feed.xml`);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("<rss");
  });
});
