"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useSpring, useMotionValue, animate, useTransform } from "framer-motion"

const PARA_ONE =
  "For decades, machining tolerances were treated as a guideline — significant, but flexible. Today, that margin has disappeared."

const PARA_TWO =
  "Reaming is responsible for the final dimension and finish of millions of precision bores every day. That's the difference between a part that fits and one that fails."

const metrics = [
  { value: 85, suffix: "%", label: "Reduction in uncertainty from tool wear" },
  { value: 0.002, suffix: "mm", label: "Repeatable tolerance accuracy", isDecimal: true },
  { value: 60, suffix: "%", label: "Fewer tool changes required" },
]

function AnimatedNumber({ 
  value, 
  suffix = "", 
  isDecimal = false,
  inView 
}: { 
  readonly value: number
  readonly suffix?: string
  readonly isDecimal?: boolean
  readonly inView: boolean
}) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (current) => 
    isDecimal ? current.toFixed(3) : Math.floor(current).toString()
  )
  const [displayValue, setDisplayValue] = useState(isDecimal ? "0.000" : "0")

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  return (
    <span className="tabular-nums">
      {isDecimal && "±"}
      {displayValue}
      <span className="text-orange-500">{suffix}</span>
    </span>
  )
}

function ToleranceGauge({ inView }: { readonly inView: boolean }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Gauge background */}
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-ow-200"
        />
        {/* Animated progress arc */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 0.85 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        {/* Tick marks */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = -180 + (i * 180) / 4
          const rad = (angle * Math.PI) / 180
          const x1 = 100 + 70 * Math.cos(rad)
          const y1 = 100 + 70 * Math.sin(rad)
          const x2 = 100 + 80 * Math.cos(rad)
          const y2 = 100 + 80 * Math.sin(rad)
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
              className="text-ow-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          )
        })}
        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={inView ? { rotate: 63 } : { rotate: -90 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <polygon
            points="100,30 96,100 104,100"
            fill="#f97316"
          />
          <circle cx="100" cy="100" r="8" fill="#f97316" />
          <circle cx="100" cy="100" r="4" fill="white" />
        </motion.g>
      </svg>
      {/* Label */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-mono text-3xl font-medium text-ow-975">H7</span>
        <span className="block text-xs uppercase tracking-[0.15em] text-ow-500 mt-1">
          Tolerance Grade
        </span>
      </motion.div>
    </div>
  )
}

function PrecisionComparison({ inView }: { readonly inView: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Before */}
      <motion.div
        className="relative p-6 bg-ow-100 border border-ow-200 rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: 0.4 }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-ow-500 font-mono">Before</span>
        <div className="mt-4 flex items-center justify-center h-20">
          <motion.div
            className="relative"
            animate={inView ? { x: [0, -3, 2, -1, 0] } : {}}
            transition={{ duration: 0.5, delay: 0.8, repeat: 2 }}
          >
            <div className="w-12 h-12 rounded-full border-4 border-dashed border-red-400/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-red-400/40" />
            </div>
          </motion.div>
        </div>
        <div className="text-center mt-2">
          <span className="font-mono text-sm text-red-500">±0.05mm</span>
        </div>
      </motion.div>
      
      {/* After */}
      <motion.div
        className="relative p-6 bg-ow-975 border border-ow-800 rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-ow-500 font-mono">After</span>
        <div className="mt-4 flex items-center justify-center h-20">
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <div className="w-12 h-12 rounded-full border-4 border-orange-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-4 h-4 rounded-full bg-orange-500"
                animate={inView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, delay: 1.2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
        <div className="text-center mt-2">
          <span className="font-mono text-sm text-orange-500">±0.002mm</span>
        </div>
      </motion.div>
    </div>
  )
}

function WordReveal({ text, className, baseDelay = 0 }: { readonly text: string; readonly className?: string; readonly baseDelay?: number }) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word.slice(0, 4)}`}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.5,
            delay: baseDelay + i * 0.018,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="section_home-about relative bg-ow-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-ow-400) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative py-24 md:py-32 lg:py-40">
        <div className="padding-global">
          <div className="container-large">
            
            {/* Header */}
            <div className="text-center mb-16 md:mb-24">
              <motion.div
                className="pill-wrapper inline-block"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="pill">Precision is no longer optional.</div>
              </motion.div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left - Text content */}
              <div>
                <div className="text-size-xxlarge text-weight-medium text-ow-500 mb-8">
                  <WordReveal text={PARA_ONE} baseDelay={0.1} />
                </div>

                <div className="text-size-xxlarge text-weight-medium text-ow-975 mb-12">
                  <WordReveal text={PARA_TWO} baseDelay={0.05} />
                </div>

                {/* Animated metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      className="relative p-5 bg-white border border-ow-200 rounded-lg group hover:border-orange-300 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="font-mono text-2xl md:text-3xl font-medium text-ow-975 mb-2">
                        <AnimatedNumber
                          value={metric.value}
                          suffix={metric.suffix}
                          isDecimal={metric.isDecimal}
                          inView={isInView}
                        />
                      </div>
                      <p className="text-xs text-ow-500 leading-relaxed">
                        {metric.label}
                      </p>
                      {/* Hover accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Interactive visuals */}
              <div className="space-y-8">
                {/* Tolerance gauge */}
                <motion.div
                  className="bg-white border border-ow-200 rounded-xl p-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <ToleranceGauge inView={isInView} />
                </motion.div>

                {/* Before/After comparison */}
                <PrecisionComparison inView={isInView} />
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
