"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, CheckCircle, Users, Utensils, Wifi, Waves, Coffee, Heart, Globe, MessageCircle, Bath, Laptop, Bed, AirVent, Shirt, Zap, Monitor, MapPin, Shield, Palmtree } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import Image from "next/image"
import { CountUp } from "@/components/count-up"
import { trackEvent } from "@/components/GoogleAnalytics"
import { useState } from "react"
import GuideModal from "@/components/guide-modal"
import EmailSignupForm from "@/components/email-signup-form"
import FilloutSliderPopup from "@/components/fillout-slider-popup"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function LandingPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()
  const handleFormClick = (location: string) => {
    // Google Analytics tracking
    trackEvent('cta_click', {
      button_text: 'Secure Your Spot Now',
      page: 'landing-a',
      location: location,
      form_type: 'application'
    })
    
    // Track CTA click with Google Analytics
    trackEvent('cta_clicked', {
      button_text: 'Secure Your Spot Now',
      page: 'landing-a',
      location: location,
      form_type: 'application',
      experiment_name: 'landing_page_test',
      variant: 'A',
      timestamp: new Date().toISOString()
    })
    
    setIsFormPopupOpen(true)
  }

  const handleGuideClick = (location: string) => {
    trackEvent('guide_click', {
      button_text: 'Get the Guide',
      page: 'landing-a',
      location: location
    })
    
    if (location === 'hero') {
      // Scroll to the email signup section instead of opening modal
      scrollToSection('email-signup')
    } else {
      // For other locations, still open the modal
      setIsGuideModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - October Yoga Colive */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/surf.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          {/* Noma Logo */}
          <div className="mb-12">
            <img 
              src="/noma-logo.png" 
              alt="Noma Village Logo" 
              className="w-24 h-24 mx-auto mb-8"
            />
          </div>
          
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-balance leading-tight" style={{fontFamily: 'Montserrat, sans-serif'}}>
              <span className="brush-underline" style={{color: 'white', fontSize: '1.4em', fontFamily: 'Caveat, cursive'}}>This</span>&nbsp;<span style={{fontSize: '24px', fontFamily: 'Montserrat, sans-serif'}}>is </span><span style={{fontWeight: '300', fontFamily: 'Montserrat, sans-serif'}}>Coliving</span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-light mb-6 text-balance" style={{fontFamily: 'Montserrat, sans-serif'}}>
              A Home by the Ocean
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-balance" style={{fontFamily: 'Caveat, cursive'}}>
              Work, Surf and Yoga
            </h3>
          </div>
          
          <div className="mt-12">
            <Button
              size="lg"
              className="text-black font-montserrat text-lg px-8 py-3 h-auto cta-boost cta-swipe cta-swipe--to-white"
              style={{ backgroundColor: '#50bbb7' }}
              onClick={() => scrollToSection('stats')}
            >
              Learn More
            </Button>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-lagos-aquamarine/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <CountUp 
                end={145} 
                duration={2500}
                className="text-4xl font-bold text-lagos-blue-green font-montserrat"
              />
              <div className="font-nunito text-gray-600">souls from</div>
            </div>
            <div className="space-y-2">
              <CountUp 
                end={26} 
                duration={2200}
                className="text-4xl font-bold text-lagos-blue-green font-montserrat"
              />
              <div className="font-nunito text-gray-600">nationalities forming</div>
            </div>
            <div className="space-y-2">
              <CountUp 
                end={1} 
                duration={1800}
                className="text-4xl font-bold text-lagos-blue-green font-montserrat"
              />
              <div className="font-nunito text-gray-600">community</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes October Special */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">October Yoga Colive Experience</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto text-balance">
              Mindful living with daily yoga, surf, and entrepreneurial connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Daily Yoga Sessions</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Daily yoga sessions by the pool
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Surf & Beach Access</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                10-minute walk to beaches
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Curated Community</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Curated entrepreneurial community
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Laptop className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Remote Work Ready</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Fast WiFi and coworking spaces
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Healthy Living</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Equipped kitchens and wellness focus
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palmtree className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Sunny Weather</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                300+ sunny days in Lagos, Portugal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Private Room */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-6">Your Private Space</h2>
              <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
                Private rooms with queen bed, work desk, and private bathroom.
              </p>


              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Bath className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                  <div className="font-montserrat font-semibold text-sm">Private Bathroom</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Bed className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                  <div className="font-montserrat font-semibold text-sm">Queen Bed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Laptop className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                  <div className="font-montserrat font-semibold text-sm">Work Desk</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {[
                  "Air conditioning & heating",
                  "Premium bed linens included",
                  "Weekly cleaning service",
                  "Hair dryer & towels",
                  "Flatscreen TV",
                  "Natural daylight"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center font-nunito text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <img
                src="/luxury-ocean-view-bedroom-with-balcony-2.jpg"
                alt="Private room at Noma Village"
                className="w-full h-96 object-cover object-left md:object-center rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black"
              onClick={() => handleFormClick('private-space')}
            >
              Secure Your Spot Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-[#E879B9] hover:bg-[#E879B9]/90 text-white border-[#E879B9] hover:border-[#E879B9]/90 font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black"
              onClick={() => handleGuideClick('hero')}
            >
              Get the Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Community Spaces */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">Live, Work & Connect</h2>
            <p className="font-nunito text-xl text-gray-600">
              Shared spaces for work, relaxation, and community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">2 Coworking Spaces</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">2 Full Kitchens</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Waves className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">2 Swimming Pools</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Coffee className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">Balcony Seaview</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">Yoga & Meditation</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shirt className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">Laundry</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wifi className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">500 Mbps WiFi</h3>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-base font-semibold">10min to Beach</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">Life at Noma Village</h2>
            <p className="font-nunito text-xl text-gray-600">
              Home away from home in Lagos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <img
                src="/images/community2.jpg"
                alt="Coworking space"
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
                alt="Pool area"
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
                alt="Lagos coastline"
                className="w-full h-64 object-cover object-[50%_70%] shadow-md rounded-lg"
              />
              <img
                src="/images/bedroom.jpg"
                alt="Private room"
                className="w-full h-48 object-cover shadow-md rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="email-signup" className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-5xl font-bold text-white mb-4">Get the Guide</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Get updates on community events, new amenities, and exclusive member benefits at Noma Village
          </p>

          <EmailSignupForm 
            source="landing-a-newsletter"
            showNames={true}
            className="max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Incredible community and unbeatable Lagos location!"
                </p>
                <div className="flex items-center">
                  <img src="/young-woman-smiling.webp" alt="Fabienne" className="w-12 h-12 mr-4 rounded-full object-cover" />
                  <div>
                    <div className="font-montserrat font-semibold">Fabienne</div>
                    <div className="font-nunito text-sm text-gray-500">Coach, Berlin</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Perfect work-life balance with amazing Portuguese coastal lifestyle."
                </p>
                <div className="flex items-center">
                  <img src="/young-bearded-man-headshot.webp" alt="Bart" className="w-12 h-12 mr-4 rounded-full object-cover" />
                  <div>
                    <div className="font-montserrat font-semibold">Bart</div>
                    <div className="font-nunito text-sm text-gray-500">Social Engineer, Amsterdam</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Invaluable community and networking for business growth."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-headshot-of-young-woman-with-curly-ha.webp"
                    alt="Kiki"
                    className="w-12 h-12 mr-4 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-montserrat font-semibold">Kiki</div>
                    <div className="font-nunito text-sm text-gray-500">Copywriter, Holland</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Noma Village */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">Why Choose Noma Village?</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A vibrant community of entrepreneurial people seeking connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-lagos-pink" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Entrepreneurial Community</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">Authentic, meaningful connections</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-lagos-blue-green" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Authentic Experience</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">Portuguese family-owned, genuine cultural immersion</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-amber/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palmtree className="h-8 w-8 text-lagos-amber" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Perfect Location</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">10 minutes to beaches, 300+ sunny days</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-lagos-aquamarine" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Magic & Synchronicity</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">Magic happens when like-minded people connect</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-5xl font-bold text-white mb-4">Join October Yoga + Surf Colive</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Transform how you live, work, and connect in Lagos, Portugal
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black"
              onClick={() => handleFormClick('final_cta')}
            >
              Secure Your Spot Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-[#E879B9] hover:bg-[#E879B9]/90 text-white border-[#E879B9] hover:border-[#E879B9]/90 font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black"
              onClick={() => handleGuideClick('final_cta')}
            >
              Get the Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Fillout Script */}
      <Script 
        src="https://server.fillout.com/embed/v1/" 
        strategy="afterInteractive"
      />
      
      {/* Plerdy A/B Testing Script */}
      <Script id="plerdy-ab-testing" strategy="afterInteractive">
        {`var _suid=65205;`}
      </Script>
      <Script 
        src="https://a.plerdy.com/public/js/click/plerdy_ab-min.js?v=2fbcfb7" 
        strategy="afterInteractive"
      />
      
      <GuideModal 
        isOpen={isGuideModalOpen} 
        onClose={() => setIsGuideModalOpen(false)} 
      />
      
      <FilloutSliderPopup
        isOpen={isFormPopupOpen}
        onClose={() => setIsFormPopupOpen(false)}
        formUrl="https://forms.fillout.com/t/aKuWaUwvaVus"
      />
    </div>
  )
}
