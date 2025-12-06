"use client"

import React, { useEffect, useMemo, useState } from "react"
import { captureWithAttribution, trackEventWithAttribution } from "@/lib/track"

export interface WhatsAppDirectButtonProps {
  phoneNumber?: string // E.164 with plus, e.g., "+4915784928200"
  messagePreset?: "october_interest" | "yoga_surf_questions" | "more_info_october"
  messageOverride?: string // If provided, overrides preset
  source?: string
  className?: string
  tooltip?: string
  bottomOffsetClass?: string // e.g., "bottom-5"
  rightOffsetClass?: string // e.g., "right-5"
}

const PRESET_MESSAGES: Record<NonNullable<WhatsAppDirectButtonProps["messagePreset"]>, string> = {
  october_interest: "Hi! I'm interested in the October 2025 Noma coliving program",
  yoga_surf_questions: "Hi! I have questions about the yoga & surf coliving in Lagos",
  more_info_october: "Hi! I'd like to know more about joining Noma in October",
}

export default function WhatsAppDirectButton({
  phoneNumber = "+31630440768",
  messagePreset = "october_interest",
  messageOverride,
  source = "floating_button",
  className = "",
  tooltip = "Questions? WhatsApp me directly",
  bottomOffsetClass = "bottom-6",
  rightOffsetClass = "right-6",
}: WhatsAppDirectButtonProps) {
  const message = useMemo(() => messageOverride ?? PRESET_MESSAGES[messagePreset], [messageOverride, messagePreset])

  const waNumber = useMemo(() => phoneNumber.replace(/[^\d]/g, ""), [phoneNumber])
  const waUrl = useMemo(() => `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, [waNumber, message])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Analytics: PostHog + GA wrappers include UTMs + variant automatically
    const eventProps = {
      phone_number: phoneNumber,
      source,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
      timestamp: Date.now(),
    }

    captureWithAttribution("whatsapp_direct_clicked", eventProps)
    trackEventWithAttribution("whatsapp_direct_clicked", eventProps)
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`fixed ${bottomOffsetClass} ${rightOffsetClass} z-[60]`}
      aria-live="polite"
    >
      <a
        href={waUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title={tooltip}
        className={`group relative inline-flex items-center justify-center rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 ${className} transition-all duration-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{
          backgroundColor: "#25D366",
          width: "3.25rem", // ~52px default mobile
          height: "3.25rem",
        }}
      >
        {/* Pulsing aura */}
        <span className="absolute inset-0 rounded-full ring-0 group-hover:ring-0" aria-hidden="true" />
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-20 blur-md animate-pulse" aria-hidden="true" />

        {/* Official WhatsApp Logo (inline SVG), keep sizes the same */}
        <svg
          className="relative z-10 h-6 w-6 md:h-7 md:w-7"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <title>WhatsApp</title>
          <path
            fill="#FFFFFF"
            d="M19.11 17.41c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.09-.16.19-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.4-1.64-1.57-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.27-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.92 2.94 4.66 4 .65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.63-.66 1.86-1.29.23-.63.23-1.17.16-1.29-.07-.12-.25-.2-.53-.34zM16.06 28c-2.08 0-4.11-.56-5.89-1.63l-6.09 1.93 1.98-5.93C4.88 20.47 4.33 18.5 4.33 16.44 4.33 9.93 9.93 4.33 16.44 4.33c3.21 0 6.21 1.25 8.47 3.51 2.26 2.26 3.51 5.26 3.51 8.47 0 6.51-5.6 12.11-12.11 12.11zm9.31-21.42C22.9 3.11 19.61 2 16.44 2 8.83 2 2.67 8.16 2.67 15.78c0 2.31.6 4.58 1.73 6.58L2 30l7.86-2.06c1.93 1.05 4.12 1.6 6.2 1.6h.01c7.62 0 13.78-6.16 13.78-13.78 0-3.68-1.43-7.14-4.18-9.76z"
          />
        </svg>

        {/* Tooltip (optional, enhanced beyond native title) */}
        <span className="pointer-events-none absolute -top-10 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
          {tooltip}
        </span>
      </a>
    </div>
  )
}
