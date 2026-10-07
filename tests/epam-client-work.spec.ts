import { test, expect } from '@playwright/test';

test('opens EPAM client work from Services', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  const cookieButton = page.getByRole('button', {
    name: /accept|agree|allow all|consent/i,
  });
  if (await cookieButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await cookieButton.click();
  }

  await page.getByRole('link', { name: 'Services', exact: true }).click();
  await page
    .getByRole('link', { name: /Explore Our Client Work/i })
    .click();

  await expect(page.getByText('Client Work', { exact: true })).toBeVisible();
});
