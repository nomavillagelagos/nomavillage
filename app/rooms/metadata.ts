import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rooms & Accommodation | Noma Village Lagos',
  description: 'Discover our comfortable, modern rooms designed for digital nomads. Private and shared options available in our premium coliving space in Lagos, Portugal.',
  openGraph: {
    title: 'Rooms & Accommodation | Noma Village Lagos',
    description: 'Comfortable, modern rooms for digital nomads in the heart of Lagos, Portugal. Experience the perfect blend of work and play.',
    url: 'https://nomavillage.com/rooms',
    siteName: 'Noma Village',
    images: [
      {
        url: '/images/rooms/room1.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern room at Noma Village Lagos',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rooms & Accommodation | Noma Village Lagos',
    description: 'Comfortable, modern rooms for digital nomads in the heart of Lagos, Portugal.',
    images: ['/images/rooms/room1.jpg'],
  },
  alternates: {
    canonical: 'https://nomavillage.com/rooms',
  },
}
