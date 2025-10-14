"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Script from "next/script"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/coliving", label: "Coliving" },
    { href: "/coworking", label: "Coworking" },
    { href: "/rooms", label: "Rooms" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Blog" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full">
      <div className="w-full">
        <div
          className={`${
            scrolled || isOpen
              ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/50"
              : "bg-white/70 backdrop-blur-md border-b border-white/20"
          } transition-all duration-300 px-4 sm:px-6 lg:px-8 overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">

              <Image
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={50}
              />

            <span className="font-caveat text-2xl font-semibold text-gray-700 tracking-tighter">Noma Village</span>
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
            <Link href="/form">
              <Button
                className="bg-lagos-pink hover:bg-lagos-pink/90 cursor-pointer text-white font-montserrat font-bold  text-md inline-flex items-center h-16 px-5 rounded-none"
              >
                Join Us
              </Button>
            </Link>
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
          <div className="md:hidden w-full">
            <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-3 bg-white/95 backdrop-blur-md border-t border-gray-100/50">
              <div className="max-w-7xl mx-auto">
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
                <Link href="/form" className="block" onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat"
                  >
                    Join Us
                  </Button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
