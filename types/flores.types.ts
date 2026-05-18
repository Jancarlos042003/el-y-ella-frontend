import { z } from 'zod/v4'
import {
  categoryResponseSchema,
  flowerResponseSchema,
  pageFlowerResponseSchema,
} from '@/schemas/flores.schemas'

export type CategoryResponse = z.infer<typeof categoryResponseSchema>
export type FlowerResponse = z.infer<typeof flowerResponseSchema>
export type PageFlowerResponse = z.infer<typeof pageFlowerResponseSchema>
