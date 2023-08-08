import { test as base } from "@playwright/test";
import App from "../../pages/App";
import { getTokenFromJson } from "../../utils/read-file.utils";
import { createUser } from "../../utils/create-user.utils";
import AuthAPI from "../../pages/AuthAPI";

type MyFixtures = {
  app: App;
  token: string;
  auth: App;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.openApp();
    await use(app);
  },
  token: async ({}, use) => {
    let token = await getTokenFromJson();

    if (!token) {
      const authApi = new AuthAPI();
      const newUser = createUser();
      const { email } = await authApi.createAccount(newUser);
      token = await authApi.login(email, newUser.password);
    }
    await use(token);
  },

  auth: async ({ page, token }, use) => {
    page.context().addInitScript((value) => {
      localStorage.setItem("auth-token", value);
    }, token);

    const app = new App(page);
    await app.openApp();
    await use(app);
  },
});
