'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import { paymentReturnQuerySchema } from '@/schemas/pago.schemas'
import { useEstadoPago } from '@/hooks/usePago'
import { PaymentPageShell } from '@/components/payment/PaymentPageShell'
import { PaymentStatusCard } from '@/components/payment/PaymentStatusCard'
import { PaymentStatusEmpty } from '@/components/payment/PaymentStatusEmpty'

// Componente interno que lee los searchParams — debe estar dentro de Suspense
function PagoPendienteContent() {
  const searchParams = useSearchParams()

  const parsedQuery = useMemo(
    () =>
      paymentReturnQuerySchema.safeParse({
        orderId: searchParams.get('orderId'),
        paymentId: searchParams.get('paymentId') ?? undefined,
      }),
    [searchParams]
  )

  const orderId = parsedQuery.success ? parsedQuery.data.orderId : undefined
  const payment = useEstadoPago(orderId)

  if (!orderId) {
    return (
      <PaymentPageShell>
        <PaymentStatusEmpty
          title="Falta la referencia del pedido"
          description="Necesitamos un identificador válido para consultar el estado pendiente del pago."
          href={ROUTES.pedidos}
          actionLabel="Ir a mis pedidos"
        />
      </PaymentPageShell>
    )
  }

  if (payment.isLoading) {
    return (
      <PaymentPageShell>
        <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground/60">Consultando el estado del pago...</p>
        </div>
      </PaymentPageShell>
    )
  }

  if (payment.isError || !payment.data) {
    return (
      <PaymentPageShell>
        <PaymentStatusEmpty
          title="No pudimos consultar el pago"
          description="La operación sigue en revisión, pero la página no logró recuperar el estado actualizado."
          href={ROUTES.pedido(orderId)}
          actionLabel="Ver mi pedido"
        />
      </PaymentPageShell>
    )
  }

  return (
    <PaymentPageShell>
      <PaymentStatusCard
        tone="pending"
        icon={AlertCircleIcon}
        eyebrow="Pago en revisión"
        title="Estamos esperando la confirmación final"
        description="Mercado Pago sigue validando la operación. Apenas termine, el estado definitivo quedará reflejado en tu pedido."
        payment={payment.data}
        actions={[{ href: ROUTES.pedido(orderId), label: 'Ver detalle del pedido' }]}
      />
    </PaymentPageShell>
  )
}

// Suspense es obligatorio cuando un Client Component usa useSearchParams en Next.js
export default function PagoPendientePage() {
  return (
    <Suspense>
      <PagoPendienteContent />
    </Suspense>
  )
}
