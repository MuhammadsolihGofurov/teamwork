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
    domains: ["php.teamwork.uz"],
  },
  env: {
    // like base url
    API: process.env.API,
  },
  transpilePackages: ["react-tailwindcss-datepicker"],
};

module.exports = nextConfig;
