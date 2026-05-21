import { PAYMENT_STATUS_LABEL } from '@/constants/labels'

import { PaymentStatusActions } from '@/components/payment/PaymentStatusActions'
import { PaymentStatusHeader } from '@/components/payment/PaymentStatusHeader'
import { formatCurrency, formatDate } from '@/components/payment/payment.utils'
import type { PaymentStatusResponse } from '@/types/pago.types'

type PaymentStatusCardProps = {
  tone: 'success' | 'pending' | 'error'
  icon: Parameters<typeof PaymentStatusHeader>[0]['icon']
  eyebrow: string
  title: string
  description: string
  payment: PaymentStatusResponse
  actions: Parameters<typeof PaymentStatusActions>[0]['actions']
  children?: React.ReactNode
}

export function PaymentStatusCard({
  tone,
  icon,
  eyebrow,
  title,
  description,
  payment,
  actions,
  children,
}: PaymentStatusCardProps) {
  return (
    <div className="space-y-8">
      <section className="glass rounded-[2rem] p-6 md:p-8">
        <PaymentStatusHeader
          tone={tone}
          icon={icon}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.5rem] border border-border/70 bg-background/72 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Pedido</p>
            <p className="mt-2 text-lg font-semibold text-foreground">#{payment.orderId}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/72 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Pago</p>
            <p className="mt-2 text-lg font-semibold text-foreground">#{payment.paymentId}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/72 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Estado</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {PAYMENT_STATUS_LABEL[payment.status] ?? payment.status}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/72 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Total</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {formatCurrency(payment.totalAmount)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground/55">
          {payment.mpPaymentId ? <span>Mercado Pago ID: {payment.mpPaymentId}</span> : null}
          <span>Registrado: {formatDate(payment.createdAt)}</span>
        </div>

        <div className="mt-8">
          <PaymentStatusActions actions={actions} />
        </div>
      </section>

      {children}
    </div>
  )
}
