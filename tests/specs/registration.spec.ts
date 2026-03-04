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

test('fill incorrect registration form for Ukraine', async ({ registrationPage }) => {
  const user = new RegistrationBuilder().build();
  const expectedErrorMessage = 'For Ukraine, phone number must start with +380 and have 12 digits.';

  await registrationPage.navigate();
  await registrationPage.openRegistrationForm();
  await registrationPage.fillRegistrationForm(user);
  await expect(registrationPage.errorMessage).toBeVisible();
  await expect(registrationPage.errorMessage).toHaveText(expectedErrorMessage);
});

// test('test registration builder', async ({ page }) => {
//   const registrationPage = new RegistrationPage(page);
//   const registrationData = {
//     firstName: 'Alex',
//     lastName: 'Trevor',
//     email: 'alex.trevor@example.com',
//     password: 'Password123!',
//     city: 'New York',
//     country: 'Ukraine',
//     phone: '123-456-7890',
//     street: '123 Main Street',
//     zipCode: '10001'
//   };

//   await registrationPage.navigate();

//   const user = new RegistrationBuilder().withEmail(registrationData.email).build();

//   await registrationPage.fillRegistrationForm(user);
//   await expect(registrationPage.errorMessage).toBeVisible();
// });