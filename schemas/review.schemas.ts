import { z } from 'zod/v4'

export const reviewResponseSchema = z.object({
  id: z.number(),
  flowerId: z.number(),
  flowerName: z.string(),
  userId: z.number(),
  userName: z.string(),
  comment: z.string(),
  rating: z.number().min(1).max(5),
  createdAt: z.string(),
})

export const reviewRequestSchema = z.object({
  flowerId: z.number(),
  comment: z.string().min(1, 'El comentario es requerido'),
  rating: z.number().min(1).max(5),
})
