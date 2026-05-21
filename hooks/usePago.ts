'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import {
  checkoutResponseSchema,
  paymentStatusResponseSchema,
  orderStatusResponseSchema,
} from '@/schemas/pago.schemas'
import type {
  CheckoutInput,
  CheckoutResponse,
  PaymentStatusResponse,
  PaymentOrderResponse,
} from '@/types/pago.types'

export function useCheckout() {
  return useMutation<CheckoutResponse, Error, CheckoutInput>({
    mutationFn: async (data) => {
      const response = await api.post('/api/v1/payments/checkout', data)
      return checkoutResponseSchema.parse(response.data)
    },
  })
}

export function useEstadoPago(orderId?: number) {
  return useQuery<PaymentStatusResponse>({
    queryKey: ['payment-status', orderId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/payments/status/${orderId}`)
      return paymentStatusResponseSchema.parse(response.data)
    },
    enabled: typeof orderId === 'number',
    retry: false,
  })
}

export function usePedidoPago(orderId?: number) {
  return useQuery<PaymentOrderResponse>({
    queryKey: ['payment-order', orderId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/orders/${orderId}`)
      return orderStatusResponseSchema.parse(response.data)
    },
    enabled: typeof orderId === 'number',
    retry: false,
  })
}
