import { expect, test } from "@playwright/test";
import { AuthPage } from "../pages/auth.page.js";

test.describe("Auth @smoke", () => {
  test("shows the login form", async ({ page }) => {
    const auth = new AuthPage(page);
    await auth.open();

    await expect(auth.heading).toBeVisible();
    await expect(auth.emailInput).toBeVisible();
    await expect(auth.passwordInput).toBeVisible();
    await expect(auth.loginButton).toBeVisible();
  });
});
