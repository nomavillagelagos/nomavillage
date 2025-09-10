import { useCallback } from 'react'

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    scrollToElement(sectionId, 80) // 80px offset for better visual positioning
  }, [scrollToElement])

  return { scrollToElement, scrollToSection }
}
