import type { Page, Locator } from '@playwright/test';

export class CatalogPage  {
  readonly page: Page;
  readonly catalogTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogTitle = page.locator('#catalog-title');
  }

  
};