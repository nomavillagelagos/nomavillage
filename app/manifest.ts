import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Noma Village',
    short_name: 'NomaVillage',
    description:
      'Modern coliving and coworking space in Lagos, Portugal. Join our vibrant community of digital nomads and remote workers.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: 'en',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
