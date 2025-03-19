/** @type {import('next').NextConfig} */

// CHANGE THIS VALUE FOR GITHUB PAGES
// Leave as empty string for custom domains
// Set to "/your-repo-name" for GitHub Pages
const REPO_PATH = "";

const nextConfig = {

  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: REPO_PATH === "" ? '' : REPO_PATH,
  assetPrefix: REPO_PATH === "" ? '' : REPO_PATH,
  
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig