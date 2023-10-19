import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import Menu from "./Menu";
import ProductPage from "./ProductPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MyAccountPage from "./MyAccountPage";
import CartPage from "./CartPage";
import { BASE_URL } from "../utils/get-config.utils";

class App {
  private baseUrl: string = BASE_URL;
  homePage: HomePage;
  mainMenu: Menu;
  productPage: ProductPage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  cartPage: CartPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.mainMenu = new Menu(page);
    this.productPage = new ProductPage(page);
    this.registerPage = new RegisterPage(page);
    this.loginPage = new LoginPage(page);
    this.myAccountPage = new MyAccountPage(page);
    this.cartPage = new CartPage(page);
  }

  async openApp() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState();
    await this.page.waitForLoadState("networkidle");
  }

  async getTitle() {
    return await this.page.title();
  }
}

export default App;
