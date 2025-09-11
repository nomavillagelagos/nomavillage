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
import { useEffect, useState } from "react"
import GuideModal from "@/components/guide-modal"
import EmailSignupForm from "@/components/email-signup-form"
import FilloutSliderPopup from "@/components/fillout-slider-popup"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"

export default function LandingPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()
  const [reviewsSummary, setReviewsSummary] = useState<{ rating?: number; user_ratings_total?: number; url?: string } | null>(null)

  useEffect(() => {
    // Fetch summary for Google reviews (rating, total, url)
    fetch('/api/google-reviews', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then((data) => {
        if (data) setReviewsSummary({ rating: data.rating, user_ratings_total: data.user_ratings_total, url: data.url })
      })
      .catch(() => {})
  }, [])
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
              <span style={{
                position: 'relative', 
                color: 'white', 
                fontSize: '1.4em', 
                fontFamily: 'Caveat, cursive'
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1
                }}>This</span>
                <span style={{
                  position: 'absolute',
                  left: '-10%',
                  right: '-10%',
                  bottom: '-4%',
                  height: '50px',
                  width: '120%',
                  backgroundImage: 'url(/brush-underline.webp)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center bottom',
                  transform: 'rotate(-2deg)',
                  zIndex: -1,
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                  opacity: 1
                }}></span>
              </span>&nbsp;<span style={{fontSize: '24px', fontFamily: 'Montserrat, sans-serif'}}>is </span><span style={{fontWeight: '300', fontFamily: 'Montserrat, sans-serif'}}>Coliving</span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-normal mb-6 text-balance" style={{fontFamily: 'Caveat, cursive'}}>
              A Home by the Ocean
            </h2>
            <h3 className="text-4xl md:text-6xl font-normal text-balance" style={{fontFamily: 'Caveat, cursive'}}>
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

      {/* Full-width Black Hero Band (below hero) */}
      <section
        className="black-hero-section animate-slide-in"
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          position: 'relative',
          overflowX: 'hidden',
          padding: '60px 0',
          marginTop: 0,
          marginBottom: 0,
          border: 'none',
          outline: 'none'
        }}
      >
        <div className="black-hero-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 30px', textAlign: 'center' }}>
          <h2 className="black-hero-title" style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '-0.5px', lineHeight: 1.2, color: '#ffffff', margin: 0, padding: 0 }}>
            Join us for 2+ weeks — private Room, Shared Coworking, Yoga, and Surf
          </h2>
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
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>October Yoga Colive Experience</h2>
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

      {/* Video Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Take a Look Inside</h2>
            <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">
              A short video preview of life at Noma Village
            </p>
          </div>

          <div className="relative w-full md:w-1/2 mx-auto rounded-xl shadow-xl overflow-hidden" style={{paddingTop: '56.25%'}}>
            <iframe
              src="https://www.youtube.com/embed/7hPyCSk-6pM"
              title="Noma Village Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Life at Noma Village</h2>
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

      {/* Your Private Room */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-6" style={{fontFamily: 'Caveat, cursive'}}>Your Private Space</h2>
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
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Live, Work & Connect</h2>
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

      {/* Newsletter Signup */}
      <section id="email-signup" className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-normal text-white mb-4" style={{fontFamily: 'Caveat, cursive'}}>Get the Guide</h2>
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
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>What Our Community Says</h2>
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

      {/* Google Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-3" style={{fontFamily: 'Caveat, cursive'}}>What Guests Say on Google</h2>
            <div className="flex items-center justify-center gap-3 font-nunito text-gray-700">
              <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="h-6 w-6" />
              <span className="font-montserrat font-semibold">Noma Village Lagos</span>
              <span>•</span>
              <span className="font-montserrat">{reviewsSummary?.rating?.toFixed ? reviewsSummary.rating.toFixed(1) : '4.8'}</span>
              <span className="text-yellow-500">★★★★★</span>
              <a
                href={reviewsSummary?.url || "https://maps.google.com/?cid=12085466010589542175"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline text-lagos-blue-green"
              >
                {reviewsSummary?.user_ratings_total ? `${reviewsSummary.user_ratings_total} Google Reviews` : '18 Google Reviews'}
              </a>
            </div>
          </div>

          <GoogleReviewsCarousel />

          <div className="text-center mt-10">
            <a
              href="https://maps.google.com/?cid=12085466010589542175"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-lagos-blue-green text-black font-montserrat font-semibold shadow cta-boost"
            >
              Read all Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Noma Village */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Why Choose Noma Village?</h2>
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

      {/* Video Testimonial */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Guest Story</h2>
            <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">Listen to a Glenn sharing their experience at Noma Village</p>
          </div>

          <div className="relative w-full md:w-2/3 mx-auto rounded-xl shadow-xl overflow-hidden" style={{paddingTop: '56.25%'}}>
            <iframe
              src="https://www.youtube.com/embed/WnkUn11HMh8"
              title="Noma Village Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-normal text-white mb-4" style={{fontFamily: 'Caveat, cursive'}}>Join October Yoga + Surf Colive</h2>
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
