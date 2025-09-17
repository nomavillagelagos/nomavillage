'use client'

import { useMemo } from 'react'
import Head from 'next/head'

export default function ApplyPage() {
  // Build Fillout URL with current UTM params and referrer
  const formUrl = useMemo(() => {
    const base = 'https://forms.fillout.com/t/aKuWaUwvaVus'
    try {
      const url = new URL(base)
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        params.forEach((value, key) => {
          const lower = key.toLowerCase()
          if (lower.startsWith('utm_')) url.searchParams.set(lower, value)
        })
        if (document.referrer && !url.searchParams.has('referrer')) {
          url.searchParams.set('referrer', document.referrer)
        }
      }
      return url.toString()
    } catch {
      return base
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Meta: prevent indexing this utility page */}
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Apply to Noma Village</title>
      </Head>

      {/* Simple header bar */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Secure Your Spot</div>
        <button
          onClick={() => {
            // Try to close tab or navigate back
            if (window.history.length > 1) window.history.back()
            else window.close()
          }}
          className="text-sm text-gray-700 hover:text-black"
        >
          Close
        </button>
      </div>

      {/* Fullscreen iframe */}
      <div className="w-full" style={{ height: 'calc(100vh - 48px)' }}>
        <iframe
          src={formUrl}
          className="w-full h-full border-0"
          title="Apply to Noma Village"
          allow="autoplay; camera; microphone; geolocation; fullscreen"
        />
      </div>
    </div>
  )
}
