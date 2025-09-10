import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/components/session-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "VirtualLabs - Coding Practice Platform",
  description: "Practice coding problems online with our browser-based IDE",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <SessionProvider>{children}</SessionProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
