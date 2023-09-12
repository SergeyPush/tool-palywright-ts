import { expect } from "@playwright/test";
import { test } from "../../config/config";
import { createUser } from "../../utils/create-user.utils";
import AuthAPI from "../../api/auth-api.api";

test.describe("Login tests", () => {
  test.beforeEach(async ({ app }) => {
    await app.loginPage.openLoginPage();
  });

  test("Login page is opened successfully", async ({ app }) => {
    const title = await app.loginPage.getPageTitleText();
    expect(title).toBe("Login");
  });

  test("User can login successfully", async ({ app, api }) => {
    const user = createUser();
    await api.auth.createAccount(user);
    await app.loginPage.loginApplication(user.email, user.password);
    const title = await app.myAccountPage.getTitleLabelText();
    expect(title).toBe("My account");
  });
});
