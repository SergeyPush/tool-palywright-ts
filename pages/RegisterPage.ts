import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";
import { CreateUserData } from "../types/user.type";

class RegisterPage extends AbstractPage {
  private firstNameInput = this.page.locator('[data-test="first-name"]');
  private fistNameErrorMessage = this.page.locator(
    '[data-test="first-name-error"]'
  );
  private lastNameInput = this.page.locator('[data-test="last-name"]');
  private lastNameErrorMessage = this.page.locator(
    '[data-test="last-name-error"]'
  );
  private dobInput = this.page.locator('[data-test="dob"]');
  private dobErrorMessage = this.page.locator('[data-test="dob-error"]');
  private addressInput = this.page.locator('[data-test="address"]');
  private addressErrorMessage = this.page.locator(
    '[data-test="address-error"]'
  );
  private postCodeInput = this.page.locator('[data-test="postcode"]');
  private postCodeErrorMessage = this.page.locator(
    '[data-test="postcode-error"]'
  );
  private cityInput = this.page.locator('[data-test="city"]');
  private cityErrorMessage = this.page.locator('[data-test="city-error"]');
  private stateInput = this.page.locator('[data-test="state"]');
  private stateErrorMessage = this.page.locator('[data-test="state-error"]');
  private countryInput = this.page.locator('[data-test="country"]');
  private countryErrorMessage = this.page.locator(
    '[data-test="country-error"]'
  );
  private phoneInput = this.page.locator('[data-test="phone"]');
  private phoneErrorMessage = this.page.locator('[data-test="phone-error"]');
  private emailInput = this.page.locator('[data-test="email"]');
  private emailErrorMessage = this.page.locator('[data-test="email-error"]');
  private passwordInput = this.page.locator('[data-test="password"]');
  private passwordErrorMessage = this.page.locator(
    '[data-test="password-error"]'
  );
  private registerButton = this.page.locator('[data-test="register-submit"]');
  private registerPageTitleLabel = this.page.locator(".auth-container h3");

  constructor(page: Page) {
    super(page);
  }

  async openRegisterPage() {
    await this.navigateTo("/auth/register");
  }
  async getRegisterPageTitleText() {
    return this.registerPageTitleLabel.innerText();
  }

  async register(user: CreateUserData) {
    await this.firstNameInput.fill(user.first_name);
    await this.lastNameInput.fill(user.last_name);
    await this.dobInput.fill(user.dob);
    await this.addressInput.fill(user.address);
    await this.postCodeInput.fill(user.postcode);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.countryInput.selectOption(user.country);
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.registerButton.click();
    await this.waitForResponse("/register");
  }
}

export default RegisterPage;
