"use client"

import type React from "react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "@/lib/posthog"
import { usePostHog } from "posthog-js/react"
import { buildAttribution, storeAttribution, getStoredAttribution } from "@/lib/utm"

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
    // Safety net: never track the placeholder /landing page
    if (pathname === "/landing") return

    // Determine A/B variant from cookie or URL
    const getCookie = (name: string) =>
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1]

    const cookieVariant = getCookie("ab_test_variant")
    const urlVariant = pathname === "/landing-b" ? "B" : pathname === "/landing-a" ? "A" : undefined
    const variant = (urlVariant || cookieVariant) === "B" ? "B" : "A"

    // Build attribution from current search and referrer
    const qp = searchParams?.toString()
    const attribution = buildAttribution(qp ? `?${qp}` : undefined, variant)
    // Persist in localStorage as a fallback
    storeAttribution(attribution)

    // Register persistent properties so ALL events carry the variant automatically
    try {
      ph?.register?.({
        experiment_name: "landing_page_test",
        variant,
        ab_variant: variant.toLowerCase(),
        utm_source: attribution.utm_source ?? null,
        utm_medium: attribution.utm_medium ?? null,
        utm_campaign: attribution.utm_campaign ?? null,
        utm_term: attribution.utm_term ?? null,
        utm_content: attribution.utm_content ?? null,
        referrer: attribution.referrer ?? null,
      })
    } catch {}

    // Override page path for PostHog pageview so variants show as separate paths
    const effectivePath = (() => {
      if (pathname === "/landing-a" || pathname === "/landing-b") return pathname
      return pathname
    })()
    const url = window.location.origin + effectivePath + (qp ? `?${qp}` : "")

    const pageviewProps = {
      $current_url: url,
      experiment_name: "landing_page_test",
      variant,
      ab_variant: variant.toLowerCase(),
      utm_source: attribution.utm_source ?? null,
      utm_medium: attribution.utm_medium ?? null,
      utm_campaign: attribution.utm_campaign ?? null,
      utm_term: attribution.utm_term ?? null,
      utm_content: attribution.utm_content ?? null,
      referrer: attribution.referrer ?? null,
    }

    try {
      posthog.capture("$pageview", pageviewProps)
    } catch (err) {
      // Client capture failed; send to fallback API with stored attribution
      const fallback = getStoredAttribution() || attribution
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ event: "$pageview", properties: { ...pageviewProps, ...fallback } }),
      }).catch(() => {})
    }
  }, [pathname, searchParams])

  return null
}
