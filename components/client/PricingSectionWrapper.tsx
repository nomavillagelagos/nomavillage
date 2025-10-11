'use client'

import { useRouter } from 'next/navigation'
import PricingSection from '@/components/PricingSection'
import posthog from '@/lib/posthog'

export function PricingSectionWrapper() {
  const router = useRouter()

  const handleJoinUsClick = () => {
    if (typeof window !== 'undefined') {
      posthog.capture('cta_clicked', {
        location: 'pricing',
        button_text: 'Join Us',
        page_url: window.location.pathname
      })
    }
    router.push('/form')
  }

  return <PricingSection onJoinClick={handleJoinUsClick} />
}
