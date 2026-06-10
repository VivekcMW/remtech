"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { transition } from "@/lib/tokens"
import { pressItems } from "@/lib/data"
import SectionHeader from "@/components/ui/SectionHeader"
import TextReveal from "@/components/ui/TextReveal"

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Announcements: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
  News: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  Events: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
}

function PressCard({
  item,
  index,
  isHovered,
  onHover,
}: {
  readonly item: typeof pressItems[0]
  readonly index: number
  readonly isHovered: boolean
  readonly onHover: (hover: boolean) => void
}) {
  const colors = categoryColors[item.category] || categoryColors.News

  return (
    <motion.a
      href={item.url}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      className="group relative block"
    >
      <motion.div
        className="relative p-6 rounded-xl border border-ow-100 bg-white overflow-hidden transition-all duration-300"
        animate={{
          borderColor: isHovered ? "#f97316" : "#f5f5f5",
          y: isHovered ? -4 : 0,
        }}
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
              {item.category}
            </span>
            <span className="text-xs text-ow-400 font-mono">2024</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-ow-975 group-hover:text-orange-700 transition-colors leading-snug mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-ow-500 leading-relaxed mb-6 line-clamp-2">
            {item.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-ow-100">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ow-600 group-hover:text-orange-600 transition-colors">
              Read full story
              <motion.svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: isHovered ? 4 : 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>

            <div className="flex items-center gap-2 text-ow-300">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="text-xs">3 min read</span>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-orange-500/10 rounded-full" />
        </div>
      </motion.div>
    </motion.a>
  )
}

function FeaturedPress() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative block col-span-full"
    >
      <motion.div
        className="relative p-8 md:p-12 rounded-2xl border-2 border-ow-200 bg-gradient-to-br from-ow-975 to-ow-900 overflow-hidden"
        animate={{ borderColor: isHovered ? "#f97316" : "#e5e5e5" }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 mb-6">
              Featured Story
            </span>
            <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight mb-4">
              Reamtech Named to IMTEX 2026 Innovation Showcase
            </h3>
            <p className="text-ow-400 leading-relaxed mb-8">
              Reamtech has been selected to present its expandable monoblock reamer technology at the IMTEX 2026 innovation showcase in Bengaluru, marking a significant milestone in precision tooling advancement.
            </p>
            <span className="inline-flex items-center gap-2 text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
              Read the full announcement
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden bg-ow-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl text-white/5 font-bold">IMTEX</span>
            </div>
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"
              animate={{ opacity: isHovered ? 0.8 : 0.4 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-500/40" />
      </motion.div>
    </motion.a>
  )
}

export default function PressSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Get only the first 3 items (excluding featured)
  const regularItems = pressItems.slice(0, 3)

  return (
    <section ref={sectionRef} className="section_press relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ow-200 to-transparent" />

      <div className="padding-global py-20 md:py-32">
        <div className="container-large">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <TextReveal>
                <SectionHeader
                  label="NEWS & PRESS"
                  heading="Progress, partnerships, and industry recognition"
                />
              </TextReveal>
            </div>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-ow-600 hover:text-orange-600 transition-colors group shrink-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              View all news
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Featured story */}
          <div className="mb-8">
            <FeaturedPress />
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regularItems.map((item, i) => (
              <PressCard
                key={item.title}
                item={item}
                index={i}
                isHovered={hoveredIndex === i}
                onHover={(hover) => setHoveredIndex(hover ? i : null)}
              />
            ))}
          </div>

          {/* Newsletter signup */}
          <motion.div
            className="mt-16 p-8 rounded-2xl bg-ow-50 border border-ow-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-medium text-ow-975 mb-1">Stay updated</h4>
                <p className="text-sm text-ow-500">Get the latest news and updates from Reamtech Precision Tools.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white border border-ow-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors w-full md:w-64"
                />
                <button className="px-6 py-3 bg-ow-975 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
