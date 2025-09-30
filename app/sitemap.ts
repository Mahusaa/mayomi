import type { MetadataRoute } from "next";
import { getAllPosts } from "@/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mayomimassage.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/pricing",
    "/blog",
    "/simple",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Dynamic blog routes
  const posts = await getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => Boolean(p.slug))
    .map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.publishedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...blogRoutes];
}
