"use client"

import React, { useEffect, useState } from "react"

type MapWithZoomProps = {
  center?: { lat: number; lng: number }
  initialZoom?: number
  targetZoom?: number
  className?: string
  style?: React.CSSProperties
}

// Lagos default
const DEFAULT_CENTER = { lat: 37.0925267, lng: -8.6828956 }

export default function MapWithZoom({
  center = DEFAULT_CENTER,
  initialZoom = 8,
  targetZoom = 8,
  className,
  style,
}: MapWithZoomProps) {
  // Prefer any provided fixed zoom, default to 12
  const zoom = Number.isFinite(targetZoom) ? targetZoom : initialZoom
  // Avoid hydration mismatches from extensions/third-party scripts by mounting first
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={className} style={style} suppressHydrationWarning>
      {mounted ? (
        <iframe
          title="Noma Village Lagos Location Map"
          src={`https://www.google.com/maps?q=${center.lat},${center.lng}&hl=en&z=${zoom}&output=embed`}
          className="w-full h-[360px] md:h-[440px] rounded-2xl shadow-xl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  )
}
