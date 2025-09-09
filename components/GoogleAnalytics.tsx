'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-YGG6PPL28M'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Helper function for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', eventName, parameters)
  }
}

// Helper function for tracking page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
