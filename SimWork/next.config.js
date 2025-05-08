/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/d12-all-SimWork',  // Just use the repo name as base path
  assetPrefix: '/d12-all-SimWork/',
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
