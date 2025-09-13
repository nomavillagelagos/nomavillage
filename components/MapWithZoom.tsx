"use client"

import React, { useEffect, useRef, useState } from "react"
import Script from "next/script"

type MapWithZoomProps = {
  center?: { lat: number; lng: number }
  initialZoom?: number
  targetZoom?: number
  durationMs?: number
  className?: string
  style?: React.CSSProperties
}

// Lagos default
const DEFAULT_CENTER = { lat: 37.0925267, lng: -8.6828956 }

export default function MapWithZoom({
  center = DEFAULT_CENTER,
  initialZoom = 3,
  targetZoom = 12,
  durationMs = 2500,
  className,
  style,
}: MapWithZoomProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const playedRef = useRef(false)
  const [apiReady, setApiReady] = useState<boolean>(typeof window !== "undefined" && !!(window as any).google?.maps)

  // Load Google Maps JS API if needed
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (typeof window === "undefined") return
    if ((window as any).google?.maps) {
      setApiReady(true)
      return
    }
    if (!apiKey) {
      // Without an API key we'll skip JS map; caller should provide a fallback if desired
      setApiReady(false)
      return
    }
  }, [apiKey])

  useEffect(() => {
    if (!apiReady || !containerRef.current) return

    // Create map once
    if (!mapRef.current) {
      mapRef.current = new (window as any).google.maps.Map(containerRef.current, {
        center,
        zoom: initialZoom,
        disableDefaultUI: true,
        gestureHandling: "greedy",
        mapTypeControl: false,
      })
    }

    const el = containerRef.current
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !playedRef.current && mapRef.current) {
          playedRef.current = true
          animateZoom(mapRef.current, initialZoom, targetZoom, durationMs)
          io.disconnect()
        }
      },
      { threshold: [0, 0.5, 1] }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [apiReady, center, initialZoom, targetZoom, durationMs])

  // Smooth zoom animation using requestAnimationFrame with easeInOutQuad
  function animateZoom(map: any, from: number, to: number, duration: number) {
    const start = performance.now()
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    const step = (now: number) => {
      const elapsed = now + 0 - start
      const t = Math.min(1, elapsed / duration)
      const z = from + (to - from) * ease(t)
      map.setZoom(z)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  // If API key missing, render a static iframe fallback so section doesn't break
  if (!apiReady && !apiKey) {
    return (
      <div className={className} style={style}>
        <iframe
          title="Noma Village Lagos Location Map"
          src={`https://www.google.com/maps?q=${center.lat},${center.lng}&hl=en&z=11&output=embed`}
          className="w-full h-[360px] md:h-[440px] rounded-2xl shadow-xl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    )
  }

  return (
    <>
      {/* Load script only if we have a key and API isn't present */}
      {!!apiKey && !apiReady && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
          strategy="afterInteractive"
          onLoad={() => setApiReady(true)}
        />
      )}
      <div ref={containerRef} className={className} style={{ height: "360px", ...(style || {}) }} />
    </>
  )
}
