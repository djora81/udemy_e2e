import { expect, Page } from '@playwright/test';

export class AbstractPage {
  constructor(public page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyVisualSnapshot(snapshotName: string, options = {}) {
    await expect(this.page).toHaveScreenshot(snapshotName, {
      fullPage: true,
      animations: 'disabled',
      ...options
    });
  }
};

// exports.AbstractPage = class AbstractPage {
//   constructor(public page: Page) {
//     this.page = page;
//   }

//   async navigate(url: string) {
//     await this.page.goto(url);
//     await this.page.waitForLoadState('networkidle');
//   }
// };
