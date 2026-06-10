import type { Metadata } from "next"
import CatalogPage from "@/components/catalog/CatalogPage"

export const metadata: Metadata = {
  title: "Reamer Catalog | REAMTECH PRECISION TOOLS",
  description:
    "Complete catalog of Reamtech precision reamers — solid carbide, brazed tip, HSS, PCD, multi-step, and taper reamers. Specifications, tolerances, and application data.",
}

export default function Catalog() {
  return <CatalogPage />
}
