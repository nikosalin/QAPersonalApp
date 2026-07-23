import { Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class Navbar extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get nav() {
    return this.page.getByRole("navigation");
  }

  get searchInput() {
    return this.page.getByPlaceholder("Search for movies or series");
  }

  get searchButton() {
    return this.page.getByRole("button", { name: "Search" });
  }

  link(name: string) {
    return this.nav.getByRole("link", { name, exact: true });
  }

  async openHome() {
    await this.link("Home").click();
  }

  async openMovies() {
    await this.link("Movies").click();
  }

  async openSeries() {
    await this.link("Series").click();
  }

  async openNewTrends() {
    await this.link("New & Trending").click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}
