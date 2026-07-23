# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Auth page >> shows the social sign-in icons
- Location: tests\auth.spec.ts:27:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('svg')
Expected: 2
Received: 3
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('svg')
    12 × locator resolved to 3 elements
       - unexpected value "3"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - img "Logo" [ref=e5]
    - generic [ref=e8]:
      - navigation [ref=e9]:
        - img "Logo" [ref=e10]
      - generic [ref=e12]:
        - heading "Sign in" [level=2] [ref=e13]
        - generic [ref=e14]:
          - generic [ref=e15]:
            - textbox "Email" [ref=e16]:
              - /placeholder: " "
            - generic [ref=e17]: Email
          - generic [ref=e18]:
            - textbox "Password" [ref=e19]:
              - /placeholder: " "
            - generic [ref=e20]: Password
        - button "Login" [ref=e21] [cursor=pointer]
        - generic [ref=e22]:
          - img [ref=e24] [cursor=pointer]
          - img [ref=e30] [cursor=pointer]
        - paragraph [ref=e32]: New here?Create new account!
  - alert [ref=e33]
  - button "Open Next.js Dev Tools" [ref=e39] [cursor=pointer]:
    - img [ref=e40]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe("Auth page", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("/auth");
  6  |   });
  7  | 
  8  |   test("shows the login form by default", async ({ page }) => {
  9  |     await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  10 |     await expect(page.getByLabel("Email")).toBeVisible();
  11 |     await expect(page.getByLabel("Password")).toBeVisible();
  12 |     await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  13 |   });
  14 | 
  15 |   test("switches to register mode", async ({ page }) => {
  16 |     await page.getByText("Create new account!").click();
  17 | 
  18 |     await expect(
  19 |       page.getByRole("heading", { name: /register/i }),
  20 |     ).toBeVisible();
  21 |     await expect(page.getByLabel("Username")).toBeVisible();
  22 |     await expect(page.getByLabel("Email")).toBeVisible();
  23 |     await expect(page.getByLabel("Password")).toBeVisible();
  24 |     await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  25 |   });
  26 | 
  27 |   test("shows the social sign-in icons", async ({ page }) => {
> 28 |     await expect(page.locator("svg")).toHaveCount(2);
     |                                       ^ Error: expect(locator).toHaveCount(expected) failed
  29 |   });
  30 | 
  31 |   test("keeps the logo visible on the auth card", async ({ page }) => {
  32 |     await expect(page.getByAltText("Logo")).toBeVisible();
  33 |   });
  34 | });
  35 | 
```