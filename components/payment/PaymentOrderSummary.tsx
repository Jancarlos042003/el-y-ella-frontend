import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  AiPhone01Icon,
  Mail01Icon,
  Location01Icon,
  Package01Icon,
} from '@hugeicons/core-free-icons'

import { formatCurrency } from '@/components/payment/payment.utils'
import type { PaymentOrderResponse } from '@/types/pago.types'

type PaymentOrderSummaryProps = {
  order: PaymentOrderResponse
  contact?: {
    fullName?: string
    email?: string
    phone?: string
    shippingAddress?: string
  }
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: Parameters<typeof HugeiconsIcon>[0]['icon']
  label: string
  value?: string
}) {
  if (!value) return null

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 p-4">
      <HugeiconsIcon icon={icon} className="mt-0.5 size-5 text-primary" strokeWidth={1.6} />
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">{label}</p>
        <p className="mt-1 text-sm leading-6 text-foreground/75">{value}</p>
      </div>
    </div>
  )
}

export function PaymentOrderSummary({ order, contact }: PaymentOrderSummaryProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
      <section className="glass rounded-[2rem] p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/12">
            <HugeiconsIcon icon={Package01Icon} className="size-6 text-primary" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Resumen</p>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Pedido #{order.id}
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {order.details.map((item) => (
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

        <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
          <span className="text-sm uppercase tracking-[0.18em] text-foreground/45">Total</span>
          <span className="text-xl font-semibold tabular-nums text-foreground">
            {formatCurrency(order.total)}
          </span>
        </div>
      </section>

      <section className="glass-soft rounded-[2rem] border border-white/35 p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Datos de entrega
        </h2>

        <div className="mt-5 space-y-4">
          <ContactRow icon={Package01Icon} label="Destinatario" value={contact?.fullName} />
          <ContactRow icon={Mail01Icon} label="Email" value={contact?.email} />
          <ContactRow icon={AiPhone01Icon} label="Teléfono" value={contact?.phone} />
          <ContactRow
            icon={Location01Icon}
            label="Dirección"
            value={contact?.shippingAddress}
          />
        </div>
      </section>
    </div>
  )
}
