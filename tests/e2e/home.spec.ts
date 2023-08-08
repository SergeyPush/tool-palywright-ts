import { test } from "../config/config";
import { expect } from "@playwright/test";
import {
  nameSortingCases,
  priceSortingCases,
  categoryFilteringCases,
} from "./cases/home.cases";

test.describe("Test Home page", () => {
  test("Open home page", async ({ app }) => {
    expect(await app.getTitle()).toBe(
      "Practice Software Testing - Toolshop - v5.0"
    );
    expect(app.homePage.getCurrentPath()).toBe("/");
  });

  for (const item of nameSortingCases) {
    test(`Check products sorting by name ${item.type}`, async ({ app }) => {
      await app.homePage.selectSorting(item.type);
      const products = await app.homePage.getProductItemsNamesTexts();
      expect(products).toEqual(item.sorting);
    });
  }

  for (const item of priceSortingCases) {
    test(`Check products sorting by name ${item.type}`, async ({ app }) => {
      await app.homePage.selectSorting(item.type);
      const products = await app.homePage.getProductItemsPricesTexts();
      expect(products).toEqual(item.sorting);
    });
  }

  test("Check search products", async ({ app }) => {
    await app.homePage.searchProducts("Pliers");
    const products = await app.homePage.getProductItemsNamesTexts();
    products.forEach((product) =>
      expect(product.toLowerCase()).toContain("pliers")
    );
    expect(products.length).toBeGreaterThan(1);
  });

  for (const item of categoryFilteringCases) {
    test(`Check by category ${item}`, async ({ app }) => {
      await app.homePage.checkFilter(item);
      const products = await app.homePage.getProductItemsNamesTexts();
      products.forEach((product) =>
        expect(product.toLowerCase()).toContain(item.toLowerCase())
      );
    });
  }

  test("Open Hand tools category from menu", async ({ app }) => {
    await app.mainMenu.navigateToHandTools();
    expect(app.homePage.getCurrentPath()).toBe("/category/hand-tools");
    const products = await app.homePage.getProductItemsNamesTexts();
    expect(await app.mainMenu.getCategoryTitle()).toBe("Category: Hand Tools");
    expect(products.length).toBeGreaterThan(1);
  });

  test("Open Power tools category from menu", async ({ app }) => {
    await app.mainMenu.navigateToPowerTools();
    expect(app.homePage.getCurrentPath()).toBe("/category/power-tools");
    const products = await app.homePage.getProductItemsNamesTexts();
    expect(await app.mainMenu.getCategoryTitle()).toBe("Category: Power Tools");
    expect(products.length).toBeGreaterThan(1);
  });

  test("Open Special tools category from menu", async ({ app }) => {
    await app.mainMenu.navigateToSpecialTools();
    expect(app.homePage.getCurrentPath()).toBe("/category/special-tools");
    const products = await app.homePage.getProductItemsNamesTexts();
    expect(await app.mainMenu.getCategoryTitle()).toBe(
      "Category: Special Tools"
    );
    expect(products.length).toBe(0);
  });
});

// TODO Make pagination tests
