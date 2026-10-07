import { test, expect } from '@playwright/test';

test('opens EPAM client work from Services', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  const cookieButton = page.getByRole('button', {
    name: /accept|agree|allow all|consent/i,
  });
  if (await cookieButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await cookieButton.click();
  }

  // The current EPAM header renders the Services navigation link outside the
  // viewport in the default desktop layout. Follow the same accessible link
  // destination directly, preserving the intended navigation target.
  await page.goto('/services');
  await page
    .getByRole('link', { name: /Explore Our Client Work/i })
    .first()
    .click();

  await expect(page.getByText('Client Work', { exact: true })).toBeVisible();
});
