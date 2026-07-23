import { expect, test } from "@playwright/test";
import { AuthPage } from "../pages/auth.page.js";
import { Navbar } from "../pages/navbar.component.js";
import { ProfilesPage } from "../pages/profiles.page.js";
import { SearchPage } from "../pages/search.page.js";

test.describe("Search @e2e", () => {
  test("searches for spesific movies and series", async ({ page }) => {
    const auth = new AuthPage(page);
    const profiles = new ProfilesPage(page);
    const navbar = new Navbar(page);
    const search = new SearchPage(page);

    await auth.login("ksilinesk@gmail.com", "123");
    await profiles.openHome();

    await expect(navbar.searchInput).toBeVisible();
    await expect(navbar.searchButton).toBeVisible();

    await navbar.search("Lord of the Rings");

    await expect(page).toHaveURL(/\/search/);

    await expect(
      page.getByRole("heading", { name: /Search Results/i }),
    ).toBeVisible();
  });
});
