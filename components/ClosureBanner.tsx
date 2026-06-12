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
              <p className="font-montserrat text-white text-lg font-semibold">
                You're on the list! We'll let you know when we reopen.
              </p>
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
