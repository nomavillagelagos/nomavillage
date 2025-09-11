/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
