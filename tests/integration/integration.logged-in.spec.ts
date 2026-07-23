import { expect, test, Page, Route } from "@playwright/test";
import { loginAsUser } from "../support/auth.js";
import { SearchPage } from "../pages/search.page.js";
import { ProfilesPage } from "../pages/profiles.page.js";
import { Navbar } from "../pages/navbar.component.js";
import { HomePage } from "../pages/home.page.js";

const trendingMovies = [
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
];

const favoriteMovies = [
  {
    id: 201,
    movieId: "201",
    thumbnailUrl: "/interstellar.jpg",
    duration: "2h 49m",
    genra: "Sci-Fi",
  },
];

const searchMovies = [
  {
    id: 301,
    title: "The Matrix",
    poster_path: "/matrix.jpg",
    overview: "Reality breaks apart.",
  },
];

const searchSeries = [
  {
    id: 401,
    name: "Dark",
    poster_path: "/dark.jpg",
    overview: "A time-travel mystery.",
  },
];

async function mockHomeData(page: Page) {
  await page.route("**/api/movies", async (route: Route) => {
    await route.fulfill({
      json: trendingMovies,
    });
  });

  await page.route("**/api/favorites", async (route: Route) => {
    await route.fulfill({
      json: favoriteMovies,
    });
  });

  await page.route(
    /https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/,
    async (route: Route) => {
      await route.fulfill({
        json: {
          results: [
            {
              id: 999,
              title: "Billboard Movie",
              overview: "Mock billboard movie.",
            },
          ],
        },
      });
    },
  );

  await page.route(
    /https:\/\/api\.themoviedb\.org\/3\/movie\/999\/videos.*/,
    async (route: Route) => {
      await route.fulfill({
        json: {
          results: [
            {
              site: "YouTube",
              type: "Trailer",
              key: "abc123",
            },
          ],
        },
      });
    },
  );
}

test.describe("Logged-in integration", () => {
  test("home page renders mocked trending and favorites data", async ({
    page,
  }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const home = new HomePage(page);
    const navbar = new Navbar(page);

    await mockHomeData(page);
    await profiles.openHome();

    await expect(home.trendingTitle).toBeVisible();
    await expect(home.favoritesTitle).toBeVisible();
    await expect(home.metaText("2h 28m")).toHaveCount(1);
    await expect(home.metaText("Sci-Fi")).toHaveCount(2);
    await expect(home.thumbnails()).toHaveCount(6);
    await expect(navbar.link("Movies")).toBeVisible();
  });

  test("search page renders mocked movie and series results", async ({
    page,
  }) => {
    await loginAsUser(page);
    const search = new SearchPage(page);
    const profiles = new ProfilesPage(page);

    await page.route("**/api/search?query=matrix", async (route: Route) => {
      await route.fulfill({
        json: {
          movies: searchMovies,
          series: searchSeries,
        },
      });
    });

    await profiles.openHome();
    await search.open("matrix");

    await search.expectLoaded();
    await expect(page.getByText("The Matrix")).toBeVisible();
    await expect(page.getByText("Dark")).toBeVisible();
  });

  test("search bar sends the user to the search page", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const search = new SearchPage(page);

    await page.route("**/api/search?query=matrix", async (route: Route) => {
      await route.fulfill({
        json: {
          movies: searchMovies,
          series: searchSeries,
        },
      });
    });

    await profiles.openHome();
    await page.getByPlaceholder("Search for movies or series").fill("matrix");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/\/search\?query=matrix$/);
    await search.expectLoaded();
    await expect(page.getByText("The Matrix")).toBeVisible();
    await expect(page.getByText("Dark")).toBeVisible();
  });
});
