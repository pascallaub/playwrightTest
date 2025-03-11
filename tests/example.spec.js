// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Wikipedia Tests', () => {
  test('Navbar Test', async ({ page }) => {
    await page.goto('https://wikipedia.org/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Wikipedia/);

    // Überprüfe, ob Navigationselemente vorhanden sind
    const navigationElements = await page.locator('nav').locator('a');
    const navigationCount = await navigationElements.count();
    expect(navigationCount).toBeGreaterThan(0);
  });

  
  test('Search Test', async ({ page }) => {
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
  
  test('Language Test', async ({ page }) => {
    await page.goto('https://de.wikipedia.org/');
    await page.click('a[lang=en]');
    await page.fill('input[name="search"]', 'playwright');
    await page.click('input[type="search"]');
    
    await page.waitForTimeout(2000);
  
    //search for "Playwright"
    const pageContent = await page.content();
    await expect(pageContent).toContain('Playwright');
  });
});

test.describe('sauceDemoValidierung', () => {
  test('Login', async ({ page }) => {
    await page.goto('https://saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
  
    //username + passwort eintragen
    await page.getByPlaceholder('Username');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('leereEingabe', async ({ page }) => {
    await page.goto('https://saucedemo.com/');
    await page.click('#login-button');
    const errorLocator = await page.locator('[data-test="error"]');
    await expect(errorLocator).toContainText('Username is required');
  });

  test('falschesPasswort', async ({ page }) => {
    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'falschesPasswort');
    await page.click('#login-button');
    const errorLocator = await page.locator('[data-test="error"]');
    await expect(errorLocator).toContainText('Username and password do not match any user in this service');
  });
});