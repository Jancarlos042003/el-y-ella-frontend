import { z } from 'zod/v4'
import { cartResponseSchema, cartItemRequestSchema } from '@/schemas/carrito.schemas'

export type CartResponse = z.infer<typeof cartResponseSchema>
export type CartItemRequest = z.infer<typeof cartItemRequestSchema>
