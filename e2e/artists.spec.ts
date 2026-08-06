import { test, expect } from "@playwright/test";

test.describe("/artists list", () => {
  test("list renders artist cards", async ({ page }) => {
    await page.goto("/artists");
    await expect(
      page.getByRole("heading", { name: "Artists", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Fat Freddys Drop/ }),
    ).toBeVisible();
  });
});

test.describe("/artists/[slug] detail", () => {
  test("detail page renders artist name and festival history", async ({
    page,
  }) => {
    await page.goto("/artists/fat-freddys-drop");

    await expect(
      page.getByRole("heading", { name: "Fat Freddys Drop", level: 1 }),
    ).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      breadcrumb.getByRole("link", { name: "Artists" }),
    ).toBeVisible();
    await expect(breadcrumb.getByText("Fat Freddys Drop")).toBeVisible();

    await expect(page.getByRole("link", { name: "8th Wonder" })).toBeVisible();
  });
});
