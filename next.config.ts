import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  poweredByHeader: false, // безопасность
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // убирает возможность утечки исходного кода в браузер клиента
  compress: false, // если есть перед сайтом nginx, перекладываем нагрузку на него
  generateEtags: false, // если генерция хэша через cdn идет,
  cleanDistDir: true, // очиста директорию next перед началом компиляции
  typescript: {
    ignoreBuildErrors: true, // игнорирование проверки типов, оставляет на команду tsc
  },
  logging: {
    fetches: {
      fullUrl: true, // детальное логирование fetch запросов в консоль
    },
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fnc"], // оптимизация итогового бандла, в данных библиокеках удаляютяс не используемые участки
  },
};

export default nextConfig;
