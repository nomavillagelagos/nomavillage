"use client"

import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { ChevronDown } from "lucide-react"

export default function HeroButtons() {
  const { scrollToSection } = useSmoothScroll()

  return (
    <div className="mt-6 md:mt-8 max-w-xl mx-auto space-y-6">
      {/* Single Primary CTA */}
      <div className="flex justify-center">
        <Button
          size="lg"
          className="w-[280px] sm:w-auto sm:min-w-[280px] text-white font-semibold
                     bg-lagos-blue-green hover:bg-lagos-blue-green/90
                     font-montserrat text-lg px-10 md:py-4 py-3 h-auto
                     shadow-2xl hover:shadow-lagos-blue-green/20 transform hover:scale-105
                     transition-all duration-200 border-2 border-lagos-blue-green/20"
          onClick={() => scrollToSection('coming-up')}
        >
          Join Our Community
        </Button>
      </div>


    </div>
  )
}
