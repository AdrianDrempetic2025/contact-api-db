
import { test, expect } from '@playwright/test';

test('submit form', async ({ page }) => {
  // fallback to localhost if STAGING_URL is not defined
  const baseUrl = process.env.STAGING_URL || 'http://localhost:3000';

  await page.goto(baseUrl);
  await page.fill('#name', 'Eve');
  await page.fill('#email', 'eve@evil.com');
  await page.fill('#message', 'hi');
  await page.click('text=Submit');
  await expect(page.locator('text=Thank you')).toBeVisible();
});
