"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { X } from 'lucide-react'
import { trackEvent } from '@/components/GoogleAnalytics'
import posthog from '@/lib/posthog'

interface FilloutSliderPopupProps {
  isOpen: boolean
  onClose: () => void
  formUrl: string
  onFormSubmit?: () => void
}

export default function FilloutSliderPopup({ isOpen, onClose, formUrl, onFormSubmit }: FilloutSliderPopupProps) {
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Track when the popup is opened
  useEffect(() => {
    if (isOpen) {
      const variant = window?.location.pathname.includes('landing-b') ? 'B' : 'A'
      const eventProps = {
        form_name: 'fillout_application',
        variant,
        source: 'popup',
        timestamp: new Date().toISOString()
      }
      
      // Track in Google Analytics
      trackEvent('form_open', eventProps)
      
      // Track in PostHog
      posthog.capture('form_open', eventProps)
    }
  }, [isOpen])

  // Listen for form submission messages from Fillout
  useEffect(() => {
    if (!onFormSubmit) return
    
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Fillout form submission
      if (event.data?.type === 'fillout:submitted') {
        const variant = window?.location.pathname.includes('landing-b') ? 'B' : 'A'
        const eventProps = {
          form_name: 'fillout_application',
          variant,
          source: 'popup',
          timestamp: new Date().toISOString()
        }
        
        // Track in Google Analytics
        trackEvent('form_submit_success', eventProps)
        
        // Track in PostHog
        posthog.capture('form_submit_success', eventProps)
        
        // Call the original onFormSubmit handler
        onFormSubmit()

        // After successful submit, redirect to absolute '/thankyou' and preserve query params (e.g., gclid, utm)
        try {
          const qs = window.location.search || ''
          const dest = `/thankyou${qs}`
          // Use replace to avoid user navigating back into the form accidentally
          window.location.replace(dest)
        } catch (_) {
          // fallback
          window.location.href = '/thankyou'
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onFormSubmit])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Compute form URL with UTM params from current page
  const computedFormUrl = useMemo(() => {
    try {
      const url = new URL(formUrl)
      if (typeof window !== 'undefined') {
        const pageParams = new URLSearchParams(window.location.search)
        // Copy through only utm_* params and referrer if present
        pageParams.forEach((value, key) => {
          const lower = key.toLowerCase()
          if (lower.startsWith('utm_')) {
            url.searchParams.set(lower, value)
          }
        })
        // Optionally include ref using document.referrer
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
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Slider Panel - match /join page style */}
      <div 
        className={`relative ml-auto h-full w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Secure Your Spot</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="relative h-[calc(100vh-88px)] overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading form...</p>
              </div>
            </div>
          )}
          
          <iframe
            ref={iframeRef}
            src={computedFormUrl}
            className="w-full h-full border-none"
            onLoad={handleIframeLoad}
            title="Application Form"
            allow="autoplay; camera; microphone; geolocation; fullscreen"
          />
        </div>
      </div>
    </div>
  )
}
