import { cn } from "@/lib/utils"

export interface SectionHeaderProps {
  label:       string
  labelStyle?: "pill" | "allcaps"
  level?:      1 | 2 | 3
  heading:     React.ReactNode
  description?: React.ReactNode
  className?:  string
  centered?:   boolean
}

export default function SectionHeader({
  label,
  labelStyle = "pill",
  level      = 2,
  heading,
  description,
  className,
  centered   = false,
}: SectionHeaderProps) {
  const HeadingTag = `h${level}` as "h1" | "h2" | "h3"
  const headingCls = `heading-style-h${level}` as
    | "heading-style-h1"
    | "heading-style-h2"
    | "heading-style-h3"

  return (
    <div className={cn(centered && "text-center", className)}>
      {labelStyle === "pill" ? (
        <div className={cn("pill-wrapper", centered && "justify-center")}>
          <div className="pill">{label}</div>
        </div>
      ) : (
        <p className="text-style-allcaps text-style-muted-50 mb-6">{label}</p>
      )}

      <HeadingTag className={headingCls}>{heading}</HeadingTag>

      {description && (
        <p className="text-size-medium mt-6">{description}</p>
      )}
    </div>
  )
}
