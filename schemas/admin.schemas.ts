import { z } from 'zod/v4'

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  role: z.enum(['USER', 'ADMIN']),
  createdAt: z.string(),
})

export const orderDetailResponseSchema = z.object({
  id: z.number(),
  flowerId: z.number(),
  flowerName: z.string(),
  flowerImageUrl: z.string(),
  quantity: z.number(),
  price: z.number(),
  subtotal: z.number(),
})

export const orderResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  userName: z.string(),
  total: z.number(),
  status: z.enum(['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  createdAt: z.string(),
  details: z.array(orderDetailResponseSchema),
})

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
})

export const flowerRequestSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  description: z.string().optional(),
  // coerce permite que los inputs HTML (string) se conviertan a number antes de validar
  price: z.coerce.number().min(0.01, 'Precio mínimo S/ 0.01'),
  stock: z.coerce.number().int().min(0, 'Stock mínimo 0'),
  imageUrl: z.string().optional(),
  categoryIds: z.array(z.number()).optional(),
})

export const categoryRequestSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
})

export const updateUserRequestSchema = z.object({
  name: z.string().max(100).optional(),
  address: z.string().optional(),
  phone: z.string().max(20).optional(),
})
