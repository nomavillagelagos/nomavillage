import type { Metadata } from 'next'
import { Suspense } from 'react'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'

export const metadata: Metadata = {
  title: 'October Yoga + Surf Colive | Noma Village (Variant B)',
  description: 'Limited October cohort in Lagos: private rooms, coworking, daily yoga, surf, and a curated community.',
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: {
    canonical: '/landing',
  },
  openGraph: {
    title: 'October Yoga + Surf Colive | Noma Village',
    description: 'Private rooms, coworking, daily yoga, surf. Limited spots in Lagos, Portugal.',
    url: '/landing',
    images: [{ url: '/images/yoga.jpg', width: 1200, height: 630, alt: 'October Yoga + Surf Colive' }],
    type: 'website',
  },
}

export default function LandingBLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <AnalyticsWrapper />
      </Suspense>
    </>
  )
}
