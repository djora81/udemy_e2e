import { type Page, type Locator, expect } from '@playwright/test';
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
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginRegisterButton = page.locator('#login-register-button');
    this.firstNameInput = page.locator('#register-first-name');
    this.lastNameInput = page.locator('#register-last-name');
    this.emailInput = page.locator('#register-email');
    this.passwordInput = page.locator('#register-password');
    this.cityInput = page.locator('#register-city');
    this.countryDropdown = page.locator('#register-country');
    this.phoneInput = page.locator('#register-phone');
    this.streetInput = page.locator('#register-street');
    this.zipCodeInput = page.locator('#register-zip');
    this.confirmRegisterButton = page.locator('#register-button');
    this.successMessage = page.locator('#register-success');
    this.errorMessage = page.locator('#register-error');

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
