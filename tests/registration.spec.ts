import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/registration.page';

test('fill registration form for Ukraine', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const registrationData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
    city: 'New York',
    country: 'Ukraine',
    phone: '+380123456789',
    street: '123 Main Street',
    zipCode: '10001'
  };

  await registrationPage.navigate();
  await registrationPage.fillRegistrationForm(registrationData);
  await expect(registrationPage.errorMessage).not.toBeVisible();
});

test('fill incorrect registration form for Ukraine', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const registrationData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
    city: 'New York',
    country: 'Ukraine',
    phone: '123-456-7890',
    street: '123 Main Street',
    zipCode: '10001'
  };
  const expectedErrorMessage = 'For Ukraine, phone number must start with +380 and have 12 digits.';

  await registrationPage.navigate();
  await registrationPage.fillRegistrationForm(registrationData);
  await expect(registrationPage.errorMessage).toBeVisible();
  await expect(registrationPage.errorMessage).toHaveText(expectedErrorMessage);
});