"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/src/components/navbar'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
            {children} 
      </body>
    </html>
  )
}
