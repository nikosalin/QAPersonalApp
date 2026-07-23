import { expect, test } from "@playwright/test";
import { loginAsUser } from "../support/auth.js";
import { ProfilesPage } from "../pages/profiles.page.js";
import { SeriesPage } from "../pages/series.page.js";

test.describe("Series page @smoke", () => {
  test("shows key genre sections", async ({ page }) => {
    await loginAsUser(page);
    const profiles = new ProfilesPage(page);
    const series = new SeriesPage(page);

    await profiles.openHome();
    await series.open();

    await expect(series.sectionTitle("Animation")).toBeVisible();
    await expect(series.sectionTitle("Drama")).toBeVisible();
  });
});
