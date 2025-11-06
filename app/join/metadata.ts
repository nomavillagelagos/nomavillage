import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join Our Community | Noma Village Lagos',
  description: 'Become part of our coliving community in Lagos, Portugal. Experience the perfect work-life balance with like-minded digital nomads and remote workers.',
  openGraph: {
    title: 'Join Our Community | Noma Village Lagos',
    description: 'Apply now to join our vibrant coliving and coworking community in Lagos, Portugal. Limited spots available for digital nomads and remote workers.',
    url: 'https://nomavillage.com/join',
    siteName: 'Noma Village',
    images: [
      {
        url: '/images/community/community-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Join our community at Noma Village Lagos',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Community | Noma Village Lagos',
    description: 'Apply to join our coliving and coworking space in Lagos, Portugal. Connect with digital nomads and remote workers.',
    images: ['/images/community/community-hero.jpg'],
  },
  alternates: {
    canonical: 'https://nomavillage.com/join',
  },
}
