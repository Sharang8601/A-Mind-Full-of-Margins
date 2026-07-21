import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://a-mind-full-of-margins.vercel.app";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/dashboard", "/admin/page"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
