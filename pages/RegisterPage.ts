import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";
import { CreateUserData } from "../types/user.type";

class RegisterPage extends AbstractPage {
  private firstNameInput: Locator;
  private fistNameErrorMessage: Locator;
  private lastNameInput: Locator;
  private lastNameErrorMessage: Locator;
  private dobInput: Locator;
  private dobErrorMessage: Locator;
  private addressInput: Locator;
  private addressErrorMessage: Locator;
  private postCodeInput: Locator;
  private postCodeErrorMessage: Locator;
  private cityInput: Locator;
  private cityErrorMessage: Locator;
  private stateInput: Locator;
  private stateErrorMessage: Locator;
  private countryInput: Locator;
  private countryErrorMessage: Locator;
  private phoneInput: Locator;
  private phoneErrorMessage: Locator;
  private emailInput: Locator;
  private emailErrorMessage: Locator;
  private passwordInput: Locator;
  private passwordErrorMessage: Locator;
  private registerButton: Locator;
  private registerPageTitleLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.fistNameErrorMessage = page.locator('[data-test="first-name-error"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.lastNameErrorMessage = page.locator('[data-test="last-name-error"]');
    this.dobInput = page.locator('[data-test="dob"]');
    this.dobErrorMessage = page.locator('[data-test="dob-error"]');
    this.addressInput = page.locator('[data-test="address"]');
    this.addressErrorMessage = page.locator('[data-test="address-error"]');
    this.postCodeInput = page.locator('[data-test="postcode"]');
    this.postCodeErrorMessage = page.locator('[data-test="postcode-error"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.cityErrorMessage = page.locator('[data-test="city-error"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.stateErrorMessage = page.locator('[data-test="state-error"]');
    this.countryInput = page.locator('[data-test="country"]');
    this.countryErrorMessage = page.locator('[data-test="country-error"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.phoneErrorMessage = page.locator('[data-test="phone-error"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.emailErrorMessage = page.locator('[data-test="email-error"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.passwordErrorMessage = page.locator('[data-test="password-error"]');
    this.registerButton = page.locator('[data-test="register-submit"]');
    this.registerPageTitleLabel = page.locator(".auth-container h3");
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
    await this.waitForResponse("/register", 201);
  }
}

export default RegisterPage;
