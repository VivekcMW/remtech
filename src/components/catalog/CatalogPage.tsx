"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { catalogEntries } from "@/lib/data"
import type { CatalogEntry, CatalogSeries } from "@/types"

type FilterSeries = CatalogSeries | "ALL"

const SERIES_META: Record<CatalogSeries, { label: string; accent: string; description: string }> = {
  SCR: { label: "Solid Carbide", accent: "#f97316", description: "Premium carbide for high-speed precision" },
  BTR: { label: "Brazed Tip", accent: "#f43f5e", description: "Cost-effective with replaceable tips" },
  HSR: { label: "HSS", accent: "#3b82f6", description: "High-speed steel for versatile applications" },
  PCD: { label: "PCD / CBN", accent: "#a855f7", description: "Diamond-tipped for extreme hardness" },
  MSR: { label: "Multi-Step", accent: "#10b981", description: "Multiple diameters in single tool" },
  TBR: { label: "Taper & Special", accent: "#f59e0b", description: "Specialized geometry for unique bores" },
}

const SERIES_ORDER: CatalogSeries[] = ["SCR", "BTR", "HSR", "PCD", "MSR", "TBR"]

/* ─── Dimension Callout Component ─────────────────────────────────────── */
function DimensionCallout({
  label,
  value,
  position,
  direction = "right",
  delay = 0,
  isActive,
}: {
  label: string
  value: string
  position: { x: string; y: string }
  direction?: "left" | "right" | "top" | "bottom"
  delay?: number
  isActive: boolean
}) {
  const lineLength = direction === "left" || direction === "right" ? 60 : 40

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Connector line */}
      <motion.div
        className={`absolute ${direction === "right" ? "left-0" : direction === "left" ? "right-0" : "left-1/2"} ${
          direction === "bottom" ? "top-0" : direction === "top" ? "bottom-0" : "top-1/2"
        }`}
        style={{
          width: direction === "left" || direction === "right" ? lineLength : 1,
          height: direction === "top" || direction === "bottom" ? lineLength : 1,
          transform:
            direction === "left"
              ? "translateX(100%)"
              : direction === "top"
              ? "translateY(100%)"
              : direction === "bottom"
              ? ""
              : "translateY(-50%)",
        }}
        initial={{ scaleX: direction === "left" || direction === "right" ? 0 : 1, scaleY: direction === "top" || direction === "bottom" ? 0 : 1 }}
        animate={{ scaleX: 1, scaleY: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
      >
        <div className="w-full h-full bg-cyan-400/60" />
      </motion.div>

      {/* Callout box */}
      <motion.div
        className={`absolute ${
          direction === "right" ? "left-16" : direction === "left" ? "right-16" : direction === "bottom" ? "top-12 left-1/2 -translate-x-1/2" : "bottom-12 left-1/2 -translate-x-1/2"
        } bg-ow-975/95 border border-cyan-500/30 backdrop-blur-sm px-3 py-2 whitespace-nowrap`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
      >
        <div className="text-[0.6rem] font-mono uppercase tracking-widest text-cyan-400/70 mb-0.5">{label}</div>
        <div className="text-sm font-mono font-bold text-white">{value}</div>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
      </motion.div>

      {/* Endpoint dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-cyan-400 border-2 border-cyan-300"
        style={{
          left: direction === "left" ? "auto" : direction === "right" ? -4 : "50%",
          right: direction === "left" ? -4 : "auto",
          top: direction === "top" ? "auto" : direction === "bottom" ? -4 : "50%",
          bottom: direction === "top" ? -4 : "auto",
          transform: (direction === "top" || direction === "bottom") ? "translateX(-50%)" : "translateY(-50%)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay }}
      />
    </motion.div>
  )
}

/* ─── Interactive Technical Drawing Canvas ───────────────────────────── */
function TechnicalDrawingCanvas({
  series,
  selectedProduct,
  onSelectProduct,
}: {
  series: CatalogSeries
  selectedProduct: CatalogEntry | null
  onSelectProduct: (entry: CatalogEntry) => void
}) {
  const meta = SERIES_META[series]
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  const products = useMemo(() => catalogEntries.filter((e) => e.series === series), [series])

  return (
    <motion.div
      ref={canvasRef}
      className="relative w-full h-full bg-[#0a0f14] overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(0, 200, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        }}
      />

      {/* Center crosshairs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/10" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/10" />
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 border border-cyan-500/30 rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500/50 rounded-full" />
        </div>
      </div>

      {/* Dynamic cursor crosshair */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.div
              className="absolute h-px bg-orange-500/40 pointer-events-none"
              style={{
                top: mousePos.y,
                left: 0,
                right: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute w-px bg-orange-500/40 pointer-events-none"
              style={{
                left: mousePos.x,
                top: 0,
                bottom: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Coordinate display */}
            <motion.div
              className="absolute font-mono text-[0.6rem] text-orange-400/80 pointer-events-none bg-ow-975/80 px-2 py-1"
              style={{
                left: mousePos.x + 12,
                top: mousePos.y + 12,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              X:{mousePos.x.toFixed(0)} Y:{mousePos.y.toFixed(0)}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main reamer illustration - SVG technical drawing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          key={series}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Technical drawing SVG */}
          <svg viewBox="0 0 600 200" className="w-[90%] max-w-[700px] h-auto mx-auto">
            {/* Main body outline */}
            <motion.g
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* Shank section */}
              <motion.rect
                x="50"
                y="80"
                width="150"
                height="40"
                fill="none"
                stroke={meta.accent}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              {/* Transition taper */}
              <motion.polygon
                points="200,80 250,70 250,130 200,120"
                fill="none"
                stroke={meta.accent}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              {/* Cutting section with flutes */}
              <motion.rect
                x="250"
                y="70"
                width="280"
                height="60"
                fill="none"
                stroke={meta.accent}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              {/* Flute lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.line
                  key={i}
                  x1={270 + i * 45}
                  y1="72"
                  x2={280 + i * 45}
                  y2="128"
                  stroke={meta.accent}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                />
              ))}
              {/* Cutting tip */}
              <motion.polygon
                points="530,70 550,100 530,130"
                fill="none"
                stroke={meta.accent}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
            </motion.g>

            {/* Dimension lines */}
            <g className="text-cyan-400" fill="currentColor" stroke="currentColor">
              {/* Overall length dimension */}
              <line x1="50" y1="160" x2="550" y2="160" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              <line x1="50" y1="155" x2="50" y2="165" strokeWidth="0.5" opacity="0.5" />
              <line x1="550" y1="155" x2="550" y2="165" strokeWidth="0.5" opacity="0.5" />
              <text x="300" y="175" textAnchor="middle" className="text-[0.5rem] font-mono fill-cyan-400/70">
                L = 150mm
              </text>

              {/* Diameter dimension */}
              <line x1="400" y1="40" x2="400" y2="70" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              <line x1="400" y1="130" x2="400" y2="150" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              <text x="420" y="50" className="text-[0.5rem] font-mono fill-cyan-400/70">
                Ø = {selectedProduct?.diameterRange || "4-25mm"}
              </text>

              {/* Shank dimension */}
              <line x1="50" y1="35" x2="200" y2="35" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              <text x="125" y="28" textAnchor="middle" className="text-[0.5rem] font-mono fill-cyan-400/70">
                Shank
              </text>
            </g>

            {/* Tolerance callout */}
            <g>
              <rect x="460" y="25" width="90" height="35" fill="rgba(0,0,0,0.7)" stroke={meta.accent} strokeWidth="0.5" />
              <text x="505" y="40" textAnchor="middle" className="text-[0.5rem] font-mono fill-white/60">
                Tolerance
              </text>
              <text x="505" y="53" textAnchor="middle" className="text-[0.65rem] font-mono font-bold" fill={meta.accent}>
                {selectedProduct?.tolerance || "H7"}
              </text>
            </g>

            {/* Series badge */}
            <g>
              <rect x="50" y="25" width="60" height="25" fill={meta.accent} fillOpacity="0.2" stroke={meta.accent} strokeWidth="0.5" />
              <text x="80" y="42" textAnchor="middle" className="text-[0.6rem] font-mono font-bold" fill={meta.accent}>
                {series}
              </text>
            </g>
          </svg>

          {/* Interactive callouts */}
          <DimensionCallout
            label="Material"
            value={selectedProduct?.material || meta.label}
            position={{ x: "15%", y: "30%" }}
            direction="left"
            delay={0.2}
            isActive={!!selectedProduct}
          />
          <DimensionCallout
            label="Coating"
            value={selectedProduct?.coating || "TiAlN"}
            position={{ x: "75%", y: "20%" }}
            direction="right"
            delay={0.4}
            isActive={!!selectedProduct}
          />
          <DimensionCallout
            label="Flutes"
            value={selectedProduct ? `${selectedProduct.flutes} FL` : "4-8 FL"}
            position={{ x: "60%", y: "75%" }}
            direction="bottom"
            delay={0.6}
            isActive={!!selectedProduct}
          />
        </motion.div>
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0, 200, 255, 0.02) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Top-left info panel */}
      <div className="absolute top-4 left-4 font-mono text-[0.6rem]">
        <div className="text-cyan-400/50 uppercase tracking-widest mb-1">Active Series</div>
        <div className="text-white font-bold text-lg" style={{ color: meta.accent }}>
          {meta.label}
        </div>
        <div className="text-white/40 text-[0.55rem] mt-1 max-w-[200px]">{meta.description}</div>
      </div>

      {/* Bottom-right product count */}
      <div className="absolute bottom-4 right-4 font-mono text-[0.6rem] text-right">
        <div className="text-cyan-400/50 uppercase tracking-widest mb-1">Products</div>
        <div className="text-white font-bold text-2xl">{products.length}</div>
        <div className="text-white/30 text-[0.5rem]">in this series</div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30" />
    </motion.div>
  )
}

/* ─── Series Selector Tab ─────────────────────────────────────────────── */
function SeriesTab({
  series,
  isActive,
  onClick,
  count,
}: {
  series: CatalogSeries
  isActive: boolean
  onClick: () => void
  count: number
}) {
  const meta = SERIES_META[series]

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-5 py-4 text-left transition-all ${
        isActive ? "bg-ow-975" : "bg-ow-50 hover:bg-ow-100"
      }`}
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: meta.accent }}
          layoutId="activeSeriesIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      {/* Label & count */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-ow-800"}`}>
          {meta.label}
        </div>
        <div className={`text-xs font-mono ${isActive ? "text-white/50" : "text-ow-400"}`}>{count} products</div>
      </div>

      {/* Arrow */}
      <svg
        className={`w-4 h-4 transition-transform ${isActive ? "text-white/50 rotate-0" : "text-ow-300 -rotate-90"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </motion.button>
  )
}

/* ─── Product List Item ───────────────────────────────────────────────── */
function ProductListItem({
  entry,
  isSelected,
  onClick,
}: {
  entry: CatalogEntry
  isSelected: boolean
  onClick: () => void
}) {
  const meta = SERIES_META[entry.series]

  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full p-4 text-left border-b border-ow-100 transition-all ${
        isSelected ? "bg-orange-50" : "bg-white hover:bg-ow-50"
      }`}
      whileHover={{ x: 2 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500"
          layoutId="selectedProduct"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Code */}
          <div className="font-mono font-bold text-sm" style={{ color: meta.accent }}>
            {entry.code}
          </div>
          {/* Name */}
          <div className="text-sm text-ow-700 mt-0.5 line-clamp-2">{entry.name}</div>
          {/* Specs */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[0.6rem] font-mono px-2 py-0.5 bg-ow-100 text-ow-500 rounded">
              {entry.diameterRange}
            </span>
            <span className="text-[0.6rem] font-mono px-2 py-0.5 bg-ow-100 text-ow-500 rounded">
              {entry.tolerance}
            </span>
          </div>
        </div>

        {/* Stock indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`w-2 h-2 rounded-full ${entry.inStock ? "bg-green-500" : "bg-ow-300"}`}
          />
          <span className="text-[0.55rem] font-mono uppercase text-ow-400">
            {entry.inStock ? "Stock" : "Lead"}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

/* ─── Product Detail Panel ────────────────────────────────────────────── */
function ProductDetailPanel({ entry, onClose }: { entry: CatalogEntry; onClose: () => void }) {
  const meta = SERIES_META[entry.series]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ow-975/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-ow-100 bg-white/95 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-[0.6rem] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded"
                style={{ backgroundColor: `${meta.accent}15`, color: meta.accent }}
              >
                {entry.series} — {entry.seriesLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${entry.inStock ? "bg-green-500" : "bg-ow-300"}`} />
                <span className="text-[0.6rem] font-mono uppercase text-ow-400">
                  {entry.inStock ? "In stock" : "Lead time"}
                </span>
              </span>
            </div>
            <h2 className="font-mono font-bold text-2xl" style={{ color: meta.accent }}>
              {entry.code}
            </h2>
            <p className="text-ow-600 mt-1">{entry.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-ow-100 hover:bg-ow-200 flex items-center justify-center text-ow-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Technical Drawing */}
            <div className="relative aspect-video bg-[#0a0f14] rounded-xl overflow-hidden">
              {/* Grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 200, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 200, 255, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* SVG Drawing */}
              <svg viewBox="0 0 400 150" className="absolute inset-0 w-full h-full p-8">
                <rect x="30" y="55" width="100" height="40" fill="none" stroke={meta.accent} strokeWidth="1" />
                <polygon points="130,55 160,45 160,105 130,95" fill="none" stroke={meta.accent} strokeWidth="1" />
                <rect x="160" y="45" width="180" height="60" fill="none" stroke={meta.accent} strokeWidth="1" />
                <polygon points="340,45 360,75 340,105" fill="none" stroke={meta.accent} strokeWidth="1" />
                {/* Dimension */}
                <line x1="30" y1="125" x2="360" y2="125" stroke="rgba(0,200,255,0.4)" strokeWidth="0.5" strokeDasharray="3,3" />
                <text x="195" y="138" textAnchor="middle" className="text-[0.4rem] font-mono" fill="rgba(0,200,255,0.7)">
                  L = Overall Length
                </text>
              </svg>
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-500/30" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-500/30" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-500/30" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-500/30" />
            </div>

            {/* Right - Specifications */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-ow-400 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-px bg-ow-200 border border-ow-200 rounded-lg overflow-hidden">
                {[
                  { label: "Diameter Range", value: entry.diameterRange },
                  { label: "Tolerance", value: entry.tolerance },
                  { label: "Flutes", value: String(entry.flutes) },
                  { label: "Material", value: entry.material },
                  { label: "Coating", value: entry.coating },
                  { label: "Shank Type", value: entry.shankType },
                  { label: "Coolant Through", value: entry.coolant ? "Yes" : "No" },
                  { label: "Application", value: entry.application },
                ].map((spec) => (
                  <div key={spec.label} className="bg-white p-3">
                    <div className="text-[0.6rem] font-mono uppercase tracking-wider text-ow-400 mb-1">
                      {spec.label}
                    </div>
                    <div className="text-sm text-ow-900 font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>

              {entry.notes && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="text-[0.6rem] font-mono uppercase tracking-wider text-orange-600 mb-1">Notes</div>
                  <p className="text-sm text-ow-700">{entry.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-ow-100">
            <Link
              href={`/contact?product=${entry.code}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Request Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-ow-200 text-ow-600 font-medium rounded-lg hover:bg-ow-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Catalog Page ───────────────────────────────────────────────── */
export default function CatalogPage() {
  const [activeSeries, setActiveSeries] = useState<CatalogSeries>("SCR")
  const [selectedProduct, setSelectedProduct] = useState<CatalogEntry | null>(null)
  const [detailProduct, setDetailProduct] = useState<CatalogEntry | null>(null)
  const [search, setSearch] = useState("")

  const seriesProducts = useMemo(
    () => catalogEntries.filter((e) => e.series === activeSeries),
    [activeSeries]
  )

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return seriesProducts
    const q = search.toLowerCase()
    return seriesProducts.filter(
      (e) =>
        e.code.toLowerCase().includes(q) ||
        e.name.toLowerCase().includes(q) ||
        e.application.toLowerCase().includes(q)
    )
  }, [seriesProducts, search])

  // Auto-select first product when series changes
  useEffect(() => {
    if (seriesProducts.length > 0 && !selectedProduct) {
      setSelectedProduct(seriesProducts[0])
    }
  }, [seriesProducts, selectedProduct])

  // Reset selection when series changes
  useEffect(() => {
    setSelectedProduct(seriesProducts[0] || null)
    setSearch("")
  }, [activeSeries])

  return (
    <div className="min-h-screen bg-ow-50">
      {/* Hero */}
      <section className="relative bg-ow-975 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="padding-global py-20 md:py-28 relative">
          <div className="container-large">
            <div className="max-w-3xl">
              <motion.p
                className="text-xs font-mono uppercase tracking-[0.2em] text-orange-500 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Interactive Product Explorer
              </motion.p>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Precision Reamer
                <br />
                <span className="text-orange-500">Catalog</span>
              </motion.h1>
              <motion.p
                className="text-lg text-ow-400 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Explore {catalogEntries.length} precision reamer specifications with interactive technical drawings. 
                Click on any product to see detailed dimensions and specifications.
              </motion.p>

              {/* Quick stats */}
              <motion.div
                className="flex gap-8 mt-8 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { value: catalogEntries.length, label: "Products" },
                  { value: "6", label: "Series" },
                  { value: "H7", label: "Tolerance" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs font-mono uppercase tracking-wider text-ow-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-orange-500/30" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-orange-500/30" />
      </section>

      {/* Main content */}
      <section className="relative">
        <div className="padding-global py-12">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left sidebar - Series selector */}
              <div className="lg:col-span-3">
                <div className="sticky top-4 bg-white rounded-xl border border-ow-100 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-ow-100">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-ow-400">Select Series</h3>
                  </div>
                  <div className="divide-y divide-ow-100">
                    {SERIES_ORDER.map((series) => (
                      <SeriesTab
                        key={series}
                        series={series}
                        isActive={activeSeries === series}
                        onClick={() => setActiveSeries(series)}
                        count={catalogEntries.filter((e) => e.series === series).length}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Center - Interactive drawing canvas */}
              <div className="lg:col-span-6">
                <div className="sticky top-4">
                  <div className="bg-white rounded-xl border border-ow-100 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-ow-100 flex items-center justify-between">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-ow-400">
                        Technical Drawing
                      </h3>
                      <span className="text-[0.6rem] font-mono text-ow-300">Interactive • Hover for details</span>
                    </div>
                    <div className="aspect-video">
                      <TechnicalDrawingCanvas
                        series={activeSeries}
                        selectedProduct={selectedProduct}
                        onSelectProduct={setSelectedProduct}
                      />
                    </div>
                  </div>

                  {/* Selected product quick info */}
                  <AnimatePresence mode="wait">
                    {selectedProduct && (
                      <motion.div
                        key={selectedProduct.code}
                        className="mt-4 p-5 bg-white rounded-xl border border-ow-100 shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div
                              className="font-mono font-bold text-lg"
                              style={{ color: SERIES_META[selectedProduct.series].accent }}
                            >
                              {selectedProduct.code}
                            </div>
                            <p className="text-sm text-ow-600 mt-1">{selectedProduct.name}</p>
                            <div className="flex gap-2 mt-3">
                              <span className="text-[0.6rem] font-mono px-2 py-1 bg-ow-100 text-ow-600 rounded">
                                {selectedProduct.diameterRange}
                              </span>
                              <span className="text-[0.6rem] font-mono px-2 py-1 bg-ow-100 text-ow-600 rounded">
                                {selectedProduct.tolerance}
                              </span>
                              <span className="text-[0.6rem] font-mono px-2 py-1 bg-ow-100 text-ow-600 rounded">
                                {selectedProduct.flutes} FL
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setDetailProduct(selectedProduct)}
                            className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right sidebar - Product list */}
              <div className="lg:col-span-3">
                <div className="sticky top-4 bg-white rounded-xl border border-ow-100 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-ow-100">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-ow-400 mb-3">
                      Products in {activeSeries}
                    </h3>
                    <input
                      type="search"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-ow-200 rounded-lg outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                  <div className="max-h-[500px] overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((entry) => (
                        <ProductListItem
                          key={entry.code}
                          entry={entry}
                          isSelected={selectedProduct?.code === entry.code}
                          onClick={() => setSelectedProduct(entry)}
                        />
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm text-ow-400">No products match your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      <AnimatePresence>
        {detailProduct && (
          <ProductDetailPanel entry={detailProduct} onClose={() => setDetailProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
