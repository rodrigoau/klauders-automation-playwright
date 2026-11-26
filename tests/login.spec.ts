import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://klauders.com/automate-the-internet');
  await page.goto('https://klauders.com/automate-the-internet?lang=en');
  await page.getByText('Practice automation on real-').click();
  await expect(page.locator('h1')).toContainText('Practice automation on real-world UI patterns');
});