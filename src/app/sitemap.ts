import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

// TODO: site.domain must be set before going live, or these URLs point at localhost.
const base = (site.domain || "http://localhost:3100").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/download/", "/privacy/", "/terms/", "/delete-account/"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" || path === "/download/" ? "weekly" : "yearly",
    priority: path === "/" ? 1 : path === "/download/" ? 0.9 : 0.3,
  }));
}
