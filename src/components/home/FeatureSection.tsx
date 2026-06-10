"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { transition } from "@/lib/tokens"
import { features } from "@/lib/data"
import SectionHeader from "@/components/ui/SectionHeader"
import TextReveal from "@/components/ui/TextReveal"

function FeatureImage({ src, alt }: { readonly src: string; readonly alt: string }) {
  const [imgError, setImgError] = useState(false)

  const handleError = useCallback(() => setImgError(true), [])

  if (!src || imgError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span
          className="font-mono text-white leading-none font-light"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)", opacity: 0.06 }}
        >
          H7
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={handleError}
      unoptimized={src.endsWith(".svg")}
    />
  )
}

function FeatureCard({
  feature,
  index,
  isActive,
  onClick,
}: {
  readonly feature: typeof features[0]
  readonly index: number
  readonly isActive: boolean
  readonly onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative w-full text-left p-6 rounded-xl border transition-all duration-500 ${
        isActive
          ? "bg-ow-975 border-ow-800 shadow-xl"
          : "bg-white border-ow-200 hover:border-ow-300 hover:shadow-md"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: isActive ? 0 : -4 }}
    >
      {/* Number badge */}
      <div
        className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-medium transition-colors ${
          isActive ? "bg-orange-500 text-white" : "bg-ow-100 text-ow-500 group-hover:bg-orange-100 group-hover:text-orange-600"
        }`}
      >
        0{index + 1}
      </div>

      {/* Content */}
      <h4
        className={`text-lg font-medium mb-2 transition-colors ${
          isActive ? "text-white" : "text-ow-975 group-hover:text-orange-600"
        }`}
      >
        {feature.title}
      </h4>
      <p
        className={`text-sm leading-relaxed transition-colors ${
          isActive ? "text-ow-400" : "text-ow-500"
        }`}
      >
        {isActive ? feature.description : feature.description.slice(0, 80) + "..."}
      </p>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="feature-active"
          className="absolute bottom-0 left-6 right-6 h-0.5 bg-orange-500"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      {/* Hover arrow */}
      {!isActive && (
        <div className="mt-4 flex items-center gap-2 text-xs text-ow-400 group-hover:text-orange-500 transition-colors">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </motion.button>
  )
}

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  // Auto-rotate features
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isInView])

  const feature = features[activeIndex]

  return (
    <section ref={sectionRef} className="section_feature relative bg-ow-50 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="padding-global py-20 md:py-32 relative">
        <div className="container-large">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <TextReveal>
              <SectionHeader
                label="MEETING INDUSTRY WHERE IT'S AT"
                heading="Precision that fits production reality"
              />
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — Large feature display */}
            <motion.div
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] bg-ow-975 rounded-2xl relative overflow-hidden shadow-2xl">
                {/* Crosshair overlay */}
                <div className="absolute inset-0 pointer-events-none z-10" aria-hidden>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-orange-500/60" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-orange-500/60" />
                  </div>
                </div>

                {/* Animated illustration per feature */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feature.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FeatureImage src={feature.image ?? ""} alt={feature.title} />
                  </motion.div>
                </AnimatePresence>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-orange-500/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-orange-500/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-500/40" />

                {/* Feature counter */}
                <div className="absolute bottom-6 right-6 z-10">
                  <span className="font-mono text-sm text-white/30 tracking-widest">
                    0{activeIndex + 1} / 0{features.length}
                  </span>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <motion.div
                    key={activeIndex}
                    className="h-full bg-orange-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Feature title overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={feature.id}
                  className="absolute -bottom-4 left-6 right-6 bg-white rounded-lg shadow-xl p-6 border border-ow-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="heading-style-h3 text-ow-975">{feature.title}</h3>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right — Feature cards */}
            <div className="lg:col-span-5 space-y-4 pt-8 lg:pt-0">
              {features.map((f, i) => (
                <FeatureCard
                  key={f.id}
                  feature={f}
                  index={i}
                  isActive={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              ))}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-ow-200 mt-8">
                <div className="flex gap-2">
                  {features.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Feature ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "bg-orange-500 w-8" : "bg-ow-200 w-2 hover:bg-ow-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveIndex((prev) => (prev - 1 + features.length) % features.length)}
                    className="w-10 h-10 rounded-full border border-ow-200 flex items-center justify-center text-ow-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    aria-label="Previous feature"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev + 1) % features.length)}
                    className="w-10 h-10 rounded-full border border-ow-200 flex items-center justify-center text-ow-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    aria-label="Next feature"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
