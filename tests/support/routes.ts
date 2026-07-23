export const protectedRoutes = [
  { name: "home", path: "/" },
  { name: "profiles", path: "/profiles" },
  { name: "movies", path: "/movies" },
  { name: "series", path: "/series" },
  { name: "new trends", path: "/newtrends" },
  { name: "favorites", path: "/favorites" },
  { name: "my list", path: "/mylist" },
  { name: "recommendations", path: "/recomendations" },
  { name: "search", path: "/search?query=batman" },
  { name: "movie detail", path: "/movies/123" },
  { name: "series detail", path: "/series/456" },
  { name: "watch page", path: "/watch/789" },
] as const;
