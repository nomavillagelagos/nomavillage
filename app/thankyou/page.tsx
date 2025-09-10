"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Users, Home, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="font-montserrat text-5xl md:text-6xl font-bold text-white mb-6">
            Thank You!
          </h1>
          <p className="font-nunito text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            We've received your application and are excited about the possibility of welcoming you to our community in Lagos, Portugal.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-montserrat text-lg font-semibold text-white mb-2">What happens next?</h3>
            <p className="font-nunito text-white/90 text-sm">
              Our team will review your application and get back to you within 24-48 hours with next steps.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl font-bold text-gray-900 mb-4">While You Wait...</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto">
              Get excited about your potential new home in Lagos! Here's what makes Noma Village special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-lagos-pink" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Curated Community</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Join 145+ entrepreneurs and creatives from 26+ countries in our vibrant coliving community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-lagos-blue-green" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Authentic Experience</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Experience genuine Portuguese culture with our family-owned coliving space in beautiful Lagos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-amber/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="h-8 w-8 text-lagos-amber" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Home Away From Home</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Everything you need for remote work and coastal living, just 10 minutes from stunning beaches.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl font-bold text-gray-900 mb-4">Your Future Home</h2>
            <p className="font-nunito text-xl text-gray-600">
              Take a peek at life at Noma Village
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <img
                src="/images/community2.jpg"
                alt="Coworking space at Noma Village"
                className="w-full h-64 object-cover shadow-md rounded-lg"
              />
              <img
                src="/images/community3.jpg"
                alt="Community gathering"
                className="w-full h-48 object-cover object-[50%_90%] shadow-md rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/images/community5.jpg"
                alt="Swimming pool area"
                className="w-full h-48 object-cover shadow-md rounded-lg"
              />
              <img
                src="/images/community6.jpg"
                alt="Community kitchen"
                className="w-full h-64 object-cover shadow-md rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/images/cliff.jpg"
                alt="Beautiful Lagos coastline"
                className="w-full h-64 object-cover object-[50%_70%] shadow-md rounded-lg"
              />
              <img
                src="/images/bedroom.jpg"
                alt="Private bedroom"
                className="w-full h-48 object-cover shadow-md rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-4xl font-bold text-gray-900 mb-8">Questions?</h2>
          <p className="font-nunito text-xl text-gray-600 mb-8">
            Feel free to reach out if you have any questions about your application or life at Noma Village.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-lagos-blue-green hover:bg-lagos-blue-green/90 text-white font-montserrat text-lg px-8 py-3 h-auto"
            >
              <a href="https://calendly.com/nomavillagelagos/short-intro" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-lagos-blue-green text-lagos-blue-green hover:bg-lagos-blue-green hover:text-white font-montserrat text-lg px-8 py-3 h-auto"
            >
              <Link href="/">
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-12 bg-lagos-aquamarine/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-nunito text-gray-600">
            Follow us on social media for daily updates from our community in Lagos
          </p>
        </div>
      </section>
    </div>
  )
}
