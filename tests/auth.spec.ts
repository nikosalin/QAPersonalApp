import { expect, test } from "@playwright/test";

test.describe("Auth page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
  });

  test("shows the login form by default", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("switches to register mode", async ({ page }) => {
    await page.getByText("Create new account!").click();

    await expect(
      page.getByRole("heading", { name: /register/i }),
    ).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  test("shows the social sign-in icons", async ({ page }) => {
    await expect(page.locator("div.w-10.h-10.bg-white.rounded-full")).toHaveCount(2);
  });

  test("keeps the logo visible on the auth card", async ({ page }) => {
    await expect(page.getByAltText("Logo")).toBeVisible();
  });
});
