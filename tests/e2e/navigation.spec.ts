import { expect, test } from "@playwright/test";
import { AuthPage } from "../pages/auth.page.js";
import { Navbar } from "../pages/navbar.component.js";
import { ProfilesPage } from "../pages/profiles.page.js";

test.describe("Navigation @e2e", () => {
  test("moves through movies and series pages", async ({ page }) => {
    const auth = new AuthPage(page);
    const profiles = new ProfilesPage(page);
    const navbar = new Navbar(page);

    await auth.login("ksilinesk@gmail.com", "123");
    await profiles.openHome();

    await navbar.openMovies();
    await expect(page).toHaveURL(/\/movies\/?$/);
    await expect(
      page.getByRole("heading", { name: "Action", exact: true }),
    ).toBeVisible();

    await navbar.openSeries();
    await expect(page).toHaveURL(/\/series\/?$/);
    await expect(
      page.getByRole("heading", { name: "Animation", exact: true }),
    ).toBeVisible();
  });
});
