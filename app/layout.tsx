import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"

const quicksand = Quicksand({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pathly - Learning Roadmap Generator",
  description: "Create personalized learning roadmaps from first step to mastery",
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#C9826F",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  )
}
