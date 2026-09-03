import { test, expect } from '@playwright/test';

test('home page loads and shows site statistics', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Aotearoa Festivals');
  await expect(page.getByRole('heading', { name: 'Aotearoa Festivals' })).toBeVisible();
  await expect(page.getByLabel('Site statistics')).toContainText('festivals');
  await expect(page.getByLabel('Site statistics')).toContainText('active');
  await expect(page.getByLabel('Site statistics')).toContainText('regions covered');
});
