"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "ghost"
export type ButtonSize    = "sm" | "md" | "lg"

export interface ButtonProps {
  variant?:  ButtonVariant
  size?:     ButtonSize
  href?:     string
  external?: boolean
  type?:     "button" | "submit" | "reset"
  disabled?: boolean
  showDot?:  boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  children: React.ReactNode
}

const base =
  "group inline-flex items-center gap-2.5 font-normal leading-none " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-orange-500 disabled:opacity-50 disabled:pointer-events-none"

const variantMap: Record<ButtonVariant, string> = {
  primary:   "bg-orange-500 hover:bg-orange-600 text-white",
  secondary: "border border-ow-300 text-ow-600 hover:text-ow-975 hover:border-ow-500 bg-transparent",
  ghost:     "text-ow-600 hover:text-ow-975 bg-transparent",
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-4   py-2    text-xs",
  md: "px-6   py-3    text-sm",
  lg: "px-8   py-3.5  text-base",
}

function Dot() {
  return (
    <span
      aria-hidden
      className="w-3.5 h-3.5 rounded-full border border-white/40 group-hover:bg-white/20 transition-colors shrink-0"
    />
  )
}

export default function Button({
  variant  = "primary",
  size     = "md",
  href,
  external,
  type     = "button",
  disabled,
  showDot,
  className,
  onClick,
  children,
}: ButtonProps) {
  const hasDot = showDot !== undefined ? showDot : variant === "primary"
  const classes = cn(base, variantMap[variant], sizeMap[size], className)

  const inner = (
    <>
      {hasDot && <Dot />}
      {children}
    </>
  )

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </a>
    )
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={classes}
    >
      {inner}
    </button>
  )
}
