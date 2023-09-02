import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";

class MyAccountPage extends AbstractPage {
  private titleLabel = this.page.locator('[data-test="page-title"]');
  constructor(page: Page) {
    super(page);
  }

  async getTitleLabelText() {
    return this.titleLabel.innerText();
  }
}

export default MyAccountPage;
