import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

const base = (site.domain || "http://localhost:3100").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
