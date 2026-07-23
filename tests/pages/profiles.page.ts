import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class ProfilesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.getByRole("heading", { name: /who is watching now\?/i });
  }

  get profileCard() {
    return this.page.getByAltText("Profile");
  }

  async openHome() {
    await this.profileCard.click();
    await expect(this.page).toHaveURL(/\/?$/);
  }
}
