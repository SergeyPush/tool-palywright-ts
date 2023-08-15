import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";

class Menu extends AbstractPage {
  private categoriesMenuDropdown: Locator;
  private categoryHandTools: Locator;
  private categoryPowerTools: Locator;
  private categorySpecialTools: Locator;
  private categoryTitleLabel: Locator;
  private homePageLink: Locator;
  private cartQuantityBage: Locator;
  private userMenuDropdown: Locator;
  private cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.categoriesMenuDropdown = page.locator('[data-test="nav-categories"]');
    this.categoryHandTools = page.locator('[data-test="nav-hand-tools"]');
    this.categoryPowerTools = page.locator('[data-test="nav-power-tools"]');
    this.categorySpecialTools = page.locator('[data-test="nav-special-tools"]');
    this.categoryTitleLabel = page.locator('[data-test="page-title"]');
    this.homePageLink = page.getByRole("link", {
      name: "Practice Software Testing - Toolshop",
    });
    this.cartQuantityBage = page.locator('[data-test="cart-quantity"]');
    this.userMenuDropdown = page.locator("#user-menu");
    this.cartLink = page.locator('[data-test="nav-cart"]');
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
