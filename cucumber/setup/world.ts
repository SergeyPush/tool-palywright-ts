import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "playwright";
import App from "../page-objects/app.page";

let page: Page;
let browser: Browser;
let app: App;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  app = new App(page);
  return app;
});

AfterAll(async () => {
  await page.close();
  await browser.close();
});

export { app, page };
