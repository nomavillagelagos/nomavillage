'use client'

import { useState, useEffect } from 'react'
import EmailSignupForm from '@/components/email-signup-form'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Quote } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from '@/lib/posthog'
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { CountUp } from "@/components/count-up"
import FilloutSliderPopup from "@/components/fillout-slider-popup"

export default function HomePage() {
  // Using SmoothScrollLink for controlled, smooth in-page scrolling
  const [isPopupOpen, setIsPopupOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/cliff2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-montserrat text-6xl md:text-8xl font-medium mb-6 text-balance">This is Coliving</h1>
          <p className="font-nunitor text-xl md:text-2xl mb-8 text-balance max-w-3xl mx-auto leading-relaxed">
            Experience with a curated community of like-minded entrepreneurial people. Connect, explore and thrive in a colorful space you can call home in sunny Lagos, Portugal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-8 py-3"
            >
              <Link href="/join">Join Our Community</Link>
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
    </div>
  )
}