import type { Metadata } from "next"
import ProductsPage from "@/components/products/ProductsPage"

export const metadata: Metadata = {
  title: "Products | REAMTECH PRECISION TOOLS",
  description:
    "Explore our catalogue of solid carbide reamers, brazed tip reamers, PCD tools, boring bars, and multi-step tooling — all engineered for sub-micron bore tolerances.",
  keywords: [
    "solid carbide reamer",
    "PCD reamer",
    "boring bar",
    "expandable reamer",
    "precision cutting tools",
    "H7 tolerance",
  ],
}

export default function ProductsRoute() {
  return <ProductsPage />
}
