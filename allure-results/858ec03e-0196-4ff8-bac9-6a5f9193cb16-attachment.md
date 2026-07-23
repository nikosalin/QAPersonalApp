# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integration\integration.logged-in.spec.ts >> Logged-in integration >> search bar sends the user to the search page
- Location: tests\integration\integration.logged-in.spec.ts:142:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/profiles"
============================================================
```

# Test source

```ts
  1  | import { expect, Page } from "@playwright/test";
  2  | 
  3  | export const testUser = {
  4  |   email: "ksilinesk@gmail.com",
  5  |   password: "123",
  6  | };
  7  | 
  8  | export async function loginAsUser(page: Page) {
  9  |   await page.goto("/auth");
  10 | 
  11 |   await page.getByLabel("Email").fill(testUser.email);
  12 |   await page.getByLabel("Password").fill(testUser.password);
  13 | 
  14 |   await Promise.all([
> 15 |     page.waitForURL(/\/profiles\/?$/),
     |          ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  16 |     page.getByRole("button", { name: "Login" }).click(),
  17 |   ]);
  18 | 
  19 |   await expect(
  20 |     page.getByRole("heading", { name: /who is watching now\?/i }),
  21 |   ).toBeVisible();
  22 | }
  23 | 
```