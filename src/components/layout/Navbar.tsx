"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { navLinks } from "@/lib/data"
import Button from "@/components/ui/Button"
import MagneticWrapper from "@/components/ui/MagneticWrapper"
import { transition } from "@/lib/tokens"

// Magnetic link component for desktop nav
function MagneticNavLink({
  href,
  label,
  active,
  navOnDark,
}: {
  readonly href: string
  readonly label: string
  readonly active: boolean
  readonly navOnDark: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 150, damping: 15 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={ref}
        href={href}
        className={[
          "relative px-4 py-5 text-sm transition-colors duration-300 group",
          active
            ? navOnDark ? "text-white font-medium" : "text-ow-975 font-medium"
            : navOnDark
              ? "text-white/70 hover:text-white"  // Improved from /50 for better contrast
              : "text-ow-700 hover:text-ow-975",  // Improved from ow-600 for better contrast
        ].join(" ")}
      >
        <span className="relative z-10">{label}</span>
        
        {/* Active indicator */}
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-x-3 bottom-0 h-0.5 bg-orange-500 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        
        {/* Hover background effect */}
        {!active && (
          <motion.span
            className="absolute inset-x-1 inset-y-2 bg-orange-500/0 rounded-lg -z-0"
            whileHover={{ backgroundColor: navOnDark ? "rgba(255,255,255,0.08)" : "rgba(249,115,22,0.08)" }}
            transition={{ duration: 0.2 }}
          />
        )}
        
        {/* Hover underline for non-active links */}
        {!active && (
          <span className="absolute inset-x-3 bottom-0 h-0.5 bg-orange-500/60 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        )}
      </Link>
    </motion.div>
  )
}

// Animated hamburger icon
function HamburgerIcon({ 
  isOpen, 
  navOnDark 
}: { 
  readonly isOpen: boolean
  readonly navOnDark: boolean 
}) {
  const lineColor = navOnDark && !isOpen ? "bg-white" : "bg-ow-975"
  
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span
        className={`block w-5 h-[1.5px] rounded-full origin-center ${lineColor}`}
        animate={isOpen 
          ? { rotate: 45, y: 7.5 } 
          : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className={`block w-5 h-[1.5px] rounded-full ${lineColor}`}
        animate={isOpen 
          ? { opacity: 0, scaleX: 0 } 
          : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className={`block w-5 h-[1.5px] rounded-full origin-center ${lineColor}`}
        animate={isOpen 
          ? { rotate: -45, y: -7.5 } 
          : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

// Progress bar showing scroll position
function ScrollProgress({ visible }: { readonly visible: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400"
      style={{ width: `${progress}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    />
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const isHome = pathname === "/"
  const navOnDark = isHome && !scrolled && !menuOpen

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60)
    handle()
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false) }
    document.addEventListener("keydown", handle)
    return () => document.removeEventListener("keydown", handle)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) setTimeout(() => firstLinkRef.current?.focus(), 80)
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), [])

  const raised = scrolled || menuOpen

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-999 transition-all duration-400",
          raised
            ? "bg-white/95 backdrop-blur-md border-b border-ow-200 shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16 max-w-7xl mx-auto">

          {/* Logo */}
          <MagneticWrapper strength={0.3}>
            <Link
              href="/"
              aria-label="Reamtech home"
              className="group flex items-baseline gap-2.5 transition-colors"
            >
              <motion.span
                className={[
                  "text-sm font-bold tracking-tighter leading-none transition-colors duration-300",
                  navOnDark
                    ? "text-white group-hover:text-orange-400"
                    : "text-ow-975 group-hover:text-orange-500",
                ].join(" ")}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                REAMTECH
              </motion.span>
              <span
                className={[
                  "hidden sm:block text-[0.6rem] tracking-[0.18em] uppercase leading-none transition-colors duration-300",
                  navOnDark ? "text-white/50" : "text-ow-500",  // Improved contrast
                ].join(" ")}
              >
                Precision Tools
              </span>
            </Link>
          </MagneticWrapper>

          {/* Desktop nav */}
          <nav 
            className="hidden lg:flex items-center" 
            aria-label="Primary navigation"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => {
              const active = pathname === link.href
              return (
                <div
                  key={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <MagneticNavLink
                    href={link.href}
                    label={link.label}
                    active={active}
                    navOnDark={navOnDark}
                  />
                </div>
              )
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <MagneticWrapper>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button href="/contact" size="sm" showDot={false}>
                    Speak with us
                  </Button>
                </motion.div>
              </MagneticWrapper>
            </div>

            {/* Hamburger */}
            <motion.button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="lg:hidden p-2.5 -mr-2.5 rounded-lg hover:bg-black/5 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <HamburgerIcon isOpen={menuOpen} navOnDark={navOnDark} />
            </motion.button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <ScrollProgress visible={raised} />
      </motion.header>

      {/* ── Mobile overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-997 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            
            {/* Menu panel */}
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-998 w-full max-w-sm bg-white flex flex-col lg:hidden shadow-2xl"
            >
              {/* Header spacer */}
              <div className="h-16 border-b border-ow-100" />
              
              <nav className="flex-1 flex flex-col px-6 pt-6 pb-8 overflow-y-auto" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        onClick={closeMenu}
                        className={[
                          "group flex items-center justify-between py-4 border-b border-ow-100",
                          "text-lg font-medium tracking-tight transition-all duration-300",
                          active 
                            ? "text-orange-500" 
                            : "text-ow-800 hover:text-orange-500 hover:pl-2",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-3">
                          {active && (
                            <motion.span
                              layoutId="mobile-active"
                              className="w-1 h-1 rounded-full bg-orange-500"
                            />
                          )}
                          {link.label}
                        </span>
                        <motion.svg
                          className="w-4 h-4 text-ow-300 group-hover:text-orange-500 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                >
                  <Button href="/contact" onClick={closeMenu} className="w-full justify-center">
                    Speak with us
                  </Button>
                </motion.div>
              </nav>

              {/* Footer */}
              <motion.div
                className="px-6 py-6 border-t border-ow-100 bg-ow-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-ow-500">
                  REAMTECH PRECISION TOOLS
                </p>
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-ow-400 mt-1">
                  Right First Time &mdash; Since 2011
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
