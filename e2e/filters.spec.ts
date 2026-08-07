import { expect, test } from "@playwright/test";

test.describe("home page filters", () => {
  test("region filter narrows results", async ({ page }) => {
    await page.goto("/");
    await page.selectOption('select[name="region"]', "AUCKLAND");
    await page.click('button[type="submit"]');
    // Should see fewer results
    const items = page.locator('a[href^="/festivals/"]');
    await expect(items.first()).toBeVisible();
  });

  test("camping filter works", async ({ page }) => {
    await page.goto("/");
    await page.selectOption('select[name="camping"]', "yes");
    await page.click('button[type="submit"]');
    // Should see camping badge
    await expect(page.getByText("🏕 Camping").first()).toBeVisible();
  });

  test("search finds festivals by name", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="search"]', "Rhythm");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Rhythm")).toBeVisible();
  });

  test("clear filters resets", async ({ page }) => {
    await page.goto("/?region=AUCKLAND");
    await page.click("text=Clear");
    await expect(page).toHaveURL("/");
  });
});

test.describe("festival detail", () => {
  test("shows festival info", async ({ page }) => {
    await page.goto("/festivals/rhythm-and-vines");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Rhythm");
  });

  test("has breadcrumbs", async ({ page }) => {
    await page.goto("/festivals/northern-bass");
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  });

  test("404 for unknown festival", async ({ page }) => {
    const res = await page.goto("/festivals/not-a-real-festival-xyz");
    expect(res?.status()).toBe(404);
  });
});

test.describe("smoke — all routes return 200", () => {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/artists",
    "/promoters",
    "/regions",
    "/calendar.ics",
    "/feed.xml",
    "/sitemap.xml",
    "/api/subscribe",
    "/api/unsubscribe",
  ];

  for (const route of routes) {
    test(`${route} returns 200`, async ({ request }) => {
      const res = await request.get(route);
      expect(res.status()).toBe(200);
    });
  }
});
