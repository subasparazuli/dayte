import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Dayte — Your date for the day, privacy ensured',
  description: 'Dayte — Your date for the day, privacy ensured. Premium hourly short-stay accommodation in Nepal. Find hotels, guest rooms & private spaces.',
  openGraph: {
    title: 'Dayte',
    description: 'Your date for the day, privacy ensured. Book private stays by the hour in Nepal.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
