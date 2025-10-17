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
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 w-full" style={{ zIndex: 1000 }}>
      <div className="w-full">
        <div
          className={`${
            scrolled || isOpen
              ? "bg-white/98 backdrop-blur-[8px] saturate-[180%] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              : "bg-white/75 backdrop-blur-[16px] saturate-[180%] border-b border-white/20"
          } px-4 sm:px-6 lg:px-8 overflow-hidden`}
          style={{
            backdropFilter: scrolled || isOpen ? 'blur(8px) saturate(180%)' : 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: scrolled || isOpen ? 'blur(8px) saturate(180%)' : 'blur(16px) saturate(180%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
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
            <div 
              className="px-4 sm:px-6 lg:px-8 pt-2 pb-3 bg-white/98 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              style={{
                backdropFilter: 'blur(8px) saturate(180%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%)'
              }}
            >
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
