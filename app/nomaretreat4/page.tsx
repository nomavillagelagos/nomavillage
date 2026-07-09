"use client"

import { useEffect } from "react"
import { DM_Serif_Display, Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import EmailSignupForm from "@/components/email-signup-form"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import { Compass, Users, Palette } from "lucide-react"
import { trackEvent } from "@/components/GoogleAnalytics"

const display = DM_Serif_Display({ subsets: ["latin"], display: "swap", weight: ["400"], style: ["normal", "italic"] })
const sans = Inter({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600"] })

const VALUES = [
  {
    icon: Compass,
    title: "Turnkey Logistics",
    desc: "Rooms, kitchen, pool terraces, and lounge — booked as one venue, not a list of add-ons. We handle the coordination so you can focus on your programme.",
  },
  {
    icon: Users,
    title: "Built for Groups",
    desc: "Every space here was designed for a community, not solo travelers. Dining for twelve, breakout rooms, and common areas that actually hold a group comfortably.",
  },
  {
    icon: Palette,
    title: "Coastal Inspiration",
    desc: "Cliffs, surf, and golden light on the Algarve coast — the kind of setting that does part of the retreat's work for you.",
  },
]

const SPACE_TILES = [
  { label: "Pool & Terraces", image: "/images/casa-concha/pool-palms.jpg" },
  { label: "Work Corner", image: "/images/casa-concha/bedroom-blue-chair-desk.jpg" },
  { label: "Communal Kitchen", image: "/images/casa-concha/kitchen-modern-white.jpg" },
  { label: "Pool-View Rooms", image: "/images/casa-concha/bedroom-teal-bench-lemon.jpg" },
]

const COVERAGE = [
  { title: "Capacity & Room Mix", desc: "Ensuite doubles, garden rooms, and standard rooms — exact configuration for your group size." },
  { title: "Catering & Kitchen Access", desc: "Self-catered, group-cooked, or locally arranged — the kitchen is yours either way." },
  { title: "Lounge & Breakout Spaces", desc: "The living room and pool terraces, reconfigured for sessions and small-group work." },
  { title: "Local Transfers & Excursions", desc: "Faro Airport transfers, surf lessons, and cliff walks — arranged on request." },
]

const FAQS = [
  { q: "Can we book the full venue exclusively?", a: "Yes — full-villa buyouts are available for retreat groups, giving you exclusive use of the rooms, kitchen, pool terraces, and lounge for the duration of your stay." },
  { q: "How many guests can Noma Village host?", a: "The villa comfortably hosts small-to-mid-size retreat groups across our private ensuite, garden, and standard rooms, with communal dining for twelve. Tell us your headcount and we'll confirm the right room mix." },
  { q: "Is catering included?", a: "The kitchen is fully equipped for group cooking, and we can arrange local catering or a private chef on request — just let us know your preference when you enquire." },
  { q: "How do guests get here from Faro Airport?", a: "Lagos is roughly an hour's drive from Faro Airport. We can help arrange group transfers so your retreat starts the moment guests land." },
  { q: "What's the best season to host a retreat in Lagos?", a: "Spring through early autumn brings the warmest water and longest daylight, but the Algarve's mild winters make Noma Village workable for retreats nearly year-round." },
]

export default function NomaRetreat4() {
  useEffect(() => {
    document.title = "Noma Village Retreat Venue | Lagos, Portugal"
  }, [])

  const handleCta = (location: string) => {
    try {
      trackEvent("cta_click", { button_text: "Get a Quote", page: "nomaretreat4", location })
    } catch {}
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={`${sans.className} min-h-screen`} style={{ backgroundColor: "#FCFAF6", color: "#2E2B27" }}>
      <header className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto">
        <a href="/" className="text-sm font-semibold tracking-tight" style={{ color: "#2E2B27" }}>
          Noma Village
        </a>
        <button
          onClick={() => handleCta("header")}
          className="text-xs sm:text-sm font-medium px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: "#B08D57" }}
        >
          Get a Quote
        </button>
      </header>

      {/* Hero */}
      <section className="px-6 sm:px-10 pt-6 pb-16">
        <div className="max-w-6xl mx-auto relative rounded-2xl overflow-hidden">
          <img src="/images/casa-concha/exterior-aerial-courtyard.jpg" alt="Noma Village retreat venue in Lagos, Portugal" className="w-full h-[60vh] min-h-[420px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-12">
            <p className="text-white/80 text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
              Independent Retreat Venue &middot; Algarve, Portugal
            </p>
            <h1 className={`${display.className} text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-3xl`}>
              Your Retreat, <span className="italic">Realized</span>
            </h1>
            <p className="text-white/90 max-w-xl mb-8 font-light">
              A private villa in Lagos, Algarve, held for retreat leaders who want the whole venue — rooms,
              kitchen, pool terraces, and lounge — to themselves.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => handleCta("hero")} className="rounded-md px-6 py-5 h-auto text-white hover:scale-100" style={{ backgroundColor: "#B08D57" }}>
                Get a Quote
              </Button>
              <button
                onClick={() => document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-md px-6 py-5 h-auto text-white border border-white/50 hover:bg-white/10 transition-colors text-sm"
              >
                Explore the Venue
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-x-10 gap-y-3 mt-6 text-sm font-medium" style={{ color: "#4F6B70" }}>
          <span>Full-Venue Buyouts</span>
          <span>&middot;</span>
          <span>Two Private Pools</span>
          <span>&middot;</span>
          <span>Dining for 12+</span>
        </div>
      </section>

      {/* Why host with us */}
      <section className="py-16 sm:py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#B08D57" }}>
            Why Noma Village
          </p>
          <h2 className={`${display.className} text-3xl sm:text-4xl lg:text-5xl mb-14`}>
            More Than a <span className="italic">Rental Villa</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-black/5">
                <v.icon className="h-6 w-6 mb-4" style={{ color: "#B08D57" }} />
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured package */}
      <section className="py-16 sm:py-24 px-6 sm:px-10" style={{ backgroundColor: "#F5F0E6" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#B08D57" }}>
            Featured Package
          </p>
          <h2 className={`${display.className} text-3xl sm:text-4xl mb-10`}>The Full Buyout</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-[4/3] lg:aspect-auto">
              <img src="/images/casa-concha/exterior-daytime.jpg" alt="Noma Village full villa buyout" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "#EFE6D4", color: "#8A6D3C" }}>
                  Exclusive Use
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "#E4EDEE", color: "#4F6B70" }}>
                  Two Pools
                </span>
              </div>
              <p className="opacity-80 leading-relaxed font-light mb-4">
                Every private room, the communal kitchen, pool terraces, and lounge — reserved solely
                for your retreat. Your group moves through the villa as if it were their own, from sunrise
                sessions to closing-night dinners.
              </p>
              <p className="opacity-80 leading-relaxed font-light">
                Includes access to the pool, BBQ area, and high-speed WiFi throughout. Catering and transfers
                available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces grid */}
      <section id="spaces" className="py-16 sm:py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#B08D57" }}>
            Explore the Spaces
          </p>
          <h2 className={`${display.className} text-3xl sm:text-4xl mb-10`}>Four Spaces, One Retreat</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SPACE_TILES.map((s, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                <img src={s.image} alt={s.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="py-16 sm:py-24 px-6 sm:px-10" style={{ backgroundColor: "#F5F0E6" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#B08D57" }}>
            What We Cover
          </p>
          <h2 className={`${display.className} text-3xl sm:text-4xl mb-10`}>
            Every Detail, <span className="italic">Sorted</span>
          </h2>
          <div className="space-y-6">
            {COVERAGE.map((c, i) => (
              <div key={i} className="flex gap-4 items-start border-b border-black/5 pb-6">
                <span className="text-sm font-semibold shrink-0 w-6" style={{ color: "#B08D57" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm opacity-70 font-light">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#B08D57" }}>
            Common Questions
          </p>
          <h2 className={`${display.className} text-3xl sm:text-4xl mb-10`}>Retreat Venue FAQ</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-lg px-5 border border-black/5">
                <AccordionTrigger className="font-medium text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="opacity-70 font-light leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section id="enquire" className="py-16 sm:py-24 px-6 sm:px-10" style={{ backgroundColor: "#2E2B27" }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#C7A96C" }}>
            Not Sure Where to Start?
          </p>
          <h2 className={`${display.className} text-white text-3xl sm:text-4xl mb-6`}>
            Get a <span className="italic">Personalised</span> Proposal
          </h2>
          <p className="text-white/70 font-light mb-10">
            Tell us your dates, group size, and what matters most — we'll follow up with availability and pricing.
            No obligation.
          </p>
          <EmailSignupForm source="nomaretreat4" showNames={true} className="max-w-md mx-auto text-left" />
          <p className="text-white/50 text-sm mt-8">
            Or email us directly at{" "}
            <a href="mailto:hello@nomavillagelagos.com" className="underline hover:text-white">
              hello@nomavillagelagos.com
            </a>
          </p>
        </div>
      </section>

      <footer className="py-10 px-6 sm:px-10 text-center" style={{ backgroundColor: "#2E2B27" }}>
        <p className="text-white/40 text-xs tracking-wide">
          Noma Village &middot; Lagos, Algarve, Portugal &middot;{" "}
          <a href="/" className="underline hover:text-white/70">
            nomavillage.com
          </a>
        </p>
      </footer>

      <WhatsAppDirectButton
        messageOverride="Hi! I'm a retreat leader interested in hosting a retreat at Noma Village Lagos."
        source="nomaretreat4"
        tooltip="Questions about hosting your retreat?"
      />
    </div>
  )
}
