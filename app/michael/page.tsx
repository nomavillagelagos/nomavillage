import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Michael | Smart Communication",
  description: "Smarte Kommunikation. Vertrauensvolle KI. Echter Mehrwert.",
  alternates: { canonical: "/michael" },
}

export default function MichaelPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4b00ff] via-[#6e2cff] to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 md:p-8 border border-white/50">
                <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center text-purple-600 font-montserrat font-semibold">
                  Demo UI
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 opacity-90">
                  <div className="h-10 rounded-xl bg-gradient-to-tr from-blue-50 to-purple-50" />
                  <div className="h-10 rounded-xl bg-gradient-to-tr from-emerald-50 to-lime-50" />
                  <div className="h-10 rounded-xl bg-gradient-to-tr from-amber-50 to-rose-50" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Smarte Kommunikation.
                <br />Vertrauensvolle KI.
                <br />Echter Mehrwert.
              </h1>
              <p className="font-nunito text-lg md:text-xl text-gray-700 mt-6 max-w-xl">
                Intelligente und sichere Kommunikationslösungen, ob mit oder ohne KI, die Ihre Prozesse
                vereinfachen und skalierbar mitwachsen.
              </p>
              <div className="mt-8 flex gap-4">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <a href="/contact">Kontakt aufnehmen</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-300">
                  <a href="/form" target="_blank" rel="noopener noreferrer">Jetzt starten</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product portfolio */}
      <section className="py-16 md:py-24 bg-[#2600a3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-center font-montserrat text-3xl md:text-5xl font-extrabold">
            Unser Produktportfolio in Kürze.
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-sky-50 to-purple-50 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-gray-900 border border-white/60">
                BUSINESS TELEFONIE
              </div>
              <h3 className="mt-4 font-montserrat text-xl md:text-2xl font-bold text-gray-900">
                Cloud Telefonie & SIP Trunking
              </h3>
              <p className="mt-3 font-nunito text-gray-700">
                Intelligente Kommunikation für moderne Unternehmen – flexibel, skalierbar und zuverlässig.
              </p>
              <div className="mt-6">
                <Button asChild className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                  <a href="#">Smarter kommunizieren</a>
                </Button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-lime-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-gray-900 border border-white/60">
                INTELLIGENT ASSISTANT
              </div>
              <h3 className="mt-4 font-montserrat text-xl md:text-2xl font-bold text-gray-900">
                Nia & botario
              </h3>
              <p className="mt-3 font-nunito text-gray-700">
                Stärken Sie Ihr Business mit intelligentem Support und KI-gestützter Automatisierung.
              </p>
              <div className="mt-6">
                <Button asChild className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                  <a href="#">Automatisieren mit KI</a>
                </Button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-gray-900 border border-white/60">
                CUSTOMER ENGAGEMENT
              </div>
              <h3 className="mt-4 font-montserrat text-xl md:text-2xl font-bold text-gray-900">
                Contact Center
              </h3>
              <p className="mt-3 font-nunito text-gray-700">
                Großartige Gespräche beginnen hier – nahtlose, KI-gestützte Omnichannel-Erlebnisse.
              </p>
              <div className="mt-6">
                <Button asChild className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                  <a href="#">Besten Service liefern</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
