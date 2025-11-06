import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coworking Space | Noma Village Lagos',
  description: 'Productive coworking space in Lagos, Portugal with high-speed internet, ergonomic chairs, and a vibrant community of digital nomads and remote workers.',
  openGraph: {
    title: 'Coworking Space | Noma Village Lagos',
    description: 'Join our vibrant coworking community in Lagos, Portugal. High-speed internet, ergonomic workstations, and a supportive environment for digital nomads.',
    url: 'https://nomavillage.com/coworking',
    siteName: 'Noma Village',
    images: [
      {
        url: '/images/coworking/workspace1.jpg',
        width: 1200,
        height: 630,
        alt: 'Coworking space at Noma Village Lagos',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coworking Space | Noma Village Lagos',
    description: 'Productive workspace with high-speed internet and a community of digital nomads in Lagos, Portugal.',
    images: ['/images/coworking/workspace1.jpg'],
  },
  alternates: {
    canonical: 'https://nomavillage.com/coworking',
  },
}
