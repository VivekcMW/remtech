"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { siteConfig, navLinks } from "@/lib/data"
import Button from "@/components/ui/Button"

const productLinks = [
  { label: "Solid Carbide Reamers", href: "/products" },
  { label: "Expandable Reamers", href: "/products" },
  { label: "PCD Reamers", href: "/products" },
  { label: "Boring Bars", href: "/products" },
  { label: "Multi-Step Tools", href: "/products" },
]

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/reamtech-precision-tools",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

function FooterLink({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}>
      <Link href={href} className="group inline-flex items-center gap-2 text-sm text-ow-500 hover:text-ow-50 transition-colors">
        <span className="w-0 h-px bg-orange-500 group-hover:w-3 transition-all duration-300" />
        {children}
      </Link>
    </motion.div>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  return (
    <footer ref={footerRef} className="bg-ow-975 text-ow-400 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-64 bg-gradient-to-bl from-orange-500/5 to-transparent pointer-events-none" />

      {/* ── Pre-footer CTA ──────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] relative">
        <div className="padding-global py-16 md:py-20 max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <motion.span
                className="inline-block text-xs tracking-[0.2em] uppercase text-orange-500 mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get Started
              </motion.span>
              <h2
                className="font-medium text-ow-50 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em" }}
              >
                Ready to upgrade your bore finishing?
              </h2>
              <p className="mt-3 text-sm text-ow-500 max-w-lg leading-relaxed">
                Speak directly with an application engineer — no sales team, no scripts. Just precision tooling expertise from day one.
              </p>
            </div>
            <motion.div
              className="shrink-0 flex flex-wrap gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3 }}
            >
              <Button href="/contact">Speak with us</Button>
              <Button
                href="/products"
                variant="secondary"
                showDot={false}
                className="border-white/20 text-ow-300 hover:text-ow-50 hover:border-white/40"
              >
                View products
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Main columns ───────────────────────────────────────────── */}
      <div className="padding-global py-16 md:py-20 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="group inline-flex items-baseline gap-2 mb-6">
              <span className="text-lg font-bold tracking-[-0.05em] text-ow-50 group-hover:text-orange-400 transition-colors">
                REAMTECH
              </span>
              <span className="text-[0.6rem] tracking-[0.18em] uppercase text-ow-600">Precision Tools</span>
            </Link>
            <p className="text-sm leading-relaxed text-ow-500 max-w-xs mb-6">{siteConfig.description}</p>

            {/* Badges */}
            <div className="flex items-center gap-4 mb-6">
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/5">
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-ow-500">Est. {siteConfig.founded}</span>
              </div>
              <div className="px-3 py-1.5 rounded border border-white/10 bg-white/5">
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-ow-500">ISO 9001</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Reamtech on ${social.label}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-ow-500 hover:text-ow-50 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <motion.p
              className="text-[0.65rem] tracking-[0.18em] uppercase text-ow-600 mb-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              Company
            </motion.p>
            <nav className="flex flex-col gap-3" aria-label="Footer company navigation">
              {navLinks.map((link, i) => (
                <FooterLink key={link.href} href={link.href} delay={0.35 + i * 0.05}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <motion.p
              className="text-[0.65rem] tracking-[0.18em] uppercase text-ow-600 mb-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              Products
            </motion.p>
            <nav className="flex flex-col gap-3" aria-label="Footer products navigation">
              {productLinks.map((link, i) => (
                <FooterLink key={link.label} href={link.href} delay={0.35 + i * 0.05}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-[0.65rem] tracking-[0.18em] uppercase text-ow-600 mb-5">Contact</p>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-ow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-ow-500 leading-relaxed">{siteConfig.location}</span>
              </div>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-ow-500 hover:text-ow-50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-orange-500/10 transition-colors">
                  <svg className="w-4 h-4 text-ow-500 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-ow-500 hover:text-ow-50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-orange-500/10 transition-colors">
                  <svg className="w-4 h-4 text-ow-500 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {siteConfig.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="padding-global py-6 max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-ow-600">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-xs text-ow-600 hover:text-ow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-ow-600 hover:text-ow-400 transition-colors">
                Terms of Service
              </a>
              <span className="flex items-center gap-2 text-xs text-ow-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Engineered in India
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
