import { cn } from "@/lib/utils"

export type CardVariant = "default" | "inset" | "elevated"

export interface CardProps {
  variant?:     CardVariant
  accentColor?: string
  className?:   string
  children:     React.ReactNode
}

const variantMap: Record<CardVariant, string> = {
  default:  "border border-ow-300 bg-ow-50",
  inset:    "border border-ow-200 bg-ow-100",
  elevated: "bg-ow-50 shadow-card",
}

export default function Card({ variant = "default", accentColor, className, children }: CardProps) {
  return (
    <div className={cn("relative overflow-hidden", variantMap[variant], className)}>
      {accentColor && (
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: accentColor }}
        />
      )}
      {children}
    </div>
  )
}
