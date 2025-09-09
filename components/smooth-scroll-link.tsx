"use client"

import React from "react"
import Link from "next/link"

type Props = {
  to: string
  duration?: number // in ms
  offset?: number
  className?: string
  children: React.ReactNode
}

export default function SmoothScrollLink({ to, duration = 1200, offset = 0, className, children }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!to.startsWith("#")) return
    e.preventDefault()
    const target = document.querySelector<HTMLElement>(to)
    if (!target) return

    const startY = window.scrollY || window.pageYOffset
    const targetRect = target.getBoundingClientRect()
    const targetY = startY + targetRect.top - offset
    const startTime = performance.now()

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = easeInOutCubic(progress)
      const currentY = startY + (targetY - startY) * eased
      window.scrollTo({ top: currentY })
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  return (
    <Link href={to} onClick={handleClick} className={className} scroll={false}>
      {children}
    </Link>
  )
}
