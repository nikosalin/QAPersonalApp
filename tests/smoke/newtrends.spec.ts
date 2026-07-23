import { expect, test } from "@playwright/test";
import { loginAsUser } from "../support/auth.js";
import { ProfilesPage } from "../pages/profiles.page.js";

test.describe("New trends @smoke", () => {
  test("shows the trending and popular sections", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);

    await profiles.openHome();
    await page.goto("/newtrends");

    await expect(page.getByText("Trending Now", { exact: true })).toBeVisible();
    await expect(page.getByText("Popular Movies", { exact: true })).toBeVisible();
  });
});
