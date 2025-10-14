"use client"

import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function HeroButtons() {
  const { scrollToSection } = useSmoothScroll()

  return (
    <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        size="lg"
        className="w-full sm:flex-1 sm:w-auto sm:min-w-[200px] text-black font-montserrat text-lg px-8 py-3 h-auto cta-boost cta-swipe cta-swipe--to-white"
        style={{ backgroundColor: '#50bbb7' }}
        onClick={() => { 
          scrollToSection('coming-up') 
        }}
      >
        Join Our Community
      </Button>
      <Button
        size="lg"
        className="w-full sm:flex-1 sm:w-auto sm:min-w-[200px] bg-white/10 text-white font-montserrat text-lg px-8 py-3 h-auto relative overflow-hidden group transition-colors border border-white/90"
        onClick={() => {
          scrollToSection('stay-connected')
        }}
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Get the Guide</span>
        <span className="pointer-events-none absolute inset-0 -z-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:-translate-x-full group-hover:before:translate-x-0 before:transition-transform before:duration-300 before:ease-out"></span>
      </Button>
    </div>
  )
}
