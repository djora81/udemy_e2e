import type { Page, Locator } from '@playwright/test';
import { RegistrationData } from '../types/registration.types';

export class RegistrationPage {
  readonly page;
  readonly loginRegisterButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly cityInput: Locator;
  readonly countryDropdown: Locator
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly zipCodeInput: Locator;
  readonly confirmRegisterButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginRegisterButton = page.locator('[id="login-register-button"]');
    this.firstNameInput = page.locator('[id="register-first-name"]');
    this.lastNameInput = page.locator('[id="register-last-name"]');
    this.emailInput = page.locator('[id="register-email"]');
    this.passwordInput = page.locator('[id="register-password"]');
    this.cityInput = page.locator('[id="register-city"]');
    this.countryDropdown = page.locator('[id="register-country"]');
    this.phoneInput = page.locator('[id="register-phone"]');
    this.streetInput = page.locator('[id="register-street"]');
    this.zipCodeInput = page.locator('[id="register-zip"]');
    this.confirmRegisterButton = page.locator('[id="register-button"]');
    this.errorMessage = page.locator('[id="register-error"]');

  }
  
  async navigate() {
    await this.page.goto('/login');
  }

  async openRegistrationForm() {
    await this.loginRegisterButton.click();
  }

  async fillRegistrationForm(data: RegistrationData ) {
    // Fill in the registration form fields
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.cityInput.fill(data.city);
    await this.countryDropdown.selectOption(data.country);
    await this.phoneInput.fill(data.phone);
    await this.streetInput.fill(data.street);
    await this.zipCodeInput.fill(data.zipCode);
    await this.confirmRegisterButton.click();
  }
}
