import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";

class Menu extends AbstractPage {
  private categoriesMenuDropdown = this.page.locator(
    '[data-test="nav-categories"]'
  );
  private categoryHandTools = this.page.locator('[data-test="nav-hand-tools"]');
  private categoryPowerTools = this.page.locator(
    '[data-test="nav-power-tools"]'
  );
  private categorySpecialTools = this.page.locator(
    '[data-test="nav-special-tools"]'
  );
  private categoryTitleLabel = this.page.locator('[data-test="page-title"]');
  private homePageLink = this.page.getByRole("link", {
    name: "Practice Software Testing - Toolshop",
  });
  private cartQuantityBage = this.page.locator('[data-test="cart-quantity"]');
  private userMenuDropdown = this.page.locator("#user-menu");
  private cartLink = this.page.locator('[data-test="nav-cart"]');

  constructor(page: Page) {
    super(page);
  }

  async getCategoryTitle() {
    return this.categoryTitleLabel.innerText();
  }

  async navigateToHandTools() {
    await this.categoriesMenuDropdown.click();
    await this.categoryHandTools.click();
    await this.waitForResponse("categories/tree");
    await this.waitForAllResponses();
  }

  async navigateToPowerTools() {
    await this.categoriesMenuDropdown.click();
    await this.categoryPowerTools.click();
    await this.waitForResponse("categories/tree");
    await this.waitForAllResponses();
  }

  async getCartQuantityText() {
    const cartQuantity = await this.cartQuantityBage.innerText();
    return Number(cartQuantity);
  }

  async getCartQuantityLocator() {
    return this.cartQuantityBage;
  }

  async navigateToSpecialTools() {
    await this.categoriesMenuDropdown.click();
    await this.categorySpecialTools.click();
    await this.waitForResponse("categories/tree");
    await this.waitForAllResponses();
  }

  async navigateToHomePage() {
    await this.homePageLink.click();
    await this.waitForResponse();
    await this.waitForAllResponses();
  }

  async getUserDropdownLocator() {
    return this.userMenuDropdown;
  }

  async openCartPage() {
    await this.cartLink.waitFor({ state: "visible" });
    await this.cartLink.click();
    await this.waitForUrl("/checkout");
  }
}

export default Menu;
