import { cn } from "@/lib/utils"

export interface SectionHeaderProps {
  label:       string
  labelStyle?: "pill" | "allcaps"
  level?:      1 | 2 | 3
  heading:     React.ReactNode
  description?: React.ReactNode
  className?:  string
}

export default function SectionHeader({
  label,
  labelStyle = "pill",
  level      = 2,
  heading,
  description,
  className,
}: SectionHeaderProps) {
  const HeadingTag = `h${level}` as "h1" | "h2" | "h3"
  const headingCls = `heading-style-h${level}` as
    | "heading-style-h1"
    | "heading-style-h2"
    | "heading-style-h3"

  return (
    <div className={cn("", className)}>
      {labelStyle === "pill" ? (
        <div className="pill-wrapper">
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
