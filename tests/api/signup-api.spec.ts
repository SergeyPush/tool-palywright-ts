import { test } from "../../config/config";
import { createUser } from "../../utils/create-user.utils";
import { expect } from "@playwright/test";
import { signUpResponseModel } from "../../models/sign-up-response.model";

test.describe("Sign up tests", () => {
  test("User can sign up successfully @api", async ({ api }) => {
    const newUser = createUser();
    const res = await api.auth.createAccount(newUser);
    expect(signUpResponseModel).validateJson(res);
  });

  test("User can't create account without valid data @api", async ({ api }) => {
    const newUsr = createUser();
    const updatedUser = {
      ...newUsr,
      first_name: "",
      last_name: "",
      email: "",
    };
    const res = await api.auth.createAccount(updatedUser);
    expect(res.first_name).toContain("The first name field is required.");
    expect(res.last_name).toContain("The last name field is required.");
    expect(res.email).toContain("The email field is required.");
  });
});
