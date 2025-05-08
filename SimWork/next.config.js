/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/d12-all-SimWork/SimWork',
  assetPrefix: '/d12-all-SimWork/SimWork/',
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
