import { defineStep } from "@cucumber/cucumber";
import { app } from "../setup/world";
import { expect } from "chai";

defineStep("User opens login page", async function () {
  await app.openApp();
});

defineStep(
  `User submits username {string} and password {string}`,
  async function (username, password) {
    await app.loginPage.login(username, password);
  }
);

defineStep("User should be on the Home page", async function () {
  const title = await app.homePage.getTitleText();
  expect(title).to.equal("Products");
});

defineStep("User should see error message", async function () {
  const error = await app.loginPage.getErrorMessageText();
  expect(error).to.equal("Epic sadface: Sorry, this user has been locked out.");
});

defineStep("User should see required error message", async function () {
  const error = await app.loginPage.getErrorMessageText();
  expect(error).to.equal("Epic sadface: Username is required");
});
