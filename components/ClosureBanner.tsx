"use client"

import React, { useEffect, useState } from "react"

export default function ClosureBanner({ className = "" }: { className?: string }) {
  const [inView, setInView] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    const t = setTimeout(() => setInView(true), 300)
    return () => clearTimeout(t)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/webhook/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          source: "closure-banner-reopen-notification",
          metadata: { formType: "reopen-notification" },
        }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
        setFirstName("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      aria-live="polite"
      className={`relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div
          className={`rounded-2xl bg-gradient-to-r from-lagos-blue-green to-lagos-pink text-white shadow-xl p-8 md:p-12 lg:p-16 transform transition-transform duration-700 ease-out ${
            inView ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <p className="text-center font-montserrat text-3xl md:text-5xl leading-tight">
            Due to Construction we are closed until further notice
          </p>

          <div className="mt-10 text-center">
            <p className="font-nunito text-lg md:text-xl text-white/90 mb-6">
              Subscribe to be notified when we reopen for season 2026/27
            </p>

            {status === "success" ? (
              <>
                {/* Confirmation popup overlay */}
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setStatus("idle")}>
                  <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-lagos-blue-green/10 mx-auto mb-4">
                      <svg className="w-7 h-7 text-lagos-blue-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="font-montserrat font-bold text-gray-900 text-xl mb-2">Check your inbox!</h3>
                    <p className="font-nunito text-gray-600 text-sm leading-relaxed mb-6">
                      We sent you a confirmation email. Please click the link inside to confirm your subscription and be notified when we reopen for season 2026/27.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="w-full rounded-lg bg-lagos-blue-green hover:bg-lagos-blue-green/90 text-white font-montserrat font-semibold py-3 transition-colors"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 rounded-lg px-4 py-3 font-nunito text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg px-4 py-3 font-nunito text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-lg px-6 py-3 bg-white text-lagos-blue-green font-montserrat font-semibold hover:bg-white/90 transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {status === "loading" ? "Subscribing..." : "Notify Me"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="font-nunito text-white/80 text-sm mt-3">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
