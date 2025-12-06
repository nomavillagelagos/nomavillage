import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { MichaelOneMegaHeader } from "@/components/michael1/MegaHeader"

export const metadata: Metadata = {
  title: "Michael-1 | Smart Communication",
  description: "Omnichannel Kommunikation mit und ohne KI – modern, vertrauenswürdig, effektiv.",
  alternates: { canonical: "/michael-1" },
}

export default function MichaelOnePage() {
  return (
    <div className="min-h-screen bg-white">
      <MichaelOneMegaHeader />

      <section className="relative overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0">
          <div className="h-[60vh] md:h-[70vh] w-full bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(255,255,255,0.5),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff2fb0] via-[#c12dff] to-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="mx-auto bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-4 md:p-6 w-full max-w-[720px]">
                  <div className="aspect-[16/10] rounded-2xl bg-white shadow-inner border border-gray-100 relative overflow-hidden">
                    <div className="absolute left-4 right-4 top-4 grid grid-cols-3 gap-3">
                      <div className="h-20 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-100" />
                      <div className="h-20 rounded-xl bg-gradient-to-br from-gray-50 to-emerald-50 border border-gray-100" />
                      <div className="h-20 rounded-xl bg-gradient-to-br from-gray-50 to-rose-50 border border-gray-100" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-[320px] max-w-[80%] bg-[#ff4ec6] text-white rounded-2xl shadow-xl">
                      <div className="p-4">
                        <div className="text-sm font-semibold">botario</div>
                        <div className="mt-2 text-[13px] leading-5 bg-white/10 rounded-lg p-3">Hallo! Wie kann ich helfen?</div>
                        <div className="mt-2 text-[13px] leading-5 bg-white text-gray-800 rounded-lg p-3">Ich benötige einen Termin.</div>
                        <div className="mt-2 text-[13px] leading-5 bg-white/10 rounded-lg p-3">Prima! Um welche Art Termin geht es?</div>
                      </div>
                    </div>
                    <div className="absolute -right-6 -top-6 hidden md:block">
                      <div className="w-28 h-28 rounded-2xl bg-white shadow-xl border border-white/60 grid place-items-center text-[#25D366] font-bold">WA</div>
                    </div>
                    <div className="absolute -left-6 top-10 hidden md:block">
                      <div className="w-24 h-24 rounded-2xl bg-white shadow-xl border border-white/60 grid place-items-center text-[#2F80ED] font-bold">Teams</div>
                    </div>
                    <div className="absolute left-6 bottom-6 hidden md:block">
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-white/60 grid place-items-center text-[#34A853] font-bold">Call</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Kommunikation, die begeistert.
                <br />Über alle Kanäle.
              </h1>
              <p className="font-nunito text-lg md:text-xl text-gray-700 mt-6 max-w-xl">
                Omnichannel mit Telefonie, WhatsApp, Teams & Co. – smart verzahnt, sicher betrieben,
                optional mit vertrauensvoller KI. Für mehr Abschlüsse, bessere Erlebnisse und weniger Aufwand.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#ff2fb0] hover:bg-[#e6289f] text-white">
                  <a href="/contact">Kontakt aufnehmen</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-300 bg-white/80">
                  <a href="/form" target="_blank" rel="noopener noreferrer">Demo anfragen</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-montserrat text-3xl md:text-5xl font-extrabold text-gray-900">
            Von der Idee bis zum Betrieb.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl p-8 bg-gradient-to-br from-fuchsia-50 to-purple-50 border border-white shadow-xl">
              <div className="text-xs font-semibold inline-flex px-3 py-1 rounded-full bg-white/80 border border-white/70 text-gray-900">Strategie</div>
              <h3 className="mt-4 font-montserrat text-2xl font-bold text-gray-900">Beratung & Konzept</h3>
              <p className="mt-3 font-nunito text-gray-700">Use Cases, Journeys, KPIs – wir gestalten den wertstiftenden Einstieg.</p>
            </div>
            <div className="rounded-3xl p-8 bg-gradient-to-br from-rose-50 to-amber-50 border border-white shadow-xl">
              <div className="text-xs font-semibold inline-flex px-3 py-1 rounded-full bg-white/80 border border-white/70 text-gray-900">Umsetzung</div>
              <h3 className="mt-4 font-montserrat text-2xl font-bold text-gray-900">Implementierung</h3>
              <p className="mt-3 font-nunito text-gray-700">Schnell produktiv: Telefonie, Bots, Integrationen und Automatisierung.</p>
            </div>
            <div className="rounded-3xl p-8 bg-gradient-to-br from-emerald-50 to-lime-50 border border-white shadow-xl">
              <div className="text-xs font-semibold inline-flex px-3 py-1 rounded-full bg-white/80 border border-white/70 text-gray-900">Betrieb</div>
              <h3 className="mt-4 font-montserrat text-2xl font-bold text-gray-900">Enablement & Skalierung</h3>
              <p className="mt-3 font-nunito text-gray-700">Training, Monitoring, laufende Optimierung – nachhaltig erfolgreich.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
