import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs | Noma Village Lagos',
  description: 'Find answers to common questions about coliving, coworking, bookings, and life at Noma Village in Lagos, Portugal.',
  openGraph: {
    title: 'Frequently Asked Questions | Noma Village Lagos',
    description: 'Get answers to common questions about our coliving space, amenities, booking process, and life in Lagos, Portugal.',
    url: 'https://www.nomavillage.com/faq',
    siteName: 'Noma Village',
    images: [
      {
        url: '/images/faq/faq-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - Noma Village Lagos',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs | Noma Village Lagos',
    description: 'Your questions answered about coliving, coworking, and life at Noma Village in Lagos, Portugal.',
    images: ['/images/faq/faq-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.nomavillage.com/faq',
  },
}
