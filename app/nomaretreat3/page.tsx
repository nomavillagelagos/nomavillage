"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import EmailSignupForm from "@/components/email-signup-form"
import WhatsAppDirectButton from "@/components/WhatsAppDirectButton"
import { CalendarClock, Sunrise as SunriseIcon, UtensilsCrossed, Waves, Wind, Moon } from "lucide-react"
import { trackEvent } from "@/components/GoogleAnalytics"

const PERKS = [
  { icon: CalendarClock, label: "Flexible Reschedule", sub: "For weather & travel" },
  { icon: Waves, label: "Private Buyout", sub: "Available on request" },
  { icon: UtensilsCrossed, label: "Welcome Dinner", sub: "Included on arrival" },
  { icon: SunriseIcon, label: "Sunrise Deck Access", sub: "Daily, poolside" },
]

const SPACES = [
  {
    title: "Ensuite Rooms",
    sub: "Comfort, space, and design",
    desc:
      "Private rooms with queen beds, ensuite bathrooms, and balconies — the retreat's quiet corners. Each one designed for real rest between sessions, not just a place to drop a bag.",
    image: "/images/casa-concha/bedroom-sunflower-teal.jpg",
  },
  {
    title: "Poolside Deck",
    sub: "Where the group gathers",
    desc:
      "A red-draped pergola lounge, sun loungers, and a BBQ area. Mornings here start with movement and light; evenings close with the whole group around one table.",
    image: "/images/casa-concha/pool-red-pergola.jpg",
  },
  {
    title: "Communal Kitchen",
    sub: "Shared meals, shared table",
    desc:
      "A fully equipped kitchen with dining for twelve. Bring your own chef, cook together as a group ritual, or let us arrange local catering.",
    image: "/images/casa-concha/kitchen-pink-dining.jpg",
  },
  {
    title: "Yoga & Movement Deck",
    sub: "Practice under open sky",
    desc:
      "An open terrace built for mats, not meeting chairs. Sunrise flows, breathwork, or sound sessions — the garden and pool are your backdrop either way.",
    image: "/sunset-yoga-session-on-portuguese-coast.png",
  },
]

const TAGS = [
  "Sunrise Yoga",
  "Poolside Dips",
  "Communal Feasts",
  "Sound Healing Space",
  "Surf Add-On",
  "Silent Mornings",
  "Cliffside Walks",
  "Sunset Pool Nights",
]

