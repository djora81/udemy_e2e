import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AbstractPage } from '../pages/abstract.page';

test('Verify login page image', async ({ page }) => {
  const abstractPage = new AbstractPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.navigate('/login');

  await abstractPage.verifyVisualSnapshot('login-page.png', {
     maxDiffPixels: 100, // Allow for minor rendering differences
  });
});

test('Verify catalog page image', async ({ page }) => {
  const abstractPage = new AbstractPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.navigate('/');

  await abstractPage.verifyVisualSnapshot('catalog-page.png', {
     maxDiffPixelRatio: 0.1, // Allow for minor rendering differences
  });
});
