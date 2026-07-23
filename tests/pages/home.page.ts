import { Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto("/");
  }

  get trendingTitle() {
    return this.page.getByText("Trending Now", { exact: true });
  }

  get favoritesTitle() {
    return this.page.getByText("My Favorites", { exact: true });
  }

  thumbnails() {
    return this.page.getByAltText("Thumbnail");
  }

  metaText(value: string) {
    return this.page.locator("p").filter({ hasText: value });
  }
}
