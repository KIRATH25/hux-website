import type { NextConfig } from "next";

// A static site: `next build` writes plain HTML/CSS/JS into `out/` (published by GitHub Pages, see DEPLOY.md).
// Cache Components (on by default in new projects) needs a server, so it stays off here.
const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves the site from /<repo>/; the deploy workflow sets this (empty locally)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
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
