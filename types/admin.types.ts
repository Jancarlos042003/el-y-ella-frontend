import { z } from 'zod/v4'
import {
  userResponseSchema,
  orderResponseSchema,
  orderDetailResponseSchema,
  updateOrderStatusSchema,
  flowerRequestSchema,
  categoryRequestSchema,
  updateUserRequestSchema,
} from '@/schemas/admin.schemas'

export type UserResponse = z.infer<typeof userResponseSchema>
export type OrderResponse = z.infer<typeof orderResponseSchema>
export type OrderDetailResponse = z.infer<typeof orderDetailResponseSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>
export type FlowerRequestInput = z.infer<typeof flowerRequestSchema>
export type CategoryRequestInput = z.infer<typeof categoryRequestSchema>
export type UpdateUserRequestInput = z.infer<typeof updateUserRequestSchema>
