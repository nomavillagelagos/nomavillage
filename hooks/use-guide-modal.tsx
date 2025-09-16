'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useGuideModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const pathname = usePathname()
  // Enabled by default; set to 'false' to disable globally
  const autoOpenEnabled = process.env.NEXT_PUBLIC_ENABLE_GUIDE_MODAL_AUTOOPEN !== 'false'
  const STORAGE_KEY = 'guide-modal-shown-v2'

  useEffect(() => {
    if (!autoOpenEnabled) {
      // Auto-open disabled globally via env flag; ensure modal stays closed
      console.debug('[GuideModal] Auto-open disabled via env flag')
      setIsModalOpen(false)
      setHasShown(true)
      return
    }
    // Check if modal has already been shown in this session
    const modalShown = sessionStorage.getItem(STORAGE_KEY)
    if (modalShown) {
      console.debug('[GuideModal] Already shown this session (storage key present)')
      setHasShown(true)
      return
    }

    // Auto-open after 75% scroll OR 20 seconds on page (whichever first)
    const OPEN_AFTER_MS = 20000
    let timer: NodeJS.Timeout | undefined

    const openOnce = () => {
      if (hasShown) return
      console.debug('[GuideModal] Opening modal (scroll/timer condition met)')
      setIsModalOpen(true)
      setHasShown(true)
      sessionStorage.setItem(STORAGE_KEY, 'true')
      window.removeEventListener('scroll', onScroll)
      if (timer) clearTimeout(timer)
    }

    const onScroll = () => {
      const doc = document.documentElement
      const progress = (window.scrollY + window.innerHeight) / (doc.scrollHeight || 1)
      // Log every ~10% increments to avoid noise
      if (Math.abs(progress - (window as any)._gm_lastLoggedProgress || 0) >= 0.1) {
        console.debug('[GuideModal] Scroll progress', progress.toFixed(2))
        ;(window as any)._gm_lastLoggedProgress = progress
      }
      if (progress >= 0.75) {
        openOnce()
      }
    }
    // Timer fallback: open after 20s on page
    timer = setTimeout(() => {
      console.debug('[GuideModal] 20s timer reached')
      openOnce()
    }, OPEN_AFTER_MS)

    console.debug('[GuideModal] Auto-open initialized', { OPEN_AFTER_MS, STORAGE_KEY, pathname })
    window.addEventListener('scroll', onScroll, { passive: true })
    // Initial check in case user is already deep on page
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer) clearTimeout(timer)
    }
  }, [pathname, hasShown, autoOpenEnabled]) // Re-run when pathname or flag changes

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    closeModal
  }
}
