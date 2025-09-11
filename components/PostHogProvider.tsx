'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initPostHog, trackPageView, trackEvent } from '@/lib/posthog'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialized = useRef(false)

  useEffect(() => {
    const initializePostHog = async () => {
      if (!initialized.current) {
        // Wait for PostHog script to load
        let attempts = 0
        const maxAttempts = 50 // 5 seconds max wait
        
        while (attempts < maxAttempts && (!window.posthog || typeof window.posthog.init !== 'function')) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }
        
        if (window.posthog && typeof window.posthog.init === 'function') {
          initPostHog()
          initialized.current = true
        } else {
          console.warn('PostHog failed to load after 5 seconds')
        }
      }
    }
    
    initializePostHog()
  }, [])

  useEffect(() => {
    if (initialized.current) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
      
      // Track page view
      trackPageView(url)
      
      // Track A/B test experiment view if on landing page
      if (pathname.startsWith('/landing')) {
        const variant = document.cookie
          .split('; ')
          .find(row => row.startsWith('ab_test_variant='))
          ?.split('=')[1]
        
        if (variant) {
          trackEvent('experiment_viewed', {
            experiment_name: 'landing_page_test',
            variant: variant,
            page: pathname,
            timestamp: new Date().toISOString()
          })
        }
      }
    }
  }, [pathname, searchParams, initialized.current])

  return <>{children}</>
}
