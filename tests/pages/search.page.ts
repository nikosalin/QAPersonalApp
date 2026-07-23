import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.getByRole("heading", {
      name: "Search Results",
      exact: true,
    });
  }

  get moviesHeading() {
    return this.page.getByRole("heading", { name: "Movies", exact: true });
  }

  get seriesHeading() {
    return this.page.getByRole("heading", { name: "Series", exact: true });
  }

  async open(query: string) {
    await this.goto(`/search?query=${encodeURIComponent(query)}`);
  }

  cardLink(title: string) {
    return this.page.getByRole("link", { name: title, exact: false });
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.moviesHeading).toBeVisible();
    await expect(this.seriesHeading).toBeVisible();
  }
}
