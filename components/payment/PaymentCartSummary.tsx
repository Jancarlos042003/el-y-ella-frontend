import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons'

import { formatCurrency } from '@/components/payment/payment.utils'
import type { CartResponse } from '@/types/carrito.types'

type PaymentCartSummaryProps = {
  items: CartResponse[]
}

export function PaymentCartSummary({ items }: PaymentCartSummaryProps) {
  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0)

  return (
    <aside className="glass shadow-floating rounded-[2rem] p-6 md:p-8 lg:sticky lg:top-28">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/12">
          <HugeiconsIcon
            icon={ShoppingBasket01Icon}
            className="size-6 text-primary"
            strokeWidth={1.6}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Tu compra</p>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Resumen</h2>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-[1.5rem] border border-border/70 bg-background/72 p-4"
          >
            <div className="relative size-16 overflow-hidden rounded-[1.25rem] bg-muted">
              {item.flowerImageUrl ? (
                <Image
                  src={item.flowerImageUrl}
                  alt={item.flowerName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{item.flowerName}</p>
              <p className="text-sm text-foreground/55">
                {item.quantity} x {formatCurrency(item.price)}
              </p>
            </div>

            <p className="text-sm font-semibold tabular-nums text-foreground">
              {formatCurrency(item.subtotal)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm">
        <div className="flex items-center justify-between text-foreground/55">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-foreground/55">
          <span>Envío</span>
          <span>Se confirma con el pedido</span>
        </div>
        <div className="flex items-center justify-between pt-2 text-base font-semibold text-foreground">
          <span>Total estimado</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>
    </aside>
  )
}
