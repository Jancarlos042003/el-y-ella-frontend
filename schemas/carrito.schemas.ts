import { z } from 'zod/v4'

export const cartResponseSchema = z.object({
  id: z.number(),
  flowerId: z.number(),
  flowerName: z.string(),
  flowerImageUrl: z.string(),
  quantity: z.number(),
  price: z.number(),
  subtotal: z.number(),
  addedAt: z.string(),
})

export const cartItemRequestSchema = z.object({
  flowerId: z.number(),
  quantity: z.number().min(1),
})
