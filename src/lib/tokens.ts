// Single source of truth for all design tokens used in JS/TS.
// CSS-land tokens live in globals.css @theme inline.

// ─── Animation ───────────────────────────────────────────────────────────────

export const ease = {
  out:    [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  spring: [0.22, 1,    0.36, 1   ] as [number, number, number, number],
  in:     [0.55, 0,    0.45, 1   ] as [number, number, number, number],
  inOut:  [0.45, 0,    0.55, 1   ] as [number, number, number, number],
}

export const duration = {
  fast: 0.2,
  base: 0.55,
  slow: 0.8,
  page: 0.35,
}

export const transition = {
  fast:   { duration: duration.fast, ease: ease.out    },
  base:   { duration: duration.base, ease: ease.out    },
  slow:   { duration: duration.slow, ease: ease.spring },
  page:   { duration: duration.page, ease: ease.out    },
} satisfies Record<string, { duration: number; ease: readonly number[] }>

// ─── Reusable Framer Motion variants ─────────────────────────────────────────

export const motionVariants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0  },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideFromLeft: {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0   },
  },
  slideFromRight: {
    hidden:  { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0  },
  },
} as const

// ─── Colors (for JS contexts: Three.js, Canvas, SVG) ─────────────────────────

export const colors = {
  brand:       "#f97316",
  brandHover:  "#ea580c",
  brandLight:  "#fdba74",
  neutral: {
    975: "#0a0a0a",
    950: "#171717",
    900: "#262626",
    800: "#404040",
    700: "#525252",
    600: "#737373",
    500: "#a3a3a3",
    400: "#d4d4d4",
    300: "#e5e5e5",
    200: "#f0f0f0",
    100: "#fafafa",
    50:  "#ffffff",
  },
} as const

// ─── Z-index scale ────────────────────────────────────────────────────────────

export const zIndex = {
  base:    1,
  overlay: 10,
  sticky:  100,
  nav:     999,
  modal:   1000,
} as const
