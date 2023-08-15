import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";

class LoginPage extends AbstractPage {
  private loginTitleLabel: Locator;
  private emailInput: Locator;
  private emailErrorMessage: Locator;
  private passwordInput: Locator;
  private passwordErrorMessage: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginTitleLabel = page.getByRole("heading", { name: "Login" });
    this.emailInput = page.locator('[data-test="email"]');
    this.emailErrorMessage = page.locator('[data-test="email-error"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.passwordErrorMessage = page.locator('[data-test="password-error"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.loginErrorMessage = page.locator('[data-test="login-error"]');
  }

  async getPageTitleText() {
    return this.loginTitleLabel.innerText();
  }

  async openLoginPage() {
    await this.navigateTo("/auth/login");
  }

  async loginApplication(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
    await this.loginButton.click();
    await this.waitForResponse("/users/me");
    await this.waitForUrl("/account");
  }
}

export default LoginPage;
