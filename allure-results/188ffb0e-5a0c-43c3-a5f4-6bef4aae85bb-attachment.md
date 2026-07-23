# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: protected-routes.spec.ts >> Protected route redirects >> redirects watch page to auth
- Location: tests\protected-routes.spec.ts:7:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth(?:\?.*)?$/
Received string:  "https://movie-theater-cyan-three.vercel.app/watch/789"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "https://movie-theater-cyan-three.vercel.app/watch/789"

```

```yaml
- navigation:
  - img "Logo Light"
- navigation:
  - img
  - paragraph: "Watching:"
- alert: /watch/789
```

# Test source

```ts
  1 | import { expect, Page } from "@playwright/test";
  2 | 
  3 | export async function expectRedirectToAuth(page: Page, path: string) {
  4 |   await page.goto(path);
> 5 |   await expect(page).toHaveURL(/\/auth(?:\?.*)?$/);
    |                      ^ Error: expect(page).toHaveURL(expected) failed
  6 |   await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  7 | }
  8 | 
```