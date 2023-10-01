import { Locator, Page } from "playwright";
import AbstractPage from "./abstract.page";

class LoginPage extends AbstractPage {
  private userNameInput: Locator = this.page.locator("#user-name");
  private passwordInput: Locator = this.page.locator("#password");
  private loginButton: Locator = this.page.locator("#login-button");
  private errorMessage: Locator = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessageText() {
    return await this.errorMessage.innerText();
  }
}

export default LoginPage;
