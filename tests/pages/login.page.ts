import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('#login-button');
    this.emailField = page.locator('#login-email');
    this.passwordField = page.locator('#login-password');
  }

  async login(email: string, password: string) {
    await this.page.goto('/login');
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
};
