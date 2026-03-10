import { type Page, type Locator, expect } from '@playwright/test';
import { log } from 'node:console';

export class BasketPage {
  readonly page: Page;
  readonly basketTitle: Locator;
  readonly walletPrice: Locator;
  readonly tabletPrice: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketTitle = page.locator('#cart-title');
    this.walletPrice = page.locator('#cart-item-price-1');
    this.tabletPrice = page.locator('#cart-item-price-5');
    this.totalPrice = page.locator('#cart-total');
  }

  async countTotalPrice() {
    const walletPriceText = await this.walletPrice.textContent();
    const tabletPriceText = await this.tabletPrice.textContent();
    const walletPrice = parseFloat(walletPriceText?.replace(/\D/g, '') || '0');
    const tabletPrice = parseFloat(tabletPriceText?.replace(/\D/g, '') || '0');
    const totalPrice = walletPrice + tabletPrice;
    const totalBasketPrice = parseFloat(totalPrice.toFixed(0)); 
    return totalBasketPrice;
  } 
};
