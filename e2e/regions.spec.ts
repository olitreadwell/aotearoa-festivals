import { test, expect } from "@playwright/test";

test.describe("/regions list", () => {
  test("list renders region cards", async ({ page }) => {
    await page.goto("/regions");
    await expect(
      page.getByRole("heading", { name: "Browse NZ festivals by region" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Auckland/ })).toBeVisible();
  });
});

test.describe("/regions/[region] detail", () => {
  test("detail page renders festivals in that region", async ({ page }) => {
    await page.goto("/regions/auckland");

    await expect(
      page.getByRole("heading", { name: "Auckland", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("20 approved festivals")).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      breadcrumb.getByRole("link", { name: "Regions" }),
    ).toBeVisible();
    await expect(breadcrumb.getByText("Auckland")).toBeVisible();

    await expect(page.getByRole("link", { name: /Shipwrecked/ })).toBeVisible();
  });
});
