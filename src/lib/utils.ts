export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ")
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num)
}
