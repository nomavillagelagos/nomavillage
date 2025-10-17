import EmailSignupForm from '@/components/email-signup-form'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, MapPin } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import Head from 'next/head'
import Image from 'next/image'
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { CountUp } from "@/components/count-up"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import FAQSection from "@/components/FAQ"
import MapWithZoom from "@/components/MapWithZoom"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import { CTAButton, GoogleReviewsWrapper, LocationHighlights, PricingSectionWrapper, TrustBar } from "@/components/client"
import BlackHeroSection from "@/components/BlackHeroSection"
import HeroButtons from "@/components/HeroButtons"

export default function HomePage() {
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
                "name": "Noma Village Coliving Experience",
                "description": "Experience the beauty of coliving by the ocean at Noma Village Lagos, Portugal",
                "thumbnailUrl": "https://www.nomavillage.com/images/cliff2.jpg",
                "uploadDate": "2024-01-01T08:00:00+00:00",
                "duration": "PT1M33S",
                "contentUrl": "https://www.youtube.com/watch?v=7hPyCSk-6pM",
                "embedUrl": "https://www.youtube.com/embed/7hPyCSk-6pM",
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
                "name": "Guest Testimonial - Jeremy at Noma Village Lagos",
                "description": "Listen to Jeremy sharing their experience at our coliving space in Lagos, Portugal",
                "thumbnailUrl": "https://www.nomavillage.com/images/hero.jpg",
                "uploadDate": "2024-01-15T10:30:00+00:00",
                "duration": "PT2M15S",
                "contentUrl": "https://www.youtube.com/watch?v=0pUJWrS4Kdw",
                "embedUrl": "https://www.youtube.com/embed/0pUJWrS4Kdw"
              }
            ])
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/noma-background3.jpg"
            alt="Cliff view at NomaVillage Lagos"
            fill
            priority
            quality={95}
            className="object-cover object-[50%_35%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.6))' }}
          ></div>
        </div>

        <div className="relative z-10 text-center text-white mx-auto max-w-none lg:max-w-6xl px-4 pt-32 pb-16">
          {/* removed top location badge */}

          <div className="mx-auto max-w-none lg:max-w-6xl">
            <h1
              className="font-montserrat font-light text-[40px] sm:text-[48px] md:text-[56px] tracking-[-0.5px] leading-tight mb-6 md:mb-8 text-white lg:whitespace-nowrap"
              style={{ textShadow: '0 3px 10px rgba(0,0,0,0.4)' }}
            >
              <span className="text-[90%] md:text-[90%] lg:text-[90%]">
                Find a <span className="font-caveat text-6xl md:text-7xl lg:text-8xl text-white relative -top-1 md:-top-2">
                  <span className="relative z-10">Home</span>
                  <div 
                    className="absolute left-[-10%] right-[-10%] bottom-[-4%] h-[20px] w-[120%] 
                              bg-[url('/brush-underline.webp')] bg-no-repeat bg-center
                              bg-[length:100%_100%] -rotate-1 -z-10
                              brightness-0 invert opacity-100"
                  />
                </span> on your <span className="text-[120%] md:text-[120%] lg:text-[120%] relative">Journey</span>
              </span>
            </h1>

            <p
              className="font-sans text-[18px] font-normal max-w-[600px] mx-auto leading-[1.6] text-white/95 mb-6 md:mb-8"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
            >
              Coliving & Coworking Community <br></br> Live, work, and connect with like‑minded people in Portugal's most vibrant coastal community. 
            </p>

            <div className="flex items-center justify-center gap-2 mb-8 md:mb-10">
              <MapPin className="h-4 w-4 md:h-5 md:w-5" color="#ffffff" />
              <span className="font-sans text-white text-[16px] font-normal" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                Lagos, Portugal
              </span>
            </div>

            <HeroButtons />
          </div>
        </div>
      </section>

      {/* Full-width Black Hero Band (below hero) */}
      <></>

      {/* Trust & Benefits Bar */}
      <TrustBar />

      {/* Next Retreat: Yoga + Surf Experience */}
      <section id="coming-up" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/yoga.jpg"
                  alt="Yoga session by the pool at Noma Village"
                  className="w-full h-[500px] object-cover object-[50%_70%]"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-montserrat font-semibold text-lagos-pink">⭐ 4.9/5</span>
                    <span className="text-gray-600 font-nunito">Previous retreat rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-lagos-aquamarine/20 text-lagos-blue-green px-4 py-1 rounded-full text-sm font-montserrat font-semibold mb-4">
                Permanent Colive
              </div>

              <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Life is better <span className="font-caveat text-[1.5em] leading-none">Shared</span>
              </h2>

              <p className="font-nunito text-xl text-gray-700 mb-6 leading-relaxed">
                Make our permanent coliving space by the ocean your home base. We combine uninterrupted remote work with a strong focus on community, featuring daily yoga classes to start your day right.
              </p>
              
              <p className="font-nunito text-xl text-gray-700 mb-6 leading-relaxed">
                We are building meaningful connections with like-minded nomads through community events and shared living.
              </p>


              {/* Pricing & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div>
                  <div className="text-4xl font-montserrat font-bold text-gray-900">€790</div>
                  <div className="text-sm font-nunito text-gray-600">for 2 weeks • Permanently</div>
                </div>
                <CTAButton
                  size="lg"
                  location="retreat"
                  className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Reserve Your Spot
                </CTAButton>
              </div>

              <p className="text-sm font-nunito text-gray-500 italic">
                Limited to 13 participants for an intimate experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-gradient-to-br from-lagos-aquamarine/30 to-lagos-blue-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-12 text-center">
            <div className="space-y-3">
              <CountUp
                end={175}
                duration={2500}
                className="text-3xl md:text-5xl font-bold text-lagos-blue-green font-montserrat"
              />
              <div className="font-montserrat font-semibold text-gray-900 text-sm md:text-base">Guests</div>
              <div className="font-nunito text-xs md:text-sm text-gray-600">Global community of remote workers</div>
            </div>
            <div className="space-y-3">
              <CountUp
                end={28}
                duration={2200}
                className="text-3xl md:text-5xl font-bold text-lagos-blue-green font-montserrat"
              />
              <div className="font-montserrat font-semibold text-gray-900 text-sm md:text-base">Countries</div>
              <div className="font-nunito text-xs md:text-sm text-gray-600">Diverse, international atmosphere</div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl md:text-5xl font-bold text-lagos-blue-green font-montserrat">One</div>
              <div className="font-montserrat font-semibold text-gray-900 text-sm md:text-base">Community</div>
              <div className="font-nunito text-xs md:text-sm text-gray-600">United by adventure & ambition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Preview: A Day in the Life */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-700 mb-4">A Day in the Life at <span className="font-caveat text-[1.5em] leading-none">NomaVillage</span></h2>
            <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">
              Watch: Morning yoga on the terrace, focused coworking sessions, golden hour at the cliffs, and community dinners <span className="text-gray-500">(1:33)</span>
            </p>
          </div>
          <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-100" style={{paddingTop: '56.25%'}}>
            <iframe
              src="https://www.youtube.com/embed/7hPyCSk-6pM"
              title="A Day in the Life at Noma Village Lagos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      <BlackHeroSection />

      {/* Location Section */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-lagos-blue-green">
              <MapPin className="h-5 w-5" />
              <span className="font-montserrat text-sm tracking-wide uppercase">Prime Location</span>
            </div>
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mt-2">Your Base in the Algarve</h2>
            <p className="font-nunito text-lg text-gray-700 mt-2 max-w-3xl mx-auto">Perfectly positioned between golden beaches, dramatic cliffs, and Lagos historic center - the ideal setting for remote work and coastal living</p>
          </div>
          <div className="mb-10">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5">
              <MapWithZoom
                className="w-full rounded-2xl"
                style={{ height: '360px' }}
                initialZoom={3}
                targetZoom={12}
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-md px-3 py-1 text-xs font-montserrat shadow">
                37.0925267, -8.6828956 • Lagos, Portugal
              </div>
            </div>
          </div>
          <LocationHighlights />
        </div>
      </section>

      <section id="learn-more" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-6"><span className="font-caveat text-[1.5em] leading-none">Live & Work</span> <br></br> by the Ocean</h2>
              <p className="font-nunito text-xl text-gray-700 mb-8 leading-relaxed">
                Imagine starting your day with sunrise yoga, tackling your most important work with ocean views, and ending with sunset at the cliffs - all while building lasting connections with talented remote workers from around the world.
              </p>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lagos-aquamarine/20 flex items-center justify-center">
                    <span className="text-lg">🏠</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-800 mb-1">Private Workspace</h3>
                    <p className="font-nunito text-sm text-gray-600">Ensuite rooms with dedicated desk</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lagos-aquamarine/20 flex items-center justify-center">
                    <span className="text-lg">📶</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-800 mb-1">Fast WiFi</h3>
                    <p className="font-nunito text-sm text-gray-600">500 Mbps for video calls</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lagos-aquamarine/20 flex items-center justify-center">
                    <span className="text-lg">👥</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-1">Curated Community</h3>
                    <p className="font-nunito text-sm text-gray-600">Like-minded entrepreneurs & creators</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-lagos-aquamarine/20 flex items-center justify-center">
                    <span className="text-lg">🏖️</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-1">Beach Lifestyle</h3>
                    <p className="font-nunito text-sm text-gray-600">10-minute walk to golden sands</p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-montserrat border-2 border-lagos-blue-green text-lagos-blue-green hover:bg-lagos-blue-green hover:text-white"
              >
                <Link href="/rooms">Explore Our Spaces</Link>
              </Button>
            </div>

            <div className="space-y-4">
              <img
                src="/images/noma1.webp"
                alt="NomaVillage exterior in Lagos, Portugal"
                className="w-full h-72 object-cover rounded-xl shadow-lg"
              />
              <img
                src="/images/beach.jpg"
                alt="Rooftop terrace with Lagos coastline view"
                className="w-full h-56 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for productive remote work and an unforgettable Portuguese coastal experience
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Private Rooms */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/room3.jpg"
                  alt="Private room with workspace at Noma Village"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Your Private Sanctuary</h3>
                <ul className="space-y-2 font-nunito text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Ensuite bathroom with rain shower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Queen-size bed with premium linens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Dedicated workspace with desk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>A/C, heating & weekly cleaning</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Coworking */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/cowork.jpg"
                  alt="Coworking space with high-speed WiFi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Professional Workspace</h3>
                <ul className="space-y-2 font-nunito text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>100+ Mbps fiber WiFi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Indoor & poolside work areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>24/7 access to coworking space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Quiet zones for focused work</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Community */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/community.jpg"
                  alt="Global community of digital nomads"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Curated Community</h3>
                <ul className="space-y-2 font-nunito text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Like-minded remote professionals & nomads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Weekly social events & dinners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Skill shares & networking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>International community</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Outdoor Areas */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/pool.jpg"
                  alt="Pool and outdoor relaxation areas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Outdoor Oasis</h3>
                <ul className="space-y-2 font-nunito text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Two swimming pools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Shaded work & lounge areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Rooftop terrace with ocean views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Vibrant colors & natural elements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Home Feeling */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/house2.webp"
                  alt="Colorful Portuguese house in Lagos"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Your Home Away from Home</h3>
                <ul className="space-y-2 font-nunito text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Authentic Portuguese architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Fully equipped shared kitchen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Cozy common areas & lounges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Safe, welcoming atmosphere</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Beaches */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/beach2.jpg"
                  alt="Golden beaches of Lagos Algarve"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Beach Paradise</h3>
                <ul className="space-y-2 font-nunito text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>10-min walk to Praia Porto de Mós</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Dozens of beaches within 15 min</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>World-class surf spots nearby</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lagos-blue-green mt-0.5">✓</span>
                    <span>Iconic golden cliffs & grottoes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4">
              {/* Private Rooms */}
              <div className="flex-none w-[85vw] snap-center group bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/room3.jpg"
                    alt="Private room with workspace at Noma Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Your Private Sanctuary</h3>
                  <ul className="space-y-2 font-nunito text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Ensuite bathroom with rain shower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Queen-size bed with premium linens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Dedicated workspace with desk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>A/C, heating & weekly cleaning</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Coworking */}
              <div className="flex-none w-[85vw] snap-center group bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/cowork.jpg"
                    alt="Coworking space with high-speed WiFi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Professional Workspace</h3>
                  <ul className="space-y-2 font-nunito text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>100+ Mbps fiber WiFi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Indoor & poolside work areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>24/7 access to coworking space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Quiet zones for focused work</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Community */}
              <div className="flex-none w-[85vw] snap-center group bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/community.jpg"
                    alt="Global community of digital nomads"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Curated Community</h3>
                  <ul className="space-y-2 font-nunito text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Like-minded remote professionals & nomads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Weekly social events & dinners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Skill shares & networking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>International community</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Outdoor Areas */}
              <div className="flex-none w-[85vw] snap-center group bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/pool.jpg"
                    alt="Pool and outdoor relaxation areas"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Outdoor Oasis</h3>
                  <ul className="space-y-2 font-nunito text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Two swimming pools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Shaded work & lounge areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Rooftop terrace with ocean views</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Vibrant colors & natural elements</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Home Feeling */}
              <div className="flex-none w-[85vw] snap-center group bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/house2.webp"
                    alt="Colorful Portuguese house in Lagos"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Your Home Away from Home</h3>
                  <ul className="space-y-2 font-nunito text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Authentic Portuguese architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Fully equipped shared kitchen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Cozy common areas & lounges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Safe, welcoming atmosphere</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Beaches */}
              <div className="flex-none w-[85vw] snap-center group bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/beach2.jpg"
                    alt="Golden beaches of Lagos Algarve"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">Beach Paradise</h3>
                  <ul className="space-y-2 font-nunito text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>10-min walk to Praia Porto de Mós</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Dozens of beaches within 15 min</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>World-class surf spots nearby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lagos-blue-green mt-0.5">✓</span>
                      <span>Iconic golden cliffs & grottoes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Prominent Buttons */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-lagos-aquamarine/5 to-lagos-pink/5 rounded-3xl p-12 border-2 border-lagos-blue-green/10">
              <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to experience Noma?
              </h3>
              <p className="font-nunito text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our thriving community of remote workers and digital nomads
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <CTAButton
                  size="lg"
                  location="cta-section"
                  className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Join Us Now
                </CTAButton>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#e362b7] hover:bg-[#e362b7]/90 text-white font-montserrat text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <SmoothScrollLink to="#stay-connected" duration={1500} offset={80}>
                    Get the Guide
                  </SmoothScrollLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-4">Life at <span className="font-caveat text-[1.5em] leading-none">NomaVillage</span></h2>
            <p className="font-nunito text-xl text-gray-600">
              Discover your new home away from home in Lagos, Portugal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <div className="space-y-3 md:space-y-6">
              <img
                src="/images/community2.jpg"
                alt="Coworking space"
                className="w-full h-48 md:h-64 object-cover shadow-md rounded-md"
              />
              <img
                src="/images/community3.jpg"
                alt="Coliving room"
                className="w-full h-36 md:h-48 object-cover object-[50%_90%] shadow-md rounded-md"
              />
            </div>
            <div className="space-y-3 md:space-y-6">
              <img
                src="/images/community5.jpg"
                alt="Rooftop terrace"
                className="w-full h-36 md:h-48 object-cover shadow-md rounded-md"
              />
              <img
                src="/images/community6.jpg"
                alt="Community kitchen"
                className="w-full h-48 md:h-64 object-cover shadow-md rounded-md"
              />
            </div>
            <div className="space-y-3 md:space-y-6 col-span-2 lg:col-span-1">
              <img
                src="/images/cliff.jpg"
                alt="Beach working"
                className="w-full h-48 md:h-64 object-cover object-[50%_70%] shadow-md rounded-md"
              />
              <img
                src="/images/bedroom.jpg"
                alt="Yoga session"
                className="w-full h-36 md:h-48 object-cover shadow-md rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA: Ready to Join? */}
      <section className="py-20 bg-gradient-to-br from-lagos-aquamarine/5 via-white to-lagos-blue-green/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="font-nunito text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 145+ remote workers who've made Lagos their home base. Whether you're staying 2 weeks or 3 months, your next chapter starts here.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <CTAButton
              size="lg"
              location="final-cta"
              className="border border-lagos-blue-green bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all"
            >
              Apply Now
            </CTAButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border border-lagos-blue-green text-lagos-blue-green hover:bg-lagos-blue-green hover:text-white font-montserrat text-lg px-12 py-6 transition-all"
            >
              <Link href="/contact">Ask a Question</Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 font-nunito pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span>Flexible Dates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✉️</span>
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💯</span>
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>

          {/* Featured Testimonials - Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 md:p-8">
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
              <CardContent className="p-4 md:p-8">
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
              <CardContent className="p-4 md:p-8">
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

          {/* Featured Testimonials - Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 mb-20">
            <div className="flex gap-4 pb-4">
              <Card className="flex-none w-[85vw] snap-center border-0 shadow-lg">
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

              <Card className="flex-none w-[85vw] snap-center border-0 shadow-lg">
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

              <Card className="flex-none w-[85vw] snap-center border-0 shadow-lg">
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

          {/* Google Reviews Section */}
          <div className="border-t border-gray-200 pt-16">
            <div className="text-center mb-10">
              <h3 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">Google Reviews</h3>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 md:gap-3 font-nunito text-gray-700 text-sm md:text-base px-4">
                <div className="flex items-center gap-2">
                  <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="font-montserrat font-semibold">Noma Village Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">•</span>
                  <span className="font-montserrat">4.8</span>
                  <span className="text-yellow-500">★★★★★</span>
                  <GoogleReviewsWrapper />
                </div>
              </div>
            </div>
            <GoogleReviewsCarousel />
            <div className="text-center mt-10">
              <a
                href="https://maps.google.com/?cid=12085466010589542175"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg  text-lagos-blue-green border-lagos-blue-green border font-montserrat font-semibold shadow-lg hover:bg-lagos-blue-green/90 hover:text-white transition-all cursor-pointer"
              >
                Read all Google Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Value Section */}
      <PricingSectionWrapper />

      {/* Guest Story (Jeremy) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-gray-900 mb-4">Guest Story</h2>
            <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">Listen to Jeremy sharing his experience at Noma Village</p>
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

      {/* FAQ Section */}
      <FAQSection showViewAllLink={true} />

      {/* Newsletter Signup - Enhanced Guide Download */}
      <section id="stay-connected" className="relative py-24 bg-gradient-to-br from-lagos-blue-green via-[#4FA5B0] to-lagos-pink overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 border-2 border-white rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-white mb-6">
              Get the <span className="font-caveat text-[1.5em] leading-none">NomaVillage</span> Guide
            </h2>
            <p className="font-nunito text-xl md:text-2xl text-white/95 mb-4 max-w-3xl mx-auto">
              Everything you need to know about our Coliving & Coworking in Lagos, Portugal
            </p>
          </div>



          {/* Email Form - Enhanced */}
          <div className="max-w-xl mx-auto">
            <EmailSignupForm
              source="homepage-newsletter"
              showNames={true}
              className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl"
            />
            <p className="text-white/80 text-sm font-nunito mt-4 text-center">
              ✨ Instant delivery • 🔒 No spam, ever • 📧 Exclusive updates
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Direct Button (homepage) */}
      <WhatsAppDirectButton
        source="homepage"
        messagePreset="october_interest"
      />
    </div>
  )
}
