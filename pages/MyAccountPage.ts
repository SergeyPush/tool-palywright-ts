import { Locator, Page } from "@playwright/test";
import AbstractPage from "./AbstractPage";

class MyAccountPage extends AbstractPage {
  private titleLabel: Locator;
  constructor(page: Page) {
    super(page);
    this.titleLabel = page.locator('[data-test="page-title"]');
  }

  async getTitleLabelText() {
    return this.titleLabel.innerText();
  }
}

export default MyAccountPage;
