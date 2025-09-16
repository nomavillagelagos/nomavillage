/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'a.cdn-hotels.com', 'images.ctfassets.net', 'images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: '/october', destination: '/landing', permanent: true },
      { source: '/october-a', destination: '/landing-a', permanent: true },
      { source: '/october-b', destination: '/landing-b', permanent: true },
    ]
  },
}

export default nextConfig
