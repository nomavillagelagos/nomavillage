"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Script from "next/script"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/coliving", label: "Coliving" },
    { href: "/coworking", label: "Coworking" },
    { href: "/rooms", label: "Rooms" },
    { href: "/community", label: "Community" },
  ]

  return (
    <nav className="bg-transparent backdrop-blur-sm border-b border-transparent absolute top-4 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-lagos-aquamarine/20 backdrop-blur-sm shadow-sm px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">

              <Image
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={50}
              />

            <span className="font-caveat text-2xl font-bold text-lagos-amber">Noma Village</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-stretch">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-montserrat font-semibold text-gray-800 hover:text-white hover:bg-lagos-blue-green inline-flex items-center h-16 px-5 transition-colors duration-300 rounded-none"
              >
                {item.label}
              </Link>
            ))}
            <Button
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat inline-flex items-center h-16 px-5 rounded-none"
              data-fillout-id="aKuWaUwvaVus"
              data-fillout-embed-type="slider"
              data-fillout-slider-direction="right"
              data-fillout-inherit-parameters
              data-fillout-popup-size="medium"
            >
              Join Us
            </Button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-0 pt-2 pb-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block w-full px-4 py-3 font-montserrat font-semibold text-gray-800 hover:text-white hover:bg-lagos-blue-green rounded-none transition-colors duration-300 bg-lagos-aquamarine/20"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat"
                  data-fillout-id="aKuWaUwvaVus"
                  data-fillout-embed-type="slider"
                  data-fillout-slider-direction="right"
                  data-fillout-inherit-parameters
                  data-fillout-popup-size="medium"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Fillout Script - loaded once via navigation */}
      <Script src="https://server.fillout.com/embed/v1/" strategy="lazyOnload" />
    </nav>
  )
}

