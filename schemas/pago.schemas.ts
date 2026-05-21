import { z } from 'zod/v4'

import { orderResponseSchema } from '@/schemas/admin.schemas'

const optionalTextField = z
  .string()
  .trim()
  .optional()
  .transform((value) => value ?? '')

export const checkoutItemRequestSchema = z.object({
  flowerId: z.number().int().positive(),
  quantity: z.number().int().min(1),
})

export const checkoutRequestSchema = z.object({
  fullName: z.string().trim().min(1, 'El nombre completo es requerido'),
  email: z.string().trim().email('Email inválido'),
  phone: optionalTextField,
  shippingAddress: z.string().trim().min(1, 'La dirección de envío es requerida'),
  city: optionalTextField,
  state: optionalTextField,
  postalCode: optionalTextField,
  items: z.array(checkoutItemRequestSchema).min(1, 'Debes agregar al menos un producto'),
  idempotencyKey: z.string().trim().min(1, 'No se pudo generar el intento de checkout'),
})

export const checkoutFormSchema = checkoutRequestSchema.omit({
  items: true,
  idempotencyKey: true,
})

export const checkoutResponseSchema = z.object({
  orderId: z.number(),
  paymentId: z.number(),
  initPoint: z.string().url(),
})

export const paymentStatusResponseSchema = z.object({
  paymentId: z.number(),
  orderId: z.number(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'EXPIRED', 'FAILED']),
  totalAmount: z.number(),
  mpPaymentId: z.string().nullable(),
  createdAt: z.string(),
})

export const paymentReturnQuerySchema = z.object({
  orderId: z.coerce.number().int().positive(),
  paymentId: z.coerce.number().int().positive().optional(),
})

export const problemDetailSchema = z.object({
  status: z.number().int().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  detail: z.string().optional(),
  instance: z.string().optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
})

export const orderStatusResponseSchema = orderResponseSchema
