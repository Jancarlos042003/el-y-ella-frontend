'use client'

import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { FlowerIcon, ShoppingBasket01Icon } from '@hugeicons/core-free-icons'

import { useCarrito } from '@/hooks/useCarrito'
import { useMe } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import { PaymentCartSummary } from '@/components/payment/PaymentCartSummary'
import { PaymentCheckoutForm } from '@/components/payment/PaymentCheckoutForm'
import { PaymentPageShell } from '@/components/payment/PaymentPageShell'

export default function PagoPage() {
  const { data: cart = [], isLoading } = useCarrito()
  const { data: user } = useMe()

  if (isLoading) {
    return (
      <PaymentPageShell>
        <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground/60">Preparando tu checkout...</p>
        </div>
      </PaymentPageShell>
    )
  }

  if (cart.length === 0) {
    return (
      <PaymentPageShell>
        <section className="glass mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center gap-6 rounded-[2rem] px-6 py-12 text-center md:px-10">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/12">
            <HugeiconsIcon
              icon={ShoppingBasket01Icon}
              className="size-10 text-primary"
              strokeWidth={1.6}
            />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              No hay productos listos para pagar
            </h1>
            <p className="text-sm leading-6 text-foreground/65 md:text-base">
              Vuelve al carrito o explora el catálogo para elegir el detalle perfecto.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={ROUTES.carrito}
              className="rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-semibold text-foreground transition-luxury hover:border-primary/25 hover:text-primary"
            >
              Volver al carrito
            </Link>
            <Link
              href={ROUTES.home}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-luxury hover:bg-primary-dark"
            >
              <HugeiconsIcon icon={FlowerIcon} className="size-4" strokeWidth={1.6} />
              Explorar catálogo
            </Link>
          </div>
        </section>
      </PaymentPageShell>
    )
  }

  return (
    <PaymentPageShell>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <PaymentCheckoutForm user={user} />
        <PaymentCartSummary items={cart} />
      </div>
    </PaymentPageShell>
  )
}
