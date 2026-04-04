import {test, expect} from '@playwright/test';

test('Verify product images are displayed', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('login-page.png', {
     fullPage: true,
     animations: 'disabled',
    });
});