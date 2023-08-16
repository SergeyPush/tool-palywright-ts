import { expect, test } from "@playwright/test";

const baseApiUrl = "https://api.practicesoftwaretesting.com";
test.describe("Get products tests", () => {
  test("Get product list", async ({ request }) => {
    const res = await request.get(`${baseApiUrl}/products`);
    expect(res.ok()).toBeTruthy();
    const { data } = await res.json();

    data.forEach((element) => {
      expect(element).toHaveProperty("id");
      expect(element).toHaveProperty("name");
      expect(element).toHaveProperty("description");
      expect(element).toHaveProperty("stock");
      expect(element).toHaveProperty("price");
      expect(element).toHaveProperty("product_image");
      expect(element).toHaveProperty("category");
      expect(element).toHaveProperty("brand");
    });
    expect(data.length).toBeGreaterThanOrEqual(9);
  });

  test("Get product with specific price", async ({ request }) => {
    const res = await request.get(`${baseApiUrl}/products?between=price,40,60`);
    expect(res.ok()).toBeTruthy();
    const { data } = await res.json();

    data.forEach((element) => {
      expect(element).toHaveProperty("price");
      expect(Number(element.price)).toBeGreaterThan(40);
      expect(Number(element.price)).toBeLessThan(60);
    });
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  test("Get single product", async ({ request }) => {
    const res = await request.get(`${baseApiUrl}/products`);
    expect(res.ok()).toBeTruthy();

    const { data } = await res.json();
    const singleProductId = data[0].id;

    const resProduct = await request.get(
      `${baseApiUrl}/products/${singleProductId}`
    );
    expect(resProduct.ok()).toBeTruthy();
    const product = await resProduct.json();

    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("stock");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("product_image");
    expect(product).toHaveProperty("category");
    expect(product).toHaveProperty("brand");
  });

  test("Get related products", async ({ request }) => {
    const res = await request.get(`${baseApiUrl}/products`);
    expect(res.ok()).toBeTruthy();

    const { data } = await res.json();
    const singleProductId = data[1].id;

    const relatedProducts = await request.get(
      `${baseApiUrl}/products/${singleProductId}/related`
    );
    expect(relatedProducts.ok()).toBeTruthy();
    const products = await relatedProducts.json();
    expect(products.length).toBeGreaterThan(2);
  });

  test("Get product using searching", async ({ request }) => {
    const res = await request.get(`${baseApiUrl}/products?q=Hammer`);
    expect(res.ok()).toBeTruthy();

    const { data } = await res.json();
    data.forEach((element) => {
      expect(element.name.toLowerCase()).toContain("hammer");
    });
    expect(data.length).toBeGreaterThanOrEqual(1);
  });
});
