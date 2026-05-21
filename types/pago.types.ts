import { z } from 'zod/v4'

import {
  checkoutFormSchema,
  checkoutRequestSchema,
  checkoutResponseSchema,
  paymentStatusResponseSchema,
  paymentReturnQuerySchema,
  orderStatusResponseSchema,
  problemDetailSchema,
} from '@/schemas/pago.schemas'

export type CheckoutInput = z.infer<typeof checkoutRequestSchema>
export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>
export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>
export type PaymentStatusResponse = z.infer<typeof paymentStatusResponseSchema>
export type PaymentReturnQuery = z.infer<typeof paymentReturnQuerySchema>
export type PaymentOrderResponse = z.infer<typeof orderStatusResponseSchema>
export type ProblemDetail = z.infer<typeof problemDetailSchema>
