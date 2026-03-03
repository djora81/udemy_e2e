import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/registration.page';

test('fill registration form', async ({ page }) => {
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
  await registrationPage.navigate();
  
  await registrationPage.fillRegistrationForm(registrationData);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('React App');
});