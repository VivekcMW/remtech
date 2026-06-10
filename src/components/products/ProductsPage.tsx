"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { products } from "@/lib/data"
import type { Product, ProductCategory } from "@/types"
import ProductViewer from "./ProductViewer"
import ProductDetail from "./ProductDetail"

type FilterCategory = ProductCategory | "all"

const CATEGORY_CONFIG: Record<ProductCategory, { 
  label: string
  accent: string
  notation: string
  icon: string
  description: string
}> = {
  reamer: { 
    label: "Reamer", 
    accent: "#f97316",
    notation: "Ø H7 · ±0.002mm",
    icon: "◎",
    description: "Precision bore finishing"
  },
  boring: { 
    label: "Boring", 
    accent: "#3b82f6",
    notation: "IT5 · L/D 7:1",
    icon: "⊕",
    description: "Internal diameter machining"
  },
  milling: { 
    label: "Milling", 
    accent: "#10b981",
    notation: "3-IN-1 · H7",
    icon: "⌖",
    description: "Multi-axis material removal"
  },
  pcd: { 
    label: "PCD", 
    accent: "#a855f7",
    notation: "Ra ≤ 0.4µm",
    icon: "◇",
    description: "Diamond-edge precision"
  },
  multistep: { 
    label: "Multi-step", 
    accent: "#f97316",
    notation: "DUAL Ø · H7",
    icon: "⋮",
    description: "Combined operations"
  },
}

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: "All Products", value: "all" },
  { label: "Reamer", value: "reamer" },
  { label: "Boring", value: "boring" },
  { label: "Milling", value: "milling" },
  { label: "PCD", value: "pcd" },
  { label: "Multi-step", value: "multistep" },
]

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
function AnimatedCounter({ 
  value, 
  suffix = "", 
  inView 
}: { 
  readonly value: number
  readonly suffix?: string
  readonly inView: boolean 
}) {
  const [display, setDisplay] = useState(0)
  
  useEffect(() => {
    if (!inView) return
    
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [inView, value])
  
  return (
    <span className="tabular-nums">
      {display}
      <span className="text-orange-500">{suffix}</span>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY TAB COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
function CategoryTab({
  filter,
  isActive,
  count,
  onClick,
}: {
  readonly filter: typeof FILTERS[0]
  readonly isActive: boolean
  readonly count: number
  readonly onClick: () => void
}) {
  const config = filter.value !== "all" ? CATEGORY_CONFIG[filter.value as ProductCategory] : null
  
  return (
    <motion.button
      onClick={onClick}
      className="relative group flex items-center gap-3 px-5 py-3 transition-all duration-300"
      style={{
        background: isActive ? "rgba(249,115,22,0.08)" : "transparent",
      }}
      whileHover={{ background: "rgba(249,115,22,0.05)" }}
    >
      {/* Bottom border indicator - separate element to avoid animation warning */}
      <span 
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
        style={{ 
          background: isActive ? "#f97316" : "transparent",
          opacity: isActive ? 1 : 0,
        }}
      />
      
      {/* Icon */}
      {config && (
        <span 
          className="text-lg transition-colors duration-300"
          style={{ color: isActive ? config.accent : "rgba(0,0,0,0.25)" }}
        >
          {config.icon}
        </span>
      )}
      
      {/* Label */}
      <span 
        className="font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300"
        style={{ color: isActive ? "#0a0a0a" : "rgba(0,0,0,0.45)" }}
      >
        {filter.label}
      </span>
      
      {/* Count badge */}
      <span 
        className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded transition-all duration-300"
        style={{ 
          background: isActive ? "#f97316" : "rgba(0,0,0,0.06)",
          color: isActive ? "#fff" : "rgba(0,0,0,0.4)",
        }}
      >
        {count}
      </span>
      
      {/* Active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 right-2 w-1.5 h-1.5 rounded-full bg-orange-500"
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT CARD COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
function ProductCard({
  product,
  isSelected,
  onSelect,
  onHover,
  index,
}: {
  readonly product: Product
  readonly isSelected: boolean
  readonly onSelect: (p: Product) => void
  readonly onHover: (p: Product | null) => void
  readonly index: number
}) {
  const config = CATEGORY_CONFIG[product.category]
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  
  return (
    <motion.button
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(product)}
      onMouseEnter={() => { onHover(product); setIsHovered(true) }}
      onMouseLeave={() => { onHover(null); setIsHovered(false) }}
      className="group relative text-left w-full overflow-hidden transition-all duration-500"
      style={{
        background: isSelected ? "rgba(249,115,22,0.03)" : "#fff",
        border: `1px solid ${isSelected ? config.accent : "rgba(0,0,0,0.08)"}`,
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: config.accent }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSelected || isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Left accent bar */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className="absolute left-0 top-0 bottom-0 w-1 origin-top"
            style={{ background: config.accent }}
          />
        )}
      </AnimatePresence>
      
      {/* Technical header strip */}
      <div 
        className="relative px-5 py-3 overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Blueprint grid overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, ${config.accent} 1px, transparent 1px), linear-gradient(to bottom, ${config.accent} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        
        {/* Category + notation */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: config.accent }}>{config.icon}</span>
            <span 
              className="font-mono text-[0.6rem] uppercase tracking-[0.15em] font-medium"
              style={{ color: config.accent }}
            >
              {config.label}
            </span>
          </div>
          <span className="font-mono text-[0.55rem] text-white/50 tracking-wider">
            {config.notation}
          </span>
        </div>
        
        {/* Featured badge */}
        {product.featured && (
          <span 
            className="absolute top-1 right-2 font-mono text-[0.45rem] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded"
            style={{ background: `${config.accent}20`, color: config.accent }}
          >
            Featured
          </span>
        )}
        
        {/* Scan line animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${config.accent}15 50%, transparent 100%)`,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-medium text-ow-975 leading-snug mb-2 pr-4">
          {product.name}
        </h3>
        <p className="text-xs text-ow-500 leading-relaxed line-clamp-2 mb-4">
          {product.tagline}
        </p>
        
        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col">
            <span className="font-mono text-[0.5rem] text-ow-300 uppercase tracking-wider">Range</span>
            <span className="font-mono text-xs text-ow-700">{product.specs.diameterRange}</span>
          </div>
          <div className="w-px h-6 bg-ow-100" />
          <div className="flex flex-col">
            <span className="font-mono text-[0.5rem] text-ow-300 uppercase tracking-wider">Tolerance</span>
            <span className="font-mono text-xs text-ow-700">{product.specs.tolerance}</span>
          </div>
        </div>
        
        {/* View details CTA */}
        <motion.div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <span className="font-mono text-[0.55rem] text-ow-300 uppercase tracking-wider">
            {product.specs.material.split(" ")[0]}
          </span>
          <motion.span
            className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wide"
            style={{ color: config.accent }}
            initial={{ opacity: 0.5, x: -5 }}
            animate={{ opacity: isSelected || isHovered ? 1 : 0.5, x: isSelected || isHovered ? 0 : -5 }}
          >
            View Details
            <motion.span
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.span>
        </motion.div>
      </div>
      
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${config.accent}08 0%, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PRODUCTS PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const filtered = useMemo(
    () => (activeFilter === "all" ? products : products.filter((p) => p.category === activeFilter)),
    [activeFilter]
  )

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    FILTERS.forEach((f) => {
      counts[f.value] = f.value === "all" ? products.length : products.filter((p) => p.category === f.value).length
    })
    return counts
  }, [])

  const viewerProduct = hoveredProduct ?? selectedProduct ?? filtered[0] ?? null

  function handleSelect(p: Product) {
    setSelectedProduct(p)
    setDetailProduct(p)
  }

  return (
    <div className="min-h-screen bg-white text-ow-975">
      
      {/* ═══════════════════════════════════════════════════════════════════
         HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section 
        ref={heroRef} 
        className="relative overflow-hidden"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.06) 0%, transparent 50%)",
          }}
        />

        <div className="padding-global pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="container-large">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-xs text-ow-400 mb-8"
            >
              <span className="font-mono">Home</span>
              <span className="text-ow-200">/</span>
              <span className="font-mono text-orange-500">Products</span>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left column */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="font-mono text-[0.65rem] text-orange-600 uppercase tracking-[0.1em]">
                      Precision Engineering
                    </span>
                  </div>
                  
                  {/* Heading */}
                  <h1 className="heading-style-h1 mb-6">
                    Product
                    <br />
                    <span className="relative">
                      Catalogue
                      <motion.span
                        className="absolute -bottom-2 left-0 h-1 bg-orange-500/20"
                        initial={{ width: 0 }}
                        animate={isHeroInView ? { width: "100%" } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-base md:text-lg text-ow-500 leading-relaxed max-w-lg">
                    Every tool family engineered around one principle — 
                    <span className="text-ow-800 font-medium"> the bore must be right, first time.</span>
                  </p>
                </motion.div>
                
                {/* Stats grid */}
                <motion.div
                  ref={statsRef}
                  className="grid grid-cols-3 gap-6 mt-12 pt-8"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[
                    { value: products.length, suffix: "+", label: "Products" },
                    { value: 5, suffix: "", label: "Categories" },
                    { value: 14, suffix: "+", label: "Years" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-mono text-3xl md:text-4xl font-light text-ow-900 mb-1">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isStatsInView} />
                      </div>
                      <div className="font-mono text-[0.6rem] text-ow-400 uppercase tracking-[0.15em]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Right column — Category overview cards */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, x: 30 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {(Object.entries(CATEGORY_CONFIG) as [ProductCategory, typeof CATEGORY_CONFIG[ProductCategory]][]).map(([key, config], i) => {
                  const count = products.filter(p => p.category === key).length
                  return (
                    <motion.button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className="group relative p-4 text-left overflow-hidden transition-all duration-300"
                      style={{
                        background: activeFilter === key ? "rgba(249,115,22,0.05)" : "#fafafa",
                        border: `1px solid ${activeFilter === key ? config.accent : "rgba(0,0,0,0.06)"}`,
                      }}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    >
                      {/* Icon */}
                      <span 
                        className="text-2xl mb-3 block transition-colors"
                        style={{ color: activeFilter === key ? config.accent : "rgba(0,0,0,0.2)" }}
                      >
                        {config.icon}
                      </span>
                      
                      {/* Label */}
                      <h3 className="font-medium text-sm text-ow-900 mb-1">{config.label}</h3>
                      <p className="text-[0.65rem] text-ow-400 mb-2">{config.description}</p>
                      
                      {/* Count */}
                      <span 
                        className="font-mono text-[0.55rem] uppercase tracking-wider"
                        style={{ color: config.accent }}
                      >
                        {count} products
                      </span>
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: config.accent }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-orange-500/15 hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-orange-500/10 hidden lg:block" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         MAIN CONTENT: 3D VIEWER + PRODUCT LIST
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row">
        
        {/* Left — 3D Viewer (sticky on desktop) */}
        <div 
          className="lg:sticky lg:top-0 lg:self-start lg:w-[45%] w-full" 
          style={{ height: "60vw", minHeight: 400, maxHeight: "100vh" }}
        >
          <div className="lg:h-screen h-full relative">
            <ProductViewer product={viewerProduct} />
            
            {/* Floating info panel */}
            <AnimatePresence>
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-lg backdrop-blur-md pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span 
                        className="font-mono text-[0.55rem] uppercase tracking-wider"
                        style={{ color: CATEGORY_CONFIG[selectedProduct.category].accent }}
                      >
                        {CATEGORY_CONFIG[selectedProduct.category].label}
                      </span>
                      <h3 className="text-white font-medium mt-1">{selectedProduct.name}</h3>
                      <p className="text-white/50 text-xs mt-1">{selectedProduct.tagline}</p>
                    </div>
                    <span className="font-mono text-xs text-white/30">{selectedProduct.specs.diameterRange}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right — Product list */}
        <div 
          className="lg:w-[55%] w-full" 
          style={{ borderLeft: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* Sticky filter tabs */}
          <div
            className="sticky top-0 z-10 bg-white/98 backdrop-blur-md"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max">
                {FILTERS.map((f) => (
                  <CategoryTab
                    key={f.value}
                    filter={f}
                    isActive={activeFilter === f.value}
                    count={filterCounts[f.value]}
                    onClick={() => setActiveFilter(f.value)}
                  />
                ))}
              </div>
            </div>
            
            {/* Results count bar */}
            <div className="px-5 py-3 flex items-center justify-between bg-ow-50/50">
              <p className="font-mono text-[0.6rem] text-ow-500 uppercase tracking-[0.12em]">
                Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
              <p className="font-mono text-[0.6rem] text-ow-400">
                {selectedProduct ? (
                  <span>
                    Selected: <span className="text-orange-500">{selectedProduct.name}</span>
                  </span>
                ) : (
                  "Click a product to view details"
                )}
              </p>
            </div>
          </div>

          {/* Product grid */}
          <div className="p-5">
            <AnimatePresence mode="popLayout">
              <motion.div 
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filtered.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onSelect={handleSelect}
                    onHover={setHoveredProduct}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-mono text-sm text-ow-400">No products in this category.</p>
              </div>
            )}
          </div>
          
          {/* Footer spacer */}
          <div className="h-20" />
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />
    </div>
  )
}
