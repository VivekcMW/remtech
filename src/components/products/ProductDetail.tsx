"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/types"

const categoryAccent: Record<string, string> = {
  reamer:    "#f97316",
  boring:    "#f43f5e",
  milling:   "#10b981",
  pcd:       "#a855f7",
  multistep: "#f97316",
}

const categoryLabel: Record<string, string> = {
  reamer:    "Reamer",
  boring:    "Boring Tool",
  milling:   "Milling Tool",
  pcd:       "PCD Tool",
  multistep: "Multi-step Tool",
}

interface ProductDetailProps {
  product: Product | null
  onClose: () => void
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.8 }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
              maxHeight: "80vh", overflowY: "auto",
              background: "#ffffff",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem", paddingBottom: "0.5rem" }}>
              <div style={{ width: 40, height: 4, borderRadius: 9999, background: "rgba(0,0,0,0.12)" }} />
            </div>

            <div style={{ padding: "0 1.5rem 3rem", maxWidth: "64rem", margin: "0 auto" }} className="md:px-12">

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
                    <span style={{
                      fontSize: "0.6rem", fontFamily: "monospace", textTransform: "uppercase",
                      letterSpacing: "0.1em", padding: "0.25rem 0.75rem",
                      border: `1px solid ${categoryAccent[product.category]}30`,
                      borderRadius: 9999,
                      color: categoryAccent[product.category],
                      background: `${categoryAccent[product.category]}0d`,
                    }}>
                      {categoryLabel[product.category]}
                    </span>
                    {product.featured && (
                      <span style={{ fontSize: "0.6rem", color: "rgba(0,0,0,0.3)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 500, color: "#0a0a0a", lineHeight: 1.2 }}>
                    {product.name}
                  </h2>
                  <p style={{ marginTop: "0.375rem", fontSize: "0.875rem", color: "rgba(0,0,0,0.45)" }}>
                    {product.tagline}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  style={{
                    flexShrink: 0, width: 36, height: 36,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(0,0,0,0.12)", borderRadius: "50%",
                    background: "transparent", cursor: "pointer", color: "rgba(0,0,0,0.4)",
                    transition: "all 0.15s",
                  }}
                  aria-label="Close"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(0,0,0,0.55)", marginBottom: "2.5rem", maxWidth: "62ch" }}>
                {product.description}
              </p>

              <div style={{ display: "grid", gap: "2.5rem" }} className="md:grid-cols-2">

                {/* Specs */}
                <div>
                  <p style={{ fontSize: "0.6rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.3)", marginBottom: "1rem" }}>
                    Technical Specifications
                  </p>
                  <div>
                    {Object.entries({
                      "Diameter Range": product.specs.diameterRange,
                      "Material":       product.specs.material,
                      "Tolerance":      product.specs.tolerance,
                      "Coating":        product.specs.coating,
                      "Application":    product.specs.application,
                    }).map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                        <span style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(0,0,0,0.35)", flexShrink: 0 }}>
                          {label}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "#171717", textAlign: "right" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights + CTAs */}
                <div>
                  <p style={{ fontSize: "0.6rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.3)", marginBottom: "1rem" }}>
                    Key Highlights
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                    {product.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.875rem", color: "#404040" }}>
                        <span style={{ marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: categoryAccent[product.category], flexShrink: 0 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a href="/contact" style={{
                      display: "inline-flex", alignItems: "center", gap: "0.625rem",
                      padding: "0.75rem 1.5rem", fontSize: "0.875rem",
                      background: "#f97316", color: "#ffffff", textDecoration: "none",
                      transition: "background 0.15s",
                    }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", flexShrink: 0 }} />
                      Request Quote
                    </a>
                    <a href="/contact" style={{
                      display: "inline-flex", alignItems: "center", gap: "0.625rem",
                      padding: "0.75rem 1.5rem", fontSize: "0.875rem",
                      border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.55)",
                      textDecoration: "none", transition: "all 0.15s",
                    }}>
                      Download Datasheet
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
