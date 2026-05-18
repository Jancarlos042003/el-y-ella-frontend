import { z } from 'zod/v4'

export const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const flowerResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  imageUrl: z.string(),
  categories: z.array(categoryResponseSchema),
  createdAt: z.string(),
  /* campo opcional — el backend puede añadirlo en una revisión futura */
  averageRating: z.number().optional(),
  reviewCount: z.number().optional(),
})

export const pageFlowerResponseSchema = z.object({
  content: z.array(flowerResponseSchema),
  totalElements: z.number(),
  totalPages: z.number(),
  size: z.number(),
  number: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  numberOfElements: z.number(),
  empty: z.boolean(),
})
