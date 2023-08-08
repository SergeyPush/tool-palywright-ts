import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import Menu from "./Menu";
import ProductPage from "./ProductPage";

class App {
  private page: Page;
  private baseUrl: string;
  homePage: HomePage;
  mainMenu: Menu;
  productPage: ProductPage;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "https://practicesoftwaretesting.com/#";
    this.homePage = new HomePage(page);
    this.mainMenu = new Menu(page);
    this.productPage = new ProductPage(page);
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
