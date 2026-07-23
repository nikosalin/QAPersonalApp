import { expect, Page } from "@playwright/test";

export const testUser = {
  email: "ksilinesk@gmail.com",
  password: "123",
};

export async function loginAsUser(page: Page) {
  await page.goto("/auth");

  await page.getByLabel("Email").fill(testUser.email);
  await page.getByLabel("Password").fill(testUser.password);

  await Promise.all([
    page.waitForURL(/\/profiles\/?$/),
    page.getByRole("button", { name: "Login" }).click(),
  ]);

  await expect(
    page.getByRole("heading", { name: /who is watching now\?/i }),
  ).toBeVisible();
}
