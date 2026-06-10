"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/lib/data"
import Button from "@/components/ui/Button"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="nav_fixed" data-lenis-toggle>
      <div
        data-animation="over-right"
        className={`fixed top-0 left-0 right-0 z-999 w-full ${
          menuOpen ? "bg-ow-50" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-ow-975">
            <span className="text-lg font-bold tracking-tight">REAMTECH</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    pathname === link.href
                      ? "text-ow-975 font-medium"
                      : "text-ow-600 hover:text-ow-975"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button href="/contact" size="sm" showDot={false}>
              Speak with us
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-ow-975 transition-transform ${
                menuOpen ? "rotate-45 translate-y-1.25" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ow-975 transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ow-975 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-1.25" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-black/10">
            <div className="flex flex-col gap-4 px-8 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition-colors ${
                    pathname === link.href
                      ? "text-ow-975 font-medium"
                      : "text-ow-600 hover:text-ow-975"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                <Button
                  href="/contact"
                  size="sm"
                  showDot={false}
                  onClick={() => setMenuOpen(false)}
                >
                  Speak with us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
