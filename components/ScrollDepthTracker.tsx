"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/components/GoogleAnalytics"
import posthog from "@/lib/posthog"

/**
 * ScrollDepthTracker
 *
 * Sends a "scroll_depth" event with a percentage property to analytics providers.
 * - Emits at standard thresholds: 25, 50, 75, 100
 * - Also sends a final best-effort event with the max percentage on unload if not already 100
 */
export default function ScrollDepthTracker() {
  const emittedThresholdsRef = useRef<Set<number>>(new Set())
  const maxPercentRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Emit at finer-grained thresholds as requested
    const thresholds = [10, 25, 50, 75, 90, 100]

    const computePercent = () => {
      const doc = document.documentElement
      const body = document.body
      const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0
      const viewport = window.innerHeight || doc.clientHeight
      const fullHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        doc.clientHeight,
        doc.scrollHeight,
        doc.offsetHeight
      )
      const maxScrollable = Math.max(fullHeight - viewport, 1)
      const pct = Math.max(0, Math.min(100, Math.round((scrollTop / maxScrollable) * 100)))
      return pct
    }

    const emitEvent = (percent: number) => {
      const page = typeof window !== 'undefined' ? window.location.pathname : undefined
      const title = typeof document !== 'undefined' ? document.title : undefined

      // Google Analytics (gtag)
      trackEvent("scroll_depth", {
        percent,
        page,
        page_title: title,
      })

      // PostHog (optional parity)
      try {
        posthog.capture("scroll_depth", { percent, page, page_title: title })
      } catch (_) {
        // no-op
      }
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        const pct = computePercent()
        if (pct > maxPercentRef.current) {
          maxPercentRef.current = pct
          // Check thresholds
          for (const t of thresholds) {
            if (pct >= t && !emittedThresholdsRef.current.has(t)) {
              emittedThresholdsRef.current.add(t)
              emitEvent(t)
            }
          }
        }
      })
    }

    // Final best-effort on page hide/unload
    const onPageHide = () => {
      const pct = computePercent()
      if (pct > maxPercentRef.current) {
        maxPercentRef.current = pct
      }
      // If not yet emitted 100 and we have progress, emit final exact percent
      if (!emittedThresholdsRef.current.has(100) && maxPercentRef.current > 0) {
        emitEvent(maxPercentRef.current)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pagehide", onPageHide)
    window.addEventListener("beforeunload", onPageHide)

    // Prime once in case page loads scrolled (e.g., anchor)
    onScroll()

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pagehide", onPageHide)
      window.removeEventListener("beforeunload", onPageHide)
    }
  }, [])

  return null
}
