import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import { Providers } from '@/utils/providers'
import { PrimaryLayout } from '@/components/layout/PrimaryLayout'

export const metadata: Metadata = {
  title: 'BS-Frontend-Generator App',
  description: 'Professional frontend application built with BS-Frontend-Generator',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BS-Frontend-Generator',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PrimaryLayout>
            {children}
          </PrimaryLayout>
        </Providers>
      </body>
    </html>
  )
}
