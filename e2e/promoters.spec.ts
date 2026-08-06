import { test, expect } from "@playwright/test";

test.describe("/promoters list", () => {
  test("list renders promoter rows", async ({ page }) => {
    await page.goto("/promoters");
    await expect(
      page.getByRole("heading", { name: "Promoters", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("42 promoters")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Audiology Touring/ }),
    ).toBeVisible();
  });
});

test.describe("/promoters/[slug] detail", () => {
  test("detail page renders promoter name and its festivals", async ({
    page,
  }) => {
    await page.goto("/promoters/audiology-touring");

    await expect(
      page.getByRole("heading", { name: "Audiology Touring", level: 1 }),
    ).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      breadcrumb.getByRole("link", { name: "Promoters" }),
    ).toBeVisible();
    await expect(breadcrumb.getByText("Audiology Touring")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Festivals/, level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Southern Sounds/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Parklands Festival/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Ultra New Zealand/ }),
    ).toBeVisible();
  });
});
