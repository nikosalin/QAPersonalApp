import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class MoviesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto("/movies");
  }

  sectionTitle(title: string) {
    return this.page.getByRole("heading", { name: title, exact: true });
  }

  async expectGenreVisible(title: string) {
    await expect(this.sectionTitle(title)).toBeVisible();
  }
}
