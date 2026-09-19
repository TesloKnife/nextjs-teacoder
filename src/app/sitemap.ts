import { products } from "./../db/schema";
import { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teacoder.ru";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const res = await fetch("https://dummyjson.com/products?limit=50");

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    const dynamicRoutes: MetadataRoute.Sitemap = data.products.map(
      (products: any) => ({
        url: `${baseUrl}/product/${products.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );
    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.log("Failed to fetch: ", error);
    return staticRoutes;
  }

  return staticRoutes;
}
