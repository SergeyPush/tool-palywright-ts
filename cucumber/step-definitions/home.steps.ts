import { defineStep } from "@cucumber/cucumber";
import { app } from "../setup/world";
import { expect } from "chai";

defineStep("User should be logged in", async function () {
  await app.openApp();
  await app.loginPage.loggedIn();
});

defineStep("List of products should be displayed", async function () {
  const products = await app.homePage.getProductListNames();
  expect(products.length).equal(6);
});

defineStep("User clicks Add to cart", async function () {
  await app.homePage.addProductToCart(1);
});
defineStep("Product is added to cart", async function () {
  const cartBageNumber = await app.homePage.getShoppingCartBageNuber();
  expect(cartBageNumber).equal(1);
});
