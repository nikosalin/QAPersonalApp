import { expect, test } from "@playwright/test";
import { loginAsUser } from "../support/auth.js";
import { Navbar } from "../pages/navbar.component.js";
import { ProfilesPage } from "../pages/profiles.page.js";

test.describe("Logged-in smoke", () => {
  test("lands on the profiles screen after login", async ({ page }) => {
    await loginAsUser(page);

    const profiles = new ProfilesPage(page);
    await expect(profiles.heading).toBeVisible();
    await expect(profiles.profileCard).toBeVisible();
  });

  test("shows the authenticated navbar on the home page", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const navbar = new Navbar(page);
    await profiles.openHome();

    await expect(page).toHaveURL(/\/?$/);
    await expect(navbar.nav).toBeVisible();
    await expect(navbar.link("Home")).toBeVisible();
    await expect(navbar.link("Series")).toBeVisible();
    await expect(navbar.link("Movies")).toBeVisible();
    await expect(navbar.link("New & Trending")).toBeVisible();
    await expect(navbar.link("My list")).toBeVisible();
    await expect(navbar.link("Favorites")).toBeVisible();
    await expect(navbar.link("Recomendations")).toBeVisible();
  });

  test("opens the account menu and shows sign out", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    await profiles.openHome();
    await page.getByAltText("User Avatar").click();

    await expect(page.getByText("Sign out of Movietheater!")).toBeVisible();
  });

  test("opens the mobile browse menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    await profiles.openHome();
    await page.getByText("Browse").click();

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Series" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Movies" })).toBeVisible();
  });
});
