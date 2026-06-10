"use client"

import { motion } from "framer-motion"

interface CalloutProps {
  readonly label: string
  readonly value: string
  readonly unit?: string
  readonly position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "mid-left" | "mid-right"
  readonly delay?: number
}

const positionStyles: Record<CalloutProps["position"], string> = {
  "top-left": "top-[15%] left-[10%]",
  "top-right": "top-[15%] right-[10%]",
  "bottom-left": "bottom-[20%] left-[10%]",
  "bottom-right": "bottom-[20%] right-[10%]",
  "mid-left": "top-[45%] left-[5%]",
  "mid-right": "top-[45%] right-[5%]",
}

function ToleranceCallout({ label, value, unit, position, delay = 0 }: CalloutProps) {
  const posClass = positionStyles[position]
  const isLeft = position.includes("left")
  
  return (
    <motion.div
      className={`absolute ${posClass} flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Connector line */}
      <motion.div
        className={`h-px bg-orange-500/50 ${isLeft ? "origin-left" : "origin-right"}`}
        style={{ width: 40 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      />
      
      {/* Callout content */}
      <motion.div
        className={`flex flex-col ${isLeft ? "items-start" : "items-end"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.4 }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
          {label}
        </span>
        <span className="text-white font-mono text-sm tracking-wide">
          {value}
          {unit && <span className="text-orange-500 ml-1">{unit}</span>}
        </span>
      </motion.div>
      
      {/* Dot indicator */}
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-orange-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.5, type: "spring" }}
      />
    </motion.div>
  )
}

export default function ToleranceCallouts() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <ToleranceCallout
        label="Tolerance"
        value="±0.002"
        unit="mm"
        position="top-right"
        delay={1.2}
      />
      <ToleranceCallout
        label="Grade"
        value="H7"
        position="mid-right"
        delay={1.4}
      />
      <ToleranceCallout
        label="Coating"
        value="TiAlN"
        position="bottom-right"
        delay={1.6}
      />
      <ToleranceCallout
        label="Flutes"
        value="4"
        position="mid-left"
        delay={1.5}
      />
      <ToleranceCallout
        label="Material"
        value="K10 Carbide"
        position="bottom-left"
        delay={1.7}
      />
    </div>
  )
}
