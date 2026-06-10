"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
  readonly children:   React.ReactNode
  readonly delay?:     number
  readonly className?: string
  readonly once?:      boolean
  readonly margin?:    string
  /** Animate immediately on mount instead of waiting for in-view (use for above-the-fold content) */
  readonly immediate?: boolean
}

export default function TextReveal({
  children,
  delay  = 0,
  className,
  once   = true,
  margin = "-40px",
  immediate = false,
}: TextRevealProps) {
  return (
    <div style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ y: "108%" }}
        {...(immediate
          ? { animate: { y: "0%" } }
          : { whileInView: { y: "0%" }, viewport: { once, margin } })}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
