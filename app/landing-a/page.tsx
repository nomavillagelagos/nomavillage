"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PricingSection from "@/components/PricingSection";
import { Star, Quote, CheckCircle, Users, Utensils, Wifi, Waves, Coffee, Heart, Globe, MessageCircle, Bath, Laptop, Bed, AirVent, Shirt, Zap, Monitor, MapPin, Shield, Palmtree } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import Image from "next/image"
import { CountUp } from "@/components/count-up"
import MapWithZoom from "@/components/MapWithZoom"
import { trackEvent } from "@/components/GoogleAnalytics"
import { useEffect, useState } from "react"
import GuideModal from "@/components/guide-modal"
import EmailSignupForm from "@/components/email-signup-form"
import FilloutSliderPopup from "@/components/fillout-slider-popup"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import { useInView } from "@/hooks/use-in-view"
import posthog from "@/lib/posthog"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Proximity cards with in-view animation
function LocationHighlights() {
  const items = [
    { icon: '🏖️', title: '15-minute walk to Praia Porto de Mós', desc: 'One of the Algarve’s most iconic beaches' },
    { icon: '🌊', title: 'Surrounded by world-famous golden cliffs', desc: 'Dramatic coastline right on your doorstep' },
    { icon: '🏛️', title: '15-minute walk to Lagos historic center', desc: 'Cafés, culture, and charming streets' },
    { icon: '✈️', title: '1 hour from Faro Airport', desc: 'Easy access for national and international flights' },
    { icon: '🏄‍♀️', title: 'Surf breaks within walking distance', desc: 'Multiple spots for all levels nearby' },
    { icon: '🍽️', title: 'Restaurants & nightlife next door', desc: 'Vibrant food scene and evening energy' },
  ]

  // simple IntersectionObserver for reveal-on-scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.loc-card')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', 'translate-y-0')
            e.target.classList.remove('opacity-0', 'translate-y-4')
          }
        })
      },
      { threshold: 0.2 }
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <div
          key={i}
          className="loc-card opacity-0 translate-y-4 transition-all duration-500 ease-out border rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-full bg-lagos-aquamarine/20 flex items-center justify-center text-lg">
              <span aria-hidden>{it.icon}</span>
            </div>
            <h4 className="font-montserrat font-semibold text-gray-900 text-base">{it.title}</h4>
          </div>
          <p className="font-nunito text-sm text-gray-600">{it.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  const handleJoinClick = () => {
    // Open the Fillout slider popup from the pricing section buttons
    setIsFormPopupOpen(true)
    // Optional: add analytics here if desired
    try { trackEvent('apply_click', { page: 'landing-a', location: 'pricing' }) } catch {}
  };
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()
  const [reviewsSummary, setReviewsSummary] = useState<{ rating?: number; user_ratings_total?: number; url?: string } | null>(null)
  const { ref: blackHeroRef, inView: blackHeroInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

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
    
    // PostHog: record primary application CTA button click
    posthog.capture('apply_click', {
      page: 'landing-a',
      location,
      form_type: 'application',
      experiment_name: 'landing_page_test',
      variant: 'A'
    })

    setIsFormPopupOpen(true)
  }

  const handleGuideClick = (location: string) => {
    trackEvent('guide_click', {
      button_text: 'Get the Guide',
      page: 'landing-a',
      location: location
    })
    
    // PostHog: record guide button click
    posthog.capture('guide_click', {
      page: 'landing-a',
      location
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
      {/* Hero Section - Join our Yoga Colive */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/fireplace.jpeg')",
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
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 text-balance leading-tight whitespace-normal md:whitespace-nowrap break-words md:break-normal inline-block mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.04em' }}>
              <span style={{fontWeight: 200, fontFamily: 'Montserrat, sans-serif'}}>Feeling </span>
              <span style={{
                position: 'relative', 
                color: 'white', 
                fontSize: '1.2em', 
                fontFamily: 'Caveat, cursive'
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1
                }}>Home</span>
                <span className="hero-brush-underline" style={{
                  position: 'absolute',
                  left: '-10%',
                  right: '-10%',
                  bottom: '-4%',
                  height: 'var(--brush-h, 40px)',
                  width: 'var(--brush-w, 120%)',
                  backgroundImage: 'url(/brush-underline.webp)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center bottom',
                  transform: 'rotate(-2deg)',
                  zIndex: -1,
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.95
                }}></span>
              </span>&nbsp;<span style={{fontSize: '34px',fontWeight: '300', fontFamily: 'Montserrat, sans-serif', marginRight: '0.35em'}}>on your </span><span style={{fontWeight: '200', fontFamily: 'Montserrat, sans-serif'}}>Journey</span>
            </h1>
            {/* <h2 className="text-4xl md:text-6xl font-normal mb-6 text-balance" style={{ fontFamily: 'Montserrat',
    fontWeight: 200,
    letterSpacing: '-3px'}}>
              Coliving and Working by the Ocean
            </h2> */}
            <h3 className="text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-normal text-balance inline-block mx-auto" style={{ fontFamily: 'Caveat, cursive', letterSpacing: '-0.01em' }}>
              Coliving and Working by the Ocean
            </h3>
          </div>
          
          <div className="mt-12">
            <Button
              size="lg"
              className="text-black font-montserrat text-lg px-8 py-3 h-auto cta-boost cta-swipe cta-swipe--to-white"
              style={{ backgroundColor: '#50bbb7' }}
              onClick={() => { 
                // PostHog: record learn more button click in hero
                posthog.capture('learn_more_click', { page: 'landing-a', location: 'hero' })
                scrollToSection('stats') 
              }}
            >
              Learn More
            </Button>
            <Button
              size="lg"
              className="ml-4 bg-[#ea86c0] text-white font-montserrat text-lg px-8 py-3 h-auto relative overflow-hidden group transition-colors"
              onClick={() => {
                try { posthog.capture('see_pricing_click', { page: 'landing-a', location: 'hero' }) } catch {}
                scrollToSection('pricing')
              }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">See Pricing</span>
              <span className="pointer-events-none absolute inset-0 -z-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:-translate-x-full group-hover:before:translate-x-0 before:transition-transform before:duration-300 before:ease-out"></span>
            </Button>
          </div>

        </div>
      </section>

      {/* Full-width Black Hero Band (below hero) */}
      <section
        ref={blackHeroRef}
        className="black-hero-section"
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
          outline: 'none',
          opacity: blackHeroInView ? 1 : 0,
          transform: blackHeroInView ? 'translateX(0)' : 'translateX(-100px)',
          transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1)'
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

      {/* What Makes Our Experience Special */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Join our Yoga Colive Experience</h2>
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
          <div className="flex flex-col items-center gap-12">
            <div className="text-center">
              <Button
                size="lg"
                className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black"
                onClick={() => handleFormClick('video-top')}
              >
                Book a Call now
              </Button>
            </div>
            <div className="text-center">
              <h2 className="font-caveat text-5xl font-normal text-gray-900" style={{fontFamily: 'Caveat, cursive'}}>Take a Look Inside</h2>
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
            <div className="text-center">
              <Button
                size="lg"
                className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black"
                onClick={() => handleFormClick('video-bottom')}
              >
                Book a Call now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-lagos-blue-green">
              <MapPin className="h-5 w-5" />
              <span className="font-montserrat text-sm tracking-wide">Your Transformation Base</span>
            </div>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mt-2">Noma Village Lagos</h2>
            <p className="font-nunito text-gray-600 mt-2">Nature • Culture • Convenience — the golden triangle of Praia da Dona Ana, dramatic cliffs, and Lagos historic center</p>
          </div>

          {/* Map (animated zoom on visibility) */}
          <div className="mb-10">
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <MapWithZoom
                className="w-full rounded-2xl"
                style={{ height: '360px' }}
                initialZoom={3}
                targetZoom={12}
                durationMs={2500}
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-md px-3 py-1 text-xs font-montserrat shadow">
                37.0925267, -8.6828956 • Lagos, Portugal
              </div>
            </div>
          </div>

          {/* Proximity Highlights */}
          <LocationHighlights />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
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
              <div className="rounded-2xl shadow-xl bg-white p-2">
                <Tabs defaultValue="room" className="w-full">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{paddingTop: '56.25%'}}>
                    <TabsContent value="room" className="absolute inset-0">
                      <img src="/images/room4.jpg" alt="Room" className="w-full h-full object-cover rounded-xl" />
                    </TabsContent>
                    <TabsContent value="bath" className="absolute inset-0">
                      <img src="/images/private-bathroom-with-modern-fixtures.jpg" alt="Bathroom" className="w-full h-full object-cover rounded-xl" />
                    </TabsContent>
                    <TabsContent value="view" className="absolute inset-0">
                      <img src="/images/balcony2.jpg" alt="View from room" className="w-full h-full object-cover rounded-xl" />
                    </TabsContent>
                  </div>

                  <div className="mt-2 flex justify-center">
                    <TabsList className="bg-gray-100">
                      <TabsTrigger value="room">Room</TabsTrigger>
                      <TabsTrigger value="bath">Bathroom</TabsTrigger>
                      <TabsTrigger value="view">View</TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>
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

      {/* Pricing & Value Section */}
      <PricingSection onJoinClick={handleJoinClick} />

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
          <h2 className="font-caveat text-5xl font-normal text-white mb-4" style={{fontFamily: 'Caveat, cursive'}}>Join our Yoga + Surf Colive</h2>
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
      
      <GuideModal 
        isOpen={isGuideModalOpen} 
        onClose={() => setIsGuideModalOpen(false)} 
      />
      
      <FilloutSliderPopup
        isOpen={isFormPopupOpen}
        onClose={() => setIsFormPopupOpen(false)}
        formUrl="https://forms.fillout.com/t/aKuWaUwvaVus"
      />

      {/* Floating WhatsApp Direct Button */}
      <WhatsAppDirectButton
        messagePreset="october_interest"
        source="landing-a"
      />
    </div>
  )
}
