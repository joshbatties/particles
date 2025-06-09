import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import ParticleBackground from "./components/particle-background"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleBackground />
        {children}
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
