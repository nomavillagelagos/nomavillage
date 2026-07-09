"use client"

import { useEffect } from "react"
import { Fraunces, Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import EmailSignupForm from "@/components/email-signup-form"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import { trackEvent } from "@/components/GoogleAnalytics"

const display = Fraunces({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600"], style: ["normal", "italic"] })
const sans = Inter({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600"] })

const WING_A_STRIP = [
  { label: "Work Desk", image: "/images/casa-concha/bedroom-blue-chair-desk.jpg" },
  { label: "Breakout Lounge", image: "/images/casa-concha/living-blue-velvet.jpg" },
  { label: "Terrace", image: "/images/casa-concha/balcony-pool-view.jpg" },
  { label: "Coffee Corner", image: "/images/casa-concha/dining-studio-orchid.jpg" },
]

const WING_B_STRIP = [
  { label: "Pool", image: "/images/casa-concha/pool-palms.jpg" },
  { label: "Sunset Deck", image: "/images/casa-concha/pool-red-pergola.jpg" },
  { label: "BBQ & Dining", image: "/images/casa-concha/kitchen-pink-dining.jpg" },
  { label: "Yoga Space", image: "/sunset-yoga-session-on-portuguese-coast.png" },
]

const SURROUNDINGS = [
  { name: "Ponta da Piedade", desc: "Golden cliffs and sea caves, a 10-minute drive — best reached by boat at sunset.", image: "/stunning-lagos-portugal-coastline-with-golden-clif.png" },
  { name: "Praia Dona Ana", desc: "One of the Algarve's most photographed beaches, walkable from the villa.", image: "/images/beach.jpg" },
  { name: "Lagos Old Town", desc: "Cobblestone streets, markets, and seafood restaurants — 15 minutes away.", image: "/images/house.jpg" },
  { name: "Sagres & the Cape", desc: "Wild Atlantic cliffs at Europe's southwestern tip, a 40-minute drive.", image: "/images/cliff2.jpg" },
]

export default function NomaRetreat2() {
  useEffect(() => {
    document.title = "Host Your Retreat at Noma Village | Lagos, Algarve"
  }, [])

  const handleCta = (location: string) => {
    try {
      trackEvent("cta_click", { button_text: "Discover Hosting", page: "nomaretreat2", location })
    } catch {}
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={`${sans.className} min-h-screen`} style={{ backgroundColor: "#F5EBDD", color: "#2B211B" }}>
      <header className="flex items-center justify-between px-6 sm:px-10 py-6">
        <a href="/" className="text-xs sm:text-sm tracking-[0.25em] uppercase font-medium" style={{ color: "#8B4A2B" }}>
          Noma Village
        </a>
        <button
          onClick={() => handleCta("header")}
          className="text-xs sm:text-sm tracking-wide uppercase px-4 py-2 border rounded-full transition-colors"
          style={{ borderColor: "#8B4A2B", color: "#8B4A2B" }}
        >
          Enquire
        </button>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[440px] overflow-hidden mx-4 sm:mx-8 rounded-sm">
          <img src="/images/casa-concha/exterior-aerial-pools.jpg" alt="Noma Village coastal villa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="max-w-4xl mx-auto text-center px-6 -mt-16 sm:-mt-20 relative z-10">
          <div className="bg-[#F5EBDD] pt-10 pb-2">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#8B4A2B" }}>
              Retreat Villas &middot; Lagos, Algarve
            </p>
            <h1 className={`${display.className} text-4xl sm:text-6xl lg:text-7xl leading-[1.05]`}>
              Host Your Retreat<br />on the <span className="italic">Algarve Coast</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Presentation */}
      <section className="py-16 sm:py-24 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-xl leading-relaxed font-light opacity-80 mb-6">
            Are you searching for a venue that meets your group's expectations without the compromises of a
            conference hotel?
          </p>
          <p className="text-base sm:text-xl leading-relaxed font-light opacity-80">
            Noma Village sits in Lagos, with two pools and wide-open terraces built for gathering. Whether it's
            twelve guests or twenty-four, everyone has room to work, and room to be alone.
          </p>
        </div>
      </section>

      {/* Module A */}
      <section className="py-10 sm:py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-sm mb-8">
            <img src="/images/casa-concha/dining-studio-orchid.jpg" alt="The Living Wing" className="w-full h-full object-cover" />
          </div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className={`${display.className} text-3xl sm:text-4xl mb-4`}>The Living Wing</h2>
            <p className="opacity-75 font-light leading-relaxed">
              Our everyday living spaces clear out for your sessions — dining tables reconfigured into circles,
              a work desk on hand, and a lounge for the in-between moments.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {WING_A_STRIP.map((s, i) => (
              <div key={i}>
                <div className="aspect-square overflow-hidden rounded-sm mb-2">
                  <img src={s.image} alt={s.label} className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-xs sm:text-sm tracking-wide uppercase opacity-70">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              onClick={() => handleCta("wing-a")}
              className="rounded-full px-6 sm:px-8 py-5 h-auto text-white text-sm tracking-wide uppercase hover:scale-100 whitespace-normal"
              style={{ backgroundColor: "#8B4A2B" }}
            >
              Discover This Wing
            </Button>
          </div>
        </div>
      </section>

      {/* Module B */}
      <section className="py-10 sm:py-16 px-4 sm:px-8" style={{ backgroundColor: "#EFE1CC" }}>
        <div className="max-w-6xl mx-auto pt-10 sm:pt-16">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-sm mb-8">
            <img src="/images/casa-concha/balcony-pool-view.jpg" alt="The Pool & Terraces" className="w-full h-full object-cover" />
          </div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className={`${display.className} text-3xl sm:text-4xl mb-4`}>The Pool &amp; Terraces</h2>
            <p className="opacity-75 font-light leading-relaxed">
              Where the programme pauses. A pool for cooling off between sessions, a sunset deck for evening
              circles, and a BBQ area for the kind of dinners that outlast the itinerary.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {WING_B_STRIP.map((s, i) => (
              <div key={i}>
                <div className="aspect-square overflow-hidden rounded-sm mb-2">
                  <img src={s.image} alt={s.label} className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-xs sm:text-sm tracking-wide uppercase opacity-70">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 pb-10 sm:pb-16">
            <Button
              onClick={() => handleCta("wing-b")}
              className="rounded-full px-6 sm:px-8 py-5 h-auto text-white text-sm tracking-wide uppercase hover:scale-100 whitespace-normal"
              style={{ backgroundColor: "#8B4A2B" }}
            >
              Discover the Pool
            </Button>
          </div>
        </div>
      </section>

      {/* Concierge */}
      <section className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#8B4A2B" }}>
              Retreat Concierge
            </p>
            <h2 className={`${display.className} text-3xl sm:text-4xl mb-6`}>We handle the logistics.</h2>
            <p className="opacity-75 font-light leading-relaxed mb-4">
              With a venue of this standing, we felt it was our duty to offer support that matches it. Catering for
              group meals, airport transfers from Faro, and local activity bookings — all optional, all arranged
              around your programme.
            </p>
            <p className="opacity-75 font-light leading-relaxed">
              Our priority is that you focus on holding the space for your guests. We'll hold everything else.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img src="/images/casa-concha/kitchen-modern-white.jpg" alt="Kitchen at Noma Village" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Surroundings */}
      <section className="py-20 sm:py-28 px-6 sm:px-10" style={{ backgroundColor: "#EFE1CC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#8B4A2B" }}>
              Surroundings
            </p>
            <h2 className={`${display.className} text-3xl sm:text-4xl lg:text-5xl`}>
              The Algarve, <span className="italic">Beyond the Villa</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SURROUNDINGS.map((s, i) => (
              <div key={i}>
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-base mb-1">{s.name}</h3>
                <p className="text-sm opacity-70 font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="enquire" className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#8B4A2B" }}>
            Come and Live the Dream
          </p>
          <h2 className={`${display.className} text-3xl sm:text-4xl lg:text-5xl mb-6`}>
            Need More Information?
          </h2>
          <p className="opacity-70 font-light mb-10">
            Tell us your dates and group size — we'll follow up with availability and full-villa pricing.
          </p>
          <EmailSignupForm source="nomaretreat2" showNames={true} className="max-w-md mx-auto text-left [&_input]:rounded-full" />
          <p className="text-sm mt-8 opacity-60">
            Or write directly to{" "}
            <a href="mailto:hello@nomavillagelagos.com" className="underline">
              hello@nomavillagelagos.com
            </a>
          </p>
        </div>
      </section>

      <footer className="py-10 px-6 sm:px-10 text-center" style={{ backgroundColor: "#2B211B" }}>
        <p className="text-white/40 text-xs tracking-wide">
          Noma Village &middot; Lagos, Algarve, Portugal &middot;{" "}
          <a href="/" className="underline hover:text-white/70">
            nomavillage.com
          </a>
        </p>
      </footer>

      <WhatsAppDirectButton
        messageOverride="Hi! I'm a retreat leader interested in hosting a retreat at Noma Village Lagos."
        source="nomaretreat2"
        tooltip="Questions about hosting your retreat?"
      />
    </div>
  )
}
