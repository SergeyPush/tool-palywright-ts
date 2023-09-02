import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";
import { stripDollars } from "../utils/prices.utils";

class ProductPage extends AbstractPage {
  private productNameLabel = this.page.locator(".col-md-6 h1");
  private productPriceLabel = this.page.locator('[data-test="unit-price"]');
  private decreaseQuantityButton = this.page.locator(
    '[data-test="decrease-quantity"]'
  );
  private increaseQuantityButton = this.page.locator(
    '[data-test="increase-quantity"]'
  );
  private quantityInput = this.page.locator('[data-test="quantity"]');
  private addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private addToFavouritesButton = this.page.locator(
    '[data-test="add-to-favorites"]'
  );
  private toastMessage = this.page.getByRole("alert");
  private relatedProductsList = this.page.locator("h5.card-title");
  constructor(page: Page) {
    super(page);
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
    await this.waitForAllResponses();
    // await this.waitForResponse("/related");
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
