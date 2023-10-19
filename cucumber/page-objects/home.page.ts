import { Page } from "playwright";
import AbstractPage from "./abstract.page";

class HomePage extends AbstractPage {
  private productList = this.page.locator(".inventory_item");
  private productListNames = this.page.locator(
    ".inventory_item .inventory_item_name"
  );
  private shoppingCartBage = this.page.locator(".shopping_cart_badge");

  constructor(page: Page) {
    super(page);
  }

  async getProductListNames() {
    return this.productListNames.allInnerTexts();
  }

  async addProductToCart(productNumber: number) {
    await this.productList.nth(productNumber).getByText("Add to cart").click();
  }

  async getShoppingCartBageNuber() {
    await this.shoppingCartBage.waitFor({ state: "visible", timeout: 2000 });
    return Number(await this.shoppingCartBage.innerText());
  }
}

export default HomePage;
