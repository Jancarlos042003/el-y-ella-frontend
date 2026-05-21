'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { CancelCircleIcon } from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import { paymentReturnQuerySchema } from '@/schemas/pago.schemas'
import { useEstadoPago } from '@/hooks/usePago'
import { PaymentPageShell } from '@/components/payment/PaymentPageShell'
import { PaymentStatusCard } from '@/components/payment/PaymentStatusCard'
import { PaymentStatusEmpty } from '@/components/payment/PaymentStatusEmpty'

export default function PagoErrorPage() {
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
          title="No pudimos identificar el intento de pago"
          description="Regresa al carrito para revisar tus productos y volver a intentarlo desde el checkout."
          href={ROUTES.carrito}
          actionLabel="Volver al carrito"
        />
      </PaymentPageShell>
    )
  }

  if (payment.isLoading) {
    return (
      <PaymentPageShell>
        <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground/60">Revisando el resultado del pago...</p>
        </div>
      </PaymentPageShell>
    )
  }

  if (payment.isError || !payment.data) {
    return (
      <PaymentPageShell>
        <PaymentStatusEmpty
          title="No pudimos recuperar el estado del pago"
          description="El intento quedó incompleto o rechazado. Puedes volver al carrito y generar un nuevo checkout."
          href={ROUTES.carrito}
          actionLabel="Reintentar desde el carrito"
        />
      </PaymentPageShell>
    )
  }

  return (
    <PaymentPageShell>
      <PaymentStatusCard
        tone="error"
        icon={CancelCircleIcon}
        eyebrow="Pago no completado"
        title="El pago no pudo confirmarse"
        description="No se aprobó la operación. Puedes volver al carrito y generar un nuevo intento cuando estés listo."
        payment={payment.data}
        actions={[{ href: ROUTES.carrito, label: 'Volver al carrito' }]}
      />
    </PaymentPageShell>
  )
}
