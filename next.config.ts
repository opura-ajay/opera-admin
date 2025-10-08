import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: '/backend/api/:path*' },
      { source: '/:path*', destination: '/frontend/:path*' }
    ];
  },
};

export default nextConfig;
