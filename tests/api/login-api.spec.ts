import { test } from "../../config/config";
import { createUser } from "../../utils/create-user.utils";
import { expect } from "@playwright/test";
import { LoginResponseModel } from "../../models/login-response.model";

test.describe("Login api tests", () => {
  test("User can successfully login @api", async ({ api }) => {
    const newUser = createUser();
    const { email } = await api.auth.createAccount(newUser);
    const res = await api.auth.login(email, newUser.password);
    expect(LoginResponseModel).validateJson(res);
  });

  test("User can't login with incorrect data @api", async ({ api }) => {
    const res = await api.auth.login("some_email@mail.com", "123456");
    expect(res.error).toBe("Unauthorized");
  });
});
