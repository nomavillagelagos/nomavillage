'use client'

import { useEffect } from 'react'

export function LocationHighlights() {
  const items = [
    { icon: '🏖️', title: '15-minute walk to Praia Porto de Mós', desc: "One of the Algarve's most iconic beaches" },
    { icon: '🌊', title: 'Surrounded by world-famous golden cliffs', desc: 'Dramatic coastline right on your doorstep' },
    { icon: '🏛️', title: '15-minute walk to Lagos historic center', desc: 'Cafés, culture, and charming streets' },
    { icon: '✈️', title: '1 hour from Faro Airport', desc: 'Easy access for national and international flights' },
    { icon: '🏄‍♀️', title: 'Surf breaks within walking distance', desc: 'Multiple spots for all levels nearby' },
    { icon: '🍽️', title: 'Restaurants & nightlife next door', desc: 'Vibrant food scene and evening energy' },
  ]

  useEffect(() => {
    const cards = document.querySelectorAll('.loc-card')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', 'translate-y-0')
            e.target.classList.remove('opacity-0', 'translate-y-4')
          }
        })
      },
      { threshold: 0.2 }
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
      {items.map((it, i) => (
        <div
          key={i}
          className="loc-card opacity-0 translate-y-4 transition-all duration-500 ease-out border rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-full bg-lagos-aquamarine/20 flex items-center justify-center text-lg">
              <span aria-hidden>{it.icon}</span>
            </div>
            <h4 className="font-montserrat font-semibold text-gray-900 text-base">{it.title}</h4>
          </div>
          <p className="font-nunito text-sm text-gray-600">{it.desc}</p>
        </div>
      ))}
    </div>
  )
}
