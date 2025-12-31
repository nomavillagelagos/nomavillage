"use client"

import React, { useEffect, useState } from "react"

export default function ClosureBanner({ className = "" }: { className?: string }) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setInView(true), 300)
    return () => clearTimeout(t)
  }, [])

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
        </div>
      </div>
    </section>
  )
}
