"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Palmtree, Heart, Loader2 } from "lucide-react"
import Script from "next/script"
import { useState, useEffect } from "react"

// Extend Window interface for Fillout
declare global {
  interface Window {
    Fillout?: {
      load: () => void;
    };
  }
}

export default function JoinPage() {
  const [isFormLoading, setIsFormLoading] = useState(true)
  const [formError, setFormError] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Handle form loading timeout
  useEffect(() => {
    if (scriptLoaded) {
      const timeout = setTimeout(() => {
        // Check if Fillout form has loaded
        const filloutFrame = document.querySelector('[data-fillout-id="aKuWaUwvaVus"] iframe')
        if (filloutFrame) {
          setIsFormLoading(false)
        } else {
          // Try to trigger form initialization
          const filloutContainer = document.querySelector('[data-fillout-id="aKuWaUwvaVus"]')
          if (filloutContainer && window.Fillout) {
            window.Fillout.load()
            setIsFormLoading(false)
          } else {
            setFormError(true)
            setIsFormLoading(false)
          }
        }
      }, 3000) // 3 second timeout

      return () => clearTimeout(timeout)
    }
  }, [scriptLoaded])

  const handleScriptLoad = () => {
    setScriptLoaded(true)
    // Give the form a moment to initialize
    setTimeout(() => {
      const checkFormLoaded = () => {
        const filloutFrame = document.querySelector('[data-fillout-id="aKuWaUwvaVus"] iframe')
        if (filloutFrame) {
          setIsFormLoading(false)
        } else {
          setTimeout(checkFormLoaded, 500)
        }
      }
      checkFormLoaded()
    }, 1000)
  }

  const handleScriptError = () => {
    setFormError(true)
    setIsFormLoading(false)
  }

  const retryForm = () => {
    setFormError(false)
    setIsFormLoading(true)
    // Reload the script
    const script = document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')
    if (script) {
      script.remove()
    }
    const newScript = document.createElement('script')
    newScript.src = 'https://server.fillout.com/embed/v1/'
    newScript.onload = handleScriptLoad
    newScript.onerror = handleScriptError
    document.head.appendChild(newScript)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/application-form-hero-image.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Join the Community</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Live & work where others spend their vacation while being a part of a lovely tribe of like-minded entrepreneurial people in a place full of sunshine & colors
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Why Choose Noma Village?</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Noma, we're more than just a usual Coliving & Coworking space. We're a vibrant community of like-minded entrepreneurial people seeking connection and purpose. Together, we support and uplift each other, creating a positive impact on our journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-lagos-pink" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Entrepreneurial Community</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">Hand-selected individuals who value initiative, authenticity, and meaningful connections</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-lagos-blue-green" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Authentic Experience</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">Owned by a lovely Portuguese family, offering genuine cultural immersion and local connections</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-amber/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palmtree className="h-8 w-8 text-lagos-amber" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Perfect Location</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">10 minutes walk to stunning beaches, with over 300 sunny days per year in beautiful Lagos</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-lagos-aquamarine" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Magic & Synchronicity</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">Experience the magic that happens when like-minded people come together in this special place</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fillout Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Inquire Now</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to join our community? Send us your details and let's start the conversation. We carefully curate our community to ensure the perfect vibe for everyone.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mx-auto relative">
            {/* Loading State */}
            {isFormLoading && !formError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl z-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-lagos-aquamarine mx-auto mb-4" />
                  <p className="font-nunito text-gray-600">Loading application form...</p>
                  <div className="mt-4 w-64 bg-gray-200 rounded-full h-2 mx-auto">
                    <div className="bg-lagos-aquamarine h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {formError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl z-10">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold mb-2">Form Loading Error</h3>
                  <p className="font-nunito text-gray-600 mb-6">
                    We're having trouble loading the application form. Please try again or contact us directly.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={retryForm}
                      className="bg-lagos-aquamarine text-white px-6 py-3 rounded-lg font-nunito font-medium hover:bg-lagos-aquamarine/90 transition-colors w-full"
                    >
                      Try Again
                    </button>
                    <p className="font-nunito text-sm text-gray-500">
                      Or email us at: <a href="mailto:hello@nomavillage.com" className="text-lagos-aquamarine hover:underline">hello@nomavillage.com</a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Fillout Form */}
            <div 
              style={{width:"100%", height:"500px", opacity: isFormLoading ? 0 : 1}} 
              data-fillout-id="aKuWaUwvaVus" 
              data-fillout-embed-type="standard" 
              data-fillout-inherit-parameters 
              data-fillout-dynamic-resize
              className="rounded-lg overflow-hidden transition-opacity duration-300"
            ></div>
          </div>
          
          {/* Fillout Script with optimized loading */}
          <Script 
            src="https://server.fillout.com/embed/v1/" 
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
            onError={handleScriptError}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
