import { Page } from "playwright";
import AbstractPage from "./abstract.page";

class HomePage extends AbstractPage {
  constructor(page: Page) {
    super(page);
  }
}

export default HomePage;
