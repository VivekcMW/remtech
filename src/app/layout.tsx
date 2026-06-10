import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Preloader from "@/components/Preloader"
import PageTransition from "@/components/layout/PageTransition"
import SmoothScroll from "@/components/layout/SmoothScroll"
import ScrollProgress from "@/components/layout/ScrollProgress"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "REAMTECH PRECISION TOOLS | Right First Time",
  description:
    "High Precision Brazed tools for Turning, Milling, Boring and Reaming Applications. Based in Bengaluru, India.",
  keywords: [
    "precision tools",
    "reamers",
    "carbide tools",
    "PCD tools",
    "cutting tools",
    "Bangalore",
  ],
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-ow-50 font-sans text-ow-950 antialiased overflow-x-hidden">
        <SmoothScroll>
          <ScrollProgress />
<Preloader />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
