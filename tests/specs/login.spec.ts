import { RegistrationBuilder } from '../builders/registration.builder';
import { test, expect } from '../fixtures/registration.fixtures';
import { CatalogPage } from '../pages/catalog.page';
import { LoginPage } from '../pages/login.page';
import { RegistrationPage } from '../pages/registration.page';

test('Log in with created user', async ({ page }) => {
  const email = 'zuk@gmail.com';
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