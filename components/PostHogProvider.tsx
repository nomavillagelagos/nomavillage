"use client"

import type React from "react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "@/lib/posthog"

// Initializes PostHog via import and tracks SPA pageviews on route changes
export default function PostHogProvider({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Ensure hooks like useSearchParams are used within a Suspense boundary */}
      <Suspense fallback={null}>
        <PostHogTracker />
      </Suspense>
    </>
  )
}

function PostHogTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Ensure PostHog is loaded; importing '@/lib/posthog' initializes it in the browser
    // Track pageviews on route change (Next.js App Router SPA)
    if (typeof window !== "undefined" && pathname) {
      const qp = searchParams?.toString()
      const url = window.location.origin + pathname + (qp ? `?${qp}` : "")
      posthog.capture("$pageview", { $current_url: url })
    }
  }, [pathname, searchParams])

  return null
}
