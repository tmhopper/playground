import type { NextConfig } from "next";

// Deploy target: GitHub Pages project site at tmhopper.github.io/playground/
const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = isGhPages ? "/playground" : "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default config;
