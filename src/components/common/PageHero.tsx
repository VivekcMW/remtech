"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import SectionHeader from "@/components/ui/SectionHeader"

export interface PageHeroProps {
  readonly label: string
  readonly heading: React.ReactNode
  readonly description?: React.ReactNode
  readonly children?: React.ReactNode
  readonly bgImage?: string
  readonly bgVideo?: string
}

export default function PageHero({ label, heading, description, children, bgImage, bgVideo }: PageHeroProps) {
  const hasBg = !!(bgImage || bgVideo)
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  return (
    <section
      ref={sectionRef}
      className={[
        "relative overflow-hidden",
        hasBg ? "min-h-[60vh] flex flex-col justify-end" : "",
      ].join(" ")}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Background video with parallax */}
      {bgVideo && (
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-110"
            style={{ opacity: 0.2 }}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Background image with parallax */}
      {bgImage && !bgVideo && (
        <motion.div
          className="absolute inset-0 pointer-events-none scale-110"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            y: bgY,
          }}
        />
      )}

      {/* Gradient overlay */}
      {hasBg && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0.3) 0%, rgba(250,250,250,0.95) 100%)" }}
          aria-hidden="true"
        />
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-orange-500/20 hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-orange-500/20 hidden lg:block" />

      <motion.div className="padding-global padding-section-large relative z-10" style={{ opacity }}>
        <div className="container-large">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeader label={label} level={1} heading={heading} description={description} />
          </motion.div>
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {hasBg && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-ow-500">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-ow-400 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  )
}
