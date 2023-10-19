import { test as base } from "@playwright/test";
import App from "../pages/App";
import { createUser } from "../utils/create-user.utils";
import BaseAPI from "../api/base-api.api";

type MyFixtures = {
  app: App;
  token: string;
  auth: App;
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
  auth: async ({ page, token }, use) => {
    page.context().addInitScript((value) => {
      localStorage.setItem("auth-token", value);
    }, token);
    const app = new App(page);
    await app.openApp();
    await use(app);
  },
});
