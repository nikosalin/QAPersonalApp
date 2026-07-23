import { expect, Page } from "@playwright/test";

export async function expectRedirectToAuth(page: Page, path: string) {
  await page.goto(path);
  await expect(page).toHaveURL(/\/auth(?:\?.*)?$/);
  await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
}
