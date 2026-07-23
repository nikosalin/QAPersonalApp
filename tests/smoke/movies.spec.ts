import { expect, test } from "@playwright/test";
import { loginAsUser } from "../support/auth.js";
import { ProfilesPage } from "../pages/profiles.page.js";
import { MoviesPage } from "../pages/movies.page.js";

test.describe("Movies page @smoke", () => {
  test("shows key genre sections", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const movies = new MoviesPage(page);

    await profiles.openHome();
    await movies.open();

    await expect(movies.sectionTitle("Action")).toBeVisible();
    await expect(movies.sectionTitle("Comedy")).toBeVisible();
  });
});
