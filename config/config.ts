import { test as base } from "@playwright/test";
import App from "../pages/App";
import { getTokenFromJson } from "../utils/read-file.utils";
import { createUser } from "../utils/create-user.utils";
import BaseAPI from "../api/base-api.api";

type MyFixtures = {
  app: App;
  token: string;
  globalToken: string;
  auth: App;
  globalAuth: App;
  api: BaseAPI;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.openApp();
    await use(app);
  },
  api: async ({ request }, use) => {
    const api = new BaseAPI(request);
    await use(api);
  },
  token: async ({ api }, use) => {
    const newUser = createUser();
    const { email } = await api.auth.createAccount(newUser);
    const { access_token } = await api.auth.login(email, newUser.password);
    await use(access_token);
  },
  globalToken: async ({}, use) => {
    let token = await getTokenFromJson();
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
