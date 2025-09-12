"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Palmtree, Heart, ExternalLink, X } from "lucide-react"
import { useMemo, useState } from "react"

export default function JoinPage() {
  const [isSliderOpen, setIsSliderOpen] = useState(false)

  // Compute Fillout URL with current page UTM parameters for the fallback slider iframe
  const filloutUrlWithUtms = useMemo(() => {
    const base = "https://forms.fillout.com/t/aKuWaUwvaVus"
    try {
      const url = new URL(base)
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search)
        params.forEach((value, key) => {
          const lower = key.toLowerCase()
          if (lower.startsWith("utm_")) {
            url.searchParams.set(lower, value)
          }
        })
        if (document.referrer && !url.searchParams.has("referrer")) {
          url.searchParams.set("referrer", document.referrer)
        }
      }
      return url.toString()
    } catch {
      return base
    }
  }, [])

  const openSlider = () => {
    setIsSliderOpen(true)
  }

  const closeSlider = () => {
    setIsSliderOpen(false)
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


          {/* Form and Button Layout */}
          <div className="relative">
            {/* Form Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mx-auto relative">
              {/* Standard Fillout embed */}
              <div 
                style={{width: "100%", height: "500px"}} 
                data-fillout-id="aKuWaUwvaVus" 
                data-fillout-embed-type="standard" 
                data-fillout-inherit-parameters 
                data-fillout-dynamic-resize
              ></div>
              <script src="https://server.fillout.com/embed/v1/"></script>
            </div>

          </div>

          {/* Button underneath form */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={openSlider}
              className="inline-flex items-center gap-3 bg-lagos-pink text-white px-12 py-6 rounded-2xl font-montserrat font-bold hover:bg-lagos-pink/90 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-xl"
            >
              <Heart className="h-6 w-6" />
              Form not loading? Click here.
            </button>
          </div>

        </div>
      </section>

      {/* Live at Noma Village Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Live at Noma Village</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover your new home away from home in Lagos, Portugal. Experience vibrant community living with like-minded individuals from around the world.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Fillout Slider */}
      {isSliderOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeSlider}
          />
          
          {/* Slider Panel */}
          <div 
            className="relative ml-auto h-full w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-caveat text-3xl font-bold text-gray-900">
                Join Noma Village
              </h2>
              <button
                onClick={closeSlider}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close form"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Form Content */}
            <div className="relative h-[calc(100vh-88px)] overflow-hidden">
              {/* Iframe */}
              <iframe
                src={filloutUrlWithUtms}
                className="w-full h-full border-none"
                title="Join Noma Village Application Form"
                allow="camera; microphone; geolocation"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
