import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images served locally from /public — no remote domains needed
    formats: ['image/webp'],
  },
};

export default nextConfig;
