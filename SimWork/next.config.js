/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SimWork',
  assetPrefix: '/SimWork/',
  trailingSlash: true,
  images: { unoptimized: true },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  }
};

module.exports = nextConfig;
