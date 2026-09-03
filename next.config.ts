import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output powers the Docker image and smoke tests.
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
