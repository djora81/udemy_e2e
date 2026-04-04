import {test, expect} from '@playwright/test';

test('Verify login page image', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('login-page.png', {
     fullPage: true,
     animations: 'disabled',
    });
});

test('Verify catalog page image', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('catalog-page.png', {
     fullPage: true,
     animations: 'disabled',
    });
});
