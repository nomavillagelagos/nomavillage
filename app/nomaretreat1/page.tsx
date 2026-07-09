"use client"

import { useEffect } from "react"
import { Playfair_Display, Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import EmailSignupForm from "@/components/email-signup-form"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import { Sunrise, UtensilsCrossed, Laptop, Waves, Mountain, Wine } from "lucide-react"
import { trackEvent } from "@/components/GoogleAnalytics"

const serif = Playfair_Display({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] })
const sans = Inter({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600"] })

const SPACES = [
  {
    icon: Sunrise,
    title: "Pool Terrace",
    desc: "A red-draped pergola lounge and pool deck, built for sunset circles or a closing-night toast.",
    image: "/images/casa-concha/pool-red-pergola.jpg",
  },
  {
    icon: UtensilsCrossed,
    title: "Communal Kitchen & Dining",
    desc: "A fully equipped kitchen with a long dining table for twelve — built for shared meals, not room service.",
    image: "/images/casa-concha/kitchen-pink-dining.jpg",
  },
  {
    icon: Laptop,
    title: "The Lounge Den",
    desc: "Our living room becomes your breakout space — sofas rearranged, cushions in, ready for circles and sessions.",
    image: "/images/casa-concha/living-blue-velvet.jpg",
  },
  {
    icon: Waves,
    title: "Pool-View Rooms",
    desc: "Private ensuite rooms with queen beds and doors onto the garden, so every guest wakes up beside the pool.",
    image: "/images/casa-concha/bedroom-teal-headboard-view.jpg",
  },
]

const EXPERIENCES = [
  { icon: Waves, title: "Surf Sessions", desc: "World-class breaks minutes away, with boards and guides on call." },
  { icon: Mountain, title: "Cliffside Walks", desc: "Golden cliffs and hidden coves along the Ponta da Piedade trail." },
  { icon: Wine, title: "Historic Lagos", desc: "Cobblestone streets, local wine, and a fishing-town marina at dusk." },
]

const GALLERY = [
  "/images/casa-concha/exterior-aerial-pools.jpg",
  "/images/casa-concha/balcony-pool-view.jpg",
  "/images/casa-concha/bathroom-marble-walkin.jpg",
  "/images/casa-concha/bedroom-teal-bench-lemon.jpg",
  "/images/casa-concha/pool-night.jpg",
  "/images/casa-concha/dining-studio-orchid.jpg",
]

export default function NomaRetreat1() {
  useEffect(() => {
    document.title = "Host Your Retreat | Noma Village Lagos"
  }, [])

  const handleCta = (location: string) => {
    try {
      trackEvent("cta_click", { button_text: "Enquire About Hosting", page: "nomaretreat1", location })
    } catch {}
    const el = document.getElementById("enquire")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={`${sans.className} min-h-screen`} style={{ backgroundColor: "#FBF6F1", color: "#221B18" }}>
      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 py-6">
        <a href="/" className="text-white tracking-[0.2em] text-xs sm:text-sm uppercase font-medium">
          Noma Village
        </a>
        <button
          onClick={() => handleCta("header")}
          className="text-white text-xs sm:text-sm tracking-wide uppercase border border-white/60 px-4 py-2 hover:bg-white hover:text-[#7A2E43] transition-colors"
        >
          Enquire
        </button>
      </header>

      {/* Hero */}
      <section className="relative h-[100svh] min-h-[560px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/casa-concha/exterior-daytime.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        </div>
        <div className="relative z-10 px-6 sm:px-10 pb-16 sm:pb-24 max-w-4xl">
          <p className="text-white/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            Noma Village &middot; Lagos, Portugal
          </p>
          <h1 className={`${serif.className} text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6`}>
            A Retreat Above<br />the Ordinary
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mb-8 font-light leading-relaxed">
            A private villa in Lagos, Algarve, held for retreat leaders who want their group somewhere
            unmistakably beautiful — and entirely their own.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="text-white font-medium text-sm sm:text-base tracking-wide uppercase px-8 py-6 h-auto rounded-none hover:scale-100"
              style={{ backgroundColor: "#7A2E43" }}
              onClick={() => handleCta("hero")}
            >
              Enquire About Hosting
            </Button>
            <button
              onClick={() => document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" })}
              className="text-white text-sm sm:text-base tracking-wide uppercase px-8 py-6 border border-white/70 hover:bg-white/10 transition-colors"
            >
              See the Spaces
            </button>
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C9A15A" }}>
              Lead in Elegance
            </p>
            <h2 className={`${serif.className} text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6`}>
              Your retreat deserves a setting that matches the work.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed opacity-80 font-light mb-4">
              Noma Village sits in Lagos, on Portugal's Algarve coast, minutes from golden cliffs and beaches. We
              built it as a home for a community of remote professionals — which means every space was already
              designed for gathering: a kitchen built for shared meals, a pool terrace built for sunset, rooms
              built for rest.
            </p>
            <p className="text-base sm:text-lg leading-relaxed opacity-80 font-light">
              For a week or a weekend, the whole villa becomes your retreat's private world. No shared common areas
              with strangers, no hotel conference room — just your group, two pools, and the work you came here to do.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/images/casa-concha/exterior-full-villa.jpg"
              alt="Noma Village villa exterior in Lagos, Portugal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Spaces grid */}
      <section id="spaces" className="py-20 sm:py-28 px-6 sm:px-10" style={{ backgroundColor: "#F3E9DE" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C9A15A" }}>
              The Villa
            </p>
            <h2 className={`${serif.className} text-3xl sm:text-4xl lg:text-5xl`}>Spaces Built for Groups</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {SPACES.map((s, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[16/10] overflow-hidden mb-5">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <s.icon className="h-5 w-5 mt-1 shrink-0" style={{ color: "#7A2E43" }} />
                  <div>
                    <h3 className={`${serif.className} text-xl sm:text-2xl mb-2`}>{s.title}</h3>
                    <p className="text-sm sm:text-base opacity-75 font-light leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle band */}
      <section className="relative py-32 sm:py-44 px-6 sm:px-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('/images/casa-concha/pool-palms.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className={`${serif.className} text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6`}>
            A life of leisure, reimagined for retreats.
          </h2>
          <p className="text-white/90 text-base sm:text-lg font-light leading-relaxed">
            Between sessions, your group unwinds by the pool, joins a sunset yoga flow on the terrace, or walks the
            cliffs at golden hour. The pace is set by you — we simply hold the space.
          </p>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C9A15A" }}>
              Beyond the Villa
            </p>
            <h2 className={`${serif.className} text-3xl sm:text-4xl lg:text-5xl`}>Experiences Nearby</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {EXPERIENCES.map((e, i) => (
              <div key={i} className="text-center px-4">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "#F3E9DE" }}
                >
                  <e.icon className="h-6 w-6" style={{ color: "#7A2E43" }} />
                </div>
                <h3 className={`${serif.className} text-xl sm:text-2xl mb-2`}>{e.title}</h3>
                <p className="text-sm sm:text-base opacity-75 font-light">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 sm:pb-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY.map((src, i) => (
              <div key={i} className={`overflow-hidden ${i === 0 ? "col-span-2 sm:col-span-1 aspect-[16/10] sm:aspect-square" : "aspect-square"}`}>
                <img src={src} alt="Noma Village Lagos" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="enquire" className="py-20 sm:py-28 px-6 sm:px-10" style={{ backgroundColor: "#221B18" }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C9A15A" }}>
            Reserve the Villa
          </p>
          <h2 className={`${serif.className} text-white text-3xl sm:text-4xl lg:text-5xl mb-6`}>
            Tell Us About Your Retreat
          </h2>
          <p className="text-white/70 font-light mb-10">
            Share your dates and group size — we'll follow up with availability and full-buyout pricing.
          </p>
          <EmailSignupForm
            source="nomaretreat1"
            showNames={true}
            className="max-w-md mx-auto text-left [&_input]:rounded-none"
          />
          <p className="text-white/50 text-sm mt-8">
            Prefer to talk directly?{" "}
            <a href="mailto:hello@nomavillagelagos.com" className="underline hover:text-white">
              hello@nomavillagelagos.com
            </a>
          </p>
        </div>
      </section>

      <footer className="py-10 px-6 sm:px-10 text-center" style={{ backgroundColor: "#221B18" }}>
        <p className="text-white/40 text-xs tracking-wide">
          Noma Village &middot; Lagos, Algarve, Portugal &middot;{" "}
          <a href="/" className="underline hover:text-white/70">
            nomavillage.com
          </a>
        </p>
      </footer>

      <WhatsAppDirectButton
        messageOverride="Hi! I'm a retreat leader interested in hosting a retreat at Noma Village Lagos."
        source="nomaretreat1"
        tooltip="Questions about hosting your retreat?"
      />
    </div>
  )
}
