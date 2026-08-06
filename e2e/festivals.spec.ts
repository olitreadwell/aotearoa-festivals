import { test, expect } from "@playwright/test";

test.describe("/festivals list", () => {
  test("list renders festival cards", async ({ page }) => {
    await page.goto("/festivals");
    await expect(
      page.getByRole("heading", { name: "Aotearoa Festivals" }),
    ).toBeVisible();
    await expect(page.getByRole("status")).toHaveText("71 festivals found.");
    await expect(page.getByRole("link", { name: /8th Wonder/ })).toBeVisible();
  });

  test("filtering by region query param changes results", async ({ page }) => {
    await page.goto("/festivals?region=AUCKLAND");
    await expect(page.getByRole("status")).toHaveText("20 festivals found.");
    await expect(
      page.getByRole("link", { name: "Clear filters" }),
    ).toBeVisible();
  });

  test("filtering by status query param changes results", async ({ page }) => {
    await page.goto("/festivals?status=TBC");
    await expect(page.getByRole("status")).toHaveText("15 festivals found.");
  });

  test("pagination Next/Previous links work and update the URL and results", async ({
    page,
  }) => {
    await page.goto("/festivals");
    await expect(page.getByText("Page 1 of 3")).toBeVisible();

    const pagination = page.getByRole("navigation", { name: "Pagination" });

    const firstPageNames = await page
      .getByRole("list")
      .last()
      .getByRole("heading", { level: 2 })
      .allTextContents();

    await pagination.getByRole("link", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL(/\/festivals\?page=2$/);
    await expect(page.getByText("Page 2 of 3")).toBeVisible();

    const secondPageNames = await page
      .getByRole("list")
      .last()
      .getByRole("heading", { level: 2 })
      .allTextContents();
    expect(secondPageNames).not.toEqual(firstPageNames);

    await pagination.getByRole("link", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL(/\/festivals\?page=3$/);
    await expect(page.getByText("Page 3 of 3")).toBeVisible();
    await expect(
      pagination.getByRole("link", { name: "Next", exact: true }),
    ).toHaveCount(0);

    await pagination
      .getByRole("link", { name: "Previous", exact: true })
      .click();
    await expect(page).toHaveURL(/\/festivals\?page=2$/);
    await expect(page.getByText("Page 2 of 3")).toBeVisible();
  });
});

test.describe("/festivals/[slug] detail", () => {
  test("detail page renders name, region, status and breadcrumbs navigate correctly", async ({
    page,
  }) => {
    await page.goto("/festivals/8th-wonder");

    await expect(
      page.getByRole("heading", { name: "8th Wonder", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("Active")).toBeVisible();
    await expect(page.getByText("Bay of Plenty")).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      breadcrumb.getByRole("link", { name: "Festivals" }),
    ).toBeVisible();
    await expect(breadcrumb.getByText("8th Wonder")).toBeVisible();

    await breadcrumb.getByRole("link", { name: "Festivals" }).click();
    await expect(page).toHaveURL(/\/festivals$/);

    await page.goto("/festivals/8th-wonder");
    await page
      .getByRole("navigation", { name: "Breadcrumb" })
      .getByRole("link", { name: "Home" })
      .click();
    await expect(page).toHaveURL("/");
  });
});
