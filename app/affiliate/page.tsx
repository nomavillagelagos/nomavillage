"use client"

import { useEffect, useRef, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import FilloutSliderPopup from "@/components/fillout-slider-popup"
import posthog from "@/lib/posthog"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { CheckCircle, Gift, Megaphone, BadgeDollarSign, Users, Video, Link as LinkIcon, Images, Target } from "lucide-react"
import Link from "next/link"

export default function AffiliatePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const hasAutoTriggeredRef = useRef(false)
  const hasUserInteractedRef = useRef(false)

  const openSignup = (location: string) => {
    posthog.capture('affiliate_cta_click', { page: 'affiliate', location })
    hasUserInteractedRef.current = true
    setIsPopupOpen(true)
  }

  const handleClose = () => {
    hasUserInteractedRef.current = true
    setIsPopupOpen(false)
  }

  // Auto-open logic: once after 75% scroll OR after 25 seconds
  useEffect(() => {
    const tryAutoOpen = () => {
      if (hasAutoTriggeredRef.current || hasUserInteractedRef.current || isPopupOpen) return
      hasAutoTriggeredRef.current = true
      setIsPopupOpen(true)
      try { posthog.capture('popup_auto_opened', { page: 'affiliate', reason: 'scroll_or_timer' }) } catch {}
      window.removeEventListener('scroll', onScrollCheck)
    }

    const onScrollCheck = () => {
      const doc = document.documentElement
      const scrollProgress = (window.scrollY + window.innerHeight) / (doc.scrollHeight || 1)
      if (scrollProgress >= 0.75) {
        tryAutoOpen()
      }
    }

    const timerId = window.setTimeout(() => {
      tryAutoOpen()
    }, 25000)

    window.addEventListener('scroll', onScrollCheck, { passive: true })
    onScrollCheck()
    return () => {
      window.clearTimeout(timerId)
      window.removeEventListener('scroll', onScrollCheck)
    }
  }, [isPopupOpen])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-lagos-aquamarine/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 mb-6 bg-white/70 backdrop-blur text-gray-700">
            <BadgeDollarSign className="h-4 w-4 text-lagos-pink" />
            <span className="font-montserrat text-sm">Earn €100 • Give €100</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="font-caveat text-6xl md:text-7xl block mb-1">Affiliate Program</span>
            Share Transformation. <span className="text-lagos-pink">Earn €100</span> & Give <span className="text-lagos-blue-green">€100 Off</span>
          </h1>
          <p className="font-nunito text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Help others experience our premium Yoga + Co‑Living retreat in Lagos. You earn €100 per referral — they save €100 on their booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-lagos-pink text-white font-montserrat" size="lg" onClick={() => openSignup('hero')}>
              Join Affiliate Program
            </Button>
            <Button asChild size="lg" className="font-montserrat bg-[#e362b7] hover:bg-[#e362b7]/90 text-white">
              <SmoothScrollLink to="#marketing" duration={1200} offset={-10}>
                Download Marketing Kit
              </SmoothScrollLink>
            </Button>
          </div>
          <div className="mt-6 text-sm text-gray-600 font-montserrat">October 2025 confirmed • May 2025 probable (same pricing)</div>
        </div>
      </section>

      {/* Program Description */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-normal font-caveat text-gray-900">Premium Yoga & Co‑Living Experience</h2>
            <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto mt-3">
              A curated, premium retreat blending ancient yoga wisdom with modern coastal living. Disconnect from digital overwhelm and reconnect with your authentic self — in community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-nunito text-gray-700">
            <div className="p-6 rounded-xl bg-gray-50">
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> October 2025 confirmed — May 2025 probable (same pricing)</li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> Curated community of like‑minded individuals</li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> Structured practice + space for personal exploration</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> Luxury amenities, private rooms, 500Mbps WiFi, 2 pools, coworking</li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> Premium investment in transformation — made more accessible via affiliates</li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> Lagos, Portugal — beaches within walking distance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-caveat text-5xl text-gray-900">Affiliate Benefits</h2>
            <p className="font-nunito text-lg text-gray-600">Generous rewards, leadership growth, and complete marketing support</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="h-12 w-12 rounded-lg bg-lagos-pink/20 flex items-center justify-center mb-4"><Gift className="h-6 w-6 text-lagos-pink" /></div>
              <h3 className="font-montserrat text-xl mb-2">Generous Dual Rewards</h3>
              <p className="font-nunito text-gray-600">€100 affiliate commission + €100 customer discount</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="h-12 w-12 rounded-lg bg-lagos-blue-green/20 flex items-center justify-center mb-4"><Users className="h-6 w-6 text-lagos-blue-green" /></div>
              <h3 className="font-montserrat text-xl mb-2">Leadership Growth</h3>
              <p className="font-nunito text-gray-600">Potential space‑holder opportunities in our expanding network</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="h-12 w-12 rounded-lg bg-amber-200/40 flex items-center justify-center mb-4"><Megaphone className="h-6 w-6 text-amber-600" /></div>
              <h3 className="font-montserrat text-xl mb-2">Complete Marketing Support</h3>
              <p className="font-nunito text-gray-600">Professional video editing, custom codes, platform‑specific links</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Tools */}
      <section id="marketing" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-caveat text-5xl text-gray-900">Marketing Tools</h2>
            <p className="font-nunito text-lg text-gray-600">Everything you need to start sharing today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3"><Video className="h-5 w-5 text-gray-900" /><h3 className="font-montserrat text-lg">Video Content</h3></div>
              <p className="font-nunito text-gray-700">Create your own promotional videos — we handle professional editing and publishing.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3"><LinkIcon className="h-5 w-5 text-gray-900" /><h3 className="font-montserrat text-lg">Social Media Ready</h3></div>
              <p className="font-nunito text-gray-700">Custom affiliate codes and optimized links for Instagram, Facebook, LinkedIn, TikTok.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3"><Target className="h-5 w-5 text-gray-900" /><h3 className="font-montserrat text-lg">Multi‑Platform Tracking</h3></div>
              <p className="font-nunito text-gray-700">Platform‑specific tracking for accurate attributions across channels.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3"><Images className="h-5 w-5 text-gray-900" /><h3 className="font-montserrat text-lg">Content Library</h3></div>
              <p className="font-nunito text-gray-700">Access to photos, descriptions, testimonials, and program details.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button className="bg-lagos-pink text-white font-montserrat" size="lg" onClick={() => openSignup('marketing')}>
              Start Earning Today
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-caveat text-5xl text-gray-900">How It Works</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Join program', desc: 'Receive toolkit + unique codes/links' },
              { title: 'Share content', desc: 'Promote across your networks with platform‑specific links' },
              { title: 'Earn €100', desc: 'Each referral gives you €100 and customers save €100' },
              { title: 'Grow with us', desc: 'Top performers may be considered for space‑holder roles' },
            ].map((step, i) => (
              <li key={i} className="p-6 bg-white rounded-xl shadow-sm border">
                <div className="font-montserrat text-sm text-gray-500 mb-1">Step {i + 1}</div>
                <div className="font-montserrat text-lg mb-2">{step.title}</div>
                <div className="font-nunito text-gray-700">{step.desc}</div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10">
            <Button className="bg-lagos-blue-green text-black font-montserrat" size="lg" onClick={() => openSignup('how-it-works')}>
              Join Affiliate Program
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-caveat text-5xl text-gray-900">Perfect For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Yoga teachers offering premium student experiences',
              'Wellness coaches expanding retreat offerings',
              'Lifestyle influencers aligned with conscious living',
              'Community‑minded people passionate about transformation',
              'Practitioners interested in space‑holding opportunities',
              'Mindfulness practitioners & facilitators',
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-gray-50 border">
                <div className="font-montserrat text-lg">{item}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="bg-lagos-pink text-white font-montserrat" size="lg" onClick={() => openSignup('target-audience')}>
              Apply Now — Limited October/November Spots
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-normal text-white mb-4">Share Transformation. Earn Together.</h2>
          <p className="font-nunito text-xl text-white/90 mb-8">Join our affiliate program and grow with a purpose‑driven community.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black font-montserrat" onClick={() => openSignup('final-cta')}>
              Start Earning Today
            </Button>
            <Button asChild size="lg" className="bg-[#e362b7] hover:bg-[#e362b7]/90 text-white font-montserrat">
              <Link href="/faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Fillout Slider Popup */}
      <FilloutSliderPopup
        isOpen={isPopupOpen}
        onClose={handleClose}
        formUrl="https://forms.fillout.com/t/aKuWaUwvaVus"
        onFormSubmit={() => {
          hasUserInteractedRef.current = true
          posthog.capture('affiliate_form_submitted', { page: 'affiliate' })
        }}
      />
    </div>
  )
}
