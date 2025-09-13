import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pixel Artist Portfolio | Retro Digital Art Showcase',
  description: 'Explore stunning pixel art creations and digital masterpieces. Professional pixel artist portfolio featuring game sprites, characters, and environments.',
  keywords: 'pixel art, digital art, game sprites, retro art, 8-bit, 16-bit, portfolio',
  authors: [{ name: 'Pixel Artist' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Pixel Artist Portfolio',
    description: 'Professional pixel art showcase and portfolio',
    type: 'website',
    locale: 'en_US',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="pixel-cursor bg-pixel-bg text-pixel-text antialiased">
        <UserProvider>
          <div className="crt-effect min-h-screen">
            <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20"></div>
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
