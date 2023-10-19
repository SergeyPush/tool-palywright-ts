import { Locator, Page } from "playwright";
import AbstractPage from "./abstract.page";

class LoginPage extends AbstractPage {
  private userNameInput = this.page.locator("#user-name");
  private passwordInput = this.page.locator("#password");
  private loginButton = this.page.locator("#login-button");
  private errorMessage = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loggedIn(username = "standard_user", password = "secret_sauce") {
    await this.login(username, password);
  }

  async getErrorMessageText() {
    return await this.errorMessage.innerText();
  }
}

export default LoginPage;
