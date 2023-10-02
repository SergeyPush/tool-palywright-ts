import { test } from "../../config/config";
import { mockProduct } from "../../constants/app.constant";
import { expect } from "@playwright/test";

test.describe("User can see mock product", () => {
  test("Mock product is displayed", async ({ page }) => {
    await page.route(
      "**/products?between=price,1,100&page=1",
      async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        const { data } = json;
        data.unshift(mockProduct);
        await route.fulfill({ response, json });
      }
    );
    await page.goto("https://practicesoftwaretesting.com/#");
    await expect(
      page.getByText("This is my awesome test product")
    ).toBeVisible();
  });
});
