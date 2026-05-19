import { z } from 'zod/v4'
import { cartResponseSchema, cartItemRequestSchema } from '@/schemas/carrito.schemas'
import type { FlowerResponse } from './flores.types'

export type CartResponse = z.infer<typeof cartResponseSchema>
export type CartItemRequest = z.infer<typeof cartItemRequestSchema>

export type AddToCartInput = CartItemRequest & {
  flower?: FlowerResponse
}
