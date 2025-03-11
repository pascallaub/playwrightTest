// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://wikipedia.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

  // Überprüfe, ob Navigationselemente vorhanden sind
  const navigationElements = await page.locator('nav').locator('a');
  const navigationCount = await navigationElements.count();
  expect(navigationCount).toBeGreaterThan(0);
});

