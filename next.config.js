/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz'],
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  images: {
    // like ['domen.uz']
    domains: [],
  },
  env: {
    // like base url
    API: '',
  },
}

module.exports = nextConfig
