import { test, expect } from "@playwright/test";

test.describe("/search", () => {
  test("typing a known festival name shows it as a result", async ({
    page,
  }) => {
    await page.goto("/search");
    await expect(
      page.getByRole("heading", { name: "Search", level: 1 }),
    ).toBeVisible();

    const input = page.getByPlaceholder(
      "Search festivals, artists, promoters...",
    );
    await expect(async () => {
      await input.fill("8th Wonder");
      await expect(page.getByRole("status")).toContainText('for "8th Wonder"');
    }).toPass();

    await expect(page.getByRole("link", { name: /8th Wonder/ })).toBeVisible();
  });
});
