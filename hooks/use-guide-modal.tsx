'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useGuideModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check if modal has already been shown in this session
    const modalShown = sessionStorage.getItem('guide-modal-shown')
    if (modalShown) {
      setHasShown(true)
      return
    }

    // Get accumulated time from previous pages
    const accumulatedTime = parseInt(sessionStorage.getItem('page-time-accumulated') || '0')
    
    // Set start time for current page
    const pageStartTime = Date.now()
    setStartTime(pageStartTime)

    // Calculate remaining time needed (8 seconds total - accumulated time)
    const remainingTime = Math.max(0, 8000 - accumulatedTime)

    let timer: NodeJS.Timeout

    if (remainingTime > 0) {
      // Set timer for remaining time
      timer = setTimeout(() => {
        if (!hasShown) {
          setIsModalOpen(true)
          setHasShown(true)
          sessionStorage.setItem('guide-modal-shown', 'true')
        }
      }, remainingTime)
    } else {
      // If we've already spent 25+ seconds, show immediately
      setIsModalOpen(true)
      setHasShown(true)
      sessionStorage.setItem('guide-modal-shown', 'true')
    }

    // Cleanup function to save time spent on this page
    return () => {
      if (timer) clearTimeout(timer)
      
      if (pageStartTime && !hasShown) {
        const timeSpentOnPage = Date.now() - pageStartTime
        const newAccumulatedTime = accumulatedTime + timeSpentOnPage
        sessionStorage.setItem('page-time-accumulated', newAccumulatedTime.toString())
      }
    }
  }, [pathname, hasShown]) // Re-run when pathname changes

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    closeModal
  }
}
