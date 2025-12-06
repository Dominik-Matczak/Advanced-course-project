import { test, expect } from '@playwright/test';

test.describe('Login page E2E', () => {

  test('should log in successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="username"]', 'derek');
    await page.fill('input[name="password"]', 'jklg*_56');

    await page.click('button[type="submit"]');


    await expect(page.locator('text=Profile')).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="username"]', 'wrongUser');
    await page.fill('input[name="password"]', 'wrongPass');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Wrong username or password')).toBeVisible();
  });

});
