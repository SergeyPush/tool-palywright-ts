import { expect } from "@playwright/test";
import { test } from "../../config/config";
import { ProductSchema, ProductsSchema } from "../../models/product.model";

test.describe("Product API tests", () => {
  test("Get list of products", async ({ api }) => {
    const res = await api.productsApi.getProductList();
    expect(res.ok()).toBeTruthy();

    const { data } = await res.json();
    expect(ProductsSchema).validateJson(data);
  });

  test("Get single product", async ({ api }) => {
    const res = await api.productsApi.getSingleProduct(1);
    expect(res.ok()).toBeTruthy();

    const data = await res.json();
    expect(ProductSchema).validateJson(data);
  });

  test("Get related products", async ({ api }) => {
    const res = await api.productsApi.getRelatedProducts(2);
    expect(res.ok()).toBeTruthy();

    const data = await res.json();
    expect(data.length).toBeGreaterThan(2);
    expect(ProductsSchema).validateJson(data);
  });

  test("Get list of products with price range", async ({ api }) => {
    const res = await api.productsApi.getProductListWithPriceRange(40, 60);
    expect(res.ok()).toBeTruthy();

    const { data } = await res.json();
    expect(ProductsSchema).validateJson(data);

    data.forEach((element) => {
      expect(element).toHaveProperty("price");
      expect(Number(element.price)).toBeGreaterThan(40);
      expect(Number(element.price)).toBeLessThan(60);
    });
  });

  test("Search product by name", async ({ api }) => {
    const res = await api.productsApi.searchProducts("Hammer");
    expect(res.ok()).toBeTruthy();

    const { data } = await res.json();
    expect(ProductsSchema).validateJson(data);

    data.forEach((element) => {
      expect(element.name.toLowerCase()).toContain("hammer");
    });
    expect(data.length).toBeGreaterThanOrEqual(1);
  });
});
