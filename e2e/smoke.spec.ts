import { test, expect } from "@playwright/test";

test("home page loads and shows the festival/promoter/artist counts", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Aotearoa Festivals");
  await expect(
    page.getByRole("heading", { name: "Aotearoa Festivals" }),
  ).toBeVisible();
  await expect(
    page.getByText(/festivals ·.*promoters ·.*artists/),
  ).toBeVisible();
});
