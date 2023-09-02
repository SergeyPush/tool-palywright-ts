import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";

class LoginPage extends AbstractPage {
  private loginTitleLabel = this.page.getByRole("heading", {
    name: "Login",
  });
  private emailInput = this.page.locator('[data-test="email"]');
  private emailErrorMessage = this.page.locator('[data-test="email-error"]');
  private passwordInput = this.page.locator('[data-test="password"]');
  private passwordErrorMessage = this.page.locator(
    '[data-test="password-error"]'
  );
  private loginButton = this.page.locator('[data-test="login-submit"]');
  private loginErrorMessage = this.page.locator('[data-test="login-error"]');

  constructor(page: Page) {
    super(page);
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
