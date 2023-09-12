import { expect } from "@playwright/test";
import { test } from "../../config/config";
import { createUser } from "../../utils/create-user.utils";

test.describe("Register page tests", () => {
  test.beforeEach(async ({ app }) => {
    await app.registerPage.openRegisterPage();
  });
  test("Register page is opened", async ({ app }) => {
    const title = await app.registerPage.getRegisterPageTitleText();
    expect(title).toBe("Customer registration");
  });

  test("User can register", async ({ app }) => {
    const user = createUser();
    await app.registerPage.register(user);
    const title = await app.loginPage.getPageTitleText();
    expect(title).toBe("Login");
  });
});
