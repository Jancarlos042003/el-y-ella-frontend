import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  address: z.string().optional(),
  phone: z.string().max(20).optional(),
})

export const authResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(['USER', 'ADMIN']),
})
