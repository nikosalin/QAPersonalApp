# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\E2E.logged-in.spec.ts >> Logged-in E2E >> moves through real protected pages from the navbar
- Location: tests\e2e\E2E.logged-in.spec.ts:16:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/movies\/?$/
Received string:  "http://localhost:3000/profiles"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "http://localhost:3000/profiles"

```

```yaml
- navigation:
  - img "Logo"
  - link "Home":
    - /url: /
  - link "Series":
    - /url: /series
  - link "Movies":
    - /url: /movies
  - link "New & Trending":
    - /url: /newtrends
  - link "My list":
    - /url: /mylist
  - link "Favorites":
    - /url: /favorites
  - link "Recomendations":
    - /url: /recomendations
  - textbox "Search for movies or series"
  - button "Search"
  - img
  - img "User Avatar"
  - img
- heading "Who is watching now?" [level=1]
- img "Profile"
- text: nik3
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { loginAsUser } from "../support/auth.js";
  3  | 
  4  | test.describe("Logged-in E2E", () => {
  5  |   test("logs in, opens the app, and signs out", async ({ page }) => {
  6  |     await loginAsUser(page);
  7  |     await page.getByAltText("Profile").click();
  8  | 
  9  |     await page.getByAltText("User Avatar").click();
  10 |     await page.getByText("Sign out of Movietheater!").click();
  11 | 
  12 |     await page.waitForURL(/\/auth\/?$/);
  13 |     await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  14 |   });
  15 | 
  16 |   test("moves through real protected pages from the navbar", async ({
  17 |     page,
  18 |   }) => {
  19 |     await loginAsUser(page);
  20 |     await page.getByAltText("Profile").click();
  21 | 
  22 |     await page
  23 |       .getByRole("navigation")
  24 |       .getByRole("link", { name: "Movies", exact: true })
  25 |       .click();
> 26 |     await expect(page).toHaveURL(/\/movies\/?$/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  27 |     await expect(
  28 |       page.getByRole("heading", { name: "Action", exact: true }),
  29 |     ).toBeVisible();
  30 | 
  31 |     await page
  32 |       .getByRole("navigation")
  33 |       .getByRole("link", { name: "Series", exact: true })
  34 |       .click();
  35 |     await expect(page).toHaveURL(/\/series\/?$/);
  36 |     await expect(
  37 |       page.getByRole("heading", { name: "Animation", exact: true }),
  38 |     ).toBeVisible();
  39 |   });
  40 | 
  41 |   test("can return to the home page from the navbar", async ({ page }) => {
  42 |     await loginAsUser(page);
  43 |     await page.getByAltText("Profile").click();
  44 | 
  45 |     await page.getByRole("link", { name: "Home" }).click();
  46 |     await expect(page).toHaveURL(/\/?$/);
  47 |   });
  48 | });
  49 | 
```