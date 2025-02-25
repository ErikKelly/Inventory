/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Inventory',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig