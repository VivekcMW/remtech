"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { transition } from "@/lib/tokens"
import Button from "@/components/ui/Button"
import MagneticWrapper from "@/components/ui/MagneticWrapper"

const MARQUEE_TEXT = "REAMTECH PRECISION TOOLS — Right First Time."
const INDUSTRY_TEXT = "Automotive · Aerospace · Medical · Energy · Hydraulics · Precision Engineering"

const stableKeys = ["a", "b", "c", "d"]
const stableKeys2 = ["e", "f", "g", "h"]
const stableKeys3 = ["i", "j", "k", "l"]
const stableKeys4 = ["m", "n", "o", "p"]

const processSteps = [
  {
    number: "01",
    title: "Roughing",
    description: "Initial material removal with standard tooling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Semi-Finishing",
    description: "Intermediate pass approaching target dimension",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="8" strokeDasharray="2 1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Precision Reaming",
    description: "Final pass with REAMTECH tools — H7 tolerance achieved",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" className="fill-orange-500 stroke-orange-500" />
      </svg>
    ),
    highlight: true,
  },
]

function ProcessTimeline({ inView }: { readonly inView: boolean }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute left-[23px] top-8 bottom-8 w-px bg-ow-200 hidden md:block">
        <motion.div
          className="absolute top-0 left-0 w-full bg-orange-500 origin-top"
          animate={{ height: `${((activeStep + 1) / processSteps.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="space-y-6 md:space-y-8">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            className={`relative flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-xl transition-all duration-500 cursor-pointer ${
              index === activeStep
                ? step.highlight
                  ? "bg-orange-500/10 border border-orange-500/30"
                  : "bg-ow-100 border border-ow-200"
                : "bg-transparent border border-transparent hover:bg-ow-50"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            onClick={() => setActiveStep(index)}
          >
            {/* Step number/icon */}
            <div
              className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                index === activeStep
                  ? step.highlight
                    ? "bg-orange-500 text-white"
                    : "bg-ow-975 text-white"
                  : "bg-ow-100 text-ow-500"
              }`}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-ow-400">{step.number}</span>
                {step.highlight && index === activeStep && (
                  <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-orange-500 text-white rounded-full">
                    REAMTECH
                  </span>
                )}
              </div>
              <h4
                className={`text-lg font-medium transition-colors ${
                  index === activeStep ? (step.highlight ? "text-orange-600" : "text-ow-975") : "text-ow-600"
                }`}
              >
                {step.title}
              </h4>
              <p className="text-sm text-ow-500 mt-1">{step.description}</p>
            </div>

            {/* Active indicator */}
            {index === activeStep && (
              <motion.div
                layoutId="step-indicator"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AnimatedCounter({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function LoopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])

  return (
    <section ref={sectionRef} className="section_loop relative overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative py-20 md:py-32">
        <div className="padding-global">
          <div className="container-large">
            {/* Section header */}
            <motion.div
              className="text-center mb-16 md:mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="pill mb-4 inline-block">The REAMTECH Approach</span>
              <h2 className="heading-style-h2 max-w-3xl mx-auto">
                Designed for precision, at today&apos;s cost.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Video with parallax */}
              <motion.div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ow-975"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Video */}
                <motion.div
                  className="absolute inset-0"
                  style={{ y: videoY, scale: videoScale }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.7 }}
                  >
                    <source src="/videos/cnc-machining.mp4" type="video/mp4" />
                  </video>
                </motion.div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ow-975 via-transparent to-transparent" />

                {/* Crosshair overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-orange-500/20" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-orange-500/20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 border border-orange-500/40 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between gap-4">
                    {[
                      { value: 85, suffix: "%", label: "Less Uncertainty" },
                      { value: 60, suffix: "%", label: "Fewer Changes" },
                      { value: 14, suffix: "+", label: "Years Experience" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <div className="font-mono text-2xl md:text-3xl font-medium text-white">
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-orange-500/50" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-orange-500/50" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-orange-500/50" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-orange-500/50" />
              </motion.div>

              {/* Right - Content */}
              <div>
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-size-medium leading-relaxed mb-6">
                    REAMTECH PRECISION TOOLS separates the finishing operation from the roughing
                    operation — delivering high accuracy at the final stage without compromising
                    cycle time.
                  </p>
                  <p className="text-size-medium leading-relaxed">
                    By upgrading tooling rather than replacing machinery, we support practical
                    deployment within existing CNC facilities{" "}
                    <span className="text-orange-600 font-medium">without adding a green premium</span>.
                  </p>
                </motion.div>

                {/* Process timeline */}
                <ProcessTimeline inView={isInView} />

                {/* CTA */}
                <motion.div
                  className="mt-10 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8 }}
                >
                  <MagneticWrapper>
                    <Button href="/products" size="lg">
                      Explore Products
                    </Button>
                  </MagneticWrapper>
                  <MagneticWrapper>
                    <Button href="/about" variant="ghost" size="lg" showDot={false}>
                      Learn More →
                    </Button>
                  </MagneticWrapper>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Double-lane marquee */}
      <div className="w-full overflow-hidden border-t border-ow-200 bg-ow-50">
        {/* Lane 1 — forward */}
        <div className="flex whitespace-nowrap animate-marquee border-b border-ow-100 py-5">
          <div className="flex gap-16 mx-8">
            {stableKeys.map((id) => (
              <span key={id} className="text-xl font-medium text-ow-300 tracking-tight">
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
          <div className="flex gap-16 mx-8" aria-hidden>
            {stableKeys2.map((id) => (
              <span key={id} className="text-xl font-medium text-ow-300 tracking-tight">
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* Lane 2 — reverse */}
        <div className="flex whitespace-nowrap animate-marquee-reverse py-4">
          <div className="flex gap-20 mx-8">
            {stableKeys3.map((id) => (
              <span key={id} className="text-xs uppercase tracking-[0.22em] text-ow-400">
                {INDUSTRY_TEXT}
              </span>
            ))}
          </div>
          <div className="flex gap-20 mx-8" aria-hidden>
            {stableKeys4.map((id) => (
              <span key={id} className="text-xs uppercase tracking-[0.22em] text-ow-400">
                {INDUSTRY_TEXT}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
