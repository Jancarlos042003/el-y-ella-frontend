import { z } from 'zod/v4'
import { loginSchema, registerSchema, authResponseSchema } from '@/schemas/auth.schemas'

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
