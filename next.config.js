/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com'],
  },
  // Ensure server components can handle scientific computational workloads safely
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
}

module.exports = nextConfig
