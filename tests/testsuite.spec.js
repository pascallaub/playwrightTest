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

  test('Produkt zum Warenkorb hinzufügen und Checkout testen', async ({ page }) => {
    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForTimeout(2000);
    await page.click('.inventory_item:nth-child(1) .btn_inventory');
    await page.click('.shopping_cart_link');
    await page.waitForTimeout(2000);
    await page.click('.btn_action.checkout_button');
    await page.fill('#first-name', 'Max');
    await page.fill('#last-name', 'Mustermann');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.waitForTimeout(2000);
    await page.click('#finish');
    await page.waitForTimeout(2000);
    await page.textContent('.complete-header');
  });
  
  test('Überprüfung der Produktanzahl im Warenkorb', async ({ page }) => {
    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForTimeout(2000);
    await page.click('.inventory_item:nth-child(1) .btn_inventory');
    await page.click('.shopping_cart_link');
    await page.waitForTimeout(2000);
    const cartItemCount = await page.locator('.cart_quantity').innerText();
    expect(cartItemCount).toBe('1');
  });
});

test.describe('API Tests', () => {
  test('GET Request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
  });

  test('GET Failure', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999');
    expect(response.status()).toBe(404);
  });

  test('POST Request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  test('PUT Request', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('title', 'foo');
  });
});

test.describe('Mobile Tests', () => {
  test('Mobile View iPhone', async ({ page }) => {
    await page.goto('https://wikipedia.org/');
    await page.setViewportSize({ width: 375, height: 812 });
    const title = await page.title();
    expect(title).toContain('Wikipedia');
  });

  test('Mobile View iPad', async ({ page }) => {
    await page.goto('https://wikipedia.org/');
    await page.setViewportSize({ width: 768, height: 1024 });
    const title = await page.title();
    expect(title).toContain('Wikipedia');
  });

  test('Mobile View Galaxy S9', async ({ page }) => {
    await page.goto('https://wikipedia.org/');
    await page.setViewportSize({ width: 360, height: 740 });
    const title = await page.title();
    expect(title).toContain('Wikipedia');
  });

  test('Mobile View Navbar', async ({ page }) => {
    await page.goto('https://wikipedia.org/');
    await page.setViewportSize({ width: 375, height: 812 });
    const navigationElements = await page.locator('nav').locator('a');
    const navigationCount = await navigationElements.count();
    expect(navigationCount).toBeGreaterThan(0);
  });
});