# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integration\integration.logged-in.spec.ts >> Logged-in integration >> search page renders mocked movie and series results
- Location: tests\integration\integration.logged-in.spec.ts:114:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/search?query=matrix", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - img "Logo"
        - generic [ref=e5]:
          - link "Home" [ref=e6] [cursor=pointer]:
            - /url: /
            - generic [ref=e7]: Home
          - link "Series" [ref=e8] [cursor=pointer]:
            - /url: /series
            - generic [ref=e9]: Series
          - link "Movies" [ref=e10] [cursor=pointer]:
            - /url: /movies
            - generic [ref=e11]: Movies
          - link "New & Trending" [ref=e12] [cursor=pointer]:
            - /url: /newtrends
            - generic [ref=e13]: New & Trending
          - link "My list" [ref=e14] [cursor=pointer]:
            - /url: /mylist
            - generic [ref=e15]: My list
          - link "Favorites" [ref=e16] [cursor=pointer]:
            - /url: /favorites
            - generic [ref=e17]: Favorites
          - link "Recomendations" [ref=e18] [cursor=pointer]:
            - /url: /recomendations
            - generic [ref=e19]: Recomendations
        - generic [ref=e20]:
          - generic [ref=e21]:
            - textbox "Search for movies or series" [ref=e22]
            - button "Search" [ref=e23] [cursor=pointer]
          - img [ref=e25] [cursor=pointer]
          - generic [ref=e27] [cursor=pointer]:
            - img "User Avatar" [ref=e29]
            - img [ref=e30]
    - generic [ref=e34]:
      - heading "Who is watching now?" [level=1] [ref=e35]
      - img "Profile" [ref=e40] [cursor=pointer]
  - alert [ref=e41]
  - button "Open Next.js Dev Tools" [ref=e47] [cursor=pointer]:
    - img [ref=e48]
```

# Test source

```ts
  29  | ];
  30  | 
  31  | const searchMovies = [
  32  |   {
  33  |     id: 301,
  34  |     title: "The Matrix",
  35  |     poster_path: "/matrix.jpg",
  36  |     overview: "Reality breaks apart.",
  37  |   },
  38  | ];
  39  | 
  40  | const searchSeries = [
  41  |   {
  42  |     id: 401,
  43  |     name: "Dark",
  44  |     poster_path: "/dark.jpg",
  45  |     overview: "A time-travel mystery.",
  46  |   },
  47  | ];
  48  | 
  49  | async function mockHomeData(page: Page) {
  50  |   await page.route("**/api/movies", async (route: Route) => {
  51  |     await route.fulfill({
  52  |       json: trendingMovies,
  53  |     });
  54  |   });
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
> 129 |     await page.goto("/search?query=matrix");
      |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
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
  155 |     await page.goto("/");
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