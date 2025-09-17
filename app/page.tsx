'use client'

import { useState, useEffect } from 'react'
import EmailSignupForm from '@/components/email-signup-form'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Quote, MapPin } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { usePathname, useSearchParams } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import posthog from '@/lib/posthog'
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { CountUp } from "@/components/count-up"
import FilloutSliderPopup from "@/components/fillout-slider-popup"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import FAQSection from "@/components/FAQ"
import MapWithZoom from "@/components/MapWithZoom"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import { useInView } from "@/hooks/use-in-view"
import PricingSection from "@/components/PricingSection"

export default function HomePage() {
  // Using SmoothScrollLink for controlled, smooth in-page scrolling
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [reviewsSummary, setReviewsSummary] = useState<{ rating?: number; user_ratings_total?: number; url?: string } | null>(null)
  const { ref: blackHeroRef, inView: blackHeroInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const handleJoinUsClick = () => {
    posthog.capture('cta_clicked', {
      location: 'hero',
      button_text: 'Join Us',
      page_url: window.location.pathname
    })
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  // Removed auto-open logic for Fillout slider; popup opens only via CTA

  useEffect(() => {
    // Fetch summary for Google reviews (rating, total, url)
    fetch('/api/google-reviews', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then((data) => {
        if (data) setReviewsSummary({ rating: data.rating, user_ratings_total: data.user_ratings_total, url: data.url })
      })
      .catch(() => {})
  }, [])

  // Local component for proximity highlights (emoji-based)
  function LocationHighlights() {
    const items = [
      { icon: '🏖️', title: '15-minute walk to Praia Porto de Mós', desc: 'One of the Algarve’s most iconic beaches' },
      { icon: '🌊', title: 'Surrounded by world-famous golden cliffs', desc: 'Dramatic coastline right on your doorstep' },
      { icon: '🏛️', title: '15-minute walk to Lagos historic center', desc: 'Cafés, culture, and charming streets' },
      { icon: '✈️', title: '1 hour from Faro Airport', desc: 'Easy access for national and international flights' },
      { icon: '🏄‍♀️', title: 'Surf breaks within walking distance', desc: 'Multiple spots for all levels nearby' },
      { icon: '🍽️', title: 'Restaurants & nightlife next door', desc: 'Vibrant food scene and evening energy' },
    ]

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* VideoObject JSON-LD Schema */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "NomaVillage Coliving Experience",
                "description": "Experience the beauty of coliving by the ocean at NomaVillage Lagos",
                "thumbnailUrl": "https://www.nomavillagelagos.com/images/cliff2.jpg",
                "uploadDate": "2024-01-01T08:00:00+08:00",
                "duration": "PT1M33S",
                "contentUrl": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1",
                "embedUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID_1",
                "interactionStatistic": {
                  "@type": "InteractionCounter",
                  "interactionType": { "@type": "WatchAction" },
                  "userInteractionCount": 1200
                },
                "regionsAllowed": "PT,ES,FR,DE,GB,US,CA,AU,NZ"
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Life at NomaVillage Lagos",
                "description": "A day in the life at our coliving space in Lagos, Portugal",
                "thumbnailUrl": "https://www.nomavillagelagos.com/images/hero.jpg",
                "uploadDate": "2024-01-15T10:30:00+08:00",
                "duration": "PT2M15S",
                "contentUrl": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_2",
                "embedUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID_2"
              }
            ])
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/cliff2.jpg"
            alt="Cliff view at NomaVillage Lagos"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
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
          <h2 className="text-4xl md:text-6xl font-normal mb-6 text-balance" style={{ fontFamily: 'Montserrat', fontWeight: 200, letterSpacing: '-3px'}}>
            A Home by the Ocean
          </h2>
          <h3 className="text-4xl md:text-6xl font-normal text-balance mb-8" style={{fontFamily: 'Caveat, cursive'}}>
            Work, Surf and Yoga
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleJoinUsClick}
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-8 py-3"
            >
              Join Our Community
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 font-montserrat text-lg px-8 py-3 bg-transparent"
            >
              <SmoothScrollLink to="#coming-up" duration={1500} offset={80} className="smooth-scroll">
                Learn More
              </SmoothScrollLink>
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

      {/* Coming Up: October Yoga + Surf Colive */}
      <section id="coming-up" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">Coming Up</h2>
          <h3 className="font-montserrat text-2xl md:text-3xl text-gray-900 mb-4">Yoga + Surf Colive in October: Work Remotely, Live Fully</h3>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            Combine daily yoga, surf, and mindful living with everything you need to work remotely: fast WiFi, inspiring spaces, and like-minded people.
          </p>
          <div className="font-montserrat text-gray-900 mb-2">from <span className="font-bold">790€</span></div>
          <div className="font-montserrat text-lagos-pink mb-8">Only 5 spots left (of 13)</div>
          <div className="flex justify-center mb-8">
            <img
              src="/images/yoga.jpg"
              alt="Yoga by the pool"
              className="w-full max-w-xl shadow-lg object-cover object-[50%_70%] aspect-video"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat"
              onClick={handleJoinUsClick}
            >
              Join Us
            </Button>
            <SmoothScrollLink to="#stay-connected" duration={1500} offset={80} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 font-montserrat bg-[#e151af] hover:bg-[#e151af]/90 text-white cta-pop">
              Get the Guide
            </SmoothScrollLink>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-lagos-aquamarine/20">
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

      {/* Video Preview: Take a Look Inside */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4">Take a Look Inside</h2>
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

      {/* Location Section: Your Transformation Base */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-lagos-blue-green">
              <MapPin className="h-5 w-5" />
              <span className="font-montserrat text-sm tracking-wide">Your Transformation Base</span>
            </div>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mt-2">Noma Village Lagos</h2>
            <p className="font-nunito text-gray-600 mt-2">Nature • Culture • Convenience — the golden triangle of Praia da Dona Ana, dramatic cliffs, and Lagos historic center</p>
          </div>
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
          <LocationHighlights />
        </div>
      </section>

      <section id="learn-more" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-6">Where Magic Meets Vibrant Living</h2>
              <div className="space-y-6 font-nunito text-lg text-gray-700 leading-relaxed">
                <p className="font-semibold text-xl">
                  Bored of living just by yourself? Tired of working in the same old environment?
                </p>
                <p>
                  Transform the way you live and work with the Coliving you crave and the Community you want. Welcome to our wonderful oasis, a special kind of Coliving & Coworking Space in sunny Lagos, Portugal.
                </p>


              </div>
            </div>
            <div className="space-y-6">
              <img
                src="/images/noma1.webp"
                alt="Noma Village exterior in Lagos, Portugal"
                className="w-full h-64 object-cover shadow-lg"
              />
              <img
                src="/images/beach.jpg"
                alt="Rooftop terrace with Lagos coastline view"
                className="w-full h-48 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Discover the magic that happens when like-minded entrepreneurial people come together in a vibrant Portuguese coastal setting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/images/room3.jpg"
                alt="Private Rooms"
                className="w-full h-64 object-cover shadow-md mb-4"
              />
              <h3 className="font-montserrat text-xl font-semibold mb-4">Private Rooms</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                All with private bathroom, double bed, desk, air con & heating
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/cowork.jpg"
                alt="Coworking Spaces"
                className="w-full h-64 object-cover shadow-md mb-4"
              />
              <h3 className="font-montserrat text-xl font-semibold mb-4">Coworking Spaces</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                One in our main house, and another one opposite of the pool
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/community.jpg"
                alt="Coliving Community"
                className="w-full h-64 object-cover shadow-md mb-4"
              />
              <h3 className="font-montserrat text-xl font-semibold mb-4">Coliving Community</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Hand-selected, curated Community of like-minded people
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/pool.jpg"
                alt="Outdoor Areas"
                className="w-full h-64 object-cover shadow-md mb-4"
              />
              <h3 className="font-montserrat text-xl font-semibold mb-4">Outdoor Areas</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Work or relax next to the pools in our cozy, shaded spots
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/house2.webp"
                alt="Feeling Home"
                className="w-full h-64 object-cover shadow-md mb-4"
              />
              <h3 className="font-montserrat text-xl font-semibold mb-4">Feeling Home</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Colourful houses we call home right in sunny Lagos, Portugal
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/beach2.jpg"
                alt="Fantastic Beaches"
                className="w-full h-64 object-cover shadow-md mb-4"
              />
              <h3 className="font-montserrat text-xl font-semibold mb-4">Fantastic Beaches</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                10min walk to the closest, and dozens more waiting for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Duplicate buttons above Life at Noma Village */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat"
              onClick={handleJoinUsClick}
            >
              Join Us
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#e362b7] hover:bg-[#e362b7]/90 text-white font-montserrat"
            >
              <SmoothScrollLink to="#stay-connected" duration={1500} offset={80}>
                Get the Guide
              </SmoothScrollLink>
            </Button>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">Life at Noma Village</h2>
            <p className="font-nunito text-xl text-gray-600">
              Discover your new home away from home in Lagos, Portugal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <img
                src="/images/community2.jpg"
                alt="Coworking space"
                className="w-full h-64 object-cover shadow-md"
              />
              <img
                src="/images/community3.jpg"
                alt="Coliving room"
                className="w-full h-48 object-cover object-[50%_90%] shadow-md"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/images/community5.jpg"
                alt="Rooftop terrace"
                className="w-full h-48 object-cover shadow-md"
              />
              <img
                src="/images/community6.jpg"
                alt="Community kitchen"
                className="w-full h-64 object-cover shadow-md"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/images/cliff.jpg"
                alt="Beach working"
                className="w-full h-64 object-cover object-[50%_70%] shadow-md"
              />
              <img
                src="/images/bedroom.jpg"
                alt="Yoga session"
                className="w-full h-48 object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Noma Village transformed my remote work experience. The community is incredible and the location in
                  Lagos is absolutely unbeatable!"
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
                  "Perfect balance of work and Portuguese coastal life. I've never been more productive while enjoying
                  such an amazing lifestyle and authentic cultural experience."
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
                  "The curated community and networking opportunities at Noma Village have been invaluable for my
                  business growth and personal development."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-headshot-of-young-woman-with-curly-ha.webp"
                    alt="Ana"
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

      {/* Google Reviews: What Guests Say on Google */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-3">What Guests Say on Google</h2>
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

      {/* FAQ Section */}
      <FAQSection showViewAllLink={true} />

      {/* Guest Story (Jeremy) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4">Guest Story</h2>
            <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">Listen to Jeremy sharing their experience at Noma Village</p>
          </div>

          <div className="relative w-full md:w-2/3 mx-auto rounded-xl shadow-xl overflow-hidden" style={{paddingTop: '56.25%'}}>
            <iframe
              src="https://www.youtube.com/embed/0pUJWrS4Kdw"
              title="Noma Village Testimonial - Jeremy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Pricing & Value Section */}
      <PricingSection onJoinClick={handleJoinUsClick} />

      {/* Newsletter Signup */}
      <section id="stay-connected" className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-5xl font-bold text-white mb-4">Get the Guide</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Get updates on community events, new amenities, and exclusive member benefits at Noma Village
          </p>

          <EmailSignupForm 
            source="homepage-newsletter"
            showNames={true}
            className="max-w-md mx-auto"
          />
        </div>
      </section>

      <Footer />
      
      {/* Fillout Slider Popup */}
      <FilloutSliderPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        formUrl="https://forms.fillout.com/t/aKuWaUwvaVus"
        onFormSubmit={() => {
          posthog.capture('form_submitted', {
            form_name: 'Join Us Form',
            form_location: 'popup',
            page_url: window.location.pathname
          })
        }}
      />

      {/* Floating WhatsApp Direct Button (homepage) */}
      <WhatsAppDirectButton
        source="homepage"
        messagePreset="october_interest"
      />
    </div>
  )
}