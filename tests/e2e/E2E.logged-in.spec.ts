import { expect, test } from "@playwright/test";
import { loginAsUser } from "../support/auth.js";
import { ProfilesPage } from "../pages/profiles.page.js";
import { Navbar } from "../pages/navbar.component.js";

test.describe("Logged-in E2E", () => {
  test("logs in, opens the app, and signs out", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    await profiles.openHome();

    await page.getByAltText("User Avatar").click();
    await Promise.all([
      page.waitForURL(/\/auth\/?$/),
      page.getByText("Sign out of Movietheater!").click(),
    ]);

    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });

  test("moves through real protected pages from the navbar", async ({
    page,
  }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const navbar = new Navbar(page);
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

  test("can return to the home page from the navbar", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const navbar = new Navbar(page);
    await profiles.openHome();

    await navbar.openHome();
    await expect(page).toHaveURL(/\/?$/);
  });
});
