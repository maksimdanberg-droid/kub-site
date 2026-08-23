import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация изображений
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  
  // Включение экспериментальных фич (совместимо с Next.js 16 + Turbopack)
  experimental: {
    optimizeCss: true, // Требует `npm i critters`
  },

  // Базовые настройки для production
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;