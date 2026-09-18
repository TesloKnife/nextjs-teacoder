import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teacoder.ru";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/payment"],
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: "/admin/",
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
