"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Users, Home, ArrowRight, Calendar, Mail, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

export default function ThankYouPage() {
  // Prevent indexing by search engines
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  return (
    <div className=" bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative py-10 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/community.jpg"
            alt="Noma Village Community"
            fill
            className="object-cover object-[50%_60%] blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/80" />
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon with Animation */}
          <div className="mb-0 animate-scale-in">
            <div className="w-20 h-20 bg-teal-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-teal-400/30">
              <CheckCircle className="h-10 w-10 text-teal-400" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-2xl md:text-5xl font-bold text-white mb-6 tracking-tight animate-fade-in">
            Thank you!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            We've received your application and are excited about the possibility of welcoming you to our community in Lagos, Portugal.
          </p>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl animate-slide-in">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What happens next?</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our team will carefully review your application and reach out within <span className="font-semibold text-teal-600">24-48 hours</span> with the next steps.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>Check your inbox for updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Why You'll Love It Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get excited about your potential new home in Lagos! Here's what makes Noma Village special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group">
              <div className="bg-lagos-blue-green/10 backdrop-blur-sm border-2 border-lagos-blue-green/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-teal-500/30 hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-pink-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Community</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Join 145+ entrepreneurs and creatives from 26+ countries in our vibrant coliving community.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-lagos-blue-green/10 backdrop-blur-sm border-2 border-lagos-blue-green/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-teal-500/30 hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-teal-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Authentic Experience</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Experience genuine Portuguese culture with our family-owned coliving space in beautiful Lagos.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-lagos-blue-green/10 backdrop-blur-sm border-2 border-lagos-blue-green/50 rounded-2xl p-8 text-center transition-all duration-300 hover:border-teal-500/30 hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-10 w-10 text-amber-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Home Away From Home</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Everything you need for remote work and coastal living, just 10 minutes from stunning beaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Your Future Home
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Take a peek at life at Noma Village
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/community2.jpg"
                  alt="Coworking space at Noma Village"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/community3.jpg"
                  alt="Community gathering"
                  className="w-full h-48 object-cover object-[50%_90%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/community5.jpg"
                  alt="Swimming pool area"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/community6.jpg"
                  alt="Community kitchen"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/cliff.jpg"
                  alt="Beautiful Lagos coastline"
                  className="w-full h-64 object-cover object-[50%_70%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/bedroom.jpg"
                  alt="Private bedroom"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Have Questions?
            </h2>
            <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Feel free to reach out if you have any questions about your application or life at Noma Village. We're here to help!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-50 font-semibold text-lg px-10 py-5 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <a href="https://calendly.com/nomavillagelagos/short-intro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book a Call
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold text-lg px-10 py-5 h-auto rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Link href="/" className="flex items-center gap-2">
                  Back to Home
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-10 md:p-14 text-center shadow-xl">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Instagram className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Follow Our Journey
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                Get daily updates, behind-the-scenes content, and connect with our community on Instagram 🌴
              </p>
            </div>

            <a
              href="https://www.instagram.com/nomavillage_lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white font-semibold text-xl px-12 py-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <Instagram className="w-6 h-6" strokeWidth={2.5} />
              @nomavillage_lagos
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
