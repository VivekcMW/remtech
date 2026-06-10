"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Button from "@/components/ui/Button"

export interface SectionCTAProps {
  heading: React.ReactNode
  description?: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  className?: string
  variant?: "light" | "dark"
}

export default function SectionCTA({
  heading,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
  variant = "light",
}: SectionCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const isDark = variant === "dark"

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${isDark ? "bg-ow-975" : "bg-ow-50"} ${className || ""}`}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`
            : `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      {/* Gradient accents */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full pointer-events-none ${
          isDark ? "bg-gradient-to-l from-orange-500/10 to-transparent" : "bg-gradient-to-l from-orange-50 to-transparent"
        }`}
      />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-orange-500/20 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-orange-500/20 hidden lg:block" />

      <div className="padding-global py-20 md:py-28 relative">
        <div className="container-large">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-10"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <motion.span
                className={`inline-block text-xs tracking-[0.2em] uppercase mb-4 ${isDark ? "text-orange-400" : "text-orange-600"}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get Started
              </motion.span>
              {typeof heading === "string" ? (
                <h2
                  className={`heading-style-h2 ${isDark ? "text-white" : "text-ow-975"}`}
                  style={{ maxWidth: "24ch" }}
                >
                  {heading}
                </h2>
              ) : (
                heading
              )}
              {description && (
                <p className={`text-base mt-4 max-w-lg leading-relaxed ${isDark ? "text-ow-400" : "text-ow-600"}`}>
                  {description}
                </p>
              )}
            </div>

            <motion.div
              className="flex flex-wrap gap-3 shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3 }}
            >
              <Button href={primaryHref}>{primaryLabel}</Button>
              {secondaryHref && secondaryLabel && (
                <Button
                  href={secondaryHref}
                  variant="secondary"
                  showDot={false}
                  className={isDark ? "border-white/20 text-ow-300 hover:text-white hover:border-white/40" : ""}
                >
                  {secondaryLabel}
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
