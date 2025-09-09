"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, CheckCircle, Users, Utensils, Wifi, Waves, Coffee, Heart, Globe, MessageCircle, Bath, Laptop, Bed, AirVent, Shirt, Zap, Monitor, MapPin, Shield, Palmtree } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { CountUp } from "@/components/count-up"
import { trackEvent } from "@/components/GoogleAnalytics"

export default function OctoberLandingPage() {
  const handleFormClick = (location: string) => {
    trackEvent('cta_click', {
      button_text: 'Secure Your Spot Now',
      page: 'october',
      location: location,
      form_type: 'application'
    })
  }

  const handleCalendlyClick = (location: string) => {
    trackEvent('calendly_click', {
      button_text: 'Book a Call',
      page: 'october',
      location: location
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - October Yoga Colive */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/yoga.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <Badge className="bg-lagos-pink text-white mb-6 text-lg px-4 py-2">
            October 2024 • Only 5 Spots Left
          </Badge>
          <h1 className="font-montserrat text-5xl md:text-8xl font-bold mb-6 text-balance">
            Yoga + Surf Colive in Lagos
          </h1>
          <p className="font-nunito text-xl md:text-2xl mb-8 text-balance max-w-4xl mx-auto leading-relaxed">
            Combine daily yoga, surf, and mindful living with everything you need to work remotely: fast WiFi, inspiring spaces, and like-minded entrepreneurial people in sunny Portugal.
          </p>
          
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-baseline mb-2">
              <span className="text-4xl md:text-6xl font-bold text-white font-montserrat">€790</span>
              <span className="font-nunito text-white/90 ml-3 text-xl">/2 weeks</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl md:text-4xl font-bold text-white font-montserrat">€1480</span>
              <span className="font-nunito text-white/90 ml-3 text-lg">/month</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-xl px-12 py-4 h-auto"
              data-fillout-id="aKuWaUwvaVus"
              data-fillout-embed-type="slider"
              data-fillout-slider-direction="right"
              data-fillout-inherit-parameters
              data-fillout-popup-size="medium"
              onClick={() => handleFormClick('hero')}
            >
              Secure Your Spot Now
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 font-montserrat text-xl px-12 py-4 h-auto bg-transparent"
            >
              <a 
                href="https://calendly.com/nomavillagelagos/short-intro" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleCalendlyClick('hero')}
              >
                Book a Call
              </a>
            </Button>
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

      {/* What Makes October Special */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">October Yoga Colive Experience</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto text-balance">
              A month dedicated to mindful living, daily yoga practice, surf sessions, and deep connections with like-minded entrepreneurial people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Daily Yoga Sessions</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Morning and evening yoga by the pool with certified instructors
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Surf & Beach Access</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                10-minute walk to world-class beaches and surf spots
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Curated Community</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Hand-selected entrepreneurs and creatives aged 25-45
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Laptop className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Remote Work Ready</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                500 Mbps WiFi, dedicated coworking spaces, and ergonomic setups
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Healthy Living</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                Fully equipped kitchens, group meals, and wellness focus
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palmtree className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-4">Perfect Weather</h3>
              <p className="font-nunito text-gray-600 leading-relaxed">
                300+ sunny days per year in beautiful Lagos, Portugal
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
              <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-6">Your Private Sanctuary</h2>
              <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
                Each room is your own private oasis designed for comfort and productivity. Wake up refreshed in your queen-size bed, work at your dedicated desk, and unwind in your private bathroom.
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
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Spaces */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">Live, Work & Connect</h2>
            <p className="font-nunito text-xl text-gray-600">
              Beautiful shared spaces designed for productivity, relaxation, and community building
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
              Your new home away from home in Lagos, Portugal
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
              We're more than just a coliving space. We're a vibrant community of like-minded entrepreneurial people seeking connection and purpose.
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-5xl font-bold text-white mb-4">Only 5 Spots Left for October</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Join our October Yoga + Surf Colive and transform how you live, work, and connect in beautiful Lagos, Portugal
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-xl px-12 py-4 h-auto"
              data-fillout-id="aKuWaUwvaVus"
              data-fillout-embed-type="slider"
              data-fillout-slider-direction="right"
              data-fillout-inherit-parameters
              data-fillout-popup-size="medium"
              onClick={() => handleFormClick('final_cta')}
            >
              Secure Your Spot Now
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-lagos-blue-green font-montserrat text-xl px-12 py-4 h-auto bg-transparent"
            >
              <a 
                href="https://calendly.com/nomavillagelagos/short-intro" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleCalendlyClick('final_cta')}
              >
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Fillout Script */}
      <Script 
        src="https://server.fillout.com/embed/v1/" 
        strategy="afterInteractive"
      />
    </div>
  )
}
