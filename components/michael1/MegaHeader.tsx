"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type MenuKey = "products" | "solutions" | "resources" | null

export function MichaelOneMegaHeader() {
  const [open, setOpen] = useState<MenuKey>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-[1000]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 md:mt-6 rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <a href="/michael-1" className="flex items-center gap-2 font-montserrat font-extrabold text-gray-900">
              <span className="inline-block w-6 h-6 rounded-md bg-gradient-to-br from-[#ff2fb0] to-[#c12dff]" />
              Michael One
            </a>

            <nav className="hidden lg:flex items-center gap-6 text-[1.1rem]">
              <button
                onMouseEnter={() => setOpen("products")}
                onClick={() => setOpen("products")}
                className={`font-semibold ${open === "products" ? "text-gray-900" : "text-gray-800 hover:text-gray-900"}`}
              >
                Products
              </button>
              <button
                onMouseEnter={() => setOpen("solutions")}
                onClick={() => setOpen("solutions")}
                className={`font-semibold ${open === "solutions" ? "text-gray-900" : "text-gray-800 hover:text-gray-900"}`}
              >
                Solutions
              </button>
              <button
                onMouseEnter={() => setOpen("resources")}
                onClick={() => setOpen("resources")}
                className={`font-semibold ${open === "resources" ? "text-gray-900" : "text-gray-800 hover:text-gray-900"}`}
              >
                Resources
              </button>
              <Button asChild className="rounded-full bg-[#ff2fb0] hover:bg-[#e6289f]">
                <a href="#">Get started</a>
              </Button>
            </nav>

            {/* Mobile simple toggle */}
            <details className="lg:hidden">
              <summary className="list-none cursor-pointer rounded-xl px-3 py-2 border border-gray-300 text-gray-800">Menu</summary>
              <div className="mt-3 rounded-2xl border border-gray-200 bg-white shadow-lg p-3">
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Products</div>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Cloud PBX</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Chatbots</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Contact Center</a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Solutions</div>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Lead Generation</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Service Automation</a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Resources</div>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Blog</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="#">Guides</a>
                  </div>
                  <Button asChild className="w-full bg-[#ff2fb0] hover:bg-[#e6289f]">
                    <a href="#">Get started</a>
                  </Button>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Backdrop that closes only when clicking outside */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[900]" // below header (z-[1000]) but above page content
            onClick={() => setOpen(null)}
            aria-hidden
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Panels */}
              {open === "products" && (
                <div className="absolute left-0 right-0 max-h-[75vh] overflow-auto mt-3 rounded-3xl border border-gray-100 bg-white shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-base font-semibold text-gray-500">Telephony</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Cloud PBX</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">SIP Trunking</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Call Recording</a>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-500">Bots & Automation</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Chatbots</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Voicebots</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Workflow Studio</a>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-500">Contact Center</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Omnichannel Inbox</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Routing & IVR</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Analytics</a>
                  </div>
                </div>
              )}
              {open === "solutions" && (
                <div className="absolute left-0 right-0 max-h-[75vh] overflow-auto mt-3 rounded-3xl border border-gray-100 bg-white shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-base font-semibold text-gray-500">By Goal</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Lead Generation</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Service Automation</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Sales Acceleration</a>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-500">By Industry</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Healthcare</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Retail & E‑commerce</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Hospitality</a>
                  </div>
                </div>
              )}
              {open === "resources" && (
                <div className="absolute left-0 right-0 max-h-[75vh] overflow-auto mt-3 rounded-3xl border border-gray-100 bg-white shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-base font-semibold text-gray-500">Learn</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Blog</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Guides</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Webinars</a>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-500">Company</div>
                    <a className="block mt-3 rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">About</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Careers</a>
                    <a className="block rounded-xl p-3 hover:bg-gray-50 text-[1.125rem]" href="#">Press</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
