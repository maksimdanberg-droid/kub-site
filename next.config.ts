import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ ГЛАВНОЕ: создаем статические HTML файлы в папку out
  output: "export",
  trailingSlash: true, 
  
  // ✅ Для статики отключаем оптимизацию картинок (требует сервер)
  images: {
    unoptimized: true,
  },
  
  // Можно оставить для оптимизации CSS
  experimental: {
    optimizeCss: true,
  },

  // Убираем заголовок X-Powered-By (безопасность)
  poweredByHeader: false,
};

export default nextConfig;