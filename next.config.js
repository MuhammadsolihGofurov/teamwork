/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "uz", "en"],
    localeDetection: false,
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  images: {
    // like ['domen.uz']
    domains: ["admin.worldtradee.ru"],
  },
  env: {
    // like base url
    API: process.env.API,
  },
};

module.exports = nextConfig;
