# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\E2E.logged-in.spec.ts >> Logged-in E2E >> can return to the home page from the navbar
- Location: tests\e2e\E2E.logged-in.spec.ts:41:3

# Error details

```
Test timeout of 30000ms exceeded.
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