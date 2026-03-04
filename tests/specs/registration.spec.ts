// import { test, expect } from '@playwright/test';
import { RegistrationBuilder } from '../builders/registration.builder';
import { test, expect } from '../fixtures/registration.fixtures';

test('Register with Ukrainian phone number', async ({ registrationPage }) => {
  const user = new RegistrationBuilder()
    .withUkrainianPhone() // Ensure the phone number is valid for Ukraine
    .build();

  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(user);
  await expect(registrationPage.errorMessage).not.toBeVisible();
});

test('Fill incorrect registration form for Ukraine', async ({ registrationPage }) => {
  const user = new RegistrationBuilder().build();
  const expectedErrorMessage = 'For Ukraine, phone number must start with +380 and have 12 digits.';

  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(user);
  await expect(registrationPage.errorMessage).toBeVisible();
  await expect(registrationPage.errorMessage).toHaveText(expectedErrorMessage);
});

test('Override user data in registration form', async ({ registrationPage, newUser }) => {
  const newUserWithOverride = new RegistrationBuilder()
    .withCountry('Germany')
    .build();

  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(newUserWithOverride);

  await expect(registrationPage.errorMessage).not.toBeVisible();
});
