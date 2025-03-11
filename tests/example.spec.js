// @ts-check
import { test, expect } from '@playwright/test';

test('wikipedia', async ({ page }) => {
  await page.goto('https://wikipedia.org/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

  // Überprüfe, ob Navigationselemente vorhanden sind
  const navigationElements = await page.locator('nav').locator('a');
  const navigationCount = await navigationElements.count();
  expect(navigationCount).toBeGreaterThan(0);
});

test('saucedemo', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);

  //username + passwort eintragen
  await page.getByPlaceholder('Username');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
})

test('wikipedia1', async ({ page }) => {
  await page.goto('https://de.wikipedia.org/');
  await page.fill('input[name="search"]', 'playwright');
  await page.click('input[type="submit"]');

  await page.waitForTimeout(2000);

  //search for "Playwright"
  const pageContent = await page.content();
  await expect(pageContent).toContain('Playwright');

  //screenshot
  await page.screenshot({ path: 'screenshot.png' });
});