import { test, expect } from "@playwright/test";

test.describe("dark mode toggle", () => {
  test("toggling adds/removes the dark class on <html> and persists across reload", async ({
    page,
  }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    const toDark = page.getByRole("button", { name: "Switch to dark mode" });
    await expect(async () => {
      await toDark.click();
      await expect(html).toHaveClass(/dark/);
    }).toPass();

    await page.reload();
    await expect(html).toHaveClass(/dark/);

    const toLight = page.getByRole("button", { name: "Switch to light mode" });
    await expect(async () => {
      await toLight.click();
      await expect(html).not.toHaveClass(/dark/);
    }).toPass();

    await page.reload();
    await expect(html).not.toHaveClass(/dark/);
  });
});
