"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { transition } from "@/lib/tokens"

export default function PageTransition({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition.page}
    >
      {children}
    </motion.div>
  )
}
