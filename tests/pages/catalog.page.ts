import type { Page, Locator } from '@playwright/test';

export class CatalogPage  {
  readonly page: Page;
  readonly catalogTitle: Locator;
  readonly basketTab: Locator;
  readonly basketCount: Locator;
  readonly walletProduct: Locator;
  readonly tabletProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogTitle = page.locator('#catalog-title');
    this.basketTab = page.locator('#nav-cart');
    this.basketCount = page.locator('#cart-count');
    this.walletProduct = page.locator('#product-add-1');
    this.tabletProduct = page.locator('#product-add-5');
  }

  async selectProduct(productName: string) {
    switch (productName) {
      case 'Wallet':
        await this.walletProduct.click();
        break;
      case 'Tablet':
        await this.tabletProduct.click();
        break;
      default:
        throw new Error(`Product ${productName} not found in catalog`);
    }
  }
};