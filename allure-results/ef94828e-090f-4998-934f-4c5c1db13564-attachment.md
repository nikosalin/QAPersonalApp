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
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - img "Logo" [ref=e5]
        - generic [ref=e6]:
          - link "Home" [ref=e7] [cursor=pointer]:
            - /url: /
            - generic [ref=e8]: Home
          - link "Series" [ref=e9] [cursor=pointer]:
            - /url: /series
            - generic [ref=e10]: Series
          - link "Movies" [ref=e11] [cursor=pointer]:
            - /url: /movies
            - generic [ref=e12]: Movies
          - link "New & Trending" [ref=e13] [cursor=pointer]:
            - /url: /newtrends
            - generic [ref=e14]: New & Trending
          - link "My list" [ref=e15] [cursor=pointer]:
            - /url: /mylist
            - generic [ref=e16]: My list
          - link "Favorites" [ref=e17] [cursor=pointer]:
            - /url: /favorites
            - generic [ref=e18]: Favorites
          - link "Recomendations" [ref=e19] [cursor=pointer]:
            - /url: /recomendations
            - generic [ref=e20]: Recomendations
        - generic [ref=e21]:
          - generic [ref=e22]:
            - textbox "Search for movies or series" [ref=e23]
            - button "Search" [ref=e24] [cursor=pointer]
          - img [ref=e26] [cursor=pointer]
          - generic [ref=e28] [cursor=pointer]:
            - img "User Avatar" [ref=e30]
            - img [ref=e31]
    - generic [ref=e35]:
      - heading "Who is watching now?" [level=1] [ref=e36]
      - img "Profile" [ref=e41] [cursor=pointer]
  - alert [ref=e42]
  - button "Open Next.js Dev Tools" [ref=e48] [cursor=pointer]:
    - img [ref=e49]
```

# Test source

```ts
  55  | 
  56  |   await page.route("**/api/favorites", async (route: Route) => {
  57  |     await route.fulfill({
  58  |       json: favoriteMovies,
  59  |     });
  60  |   });
  61  | 
  62  |   await page.route(
  63  |     /https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/,
  64  |     async (route: Route) => {
  65  |       await route.fulfill({
  66  |         json: {
  67  |           results: [
  68  |             {
  69  |               id: 999,
  70  |               title: "Billboard Movie",
  71  |               overview: "Mock billboard movie.",
  72  |             },
  73  |           ],
  74  |         },
  75  |       });
  76  |     },
  77  |   );
  78  | 
  79  |   await page.route(
  80  |     /https:\/\/api\.themoviedb\.org\/3\/movie\/999\/videos.*/,
  81  |     async (route: Route) => {
  82  |       await route.fulfill({
  83  |         json: {
  84  |           results: [
  85  |             {
  86  |               site: "YouTube",
  87  |               type: "Trailer",
  88  |               key: "abc123",
  89  |             },
  90  |           ],
  91  |         },
  92  |       });
  93  |     },
  94  |   );
  95  | }
  96  | 
  97  | test.describe("Logged-in integration", () => {
  98  |   test("home page renders mocked trending and favorites data", async ({
  99  |     page,
  100 |   }) => {
  101 |     await loginAsUser(page);
  102 |     await page.getByAltText("Profile").click();
  103 | 
  104 |     await mockHomeData(page);
  105 |     await page.goto("/");
  106 | 
  107 |     await expect(page.getByText("Trending Now", { exact: true })).toBeVisible();
  108 |     await expect(page.getByText("My Favorites", { exact: true })).toBeVisible();
  109 |     await expect(page.getByText("2h 28m", { exact: false })).toBeVisible();
  110 |     await expect(page.getByText("Sci-Fi", { exact: true })).toBeVisible();
  111 |     await expect(page.getByAltText("Thumbnail")).toHaveCount(6);
  112 |   });
  113 | 
  114 |   test("search page renders mocked movie and series results", async ({
  115 |     page,
  116 |   }) => {
  117 |     await loginAsUser(page);
  118 |     await page.getByAltText("Profile").click();
  119 | 
  120 |     await page.route("**/api/search?query=matrix", async (route: Route) => {
  121 |       await route.fulfill({
  122 |         json: {
  123 |           movies: searchMovies,
  124 |           series: searchSeries,
  125 |         },
  126 |       });
  127 |     });
  128 | 
  129 |     await page.goto("/search?query=matrix");
  130 | 
  131 |     await expect(page.getByText("Search Results")).toBeVisible();
  132 |     await expect(
  133 |       page.getByRole("heading", { name: "Movies", exact: true }),
  134 |     ).toBeVisible();
  135 |     await expect(
  136 |       page.getByRole("heading", { name: "Series", exact: true }),
  137 |     ).toBeVisible();
  138 |     await expect(page.getByText("The Matrix")).toBeVisible();
  139 |     await expect(page.getByText("Dark")).toBeVisible();
  140 |   });
  141 | 
  142 |   test("search bar sends the user to the search page", async ({ page }) => {
  143 |     await loginAsUser(page);
  144 |     await page.getByAltText("Profile").click();
  145 | 
  146 |     await page.route("**/api/search?query=matrix", async (route: Route) => {
  147 |       await route.fulfill({
  148 |         json: {
  149 |           movies: searchMovies,
  150 |           series: searchSeries,
  151 |         },
  152 |       });
  153 |     });
  154 | 
> 155 |     await page.goto("/");
      |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  156 |     await page.getByPlaceholder("Search for movies or series").fill("matrix");
  157 |     await page.getByRole("button", { name: "Search" }).click();
  158 | 
  159 |     await expect(page).toHaveURL(/\/search\?query=matrix$/);
  160 |     await expect(page.getByText("The Matrix")).toBeVisible();
  161 |     await expect(page.getByText("Dark")).toBeVisible();
  162 |   });
  163 | });
  164 | 
```