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
  async rewrites() {
    // Map subfolder-friendly names to existing JPGs. You can later drop real files in public/images/rooms and remove these.
    return [
      { source: '/images/rooms/kitchen.jpg', destination: '/community-kitchen-with-people-cooking-together.jpg' },
      { source: '/images/rooms/room1.jpg', destination: '/images/room.jpg' },
      { source: '/images/rooms/room2.jpg', destination: '/images/room3.jpg' },
      { source: '/images/rooms/room3.jpg', destination: '/beautiful-coliving-rooms-showcase.jpg' },
      { source: '/images/rooms/bath.jpg', destination: '/images/private-bathroom-with-modern-fixtures.jpg' },
    ]
  },
}

export default nextConfig
