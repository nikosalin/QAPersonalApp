# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\search.spec.ts >> Search @e2e >> searches for spesific movies and series
- Location: tests\e2e\search.spec.ts:8:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('navigation').getByRole('link', { name: 'search', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('navigation').getByRole('link', { name: 'search', exact: true })

```

```yaml
- navigation:
  - img "Logo Light"
  - link "Home":
    - /url: /
  - link "Series":
    - /url: /series
  - link "Movies":
    - /url: /movies
  - link "New & Trending":
    - /url: /newtrends
  - link "My favorites":
    - /url: /mylist
  - link "Others like":
    - /url: /favorites
  - link "Recomendations":
    - /url: /recomendations
  - textbox "Search for movies or series"
  - button "Search"
  - img
  - img "User Avatar"
  - img
- iframe
- heading "The Devil Wears Prada 2" [level=1]
- paragraph: Andy Sachs returns to Runway as Miranda Priestly navigates a new media landscape and Runway's position within. The duo reconnect with former assistant Emily Charlton, now the head of a luxury brand that possesses funding which could ensure Runway's survival.
- link "See More":
  - /url: /movies/1314481
- alert: /
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { AuthPage } from "../pages/auth.page.js";
  3  | import { Navbar } from "../pages/navbar.component.js";
  4  | import { ProfilesPage } from "../pages/profiles.page.js";
  5  | import { SearchPage } from "../pages/search.page.js";
  6  | 
  7  | test.describe("Search @e2e", () => {
  8  |   test("searches for spesific movies and series", async ({ page }) => {
  9  |     const auth = new AuthPage(page);
  10 |     const profiles = new ProfilesPage(page);
  11 |     const navbar = new Navbar(page);
  12 |     const search = new SearchPage(page);
  13 | 
  14 |     await auth.login("ksilinesk@gmail.com", "123");
  15 |     await profiles.openHome();
  16 | 
  17 |     await expect(page).toHaveURL(/\/?$/);
  18 |     await expect(navbar.nav).toBeVisible();
> 19 |     await expect(navbar.link("search")).toBeVisible();
     |                                         ^ Error: expect(locator).toBeVisible() failed
  20 |     await page
  21 |       .getByPlaceholder("Search for movies or series")
  22 |       .fill("Lord of the rings");
  23 |     await page.getByAltText("Search").click();
  24 | 
  25 |     //await expect(page).toHaveURL(/\/search\?query=Lord%20of%20the%20Rings/i);
  26 | 
  27 |     await expect(page).toHaveURL(/\/search/);
  28 | 
  29 |     await expect(
  30 |       page.getByRole("heading", { name: /Search Results/i }),
  31 |     ).toBeVisible();
  32 |   });
  33 | });
  34 | 
```