"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import type { Product, ProductCategory } from "@/types"

const ToolCanvas = dynamic(() => import("./ToolCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#060608]">
      <div className="flex flex-col items-center gap-3">
        <span className="text-orange-500 text-2xl font-bold tracking-widest animate-pulse">R</span>
        <span className="text-xs text-white/30 tracking-widest uppercase">Loading</span>
      </div>
    </div>
  ),
})

const categoryLabels: Record<ProductCategory, string> = {
  reamer:    "Reaming",
  boring:    "Boring",
  milling:   "Milling",
  pcd:       "PCD",
  multistep: "Multi-step",
}

interface ProductViewerProps {
  product: Product | null
}

export default function ProductViewer({ product }: ProductViewerProps) {
  const [category, setCategory] = useState<ProductCategory>("reamer")
  const [transitioning, setTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!product) return
    if (product.category === category) return

    setTransitioning(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setCategory(product.category)
      setTransitioning(false)
    }, 280)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [product?.category])

  return (
    <div className="relative w-full h-full bg-[#060608] overflow-hidden">

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <ToolCanvas category={category} transitioning={transitioning} />
      </div>

      {/* Scanline sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Corner reticle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-52 h-52 opacity-40">
          <span className="absolute top-0 left-0 w-7 h-7 border-t border-l border-orange-500" />
          <span className="absolute top-0 right-0 w-7 h-7 border-t border-r border-orange-500" />
          <span className="absolute bottom-0 left-0 w-7 h-7 border-b border-l border-orange-500" />
          <span className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-orange-500" />
          {/* Center dot */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-500/60" />
        </div>
      </div>

      {/* Top-left: category label */}
      <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-xs text-white/40 tracking-widest uppercase font-mono">
          {categoryLabels[category]}
        </span>
      </div>

      {/* Bottom overlay: product name */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div
          className="transition-opacity duration-300"
          style={{ opacity: transitioning ? 0 : 1 }}
        >
          {product ? (
            <>
              <p className="text-xs text-orange-500/70 uppercase tracking-widest font-mono mb-1">
                Selected
              </p>
              <h2 className="text-xl font-medium text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-white/40 mt-1">{product.tagline}</p>
            </>
          ) : (
            <p className="text-sm text-white/25 uppercase tracking-widest font-mono">
              Select a product
            </p>
          )}
        </div>
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  )
}
