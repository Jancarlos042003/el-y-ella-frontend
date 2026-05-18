"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useSaleStore } from '@/store/saleStore'
import type { CartResponse, CartItemRequest } from '@/types/carrito.types'

export function useCarrito() {
  return useQuery<CartResponse[]>({
    queryKey: ['cart'],
    queryFn: () => api.get<CartResponse[]>('/api/v1/cart').then((r) => r.data),
    staleTime: 0,
  })
}

export function useAddToCart() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: (data: CartItemRequest) =>
      api.post<CartResponse>('/api/v1/cart', data).then((r) => r.data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['cart'] })
      const cart = qc.getQueryData<CartResponse[]>(['cart'])
      if (cart) setCartCount(cart.length)
    },
  })
}

export function useUpdateCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CartItemRequest }) =>
      api.put<CartResponse>(`/api/v1/cart/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export function useRemoveCartItem() {
  const qc = useQueryClient()
  const setCartCount = useSaleStore((s) => s.setCartCount)

  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/v1/cart/${id}`),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['cart'] })
      const cart = qc.getQueryData<CartResponse[]>(['cart'])
      if (cart) setCartCount(cart.length)
    },
  })
}
