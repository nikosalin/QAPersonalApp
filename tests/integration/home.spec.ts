import { expect, test } from "@playwright/test";
import { AuthPage } from "../pages/auth.page.js";
import { HomePage } from "../pages/home.page.js";
import { ProfilesPage } from "../pages/profiles.page.js";
import { Navbar } from "../pages/navbar.component.js";

test.describe("Home @integration", () => {
  test("renders mocked cards correctly", async ({ page }) => {
    await page.route("**/api/movies", async (route) => {
      await route.fulfill({
        json: [
          {
            id: 101,
            movieId: "101",
            thumbnailUrl: "/inception.jpg",
            duration: "2h 28m",
            genra: "Sci-Fi",
          },
          {
            id: 102,
            movieId: "102",
            thumbnailUrl: "/batman.jpg",
            duration: "2h 56m",
            genra: "Action",
          },
        ],
      });
    });

    await page.route("**/api/favorites", async (route) => {
      await route.fulfill({
        json: [
          {
            id: 201,
            movieId: "201",
            thumbnailUrl: "/interstellar.jpg",
            duration: "2h 49m",
            genra: "Sci-Fi",
          },
        ],
      });
    });

    const auth = new AuthPage(page);
    const profiles = new ProfilesPage(page);
    const home = new HomePage(page);
    const navbar = new Navbar(page);

    await auth.login("ksilinesk@gmail.com", "123");
    await profiles.openHome();

    await expect(home.trendingTitle).toBeVisible();
    await expect(home.favoritesTitle).toBeVisible();
    await expect(home.metaText("2h 28m")).toHaveCount(1);
    await expect(home.metaText("Sci-Fi")).toHaveCount(2);
    await expect(home.thumbnails()).toHaveCount(6);
    await expect(navbar.link("Movies")).toBeVisible();
  });
});
