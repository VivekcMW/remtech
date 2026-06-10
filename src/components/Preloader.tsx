"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Phase = "loading" | "exiting" | "done"

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase,    setPhase]    = useState<Phase>("loading")

  useEffect(() => {
    const totalMs = 1600
    const tickMs  = 20
    const step    = 100 / (totalMs / tickMs)
    let triggered = false

    function complete() {
      setTimeout(() => setPhase("exiting"), 160)
      setTimeout(() => setPhase("done"),    700)
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100)
        if (next >= 100 && !triggered) {
          triggered = true
          clearInterval(timer)
          complete()
        }
        return next
      })
    }, tickMs)

    return () => clearInterval(timer)
  }, [])

  if (phase === "done") return null

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-9999 bg-ow-50 flex flex-col items-center justify-center select-none pointer-events-none"
    >
      {/* Wordmark */}
      <div className="flex flex-col items-center gap-1.5 mb-10">
        <span
          className="font-bold text-ow-975 tracking-[-0.06em] leading-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          REAMTECH
        </span>
        <span className="text-[0.65rem] tracking-[0.22em] uppercase text-ow-400">
          Precision Tools
        </span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4">
        {/* Bar */}
        <div className="w-28 h-px bg-ow-200 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-orange-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        </div>
        {/* Counter */}
        <span className="font-mono text-[0.7rem] text-ow-400 tabular-nums w-7 text-right">
          {String(Math.floor(progress)).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  )
}
