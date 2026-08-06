import { test, expect } from "@playwright/test";

test("home page loads and shows site statistics", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Aotearoa Festivals");
  await expect(
    page.getByRole("heading", { name: "Aotearoa Festivals" }),
  ).toBeVisible();
  await expect(page.getByLabel("Site statistics")).toContainText("festivals");
  await expect(page.getByLabel("Site statistics")).toContainText("active");
  await expect(page.getByLabel("Site statistics")).toContainText(
    "regions covered",
  );
});

const HTML_PAGES = [
  "/festivals",
  "/artists",
  "/promoters",
  "/regions",
  "/search",
];

for (const path of HTML_PAGES) {
  test(`${path} responds successfully with no error boundary`, async ({
    page,
  }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    await expect(
      page.getByText("Application error", { exact: false }),
    ).toHaveCount(0);
  });
}

test("/feed.xml responds with XML content", async ({ request }) => {
  const response = await request.get("/feed.xml");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
});

test("/sitemap.xml responds with XML content", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("xml");
});
