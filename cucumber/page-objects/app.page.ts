import { Page } from "playwright";
import LoginPage from "./login.page";
import HomePage from "./home.page";

class App {
  baseUrl = "https://www.saucedemo.com";
  loginPage: LoginPage;
  homePage: HomePage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }

  async openApp() {
    await this.page.goto(this.baseUrl);
  }
}

export default App;
