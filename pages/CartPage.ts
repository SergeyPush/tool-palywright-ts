import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";
import { stripDollars } from "../utils/prices.utils";

class CartPage extends AbstractPage {
  private productList: Locator;
  private totalPriceLabel: Locator;
  private proceedToCheckoutButton: Locator;
  constructor(page: Page) {
    super(page);
    this.productList = page.locator("tbody > tr");
    this.totalPriceLabel = page.locator("tfoot td:nth-child(5)");
  }

  async getSingleItemInfo(item: Locator) {
    const title = await item.locator(".product-title").innerText();
    const quantity = await item.locator(".quantity").inputValue();
    const price = await item.locator("td:nth-child(4)").innerText();
    const total = await item.locator("td:nth-child(5)").innerText();

    return {
      title,
      quantity: Number(quantity),
      price: stripDollars(price),
      total: stripDollars(total),
    };
  }

  async getAllProductsInfo() {
    const products = await this.productList.all();
    const productsDataList = Promise.all(
      products.map(async (product) => await this.getSingleItemInfo(product))
    );
    return productsDataList;
  }

  async getTotalPriceNumber() {
    const totalPrice = await this.totalPriceLabel.innerText();
    return stripDollars(totalPrice);
  }

  async removeItemFromCart(item: number = 0) {
    const productItem = this.productList.nth(item);
    await productItem.locator(".btn").click();
  }

  async getItemsCount() {
    return this.productList.count();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

export default CartPage;
