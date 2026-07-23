import { test } from "@playwright/test";
import { expectRedirectToAuth } from "./support/assertions.js";
import { protectedRoutes } from "./support/routes.js";

test.describe("Protected route redirects", () => {
  for (const route of protectedRoutes) {
    test(`redirects ${route.name} to auth`, async ({ page }) => {
      await expectRedirectToAuth(page, route.path);
    });
  }
});
