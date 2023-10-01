import { defineStep, Given } from "@cucumber/cucumber";
import { app } from "../setup/world";
import { expect } from "chai";

defineStep("User opens login page", async function () {
  await app.openApp();
});

defineStep("User submits valid credentials", async function () {
  await app.loginPage.login("standard_user", "secret_sauce");
});

defineStep("User submits invalid credentials", async function () {
  await app.loginPage.login("locked_out_user", "secret_sauce");
});

defineStep("User submits empty credentials", async function () {
  await app.loginPage.login("", "");
});

defineStep("User should see the Home page", async function () {
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
