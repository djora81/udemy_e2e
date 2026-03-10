import { log } from 'node:console';
import { RegistrationBuilder } from '../builders/registration.builder';
import { test, expect } from '../fixtures/registration.fixtures';
import { BasketPage } from '../pages/basket.page';
import { CatalogPage } from '../pages/catalog.page';
import { LoginPage } from '../pages/login.page';
import { RegistrationPage } from '../pages/registration.page';

test('Log in with created user', async ({ page }) => {
  const email = process.env.TEST_EMAIL!;
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const registrationPage = new RegistrationPage(page);
  const registrationBuilder = new RegistrationBuilder();
  const catalogTitleText = '🛍️ Welcome to Our Shop';

  const user = new RegistrationBuilder()
    .withEmail(email)
    .withUkrainianPhone() // Ensure the phone number is valid for Ukraine
    .build();
  
  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(user);
  await expect(registrationPage.errorMessage).not.toBeVisible();
  await expect(registrationPage.successMessage).toBeVisible();
  await loginPage.login(email, registrationBuilder.build().password);
  await expect(catalogPage.catalogTitle).toBeVisible();
  await expect(catalogPage.catalogTitle).toHaveText(catalogTitleText);
});

test('Select product from catalog', async ({ page }) => {
  const email = process.env.TEST_EMAIL!;
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const registrationPage = new RegistrationPage(page);
  const registrationBuilder = new RegistrationBuilder();
  const addToBasketText = 'Add to Basket';
  const removeFromBasketText = 'Remove from Basket';

  const user = new RegistrationBuilder()
    .withEmail(email)
    .withUkrainianPhone() // Ensure the phone number is valid for Ukraine
    .build();
  
  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(user);
  await expect(registrationPage.successMessage).toBeVisible();

  await loginPage.login(email, registrationBuilder.build().password);
  await expect(catalogPage.catalogTitle).toBeVisible();

  await expect(catalogPage.walletProduct).toHaveText(addToBasketText);
  await catalogPage.selectProduct('Wallet');
  await expect(catalogPage.walletProduct).toHaveText(removeFromBasketText);
  await expect(catalogPage.basketCount).toHaveText('1');
  
  await expect(catalogPage.tabletProduct).toHaveText(addToBasketText);
  await catalogPage.selectProduct('Tablet');
  await expect(catalogPage.tabletProduct).toHaveText(removeFromBasketText);
  await expect(catalogPage.basketCount).toHaveText('2');
});

test('Verify total price', async ({ page }) => {
  const email = process.env.TEST_EMAIL!;
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const registrationPage = new RegistrationPage(page);
  const basketPage = new BasketPage(page);
  const registrationBuilder = new RegistrationBuilder();

  const user = new RegistrationBuilder()
    .withEmail(email)
    .withUkrainianPhone() // Ensure the phone number is valid for Ukraine
    .build();
  
  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(user);
  await expect(registrationPage.successMessage).toBeVisible();

  await loginPage.login(email, registrationBuilder.build().password);
  await expect(catalogPage.catalogTitle).toBeVisible();

  await catalogPage.selectProduct('Wallet');
  await expect(catalogPage.basketCount).toHaveText('1');
  await catalogPage.selectProduct('Tablet');
  await expect(catalogPage.basketCount).toHaveText('2');

  await catalogPage.basketTab.click();
  await expect(basketPage.basketTitle).toBeVisible();

  const totalBasketPriceText = await basketPage.totalPrice.textContent();
  const totalBasketPrice = parseFloat((totalBasketPriceText)?.replace(/[^0-9.-]+/g, '') || '0');
  await expect(totalBasketPrice).toEqual(await basketPage.countTotalPrice());
});
