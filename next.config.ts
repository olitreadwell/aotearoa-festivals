import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@numeral/ui'],
  typedRoutes: true,
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
