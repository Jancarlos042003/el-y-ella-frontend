import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/Providers'

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
          {children}
        </Providers>
      </body>
    </html>
  )
}
