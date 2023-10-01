import { Page } from "playwright";

class AbstractPage {
  constructor(protected readonly page: Page) {}

  async getTitleText() {
    return await this.page.locator(".title").innerText();
  }
}

export default AbstractPage;
