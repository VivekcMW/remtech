"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useMotionValue, animate } from "framer-motion"
import { transition } from "@/lib/tokens"
import SectionHeader from "@/components/ui/SectionHeader"
import TextReveal from "@/components/ui/TextReveal"

// Industry sectors with icons
const sectors = [
  {
    name: "Aerospace",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    companies: ["Boeing", "Airbus", "HAL"],
  },
  {
    name: "Automotive",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    companies: ["Tata Motors", "Mahindra", "TVS"],
  },
  {
    name: "Defense",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    companies: ["DRDO", "BDL", "BEML"],
  },
  {
    name: "Medical",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    companies: ["Biocon", "Dr. Reddy's"],
  },
  {
    name: "Energy",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    companies: ["BHEL", "L&T", "Thermax"],
  },
  {
    name: "Heavy Machinery",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    companies: ["Caterpillar", "JCB", "ACE"],
  },
]

// Animated counter for stats
function AnimatedStat({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(Math.round(latest)),
      })
      return controls.stop
    }
  }, [inView, value, count])

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

// Marquee component for partner names
function PartnerMarquee({ direction = "left" }: { direction?: "left" | "right" }) {
  const partners = [
    "Sandvik Coromant",
    "Kennametal",
    "SECO Tools",
    "MAPAL",
    "ISCAR",
    "Mitsubishi Materials",
    "Walter Tools",
    "Dormer Pramet",
    "Ceratizit",
    "Guhring",
    "Sumitomo",
    "Kyocera",
  ]

  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade mask - left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ow-50 to-transparent z-10 pointer-events-none" />
      {/* Fade mask - right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ow-50 to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === "left" ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...partners, ...partners, ...partners].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-ow-100 rounded-full hover:border-orange-300 hover:shadow-md transition-all group cursor-default"
          >
            <div className="w-8 h-8 rounded-full bg-ow-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <span className="font-mono text-xs font-bold text-ow-600 group-hover:text-orange-600 transition-colors">
                {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </span>
            </div>
            <span className="text-sm font-medium text-ow-700 group-hover:text-ow-900 transition-colors">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// Sector card component
function SectorCard({ sector, index, isInView }: { sector: typeof sectors[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative p-6 bg-white border border-ow-100 rounded-2xl overflow-hidden hover:border-orange-300 hover:shadow-xl transition-all duration-300">
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-xl bg-ow-100 flex items-center justify-center text-ow-600 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
            animate={{ rotate: isHovered ? 5 : 0 }}
          >
            {sector.icon}
          </motion.div>

          {/* Name */}
          <h3 className="text-lg font-medium text-ow-975 mb-3 group-hover:text-orange-600 transition-colors">
            {sector.name}
          </h3>

          {/* Companies */}
          <div className="flex flex-wrap gap-1.5">
            {sector.companies.map((company) => (
              <span
                key={company}
                className="text-xs px-2.5 py-1 bg-ow-50 text-ow-600 rounded-full group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors" />
      </div>
    </motion.div>
  )
}

const stats = [
  { value: 50, suffix: "+", label: "Industrial Partners" },
  { value: 6, suffix: "", label: "Industry Sectors" },
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Repeat Business" },
]

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="section_partners relative bg-ow-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-ow-100/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="padding-global py-20 md:py-32 relative">
        <div className="container-large">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={transition.base}
            >
              <TextReveal>
                <SectionHeader
                  label="THE REAMTECH ECOSYSTEM"
                  heading="Trusted by Industry Leaders"
                  description="REAMTECH precision tools power manufacturing excellence across six core industrial sectors, serving partners who demand nothing less than micron-level accuracy."
                  centered
                />
              </TextReveal>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative p-6 bg-white rounded-2xl border border-ow-100 text-center group hover:border-orange-300 hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="font-mono text-4xl md:text-5xl font-medium text-ow-975 mb-2 group-hover:text-orange-600 transition-colors">
                  <AnimatedStat value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>
                <div className="text-xs uppercase tracking-wider text-ow-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Partner marquee */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs uppercase tracking-widest text-ow-400 text-center mb-6">
              Tooling Partners & Collaborators
            </p>
            <div className="relative">
              {/* Gradient masks */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ow-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ow-50 to-transparent z-10 pointer-events-none" />
              <PartnerMarquee direction="left" />
            </div>
          </motion.div>

          {/* Sectors grid */}
          <div className="mb-16">
            <motion.p
              className="text-xs uppercase tracking-widest text-ow-400 text-center mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              Industries We Serve
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sectors.map((sector, i) => (
                <SectorCard key={sector.name} sector={sector} index={i} isInView={isInView} />
              ))}
            </div>
          </div>

          {/* Bottom CTA / Trust badge */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative p-8 md:p-12 bg-ow-975 rounded-3xl overflow-hidden">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                {/* Certification badge */}
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="text-xs uppercase tracking-widest text-orange-500">ISO 9001:2015</span>
                    <span className="w-1 h-1 rounded-full bg-ow-600" />
                    <span className="text-xs uppercase tracking-widest text-ow-400">Quality Certified</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                    Industry-leading quality standards
                  </h3>
                  <p className="text-sm text-ow-400 leading-relaxed max-w-xl">
                    Every tool we manufacture undergoes rigorous quality control with full traceability. 
                    Our ISO-certified processes ensure consistent precision across every batch.
                  </p>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <motion.button
                    className="px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Certifications
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
