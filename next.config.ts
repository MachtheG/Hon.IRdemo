import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1600, 1920, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
};

export default nextConfig;
