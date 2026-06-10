"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { transition } from "@/lib/tokens"
import Button from "@/components/ui/Button"
import TextReveal from "@/components/ui/TextReveal"
import MagneticWrapper from "@/components/ui/MagneticWrapper"
import ToleranceCallouts from "./ToleranceCallouts"

// Dynamic import for 3D model to avoid SSR issues
const ReamerModel = dynamic(() => import("./ReamerModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
    </div>
  ),
})

const titleLines = ["BORES FINISHED RIGHT,", "FIRST TIME."]

const stats = [
  { value: "14+", label: "Years" },
  { value: "±0.002", label: "mm Tolerance" },
  { value: "H7", label: "Grade Standard" },
]

export default function Hero() {
  return (
    <section className="section_home-hero relative min-h-screen flex flex-col bg-ow-975 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(249,115,22,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main content - Split layout */}
      <div className="flex-1 flex items-center pt-24 md:pt-32">
        <div className="padding-global w-full">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left side - Typography */}
              <div className="relative z-10">
                {/* Pill badge */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition.base, delay: 0.2 }}
                >
                  <span className="pill">Right First Time</span>
                </motion.div>

                {/* Main heading */}
                <div className="heading-style-h1 mb-8" style={{ color: "var(--color-ow-50)" }}>
                  {titleLines.map((line, i) => (
                    <TextReveal key={line} delay={0.3 + i * 0.12} immediate>
                      <span style={{ display: "block" }}>{line}</span>
                    </TextReveal>
                  ))}
                </div>

                {/* Description */}
                <motion.p
                  className="text-size-medium max-w-lg mb-10"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition.base, delay: 0.7 }}
                >
                  High-precision brazed carbide tools for reaming, boring, and finishing.
                  Engineered for production environments where tolerance is non-negotiable.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-12"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition.base, delay: 0.85 }}
                >
                  <MagneticWrapper>
                    <Button href="/contact" size="lg">Speak with us</Button>
                  </MagneticWrapper>
                  <MagneticWrapper>
                    <Button href="/products" variant="secondary" size="lg" showDot={false}>
                      View Products
                    </Button>
                  </MagneticWrapper>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  className="flex gap-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...transition.base, delay: 1.1 }}
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="flex flex-col"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...transition.base, delay: 1.2 + i * 0.1 }}
                    >
                      <span className="font-mono text-2xl md:text-3xl text-white font-medium tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-xs uppercase tracking-[0.15em] text-white/30 mt-1">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right side - 3D Model */}
              <motion.div
                className="relative h-[500px] md:h-[600px] lg:h-[700px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...transition.slow, delay: 0.5 }}
              >
                {/* Precision crosshair frame */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-orange-500/30" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-orange-500/30" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-orange-500/30" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-orange-500/30" />
                </div>

                {/* Tolerance callouts */}
                <ToleranceCallouts />

                {/* 3D Canvas */}
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                  </div>
                }>
                  <ReamerModel />
                </Suspense>

                {/* Model label */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
                    SCR-H7 Solid Carbide Reamer
                  </span>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-auto">
        {/* Hairline divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

        <div className="padding-global py-6">
          <div className="container-large">
            <div className="flex items-center justify-between">
              <motion.span
                className="text-xs font-mono text-white/20 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                EST. 2011 — BENGALURU, INDIA
              </motion.span>

              {/* Scroll indicator */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ ...transition.base, delay: 1.4 }}
                aria-hidden="true"
              >
                <span className="font-mono text-white uppercase text-[10px] tracking-[0.15em]">
                  Scroll
                </span>
                <motion.div
                  className="w-6 h-px bg-white origin-left"
                  animate={{ scaleX: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
