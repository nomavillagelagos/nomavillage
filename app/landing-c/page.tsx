"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Users, Utensils, Wifi, Waves, Coffee, Heart, MapPin, Palmtree, Bath, Laptop, Bed } from "lucide-react";
import Image from "next/image";
import { CountUp } from "@/components/count-up";
import MapWithZoom from "@/components/MapWithZoom";
import { trackEvent } from "@/components/GoogleAnalytics";
import { useEffect, useState } from "react";
import GuideModal from "@/components/guide-modal";
import EmailSignupForm from "@/components/email-signup-form";
import FilloutSliderPopup from "@/components/fillout-slider-popup";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";
import { useInView } from "@/hooks/use-in-view";
import posthog from "@/lib/posthog";
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Script from "next/script";

function LocationHighlights() {
  const items = [
    { icon: '🤝', title: 'Instant Community', desc: 'Join 145+ vetted remote professionals' },
    { icon: '🌅', title: 'Sunset Gatherings', desc: 'Cliffs, beach walks, and dinners together' },
    { icon: '💬', title: 'Skill Shares', desc: 'Founder talks, co-working jams, masterminds' },
    { icon: '🏄‍♀️', title: 'Surf Buddies', desc: 'Find your session partners easily' },
    { icon: '🧘', title: 'Daily Yoga', desc: 'Mindful start to connect & focus' },
    { icon: '🍲', title: 'Community Meals', desc: 'Weekly dinners and potlucks' },
  ]

  useEffect(() => {
    const cards = document.querySelectorAll('.loc-card')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0')
          e.target.classList.remove('opacity-0', 'translate-y-4')
        }
      })
    }, { threshold: 0.2 })
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <div key={i} className="loc-card opacity-0 translate-y-4 transition-all duration-500 ease-out border rounded-xl p-5 bg-white shadow-sm hover:shadow-md">
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

