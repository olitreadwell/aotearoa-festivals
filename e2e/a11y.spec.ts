import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/festivals",
  "/festivals/8th-wonder",
  "/artists",
  "/artists/fat-freddys-drop",
  "/promoters",
  "/promoters/audiology-touring",
  "/regions",
  "/regions/auckland",
  "/search",
  "/subscribe",
];

for (const path of PAGES) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const serious = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
