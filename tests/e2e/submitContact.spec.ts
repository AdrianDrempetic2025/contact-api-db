import { test, expect } from '@playwright/test';

test.describe('contact form', () => {
  test('submits successfully', async ({ page }) => {
    // baseURL is taken from playwright.config.ts → use: { use: { baseURL: '...' } }
    await page.goto('/');

    await page.getByLabel('Name').fill('Eve');
    await page.getByLabel('Email').fill('eve@example.com');
    await page.getByLabel('Message').fill('Hello, this is at least twenty characters!');

    // record the POST and assert status
    const [response] = await Promise.all([
      page.waitForResponse(r => r.url().endsWith('/api/contact') && r.request().method() === 'POST'),
      page.getByRole('button', { name: 'Submit' }).click(),
    ]);
    expect(response.status()).toBe(201);

    // expect success UI, and check no error banners appear
    await expect(page.getByTestId('thank‑you')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByTestId('form-error')).toHaveCount(0);
  });
});
