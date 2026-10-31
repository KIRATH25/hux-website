import type { NextConfig } from "next";

// A static site: `next build` writes plain HTML/CSS/JS into `out/` for Cloudflare Pages.
// Cache Components (on by default in new projects) needs a server, so it stays off here.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /download -> out/download/index.html, which every static host serves
  images: { unoptimized: true }, // images are pre-optimised to WebP by scripts/prepare-assets.mjs
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
