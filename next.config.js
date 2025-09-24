const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        destination: '/api/.well-known/assetlinks.json'
      },

    ];
  }
};

module.exports = nextConfig; 