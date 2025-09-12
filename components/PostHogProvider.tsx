"use client"

import type React from "react"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "@/lib/posthog"

// Initializes PostHog via import and tracks SPA pageviews on route changes
export default function PostHogProvider({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Ensure PostHog is loaded; importing '@/lib/posthog' initializes it in the browser
    // Track pageviews on route change (Next.js App Router SPA)
    if (typeof window !== "undefined" && pathname) {
      // You can include the full URL for better attribution
      const url = window.location.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      posthog.capture("$pageview", { $current_url: url })
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
