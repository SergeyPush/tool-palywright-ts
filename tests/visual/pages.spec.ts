import { expect, test } from "@playwright/test";

const cases = [
  {
    name: "Home page",
    path: "/",
    file: "home-page.png",
  },
  {
    name: "Contact page",
    path: "https://practicesoftwaretesting.com/#/contact",
    file: "contact-page.png",
  },
  {
    name: "Sign in page",
    path: "https://practicesoftwaretesting.com/#/auth/login",
    file: "signin-page.png",
  },
  {
    name: "Rentals page",
    path: "https://practicesoftwaretesting.com/#/rentals",
    file: "rentals-page.png",
  },
  {
    name: "Register page",
    path: "https://practicesoftwaretesting.com/#/auth/register",
    file: "register-page.png",
  },
];

test.describe("Visual test of pages", () => {
  for (const item of cases) {
    test(`Test ${item.name}`, async ({ page }) => {
      await page.goto(item.path);
      await page.waitForLoadState("networkidle");
      await page.waitForLoadState("domcontentloaded");
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(item.file, {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
        maxDiffPixelRatio: 0.2,
        timeout: 1000,
      });
    });
  }
});
