import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Program | Noma Village Lagos',
  description:
    'Earn €100 per referral while giving your audience €100 off our premium Yoga + Co‑Living experience in Lagos, Portugal. October 2024 confirmed; November probable.',
  openGraph: {
    title: 'Noma Village Affiliate Program — Earn €100, Give €100',
    description:
      'Share transformation: help others join our premium Yoga + Co‑Living program and earn €100 per referral while they save €100.',
    url: 'https://www.nomavillage.com/affiliate',
    siteName: 'Noma Village',
    images: [
      {
        url: '/images/noma1.webp',
        width: 1200,
        height: 630,
        alt: 'Noma Village Affiliate Program',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noma Village Affiliate Program — Earn €100, Give €100',
    description:
      'Share transformation: help others join our premium Yoga + Co‑Living program and earn €100 per referral while they save €100.',
    images: ['/images/noma1.webp'],
  },
}
