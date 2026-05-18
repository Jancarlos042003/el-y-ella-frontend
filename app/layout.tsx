import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'El y Ella Detalles — Flores que cuentan historias',
  description: 'Bouquets premium con flores frescas y entregas que enamoran.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(poppins.variable, playfair.variable)}
    >
      <body className="antialiased">
        <Providers>
          <Navbar />
          {/* pt compensa el navbar fijo; pb-16 compensa el bottom nav en mobile */}
          <main className="min-h-screen pt-[5.5rem] pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
