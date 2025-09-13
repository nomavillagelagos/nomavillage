"use client"

import type React from "react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "@/lib/posthog"
import { usePostHog } from "posthog-js/react"

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
  const ph = usePostHog()

  useEffect(() => {
    // Ensure PostHog is loaded; importing '@/lib/posthog' initializes it in the browser
    // Track pageviews on route change (Next.js App Router SPA)
    if (typeof window === "undefined" || !pathname) return

    // Determine A/B variant from cookie or URL
    const getCookie = (name: string) =>
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1]

    const cookieVariant = getCookie("ab_test_variant")
    const urlVariant = pathname === "/landing-b" ? "B" : pathname === "/landing-a" ? "A" : undefined
    const variant = (urlVariant || cookieVariant) === "B" ? "B" : "A"

    // Register persistent properties so ALL events carry the variant automatically
    try {
      ph?.register?.({
        experiment_name: "landing_page_test",
        variant,
      })
    } catch {}

    // Override page path for PostHog pageview so variants show as separate paths
    const qp = searchParams?.toString()
    const effectivePath = (() => {
      if (pathname === "/landing") return `/landing-${variant.toLowerCase()}`
      if (pathname === "/landing-a" || pathname === "/landing-b") return pathname
      return pathname
    })()
    const url = window.location.origin + effectivePath + (qp ? `?${qp}` : "")

    posthog.capture("$pageview", { $current_url: url, experiment_name: "landing_page_test", variant })
  }, [pathname, searchParams])

  return null
}
