'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'

import { ROUTES } from '@/constants/routes'
import { paymentReturnQuerySchema } from '@/schemas/pago.schemas'
import { useEstadoPago, usePedidoPago } from '@/hooks/usePago'
import { clearGuestCart } from '@/lib/cart.utils'
import { useSaleStore } from '@/store/saleStore'
import { PaymentOrderSummary } from '@/components/payment/PaymentOrderSummary'
import { PaymentPageShell } from '@/components/payment/PaymentPageShell'
import { PaymentStatusCard } from '@/components/payment/PaymentStatusCard'
import { PaymentStatusEmpty } from '@/components/payment/PaymentStatusEmpty'

export default function PagoExitoPage() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  const parsedQuery = useMemo(
    () =>
      paymentReturnQuerySchema.safeParse({
        orderId: searchParams.get('orderId'),
        paymentId: searchParams.get('paymentId') ?? undefined,
      }),
    [searchParams]
  )

  const orderId = parsedQuery.success ? parsedQuery.data.orderId : undefined
  // El estado del pago no trae items del pedido, por eso consultamos ambos recursos.
  const payment = useEstadoPago(orderId)
  const order = usePedidoPago(orderId)

  useEffect(() => {
    if (payment.data?.status === 'APPROVED') {
      clearGuestCart()
      queryClient.setQueryData(['cart'], [])
      setCartCount(0)
    }
  }, [payment.data?.status, queryClient, setCartCount])

  if (!orderId) {
    return (
      <PaymentPageShell>
        <PaymentStatusEmpty
          title="No encontramos la referencia del pedido"
          description="La página de confirmación necesita un identificador válido para mostrar el resumen del pago."
          href={ROUTES.pedidos}
          actionLabel="Ir a mis pedidos"
        />
      </PaymentPageShell>
    )
  }

  if (payment.isLoading || order.isLoading) {
    return (
      <PaymentPageShell>
        <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-foreground/60">Confirmando tu pedido...</p>
        </div>
      </PaymentPageShell>
    )
  }

  if (payment.isError || order.isError || !payment.data || !order.data) {
    return (
      <PaymentPageShell>
        <PaymentStatusEmpty
          title="No pudimos cargar tu confirmación"
          description="El pago puede haberse registrado correctamente, pero la vista no pudo recuperar el resumen del pedido."
          href={ROUTES.pedidos}
          actionLabel="Revisar mis pedidos"
        />
      </PaymentPageShell>
    )
  }

  return (
    <PaymentPageShell>
      <PaymentStatusCard
        tone="success"
        icon={CheckmarkCircle02Icon}
        eyebrow="Pago confirmado"
        title="Tu detalle floral ya quedó reservado"
        description="Verificamos el estado del pago y recuperamos el pedido para que tengas un resumen claro antes de seguir."
        payment={payment.data}
        actions={[{ href: ROUTES.pedidos, label: 'Ver mis pedidos' }]}
      >
        <PaymentOrderSummary
          order={order.data}
          contact={{
            fullName: order.data.userName,
          }}
        />
      </PaymentStatusCard>
    </PaymentPageShell>
  )
}
