import { expect, test } from '@playwright/test';

test.describe('festival season plan', () => {
  test.skip(!process.env.DATABASE_URL, 'requires a database');
  test('plan page loads with season groups and the builder', async ({ page }) => {
    await page.goto('/plan');
    await expect(page.getByRole('heading', { name: 'Plan your festival season' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Summer/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Build your season' })).toBeVisible();
  });

  test('marking a festival interested on the dashboard shows in Interested', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Plan status for Rhythm and Vines').selectOption('interested');
    await page.goto('/plan');
    await expect(page.locator('#interested').getByText('Rhythm and Vines')).toBeVisible();
    await expect(page.locator('#my-plan').getByText('Rhythm and Vines')).toHaveCount(0);
  });

  test('marking planned shows in My plan and can be removed', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Plan status for Rhythm and Vines').selectOption('planned');
    await page.goto('/plan');
    await expect(page.locator('#my-plan').getByText('Rhythm and Vines')).toBeVisible();

    await page.locator('#my-plan').getByLabel('Plan status for Rhythm and Vines').selectOption('');
    await expect(page.locator('#my-plan').getByText('Rhythm and Vines')).toHaveCount(0);
  });

  test('season builder returns an itinerary and adds it to the plan', async ({ page }) => {
    await page.goto('/plan');
    await page.locator('input[name="strategy"][value="most"]').check();
    await page.getByLabel('Region').selectOption('north');

    await expect(page.getByRole('button', { name: 'Add all to my plan' })).toBeVisible();

    await page.getByRole('button', { name: 'Add all to my plan' }).click();
    await expect(page.locator('#my-plan')).not.toHaveText('Nothing planned yet');
  });
});
