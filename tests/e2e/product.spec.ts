import { expect } from "@playwright/test";
import { test } from "../config/config";

test.describe("Test product page functionality", () => {
  test("Open proudct", async ({ app }) => {
    const { name, price } = await app.homePage.openProduct(1);
    const productName = await app.productPage.getProductNameText();
    const productPrice = await app.productPage.getProductPriceText();
    const relatedProducts = await app.productPage.getRelatedProductsNames();
    expect(name).toBe(productName);
    expect(price).toBe(productPrice);
    expect(relatedProducts.length).toBeGreaterThan(2);
  });

  test("Add product to cart", async ({ app }) => {
    await app.homePage.openProduct(1);
    await app.productPage.addProductToCart();
    expect(await app.productPage.getMessageText()).toBe(
      "Product added to shopping cart."
    );
    await app.mainMenu.navigateToHomePage();
    await app.homePage.openProduct(2);
    await app.productPage.addProductToCart();
    expect(await app.productPage.getMessageText()).toBe(
      "Product added to shopping cart."
    );
    const cartQuantity = await app.mainMenu.getCartQuantityText();
    expect(cartQuantity).toBe(2);
  });

  test("Add several products to cart", async ({ app }) => {
    await app.homePage.openProduct(1);
    await app.productPage.addProductToCart();
    expect(await app.mainMenu.getCartQuantityText()).toBe(1);
    expect(await app.productPage.getMessageText()).toBe(
      "Product added to shopping cart."
    );

    await app.productPage.increaseProuductQuantity();
    await app.productPage.addProductToCart();
    expect(await app.mainMenu.getCartQuantityText()).toBe(3);
    expect(await app.productPage.getMessageText()).toBe(
      "Product added to shopping cart."
    );

    await app.productPage.setProductQuantity(3);
    await app.productPage.addProductToCart();
    expect(await app.mainMenu.getCartQuantityText()).toBe(6);
    expect(await app.productPage.getMessageText()).toBe(
      "Product added to shopping cart."
    );

    await app.productPage.decreaseProductQuantity();
    await app.productPage.addProductToCart();
    expect(await app.mainMenu.getCartQuantityText()).toBe(8);
    expect(await app.productPage.getMessageText()).toBe(
      "Product added to shopping cart."
    );
  });

  test("Add product to favorites", async ({ app }) => {
    await app.homePage.openProduct(0);
    await app.productPage.addProductToFavourites();
    expect(await app.productPage.getMessageText()).toBe(
      "Unauthorized, can not add product to your favorite list."
    );
  });

  test("Authorized user can add product to favorites", async ({ auth }) => {
    auth.homePage.openProduct(1);
    await auth.productPage.addProductToFavourites();
    expect(await auth.productPage.getMessageText()).toBe(
      "Product added to your favorites list."
    );

    await auth.productPage.addProductToFavourites();
    expect(await auth.productPage.getMessageText()).toBe(
      "Product already in your favorites list."
    );
  });
});
