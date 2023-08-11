import { test as base } from "@playwright/test";
import App from "../../pages/App";
import { getTokenFromJson } from "../../utils/read-file.utils";
import { createUser } from "../../utils/create-user.utils";
import AuthAPI from "../../pages/AuthAPI";
import AuthAPISingle from "../../pages/AuthAPISingle";

type MyFixtures = {
  app: App;
  token: string;
  globalToken: string;
  auth: App;
  globalAuth: App;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.openApp();
    await use(app);
  },
  token: async ({}, use) => {
    const authApi = new AuthAPI();
    const newUser = createUser();
    const { email } = await authApi.createAccount(newUser);
    const token = await authApi.login(email, newUser.password);
    await use(token);
  },
  globalToken: async ({}, use) => {
    let token = await getTokenFromJson();
    // const authApiGlobal = AuthAPISingle.getAuthAPI();
    // const newUser = createUser();
    // const { email } = await authApiGlobal.createAccount(newUser);
    // await authApiGlobal.login(email, newUser.password);
    // const token = authApiGlobal.getToken;

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

  globalAuth: async ({ page, globalToken }, use) => {
    page.context().addInitScript((value) => {
      localStorage.setItem("auth-token", value);
    }, globalToken);

    const app = new App(page);
    await app.openApp();
    await use(app);
  },
});
