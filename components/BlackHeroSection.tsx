"use client"

import { useInView } from "@/hooks/use-in-view"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function BlackHeroSection() {
  const { ref: blackHeroRef, inView: blackHeroInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { scrollToSection } = useSmoothScroll()

  return (
    <section
      ref={blackHeroRef}
      className="black-hero-section"
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        position: 'relative',
        overflowX: 'hidden',
        padding: '60px 0',
        marginTop: 0,
        marginBottom: 0,
        border: 'none',
        outline: 'none',
        opacity: blackHeroInView ? 1 : 0,
        transform: blackHeroInView ? 'translateX(0)' : 'translateX(-100px)',
        transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="black-hero-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 30px', textAlign: 'center' }}>
        <h2 className="black-hero-title" style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '-0.5px', lineHeight: 1.2, color: '#ffffff', margin: 0, padding: 0 }}>
          Start your days with intention alongside your tribe Yoga, Primal Flows, Beach Walks, or whatever energizes the community that morning
        </h2>
      </div>
    </section>
  )
}
