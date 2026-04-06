import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Verify login page image', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('/login');

  await expect(page).toHaveScreenshot('login-page.png', {
     fullPage: true,
     animations: 'disabled',
    });
});

test('Verify catalog page image', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('/');

  await expect(page).toHaveScreenshot('catalog-page.png', {
     fullPage: true,
     animations: 'disabled',
    });
});
