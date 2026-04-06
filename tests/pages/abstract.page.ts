import { expect, Page } from '@playwright/test';

export class AbstractPage {
  constructor(public page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
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
