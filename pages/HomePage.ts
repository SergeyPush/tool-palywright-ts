import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";
import { stripDollars } from "../utils/prices.utils";

class HomePage extends AbstractPage {
  private productItems: Locator;
  private sortSelect: Locator;
  private productNamesLabels: Locator;
  private searchInput: Locator;
  private filtersSection: Locator;
  private productItem: Locator;

  constructor(page: Page) {
    super(page);
    this.productItems = page.locator(".col-md-9 .container");
    this.productItem = page.locator(".container .card");
    this.productNamesLabels = page.locator(".card-title");
    this.sortSelect = page.locator('[data-test="sort"]');
    this.searchInput = page.locator("[data-test='search-query']");
    this.filtersSection = page.locator("#filters");
  }

  async getProductItemsNamesTexts() {
    await this.waitForAllResponses();
    return this.productNamesLabels.allInnerTexts();
  }

  async getProductItemsPricesTexts() {
    const products = await this.productItems
      .locator("[data-test='product-price']")
      .allInnerTexts();
    return stripDollars(products);
  }

  async getProductItem(id: number) {
    return this.productItems.nth(id);
  }

  async selectSorting(option: string) {
    await this.sortSelect.selectOption(option);
    await this.waitForResponse("/products");
  }

  async searchProducts(therm: string) {
    await this.searchInput.type(therm);
    await this.page.keyboard.press("Enter");
    await this.waitForResponse("/products");
  }

  async checkFilter(filterName: string) {
    await this.filtersSection.getByText(filterName).click();
    await this.waitForResponse();
  }

  async openProduct(id: number) {
    const product = this.productItems.locator(".card").nth(id);
    const name = await product
      .locator("[data-test='product-name']")
      .innerText();
    const priceString = await product
      .locator("[data-test='product-price']")
      .innerText();
    const price = stripDollars(priceString);
    await product.click();
    return { name, price };
  }
}
export default HomePage;
