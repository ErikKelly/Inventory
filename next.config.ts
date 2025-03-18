/** @type {import('next').NextConfig} */

const REPO_PATH = require('./repo-path').default;

const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? REPO_PATH : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? REPO_PATH : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig