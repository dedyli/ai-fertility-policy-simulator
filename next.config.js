/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    SITE_NAME: 'AI Fertility Policy Simulator',
    SITE_DESCRIPTION: 'AI-Driven Policy Framework for Addressing Low Fertility Rates in East Asia'
  }
}

module.exports = nextConfig