export default function LandingPageC() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()
  const [reviewsSummary, setReviewsSummary] = useState<{ rating?: number; user_ratings_total?: number; url?: string } | null>(null)
  const { ref: blackHeroRef, inView: blackHeroInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const handleJoinClick = () => {
    setIsFormPopupOpen(true)
    try { trackEvent('apply_click', { page: 'landing-c', location: 'pricing' }) } catch {}
  };

  useEffect(() => {
    fetch('/api/google-reviews', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then((data) => {
        if (data) setReviewsSummary({ rating: data.rating, user_ratings_total: data.user_ratings_total, url: data.url })
      })
      .catch(() => {})
  }, [])

  const handleFormClick = (location: string) => {
    trackEvent('cta_click', { button_text: 'Secure Your Spot Now', page: 'landing-c', location, form_type: 'application' })
    posthog.capture('apply_click', { page: 'landing-c', location, form_type: 'application', variant: 'C' })
    setIsFormPopupOpen(true)
  }

  const handleGuideClick = (location: string) => {
    trackEvent('guide_click', { button_text: 'Get the Guide', page: 'landing-c', location })
    posthog.capture('guide_click', { page: 'landing-c', location })
    if (location === 'hero') scrollToSection('email-signup'); else setIsGuideModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/fireplace.jpeg')" }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <img src="/noma-logo.png" alt="Noma Village Logo" className="w-24 h-24 mx-auto mb-8" />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance leading-tight inline-block mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.04em' }}>
              <span style={{fontWeight: 200, fontFamily: 'Montserrat, sans-serif'}}>Find a </span>
              <span style={{ position: 'relative', color: 'white', fontSize: '1.1em', fontFamily: 'Caveat, cursive', fontWeight: 500, marginRight: '0.3em' }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Home</span>
                <span className="hero-brush-underline" style={{ position: 'absolute', left: '-5%', right: '-10%', bottom: '-2%', height: '30px', width: '115%', backgroundImage: 'url(/brush-underline.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center bottom', transform: 'rotate(-2deg)', zIndex: -1, display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.9 }}></span>
              </span>
              <span className="block lg:inline mt-2 lg:mt-0" style={{fontWeight: '200', fontFamily: 'Montserrat, sans-serif'}}>on your <span style={{fontWeight: '200', fontFamily: 'Montserrat, sans-serif'}}>Journey</span></span>
            </h1>
            <h3 className="text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-normal text-balance inline-block mx-auto" style={{ fontFamily: 'Caveat, cursive', letterSpacing: '-0.01em' }}>
              Coliving and Working by the Ocean
            </h3>
          </div>

          <div className="mt-12">
            <Button
              size="lg"
              className="text-black font-montserrat text-lg px-8 py-3 h-auto cta-boost cta-swipe cta-swipe--to-white"
              style={{ backgroundColor: '#50bbb7' }}
              onClick={() => { posthog.capture('learn_more_click', { page: 'landing-c', location: 'hero' }); scrollToSection('stats') }}
            >
              Learn More
            </Button>
            <Button
              size="lg"
              className="ml-4 bg-[#ea86c0] text-white font-montserrat text-lg px-8 py-3 h-auto relative overflow-hidden group transition-colors"
              onClick={() => { posthog.capture('see_pricing_click', { page: 'landing-c', location: 'hero' }); scrollToSection('pricing') }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors">See Pricing</span>
              <span className="pointer-events-none absolute inset-0 -z-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:-translate-x-full group-hover:before:translate-x-0 before:transition-transform before:duration-300 before:ease-out"></span>
            </Button>
          </div>
        </div>
      </section>

      {/* Black band */}
      <section ref={blackHeroRef as any} className="black-hero-section" style={{ backgroundColor: '#000', color: '#fff', width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflowX: 'hidden', padding: '60px 0', opacity: blackHeroInView ? 1 : 0, transform: blackHeroInView ? 'translateX(0)' : 'translateX(-100px)', transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="black-hero-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 30px', textAlign: 'center' }}>
          <h2 className="black-hero-title" style={{ fontSize: '2.3rem', fontWeight: 300, letterSpacing: '-0.5px', lineHeight: 1.2, color: '#ffffff', margin: 0, padding: 0 }}>
            Community-first coliving — daily yoga, shared coworking, and surf buddies
          </h2>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 bg-lagos-aquamarine/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <CountUp end={145} duration={2500} className="text-4xl font-bold text-lagos-blue-green font-montserrat" />
              <div className="font-nunito text-gray-600">members</div>
            </div>
            <div className="space-y-2">
              <CountUp end={26} duration={2200} className="text-4xl font-bold text-lagos-blue-green font-montserrat" />
              <div className="font-nunito text-gray-600">nationalities</div>
            </div>
            <div className="space-y-2">
              <CountUp end={1} duration={1800} className="text-4xl font-bold text-lagos-blue-green font-montserrat" />
              <div className="font-nunito text-gray-600">community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Highlights (emphasis) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Live • Work • Belong</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto text-balance">More than a place to stay — a curated circle of doers, founders, and creatives supporting each other.</p>
          </div>
          <LocationHighlights />
        </div>
      </section>

      {/* Video Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12">
            <div className="text-center">
              <Button size="lg" className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black" onClick={() => handleFormClick('video-top')}>Book a Call now</Button>
            </div>
            <div className="text-center">
              <h2 className="font-caveat text-5xl font-normal text-gray-900" style={{fontFamily: 'Caveat, cursive'}}>Take a Look Inside</h2>
              <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">A short video preview of life at Noma Village</p>
            </div>
            <div className="relative w-full md:w-1/2 mx-auto rounded-xl shadow-xl overflow-hidden" style={{paddingTop: '56.25%'}}>
              <iframe src="https://www.youtube.com/embed/7hPyCSk-6pM" title="Noma Village Preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 w-full h-full" />
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-xl px-12 py-4 h-auto cta-boost cta-swipe cta-swipe--to-black" onClick={() => handleFormClick('video-bottom')}>Book a Call now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-lagos-blue-green">
              <MapPin className="h-5 w-5" />
              <span className="font-montserrat text-sm tracking-wide">Your Transformation Base</span>
            </div>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mt-2">Noma Village Lagos</h2>
            <p className="font-nunito text-gray-600 mt-2">Nature • Culture • Convenience — golden beaches, dramatic cliffs, and Lagos historic center</p>
          </div>
          <div className="mb-10">
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <MapWithZoom className="w-full rounded-2xl" style={{ height: '360px' }} initialZoom={3} targetZoom={12} />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-md px-3 py-1 text-xs font-montserrat shadow">37.0925267, -8.6828956 • Lagos, Portugal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Life at Noma Village</h2>
            <p className="font-nunito text-xl text-gray-600">Home away from home in Lagos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <img src="/images/community2.jpg" alt="Coworking space" className="w-full h-64 object-cover shadow-md rounded-lg" />
              <img src="/images/community3.jpg" alt="Community gathering" className="w-full h-48 object-cover object-[50%_90%] shadow-md rounded-lg" />
            </div>
            <div className="space-y-6">
              <img src="/images/community5.jpg" alt="Pool area" className="w-full h-48 object-cover shadow-md rounded-lg" />
              <img src="/images/community6.jpg" alt="Community kitchen" className="w-full h-64 object-cover shadow-md rounded-lg" />
            </div>
            <div className="space-y-6">
              <img src="/images/cliff.jpg" alt="Lagos coastline" className="w-full h-64 object-cover object-[50%_70%] shadow-md rounded-lg" />
              <img src="/images/bedroom.jpg" alt="Private room" className="w-full h-48 object-cover shadow-md rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Private Room */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-caveat text-5xl font-normal text-gray-900 mb-6" style={{fontFamily: 'Caveat, cursive'}}>Your Private Space</h2>
              <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">Private rooms with queen bed, work desk, and private bathroom.</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><Bath className="h-6 w-6 text-lagos-amber mx-auto mb-2" /><div className="font-montserrat font-semibold text-sm">Private Bathroom</div></div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><Bed className="h-6 w-6 text-lagos-amber mx-auto mb-2" /><div className="font-montserrat font-semibold text-sm">Queen Bed</div></div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm"><Laptop className="h-6 w-6 text-lagos-amber mx-auto mb-2" /><div className="font-montserrat font-semibold text-sm">Work Desk</div></div>
              </div>
            </div>
            <div>
              <div className="rounded-2xl shadow-xl bg-white p-2">
                <Tabs defaultValue="room" className="w-full">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{paddingTop: '56.25%'}}>
                    <TabsContent value="room" className="absolute inset-0"><img src="/images/room4.jpg" alt="Room" className="w-full h-full object-cover rounded-xl" /></TabsContent>
                    <TabsContent value="bath" className="absolute inset-0"><img src="/images/private-bathroom-with-modern-fixtures.jpg" alt="Bathroom" className="w-full h-full object-cover rounded-xl" /></TabsContent>
                    <TabsContent value="view" className="absolute inset-0"><img src="/images/balcony2.jpg" alt="View from room" className="w-full h-full object-cover rounded-xl" /></TabsContent>
                  </div>
                  <div className="mt-2 flex justify-center"><TabsList className="bg-gray-100"><TabsTrigger value="room">Room</TabsTrigger><TabsTrigger value="bath">Bathroom</TabsTrigger><TabsTrigger value="view">View</TabsTrigger></TabsList></div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing (1170 €/month) */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-montserrat text-sm text-gray-500 mb-2">From <span className="font-semibold text-gray-800">€1,170/month</span></p>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mb-4">Community-First Pricing</h2>
            <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">One price that includes your private room, coworking, daily yoga, and a built-in community.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="relative border-2 border-lagos-blue-green rounded-2xl p-8 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <div className="text-center mb-6">
                <div className="flex items-end justify-center gap-2 mb-1">
                  <span className="text-5xl font-bold text-gray-900 font-montserrat">€1,170</span>
                  <span className="text-gray-500 font-nunito pb-2">/ month</span>
                </div>
                <div className="text-lagos-blue-green font-montserrat font-semibold mb-2">~ €39/day</div>
                <p className="font-nunito text-gray-600">Best for deep focus and deeper connections</p>
              </div>
              <div className="space-y-3 mb-6">
                {['Private ensuite room','Coworking 24/7','Daily yoga','Weekly community dinners','500 Mbps WiFi','All utilities & cleaning'].map((b,i)=> (
                  <div key={i} className="flex items-start gap-3"><svg className="h-5 w-5 text-lagos-blue-green mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg><span className="font-nunito text-gray-700">{b}</span></div>
                ))}
              </div>
              <Button onClick={handleJoinClick} className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg py-6">Apply Now</Button>
              <p className="text-center text-sm text-gray-500 mt-4 font-nunito">🔒 Secure application • 📅 Flexible dates • ✉️ Quick response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="email-signup" className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-normal text-white mb-4" style={{fontFamily: 'Caveat, cursive'}}>Get the Guide</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">Get updates on community events, new amenities, and exclusive member benefits at Noma Village</p>
          <EmailSignupForm source="landing-c-newsletter" showNames={true} className="max-w-md mx-auto" />
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
              <a href={reviewsSummary?.url || "https://maps.google.com/?cid=12085466010589542175"} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-lagos-blue-green">{reviewsSummary?.user_ratings_total ? `${reviewsSummary.user_ratings_total} Google Reviews` : '18 Google Reviews'}</a>
            </div>
          </div>
          <GoogleReviewsCarousel />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-normal text-white mb-4" style={{fontFamily: 'Caveat, cursive'}}>Join our Community in Lagos</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">Transform how you live, work, and connect</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-xl px-12 py-4 h-auto cta-boost" onClick={() => handleFormClick('final_cta')}>Secure Your Spot Now</Button>
            <Button variant="outline" size="lg" className="bg-[#E879B9] hover:bg-[#E879B9]/90 text-white border-[#E879B9] hover:border-[#E879B9]/90 font-montserrat text-xl px-12 py-4 h-auto cta-boost" onClick={() => handleGuideClick('final_cta')}>Get the Guide</Button>
          </div>
        </div>
      </section>

      <Script src="https://server.fillout.com/embed/v1/" strategy="afterInteractive" />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
      <FilloutSliderPopup isOpen={isFormPopupOpen} onClose={() => setIsFormPopupOpen(false)} formUrl="https://forms.fillout.com/t/aKuWaUwvaVus" />

      <WhatsAppDirectButton messagePreset="october_interest" source="landing-c" />
    </div>
  )
}