export default function NomaRetreat3() {
  useEffect(() => {
    document.title = "Retreat Hosting at Noma Village | Lagos, Portugal"
  }, [])

  const handleCta = (location: string) => {
    try {
      trackEvent("cta_click", { button_text: "Request Info", page: "nomaretreat3", location })
    } catch {}
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen font-nunito" style={{ backgroundColor: "#FAF3EF", color: "#5B4438" }}>
      <header className="flex items-center justify-between px-6 sm:px-10 py-6">
        <a href="/" className="font-montserrat text-sm font-semibold" style={{ color: "#5B4438" }}>
          Noma Village
        </a>
        <button
          onClick={() => handleCta("header")}
          className="text-xs sm:text-sm font-montserrat px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
          style={{ backgroundColor: "#C98F82" }}
        >
          Request Info
        </button>
      </header>

      {/* Hero */}
      <section className="relative h-[85svh] min-h-[520px] rounded-b-[2.5rem] overflow-hidden mx-2 sm:mx-4">
        <img src="/images/casa-concha/exterior-aerial-pools.jpg" alt="Noma Village villa exterior, Lagos" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/80 text-xs tracking-[0.25em] uppercase mb-4 font-montserrat">
            Retreat Leaders Only
          </p>
          <h1 className="font-montserrat text-white text-4xl sm:text-6xl font-light leading-tight mb-6 max-w-3xl">
            The Place Where Time <span className="italic font-semibold">Slows Down</span>
          </h1>
          <p className="text-white/90 max-w-lg mb-8 font-nunito">
            A Mediterranean-style villa in Lagos, held exclusively for your retreat — two pools, shared tables,
            and space to breathe.
          </p>
          <Button
            size="lg"
            onClick={() => handleCta("hero")}
            className="rounded-full px-8 py-6 h-auto text-white font-montserrat hover:scale-105"
            style={{ backgroundColor: "#C98F82" }}
          >
            Request Retreat Info
          </Button>
        </div>
      </section>

      {/* Perk strip */}
      <section className="px-6 sm:px-10 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8">
          {PERKS.map((p, i) => (
            <div key={i} className="text-center">
              <div className="h-11 w-11 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#F3D9CE" }}>
                <p.icon className="h-5 w-5" style={{ color: "#C98F82" }} />
              </div>
              <p className="font-montserrat text-sm font-semibold leading-tight">{p.label}</p>
              <p className="text-xs opacity-60 mt-1">{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl sm:text-4xl font-light mb-6">
            Welcome to Noma Village, <span className="italic font-semibold">Lagos</span>
          </h2>
          <p className="font-nunito text-base sm:text-lg leading-relaxed opacity-80">
            More than a venue, Noma Village is a Mediterranean-style oasis on the Algarve's dramatic coastline.
            Thanks to a dream location above Lagos, your group will be immersed in golden cliffs, turquoise water,
            and a pace of life built for reconnecting — body, mind, and group.
          </p>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-10 sm:py-16 px-6 sm:px-10" style={{ backgroundColor: "#F3E3DC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase font-montserrat mb-3" style={{ color: "#C98F82" }}>
              Spaces &amp; Rooms
            </p>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-light">Sumérgete en la experiencia</h2>
            <p className="font-nunito opacity-70 mt-2">Immerse your group in every corner of the villa</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SPACES.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-montserrat tracking-wide uppercase mb-1" style={{ color: "#C98F82" }}>
                    {s.sub}
                  </p>
                  <h3 className="font-montserrat text-xl sm:text-2xl font-semibold mb-3">{s.title}</h3>
                  <p className="font-nunito text-sm sm:text-base opacity-75 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retreat experience tags */}
      <section className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase font-montserrat mb-3" style={{ color: "#C98F82" }}>
            Your Retreat Experience
          </p>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-light mb-10">
            Self-care as a way of life
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TAGS.map((t, i) => (
              <span
                key={i}
                className="font-montserrat text-sm px-5 py-3 rounded-full"
                style={{ backgroundColor: "#F3D9CE", color: "#5B4438" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 sm:py-28 px-6 sm:px-10" style={{ backgroundColor: "#F3E3DC" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
            <img src="/stunning-lagos-portugal-coastline-with-golden-clif.png" alt="Lagos coastline near Noma Village" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4" style={{ color: "#C98F82" }}>
              <Wind className="h-5 w-5" />
              <Moon className="h-5 w-5" />
            </div>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-light mb-6">
              The best beaches in the south of the Algarve
            </h2>
            <p className="font-nunito opacity-75 leading-relaxed mb-4">
              Praia Dona Ana and Praia do Camilo — two of Portugal's most photographed coves — are a short drive
              from the villa. Ponta da Piedade's sea caves and golden cliffs are close by too.
            </p>
            <p className="font-nunito opacity-75 leading-relaxed">
              The colors, flavors, and pace of the Algarve show up in everything here — from the meals we share to
              the way mornings unfold on the terrace.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter-style inquiry */}
      <section id="enquire" className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl sm:text-4xl font-light mb-3">Request Retreat Info</h2>
          <p className="font-nunito opacity-70 mb-10">
            Share your dates and group size — we'll reply with availability and full-villa pricing.
          </p>
          <EmailSignupForm source="nomaretreat3" showNames={true} className="max-w-md mx-auto text-left [&_input]:rounded-full [&_button]:rounded-full" />
          <p className="text-sm mt-8 opacity-60">
            Or reach us directly at{" "}
            <a href="mailto:hello@nomavillagelagos.com" className="underline">
              hello@nomavillagelagos.com
            </a>
          </p>
        </div>
      </section>

      <footer className="py-10 px-6 sm:px-10 text-center rounded-t-[2.5rem] mx-2 sm:mx-4" style={{ backgroundColor: "#5B4438" }}>
        <p className="text-white font-montserrat text-sm mb-1">Noma Village</p>
        <p className="text-white/60 text-xs">
          Lagos, Algarve, Portugal &middot;{" "}
          <a href="/" className="underline hover:text-white/90">
            nomavillage.com
          </a>
        </p>
      </footer>

      <WhatsAppDirectButton
        messageOverride="Hi! I'm a retreat leader interested in hosting a retreat at Noma Village Lagos."
        source="nomaretreat3"
        tooltip="Questions about hosting your retreat?"
      />
    </div>
  )
}
