/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Use this if your repo isn't at the root domain
  basePath: '/Inventory', 
  // This makes sure links and assets work correctly
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig