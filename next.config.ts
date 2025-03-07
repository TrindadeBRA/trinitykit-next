import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['tailwindcss.com'],
  },
  env: {
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages: [
        { title: "English", name: "en", flag: "🇺🇸" },
        { title: "Português", name: "pt", flag: "🇧🇷" },
        { title: "Spanish", name: "es", flag: "🇪🇸" },
      ],
      defaultLanguage: "pt",
    }),
  },
  /* config options here */
};

export default nextConfig;
