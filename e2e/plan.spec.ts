import { expect, test } from "@playwright/test";

test.describe("festival season plan", () => {
  test("plan page loads and groups festivals by season", async ({ page }) => {
    await page.goto("/plan");
    await expect(
      page.getByRole("heading", { name: "Plan your festival season" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Summer/ })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /to my plan/ }).first(),
    ).toBeVisible();
  });

  test("saving a festival on the dashboard persists to the plan page", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Add Rhythm and Vines to my plan" })
      .click();
    await expect(
      page.getByRole("button", {
        name: "Remove Rhythm and Vines from my plan",
      }),
    ).toBeVisible();

    await page.goto("/plan");
    await expect(
      page.getByRole("button", {
        name: "Remove Rhythm and Vines from my plan",
      }),
    ).toBeVisible();
  });

  test("removing a festival from the plan clears the saved state", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Add Rhythm and Vines to my plan" })
      .click();
    await page.goto("/plan");
    await page
      .getByRole("button", { name: "Remove Rhythm and Vines from my plan" })
      .click();
    await expect(
      page.getByRole("button", {
        name: "Remove Rhythm and Vines from my plan",
      }),
    ).toHaveCount(0);
  });
});
