'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import posthog from '@/lib/posthog'

export function HeroCTA() {
  const handleJoinUsClick = () => {
    if (typeof window !== 'undefined') {
      posthog.capture('cta_clicked', {
        location: 'hero',
        button_text: 'Join Us',
        page_url: window.location.pathname
      })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
      <Button
        asChild
        size="lg"
        className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all"
      >
        <Link href="/form" onClick={handleJoinUsClick}>
          Join Our Community
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-montserrat text-lg px-10 py-6 bg-transparent backdrop-blur-sm transition-all"
      >
        <SmoothScrollLink to="#stay-connected" duration={1500} offset={80}>
          Get the Guide
        </SmoothScrollLink>
      </Button>
    </div>
  )
}
