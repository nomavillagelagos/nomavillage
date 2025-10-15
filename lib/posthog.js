import posthog from 'posthog-js'

if (typeof window !== 'undefined' && !posthog.__initialized) {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY,
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // We manually track pageviews in PostHogProvider to handle SPA navigations
      capture_pageview: false,
      // Enable $pageleave for accurate bounce rate & session duration in Web Analytics
      capture_pageleave: true,
      // Enable heatmaps and session recordings (configure to your needs)
      capture_heatmaps: true,
      session_recording: {
        enabled: true,
        recordCrossOriginIframes: true,
      },
      loaded: (ph) => { ph.__initialized = true }
    }
  )
}

export default posthog
