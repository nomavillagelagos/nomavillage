"use client"

import React from "react"
import FAQSection from "@/components/FAQ"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FAQSection title="All Frequently Asked Questions" showViewAllLink={false} />
      <Footer />
    </div>
  )
}
