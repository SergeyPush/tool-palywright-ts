import { expect } from "@playwright/test";
import { test } from "../../config/config";

test.describe("Test cart page", () => {
  test.beforeEach(async ({ app }) => {
    await app.homePage.openProduct(0);
    await app.productPage.addProductToCart();
    const quantity = await app.mainMenu.getCartQuantityLocator();
    expect(quantity).toHaveText("1");
    await app.mainMenu.navigateToHomePage();
    await app.homePage.openProduct(4);
    await app.productPage.addProductToCart();
    await app.productPage.addProductToCart();
    expect(quantity).toHaveText("3");
  });

  test("User can add product to cart", async ({ app }) => {
    await app.mainMenu.openCartPage();
    const data = await app.cartPage.getAllProductsInfo();
    const totalPrice = await app.cartPage.getTotalPriceNumber();
    const totalCounted = data.reduce((acc, item) => item.total + acc, 0);
    expect(totalPrice).toEqual(totalCounted);
  });

  test("Remove item from cart", async ({ app }) => {
    await app.mainMenu.openCartPage();
    expect(await app.cartPage.getItemsCount()).toEqual(2);
    await app.cartPage.removeItemFromCart();
    expect(await app.cartPage.getItemsCount()).toEqual(1);
    await app.cartPage.removeItemFromCart();
    expect(await app.cartPage.getItemsCount()).toEqual(0);
  });
});
