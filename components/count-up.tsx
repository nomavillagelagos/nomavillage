"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  end: number
  duration?: number
  className?: string
}

export function CountUp({ end, duration = 2000, className = "" }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Immediate check in case the element is already in view on mount
    const checkInViewNow = () => {
      if (!elementRef.current || hasAnimated) return
      const rect = elementRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const elementHalf = rect.height / 2
      const topVisible = rect.top >= 0 && rect.top <= viewportHeight - elementHalf
      const bottomVisible = rect.bottom >= elementHalf && rect.bottom <= viewportHeight
      if ((topVisible || bottomVisible) && !hasAnimated) {
        setIsVisible(true)
        setHasAnimated(true)
      }
    }

    checkInViewNow()

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true)
        setHasAnimated(true)
      }
    }, {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px"
    })

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasAnimated])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut)
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end) // Ensure we end exactly at the target value
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={elementRef} className={className}>
      {count}
    </div>
  )
}
