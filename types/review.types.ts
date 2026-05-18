import { z } from 'zod/v4'
import { reviewResponseSchema, reviewRequestSchema } from '@/schemas/review.schemas'

export type ReviewResponse = z.infer<typeof reviewResponseSchema>
export type ReviewRequest = z.infer<typeof reviewRequestSchema>
