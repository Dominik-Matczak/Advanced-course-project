import { test, expect } from '@playwright/test';

{/* 
    Full flow of my page:
    
    Go to homepage >>
    Add a product to the cart >>
    Go to the cart >>
    Click button Procced >>
    Login >>
    Get back to the cart >>
    Once you are logged in, form is already filled, all you need to choose is payment method >>
    On submit there is a slight delay to simulate time for response from outter service
    You get redirected to the page with summary

*/}

test('full purchase flow with login and checkout', async ({ page }) => {

  await page.goto('http://localhost:5173');


  const addToCartButton = page.locator('button', { hasText: 'Add to cart' }).first();
  await addToCartButton.click();

  await page.goto('http://localhost:5173/cart');

  const proceedButton = page.locator('button', { hasText: 'Procced' });
  await proceedButton.click();

  const loginPrompt = page.locator('text=To continue, you need to login');
  await expect(loginPrompt).toBeVisible();

  await loginPrompt.click();

  await page.fill('input[name="username"]', 'derek');
  await page.fill('input[name="password"]', 'jklg*_56');

  await page.click('button[type="submit"]');

  await page.waitForURL('http://localhost:5173/');

  await page.goto('http://localhost:5173/cart');

  await proceedButton.click();

  const orderForm = page.locator('form');
  await expect(orderForm).toBeVisible();

  await page.fill('input[name="firstname"]', 'Dominik');
  await page.fill('input[name="lastname"]', 'Matczak');
  await page.fill('input[name="city"]', 'Warszawa');
  await page.fill('input[name="street"]', 'Marszalkowska 21/37c');
  await page.fill('input[name="zipcode"]', '00-020');

  

  const paymentSelect = page.locator('#mui-component-select-paymentMethod');
  await paymentSelect.click();

  const traditionalOption = page.locator('li[role="option"]:has-text("Traditional Transfer")');
  await expect(traditionalOption).toBeVisible();
  await traditionalOption.click();

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/order-success/);
});
