export interface NavLink {
  href: string
  label: string
}

export interface Feature {
  id: string
  title: string
  description: string
  image: string
  icon?: string
}

export interface Partner {
  name: string
  url: string
  image: string
  logoLight: string
  logoDark: string
}

export interface PressItem {
  category: string
  title: string
  description: string
  url: string
}

export type ProductCategory = 'reamer' | 'boring' | 'milling' | 'pcd' | 'multistep'

export interface ProductSpec {
  diameterRange: string
  material: string
  tolerance: string
  coating: string
  application: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  tagline: string
  description: string
  specs: ProductSpec
  highlights: string[]
  featured?: boolean
}

export type CatalogSeries = "SCR" | "BTR" | "HSR" | "PCD" | "MSR" | "TBR"

export interface CatalogEntry {
  code: string
  name: string
  series: CatalogSeries
  seriesLabel: string
  diameterRange: string
  flutes: number | string
  tolerance: string
  material: string
  coating: string
  shankType: string
  coolant: boolean
  application: string
  inStock: boolean
  notes?: string
}
