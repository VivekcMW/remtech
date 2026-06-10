"use client"

import { motion } from "framer-motion"
import { transition } from "@/lib/tokens"

interface FadeUpProps {
  readonly children:   React.ReactNode
  readonly delay?:     number
  readonly duration?:  number
  readonly className?: string
  readonly style?:     React.CSSProperties
}

export default function FadeUp({
  children,
  delay    = 0,
  duration = transition.base.duration,
  className,
  style,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: transition.base.ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
