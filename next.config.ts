import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['tailwindcss.com'],
  },
  /* config options here */
};

export default nextConfig;
