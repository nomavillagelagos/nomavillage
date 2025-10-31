"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"

interface GuideSliderPopupProps {
  isOpen: boolean
  onClose: () => void
  formUrl: string
}

export default function GuideSliderPopup({ isOpen, onClose, formUrl }: GuideSliderPopupProps) {
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const computedFormUrl = useMemo(() => {
    try {
      const url = new URL(formUrl)
      if (typeof window !== 'undefined') {
        const pageParams = new URLSearchParams(window.location.search)
        pageParams.forEach((value, key) => {
          const lower = key.toLowerCase()
          if (lower.startsWith('utm_')) url.searchParams.set(lower, value)
        })
        if (document.referrer && !url.searchParams.has('referrer')) {
          url.searchParams.set('referrer', document.referrer)
        }
      }
      return url.toString()
    } catch {
      return formUrl
    }
  }, [formUrl])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 transition-opacity duration-300" onClick={onClose} />

      {/* Left sliding panel on black background */}
      <div className={`relative mr-auto h-full w-full max-w-xl bg-black text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black">
          <h3 className="text-lg font-semibold">Get the Guide</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer" aria-label="Close guide">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Iframe content */}
        <div className="relative h-[calc(100vh-72px)] overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center text-white/80">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading form...</p>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={computedFormUrl}
            className="w-full h-full border-none"
            onLoad={() => setIsLoading(false)}
            title="Get the Guide"
            allow="autoplay; camera; microphone; geolocation; fullscreen"
          />
        </div>
      </div>
    </div>
  )
}
