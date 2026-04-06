import type { Page, Locator } from '@playwright/test';
import { AbstractPage } from './abstract.page';

export class LoginPage extends AbstractPage {
  readonly loginButton: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.locator('#login-button');
    this.emailField = page.locator('#login-email');
    this.passwordField = page.locator('#login-password');
  }

  async login(email: string, password: string) {
    await this.navigate('/login');
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
};
