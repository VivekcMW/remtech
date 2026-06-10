"use client"

import { useEffect, useRef, useState } from "react"
import { motion, animate, useInView } from "framer-motion"

interface StatItem {
  readonly raw: number
  readonly suffix: string
  readonly label: string
  readonly icon: React.ReactNode
}

const stats: StatItem[] = [
  {
    raw: 14,
    suffix: "+",
    label: "Years in precision tooling",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    raw: 500,
    suffix: "+",
    label: "Custom tool designs delivered",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    raw: 85,
    suffix: "%",
    label: "Reduction in bore uncertainty",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    raw: 6,
    suffix: "",
    label: "Tightest tolerance grade (H6)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

function Counter({ from, to, suffix }: { readonly from: number; readonly to: number; readonly suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const prefix = to === 6 ? "H" : ""
    const controls = animate(from, to, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        node.textContent = prefix + String(Math.round(v)) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, from, to, suffix])

  return (
    <span ref={ref}>
      {to === 6 ? "H0" : "0"}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index }: { readonly stat: StatItem; readonly index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative bg-white p-8 md:p-10 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative">
        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-lg bg-ow-100 flex items-center justify-center text-ow-500 mb-6 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        >
          {stat.icon}
        </motion.div>

        {/* Number */}
        <div
          className="text-ow-975 group-hover:text-orange-600 transition-colors"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          <Counter from={0} to={stat.raw} suffix={stat.suffix} />
        </div>

        {/* Label */}
        <div className="text-sm text-ow-500 mt-3 leading-relaxed">{stat.label}</div>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="relative bg-ow-100" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="padding-global py-16 md:py-20">
        <div className="container-large">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-orange-600 mb-2 block">By the Numbers</span>
            <h3 className="text-2xl md:text-3xl font-medium text-ow-975">Proven precision, measurable results</h3>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ow-200 rounded-2xl overflow-hidden shadow-sm">
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
