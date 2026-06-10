"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticWrapperProps {
  readonly children:  React.ReactNode
  readonly strength?: number
  readonly className?: string
}

export default function MagneticWrapper({ children, strength = 0.25, className }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)
  const sx  = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 })
  const sy  = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width  / 2)) * strength)
    y.set((e.clientY - (rect.top  + rect.height / 2)) * strength)
  }

  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
