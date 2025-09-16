import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Program | Noma Village',
  description: 'Earn €100 per referral while your audience saves €100 on our premium Yoga + Co‑Living retreat in Lagos, Portugal.',
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: {
    canonical: '/affiliate',
  },
  openGraph: {
    type: 'website',
    title: 'Affiliate Program | Noma Village',
    description: 'Earn €100 per referral while your audience saves €100 on our premium Yoga + Co‑Living retreat.',
    url: '/affiliate',
    images: [{ url: '/images/community.jpg', width: 1200, height: 630, alt: 'Noma Village Affiliate Program' }],
  },
}

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return children
}
