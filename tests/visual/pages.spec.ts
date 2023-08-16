import { expect, test } from "@playwright/test";

test.describe("Visual test of pages", () => {
  test("Test home page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page.png", {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
  test("Test contact page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/contact");
    await expect(page).toHaveScreenshot("contact-page.png", {
      fullPage: true,
    });
  });
  test("Test sign in page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/auth/login");
    await expect(page).toHaveScreenshot("signin-page.png", {
      fullPage: true,
    });
  });
  test("Test rentals page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/rentals");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("rentals-page.png", {
      fullPage: true,
    });
  });
  test("Test register page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/#/auth/register");
    await expect(page).toHaveScreenshot("register-page.png", {
      fullPage: true,
    });
  });
});
