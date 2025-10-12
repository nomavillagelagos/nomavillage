'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import posthog from '@/lib/posthog'

interface CTAButtonProps {
  location?: string
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon' | null
}

export function CTAButton({ location = 'unknown', children, className, size = 'lg' }: CTAButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      posthog.capture('cta_clicked', {
        location,
        button_text: children,
        page_url: window.location.pathname
      })
    }
  }

  return (
    <Button
      asChild
      size={size}
      className={className || "bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat"}
    >
      <Link href="/form" onClick={handleClick}>
        {children}
      </Link>
    </Button>
  )
}
