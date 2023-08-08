import { Page } from "@playwright/test";

class AbstractPage {
  protected page: Page;
  private baseUrl: string;
  protected apiBaseUrl: string;
  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "https://practicesoftwaretesting.com";
    this.apiBaseUrl = "https://api.practicesoftwaretesting.com";
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  protected get getPage() {
    return this.page;
  }

  getCurrentPath() {
    const url = this.page.url();
    return url.replace(`${this.baseUrl}/#`, "");
  }

  async waitForResponse(res: string = "/products") {
    await this.page.waitForResponse((response) => response.url().includes(res));
  }

  async waitForAllResponses() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForLoadState("load");
    await this.page.waitForLoadState("domcontentloaded");
  }
}
export default AbstractPage;
