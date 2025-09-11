"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface FilloutSliderPopupProps {
  isOpen: boolean
  onClose: () => void
  formUrl: string
}

export default function FilloutSliderPopup({ isOpen, onClose, formUrl }: FilloutSliderPopupProps) {
  const [isLoading, setIsLoading] = useState(true)

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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Slider Panel */}
      <div className={`
        absolute bg-white shadow-2xl transition-all duration-700 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-full -translate-x-full'}
        
        /* Desktop: slide from right */
        lg:top-0 lg:right-0 lg:h-full lg:w-[600px] lg:max-w-[90vw]
        
        /* Mobile: slide from left */
        top-0 left-0 bottom-0 w-[90vw] max-w-[400px] lg:w-[600px] lg:h-full
        
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Secure Your Spot</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading form...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={formUrl}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            title="Application Form"
          />
        </div>
      </div>
    </div>
  )
}
