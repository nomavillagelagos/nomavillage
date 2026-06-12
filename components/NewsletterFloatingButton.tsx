"use client"

import React, { useEffect, useRef, useState } from "react"
import { captureWithAttribution, trackEventWithAttribution } from "@/lib/track"

export default function NewsletterFloatingButton() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/webhook/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "floating-newsletter-btn" }),
      })
      if (!res.ok) throw new Error("failed")
      captureWithAttribution("newsletter_signup", { source: "floating-newsletter-btn" })
      trackEventWithAttribution("newsletter_signup", { source: "floating-newsletter-btn" })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      ref={panelRef}
      className={`fixed bottom-6 right-6 z-[60] transition-all duration-300 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* Expanded panel */}
      <div
        className={`absolute bottom-[calc(100%+12px)] right-0 w-72 rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 ease-out origin-bottom-right ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="bg-gradient-to-br from-lagos-blue-green to-[#4FA5B0] p-4">
          <p className="font-montserrat font-semibold text-white text-sm leading-snug">
            Get notified when we reopen for season 26/27
          </p>
          <p className="font-nunito text-white/85 text-xs mt-1">
            Subscribe to our newsletter and be the first to know.
          </p>
        </div>

        <div className="p-4">
          {status === "success" ? (
            <p className="font-nunito text-center text-green-600 text-sm font-semibold py-2">
              You&apos;re on the list! We&apos;ll let you know when we reopen.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-nunito focus:outline-none focus:ring-2 focus:ring-lagos-blue-green"
              />
              {status === "error" && (
                <p className="text-red-500 text-xs font-nunito">Something went wrong. Try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-lagos-blue-green hover:bg-lagos-blue-green/90 text-white font-montserrat font-semibold text-sm py-2 transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing…" : "Notify me"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Collapsed trigger button — same dimensions as WhatsApp button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Get notified when we reopen"
        title="Get notified when we reopen for season 26/27"
        className="group relative inline-flex items-center justify-center rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lagos-blue-green transition-all duration-200 ease-out hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#3db4af",
          width: "3.25rem",
          height: "3.25rem",
        }}
      >
        {/* Pulsing aura */}
        <span className="absolute -inset-1 rounded-full bg-[#3db4af] opacity-20 blur-md animate-pulse" aria-hidden="true" />

        {/* Bell icon */}
        <svg
          className="relative z-10 h-6 w-6 md:h-7 md:w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Tooltip */}
        <span className="pointer-events-none absolute -top-10 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
          Get notified — season 26/27
        </span>
      </button>
    </div>
  )
}
