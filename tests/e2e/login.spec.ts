import { expect } from "@playwright/test";
import { test } from "../config/config";
import { createUser } from "../../utils/create-user.utils";
import AuthAPI from "../../utils/auth-api.utils";

test.describe("Login tests", () => {
  test.beforeEach(async ({ app }) => {
    await app.loginPage.openLoginPage();
  });

  test("Login page is opened successfully", async ({ app }) => {
    const title = await app.loginPage.getPageTitleText();
    expect(title).toBe("Login");
  });

  test("User can login successfully", async ({ app }) => {
    const user = createUser();
    const auth = new AuthAPI();
    await auth.createAccount(user);
    await app.loginPage.loginApplication(user.email, user.password);
    const title = await app.myAccountPage.getTitleLabelText();
    expect(title).toBe("My account");
  });
});
