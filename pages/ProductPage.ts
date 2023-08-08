import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";
import { stripDollars } from "../utils/prices.utils";

class ProductPage extends AbstractPage {
  private productNameLabel: Locator;
  private productPriceLabel: Locator;
  private decreaseQuantityButton: Locator;
  private increaseQuantityButton: Locator;
  private quantityInput: Locator;
  private addToCartButton: Locator;
  private addToFavouritesButton: Locator;
  private toastMessage: Locator;
  private relatedProductsList: Locator;
  constructor(page: Page) {
    super(page);

    this.productNameLabel = page.locator(".col-md-6 h1");
    this.productPriceLabel = page.locator('[data-test="unit-price"]');
    this.decreaseQuantityButton = page.locator(
      '[data-test="decrease-quantity"]'
    );
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.increaseQuantityButton = page.locator(
      '[data-test="increase-quantity"]'
    );
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.addToFavouritesButton = page.locator('[data-test="add-to-favorites"]');
    this.toastMessage = page.getByRole("alert");
    this.relatedProductsList = page.locator("h5.card-title");
  }

  async getProductNameText() {
    await this.waitForAllResponses();
    return this.productNameLabel.innerText();
  }

  async getProductPriceText() {
    await this.waitForAllResponses();
    const price = await this.productPriceLabel.innerText();
    return stripDollars(price);
  }

  async getRelatedProductsNames() {
    return this.relatedProductsList.allInnerTexts();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async getMessageText() {
    await this.toastMessage.waitFor({ state: "visible" });
    const messageText = await this.toastMessage.innerText();
    await this.toastMessage.waitFor({ state: "hidden" });
    return messageText;
  }

  async increaseProuductQuantity() {
    await this.increaseQuantityButton.click();
  }

  async decreaseProductQuantity() {
    await this.decreaseQuantityButton.click();
  }

  async setProductQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.quantityInput.type(String(quantity));
  }

  async addProductToFavourites() {
    await this.addToFavouritesButton.click();
  }
}

export default ProductPage;
